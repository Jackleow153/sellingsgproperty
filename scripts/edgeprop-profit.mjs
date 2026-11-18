// Reads EdgeProp's profitable / unprofitable resale counts (tab labels) from public condo pages in headless Chrome.
// until node scripts/edgeprop-profit.mjs; do :; done   then   node scripts/ura-resale.cjs && node scripts/build-pages.cjs
// Looks up every condo in data/resale-homes.json that has no entry in data/resale-profit.json yet
// (about 7 s each). Counts are EdgeProp resales matched to the seller's earlier purchase (URA caveats).
// Delete data/resale-profit.json to re-read them all.
import { spawn } from 'node:child_process'; import { mkdtempSync, writeFileSync, existsSync, readFileSync } from 'node:fs'; import { tmpdir } from 'node:os'; import { join } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname, OUT = ROOT + 'data/resale-profit.json';
const homes = JSON.parse(readFileSync(ROOT + 'data/resale-homes.json', 'utf8'));
const slugs = [...new Set(Object.values(homes).map(h => h && h.slug).filter(Boolean))];
const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--remote-debugging-port=9371', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'c-'))}`, '--window-size=1400,1000', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 50 && !ws; i++) { try { ws = (await (await fetch('http://127.0.0.1:9371/json')).json()).find(x => x.type === 'page')?.webSocketDebuggerUrl; } catch {} await sleep(200); }
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
let n = 0;
for (const slug of slugs) {
  if (out[slug]) continue;
  await send('Page.navigate', { url: 'https://www.edgeprop.sg/condo-apartment/' + slug });
  let r = null;
  for (let i = 0; i < 16; i++) { await sleep(700); try { r = JSON.parse(await val(READ)); } catch {} if (r && r.win != null && r.lose != null && (r.win + r.lose > 0 || i > 10)) break; }
  out[slug] = r && r.win != null ? { win: r.win, lose: r.lose, all: r.all } : { ok: false };
  writeFileSync(OUT, JSON.stringify(out).replace(/\},"/g, '},\n"')); n++;
  console.log(n, slug, JSON.stringify(out[slug]), r && r.name);
  await sleep(800);
}
chrome.kill(); process.exit(0);
