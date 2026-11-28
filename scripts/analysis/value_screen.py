"""Undervalued condo screen (27 Nov 2026), on the condo-analysis method.

For every completed condo with recent resales (URA caveats, data/comp-tx.json), and for each bedroom-size band it resells in:
  1. Its own price: average psf of its resales in that band over the last 12 months (at least 3), each moved to today with
     URA's private price index.
  2. Competitors: same tenure (99-year leasehold with 99-year leasehold; freehold and 999-year together; leases under 90 years
     and executive condos are never mixed in), similar project size (0.4x to 2.5x the homes), completed 2004 or later,
     within 1 km first, then 2 km if fewer than 2 qualify; the 5 nearest are used.
  3. Like for like by size: each competitor's average psf for units within 15% of this condo's size (25% if too few), last
     6 months, or 12 or 24 if too few, at least 3 resales, moved to today.
  4. Age: each competitor is converted to a condo of this one's age with the age pattern of the condo-analysis premium
     (launches selling now vs their resale competitors, by region). +/-10% when one side is a mall condo and the other is not.
  5. Fair price = the plain average of the converted competitors. Value gap = 1 - own price / fair price.
Selling and post-launch condos come from the condo analyses (their buy-at prices, same rules, 1 km then 2 km then 3 km).
Run: python3 scripts/analysis/value_screen.py  ->  data/value-screen.json
"""
import json, math, os, re, statistics, sys
sys.path.insert(0, os.path.dirname(__file__))
import std_v2 as S

ROOT = S.ROOT
COMP = S.COMP['p']; HOMES = S.HOMES
DIST = json.load(open(os.path.join(ROOT, 'data', 'value-districts.json')))
DNAME = {1: 'Raffles Place, Marina', 2: 'Tanjong Pagar, Anson', 3: 'Queenstown, Tiong Bahru', 4: 'Telok Blangah, HarbourFront', 5: 'Pasir Panjang, Clementi',
         6: 'City Hall, Beach Road', 7: 'Bugis, Golden Mile', 8: 'Little India, Farrer Park', 9: 'Orchard, River Valley', 10: 'Bukit Timah, Holland, Tanglin',
         11: 'Novena, Newton, Thomson', 12: 'Balestier, Toa Payoh', 13: 'Macpherson, Potong Pasir', 14: 'Geylang, Eunos, Paya Lebar', 15: 'Katong, Joo Chiat, Marine Parade',
         16: 'Bedok, Upper East Coast', 17: 'Loyang, Changi', 18: 'Tampines, Pasir Ris', 19: 'Serangoon, Hougang, Punggol, Sengkang', 20: 'Bishan, Ang Mo Kio',
         21: 'Upper Bukit Timah, Clementi Park', 22: 'Jurong, Boon Lay', 23: 'Bukit Batok, Bukit Panjang, Choa Chu Kang', 24: 'Lim Chu Kang, Tengah',
         25: 'Woodlands, Kranji', 26: 'Upper Thomson, Lentor, Mandai', 27: 'Yishun, Sembawang', 28: 'Seletar, Yio Chu Kang'}
CCR_D = {9, 10, 11}   # URA: Core Central Region = D09, D10, D11 plus Downtown Core and Sentosa (set per condo below)
NOW_Y, AS_OF_M = 2026, 2026 * 12 + 9   # comp-tx: last full month Oct 2026 (month index Oct = 9)
MIN_OWN, WIN_OWN = 3, 12
BANDS = {   # bedroom type from unit size and building era (URA caveats have no bedroom count); the page's earlier table
    2015: {'2-bed': (538, 807), '3-bed': (818, 1076), '4-bed': (1087, 1507)},
    2010: {'2-bed': (592, 904), '3-bed': (915, 1184), '4-bed': (1195, 1615)},
    2004: {'2-bed': (700, 990), '3-bed': (1001, 1313), '4-bed': (1324, 1776)}}


def tenure_class(t):
    m = re.match(r'(\d+) years', t or '')
    if not m: return 'FH'
    y = int(m.group(1))
    return 'LH' if 90 <= y <= 110 else 'FH' if y >= 900 else None


def lease_start(t):
    m = re.search(r'from (\d{4})', t or ''); return int(m.group(1)) if m else None


