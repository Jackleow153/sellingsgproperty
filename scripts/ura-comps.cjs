#!/usr/bin/env node
// Competitor evidence for the condo analyses (method v2): latest resale transactions and rents for every condo in URA's data.
//
//   node scripts/ura-comps.cjs        then   python3 scripts/analysis/projects_v2.py
//
// Writes data/comp-tx.json: one row per project (name|street) with its URA point, tenure, EC flag and
//   m6 / m12   median psf and number of resales in the last 6 and 12 full months
//   b3         3-bedroom-size resales (90-130 sqm) in the last 12 months: median psf, median price, count
//   lo6 / hi6  lowest and highest psf in the last 6 months; last = latest contract month
//   g3 / gA    yearly change over 4 years (3-bedroom size / all sizes, 12-month medians, 3+ resales in each year); y1 = change over the past year
//   rent       last 4 quarters of rental contracts: median monthly rent psf (all) and median 3-bedroom rent, with counts
// Source: URA Data Service (PMI_Resi_Transaction, PMI_Resi_Rental). Key from URA_ACCESS_KEY or ~/.ura_access_key; never commit it.
const fs = require('fs'); const path = require('path'); const os = require('os');
const ROOT = path.join(__dirname, '..');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const base = 'https://eservice.ura.gov.sg/uraDataService';
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : null; };
const mi = c => (2000 + +c.slice(2)) * 12 + (+c.slice(0, 2) - 1);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ym = m => `${MON[m % 12]} ${Math.floor(m / 12)}`;
const tenure = t => /freehold/i.test(t) ? 'Freehold' : t.replace(/^(\d+) yrs lease commencing from (\d{4}).*/, '$1 years from $2');
function svy21(N, E) {
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
  return { lat: +(lat / rad).toFixed(6), lon: +(lon / rad).toFixed(6) };
}

