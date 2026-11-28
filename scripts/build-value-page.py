#!/usr/bin/env python3
"""Write the condo part of /undervalued-pty/ from the value screen (27 Nov 2026).

  python3 scripts/analysis/value_screen.py   # data/value-screen.json (resale condos, URA caveats in data/comp-tx.json)
  python3 scripts/build-value-page.py        # fills the value:* markers in undervalued-pty/index.html

Selling-now condos come from their condo analyses (assets/std/<id>.json, built by scripts/build-pages.cjs), so run the
site build first when those change. The HDB section (listed-now markers, scripts/refresh-buylow.py) is never touched.
"""
import datetime, glob, html, json, os, re, sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'analysis'))
from value_screen import DNAME, REGION_BY_D  # noqa: E402


class VS: DNAME, REGION_BY_D = DNAME, REGION_BY_D

PAGE = os.path.join(ROOT, 'undervalued-pty', 'index.html')
COMP = json.load(open(os.path.join(ROOT, 'data', 'comp-tx.json')))
VD = json.load(open(os.path.join(ROOT, 'data', 'value-screen.json')))
R = VD['rows']
try: CTX = json.load(open(os.path.join(ROOT, 'data', 'value-context.json')))
except Exception: CTX = {'p': {}, 'mop_years': [2020, 2026]}


def clean(n): return re.sub(r'\s+\.\s+', ' ', n)   # URA writes 'KINGSFORD . HILLVIEW PEAK'


for _r in R:
    _r['name'] = clean(_r['name'])
    for _c in _r['comps']: _c['name'] = clean(_c['name'])
# 'Updated' is the day the value screen last ran on fresh data (value_screen.py stamps it), not the day this page was rebuilt
CHECKED_ISO = VD.get('checked', '2026-11-27')
_cd = datetime.date.fromisoformat(CHECKED_ISO)
CHECKED = f"{_cd.day} {_cd.strftime('%b %Y')}"
CROSSCHECK = '27 Nov 2026'   # the Stacked Homes cross-check of the flagged condos
E = html.escape


def money(v):
    return f"${v / 1e6:.2f}M" if v >= 1e6 else f"${round(v / 1000):,}k"


def psf(v): return f"${round(v):,}"
def pc(g): return f"{abs(round(g * 100))}%"
def dd(d): return f"D{int(d):02d}"


# ---------- resale condos ----------
BY = defaultdict(list)
for r in R: BY[r['key']].append(r)
for rs in BY.values(): rs.sort(key=lambda r: ('2-bed', '3-bed', '4-bed').index(r['band']))

# condo analyses: completed condos link to their page; selling-now condos get their own cards
STD = {}
for f in sorted(glob.glob(os.path.join(ROOT, 'assets', 'std', '*.json'))):
    STD[os.path.basename(f)[:-5]] = json.load(open(f))


def norm(s): return re.sub(r'[^a-z0-9]', '', s.lower().replace('the ', ''))


STD_BY_NAME = {norm(re.sub(r'\s*\(.*$', '', d['compare'][0][0])): i for i, d in STD.items() if d.get('compare')}

LEVEL = {'undervalued': 1, 'price': 1, 'check': 2, 'watch': 2}
TAGTXT = {'undervalued': ('Undervalued', 'Buyers pay well below the neighbours; tenants do not.'),
          'price': ('Undervalued on price', 'Rents only partly back it: one rent measure is close to the neighbours, the other is not.'),
          'check': ('Cheaper, check why', 'Rents are about as far below the neighbours as prices, so the market may be pricing a real drawback.'),
          'watch': ('Cheaper, not proven', '6% or more below its competitors, but short of one test.'),
          'rich': ('Priced above its competitors', ''), None: ('In line with its competitors', '')}


_IDS = set()


def anchor(name):
    a = 'c-' + re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-'); b = a; k = 2
    while b in _IDS: b = f'{a}-{k}'; k += 1
    _IDS.add(b); return b


def size_label(r): return f"{r['band']} size (about {r['size']:,} sq ft)"


def why_list(rs):
    r = rs[0]; out = []
    if r['tag'] == 'check':
        g = [x for x in (r['rent_psf_gap'], r['rent3_gap']) if x is not None]
        out.append(f"Rents are also about {pc(min(g))} to {pc(max(g))} below the neighbours'. Check the reason (position in the area, layouts, facilities, noise) before relying on the gap." if len(g) > 1
                   else f"Rents are also about {pc(g[0])} below the neighbours'. Check the reason before relying on the gap.")
    if any(x['km_band'] == 2 for x in rs): out.append('Fewer than 2 suitable competitors within 1 km, so the comparison reaches 2 km.')
    if r['cn'] < 10: out.append(f"Only {r['cn']} resales in 12 months: a few low-floor or unrenovated units can pull the average down. URA records used here carry no floor level.")
    if r['lease_left'] and r['lease_left'] < 80: out.append(f"About {r['lease_left']} years left on the lease. Check the CPF and loan rules for your age.")
    if any(x['odd'] for x in rs): out.append('One size is left out of the verdict: it is far cheaper than this condo\'s other sizes (often penthouses or garden units with large terraces).')
    if r['units'] and r['units'] < 100: out.append(f"A small project ({r['units']} homes): fewer facilities and fewer resales to price from.")
    return out


def facts_line(r):
    ten = ('Executive condo, ' if r['ec'] else '') + (r['tenure'].replace('99 years from', '99-year lease from').replace('103 years from', '103-year lease from') if r['ten'] == 'LH' else ('Freehold' if r['tenure'] == 'Freehold' else r['tenure'].replace(' years from', '-year lease from')))
    bits = [r['street'], dd(r['d']), ten, f"completed {r['top']}", f"{r['units']:,} homes" if r['units'] else None]
    if r['lease_left']: bits.append(f"about {r['lease_left']} years left")
    return ' · '.join(b for b in bits if b)


def comps_table(rs):
    comp = {}
    for x in rs:
        if x['odd']: continue
        for c in x['comps']:
            e = comp.setdefault(c['name'], dict(c=c, sizes=[]))
            e['sizes'].append(f"{x['band']} {psf(c['psf'])} ({c['n']} in {c['win']} mo) → {psf(c['conv'])}")
    rows = ''.join(f"<tr><td>{E(n)}</td><td class=\"n\">{e['c']['km']:.1f} km</td><td class=\"n\">{e['c']['top']}</td><td class=\"n\">{e['c']['units'] or '–'}</td><td>{E('; '.join(e['sizes']))}</td></tr>"
                   for n, e in sorted(comp.items(), key=lambda t: t[1]['c']['km']))
    return ('<div class="alts"><table><thead><tr><th>Competitor</th><th class="n">Distance</th><th class="n">Completed</th><th class="n">Homes</th>'
            '<th>Same-size psf (resales, months) → at this condo\'s age</th></tr></thead><tbody>' + rows + '</tbody></table></div>')


def rent_line(r):
    parts = []
    c3 = [c['rent3'] for c in r['comps'] if c.get('rent3')]
    if r.get('rent3_own') and len(c3) >= 2:
        a = sum(c3) / len(c3)
        parts.append(f"3-bedroom ${r['rent3_own']:,} a month against the competitors' ${round(a / 50) * 50:,} ({pc(r['rent3_gap'])} {'lower' if r['rent3_gap'] > 0 else 'higher'})")
    cr = [c['rent'] for c in r['comps'] if c['rent']]
    if r['rent_own'] and cr:
        parts.append(f"per sq ft ${r['rent_own']:.2f} against ${sum(cr) / len(cr):.2f} ({pc(r['rent_psf_gap'])} {'lower' if r['rent_psf_gap'] > 0 else 'higher'})")
    return ('Rents (URA rental contracts, last 4 quarters): ' + '; '.join(parts) + '.') if parts else 'Rents: too few rental contracts to compare.'


def comma(n): return f"{int(round(n, -1)):,}"