def q_of(months_ago):
    m = AS_OF_M - months_ago; return f"{m // 12}Q{(m % 12) // 3 + 1}"


def adj(psf, months_ago):   # move a sale to today with URA's private price index
    return psf * S.IDX[S.NOW_Q] / S.IDX.get(q_of(months_ago), S.IDX[S.NOW_Q])


def matched(key, size):
    tx = COMP[key].get('tx') or []
    for tol in (.15, .25):
        for win in (6, 12, 24):
            x = [adj(p, a) for a, sq, p in tx if a < win and abs(sq - size) <= tol * size]
            if len(x) >= 3: return dict(psf=sum(x) / len(x), n=len(x), win=win, tol=tol)
    return None


def band_of(top, sq):
    era = 2015 if top >= 2015 else 2010 if top >= 2010 else 2004
    for b, (lo, hi) in BANDS[era].items():
        if lo <= sq <= hi: return b
    return None


def region(key, d):
    if d in CCR_D: return 'CCR'
    seg = REGION_BY_D.get(d); return seg or 'OCR'


def is_integ(name):
    return S._tc(name) in S.INTEGRATED or name.title() in S.INTEGRATED


# market segment by district: majority of URA labels on the earlier screen (D01, D02, D06, D09, D10, D11 are mostly CCR)
REGION_BY_D = {1: 'CCR', 2: 'CCR', 3: 'RCR', 4: 'RCR', 5: 'RCR', 6: 'CCR', 7: 'RCR', 8: 'RCR', 9: 'CCR', 10: 'CCR', 11: 'CCR', 12: 'RCR', 13: 'RCR',
               14: 'RCR', 15: 'RCR', 16: 'OCR', 17: 'OCR', 18: 'OCR', 19: 'OCR', 20: 'RCR', 21: 'OCR', 22: 'OCR', 23: 'OCR', 24: 'OCR', 25: 'OCR',
               26: 'OCR', 27: 'OCR', 28: 'OCR'}
REGION_BY_D.update({int(k): v for k, v in json.load(open(os.path.join(ROOT, 'data', 'value-districts.json'))).get('_segment', {}).items()})
PREM = {r: S.age_premium({'name': '', 'region': r})[0] for r in ('OCR', 'RCR', 'CCR')}


def info(k):
    v = COMP[k]; h = HOMES.get(k) or {}; d = DIST.get(k)
    return dict(key=k, name=S._tc(v['n']), street=v['s'].title(), lat=v['lat'], lon=v['lon'], top=h.get('top'), units=h.get('units'), ten=tenure_class(v['t']),
                tenure=v['t'], lease=lease_start(v['t']), ec=bool(v['ec']), d=d[0] if d else None, dsrc=d[1] if d else None, rent=v.get('rent'), n12=v['m12'][1],
                y1=v.get('y1'), g3=v.get('g3') if v.get('g3') is not None else v.get('gA'), integ=is_integ(v['n']))


ALL = {k: info(k) for k in COMP}
POOL = [x for x in ALL.values() if x['top'] and x['top'] >= 2004 and x['top'] <= NOW_Y and x['ten']]


def comps_for(p, size):
    near = []
    for x in POOL:
        if x['key'] == p['key'] or x['ten'] != p['ten'] or x['ec'] != p['ec'] or x['integ'] != p['integ']: continue
        if p['units'] and x['units'] and not (0.4 * p['units'] <= x['units'] <= 2.5 * p['units']): continue
        dkm = S._km(p, x)
        if dkm > 2: continue
        m = matched(x['key'], size)
        if m: near.append((dkm, x, m))
    near.sort(key=lambda t: t[0])
    within1 = [t for t in near if t[0] <= 1]
    pick, band = (within1[:5], 1) if len(within1) >= 2 else (near[:5], 2)
    return pick, band


SLOPE = {'LH': 0.0, 'FH': 0.0}


