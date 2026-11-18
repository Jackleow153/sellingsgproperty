#!/usr/bin/env node
// Refreshes the "Resale condos within 3 km" table on upcoming Condo Analysis files.
//
//   node scripts/ura-resale.cjs        then   node scripts/build-pages.cjs
//
// Prices: URA private residential transactions (Data Service, PMI_Resi_Transaction, past 5 years).
// The access key is read from the URA_ACCESS_KEY environment variable or from ~/.ura_access_key.
// Never put the key in this repo.
// Homes and completion year: EdgeProp project pages, cached in data/resale-homes.json (only new condos
// are looked up, one page every ~1.5 s). Site map points: data/upcoming-geo.json; a newly added
// upcoming project is placed with OneMap from its `where` text and marked approximate.
// Writes `r3` into data/nearby.json for every upcoming project.
const fs = require('fs'); const path = require('path'); const os = require('os');
const ROOT = path.join(__dirname, '..');
const rd = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const wr = (f, o, lines) => fs.writeFileSync(path.join(ROOT, f), lines ? JSON.stringify(o).replace(/\},"/g, '},\n"') : JSON.stringify(o));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const CAP = 25;            // rows shown per site
const MIN_12M = 3;         // resales in the past 12 months to be shown
const BED3 = [90, 130];    // sqm: usual 3-bedroom size (URA has no bedroom field)
const MIN_B3 = 3, MIN_ALL = 5;

function svy21(N, E) { // SVY21 -> WGS84
  const a = 6378137, f = 1 / 298.257223563, oLat = 1.366666, oLon = 103.833333, oN = 38744.572, oE = 28001.642, k = 1;
  const b = a * (1 - f), e2 = 2 * f - f * f, e4 = e2 * e2, e6 = e4 * e2, rad = Math.PI / 180;
  const A0 = 1 - e2 / 4 - 3 * e4 / 64 - 5 * e6 / 256, A2 = 3 / 8 * (e2 + e4 / 4 + 15 * e6 / 128), A4 = 15 / 256 * (e4 + 3 * e6 / 4), A6 = 35 * e6 / 3072;
  const M = l => a * (A0 * l - A2 * Math.sin(2 * l) + A4 * Math.sin(4 * l) - A6 * Math.sin(6 * l));
  const Mp = M(oLat * rad) + (N - oN) / k, n = (a - b) / (a + b), G = a * (1 - n) * (1 - n * n) * (1 + 9 * n * n / 4 + 225 * n ** 4 / 64) * rad;
  const s = Mp / G * rad;
  const lp = s + (3 * n / 2 - 27 * n ** 3 / 32) * Math.sin(2 * s) + (21 * n * n / 16 - 55 * n ** 4 / 32) * Math.sin(4 * s) + (151 * n ** 3 / 96) * Math.sin(6 * s) + (1097 * n ** 4 / 512) * Math.sin(8 * s);
  const sl = Math.sin(lp), r = a * (1 - e2) / (1 - e2 * sl * sl) ** 1.5, v = a / Math.sqrt(1 - e2 * sl * sl), psi = v / r, t = Math.tan(lp);
  const Ep = E - oE, x = Ep / (k * v), sec = 1 / Math.cos(lp);
  const lat = lp - t / (k * r) * (x * Ep / 2) + t / (k * r) * (Ep * x ** 3 / 24) * (-4 * psi * psi + 9 * psi * (1 - t * t) + 12 * t * t);
  const lon = oLon * rad + sec * x - sec * x ** 3 / 6 * (psi + 2 * t * t) + sec * x ** 5 / 120 * (-4 * psi ** 3 * (1 - 6 * t * t) + psi * psi * (9 - 68 * t * t) + 72 * psi * t * t + 24 * t ** 4);
  return { lat: lat / rad, lon: lon / rad };
}
const dist = (a, b) => { const E = 6371000, t = x => x * Math.PI / 180; const dLa = t(b.lat - a.lat), dLo = t(b.lon - a.lon); const h = Math.sin(dLa / 2) ** 2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(dLo / 2) ** 2; return 2 * E * Math.asin(Math.sqrt(h)); };
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : null; };
const mi = c => (2000 + +c.slice(2)) * 12 + (+c.slice(0, 2) - 1); // MMYY -> month index
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ym = m => `${MON[m % 12]} ${Math.floor(m / 12)}`;
const tc = s => s.toLowerCase().replace(/(^|[\s(\-\/@&.])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(Ii|Iii|Iv|Vi|Vii)\b/g, m => m.toUpperCase()).replace(/\bEc\b/g, 'EC').replace(/'S\b/g, "'s");
const tenure = t => /freehold/i.test(t) ? 'Freehold' : t.replace(/^(\d+) yrs lease commencing from (\d{4}).*/, '$1 years from $2');
const norm = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

async function ura() {
  let key = process.env.URA_ACCESS_KEY;
  if (!key) { try { key = fs.readFileSync(path.join(os.homedir(), '.ura_access_key'), 'utf8').trim(); } catch {} }
  if (!key) throw new Error('No URA access key: set URA_ACCESS_KEY or save it in ~/.ura_access_key');
  const base = 'https://eservice.ura.gov.sg/uraDataService';
  const tr = await (await fetch(`${base}/insertNewToken/v1`, { headers: { AccessKey: key, 'User-Agent': UA } })).json();
  if (tr.Status !== 'Success') throw new Error('URA token: ' + (tr.Message || tr.Status) + ' (the access key may have expired; renew it on the URA Data Service portal)');
  const all = [];
  for (let b = 1; b <= 4; b++) {
    const r = await fetch(`${base}/invokeUraDS/v1?service=PMI_Resi_Transaction&batch=${b}`, { headers: { AccessKey: key, Token: tr.Result, 'User-Agent': UA } });
    const d = JSON.parse(new TextDecoder('latin1').decode(await r.arrayBuffer())); // not valid UTF-8
    if (d.Status !== 'Success') throw new Error(`URA batch ${b}: ${d.Message || d.Status}`);
    all.push(...d.Result); console.log(`URA batch ${b}: ${d.Result.length} projects`);
  }
  return all;
}

async function onemap(q) {
  for (let i = 0; i < 4; i++) {
    try { const d = await (await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(q)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)).json(); return d.results || []; } catch { await sleep(2000 * (i + 1)); }
  }
  return [];
}

async function edgeprop(name) {
  const slugs = [...new Set(['', 'and'].map(r => name.toLowerCase().replace(/&/g, r ? ' and ' : ' ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')))];
  for (const slug of slugs) {
    let h = '';
    try { const r = await fetch('https://www.edgeprop.sg/condo-apartment/' + slug, { headers: { 'User-Agent': UA } }); h = r.ok ? await r.text() : ''; } catch {}
    await sleep(1500);
    const nm = (h.match(/"projectDetail":\{[^]*?"name":"([^"]+)"/) || [])[1];
    if (!nm || norm(nm) !== norm(name)) continue;
    const units = (h.match(/"name":"Number of Units","value":"([\d,]+) units"/) || [])[1];
    const top = (h.match(/"name":"Completion","value":"(\d{4})"/) || [])[1];
    const ll = h.match(/"projectDetail":\{[^]*?"lat":(-?[\d.]+),"lon":(-?[\d.]+)/);
    return { units: units ? +units.replace(/,/g, '') : null, top: top ? +top : null, lat: ll ? +ll[1] : null, lon: ll ? +ll[2] : null, slug };
  }
  return { ok: false };
}

(async () => {
  const js = fs.readFileSync(path.join(ROOT, 'assets/condo-analysis.js'), 'utf8');
  const SITE = JSON.parse(js.match(/const SITE = (\{.*?\});\/\* BUILD:SITE-UP END/)[1]);
  const GEO = rd('data/upcoming-geo.json'), HOMES = rd('data/resale-homes.json'), NEAR = rd('data/nearby.json');

  // 1. map points for any new upcoming project
  for (const s of SITE.up) {
    if (GEO[s.slug]) continue;
    const r = (await onemap(String(s.where || s.name).split(/[,/]/)[0].trim()))[0];
    if (r) { GEO[s.slug] = { lat: +(+r.LATITUDE).toFixed(6), lon: +(+r.LONGITUDE).toFixed(6), by: 'approx' }; console.log('placed', s.slug, 'at', r.ADDRESS, '(approximate; check it)'); }
    else console.log('could not place', s.slug, '- add it to data/upcoming-geo.json by hand');
  }
  wr('data/upcoming-geo.json', GEO, true);

  // 2. URA resales grouped by project and street
  const all = await ura();
  const LAST = all.reduce((m, p) => p.transaction.reduce((n, t) => Math.max(n, mi(t.contractDate)), m), 0) - 1; // last full month
  const W = k => [LAST - 12 * k - 11, LAST - 12 * k], inW = (m, w) => m >= w[0] && m <= w[1];
  const TYPES = new Set(['Apartment', 'Condominium', 'Executive Condominium']), projs = {};
  for (const p of all) {
    if (!p.x || !p.y) continue;
    const tx = p.transaction.filter(t => TYPES.has(t.propertyType) && t.typeOfSale === '3' && t.noOfUnits === '1' && t.typeOfArea === 'Strata');
    if (!tx.length) continue;
    const key = p.project + '|' + p.street;
    const q = projs[key] || (projs[key] = { key, name: p.project, street: p.street, ...svy21(+p.y, +p.x), tx: [], ten: {}, ec: false });
    for (const t of tx) { q.tx.push({ m: mi(t.contractDate), psf: +t.price / (+t.area * 10.7639), sqm: +t.area }); q.ten[t.tenure] = (q.ten[t.tenure] || 0) + 1; if (t.propertyType === 'Executive Condominium') q.ec = true; }
  }
  const pool = Object.values(projs).filter(q => q.tx.length >= 3);
  for (const q of pool) {
    const is3 = t => t.sqm >= BED3[0] && t.sqm <= BED3[1];
    const med = (arr, min) => arr.length >= min ? median(arr) : null;
    const b = k => med(q.tx.filter(t => is3(t) && inW(t.m, W(k))).map(t => t.psf), MIN_B3);
    const a = k => med(q.tx.filter(t => inW(t.m, W(k))).map(t => t.psf), MIN_ALL);
    const ch = (x, y) => x && y ? +((x / y - 1) * 100).toFixed(1) : null, cg = (x, y) => x && y ? +(((x / y) ** 0.25 - 1) * 100).toFixed(1) : null;
    const y0 = q.tx.filter(t => inW(t.m, W(0))), sizes = q.tx.filter(is3).map(t => Math.round(t.sqm * 10.7639));
    const [b0, b1, b4, a0, a1, a4] = [b(0), b(1), b(4), a(0), a(1), a(4)];
    Object.assign(q, { n12: y0.length, psf12: y0.length ? Math.round(median(y0.map(t => t.psf))) : null, yoy: ch(b0, b1), yoyAll: ch(a0, a1), cagr4: cg(b0, b4), cagr4All: cg(a0, a4),
      size: sizes.length ? (Math.min(...sizes) === Math.max(...sizes) ? Math.min(...sizes).toLocaleString('en-US') : `${Math.min(...sizes).toLocaleString('en-US')}–${Math.max(...sizes).toLocaleString('en-US')}`) : null,
      tenure: tenure(Object.entries(q.ten).sort((x, y) => y[1] - x[1])[0][0]) });
  }

  // 3. per site: nearest active resale condos within 3 km
  const sets = {};
  for (const s of SITE.up) {
    const g = GEO[s.slug]; if (!g) continue;
    const near = pool.map(q => ({ q, d: dist(g, q) })).filter(v => v.d <= 3000 && v.q.n12 > 0).sort((a, b) => a.d - b.d);
    sets[s.slug] = { total: near.length, in1: near.filter(v => v.d <= 1000).length, shown: near.filter(v => v.q.n12 >= MIN_12M).slice(0, CAP) };
  }

  // 4. homes and completion year for condos not in the cache
  const todo = [...new Set(Object.values(sets).flatMap(s => s.shown.map(v => v.q.key)))].filter(k => !HOMES[k]);
  if (todo.length) console.log(`EdgeProp: looking up ${todo.length} new condos (about ${Math.ceil(todo.length * 2.5 / 60)} min)`);
  for (const k of todo) { HOMES[k] = await edgeprop(k.split('|')[0]); wr('data/resale-homes.json', HOMES, true); }

  // 5. write r3
  const win = k => `${ym(W(k)[0])} to ${ym(W(k)[1])}`;
  let rows = 0, homes = 0;
  for (const [slug, s] of Object.entries(sets)) {
    if (!NEAR.proj[slug]) { console.log('no nearby.json entry for', slug, '- run the scratch build_near step first'); continue; }
    NEAR.proj[slug].r3 = { w0: win(0), w1: win(1), w4: win(4), total: s.total, in1: s.in1, rows: s.shown.map(({ q, d }) => {
      const h = HOMES[q.key] || {}, ok = h.lat != null && dist(h, q) <= 400; // EdgeProp page must be the same place
      rows++; if (ok && h.units) homes++;
      return [tc(/^RESIDENTIAL APARTMENTS$/.test(q.name) ? `Apartments on ${q.street}` : q.name), Math.round(d), q.tenure, ok ? h.top : null, ok ? h.units : null, q.psf12, q.n12, q.size, q.yoy, q.yoyAll, q.cagr4, q.cagr4All, q.ec ? 1 : 0];
    }) };
  }
  wr('data/nearby.json', NEAR);
  console.log(`Done: ${Object.keys(sets).length} sites, ${rows} rows, ${homes} with homes. Prices ${ym(W(4)[0])} to ${ym(LAST)}. Now run node scripts/build-pages.cjs`);
})().catch(e => { console.error(e.message); process.exit(1); });