def ctx_resale(key):
    c = CTX['p'].get(key)
    if not c: return ''
    w, m0 = c.get('walk'), c['mrt'][0]
    same = lambda a, b: re.sub(r'\s*(mrt|lrt)$', '', a.lower().strip()) == re.sub(r'\s*(mrt|lrt)$', '', b.lower().strip())
    if w:
        mrt = f"{w['station']} ({w['line']}), about {w['m']:,} m, {'an' if str(w['minutes']).startswith('8') or w['minutes'] in (11, 18) else 'a'} {w['minutes']}-minute walk (varies by block)"
        if not same(w['station'], m0['station']):
            mrt += f"; the closest exit in a straight line is {m0['station']} {m0['kind']}, about {m0['m']:,} m"
    else:
        mrt = f"{m0['station']} {m0['kind']} exit about {m0['m']:,} m in a straight line"
    if m0['kind'] == 'LRT':
        hm = next((x for x in c['mrt'] if x['kind'] == 'MRT'), None)
        if hm: mrt += f"; the nearest MRT exit is {hm['station']}, about {hm['m']:,} m in a straight line"
    for r in c.get('rail') or []:
        mrt += f". Rail plan: the {r['line']} at {r['station']}, targeted {r['year']} (LTA)"
    y0, y1 = CTX.get('mop_years', [2020, 2026])
    towns = sorted(c['mop'].items(), key=lambda t: -t[1])
    buy = []
    if towns:
        tot = sum(n for _, n in towns)
        buy.append(f"HDB upgraders from {and_list([t for t, _ in towns])}, where about {comma(tot)} four-room and bigger flats completed in {y0}–{y1} reach their minimum occupation period (MOP) between {y0 + 5} and {y1 + 5}")
    else:
        buy.append(f"few HDB upgraders: no HDB town within 1 km completed four-room or bigger flats in {y0}–{y1}")
    if c['landed5'] >= 150: buy.append(f"landed owners right-sizing (about {comma(c['landed5'])} landed homes resold within 1.5 km in 5 years)")
    if c.get('hub') and c['hub'][1] <= 3: buy.append(f"people working at {c['hub'][0]}, about {c['hub'][1]:.1f} km away")
    b = '; '.join(buy); b = b[0].upper() + b[1:]
    return (f"<div class=\"vc-ctx\"><p><b>MRT:</b> {E(mrt)}.</p><p><b>Likely future buyers:</b> {E(b)}.</p></div>")


def ctx_sell(sid):
    d = STD.get(sid) or {}
    facts = {f[0]: f[1] for f in d.get('facts', [])}
    mrt = facts.get('MRT')
    rail = [r for r in d.get('plan', []) if str(r[5]).startswith('rail') and r[2] != 'Open']
    who = (d.get('exit') or {}).get('who')
    if not (mrt or who): return ''
    m = (mrt or '').rstrip('.')
    for r in rail: m += f". Rail plan: {r[0]} ({r[1].lower()}, {r[2].lower()})"
    return ("<div class=\"vc-ctx\">" + (f"<p><b>MRT:</b> {E(m)}.</p>" if m else '') + (f"<p><b>Likely future buyers:</b> {E(who.rstrip('.'))}.</p>" if who else '') + "</div>")


def resale_card(rs):
    r = rs[0]; tag = r['tag']; lvl = LEVEL[tag]
    good = [x for x in rs if not x['odd']]
    t, tt = TAGTXT[tag]
    sid = STD_BY_NAME.get(norm(r['name']))
    q = ' '.join([r['name'], r['street'], dd(r['d']), VS.DNAME.get(r['d'], '')]).lower()
    def srow(x):
        cls = ' class="odd"' if x['odd'] else ''
        left = ' (left out)' if x['odd'] else ''
        sign = '−' if x['gap'] > 0 else '+'
        return (f"<tr{cls}><td>{E(size_label(x))}{left}</td><td class=\"n\" data-l=\"Its avg psf (resales)\">{psf(x['own'])} ({x['n']})</td>"
                f"<td class=\"n\" data-l=\"Competitors support\">{psf(x['fair'])}</td><td class=\"n\" data-l=\"Gap\"><b>{sign}{pc(x['gap'])}</b></td><td class=\"n\" data-l=\"Price at that size\">{money(x['own'] * x['size'])} vs {money(x['fair'] * x['size'])}</td></tr>")
    sizes = ''.join(srow(x) for x in rs)
    ncomp = sorted({c['name'] for x in good for c in x['comps']})
    far = any(x['km_band'] == 2 for x in good)
    why = why_list(rs)
    return (f"<article id=\"{anchor(r['name'])}\" class=\"vc lvl{lvl} t-{tag}\" data-lvl=\"{lvl}\" data-gap=\"{r['cgap']:.4f}\" data-sale=\"resale\" data-ten=\"{'EC' if r['ec'] else r['ten']}\" data-seg=\"{r['region']}\" data-q=\"{E(q)}\">"
            f"<div class=\"vc-top\"><h3 class=\"vc-name\">{E(r['name'])}<small>{E(facts_line(r))}</small></h3>"
            f"<div class=\"vc-gap\"><strong>{pc(r['cgap'])} below</strong><small>its {len(ncomp)} closest competitors, same size, same tenure</small></div></div>"
            f"<p class=\"vc-tag\"><span class=\"badge b-{tag}\">{t}</span> <span class=\"mut\">Resale · {r['region']}.</span> {E(tt)}</p>"
            f"<div class=\"alts\"><table class=\"vc-sizes\"><thead><tr><th>Unit size</th><th class=\"n\">Its resales, avg psf (sales)</th><th class=\"n\">Competitors support</th><th class=\"n\">Gap</th><th class=\"n\">Price at that size</th></tr></thead><tbody>{sizes}</tbody></table></div>"
            + ctx_resale(r['key']) +
            f"<p class=\"vc-note\">{E(rent_line(r))}</p>"
            + (f"<ul class=\"vc-why\">{''.join(f'<li>{E(w)}</li>' for w in why)}</ul>" if why else '')
            + f"<details class=\"vc-more\"><summary>The competitors: {E(', '.join(ncomp))} ({'up to 2 km' if far else 'all within 1 km'})</summary>{comps_table(rs)}</details>"
            + (f"<p class=\"vc-link\"><a href=\"/condo-analysis/{sid}/\">Full analysis of {E(r['name'])}</a></p>" if sid else '')
            + '</article>')


# ---------- selling-now condos (developer sales), from their condo analyses ----------
def num(s):
    m = re.search(r'\$([\d,]+) psf', s or ''); return int(m.group(1).replace(',', '')) if m else None


SELL = []
for i, d in STD.items():
    g = d.get('gauge') or {}
    if g.get('exp') != 'current average': continue
    dm = re.search(r'\bD(\d\d)\b', (d.get('district') or {}).get('summary', ''))
    if not dm: continue
    name = re.sub(r'\s*\((current average|executive condo)\)', '', d['compare'][0][0]).strip()
    facts = {f[0]: f[1] for f in d['facts']}
    ten = facts.get('Tenure', '')
    ec = 'executive condo' in d['compare'][0][0].lower() or d.get('ecCap') is not None or '(EC)' in ten
    tcls = 'EC' if ec else ('FH' if re.search(r'freehold|999', ten, re.I) else 'LH')
    types = []
    for row in d['types']:
        b = re.match(r'(\d)-bed', row[0]); mid = d['typesMid'].get(f'{b.group(1)}-bed') if b else None
        buy, walk = num(row[2]), num(row[3])
        if mid and buy: types.append(dict(label=row[0], verdict=row[1], mid=mid, buy=buy, walk=walk, gap=1 - mid / buy))
    gap = 1 - g['lo'] / g['buy'] if g.get('lo') and g.get('buy') else None
    if gap is None: continue
    lvl = 1 if gap >= 0.10 else 2 if gap >= 0 else 3
    region = re.search(r'\((OCR|RCR|CCR)\)', d['district']['summary']); region = region.group(1) if region else VS.REGION_BY_D.get(int(dm.group(1)), 'OCR')
    SELL.append(dict(id=i, name=name, d=int(dm.group(1)), ten=tcls, tenure=ten, ec=ec, types=types, gap=gap, lvl=lvl, tm=g.get('tm'), lo=g['lo'], buy=g['buy'], walk=g.get('walk'),
                     verdict=d['strip'][0][1], sales=facts.get('Sales so far', ''), region=region, asof=d.get('asOf', ''), comps=[c[0] for c in d.get('comps', [])][:5]))