def fit_slopes():
    """Resale price fall per year of building age, by tenure: least squares on every condo and its nearby competitors
    (log of its own psf over the competitor's like-for-like psf against the age difference). Two numbers from about 1,900 pairs."""
    SLOPE['LH'] = SLOPE['FH'] = 0.0
    raw = screen()
    for t in ('LH', 'FH'):
        X, Y = [], []
        for r in raw:
            if r['ten'] != t: continue
            for c in r['comps']: X.append(c['top'] - r['top']); Y.append(math.log(r['own'] / c['psf']))
        mx, my = sum(X) / len(X), sum(Y) / len(Y)
        SLOPE[t] = -sum((x - mx) * (y - my) for x, y in zip(X, Y)) / sum((x - mx) ** 2 for x in X)
        PAIRS[t] = len(X)
    return SLOPE


PAIRS = {}


def screen():
    out = []
    for p in POOL:
        if p['d'] is None: continue
        tx = COMP[p['key']].get('tx') or []
        rg = region(p['key'], p['d']); f = PREM[rg]
        age_p = max(0, NOW_Y - p['top'])
        for b in ('2-bed', '3-bed', '4-bed'):
            own = [(sq, adj(ps, a), a) for a, sq, ps in tx if a < WIN_OWN and band_of(p['top'], sq) == b]
            if len(own) < MIN_OWN: continue
            size = statistics.median(sq for sq, _, _ in own)
            # own price at that size: the band's resales within 15% of the median size (the main layout), else all of the band
            core = [ps for sq, ps, _ in own if abs(sq - size) <= .15 * size]
            if len(core) < MIN_OWN: core = [ps for _, ps, _ in own]
            own_psf = sum(core) / len(core)
            pick, band = comps_for(p, size)
            if len(pick) < 2: continue
            rows = []
            for dkm, x, m in pick:
                age_x = max(0, NOW_Y - x['top'])
                conv = m['psf'] * math.exp(-SLOPE[p['ten']] * (age_p - age_x))
                rows.append(dict(name=x['name'], key=x['key'], km=round(dkm, 2), top=x['top'], units=x['units'], psf=round(m['psf']), n=m['n'], win=m['win'], conv=round(conv),
                                 rent=x['rent'][0] if x['rent'] and x['rent'][1] >= 5 else None, rent3=x['rent'][2] if x['rent'] and x['rent'][3] and x['rent'][3] >= 5 else None))
            fair = sum(r['conv'] for r in rows) / len(rows)
            gap = 1 - own_psf / fair
            agree = sum(1 for r in rows if r['conv'] > own_psf) / len(rows)
            rent_own = p['rent'][0] if p['rent'] and p['rent'][1] >= 5 else None
            rents = [r['rent'] for r in rows if r['rent']]
            loo = min(1 - own_psf / ((sum(r['conv'] for r in rows) - r0['conv']) / (len(rows) - 1)) for r0 in rows)
            out.append(dict(key=p['key'], name=p['name'], loo=(round(loo, 4) if loo is not None else None), all_psf=round(sum(adj(ps, a) for a, sq, ps in tx if a < WIN_OWN) / max(1, sum(1 for a, _, _ in tx if a < WIN_OWN))), street=p['street'], d=p['d'], dsrc=p['dsrc'], region=rg, top=p['top'], units=p['units'], ten=p['ten'], tenure=p['tenure'],
                            lease_left=(p['lease'] + 99 - NOW_Y) if p['ten'] == 'LH' and p['lease'] else None, ec=p['ec'], integ=p['integ'], band=b, size=round(size), n=len(core),
                            own=round(own_psf), fair=round(fair), gap=round(gap, 4), agree=round(agree, 2), km_band=band, comps=rows,
                            rent_own=rent_own, rent3_own=(p['rent'][2] if p['rent'] and p['rent'][3] and p['rent'][3] >= 5 else None), rent_comps=(round(sum(rents) / len(rents), 2) if rents else None), y1=p['y1'], g3=p['g3'], n12=p['n12']))
    return out


MIN_GAP, WATCH_GAP = 0.10, 0.06


