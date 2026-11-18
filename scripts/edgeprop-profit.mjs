// Reads EdgeProp's profitable / unprofitable resale counts (tab labels) from public condo pages in headless Chrome.
// for i in 1 2 3 4 5; do node scripts/edgeprop-profit.mjs && break; done   then   node scripts/ura-resale.cjs && node scripts/build-pages.cjs
// Runs locally (Chrome on macOS) and in the monthly GitHub workflow (Chrome on Ubuntu; or set CHROME).
// Looks up every condo in data/resale-homes.json with no counts in data/resale-profit.json yet, then
// re-reads the REFRESH (default 100) oldest counts that are over 90 days old, so every condo is
// refreshed about every 7 months. About 7 s per condo. Failed reads are not saved, so they retry next run.
// Counts are EdgeProp resales matched to the seller's earlier purchase (URA caveats).
import { spawn } from 'node:child_process'; import { mkdtempSync, writeFileSync, existsSync, readFileSync } from 'node:fs'; import { tmpdir } from 'node:os'; import { join } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname, OUT = ROOT + 'data/resale-profit.json';
const homes = JSON.parse(readFileSync(ROOT + 'data/resale-homes.json', 'utf8'));
const slugs = [...new Set(Object.values(homes).map(h => h && h.slug).filter(Boolean))];
const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10), DAY = 864e5;
for (const k of Object.keys(out)) if (out[k].win == null) delete out[k];   // old failed reads: try again
const missing = slugs.filter(k => !out[k]);
const stale = slugs.filter(k => out[k] && Date.now() - Date.parse(out[k].at || today) >= +(process.env.STALE_DAYS ?? 90) * DAY).sort((a, b) => (out[a].at || '').localeCompare(out[b].at || '')).slice(0, +(process.env.REFRESH ?? 100));
const todo = [...missing, ...stale];
console.log(`${missing.length} new, ${stale.length} to refresh`);
if (!todo.length) process.exit(0);
const CHROME = process.env.CHROME || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const chrome = spawn(CHROME, [...(process.platform === 'linux' ? ['--no-sandbox'] : []), '--headless=new', '--remote-debugging-port=9371', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'c-'))}`, '--window-size=1400,1000', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let chromeErr = ''; chrome.stderr.on('data', d => { chromeErr += d; }); chrome.on('error', e => { chromeErr += String(e); });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 150 && !ws; i++) { try { ws = (await (await fetch('http://127.0.0.1:9371/json')).json()).find(x => x.type === 'page')?.webSocketDebuggerUrl; } catch {} await sleep(200); }
if (!ws) { console.log(`Chrome (${CHROME}) did not start:\n${chromeErr.slice(-1500)}`); chrome.kill(); process.exit(3); }
const sock = new WebSocket(ws); await new Promise(r => sock.addEventListener('open', r)); let id = 0; const pend = new Map();
sock.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
// a call that gets no answer in 20 s means the page hung: exit with code 2 and let the caller restart (the cache keeps progress)
const send = (method, params = {}) => new Promise(r => { const i = ++id; const t = setTimeout(() => { console.log('page hung, restarting'); chrome.kill(); process.exit(2); }, 20000); pend.set(i, m => { clearTimeout(t); r(m); }); sock.send(JSON.stringify({ id: i, method, params })); });
const val = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result.result?.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Network.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
// skip images, fonts and media to keep each visit light
await send('Network.enable'); await send('Network.setBlockedURLs', { urls: ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif', '*.svg', '*.woff', '*.woff2', '*.mp4', '*googletag*', '*doubleclick*', '*facebook*', '*hotjar*', '*clarity*', '*tiktok*', '*criteo*', '*pushengage*', '*sharethis*'] });
const READ = `(()=>{const g=k=>{const e=document.getElementById('SalesTransaction-tab-'+k);const m=e&&e.innerText.match(/\\((\\d[\\d,]*)\\)/);return m?+m[1].replace(/,/g,''):null};return JSON.stringify({win:g('profitable'),lose:g('unprofitable'),all:g('sales'),name:(document.querySelector('h1')||{}).innerText||''})})()`;
let n = 0, failsInARow = 0;
for (const slug of todo) {
  await send('Page.navigate', { url: 'https://www.edgeprop.sg/condo-apartment/' + slug });
  let r = null;
  for (let i = 0; i < 16; i++) { await sleep(700); try { r = JSON.parse(await val(READ)); } catch {} if (r && r.win != null && r.lose != null && (r.win + r.lose > 0 || i > 10)) break; }
  n++;
  if (r && r.win != null) { out[slug] = { win: r.win, lose: r.lose, all: r.all, at: today }; failsInARow = 0; writeFileSync(OUT, JSON.stringify(out).replace(/\},"/g, '},\n"')); }
  else if (++failsInARow >= 8) { console.log('8 pages in a row gave no counts: EdgeProp may be blocking this machine. Stopping.'); break; }
  console.log(n, slug, r && r.win != null ? JSON.stringify(out[slug]) : 'no counts', r && r.name);
  await sleep(800);
}
chrome.kill(); process.exit(0);