def sell_card(s):
    q = ' '.join([s['name'], dd(s['d']), VS.DNAME.get(s['d'], ''), 'selling new launch developer']).lower()
    if s['gap'] >= 0.10: head = f"{pc(s['gap'])} below"; sub = 'its buy-at price from the closest competitors'
    elif s['gap'] >= 0: head = f"{pc(s['gap'])} below"; sub = 'its buy-at price: fair, not a clear gap'
    else: head = f"{pc(s['gap'])} above"; sub = 'its buy-at price from the closest competitors'
    badge = ('undervalued', 'Undervalued') if s['lvl'] == 1 else ('watch', 'At or below buy-at') if s['lvl'] == 2 else ('rich', 'Above buy-at')
    rows = ''.join(f"<tr><td>{E(t['label'])}</td><td class=\"n\" data-l=\"Developer's average psf\">{psf(t['mid'])}</td><td class=\"n\" data-l=\"Buy at or below\">{psf(t['buy'])}</td><td class=\"n\" data-l=\"Walk away above\">{psf(t['walk']) if t['walk'] else '–'}</td><td class=\"n\" data-l=\"Gap\"><b>{'−' if t['gap'] > 0 else '+'}{pc(t['gap'])}</b></td><td data-l=\"Verdict\">{E(t['verdict'])}</td></tr>" for t in s['types'])
    ten = ('Executive condo, ' if s['ec'] and 'EC' not in s['tenure'] else '') + s['tenure']
    return (f"<article id=\"{anchor(s['name'])}\" class=\"vc sell lvl{s['lvl']}\" data-lvl=\"{s['lvl']}\" data-gap=\"{s['gap']:.4f}\" data-sale=\"selling\" data-ten=\"{s['ten']}\" data-seg=\"{s['region']}\" data-q=\"{E(q)}\">"
            f"<div class=\"vc-top\"><h3 class=\"vc-name\">{E(s['name'])}<small>{E(' · '.join(x for x in [dd(s['d']), ten, s['sales']] if x))}</small></h3>"
            f"<div class=\"vc-gap\"><strong>{head}</strong><small>{sub}</small></div></div>"
            f"<p class=\"vc-tag\"><span class=\"badge b-{badge[0]}\">{badge[1]}</span> <span class=\"mut\">Selling now · {s['region']}.</span> Verdict in its analysis: {E(s['verdict'])}.</p>"
            f"<div class=\"alts\"><table class=\"vc-sizes\"><thead><tr><th>Unit type</th><th class=\"n\">Developer's current average psf</th><th class=\"n\">Buy at or below</th><th class=\"n\">Walk away above</th><th class=\"n\">Gap</th><th>Verdict</th></tr></thead><tbody>{rows}</tbody></table></div>"
            + ctx_sell(s['id']) +
            f"<p class=\"vc-note\">Competitors used: {E(', '.join(s['comps']))}. Same rules as the resale screen (same tenure, similar size, 1 km first), then converted to a new-launch price with the premium launches are paying now. Analysis dated {E(s['asof'])}.</p>"
            f"<p class=\"vc-link\"><a href=\"/condo-analysis/{s['id']}/\">Full analysis of {E(s['name'])}</a></p></article>")


# ---------- district sections ----------
def gap_txt(g): return f"{'−' if g > 0 else '+'}{pc(g)}"


def build_list():
    dists = sorted({r['d'] for r in R} | {s['d'] for s in SELL})
    out = []
    for d in dists:
        cond = [rs for rs in BY.values() if rs[0]['d'] == d]
        flagged = sorted([rs for rs in cond if rs[0]['tag'] in ('undervalued', 'price', 'check')], key=lambda rs: (LEVEL[rs[0]['tag']], -rs[0]['cgap']))
        watch = sorted([rs for rs in cond if rs[0]['tag'] == 'watch'], key=lambda rs: -rs[0]['cgap'])
        sells = sorted([s for s in SELL if s['d'] == d], key=lambda s: -s['gap'])
        cnt = Counter(rs[0]['tag'] for rs in cond)
        summ = [f"{len(cond)} resale condo{'s' if len(cond) != 1 else ''} screened"]
        u = cnt['undervalued'] + cnt['price']
        if u: summ.append(f"{u} undervalued")
        if cnt['check']: summ.append(f"{cnt['check']} cheaper, check why")
        if cnt['watch']: summ.append(f"{cnt['watch']} cheaper but not proven")
        if sells: summ.append(f"{len(sells)} selling now" + (f", {sum(1 for s in sells if s['lvl'] == 1)} of them 10% or more below buy-at" if any(s['lvl'] == 1 for s in sells) else ''))
        cards = ''.join(resale_card(rs) for rs in flagged) + ''.join(sell_card(s) for s in sells if s['lvl'] <= 2)
        lines = []
        if watch:
            lines.append('<p><b>Cheaper, but not proven</b> (resale, 6% or more below its competitors, but short of one test): ' + '; '.join(
                f"{E(rs[0]['name'])} {gap_txt(rs[0]['cgap'])} ({', '.join(x['band'] for x in rs if not x['odd'])} size; {E(', '.join(rs[0]['why_not']))})" for rs in watch) + '.</p>')
        above = [s for s in sells if s['lvl'] == 3]
        if above:
            lines.append('<p><b>Selling now, above its buy-at price:</b> ' + '; '.join(
                f"<a href=\"/condo-analysis/{s['id']}/\">{E(s['name'])}</a> {gap_txt(s['gap'])} ({E(s['verdict'])})" for s in above) + '.</p>')
        if cond:
            lines.append(f"<details class=\"dist-all\"><summary>Every resale condo screened in {dd(d)} ({len(cond)})</summary><p>" + ' · '.join(
                f"{E(rs[0]['name'])} {gap_txt(rs[0]['cgap'])}" + (f" ({TAGTXT[rs[0]['tag']][0].lower()})" if rs[0]['tag'] in ('undervalued', 'price', 'check', 'rich') else '')
                for rs in sorted(cond, key=lambda rs: -(rs[0]['cgap'] or 0)) if rs[0]['cgap'] is not None)
                + '. A minus sign means below what its competitors support; a plus sign, above.</p></details>')
        out.append(f"<section class=\"dist\" id=\"{dd(d).lower()}\" data-d=\"{d}\" aria-labelledby=\"{dd(d).lower()}-h\">"
                   f"<h2 id=\"{dd(d).lower()}-h\">{dd(d)} · {E(VS.DNAME.get(d, ''))}</h2><p class=\"dist-sum\">{E('; '.join(summ))}.</p>{cards}"
                   + (f"<div class=\"dist-more\">{''.join(lines)}</div>" if lines else '') + '</section>')
    out.append('<aside class="vcta"><p><b>Looking at one of these condos?</b> Before you make an offer, get a free second opinion on the price, the stack and who will buy it from you later.</p>'
               '<a class="vcta-btn" href="/contact/">Get my free situation check</a></aside>')
    return ''.join(out)


tags = Counter(rs[0]['tag'] for rs in BY.values())
N_COND, N_BANDS = len(BY), len(R)
N_U = tags['undervalued'] + tags['price']
N_SELL_U = sum(1 for s in SELL if s['lvl'] == 1)
N_DIST = len({r['d'] for r in R})
gaps = sorted(r['gap'] for r in R)
MEAN_GAP = sum(gaps) / len(gaps)
SD_GAP = (sum((g - MEAN_GAP) ** 2 for g in gaps) / len(gaps)) ** .5
SL = {k: f"{v * 100:.1f}%" for k, v in VD['slopes'].items()}
PAIRS = VD['pairs']
TOPS = sorted([rs for rs in BY.values() if rs[0]['tag'] in ('undervalued', 'price')], key=lambda rs: -rs[0]['cgap'])

DOPTS = ''.join(f'<option value="{d}">{dd(d)} · {E(VS.DNAME.get(d, ""))}</option>' for d in sorted({r["d"] for r in R} | {s["d"] for s in SELL}))

STATS = (f"<div class=\"vstats\"><div><b class=\"num\">{N_COND}</b><span>resale condos screened in {N_DIST} districts</span></div>"
         f"<div><b class=\"num\">{N_U}</b><span>resale condos undervalued, on every test</span></div>"
         f"<div><b class=\"num\">{N_SELL_U} of {len(SELL)}</b><span>launches 10% or more below their buy-at price</span></div></div>")

# sticky quick bar: appears only after the filter panel has scrolled away, while the condo list is on screen
BAR = (f"<div class=\"vbar\" id=\"vbar\" role=\"region\" aria-label=\"Quick filters\"><div class=\"vbar-in\">"
       f"<select id=\"vbar-d\" aria-label=\"Jump to district\"><option value=\"\">Jump to district</option>{DOPTS}</select>"
       f"<span class=\"vbar-sum\" id=\"vbar-sum\"></span>"
       f"<button type=\"button\" class=\"vbar-f\" id=\"vbar-f\">Filters<span class=\"vbar-n\" id=\"vbar-n\" hidden></span></button></div></div>")

CONTROLS = f"""
      <div class="seg" role="group" aria-label="View">
        <button class="chip" type="button" data-show="3">All districts</button>
        <button class="chip" type="button" data-show="top" title="The 10 condos furthest below their competitors or buy-at price, ranked">Top 10 gaps</button>
      </div>
      <select id="vdist" aria-label="Jump to district"><option value="">Jump to district</option>{DOPTS}</select>
      <span class="sr-only" id="vcount" aria-live="polite"></span>
      <div class="vrow">
        <input type="search" id="vq" placeholder="Search condo, street or D19" aria-label="Search condo, street or district">
        <select id="vsale" aria-label="Sale type">
          <option value="all">All sales</option>
          <option value="resale">Resale only</option>
          <option value="selling">Selling now only</option>
        </select>
        <select id="vten" aria-label="Tenure">
          <option value="all">All tenures</option>
          <option value="LH">99-year leasehold</option>
          <option value="FH">Freehold and 999-year</option>
          <option value="EC">Executive condo</option>
        </select>
        <select id="vseg" aria-label="Market segment">
          <option value="All">All regions</option>
          <option value="OCR">OCR · outside central</option>
          <option value="RCR">RCR · city fringe</option>
          <option value="CCR">CCR · core central</option>
        </select>
      </div>
"""