(async () => {
  let key = process.env.URA_ACCESS_KEY;
  if (!key) { try { key = fs.readFileSync(path.join(os.homedir(), '.ura_access_key'), 'utf8').trim(); } catch {} }
  if (!key) throw new Error('No URA access key');
  const tr = await (await fetch(`${base}/insertNewToken/v1`, { headers: { AccessKey: key, 'User-Agent': UA } })).json();
  if (tr.Status !== 'Success') throw new Error('URA token: ' + (tr.Message || tr.Status));
  const get = async q => { const r = await fetch(`${base}/invokeUraDS/v1?${q}`, { headers: { AccessKey: key, Token: tr.Result, 'User-Agent': UA } }); const d = JSON.parse(new TextDecoder('latin1').decode(await r.arrayBuffer())); if (d.Status !== 'Success') throw new Error(q + ': ' + (d.Message || d.Status)); return d.Result; };
  const all = []; for (let b = 1; b <= 4; b++) { all.push(...await get(`service=PMI_Resi_Transaction&batch=${b}`)); console.log('transactions batch', b); }
  const LAST = all.reduce((m, p) => p.transaction.reduce((n, t) => Math.max(n, mi(t.contractDate)), m), 0) - 1;   // last full month
  const TYPES = new Set(['Apartment', 'Condominium', 'Executive Condominium']), P = {};
  for (const p of all) {
    if (!p.x || !p.y) continue;
    const tx = p.transaction.filter(t => TYPES.has(t.propertyType) && t.typeOfSale === '3' && t.noOfUnits === '1' && t.typeOfArea === 'Strata');
    if (!tx.length) continue;
    const k = p.project + '|' + p.street;
    const q = P[k] || (P[k] = { name: p.project, street: p.street, ...svy21(+p.y, +p.x), tx: [], ten: {}, ec: false });
    for (const t of tx) { q.tx.push({ m: mi(t.contractDate), psf: +t.price / (+t.area * 10.7639), price: +t.price, sqm: +t.area }); q.ten[t.tenure] = (q.ten[t.tenure] || 0) + 1; if (t.propertyType === 'Executive Condominium') q.ec = true; }
  }
  // rents: last 4 quarters
  const qs = []; for (let i = 0; i < 4; i++) { const m = LAST - 3 * i, y = Math.floor(m / 12) % 100, qq = Math.floor((m % 12) / 3) + 1; qs.push(`${String(y).padStart(2, '0')}q${qq}`); }
  const R = {};
  for (const ref of [...new Set(qs)]) {
    let res = []; try { res = await get(`service=PMI_Resi_Rental&refPeriod=${ref}`); console.log('rentals', ref, res.length); } catch (e) { console.log('rentals', ref, 'failed:', e.message); }
    for (const p of res) {
      const k = p.project + '|' + p.street, r = R[k] || (R[k] = { psf: [], b3: [] });
      for (const c of p.rental || []) {
        const [lo, hi] = String(c.areaSqft || '').split('-').map(Number); if (!lo || !hi) continue;
        const rent = +c.rent; r.psf.push(rent / ((lo + hi) / 2)); if (String(c.noOfBedRoom) === '3') r.b3.push(rent);
      }
    }
  }
  const out = { asOf: ym(LAST), m6: `${ym(LAST - 5)} to ${ym(LAST)}`, m12: `${ym(LAST - 11)} to ${ym(LAST)}`, rentQ: qs.slice().reverse().join(', '), p: {} };
  for (const [k, q] of Object.entries(P)) {
    const w = n => q.tx.filter(t => t.m > LAST - n && t.m <= LAST), t6 = w(6), t12 = w(12);
    if (!t12.length) continue;
    const b3 = t12.filter(t => t.sqm >= 90 && t.sqm <= 130), r = R[k];
    const yr = (k4, f) => { const v = q.tx.filter(t => t.m > LAST - 12 * (k4 + 1) && t.m <= LAST - 12 * k4 && f(t)).map(t => t.psf); return v.length >= 3 ? median(v) : null; };
    const is3 = t => t.sqm >= 90 && t.sqm <= 130, any = () => true;
    const cg = (a, b, n) => a && b ? +(((a / b) ** (1 / n) - 1) * 100).toFixed(1) : null;
    const g3 = cg(yr(0, is3), yr(4, is3), 4), gA = cg(yr(0, any), yr(4, any), 4), y1 = cg(yr(0, any), yr(1, any), 1);
    const n3 = q.tx.filter(t => t.m > LAST - 12 && t.m <= LAST && is3(t)).length;
    out.p[k] = { n: q.name, s: q.street, lat: q.lat, lon: q.lon, t: tenure(Object.entries(q.ten).sort((a, b) => b[1] - a[1])[0][0]), ec: q.ec ? 1 : 0,
      m6: t6.length ? [Math.round(median(t6.map(t => t.psf))), t6.length] : null, m12: [Math.round(median(t12.map(t => t.psf))), t12.length],
      lo6: t6.length ? Math.round(Math.min(...t6.map(t => t.psf))) : null, hi6: t6.length ? Math.round(Math.max(...t6.map(t => t.psf))) : null,
      b3: b3.length ? [Math.round(median(b3.map(t => t.psf))), Math.round(median(b3.map(t => t.price)) / 1000) * 1000, b3.length] : null,
      last: ym(Math.max(...t12.map(t => t.m))),
      g3, gA, y1, n3,
      rent: r && r.psf.length ? [+median(r.psf).toFixed(2), r.psf.length, r.b3.length ? Math.round(median(r.b3) / 50) * 50 : null, r.b3.length] : null };
  }
  fs.writeFileSync(path.join(ROOT, 'data', 'comp-tx.json'), JSON.stringify(out));
  console.log('wrote data/comp-tx.json:', Object.keys(out.p).length, 'projects; resales', out.m12, '; rents', out.rentQ);
})().catch(e => { console.error(e.message); process.exit(1); });