def verdicts(res):
    """Condo-level verdict from its size bands (26 Nov 2026 robustness rules)."""
    by = {}
    for r in res: by.setdefault(r['key'], []).append(r)
    for k, rs in by.items():
        # a size band far cheaper than the condo's own other sizes while its competitors show no such drop: likely penthouses
        # or garden units whose strata area includes terraces, or an unusual stack, not a condo-wide discount
        for r in rs:
            others = [o for o in rs if o is not r]
            r['odd'] = bool(others) and r['gap'] - max(o['gap'] for o in others) > 0.12
            if not others and r['band'] == '4-bed' and r['own'] < 0.85 * r['all_psf']: r['odd'] = True
        good = [r for r in rs if not r['odd']]
        w = sum(r['n'] for r in good) or 1
        cg = sum(r['gap'] * r['n'] for r in good) / w if good else None
        for r in rs: r['cgap'] = round(cg, 4) if cg is not None else None
        n = sum(r['n'] for r in good)
        hold = all(r['gap'] >= 0.03 for r in good)
        loo_ok = all((r['loo'] is None or r['loo'] >= 0.05) for r in good)
        agree = all(r['agree'] >= 0.66 for r in good)
        # rent check: tenants paying close to the neighbours' rent while buyers pay much less = a higher yield than the neighbours
        # rents (URA rental contracts, whole condo, last 12 months): if tenants pay nearly the neighbours' rent while buyers pay
        # much less, the discount is in the price, not in the home. If rents are just as far below, buyers may be pricing a real drawback.
        # like for like where possible: the median monthly rent of a 3-bedroom (tenants pay per home); else rent per sq ft
        r0 = rs[0]; rd = None; rk = None
        c3 = [c['rent3'] for c in r0['comps'] if c.get('rent3')]
        cr = [c['rent'] for c in r0['comps'] if c['rent']]
        if r0.get('rent3_own') and len(c3) >= 2: rd = 1 - r0['rent3_own'] / (sum(c3) / len(c3)); rk = '3-bed'
        elif r0['rent_own'] and cr: rd = 1 - r0['rent_own'] / (sum(cr) / len(cr)); rk = 'psf'
        for r in rs: r['rent_gap'] = round(rd, 4) if rd is not None else None; r['rent_kind'] = rk
        # both rent measures: per sq ft (all contracts) and the median 3-bedroom rent; tenants paying close to the neighbours'
        # rent on every measure available = 'undervalued'; on one but not the other = 'price' (undervalued on price, rents mixed);
        # rents as far below as prices on every measure = 'check' (the market may be pricing a real drawback)
        rp = (1 - r0['rent_own'] / (sum(cr) / len(cr))) if r0['rent_own'] and cr else None
        r3 = (1 - r0['rent3_own'] / (sum(c3) / len(c3))) if r0.get('rent3_own') and len(c3) >= 2 else None
        for r in rs: r['rent_psf_gap'] = round(rp, 4) if rp is not None else None; r['rent3_gap'] = round(r3, 4) if r3 is not None else None
        tag = None
        if cg is not None and cg >= MIN_GAP and hold and loo_ok and agree and n >= 5:
            ok = [cg - g >= 0.05 for g in (rp, r3) if g is not None]
            tag = 'undervalued' if all(ok) else 'check' if not any(ok) else 'price'
        elif cg is not None and cg >= WATCH_GAP and hold and n >= 3: tag = 'watch'
        elif cg is not None and cg <= -MIN_GAP: tag = 'rich'
        why_not = []
        if tag == 'watch':
            if cg < MIN_GAP: why_not.append('6% to 10% below')
            if n < 5: why_not.append(f'only {n} resales')
            if not loo_ok:
                worst = min(good, key=lambda r: r['loo'])
                key = max(worst['comps'], key=lambda c: c['conv'])   # the dearest competitor carries the gap
                why_not.append(f"leans on one competitor ({key['name']})")
            if not agree: why_not.append('fewer than two in three competitors are dearer')
        for r in rs: r['why_not'] = why_not; r['tag'] = tag; r['cn'] = n
    return res


if __name__ == '__main__':
    fit_slopes(); print('age slopes', {k: f"{v * 100:.2f}% a year ({PAIRS[k]} pairs)" for k, v in SLOPE.items()})
    res = verdicts(screen())
    json.dump(dict(asOf=S.COMP.get('asOf'), m12=S.COMP.get('m12'), slopes=SLOPE, pairs=PAIRS, rows=res),
              open(os.path.join(ROOT, 'data', 'value-screen.json'), 'w'), separators=(',', ':'))
    print(len(res), 'condo-size bands screened;', len({r['key'] for r in res}), 'condos')