INTRO = f"""
    <p class="eyebrow">Condos and HDB · URA resales {COMP['m12'].replace(' to ', ' – ')}</p>
    <h1>Find Undervalued Singapore Property</h1>
    <p class="lede">Condos priced below their closest like-for-like competitors, district by district.</p>
    <p class="intro">You cannot control the market, but you can control the price you pay, and that price decides much of what you make when you sell. Every purchase starts behind: stamp duty, legal fees and agent fees come off the top before any growth. Pay 10% too much for a $2 million condo and that is $200,000 to earn back before you make a cent. Yet similar homes a few streets apart can sell 10% to 20% apart, for reasons that often have little to do with the homes themselves: a quiet month, a seller who must move, a launch priced to sell fast. This page finds those gaps, so you can buy with room to spare instead of paying full price. Not every cheaper home is a bargain, so each one comes with the evidence to check before you commit.</p>
    <p class="byline">By <a href="/about/">Jack Leow</a> (CEA R074023I, PropNex Realty) · Updated {CHECKED}</p>
"""

CHECKS = """
      <li><strong>Is there a reason it is cheaper?</strong> A price gap that tenants do not share (rents close to the neighbours') points to a cheap price. When rents are just as far below, the market may be pricing something real: a noisy road, older layouts, fewer facilities, or the wrong side of the area. The cards marked "Cheaper, check why" have this pattern. Visit at the hour you would come home.</li>
      <li><strong>How much evidence is behind the average?</strong> Each card shows how many resales sit behind its price and its competitors'. URA records carry no floor level, so a few low-floor or unrenovated units can pull a small sample down. Ask for the floor and condition of the recent sales, and read the lease left on a 99-year condo.</li>
      <li><strong>Does the gap hold for the unit you want?</strong> The gap is worked out per unit size. A condo can be cheap in its 3-bed size and fair in its 2-bed size. Use the "Price at that size" column as a ceiling for your offer, and open the competitors to see which condos set it.</li>
"""

UND = sorted([rs[0] for rs in BY.values() if rs[0]['tag'] in ('undervalued', 'price')], key=lambda r: -r['cgap'])
SELL_U = sorted([x for x in SELL if x['lvl'] == 1], key=lambda x: -x['gap'])
DCOUNT = Counter(r['d'] for r in UND).most_common()
REG_ALL = Counter(rs[0]['region'] for rs in BY.values()); REG_U = Counter(r['region'] for r in UND)


def and_list(xs): return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]


NUMW = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five'}
top_d = DCOUNT[0]
next_d = sorted(d for d, n in DCOUNT[1:] if n == DCOUNT[1][1]) if len(DCOUNT) > 1 else []
FAQ = [
    ("What makes a property undervalued?",
     f"A home is undervalued when it sells for clearly less than homes like it, nearby, are selling for. On this page that means a condo whose own resales over the past 12 months average at least 10% below what its closest like-for-like competitors support: same tenure, a similar number of homes, within 1 km (2 km if needed), the same unit size, adjusted for building age. It must also be cheaper at every unit size compared, stay 5% or more below when any one competitor is left out, be cheaper than at least two in three competitors, and rest on at least 5 resales. {N_U} of the {N_COND} resale condos screened pass."),
    ("Why does buying below value matter?",
     "Because the price you pay is the one part of your return you control. Stamp duty, legal fees and agent fees take a slice of every purchase, and Seller's Stamp Duty applies if you sell within 4 years. Paying 10% too much for a $2 million condo is $200,000 that has to be earned back before you make any profit. Buying 10% below the neighbours gives you that room instead: a cushion if prices soften, and a price the next buyer can accept."),
    ("Which condos are the most undervalued right now?",
     f"As of {CHECKED}, the resale condos furthest below their competitors that pass every test are "
     + and_list([f"{r['name']} ({dd(r['d'])}, about {pc(r['cgap'])} below)" for r in UND[:5]])
     + (f". Among condos still selling, {and_list([x['name'] for x in SELL_U[:2]])} are priced about {pc(SELL_U[0]['gap'])} below their buy-at prices" if SELL_U else '')
     + ". These are findings from past sales, not a recommendation to buy: open each card to see the competitors and the sales behind the number."),
    ("Which districts have the most undervalued condos?",
     f"{dd(top_d[0])} ({VS.DNAME[top_d[0]]}) has the most, with {NUMW.get(top_d[1], top_d[1])}"
     + (f", followed by {and_list([dd(d) for d in next_d])} with {NUMW.get(DCOUNT[1][1], DCOUNT[1][1])} each" if next_d else '')
     + f". By region, {REG_U['RCR']} of {REG_ALL['RCR']} city-fringe (RCR) condos, {REG_U['CCR']} of {REG_ALL['CCR']} core central (CCR) condos and {REG_U['OCR']} of {REG_ALL['OCR']} suburban (OCR) condos screened came out undervalued, so suburban condos were about half as likely to be priced well below their neighbours."),
    ("Why would a condo sell for less than its neighbours?",
     "Sometimes for a reason buyers should weigh: a busy road or expressway, an older or less efficient layout, fewer facilities, a longer walk to the MRT, a shorter lease, or many similar units coming up for sale nearby. Sometimes for reasons that have nothing to do with the home: a seller who has to move quickly, a thin resale market with few buyers that month, or a developer pricing a launch to sell fast. Rents help tell them apart. Tenants pay for the home, not the deal, so a condo whose rents are close to its neighbours' while its prices are not is more likely to be cheap for the second kind of reason."),
    ("Can an undervalued condo still lose money?",
     "Yes. A lower price gives you a margin of safety, not a guarantee. The whole market can fall, a gap can stay open for years if buyers keep discounting the condo, and buying and selling costs still apply. Buy a home that suits how you will live in it or rent it out, at a price you can hold through a downturn. A gap on this page is a reason to look closer, not a reason to buy."),
    ("How do I check a condo before making an offer?",
     "Ask for the recent caveats for the exact unit size and compare them with this page. Check the floor, facing and condition of those sales, because the URA records used here carry no floor level. Read the lease left and the maintenance fees, compare rents for the same bedroom type, and visit at the time of day you would come home. If the price still sits below its competitors after all that, the gap is likely real."),
    ("Which condos are compared with each other?",
     "Only condos with the same tenure: 99-year leasehold with 99-year leasehold (leases of 90 to 110 years), freehold with freehold and 999-year, and executive condos only with executive condos. Mall-integrated condos are only compared with other mall-integrated condos. The competitor must have 0.4 to 2.5 times as many homes, be completed in 2004 or later, and sit within 1 km. If fewer than 2 qualify within 1 km, the search widens to 2 km. The 5 nearest are used."),
    ("How are different unit sizes and building ages handled?",
     f"For each unit size a condo resells in, every competitor's price is the average psf of its own resales within 15% of that size (25% if too few), over the past 6 months, or 12 or 24 if too few, moved to today with URA's price index. Each competitor is then adjusted to this condo's age: {SL['LH']} a year for 99-year condos and {SL['FH']} a year for freehold, the price fall per year of age measured across {PAIRS['LH'] + PAIRS['FH']:,} nearby condo pairs in the same data."),
    ("Are new launches and post-launch condos included?",
     f"Yes. The {len(SELL)} condos still selling developer units that have a condo analysis on this site are listed in their district. Each analysis sets a buy-at price from the same kind of competitors, converted to a new-launch price with the premium launches are paying now. A selling condo counts as undervalued when the developer's current average is 10% or more below that buy-at price; {N_SELL_U} do."),
    ("Why does the page show rents?",
     "Rents are a check on the price gap. If tenants pay close to the neighbours' rent while buyers pay much less, the discount is in the price, not in the home. If rents are just as far below, the market may be pricing a real drawback, so those condos are marked \"Cheaper, check why\". Rents are URA rental contracts over the last 4 quarters: the median 3-bedroom rent and the median rent per square foot."),
    ("Can I find undervalued HDB flats too?",
     "Yes. Choose HDB at the top. Each HDB card compares registered resale prices for an older lease and a newer lease in the same town and flat type, with lease start years 1 to 10 apart and a median gap above $100,000. Those prices come from HDB's open data on data.gov.sg and are never mixed into the condo comparison."),
    ("Are the prices on this page asking prices?",
     "No. Resale prices are URA caveats lodged for completed private condos from November 2025 to October 2026. Selling-now prices are the developer's current average in each condo analysis. HDB figures are registered HDB resales."),
    ("How up to date is this list?",
     f"The resale prices cover {COMP['m12']} from URA caveats, and the page was last updated on {CHECKED}. Selling-now prices come from each condo analysis, dated on its card. A condo's position can change once a few new sales are lodged, so check the latest caveats before you make an offer."),
]
FAQ_HTML = ''.join(f"<details><summary><h3>{E(q)}</h3></summary><p>{E(a)}</p></details>" for q, a in FAQ)

