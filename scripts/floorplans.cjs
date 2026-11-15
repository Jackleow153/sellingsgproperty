// Floor-plan sketches for the Condo Analysis completed-condo files.
// Reads data/floorplans.json, writes one small SVG per layout to assets/fp/ and a summary
// (scores, features, pros and cons, no geometry) to assets/fp/plans.json. Both load only when
// a reader opens the floor-plan section, so the main Condo Analysis script stays the same size.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILL = { room: '#FFFFFF', living: '#FBF8F1', kitchen: '#F3E6CC', wet: '#DCE8EE', hall: '#F1EEE7', study: '#EEF0E4', balcony: '#E3EEDC', ledge: '#D9D5CC', planter: '#D6E6CF', bay: '#E8E2F0', yard: '#E9E5DC', shelter: '#CFC9BD', store: '#E6E1D6' };
const HATCH = { balcony: 'hb', ledge: 'hl', planter: 'hp', bay: 'hl' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const area = r => (r[4] - r[2]) * (r[5] - r[3]);

// Layout score, same rules for every plan (shown on the page).
function score(p, waste, bal) {
  const f = p.f; let s = 4; const why = [];
  const add = (n, t) => { s += n; why.push([n, t]); };
  if (f.shape === 'regular') add(1, 'regular, squarish shape'); else add(0, 'odd or angled shape');
  if (f.dumb === true) add(1, 'dumbbell: bedrooms on both sides of the living room');
  if (f.kit === 'enclosed' || f.kit === 'dry+wet') add(1, f.kit === 'dry+wet' ? 'dry and wet kitchens; the wet kitchen can be closed off' : 'kitchen can be closed off');
  if (f.kwin) add(1, 'kitchen or its yard has a window to the outside');
  if (waste < 5) add(1, `AC ledge, planter and bay window about ${waste.toFixed(1)}% of the area`);
  else if (waste >= 10) add(-1, `AC ledge, planter and bay window about ${waste.toFixed(1)}% of the area`);
  if (f.corr === 'long') add(-1, 'long corridor or entrance passage');
  if (bal > 12) add(-1, `balcony about ${bal.toFixed(1)}% of the area`);
  if (f.store || f.hs || f.helper) add(1, 'store, household shelter or utility room');
  return [Math.max(1, Math.min(10, s)), why];
}

function svg(p, name) {
  const xs = p.rects.flatMap(r => [r[2], r[4]]), ys = p.rects.flatMap(r => [r[3], r[5]]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), x1 = Math.max(...xs), y1 = Math.max(...ys);
  const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.04) + 6;
  const W = x1 - x0 + pad * 2, H = y1 - y0 + pad * 2 + 22;
  const fs0 = Math.max(W, H) / 46;
  const rects = p.rects.map(r => {
    const [k, lab, a, b, c, d] = r; const w = c - a, h = d - b;
    const fill = HATCH[k] ? `url(#${HATCH[k]})` : FILL[k];
    const fz = Math.min(fs0, w / Math.max(4, lab.length * 0.62), h / 1.6);
    const t = lab && fz >= fs0 * 0.45 ? `<text x="${a + w / 2}" y="${b + h / 2}" font-size="${fz.toFixed(1)}">${esc(lab)}</text>` : '';
    return `<rect x="${a}" y="${b}" width="${w}" height="${h}" fill="${fill}"/>${t}`;
  }).join('');
  const e = p.entry ? `<path d="M${p.entry[0] - fs0 * .7} ${p.entry[1] + fs0 * 1.4}L${p.entry[0]} ${p.entry[1] + fs0 * .2}L${p.entry[0] + fs0 * .7} ${p.entry[1] + fs0 * 1.4}Z" fill="#B89B5E"/><text x="${p.entry[0]}" y="${p.entry[1] + fs0 * 2.5}" font-size="${(fs0 * .85).toFixed(1)}" fill="#7A6334">Entry</text>` : '';
  const sw = (Math.max(W, H) / 400).toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0 - pad} ${y0 - pad} ${W} ${H}" role="img" aria-label="${esc(name)}: simplified floor-plan sketch, not to scale">`
    + `<defs><pattern id="hb" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="${FILL.balcony}"/><line y2="12" stroke="#B9CDAE" stroke-width="3"/></pattern>`
    + `<pattern id="hl" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="${FILL.ledge}"/><line y2="10" stroke="#A9A397" stroke-width="3"/></pattern>`
    + `<pattern id="hp" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="10" height="10" fill="${FILL.planter}"/><line y2="10" stroke="#9DBB8E" stroke-width="3"/></pattern></defs>`
    + `<rect x="${x0 - pad}" y="${y0 - pad}" width="${W}" height="${H}" fill="#FAF8F3"/>`
    + `<g stroke="#0C1B2A" stroke-width="${sw}" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" text-anchor="middle" dominant-baseline="middle"><g>${rects}</g></g>`
    + `<g font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" text-anchor="middle" fill="#0C1B2A">${e}</g>`
    + `<text x="${x0 - pad + W / 2}" y="${y0 - pad + H - 10}" font-size="${(fs0 * .75).toFixed(1)}" font-family="system-ui,sans-serif" text-anchor="middle" fill="#6B6B6B">Simplified sketch, not to scale · sellingsgproperty.com</text></svg>`;
}

module.exports = function buildFloorPlans(ROOT) {
  const all = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/floorplans.json'), 'utf8')), src = all.plans;
  const dir = path.join(ROOT, 'assets/fp'); fs.mkdirSync(dir, { recursive: true });
  const out = {}; let n = 0;
  for (const [cid, list] of Object.entries(src)) {
    out[cid] = list.map(p => {
      const tot = p.rects.reduce((a, r) => a + area(r), 0), share = ks => p.rects.filter(r => ks.includes(r[0])).reduce((a, r) => a + area(r), 0) / tot * 100;
      const waste = p.stated ? p.stated[1] / p.stated[2] * 100 : share(['ledge', 'planter', 'bay']);
      const bal = p.stated ? p.stated[0] / p.stated[2] * 100 : share(['balcony']);
      const [sc, why] = score(p, waste, bal);
      const s = svg(p, `${cid} ${p.type}`); const v = crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
      const file = `${cid}-${p.k}.svg`; fs.writeFileSync(path.join(dir, file), s); n++;
      const xs = p.rects.flatMap(r => [r[2], r[4]]), ys = p.rects.flatMap(r => [r[3], r[5]]);
      return { k: p.k, type: p.type, sqft: p.sqft, note: p.note || null, units: p.units || null, sc, why, f: p.f, waste: +waste.toFixed(1), bal: +bal.toFixed(1), stated: !!p.stated, pros: p.pros, cons: p.cons, src: p.src, svg: `/assets/fp/${file}?v=${v}`, ar: +((Math.max(...ys) - Math.min(...ys)) / (Math.max(...xs) - Math.min(...xs))).toFixed(3) };
    });
  }
  const json = JSON.stringify({ p: out, s: all.sales || {}, src: all.salesSrc || '' });
  fs.writeFileSync(path.join(dir, 'plans.json'), json);
  return { url: `/assets/fp/plans.json?v=${crypto.createHash('sha1').update(json).digest('hex').slice(0, 8)}`, data: out, count: n };
};