cov_rows = []
for d in sorted({r['d'] for r in R} | {s['d'] for s in SELL}):
    cond = [rs for rs in BY.values() if rs[0]['d'] == d]; c = Counter(rs[0]['tag'] for rs in cond)
    srcs = Counter(rs[0]['dsrc'] for rs in cond)
    cov_rows.append(f"<tr><td>{dd(d)}</td><td>{E(VS.DNAME.get(d, ''))}</td><td class=\"n\">{len(cond)}</td><td class=\"n\">{sum(rs[0]['n12'] for rs in cond):,}</td><td class=\"n\">{c['undervalued'] + c['price']}</td>"
                    f"<td class=\"n\">{c['check']}</td><td class=\"n\">{c['watch']}</td><td class=\"n\">{c['rich']}</td><td class=\"n\">{sum(1 for s in SELL if s['d'] == d)}</td></tr>")
DSRC = Counter(rs[0]['dsrc'] for rs in BY.values())

METHOD = f"""
  <details class="fold" id="how-this-screen-works">
    <summary>How this screen works</summary>
    <div class="fold-body">
      <div class="prose">
        <p>The screen asks one question of every completed private condo with recent resales: is it selling below what its closest competitors' resales support? It uses the same rules as this site's <a href="/condo-analysis/">condo analyses</a>, so a resale condo and a new launch are judged the same way.</p>
        <h2>How each condo is compared</h2>
        <ol>
          <li><strong>Its own price.</strong> For each unit size it resells in (2-bed, 3-bed and 4-bed size, set from the unit area and the building's era because URA caveats carry no bedroom count), the average psf of its resales over the past 12 months, at least 3 of them, each moved to today with URA's private home price index. When the size range holds more than one layout, only resales within 15% of the most common size are used.</li>
          <li><strong>Its competitors.</strong> Same tenure, same kind of condo (executive condos with executive condos, mall-integrated with mall-integrated), 0.4 to 2.5 times as many homes, completed 2004 or later, within 1 km; 2 km only if 1 km has fewer than 2. The 5 nearest are used.</li>
          <li><strong>Like for like.</strong> Each competitor's average psf for its own resales within 15% of this condo's unit size (25% if too few), over the past 6 months, or 12 or 24 if too few, at least 3 resales, moved to today.</li>
          <li><strong>Same age.</strong> Each competitor is moved to this condo's age: {SL['LH']} a year for 99-year condos and {SL['FH']} a year for freehold and 999-year condos. These are the price falls per year of building age measured across {PAIRS['LH']:,} 99-year and {PAIRS['FH']:,} freehold pairs of nearby condos in the same data. The condo analyses' new-launch premium implies about 1.9% a year for 99-year condos, close to the measured figure.</li>
          <li><strong>Fair price and gap.</strong> The plain average of the adjusted competitors is what they support. The gap is how far the condo's own average sits below it. A condo's overall gap weights each unit size by its number of resales.</li>
        </ol>
        <h2>The tests a condo must pass</h2>
        <p>Across all {N_BANDS} unit sizes screened, the average gap is {MEAN_GAP * 100:+.1f}% and the usual spread is about {round(SD_GAP * 100)}%. So a single average a few percent below its neighbours means little. To be called undervalued, a condo must be at least 10% below overall, at least 3% below in every unit size compared, still 5% or more below when any one competitor is left out, cheaper than at least two in three competitors, and backed by at least 5 resales. A unit size far cheaper than the condo's other sizes (often penthouses or garden units with large terraces counted in the area) is shown but left out of the verdict.</p>
        <p>Rents then split the result: <b>Undervalued</b> when both rent measures (median 3-bedroom rent and rent per square foot) are much closer to the neighbours' than the price is; <b>Undervalued on price</b> when one rent measure agrees and the other does not; <b>Cheaper, check why</b> when rents are as far below as the price. <b>Cheaper, not proven</b> is 6% or more below but short of one test (6% to 10% only, fewer than 5 resales, leaning on one competitor, or fewer than two in three competitors dearer). Condos 10% or more above their competitors are marked "Priced above its competitors" in the district tables.</p>
        <h2>Condos selling now</h2>
        <p>Condos still selling developer units come from their condo analyses (dated on each card). The analysis takes the closest competitors on the same rules (within 1 km first, then 2 km and 3 km), prices each at the unit size, adds the premium that launches selling now pay over their own resale competitors for that age and region, and gives a buy-at and a walk-away price for each unit type. Here a selling condo is undervalued when the developer's current average for its main unit type is 10% or more below its buy-at price. Sold-out launches are not listed.</p>
        <h2>What the data cannot see</h2>
        <p>Floor level, facing, view, stack and renovation; the walk to the MRT; facilities; noise; en bloc potential; and furnishing packages or discounts. Completion years come from EdgeProp project pages and can differ by a year from other sources. Treat each card as a shortlist to check, not a valuation.</p>
      </div>
      <div class="rule" aria-label="Screening rule">
        <span>Same <b>tenure</b></span>
        <span>Similar <b>project size</b> (0.4–2.5× homes)</span>
        <span>Within <b>1 km</b>, then 2 km</span>
        <span>Same <b>unit size</b> (±15%)</span>
        <span><b>Averages</b>, age-adjusted</span>
        <span>At least <b>10%</b> below</span>
      </div>
      <div class="bands">
        <table>
          <caption class="eyebrow">How unit size sets the bedroom type. URA caveats carry no bedroom count, so a large 2-bedder can fall in the 3-bed size range; prices are always compared at the same size.</caption>
          <thead><tr><th>Building era</th><th class="n">2-bed size</th><th class="n">3-bed size</th><th class="n">4-bed size</th></tr></thead>
          <tbody>
            <tr><td>2015 and later</td><td class="n">538–807 sq ft</td><td class="n">818–1,076 sq ft</td><td class="n">1,087–1,507 sq ft</td></tr>
            <tr><td>2010–2014</td><td class="n">592–904 sq ft</td><td class="n">915–1,184 sq ft</td><td class="n">1,195–1,615 sq ft</td></tr>
            <tr><td>2004–2009</td><td class="n">700–990 sq ft</td><td class="n">1,001–1,313 sq ft</td><td class="n">1,324–1,776 sq ft</td></tr>
          </tbody>
        </table>
      </div>
      <section class="method" aria-labelledby="m-h">
        <h2 id="m-h">Coverage by district</h2>
        <div class="cov">
          <table>
            <thead><tr><th>District</th><th>Area</th><th class="n">Resale condos screened</th><th class="n">Their resales, 12 months</th><th class="n">Undervalued</th><th class="n">Check why</th><th class="n">Not proven</th><th class="n">Priced above</th><th class="n">Selling now</th></tr></thead>
            <tbody>{''.join(cov_rows)}</tbody>
          </table>
        </div>
        <ul>
          <li><strong>Not screened:</strong> condos completed before 2004, leases under 90 years, condos with fewer than 3 resales of a unit size in 12 months, and condos with fewer than 2 suitable competitors within 2 km.</li>
          <li><strong>MRT and future buyers on the cards:</strong> walking distance and time to the nearest MRT from the Stacked Homes condo directory (they vary by block: for Normanton Park other portals quote 1.1 to 1.2 km against 1.5 km, for Grandeur 8 about 680 m against 830 m); the closest MRT or LRT exit in a straight line from LTA's MRT station exits (data.gov.sg), shown as well when it names a different station; rail plans only where LTA has confirmed a new line at a station within 1 km. HDB upgraders: four-room and bigger flats completed in {CTX.get('mop_years', [2020, 2026])[0]}–{CTX.get('mop_years', [2020, 2026])[1]} in the HDB towns whose planning area (URA Master Plan 2025) lies within 1 km, from HDB property information (data.gov.sg); landed owners: landed resales within 1.5 km over 5 years (URA); office hubs are approximate points. Selling-now cards use the MRT, rail and buyer facts in their condo analyses.</li>
          <li><strong>Districts:</strong> {DSRC.get('URA caveats', 0)} condos from URA caveats, {sum(v for k, v in DSRC.items() if k and k.startswith('same street'))} from another condo on the same street in URA caveats, {DSRC.get('Stacked Homes condo directory', 0)} from the Stacked Homes condo directory.</li>
          <li><strong>Cross-checks ({CROSSCHECK}):</strong> completion year, number of homes, tenure, district and recent prices of the condos on the undervalued and check-why lists were compared with the Stacked Homes condo directory. Where it disagreed on the number of homes (Waterscape at Cavenagh: 70 there, 200 on EdgeProp, 99.co and listing sites), the majority figure is used.</li>
        </ul>
      </section>
      <p class="src">Sources: URA private residential transactions (caveats, resales only, {COMP['m12']}) and rental contracts ({COMP['rentQ'].upper()}) from the URA data service; URA private residential price index, non-landed, Q3 2026 (data.gov.sg); completion year, homes and location from EdgeProp project pages and OneMap; districts from URA caveats and the Stacked Homes condo directory; selling-now prices and buy-at prices from this site's condo analyses. Checked {CHECKED}.</p>
    </div>
  </details>
  <section class="faq vfaq" id="faq" aria-labelledby="faq-h">
    <h2 id="faq-h">Questions buyers ask</h2>
    {FAQ_HTML}
  </section>
"""

SCRIPT = r"""
(function () {
  var st = { show: "3", sale: "all", ten: "all", seg: "All", q: "" };
  try { var s = JSON.parse(localStorage.getItem("value-screen-v1") || "null"); if (s) ["show", "sale", "ten", "seg"].forEach(function (k) { if (s[k]) st[k] = s[k]; }); } catch (e) {}
  if (st.show !== "top") st.show = "3";
  var $ = function (id) { return document.getElementById(id); };
  var cards = Array.prototype.slice.call(document.querySelectorAll("#list .vc"));
  var secs = Array.prototype.slice.call(document.querySelectorAll("#list .dist"));
  var SHOW = { "top": "Top 10 gaps", "3": "All districts" };
  var top = $("vtop");
  cards.forEach(function (c) { c._ph = document.createComment(""); c.parentNode.insertBefore(c._ph, c); });
  var SALE = { resale: "Resale only", selling: "Selling now only" };
  var TEN = { LH: "99-year", FH: "Freehold and 999-year", EC: "Executive condo" };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pass(c, ignore) {
    var d = c.dataset;
    if (st.sale !== "all" && d.sale !== st.sale) return false;
    if (st.ten !== "all" && d.ten !== st.ten) return false;
    if (st.seg !== "All" && d.seg !== st.seg) return false;
    if (st.q) { var q = st.q.toLowerCase().trim(); if (q && (d.q + " " + c.closest(".dist").id).indexOf(q) < 0) return false; }
    return true;
  }
  function apply() {
    var shown = 0, q = st.q.toLowerCase().trim();
    cards.forEach(function (c) { if (c.parentNode === top) c._ph.parentNode.insertBefore(c, c._ph.nextSibling); });
    var ranked = cards.filter(function (c) { return pass(c); }).sort(function (a, b) { return b.dataset.gap - a.dataset.gap; }).slice(0, 10);
    if (top) top.hidden = st.show !== "top";
    if (st.show === "top") {
      cards.forEach(function (c) { c.hidden = true; });
      ranked.forEach(function (c) { c.hidden = false; top.appendChild(c); });
      shown = ranked.length;
    } else cards.forEach(function (c) { var ok = pass(c); c.hidden = !ok; if (ok) shown++; });
    secs.forEach(function (s) {
      if (st.show === "top") { s.hidden = true; return; }
      var any = s.querySelector(".vc:not([hidden])");
      var qOk = !q || (s.id + " " + s.textContent.toLowerCase()).indexOf(q) >= 0;
      var narrowed = st.sale !== "all" || st.ten !== "all" || st.seg !== "All";
      s.hidden = !(any || (!narrowed && qOk));
    });
    document.querySelectorAll("[data-show]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.show === st.show)); });
    ["vsale", "vten", "vseg"].forEach(function (id) { var el = $(id); if (el) el.value = st[{ vsale: "sale", vten: "ten", vseg: "seg" }[id]]; });
    ["vdist", "vbar-d"].forEach(function (id) {
      var sel = $(id); if (!sel) return;
      Array.prototype.forEach.call(sel.options, function (o) { if (!o.value) return; var s = $("d" + ("0" + o.value).slice(-2)); o.disabled = !s || s.hidden; });
    });
    var nsec = secs.filter(function (s) { return !s.hidden; }).length;
    var txt = st.show === "3" ? nsec + (nsec === 1 ? " district" : " districts") : shown + (shown === 1 ? " condo" : " condos");
    $("vcount").textContent = txt;
    var parts = [SHOW[st.show]]; if (SALE[st.sale]) parts.push(SALE[st.sale]); if (TEN[st.ten]) parts.push(TEN[st.ten]); if (st.seg !== "All") parts.push(st.seg); if (q) parts.push("“" + st.q.trim() + "”");
    var sum = $("vbar-sum"); if (sum) sum.textContent = parts.join(" · ");
    var n = (st.show !== "3") + (st.sale !== "all") + (st.ten !== "all") + (st.seg !== "All") + (q ? 1 : 0);
    var badge = $("vbar-n"); if (badge) { badge.hidden = !n; badge.textContent = n; }
    var empty = $("vempty"); if (empty) empty.hidden = nsec > 0 || shown > 0;
    try { localStorage.setItem("value-screen-v1", JSON.stringify({ show: st.show, sale: st.sale, ten: st.ten, seg: st.seg })); } catch (e) {}
    if (typeof onScroll === "function") onScroll();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-show]"); if (!b) return;
    st.show = b.dataset.show; apply();
  });
  [["vsale", "sale"], ["vten", "ten"], ["vseg", "seg"]].forEach(function (p) { var el = $(p[0]); if (el) el.addEventListener("change", function () { st[p[1]] = el.value; apply(); }); });
  var qi = $("vq"); if (qi) qi.addEventListener("input", function () { st.q = qi.value; apply(); });

  // jump to a district (navigation, not a filter)
  var hold = 0;
  // smooth for short moves; instant for long ones, so nobody waits through ten screens of scrolling
  function go(el) {
    var far = Math.abs(el.getBoundingClientRect().top) > 2.5 * window.innerHeight;
    el.scrollIntoView({ behavior: reduce || far ? "auto" : "smooth", block: "start" });
  }
  function jump(d) {
    var s = $("d" + ("0" + d).slice(-2)); if (!s || s.hidden) return;
    hold = Date.now() + 1200; if (bar) bar.classList.remove("tuck");
    go(s); if (bd) bd.value = String(d);
  }
  var dj = $("vdist"); if (dj) dj.addEventListener("change", function () { var v = dj.value; dj.value = ""; if (v) jump(v); });
  var bd = $("vbar-d"); if (bd) bd.addEventListener("change", function () { if (bd.value) jump(bd.value); });

  // quick bar: shown once the filter panel has scrolled out of view while the list is on screen;
  // its district menu follows the district at the top of the screen
  var bar = $("vbar"), panel = document.querySelector(".filters"), list = $("list");
  var lastY = window.scrollY, ticking = false;
  function update() {
    ticking = false;
    if (!bar || !panel || !list) return;
    var pr = panel.getBoundingClientRect(), lr = list.getBoundingClientRect();
    bar.classList.toggle("on", list.offsetParent !== null && pr.bottom < 80 && lr.bottom > 160);
    var cur = "";
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].hidden) continue;
      if (secs[i].getBoundingClientRect().top <= 150) cur = secs[i].dataset.d; else break;
    }
    if (bd && document.activeElement !== bd) bd.value = cur;
    var y = window.scrollY, dy = y - lastY; lastY = y;
    // on phones the bar tucks under the site menu while you scroll down and comes back when you scroll up
    if (Date.now() < hold || window.innerWidth > 720) bar.classList.remove("tuck");
    else if (dy > 6) bar.classList.add("tuck"); else if (dy < -6) bar.classList.remove("tuck");
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  var fb = $("vbar-f"); if (fb) fb.addEventListener("click", function () {
    hold = Date.now() + 1200;
    go(panel);
    var b = document.querySelector('[data-show][aria-pressed="true"]'); if (b) b.focus({ preventScroll: true });
  });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-prop]")) onScroll(); });
  apply();
  update();
})();
"""

LD_APP = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": "https://www.sellingsgproperty.com/undervalued-pty/#app",
    "name": "Find Undervalued Singapore Property", "alternateName": "Undervalued Condo Screen", "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Property comparison", "operatingSystem": "Web", "url": "https://www.sellingsgproperty.com/undervalued-pty/",
    "description": f"Free screen of {N_COND} Singapore resale condos and {len(SELL)} condos selling now, grouped by postal district. A condo is undervalued when it sells at least 10% below what its closest like-for-like competitors support: same tenure, similar project size, within 1 km (2 km if needed), same unit size, age-adjusted, from URA caveats. Separate HDB resale gaps.",
    "dateModified": CHECKED_ISO, "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "SGD"},
    "featureList": ["Compare each resale condo with its closest competitors of the same tenure and similar project size",
                    "Competitors within 1 km first, 2 km only if needed", "Like-for-like prices at the same unit size, adjusted for building age",
                    "Rent check against the same competitors", "Condos selling now judged by their buy-at prices", "Grouped by postal district",
                    "Separate HDB resale transaction gaps"],
    "audience": {"@type": "Audience", "audienceType": "Singapore condo buyers and HDB upgraders"},
    "provider": {"@id": "https://www.sellingsgproperty.com/#organization"}, "creator": {"@id": "https://www.sellingsgproperty.com/#jackleow"}}
LD_FAQ = {"@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]}

CSS = """
.dist { display: grid; gap: 16px; padding-top: 2.2rem; scroll-margin-top: 100px; }
.dist-more { display: grid; gap: 10px; font-size: 0.92rem; color: var(--muted); }
.dist-more b { color: var(--ink); font-weight: 600; }
.dist-more a { color: var(--ink); }
.dist-all p { padding-bottom: 10px; }
.dist > h2 { font-size: clamp(1.6rem, 2.6vw, 2.1rem); line-height: 1.1; }
.dist-sum { color: var(--muted); font-size: 0.95rem; margin-top: -6px; }
.vc { background: var(--surface); border: 1px solid var(--line); border-radius: 22px; padding: 22px 24px 18px; display: grid; gap: 12px; box-shadow: var(--shadow); min-width: 0; }
.vc.lvl1 { border-top: 2px solid var(--accent); }
.vc[hidden], .dist[hidden] { display: none; }
.tool > *, .filters > *, #condo-controls > *, .list > *, .dist > *, .vc > *, .dist-more > * { min-width: 0; }
.vc .alts { max-width: 100%; }
.vc-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 18px; align-items: flex-start; }
.vc-name { font-family: var(--serif); font-weight: 400; letter-spacing: -0.02em; font-size: 1.55rem; line-height: 1.12; min-width: 0; flex: 1 1 260px; }
.vc-name small { display: block; margin-top: 6px; font-family: var(--sans); font-size: 0.86rem; letter-spacing: 0; color: var(--muted); }
.vc-gap { text-align: right; max-width: 15rem; }
.vc-gap strong { display: block; font-family: var(--serif); font-weight: 400; font-size: 1.9rem; line-height: 1; color: var(--accent); }
.vc.t-check .vc-gap strong, .vc.sell.lvl3 .vc-gap strong { color: var(--bad); }
.vc-gap small { display: block; margin-top: 4px; font-size: 0.8rem; line-height: 1.4; color: var(--muted); }
.vc-tag { font-size: 0.9rem; color: var(--muted); }
.badge { display: inline-block; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.04em; border-radius: 999px; padding: 3px 10px; margin-right: 4px; background: var(--chip); color: var(--ink); }
.b-undervalued, .b-price { background: var(--accent-soft); color: var(--accent); }
.b-check, .b-rich { background: var(--bad-soft); color: var(--bad); }
.b-watch { background: var(--warn-soft); color: var(--warn); }
.mut { color: var(--muted); font-weight: 400; }
.vc table { font-size: 0.88rem; }
.vc td, .vc th { padding: 8px 10px; }
.vc tr.odd td { color: var(--muted); }
.vc-note { font-size: 0.86rem; color: var(--muted); }
.vc-ctx { display: grid; gap: 6px; font-size: 0.9rem; color: var(--muted); border-left: 2px solid var(--line); padding-left: 12px; }
.vc-ctx b { color: var(--ink); font-weight: 600; }
.vc-why { margin: 0; padding-left: 1.1rem; font-size: 0.88rem; color: var(--muted); display: grid; gap: 4px; }
.vc-more summary, .dist-all summary { cursor: pointer; font-size: 0.92rem; min-height: 44px; display: flex; align-items: center; text-decoration: underline; text-underline-offset: 3px; }
.vc-more[open] summary, .dist-all[open] summary { margin-bottom: 6px; }
.vc-link a { color: var(--ink); font-weight: 600; text-underline-offset: 3px; }
.dist-all { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 4px 16px 8px; }
.dist-all td:first-child { white-space: normal; min-width: 150px; }
.fold-body ol { margin: 0; padding-left: 1.2rem; display: grid; gap: 8px; color: var(--muted); }
.fold-body ol strong { color: var(--ink); }
@media (max-width: 720px) {
  .vc-sizes thead { display: none; }
  .vc-sizes tr { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; padding: 10px 0; border-bottom: 1px solid var(--line); }
  .vc-sizes td { display: block; border: 0; padding: 0; white-space: normal; text-align: left; }
  .vc-sizes td:first-child { grid-column: 1 / -1; font-weight: 600; }
  .vc-sizes td::before { content: attr(data-l); display: block; font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .vc-sizes td:first-child::before { content: none; }
  .vc { padding: 18px 16px 14px; border-radius: 18px; }
  .vc-gap { text-align: left; max-width: none; }
  .vc-name { font-size: 1.35rem; }
}

/* filter panel: in the page flow (not sticky), two compact rows */
.filters { position: static; top: auto; z-index: auto; background: transparent; backdrop-filter: none; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; padding: 12px 0 16px; scroll-margin-top: 96px; }
.filters .flabel { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
.filters .row[role="group"], .seg { display: inline-flex; flex-wrap: nowrap; gap: 2px; padding: 3px; border-radius: 999px; background: var(--chip); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.filters .row[role="group"]::-webkit-scrollbar, .seg::-webkit-scrollbar { display: none; }
.filters .row[role="group"] .chip, .seg .chip { min-height: 40px; padding: 0 14px; font-size: 0.92rem; white-space: nowrap; flex: 0 0 auto; }
.filters > .row[aria-label="Property type"] { background: transparent; border: 1px solid var(--line); }
.seg .chip .c { margin-left: 5px; }
#vdist { margin-left: auto; flex: 0 1 230px; min-width: 0; min-height: 44px; }
.filters .count { font-size: 0.9rem; white-space: nowrap; }
.vrow { flex: 1 1 100%; display: flex; flex-wrap: wrap; gap: 8px; }
.vrow input[type="search"] { flex: 1 1 220px; min-height: 44px; }
.vrow select { flex: 0 0 auto; min-height: 44px; }
.vbar-n[hidden] { display: none; }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.byline { font-size: 0.9rem; color: var(--muted); }
.byline a { color: var(--ink); text-underline-offset: 3px; }
.vcta { margin-top: 2.2rem; background: var(--surface); border: 1px solid var(--line); border-radius: 22px; padding: 20px 24px; display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; justify-content: space-between; }
.vcta p { flex: 1 1 320px; color: var(--muted); }
.vcta b { color: var(--ink); }
.vcta-btn { display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; border-radius: 999px; background: var(--ink); color: var(--bg); text-decoration: none; font-weight: 600; font-size: 0.94rem; }
.vfaq { padding-top: 3.5rem; display: grid; gap: 0; }
.vfaq > h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1.1; margin-bottom: 1rem; }
.vfaq details { border-top: 1px solid var(--line); }
.vfaq details:last-of-type { border-bottom: 1px solid var(--line); }
.vfaq summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 0; min-height: 44px; }
.vfaq summary::-webkit-details-marker { display: none; }
.vfaq summary::after { content: "+"; font-size: 1.4rem; line-height: 1; color: var(--muted); flex: 0 0 auto; }
.vfaq details[open] summary::after { content: "–"; }
.vfaq summary h3 { font-size: 1.25rem; line-height: 1.25; }
.vfaq details p { color: var(--muted); padding: 0 0 18px; max-width: 70ch; }
.vfaq summary:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.vtop { display: grid; gap: 16px; padding-top: 1.6rem; counter-reset: rk; }
.vtop[hidden] { display: none; }
.vtop > h2 { font-size: clamp(1.6rem, 2.6vw, 2.1rem); line-height: 1.1; }
.vtop .vc { counter-increment: rk; }
.vtop .vc-name::before { content: "#" counter(rk) "  "; color: var(--accent); white-space: pre; }
.filters .search-row { flex: 1 1 100%; }
/* quick bar */
.vbar { position: fixed; left: 0; right: 0; top: 80px; z-index: 30; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: 0 6px 18px rgba(28, 25, 22, 0.06); transform: translateY(-110%); visibility: hidden; transition: transform .22s ease, visibility 0s linear .22s; }
@supports (backdrop-filter: blur(12px)) { .vbar { background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(14px); } }
.vbar.on { transform: none; visibility: visible; transition: transform .22s ease; }
.vbar.on.tuck { transform: translateY(-110%); }
.vbar-in { max-width: 1080px; margin: 0 auto; padding: 6px max(22px, env(safe-area-inset-right)) 6px max(22px, env(safe-area-inset-left)); display: flex; gap: 12px; align-items: center; min-height: 54px; }
.vbar select { flex: 0 1 300px; min-height: 40px; }
.vbar-sum { flex: 1 1 auto; min-width: 0; color: var(--muted); font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vbar-f { font: inherit; font-size: 0.92rem; min-height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: var(--ink); color: var(--bg); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.vbar-n { min-width: 20px; height: 20px; border-radius: 999px; background: var(--bg); color: var(--ink); font-size: 0.75rem; display: inline-flex; align-items: center; justify-content: center; padding: 0 5px; }
.vbar-f:focus-visible, .vbar select:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.dist { scroll-margin-top: 144px; }
/* compact summary */
.vstats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.vstats div { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 12px 14px; display: grid; gap: 2px; align-content: start; }
.vstats b { font-family: var(--serif); font-weight: 400; font-size: clamp(1.4rem, 2.6vw, 1.9rem); line-height: 1.05; letter-spacing: -0.02em; }
.vstats span { color: var(--muted); font-size: 0.8rem; line-height: 1.35; }
@media (max-width: 720px) {
  /* phones: [Condos|HDB  count] [Show] [Search] [District | Sale] [Tenure | Region] */
  .filters { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
  .filters > .row[aria-label="Property type"] { grid-column: 1; justify-self: start; order: 0; }
  .seg { grid-column: 1 / -1; order: 2; }
  .vrow { display: contents; }
  .vrow input[type="search"] { grid-column: 1 / -1; order: 3; }
  #vdist { order: 4; margin: 0; width: 100%; }
  #vsale { order: 5; } #vten { order: 6; } #vseg { order: 7; }
  .vrow select, #vdist { width: 100%; max-width: none; flex: none; }
  #hdb-controls .row { grid-column: 1 / -1; order: 3; }
  #hdb-controls .row[role="group"] .chip { padding: 0 9px; font-size: 0.88rem; }
  .seg .chip { flex: 1 1 0; padding: 0 6px; font-size: 0.84rem; white-space: normal; line-height: 1.1; text-align: center; }
  .seg .chip .c { display: block; margin: 0; font-size: 0.72rem; line-height: 1; }
  .seg .chip { flex-direction: column; display: inline-flex; justify-content: center; gap: 2px; }
  .vbar-in { padding: 6px 16px; gap: 8px; min-height: 52px; }
  .vbar select { flex: 1 1 auto; }
  .vbar-sum { display: none; }
  .vstats { gap: 6px; }
  .vstats div { padding: 10px; border-radius: 14px; }
  .vstats span { font-size: 0.72rem; }
}
@media (prefers-reduced-motion: reduce) { .vbar, .vbar.on { transition: none; } }
"""


def put(page, name, content):
    a, b = f'<!-- value:{name}:start -->', f'<!-- value:{name}:end -->'
    i, j = page.find(a), page.find(b)
    if i < 0 or j < 0: raise SystemExit(f'marker value:{name} missing')
    return page[:i + len(a)] + content + page[j:]


def setup(page):
    """Insert the value:* markers in place of the old condo screen (run once; later runs only fill the markers)."""
    if '<!-- value:list:start -->' in page: return page
    def cut(p, start, end, name, keep_end=False):
        i = p.index(start); j = p.index(end, i) + (0 if keep_end else len(end))
        return p[:i] + f'<!-- value:{name}:start --><!-- value:{name}:end -->' + p[j:]
    page = cut(page, '<p class="eyebrow">Condos and HDB', '</header>', 'intro', keep_end=True)
    page = page.replace('<p class="hint">Choose Condos or HDB. For condos, start with 3 bedroom and clean matches.</p>',
                        '<p class="hint">Choose Condos or HDB. Condos are grouped by postal district; start with Undervalued.</p>')
    i = page.index('<div id="condo-controls">') + len('<div id="condo-controls">'); j = page.index('<div id="hdb-controls">')
    k = page.rindex('</div>', i, j)
    page = page[:i] + '<!-- value:controls:start --><!-- value:controls:end -->' + page[k:]
    page = page.replace('<div class="list" id="list"></div>', '<div class="list" id="list"><!-- value:list:start --><!-- value:list:end --></div>\n    <p class="empty" id="vempty" hidden>No condos match these filters.</p>')
    i = page.index('<section class="takeaways" id="buyer-checks"'); i = page.index('<ol>', i) + 4; j = page.index('</ol>', i)
    page = page[:i] + '<!-- value:checks:start --><!-- value:checks:end -->' + page[j:]
    page = cut(page, '<details class="fold" id="how-this-screen-works">', '</details>', 'method')
    i = page.index('<p class="src src-foot">'); j = page.index('</p>', i) + 4
    page = page[:i] + '<!-- value:foot:start --><!-- value:foot:end -->' + page[j:]
    i = page.index('const DATA = '); j = page.index('document.getElementById("seg").addEventListener', i); j = page.index('\n', j) + 1
    page = page[:i] + '<!-- value:script:start --><!-- value:script:end -->\n' + page[j:]
    i = page.index('<script type="application/ld+json">'); j = page.index('</script>', page.index('"FAQPage"')) + 9
    page = page[:i] + '<!-- value:ld:start --><!-- value:ld:end -->' + page[j:]
    i = page.index('</style>', page.index(':root {')); page = page[:i] + '/* value:css:start *//* value:css:end */\n' + page[i:]   # after the page's main styles
    page = page.replace('The filters need JavaScript. The introduction, the three checks, and the HDB cards are on this page without it.',
                        'The filters need JavaScript. Every condo card, the three checks and the HDB cards are on this page without it.')
    return page


def main():
    page = open(PAGE).read()
    page = setup(page)
    page = put(page, 'intro', INTRO + '  ')
    page = put(page, 'controls', CONTROLS + '      ')
    page = put(page, 'list', BAR + STATS + '<div class="vtop" id="vtop" hidden><h2>Top 10 by price gap</h2><p class="dist-sum">Ranked by how far each condo sits below what its competitors support (resale) or below its buy-at price (selling now). Cards marked "Cheaper, check why" have rents just as far below, so check them first.</p></div>' + build_list())
    page = put(page, 'checks', CHECKS + '    ')
    page = put(page, 'method', METHOD)
    page = put(page, 'foot', f'<p class="src src-foot">URA private residential caveats and rental contracts ({COMP["m12"]}), checked {CHECKED}. HDB resale registrations from data.gov.sg. Past sales, not asking prices.</p>')
    # the page's existing script tag (it also holds the menu and HDB code) wraps this block
    page = put(page, 'script', SCRIPT)
    ld = ('<script type="application/ld+json">\n' + json.dumps(LD_APP, indent=2, ensure_ascii=False) + '\n</script>\n<script type="application/ld+json">\n'
          + json.dumps(LD_FAQ, indent=2, ensure_ascii=False) + '\n</script>')
    page = put(page, 'ld', ld)
    a, b = '/* value:css:start */', '/* value:css:end */'
    i, j = page.index(a), page.index(b); page = page[:i + len(a)] + CSS + page[j:]
    title = 'Undervalued Singapore Condos by District | SellingSgProperty'
    desc = (f'{N_U} Singapore resale condos priced 10%+ below like-for-like competitors (same tenure, similar size, within 1 km), '
            f'by district, from URA caveats.')
    page = re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', page, count=1)
    for pat in (r'(<meta name="description" content=")[^"]*', r'(<meta property="og:description" content=")[^"]*', r'(<meta name="twitter:description" content=")[^"]*'):
        page = re.sub(pat, lambda m: m.group(1) + E(desc), page, count=1)
    for pat in (r'(<meta property="og:title" content=")[^"]*', r'(<meta name="twitter:title" content=")[^"]*'):
        page = re.sub(pat, lambda m: m.group(1) + title, page, count=1)
    page = page.replace('not mixed into the condo medians.</p>', 'not mixed into the condo comparison.</p>')
    page = re.sub(r'\s*<p class="hint">Choose Condos or HDB\.[^<]*</p>', '', page)   # the controls speak for themselves
    page = page.replace('<!-- value:script:end -->\nrenderStatic();\nrender();\n', '<!-- value:script:end -->\n')   # calls into the old condo script
    art = page.index('"@type": "Article"')
    seg = page[art:page.index('</script>', art)]
    seg2 = re.sub(r'"description": "[^"]*"', lambda m: '"description": ' + json.dumps(desc), seg, count=1)
    seg2 = re.sub(r'"dateModified": "[^"]*"', '"dateModified": "' + CHECKED_ISO + '"', seg2, count=1)
    page = page.replace(seg, seg2)
    open(PAGE, 'w').write(page)
    sm = os.path.join(ROOT, 'sitemap.xml'); t = open(sm).read()
    t2 = re.sub(r'(<loc>https://www\.sellingsgproperty\.com/undervalued-pty/</loc>\s*<lastmod>)[^<]*', lambda m: m.group(1) + CHECKED_ISO, t)
    if t2 != t: open(sm, 'w').write(t2)
    print(f'wrote {os.path.relpath(PAGE, ROOT)}: {N_COND} resale condos, {N_U} undervalued, {len(SELL)} selling ({N_SELL_U} 10%+ below buy-at); {len(page):,} bytes; desc {len(desc)} chars')


if __name__ == '__main__':
    main()
