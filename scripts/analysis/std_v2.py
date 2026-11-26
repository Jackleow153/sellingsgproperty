"""Condo analysis engine, method v2 (Jack, 25 Nov 2026), replacing the 5% test:
- Competitors: closest first (within 1 km, then 2 km, then 3 km), same tenure, similar size (0.4x to 2.5x the homes),
  no executive condos, completed 2000 or later where possible; recent launches (last 24 months, already launched) count too.
- Each competitor becomes a "new-launch equivalent": resale psf +5% if not built under the harmonised floor-area rules
  (June 2023), + the regional new-launch premium (what launches selling now in the OCR, RCR or CCR charge over their closest resale), +10% if this project is integrated and the competitor is not; recent launches are
  moved to today with URA's non-landed index.
- Buy at or below = average (not median) of the equivalents. Walk away above = buy-at + 5%.
- Growth: average of the competitors' URA 4-year average yearly change (3-bed where available). Bear = half; bull = base
  plus a premium only for a Confirmed catalyst.
- Potential gain = after Buyer's Stamp Duty, about $6,000 legal fees and a 2% + GST selling fee, at the buy-at,
  expected and walk-away prices. No return target.
"""
import json, os, re, subprocess
from std_lib import bsd, fmt_money, fmt_q, fmt_pct, income_needed, MEDIAN_INCOME, OUTSTANDING, LEGAL, SELL

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IDX = {"2021Q1": 157.1, "2021Q2": 158.8, "2021Q3": 159.9, "2021Q4": 168.4, "2022Q1": 167.9, "2022Q2": 173.9, "2022Q3": 181.6, "2022Q4": 182.1, "2023Q1": 186.8, "2023Q2": 185.7, "2023Q3": 189.8, "2023Q4": 194.2, "2024Q1": 196.1, "2024Q2": 197.3, "2024Q3": 197.5, "2024Q4": 203.4, "2025Q1": 205.4, "2025Q2": 206.8, "2025Q3": 208.5, "2025Q4": 208.1, "2026Q1": 210.8, "2026Q2": 210.6, "2026Q3": 212.7}
NOW_Q = '2026Q3'
HARMONISED_FROM = 202306      # launches from June 2023 follow the harmonised floor-area rules
NEW_PREMIUM, HARMONISE, INTEG, WALK = 0.15, 0.05, 0.10, 0.05
GROWTH_CAP = 0.047   # URA non-landed index, Q3 2016 to Q3 2026: about 4.7% a year
INTEGRATED = {'North Park Residences', 'Sengkang Grand Residences', 'The Woodleigh Residences', 'Watertown', 'Bedok Residences',
              'Hillion Residences', 'The Poiz Residences', 'The Venue Residences', 'Park Place Residences', 'Lentor Modern'}
# 4-year change where URA's 4-year window has too few deals (condos completed 2023): our yearly averages, 2022 to 2026
FALLBACK_4Y = {'The Florence Residences': 2.0, 'Riverfront Residences': 3.6}

NEAR = json.load(open(os.path.join(ROOT, 'data', 'nearby.json')))['proj']
GEO = json.load(open(os.path.join(ROOT, 'data', 'site-geo.json')))


def _recent():
    js = r'''const fs=require("fs");const app=fs.readFileSync(process.argv[1],"utf8");const i=app.indexOf("const projects = [");const st=app.indexOf("[",i);let d=0,j=st;for(;j<app.length;j++){const c=app[j];if(c=="[")d++;else if(c=="]"){d--;if(d==0){j++;break}}}const P=eval(app.slice(st,j));console.log(JSON.stringify(P.filter(p=>p.avgPSF&&p.launchSort>=202411).map(p=>({name:p.name,launchSort:p.launchSort,psf:p.avgPSF,units:p.totalUnits,tenure:p.tenure,mall:!!p.mall,type:p.type||""}))))'''
    return json.loads(subprocess.run(['node', '-e', js, os.path.join(ROOT, 'assets', 'app.js')], capture_output=True, text=True, check=True).stdout)
RECENT = _recent()


def _km(a, b):
    import math
    la1, lo1, la2, lo2 = map(math.radians, [a['lat'], a['lon'], b['lat'], b['lon']])
    return 2 * 6371 * math.asin(math.sqrt(math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2))


def _slug(n): return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', n.lower()))
def _lh(t): return not re.search(r'freehold|999|947', str(t), re.I)
def _q(ls): y, m = divmod(int(ls), 100); return f"{y}Q{(m - 1) // 3 + 1}"


COMP = json.load(open(os.path.join(ROOT, 'data', 'comp-tx.json')))
HOMES = json.load(open(os.path.join(ROOT, 'data', 'resale-homes.json')))
_nm = lambda t: re.sub(r'[^a-z0-9]', '', str(t).lower().replace('@', 'at'))


def _tc(t):
    t = re.sub(r"(^|[\s(\-/@&.])([a-z])", lambda m: m.group(1) + m.group(2).upper(), t.lower())
    t = re.sub(r"\b(Ii|Iii|Iv|Vi|Vii)\b", lambda m: m.group(0).upper(), t)
    return t.replace(' Ec', ' EC').replace("'S ", "'s ")


def _allp():
    js = r"""const fs=require("fs");const app=fs.readFileSync(process.argv[1],"utf8");const i=app.indexOf("const projects = [");const st=app.indexOf("[",i);let d=0,j=st;for(;j<app.length;j++){const c=app[j];if(c=="[")d++;else if(c=="]"){d--;if(d==0){j++;break}}}const P=eval(app.slice(st,j));console.log(JSON.stringify(P.map(p=>({id:p.id,name:p.name,launchSort:p.launchSort,psf:p.avgPSF||null,units:p.totalUnits||null,landCost:p.landCost||'',landDate:p.landDate||'',year:p.year,mall:!!p.mall}))))"""
    return json.loads(subprocess.run(['node', '-e', js, os.path.join(ROOT, 'assets', 'app.js')], capture_output=True, text=True, check=True).stdout)
ALLP = _allp()
_HTML = open(os.path.join(ROOT, 'data', 'condo-analysis.html')).read()
NLD = json.loads(re.search(r'^const NL = (.*?);$', _HTML, re.M).group(1))
MON3 = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']


def be(land):
    """Developer break-even psf, EdgeProp's method: 1.357 x land psf ppr + $459 (fits all 29 EdgeProp break-evens in our data exactly)."""
    return round((1.357 * land + 459) / 10) * 10


def _rng(t):
    nums = [int(x.replace(',', '')) for x in re.findall(r'\$?(\d,\d{3}|\d{4})', str(t or ''))]
    nums = [x for x in nums if 1000 <= x <= 6000]
    return (min(nums), max(nums)) if nums else None


def _land_sites():
    U = {u['pid']: u for u in NLD['U']}; L = {_nm(l['name']): l for l in NLD['L']}
    out = []
    for p in ALLP:
        slug = _slug(p['name']); u = U.get(p['id']); l = L.get(_nm(p['name'])) or next((v for k, v in L.items() if _nm(p['name']).startswith(k[:10])), None)
        psf, date = None, ''
        if u and u.get('land'): psf, date = u['land'], u.get('close', '')
        if psf is None:
            m = re.search(r'about \$([\d,]+) psf ppr', p['landCost'] or '')
            if m: psf, date = int(m.group(1).replace(',', '')), p['landDate']
        if psf is None and l:
            m = re.match(r'\s*(?:About\s+)?\$([\d,]+) psf', l.get('land', ''))
            if m: psf = int(m.group(1).replace(',', '')); dm = re.search(r'((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}|\b20\d\d\b)', l['land']); date = dm.group(1) if dm else ''
        g = GEO.get(slug) or (GEO.get(l['id']) if l else None)
        if psf is None or not g: continue
        launched = bool(p['psf']) and p['launchSort'] <= 202611
        out.append(dict(name=p['name'], slug=slug, lid=l['id'] if l else None, geo=g, psf=psf, date=date, launched=launched, price=p['psf'] if launched else None,
                        analyst=(u or {}).get('analyst', '') if not launched else '', floor=be(psf)))
    return out
LAND = _land_sites()
_mg = [L['price'] / L['floor'] - 1 for L in LAND if L['launched'] and L['price']]
MARGIN = dict(avg=sum(_mg) / len(_mg), lo=min(_mg), hi=max(_mg), n=len(_mg))   # how far launches priced above EdgeProp's break-even

RAIL = {'Bright Hill': ('Cross Island Line (Phase 1)', 2030), 'Ang Mo Kio': ('Cross Island Line (Phase 1)', 2030), 'Hougang': ('Cross Island Line (Phase 1)', 2030),
        'Pasir Ris': ('Cross Island Line (Phase 1)', 2030), 'King Albert Park': ('Cross Island Line (Phase 2)', 2032), 'Clementi': ('Cross Island Line (Phase 2)', 2032),
        'Jurong East': ('Jurong Region Line', 2028), 'Choa Chu Kang': ('Jurong Region Line', 2027)}
RAIL_SRC = {'Cross': ['LTA, Cross Island Line', 'https://www.lta.gov.sg/content/ltagov/en/upcoming_projects/rail_expansion/cross_island_line.html'],
            'Jurong': ['LTA, Jurong Region Line', 'https://www.lta.gov.sg/content/ltagov/en/upcoming_projects/rail_expansion/jurong_region_line.html']}
LAND_EST = {'Lorong Puntong (Sin Ming Avenue GLS)': ['$3,000 to $3,100 (Stacked Homes)', 'stacked_lp', ['Stacked Homes, record bid for the Sin Ming GLS site; homes could launch at $3,000 to $3,100 psf, Sep 2026', 'https://stackedhomes.com/a-malaysian-developer-just-put-in-a-record-bid-for-this-sin-ming-gls-site-new-homes-could-launch-at-3000-3100-psf/']],
             'Berlayar Drive (GLS)': ['Not available yet', None, None]}
EXTRA_PLAN = {  # Confirmed or Planned items not tied to an existing station (sources in RAIL_SRC / URA)
 'dunearn-house': [['Turf City station on the Cross Island Line (Phase 2)', 'In the Turf City precinct', 'Targeted 2032', 'A new MRT line next to the site', 'Confirmed', 'rail_cross', 0.01]],
 'dunearn-road-plot-2': [['Turf City station on the Cross Island Line (Phase 2)', 'In the Turf City precinct', 'Targeted 2032', 'A new MRT line next to the site', 'Confirmed', 'rail_cross', 0.01]],
 'lucerne-grand': [['Jurong Lake District: the largest business district outside the city centre', 'Around the site', 'Over the next 10 to 20 years', 'More jobs and amenities; also more homes', 'Planned', 'jld', 0]],
 'sora': [['Jurong Lake District: the largest business district outside the city centre', 'About 1 km', 'Over the next 10 to 20 years', 'More jobs and amenities; also more homes', 'Planned', 'jld', 0]]}
JLD = ['URA, Jurong Lake District', 'https://www.ura.gov.sg/Corporate/Planning/Master-Plan/Urban-Transformations/Jurong-Lake-District']


def _launch_month(t):
    m = re.search(r'(' + '|'.join(MON3) + r')[a-z]*\.?\s+(20\d\d)', str(t).lower())
    return int(m.group(2)) * 12 + MON3.index(m.group(1)[:3]) if m else None


BF = json.load(open(os.path.join(ROOT, 'data', 'buyer-facts.json')))
MOP = json.load(open(os.path.join(ROOT, 'data', 'hdb-mop.json')))['towns']
HUBS = [('Raffles Place (CBD)', 1.2840, 103.8514), ('Tanjong Pagar (CBD)', 1.2765, 103.8457), ('Marina Bay', 1.2790, 103.8545), ('Orchard', 1.3043, 103.8320),
        ('Novena', 1.3204, 103.8437), ('one-north', 1.2995, 103.7874), ('Mapletree Business City', 1.2750, 103.7990), ('Paya Lebar', 1.3177, 103.8927),
        ('Jurong Lake District', 1.3332, 103.7422), ('Changi Business Park', 1.3349, 103.9616), ('Tampines Regional Centre', 1.3532, 103.9452),
        ('Woodlands Regional Centre', 1.4370, 103.7865), ('Punggol Digital District', 1.4155, 103.9104)]   # office hubs, approximate points
_rc = [(v['rent'][1], (HOMES.get(k) or {}).get('units')) for k, v in COMP['p'].items() if v.get('rent') and (HOMES.get(k) or {}).get('units')]
RENT_ISL = sum(a for a, b in _rc) / sum(b for a, b in _rc)   # rental contracts a year per home, islandwide (condos with known homes)
OWN_MIN_SQFT = 1000   # Jack (26 Nov 2026): most own-stay buyers now want at least about 1,000 sq ft


def area_profile(c, me):
    near = [(v, (HOMES.get(k) or {}).get('units')) for k, v in COMP['p'].items() if _km(me, v) <= 1.0]
    rc = sum(v['rent'][1] for v, h in near if v.get('rent') and h); hm = sum(h for v, h in near if v.get('rent') and h)
    rent_ratio = (rc / hm) / RENT_ISL if hm >= 300 else None
    landed5 = sum(x[2] for x in COMP['landed'] if _km(me, {'lat': x[0], 'lon': x[1]}) <= 1.5)
    lp = sorted(p for x in COMP['landed'] if x[4] and _km(me, {'lat': x[0], 'lon': x[1]}) <= 1.5 for p in [x[4]] * x[3])
    hub = min(((nm, _km(me, {'lat': la, 'lon': lo})) for nm, la, lo in HUBS), key=lambda t: t[1])
    schools = len((NEAR.get(c['nearby_key'], {}) or {}).get('schools') or [])
    resale12 = sum(v['m12'][1] for v, h in near)
    inv = (rent_ratio is not None and rent_ratio >= 1.25) + (rent_ratio is not None and rent_ratio >= 1.6) + (hub[1] <= 3)
    own = (rent_ratio is not None and rent_ratio <= 0.85) + (landed5 >= 150) + (schools >= 2) + (hub[1] >= 6)
    kind = 'Rental and investment area' if inv - own >= 2 else 'Own-stay family area' if own - inv >= 2 else 'Mixed own-stay and rental area'
    return dict(kind=kind, rent_ratio=rent_ratio, landed5=landed5, landed_med=lp[len(lp) // 2] if lp else None, hub=hub, schools=schools, resale12=resale12)


def mop_pipeline(towns, sale_y):
    out = []
    for t in towns:
        v = (MOP.get(t) or {}); n = sum(v.get(str(y), 0) for y in range(2021, sale_y - 4))
        out.append((t, n))
    return out


FPS = json.load(open(os.path.join(ROOT, 'data', 'floorplans.json')))['sales']   # developer's caveat psf by layout (Stacked Homes directory)


def matched(key, S):
    """Average psf of a competitor's resales within 15% of size S (25% if too few), last 6 months if 3+ else 12, else 24."""
    t = (COMP['p'].get(key) or {}).get('tx') or []
    for tol in (.15, .25):
        for win in (6, 12, 24):
            x = [p for a, sq, p in t if a < win and abs(sq - S) <= tol * S]
            if len(x) >= 3: return dict(psf=sum(x) / len(x), n=len(x), win=win, lo=round(S * (1 - tol), -1), hi=round(S * (1 + tol), -1))
    return None


def layout_psf(slug, beds):
    """Sold-weighted average psf for this bedroom count from the developer's caveats (mid of each layout's range)."""
    r = [x for x in (FPS.get(slug) or []) if str(x[2]) == str(beds) and x[6] and x[7] and (x[5] or 0) > 0]
    if not r: return None
    w = sum(x[5] for x in r)
    return dict(psf=sum((x[6] + x[7]) / 2 * x[5] for x in r) / w, sqft=sum(x[3] * x[5] for x in r) / w, sold=w)


def size_curve(comps):
    """How psf changes with size among the competitors' own resales (log-log slope), clamped to a sensible range."""
    import math
    xs = ys = None; sxx = sxy = 0; npts = 0
    for x in comps:
        t = (COMP['p'].get(x.get('key')) or {}).get('tx') or []
        if len(t) < 5: continue
        ls = [math.log(sq) for _, sq, _ in t]; lp = [math.log(p) for _, _, p in t]; ms, mp = sum(ls) / len(ls), sum(lp) / len(lp)
        for a, b in zip(ls, lp): sxx += (a - ms) ** 2; sxy += (a - ms) * (b - mp); npts += 1
    if npts < 15 or sxx == 0: return 0.0
    return max(-0.3, min(0.1, sxy / sxx))


def _fp_from(rows):
    """Developer's 'from' prices in the unit list ('$2.503M at launch') -> {beds: psf}."""
    out = {}
    for r in rows or []:
        m = re.search(r'\$([\d.]+)M', str(r[3] or '')); sz = r[2] if isinstance(r[2], (int, float)) else (int(re.search(r'\d+', str(r[2])).group()) if re.search(r'\d+', str(r[2])) else None)
        if m and sz and isinstance(r[0], int): out.setdefault(r[0], []).append(float(m.group(1)) * 1e6 / sz)
    return {b: sum(v) / len(v) for b, v in out.items()}


FPD = json.load(open(os.path.join(ROOT, 'data', 'floorplans.json')))['plans']
try: FPB = json.load(open(os.path.join(ROOT, 'assets', 'fp', 'plans.json')))['p']
except Exception: FPB = {}


def _plan_geo():
    out = {}
    for k in FPD:
        g = GEO.get(k)
        if not g:
            v = next((v for kk, v in COMP['p'].items() if _slug(_tc(v['n'])) == k or _slug(v['n']) == k), None)
            g = {'lat': v['lat'], 'lon': v['lon']} if v else None
        if g and 'lat' in g: out[k] = g
    return out
PLANGEO = _plan_geo()


def plan_facts(cid, beds):
    """Main layout for this bedroom count, scored with the same rules as scripts/floorplans.cjs."""
    p = next((x for x in FPD.get(cid, []) if str(x['k']) == str(beds)), None)
    if not p: return None
    area = lambda r: abs(r[4] - r[2]) * abs(r[5] - r[3])
    cnt = [r for r in p['rects'] if r[0] != 'xledge']; tot = sum(area(r) for r in cnt) or 1
    sh = lambda ks: sum(area(r) for r in cnt if r[0] in ks) / tot * 100
    waste = p['stated'][1] / p['stated'][2] * 100 if p.get('stated') else sh(['ledge', 'planter', 'bay'])
    bal = p['stated'][0] / p['stated'][2] * 100 if p.get('stated') else sh(['balcony'])
    hall = sh(['hall'])
    f = p['f']; sc = 4
    sc += 1 if f.get('shape') == 'regular' else 0
    sc += 1 if f.get('dumb') is True else 0
    sc += 1 if f.get('kit') in ('enclosed', 'dry+wet') else 0
    sc += 1 if f.get('kwin') else 0
    sc += 1 if waste < 5 else -1 if waste >= 10 else 0
    sc += -1 if f.get('corr') == 'long' else 0
    sc += -1 if bal > 12 else 0
    sc += 1 if (f.get('store') or f.get('hs') or f.get('helper')) else 0
    b = next((x for x in FPB.get(cid, []) if str(x['k']) == str(beds)), {})
    stor = [w for w, ok in (('store', f.get('store')), ('household shelter', f.get('hs')), ('utility or helper room', f.get('helper'))) if ok]
    return dict(type=p['type'], sqft=p['sqft'], sc=max(1, min(10, sc)), shape=f.get('shape'), dumb=f.get('dumb'), kit=f.get('kit'), kwin=bool(f.get('kwin')),
                corr=f.get('corr'), stor=stor, waste=round(waste, 1), bal=round(bal, 1), hall=round(hall, 1), eff=round(100 - waste - hall, 1),
                harm=bool(p.get('harm')), svg=b.get('svg') or f"/assets/fp/{cid}-{beds}.svg", pros=p.get('pros', [])[:2], cons=p.get('cons', [])[:2], src=p.get('src'))


CBD = {'lat': 1.2840, 'lon': 103.8514}
RING = lambda g: 'city' if _km(g, CBD) < 6 else 'middle' if _km(g, CBD) < 11 else 'outer'
RING_NAME = {'city': 'city and city fringe (under 6 km from the CBD)', 'middle': 'middle ring (6 to 11 km from the CBD)', 'outer': 'outer suburbs (11 km or more from the CBD)'}


def _cluster_study():
    """Islandwide test: condos completed 2016-2022, new homes completed within 2 km within a year of them, against their 4-year price change."""
    rows = []
    for k, v in COMP['p'].items():
        h = HOMES.get(k) or {}
        if h.get('top') and h.get('units') and not v['ec']: rows.append(dict(lat=v['lat'], lon=v['lon'], top=h['top'], u=h['units'], g=v['gA'], n=v['m12'][1]))
    test = [r for r in rows if 2016 <= r['top'] <= 2022 and r['g'] is not None and r['n'] >= 5]
    for r in test: r['cl'] = sum(o['u'] for o in rows if o is not r and abs(o['top'] - r['top']) <= 2 and _km(r, o) <= 2)
    out = {}
    for ring in ('city', 'middle', 'outer'):
        sub = sorted([r for r in test if RING(r) == ring], key=lambda r: r['cl']); m = len(sub) // 2
        if m >= 3: out[ring] = dict(n=len(sub), med=sub[m]['cl'], low=sum(r['g'] for r in sub[:m]) / m, high=sum(r['g'] for r in sub[m:]) / (len(sub) - m))
    allv = sorted(test, key=lambda r: r['cl']); t = len(allv) // 3
    out['all'] = dict(n=len(allv), low=sum(r['g'] for r in allv[:t]) / t, high=sum(r['g'] for r in allv[2 * t:]) / (len(allv) - 2 * t))
    return out
CLUSTER = _cluster_study()


def _passthrough():
    L = [x for x in LAND if x['launched'] and x['price']]
    xs = [x['psf'] for x in L]; ys = [x['price'] / x['floor'] - 1 for x in L]; ps = [x['price'] for x in L]; fs = [x['floor'] for x in L]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    sxx = sum((a - mx) ** 2 for a in xs); sxy = sum((a - mx) * (c - my) for a, c in zip(xs, ys)); syy = sum((c - my) ** 2 for c in ys)
    mf, mp = sum(fs) / len(fs), sum(ps) / len(ps)
    pt = sum((a - mf) * (b - mp) for a, b in zip(fs, ps)) / sum((a - mf) ** 2 for a in fs)
    lo = [x for x in L if x['psf'] < 1200]; hi = [x for x in L if x['psf'] >= 1200]
    return dict(n=len(L), per100=sxy / sxx * 100, corr=sxy / (sxx * syy) ** .5, pass_=pt,
                lo=(len(lo), sum(x['price'] / x['floor'] - 1 for x in lo) / len(lo)), hi=(len(hi), sum(x['price'] / x['floor'] - 1 for x in hi) / len(hi)))
PASS = _passthrough()
PIPE = {'by_year': [[2026, 5012], [2027, 8440], [2028, 9856], [2029, 6866], [2030, 6123], ['after 2030', 2259]], 'unsold': 15810, 'total60': 60600,
        'src': ['URA, 2nd and 3rd Quarter 2026 real estate statistics (supply in the pipeline by expected completion year, excluding ECs)', 'https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr26-73']}
SUPPLY_EXTRA = {'one-chuan-grove': [['the third Chuan Grove site', 930, 'on the Reserve List since 27 Oct 2026 and sold only if a developer triggers it']]}
LAND_EXTRA = {'one-chuan-grove': [['Chuan Park (collective sale)', 116, 1190, 'Jul 2022', 'Launched', be(1190), 2579, '', 2579, 2579, 'launch average', 'Estimate: $890M sale; reports give $1,042 psf ppr at the $938M asking price and $1,256 including the upgrading premium, so about $1,190 at $890M']]}
ABSD_SRC = ['IRAS, ABSD remission for housing developers (sell all units within 5 years; tiered clawback from 16 Feb 2024)', 'https://iras.gov.sg/taxes/stamp-duty/for-property/appeals-refunds-reliefs-and-remissions/common-stamp-duty-remissions-and-reliefs-for-property/sites-for-development-of-five-or-more-residential-units']


_MKT = None
def market_norm():
    """Average premium of launches selling now (and recently sold) over their closest resale competitors' latest psf (+5% for the
    older area rules), with launch prices moved to today. Uses the same competitor rules. Returns (average %, count, by region)."""
    global _MKT
    if _MKT is not None: return _MKT
    vals = []
    for l in NLD['L']:
        if not l.get('avgPsf') or l['id'] not in GEO or l['id'] == 'sophia-meadow': continue
        lm = _launch_month(l['launch']); ql = f"{lm // 12}Q{(lm % 12) // 3 + 1}" if lm else NOW_Q
        app = next((p for p in ALLP if _nm(p['name']) == _nm(l['name']) or _nm(p['name']).startswith(_nm(l['name'])[:10])), {})
        c = dict(name=l['name'], homes=int(re.search(r'\d[\d,]*', l['units']).group().replace(',', '')), geo_key=l['id'], nearby_key=l['id'],
                 leasehold=_lh(l['tenure']), ec='executive' in l['name'].lower() or l['id'] == 'coastal-cabana', integrated=bool(app.get('mall')), self_slugs=(_slug(app.get('name', '')),))
        res = [x for x in competitors(c) if x['kind'] == 'Resale']
        if not res: continue
        integ = lambda x: 1 + (INTEG if c['integrated'] and not x['integ'] else 0)
        typs = [(b, layout_psf(l['id'], b)) for b in (1, 2, 3, 4, 5)]
        typs = [(b, v) for b, v in typs if v] or [(0, dict(psf=l['avgPsf'], sqft=900, sold=1))]
        num = den = 0
        for b, v in typs:
            ms = [(matched(x['key'], v['sqft']), x) for x in res]; ms = [(m, x) for m, x in ms if m]
            if not ms: continue
            base = sum(m['psf'] * (1 + HARMONISE) * integ(x) for m, x in ms) / len(ms)
            num += (v['psf'] * IDX[NOW_Q] / IDX.get(ql, IDX[NOW_Q]) / base - 1) * v['sold']; den += v['sold']
        if not den: continue
        vals.append((l['name'], num / den, l['region']))
    avg = sum(v for _, v, _ in vals) / len(vals)
    reg = {}
    for _, v, r in vals:
        k = 'CCR' if 'CCR' in r else 'RCR' if 'RCR' in r else 'OCR'; reg.setdefault(k, []).append(v)
    _MKT = (avg, len(vals), {k: (sum(v) / len(v), len(v)) for k, v in reg.items()}, vals)
    return _MKT


def _resale_pool(c, radius=3000):
    me = GEO.get(c['geo_key']); lh, ec = c.get('leasehold', True), bool(c.get('ec'))
    selfn = {_nm(x) for x in (c['name'], *c.get('self_names', ()))}
    out = []
    for k, v in COMP['p'].items():
        if bool(v['ec']) != ec or _lh(v['t']) != lh or v['m12'][1] < 3 or _nm(v['n']) in selfn: continue
        if lh and int((re.match(r'(\d+) years', v['t']) or [0, 99])[1]) < 90: continue   # a short lease (The Hillford, 60 years) is not a fair match for 99 years
        d = _km(me, v) * 1000
        if d > radius: continue
        h = HOMES.get(k) or {}
        basis = v['m6'] if v['m6'] and v['m6'][1] >= 5 else v['m12']
        name = _tc(v['n'])
        out.append(dict(name=name, key=k, dist=round(d), units=h.get('units'), tenure=v['t'], top=h.get('top'), psf=basis[0],
                        basis='last 6 months' if basis is v['m6'] else 'last 12 months', deals=v['m12'][1], m6=v['m6'], m12=v['m12'],
                        lo6=v['lo6'], hi6=v['hi6'], b3=v['b3'], rent=v['rent'], y1=v['y1'], g3=v['g3'], n3=v['n3'], last=v['last'],
                        g=v['g3'] if v['g3'] is not None else v['gA'] if v['gA'] is not None else FALLBACK_4Y.get(name),
                        kind='Resale', harmonised=False, integ=name in INTEGRATED))
    return out


def competitors(c):
    """Up to 5 competitors. Near-twins first (within 1.5 km, 0.5x to 2x the homes, completed 2016+ or a recent launch),
    then every suitable condo within 1 km, widening to 2 km and 3 km only if fewer than 3. Returns list of dicts."""
    homes, lh = c['homes'], c.get('leasehold', True)
    pool = _resale_pool(c)
    for x in pool:
        x['size_ok'] = bool(x['units']) and 0.4 * homes <= x['units'] <= 2.5 * homes
        x['new'] = bool(x['top']) and x['top'] >= 2005   # completed in the last 20 years (26 Nov 2026: older condos are a poor guide to a new launch)
    me = GEO.get(c['geo_key'])
    for p in RECENT:
        is_ec = 'EC' in p['name'] or 'Executive' in p['type']
        if p['launchSort'] > 202611 or is_ec != bool(c.get('ec')) or _lh(p['tenure']) != lh or _slug(p['name']) in (c['geo_key'], *c.get('self_slugs', ())) or _nm(p['name']) == _nm(c['name']): continue
        g = GEO.get(_slug(p['name']))
        if not (me and g and 'lat' in g): continue
        d = _km(me, g) * 1000
        pool.append(dict(name=p['name'], dist=round(d), units=p['units'], tenure=p['tenure'], top=None, psf=p['psf'], deals=None, g=None, g3=None, basis='launch average',
                         kind=f"Launched {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p['launchSort'] % 100 - 1]} {p['launchSort'] // 100}",
                         launchSort=p['launchSort'], harmonised=p['launchSort'] >= HARMONISED_FROM, integ=p['mall'],
                         size_ok=bool(p['units']) and 0.4 * homes <= p['units'] <= 2.5 * homes, new=True))
    # Near-twins (Jack, 26 Nov 2026): a condo of similar size completed in the last 10 years is the best evidence, even up to 1.5 km.
    twin = lambda x: x['dist'] <= 1500 and bool(x['units']) and 0.5 * homes <= x['units'] <= 2 * homes and (x['kind'] != 'Resale' or (x['top'] or 0) >= 2016)
    pick = sorted([x for x in pool if twin(x)], key=lambda y: y['dist'])[:2]
    for x in pick: x['twin'] = True
    # Then closest first (Jack, 25 Nov 2026): fill from within 1 km before widening to 2 km, then 3 km. Within a band, similar size and
    # newer (completed 2011+ or a recent launch) come first, then any condo completed 2000 or later.
    recent = lambda x: x['kind'] != 'Resale' or (x['top'] or 0) >= 2011
    big = lambda x: not x['units'] or x['units'] >= 0.25 * homes   # a boutique of under a quarter of this project's homes is not a fair match (26 Nov 2026)
    for allow_small in (False, True):
        for band in (1000, 2000, 3000):
            for test in (lambda x: x['size_ok'] and recent(x), lambda x: recent(x) and (allow_small or big(x)), lambda x: x['size_ok'] and x['new'], lambda x: x['new'] and (allow_small or big(x))):
                for x in sorted([y for y in pool if y['dist'] <= band and y not in pick and test(y)], key=lambda y: y['dist']):
                    if len(pick) < 5: pick.append(x)
                if len(pick) >= 3: break
            if len(pick) >= 3: break
        if len(pick) >= 3: break
    for x in pick:
        if x['kind'] == 'Resale':
            x['adj_h'] = 0 if x['harmonised'] else HARMONISE
            x['adj_n'] = NEW_PREMIUM
            x['adj_i'] = INTEG if c['integrated'] and not x['integ'] else 0
            x['equiv'] = x['psf'] * (1 + x['adj_h']) * (1 + x['adj_n']) * (1 + x['adj_i'])
        else:
            x['time'] = IDX[NOW_Q] / IDX.get(_q(x['launchSort']), IDX[NOW_Q]) - 1
            x['adj_h'] = 0 if x['harmonised'] else HARMONISE
            x['adj_n'] = 0
            x['adj_i'] = INTEG if c['integrated'] and not x['integ'] else 0
            x['equiv'] = x['psf'] * (1 + x['time']) * (1 + x['adj_h']) * (1 + x['adj_i'])
    return pick


def gain(entry, size, exit_psf):
    price = entry * size
    return exit_psf * size * (1 - SELL) / (price + bsd(price) + LEGAL) - 1


def region_premium(c):
    """Average premium of launches selling now (and recently sold) in this condo's region over their closest resale competitors,
    leaving this condo out. Jack, 26 Nov 2026: replaces the flat 15%."""
    _, _, _, vals = market_norm()
    rk = 'CCR' if 'CCR' in c['region'] else 'RCR' if 'RCR' in c['region'] else 'OCR'
    v = [x for nm, x, r in vals if (('CCR' in r) if rk == 'CCR' else ('RCR' in r) if rk == 'RCR' else ('CCR' not in r and 'RCR' not in r)) and _nm(nm) != _nm(c['name'])]
    return sum(v) / len(v), len(v), rk


_PP = None
AGE_MAX = 20


def _prem_pairs():
    """Each launch selling now (or recently sold) against each of its resale competitors: (launch, region, competitor age in years,
    launch price moved to today over the competitor's same-size resale psf +5% for the old area rules, minus 1)."""
    global _PP
    if _PP is not None: return _PP
    out, ny = [], int(NOW_Q[:4])
    for l in NLD['L']:
        if not l.get('avgPsf') or l['id'] not in GEO or l['id'] == 'sophia-meadow': continue
        lm = _launch_month(l['launch']); ql = f"{lm // 12}Q{(lm % 12) // 3 + 1}" if lm else NOW_Q
        app = next((p for p in ALLP if _nm(p['name']) == _nm(l['name']) or _nm(p['name']).startswith(_nm(l['name'])[:10])), {})
        c = dict(name=l['name'], homes=int(re.search(r'\d[\d,]*', l['units']).group().replace(',', '')), geo_key=l['id'], nearby_key=l['id'],
                 leasehold=_lh(l['tenure']), ec='executive' in l['name'].lower() or l['id'] == 'coastal-cabana', integrated=bool(app.get('mall')), self_slugs=(_slug(app.get('name', '')),))
        rk = 'CCR' if 'CCR' in l['region'] else 'RCR' if 'RCR' in l['region'] else 'OCR'
        typs = [(b, layout_psf(l['id'], b)) for b in (1, 2, 3, 4, 5)]
        typs = [(b, v) for b, v in typs if v] or [(0, dict(psf=l['avgPsf'], sqft=900, sold=1))]
        for x in competitors(c):
            if x['kind'] != 'Resale' or not x['top']: continue
            integ = 1 + (INTEG if c['integrated'] and not x['integ'] else 0); num = den = 0
            for b, v in typs:
                m = matched(x['key'], v['sqft'])
                if not m: continue
                num += (v['psf'] * IDX[NOW_Q] / IDX.get(ql, IDX[NOW_Q]) / (m['psf'] * (1 + HARMONISE) * integ) - 1) * v['sold']; den += v['sold']
            if den: out.append((l['name'], rk, ny - x['top'], num / den))
    _PP = out
    return out


def age_premium(c):
    """New-launch premium over a resale competitor by the competitor's age (26 Nov 2026, replaces one premium per region): launches
    selling now carry about 2.6 points more for every year of their competitor's age (113 launch-competitor pairs, 30 launches; age alone
    explains about 40% of the spread). One level per region (OCR / RCR / CCR; ECs use OCR), one slope, leaving this condo out."""
    rk = 'CCR' if 'CCR' in c.get('region', '') else 'RCR' if 'RCR' in c.get('region', '') else 'OCR'
    pp = [p for p in _prem_pairs() if _nm(p[0]) != _nm(c['name'])]; n_all = len(pp)
    for it in (0, 1):   # fit, then refit without the pairs more than 2 standard deviations from it (e.g. Norwood Grand at 95% over Rosewood Suites)
        regs = sorted({p[1] for p in pp})
        ma = {r: sum(p[2] for p in pp if p[1] == r) / sum(1 for p in pp if p[1] == r) for r in regs}
        mp = {r: sum(p[3] for p in pp if p[1] == r) / sum(1 for p in pp if p[1] == r) for r in regs}
        b = sum((p[2] - ma[p[1]]) * (p[3] - mp[p[1]]) for p in pp) / sum((p[2] - ma[p[1]]) ** 2 for p in pp)
        if it == 0:
            res = [p[3] - (mp[p[1]] + b * (p[2] - ma[p[1]])) for p in pp]; sd = (sum(e * e for e in res) / len(res)) ** .5
            pp = [p for p, e in zip(pp, res) if abs(e) <= 2 * sd]
    a = mp[rk] - b * ma[rk]
    f = lambda age: a + b * max(0, min(AGE_MAX, age)) if age is not None else mp[rk]
    return f, dict(rk=rk, a0=a, b=b, avg=mp[rk], n=len({p[0] for p in pp if p[1] == rk}), launches=len({p[0] for p in pp}), pairs=len(pp), dropped=n_all - len(pp))


def _beta_nl():
    """How psf changes with unit size in launches selling now (developers' caveats by layout): median log-log slope."""
    import math
    sl = []
    for rows in FPS.values():
        pts = {}
        for r in rows:
            if r[3] and r[6] and r[7] and (r[5] or 0) > 0: pts.setdefault(r[3], []).append(((r[6] + r[7]) / 2, r[5]))
        if len(pts) < 3: continue
        xs = [math.log(k) for k in pts]; ys = [math.log(sum(q * w for q, w in v) / sum(w for _, w in v)) for v in pts.values()]
        mx, my = sum(xs) / len(xs), sum(ys) / len(ys); sxx = sum((u - mx) ** 2 for u in xs)
        if sxx: sl.append(sum((u - mx) * (w - my) for u, w in zip(xs, ys)) / sxx)
    sl = sorted(v for v in sl if abs(v) <= 0.5)
    return (sl[len(sl) // 2] if sl else 0.0), len(sl)


BETA_NL, BETA_NL_N = _beta_nl()


def _first_sentence(t):
    """First sentence, not cut at abbreviations such as 'St.' (St. Gabriel's)."""
    return re.split(r'(?<!\bSt)\.\s', t)[0].rstrip('.')


def build(pid, c):
    comps = competitors(c)
    prem_f, pinfo = age_premium(c); ny = int(NOW_Q[:4])
    for x in comps:
        if x['kind'] == 'Resale': x['adj_n'] = prem_f(ny - x['top'] if x['top'] else None)
    prs = [x['adj_n'] for x in comps if x['kind'] == 'Resale']
    prem_txt = (f"{min(prs) * 100:.0f}%" if round(min(prs) * 100) == round(max(prs) * 100) else f"{min(prs) * 100:.0f}% to {max(prs) * 100:.0f}%") if prs else ''
    prem_why = (f"a new-launch premium that rises with each competitor's age ({prem_txt} here): launches selling now in the {pinfo['rk']} charge about {pinfo['a0'] * 100:.0f}% over a just-completed resale "
                f"and about {pinfo['b'] * 100:.1f} points more for each year of its age ({pinfo['launches']} launches against {pinfo['pairs']} of their resale competitors, this one and the {pinfo['dropped']} most extreme pairs left out)")
    # ---- like-for-like by size (Jack, 26 Nov 2026): each unit type against the competitors' resales of about the same size ----
    sizes = c['sizes']; tm = '3-bed' if '3-bed' in sizes else list(sizes)[0]
    lo0, hi0 = c['expected']; mid0 = (lo0 + hi0) / 2
    beta = size_curve([x for x in comps if x['kind'] == 'Resale'])
    s_avg = sum(sizes.values()) / len(sizes)
    fromp = _fp_from(c.get('fp_rows'))
    own = {t: layout_psf(pid, int(t[0])) for t in sizes if t[0].isdigit()}
    per = {}
    for t, S in sizes.items():
        bd = int(t[0]) if t[0].isdigit() else 3
        if own.get(t): f = own[t]['psf'] / mid0; how = 'caveats'
        elif fromp and fromp.get(bd): f = fromp[bd] / (sum(fromp.values()) / len(fromp)); how = 'from'
        else: f = (S / s_avg) ** BETA_NL; how = 'curve'
        eqs = []
        for x in comps:
            if x['kind'] == 'Resale':
                m = matched(x['key'], S)
                if not m:   # no resales of this size: estimate from its own nearest size, using the competitors' price-by-size pattern
                    refs = [(abs(S2 - S), S2, matched(x['key'], S2)) for S2 in sizes.values() if S2 != S]
                    refs = [r for r in refs if r[2]]
                    if refs:
                        _, S2, m2 = min(refs, key=lambda r: r[0])
                        m = dict(psf=m2['psf'] * (S / S2) ** beta, n=None, win='est', lo=None, hi=None)
                    else:
                        t_ = (COMP['p'].get(x['key']) or {}).get('tx') or []
                        msz = sorted(sq for _, sq, _ in t_)[len(t_) // 2] if t_ else S
                        m = dict(psf=x['psf'] * (S / msz) ** beta, n=None, win='est', lo=None, hi=None)
                eqs.append((x, m, m['psf'] * (1 + x['adj_h']) * (1 + x['adj_n']) * (1 + x['adj_i'])))
            else:
                lp = layout_psf(_slug(x['name']), bd); base_ = lp['psf'] if lp else x['psf']
                eqs.append((x, dict(psf=base_, n=None, win=None, layout=bool(lp)), base_ * (1 + x['time']) * (1 + x['adj_h']) * (1 + x['adj_i'])))
        if not eqs: eqs = [(x, dict(psf=x['psf'], n=None, win=None), x['psf'] * (1 + x['adj_h']) * (1 + x['adj_n']) * (1 + x['adj_i'])) for x in comps]
        le = [e for x_, _, e in eqs if x_['kind'] != 'Resale' and x_['dist'] <= 2000]; re_ = [e for x_, _, e in eqs if x_['kind'] == 'Resale']
        # a launch of the last 24 months within 2 km is the most direct evidence of today's new-home prices: half the weight (26 Nov 2026)
        bb = round(((sum(le) / len(le) + sum(re_) / len(re_)) / 2 if le and re_ else sum(e for _, _, e in eqs) / len(eqs)) / 10) * 10
        per[t] = dict(S=S, eqs=eqs, buy=bb, walk=round(bb * (1 + WALK) / 10) * 10, lo=round(lo0 * f / 10) * 10, hi=round(hi0 * f / 10) * 10, mid=mid0 * f, how=how)
    for x in comps:   # competitor table follows the main unit type
        e = next((q for q in per[tm]['eqs'] if q[0] is x), None)
        if e: x['psf'], x['equiv'] = e[1]['psf'], e[2]; x['basis'] = (f"{tm} size, last {e[1]['win']} months ({e[1]['n']})" if e[1].get('n') else f"{tm} size estimated from its other sizes" if e[1].get('win') == 'est' else x.get('basis'))
    buy = per[tm]['buy']
    me = GEO.get(c['geo_key']); EXS = {}
    # Master Plan / rail catalysts: an existing station within 1 km that gains a Confirmed new line, or listed precinct items
    plan_rows = [list(r) for r in c['plan']]; have = ' '.join(r[0] for r in plan_rows); cat = None
    for st, dm in (NEAR.get(c['nearby_key'], {}).get('mrt') or []):
        if st in RAIL and dm <= 1000 and RAIL[st][0].split(' (')[0] not in have:
            line, yr = RAIL[st]; k = 'rail_cross' if 'Cross' in line else 'rail_jrl'
            plan_rows.insert(0, [f"{st} station becomes an interchange with the {line}", f"About {dm:,} m", f"Targeted {yr}", 'Direct trips to more of the island; the main catalyst', 'Confirmed', k])
            EXS[k] = RAIL_SRC['Cross' if 'Cross' in line else 'Jurong']; have += ' ' + line; cat = cat or (f"the {line} at {st} station", yr)
    for row in EXTRA_PLAN.get(pid, []):
        if row[0].split(' on ')[0] in have: continue
        plan_rows.insert(0, row[:6]); EXS['rail_cross' if row[5] == 'rail_cross' else 'jld'] = RAIL_SRC['Cross'] if row[5] == 'rail_cross' else JLD
        if row[6]: cat = cat or (row[0].split(' (')[0].replace('station on the', 'station on the'), 2032)
    bull_add = c.get('bull_add', 0) or (0.01 if cat else 0)
    bull_why = c['bull_why'] if c.get('bull_add') or not cat else f"Base plus 1 point a year for {cat[0]}, Confirmed for {cat[1]}."
    plan_line = c['plan_line'] if c.get('bull_add') or not cat else f"{cat[0][0].upper() + cat[0][1:]} is Confirmed for {cat[1]}; it adds 1 point a year to the bull case only. Other items are context."
    # Latest transactions of the competitors (URA caveats)
    res = [x for x in comps if x['kind'] == 'Resale']
    walk = round(buy * (1 + WALK) / 10) * 10
    # Growth: suitable record = 3-bed 4-year change (URA) with at least 10 resales in 12 months. Competitors first;
    # if fewer than 2 qualify, add the nearest suitable same-tenure condos within 2 km; then any distance up to 5 km; then the index.
    gsrc = [(x['name'], x['g3']) for x in comps if x.get('g3') is not None and (x['deals'] or 0) >= 10]
    growth_only = []
    rows = sorted(_resale_pool(c, 5000), key=lambda r: r['dist'])
    for limit in (2000, 5000):
        for r in rows:
            if len(gsrc) >= 2 or r['dist'] > limit: break
            if r['g3'] is not None and r['deals'] >= 10 and not any(n == r['name'] for n, _ in gsrc): gsrc.append((r['name'], r['g3'])); growth_only.append(f"{r['name']} ({r['dist'] / 1000:.1f} km)")
        if gsrc: break
    if not gsrc: gsrc = [('URA non-landed index, Q3 2016 to Q3 2026', 4.7)]; growth_only.append('index')
    gs = [g for _, g in gsrc]
    base_raw = sum(gs) / len(gs) / 100
    base = round(max(0.0, min(base_raw, GROWTH_CAP)), 4)   # common sense (26 Nov 2026): kept between flat and the market's 10-year pace
    g = {'bear': round(base_raw, 4) if base_raw < 0 else base / 2, 'base': base, 'bull': base + bull_add}
    cap_note = f" That averages {base_raw * 100:.1f}% a year, above the market's 10-year pace, so the base case is capped at {GROWTH_CAP * 100:.1f}% (URA non-landed index, 2016 to 2026): 2022 to 2026 included an unusual rise, and a new launch bought at a premium rarely outgrows the market for years." if base_raw > GROWTH_CAP else (f" That averages a fall of {abs(base_raw) * 100:.1f}% a year; a fall carried on for 10 years is not a fair middle case, so the base case is flat and the bear case keeps the fall going." if base_raw < 0 else "")
    n = c['years']
    ex = {k: buy * (1 + v) ** n for k, v in g.items()}
    lo, hi, mid = per[tm]['lo'], per[tm]['hi'], per[tm]['mid']
    RNG = fmt_money(lo) if lo == hi else f'{fmt_money(lo)} to {fmt_money(hi)}'
    pc0 = lambda v: '0%' if round(v * 100) == 0 else (f"{v * 100:+.0f}%").replace('-', '−')
    tx = []
    for x in comps:
        if x['kind'] != 'Resale':
            tx.append([x['name'], x['dist'], None, None, None, None, None, None, None, None, None, x['kind'], round(x['psf']), round(mid - x['psf']), mid / x['psf'] - 1, round(x['equiv']), mid / x['equiv'] - 1, None]); continue
        tx.append([x['name'], x['dist'], *(x['m6'] or [None, 0]), *x['m12'], x['lo6'], x['hi6'], *((x['b3'] or [None, None, 0])[:2]), x['last'], x['basis'], round(x['psf']), round(mid - x['psf']), mid / x['psf'] - 1, round(x['equiv']), mid / x['equiv'] - 1, x['rent'][0] if x['rent'] and x['rent'][1] >= 5 else None])
    szt = {'types': [[t, S, round(per[t]['mid'])] for t, S in sizes.items()], 'rows': []}
    for x in comps:
        cells = []
        for t in sizes:
            e = next((q for q in per[t]['eqs'] if q[0] is x), None)
            cells.append(None if not e else [round(e[1]['psf']), e[1].get('n'), e[1].get('win'), e[1].get('lo'), e[1].get('hi'), round(e[2])])
        szt['rows'].append([x['name'], x['dist'], x['kind'], cells])
    ref = next((x for x in comps if x.get('twin') and x['kind'] == 'Resale'), None) or (res[0] if res else None)
    rm = matched(ref['key'], sizes[tm]) if ref else None
    if ref and rm:
        tx_line = (f"{ref['name']} ({ref['dist']:,} m away{', ' + format(ref['units'], ',') + ' homes' if ref['units'] else ''}{', completed ' + str(ref['top']) if ref['top'] else ''}): its {tm}-size resales (about {rm['lo']:,.0f} to {rm['hi']:,.0f} sq ft) averaged "
                   f"{fmt_money(round(rm['psf']))} psf over the last {rm['win']} months ({rm['n']} resales), against a median {fmt_money(ref['m12'][0])} psf for all sizes. A {tm} here at about {fmt_money(round(mid))} psf is {fmt_money(abs(round(mid - rm['psf'])))} psf ({pc0(mid / rm['psf'] - 1)}) {'above' if mid >= rm['psf'] else 'below'} that"
                   + (f"; a 3-bed there sold for a median {fmt_q(ref['b3'][1])}." if ref['b3'] else '.'))
    elif ref:
        tx_line = (f"{ref['name']} ({ref['dist']:,} m away) resold at a median {fmt_money(ref['m12'][0])} psf over 12 months ({ref['m12'][1]} resales), all sizes; too few {tm}-size resales to compare like for like.")
    else: tx_line = 'No resale competitor has enough recent resales.'
    # Market check: premium over the closest resale (after the 5% area adjustment) against launches selling now
    mk_avg, mk_n, mk_reg, mk_vals = market_norm()
    loo = [v for nm, v, r in mk_vals if _nm(nm) != _nm(c['name'])]; mk = sum(loo) / len(loo) if loo else mk_avg
    regk = ('CCR' if 'CCR' in c.get('region', '') else 'RCR' if 'RCR' in c.get('region', '') else 'OCR') if c.get('region') else None
    rl = [v for nm, v, r in mk_vals if regk and regk in r and _nm(nm) != _nm(c['name'])] if regk else []
    _bm = [(matched(x['key'], sizes[tm]), x) for x in res]; _bm = [(m, x) for m, x in _bm if m]
    base_res = sum(m['psf'] * (1 + HARMONISE) * (1 + (INTEG if c['integrated'] and not x['integ'] else 0)) for m, x in _bm) / len(_bm) if _bm else None
    prem = mid / base_res - 1 if base_res else None
    # Nearby land bids (2 km) and the cost floor they set for the next launches
    land_rows = []
    for L in LAND:
        if L['slug'] in (c['geo_key'], *c.get('self_slugs', ())) or L['lid'] == pid or _nm(L['name']) == _nm(c['name']): continue
        d = _km(me, L['geo']) * 1000
        if d > 2000: continue
        est = LAND_EST.get(L['name'])
        if est and est[1]: EXS[est[1]] = est[2]
        etxt = (est[0] if est else L['analyst']) or ''
        if L['launched']: lk = (L['price'], L['price'], 'launch average')
        elif _rng(etxt): lk = (*_rng(etxt), 'analysts')
        else: lk = (round(L['floor'] * (1 + MARGIN['avg']) / 10) * 10, round(L['floor'] * (1 + MARGIN['avg']) / 10) * 10, 'break-even plus the average launch margin')
        land_rows.append([L['name'], round(d), L['psf'], L['date'], 'Launched' if L['launched'] else 'Upcoming', L['floor'], L['price'], etxt, lk[0], lk[1], lk[2]])
    land_rows.sort(key=lambda r: r[1]); land_rows = land_rows[:6]
    up_land = [r for r in land_rows if r[4] == 'Upcoming']
    hi_up = max(up_land, key=lambda r: r[2]) if up_land else None
    land_line = ''
    if land_rows:
        land_line = f"Land bids within 2 km range from {fmt_money(min(r[2] for r in land_rows))} to {fmt_money(max(r[2] for r in land_rows))} psf ppr" + (f", against {fmt_money(c['land'])} for this site" if c.get('land') else '') + '.'
        if hi_up: land_line += (f" The {hi_up[0]} site ({hi_up[1]:,} m, {fmt_money(hi_up[2])} psf ppr{', ' + hi_up[3][0].lower() + hi_up[3][1:] if hi_up[3] else ''}) breaks even at about {fmt_money(hi_up[5])} psf (EdgeProp's method). "
                                + (f"Analysts expect it to launch at {hi_up[7]}" if hi_up[10] == 'analysts' else f"Launches since 2023 priced on average {MARGIN['avg'] * 100:.0f}% above break-even, which points to about {fmt_money(hi_up[8])}")
                                + f", {'above' if hi_up[8] > mid else 'around' if hi_up[9] >= mid else 'below'} this project's {tm} at about {fmt_money(round(mid))} psf.")
    # Other checks
    checks = []
    if prem is not None:
        checks.append(['Premium over closest resale', pc0(prem), f"A {tm} here against the competitors' {tm}-size resales (after the 5% area adjustment). Launches selling now averaged {pc0(mk)} over theirs ({len(loo)} launches" + (f"; {pc0(sum(rl) / len(rl))} in the {regk}, {len(rl)} launches" if rl else '') + "). " + ('In line with the market.' if abs(prem - (sum(rl) / len(rl) if rl else mk)) <= 0.05 else 'Above what the market usually pays.' if prem > (sum(rl) / len(rl) if rl else mk) else 'Below what the market usually pays.')])
    rents = [x['rent'] for x in res if x['rent'] and x['rent'][1] >= 5]
    if rents:
        rp = sum(r[0] for r in rents) / len(rents); r3 = [r[2] for r in rents if r[2] and r[3] >= 3]
        checks.append(['Rental yield at this price', f"{rp * 12 / mid * 100:.1f}% gross", f"Competitors' median rent about ${rp:.2f} psf a month (URA rental contracts, {COMP['rentQ']})" + (f"; a 3-bed rents for about {fmt_money(round(sum(r3) / len(r3), -1))} a month." if r3 else '.')])
    sup = [p for p in ALLP if p['launchSort'] >= 202401 and _nm(p['name']) != _nm(c['name']) and _slug(p['name']) not in (c['geo_key'], *c.get('self_slugs', ())) and GEO.get(_slug(p['name'])) and _km(me, GEO[_slug(p['name'])]) <= 2]
    checks.append(['New supply within 2 km', f"{len(sup)} project{'s' if len(sup) != 1 else ''}", (f"About {sum(p['units'] or 0 for p in sup):,} homes launched since 2024 or coming: " + ', '.join(p['name'] for p in sup[:5]) + ('…' if len(sup) > 5 else '') + '.') if sup else 'No other project launched since 2024 or coming within 2 km.'])
    if c.get('absorb'):
        u_, sp_, mo_ = c['absorb']; sold_ = round(u_ * sp_ / 100); pace = sold_ / max(1, mo_); left = u_ - sold_
        checks.append(['Sales pace', f"About {pace:,.0f} a month", f"{sold_:,} of {u_:,} homes sold in about {max(1, mo_)} month{'s' if mo_ > 1 else ''} since launch; {left:,} left" + (f", about {left / pace:.0f} months at that pace." if pace >= 1 and left else '.')])
    if c.get('land'):
        nl = [r for r in land_rows if r[6]]
        checks.append(['Price to land cost', f"{mid / c['land']:.2f}x", f"Price psf divided by land psf ppr." + (f" Launched projects nearby: {sum(r[6] / r[2] for r in nl) / len(nl):.2f}x on average." if nl else '')])
    EXP = c.get('exp_word', 'expected')
    land, build_, fin, fees = c['land'], c['build'], round((c['land'] or 0) * 0.09), 180
    floor = None if land is None else [be(land), round(be(land) * (1 + MARGIN['avg']) / 10) * 10]
    FLOOR0 = floor[0] if floor else 0
    units = {}
    for t, sz in c['sizes'].items():
        P = per[t]; ext = {k: P['buy'] * (1 + v) ** n for k, v in g.items()}
        xq = ext['base'] * sz; inc = income_needed(xq); up = .25 * xq + bsd(xq)
        msr = income_needed(P['mid'] * sz) * .55 / .30   # EC from the developer: 30% mortgage servicing ratio
        gm = {k: gain(P['mid'], sz, ext[k]) for k in g}
        if P['mid'] <= P['buy']: v = 'Buy'
        elif P['mid'] <= P['walk']: v = f"Buy only below {fmt_money(P['walk'])} psf"
        else: v = f"Walk away above {fmt_money(P['walk'])} psf"
        units[t] = dict(size=sz, xq=xq, inc=inc, up=up, gm=gm, v=v, msr=msr, ex=ext, P=P,
                        tab={lab: {k: gain(e, sz, ext[k]) for k in g} for lab, e in (('buy', P['buy']), ('exp', P['mid']), ('walk', P['walk']))})
    tm = '3-bed' if '3-bed' in units else list(units)[0]; u = units[tm]
    pct = lambda x: '0%' if round(x * 100) == 0 else f"{x*100:+.0f}%".replace('+-', '−').replace('-', '−')
    yr = lambda x: fmt_pct(((1 + x) ** (1 / n) - 1) * 100) + ' a year'
    # ---------- future buyers (Jack, 26 Nov 2026): who can buy each unit type from you at the sale, using their own capital ----------
    sale_y = c['buy_year'] + int(n); yrs = max(0, sale_y - 2026)
    prof = area_profile(c, me)
    inc_now, ig = BF['income2025_excl_cpf'], BF['income_growth_2015_2025']
    incF = {k: inc_now[k] * (1 + ig[k] / 100) ** (sale_y - 2025) for k in ('4-room', '5-room', 'condo', 'landed')}
    hdbF = {f: sum(HDB_T[t][f][0] for t in c['towns'] if f in HDB_T[t]) / max(1, sum(1 for t in c['towns'] if f in HDB_T[t])) * (1 + BF['hdb_rpi']['cagr10'] / 100) ** yrs for f in ('4-room', '5-room')}
    pay = lambda L: L * (.04 / 12) / (1 - (1 + .04 / 12) ** -360)
    b3q = [x['b3'][1] for x in comps if x.get('b3')]
    ref3 = sum(b3q) / len(b3q) if b3q else None
    for t, x in units.items():
        # Tested in today's money (Jack, 26 Nov 2026): the unit at today's price, today's HDB values and incomes. Prices, flat values and
        # incomes rise together, so this is the fair check of who can buy. The capital test (down payment after selling) decides; income is shown.
        Q = x['P']['mid'] * x['size']; dn = .25 * Q + bsd(Q); pools = []
        for f, ik in (('5-room', '5-room'), ('4-room', '4-room')):
            hp = sum(HDB_T[tw][f][0] for tw in c['towns'] if f in HDB_T[tw]) / max(1, sum(1 for tw in c['towns'] if f in HDB_T[tw]))
            capt = hp - OUTSTANDING; loan = min(.75 * Q, max(0, Q + bsd(Q) - capt)); need = pay(loan) / .55
            ok = True if capt >= dn else 'part' if capt >= .85 * dn else False
            pools.append([f"HDB {f} upgraders ({' / '.join(c['towns'])})", ok, f"Selling a {f} flat (median about {fmt_q(round(hp, -3))}) leaves about {fmt_q(round(capt, -3))} after an illustrative $150k loan" + (f": enough for the {fmt_q(round(dn, -3))} down payment and stamp duty" if ok is True else f": close to the {fmt_q(round(dn, -3))} down payment and stamp duty, with some savings or CPF" if ok else f": short of the {fmt_q(round(dn, -3))} down payment and stamp duty") + f". The loan then needs a household income of about {fmt_money(round(need, -2))} a month ({need / inc_now[ik]:.1f} times the {f} average of {fmt_money(inc_now[ik])})."])
        lp = prof['landed5'] >= 100
        pools.append(['Landed owners right-sizing', lp, (f"{prof['landed5']:,} landed homes sold within 1.5 km in 5 years (median about {fmt_q(prof['landed_med'])} in the past year): a large pool of owners who can right-size with cash." if lp else f"Only {prof['landed5']:,} landed sales within 1.5 km in 5 years: few landed owners nearby.")])
        eq = .6 * ref3 if ref3 else None   # equity of a nearby 3-bed owner after an illustrative 40% still owed
        cp = prof['resale12'] >= 30 and (eq is None or eq >= dn)
        pools.append(['Condo owners nearby moving or upgrading', cp, f"{prof['resale12']:,} condo resales within 1 km in the past year" + (f"; selling a nearby 3-bed (about {fmt_q(round(ref3, -3))}) leaves about {fmt_q(round(eq, -3))} after an illustrative 40% still owed, " + ('enough for' if cp else 'short of') + f" the {fmt_q(round(dn, -3))} down payment and stamp duty" if ref3 else '') + '.'])
        if t in ('1-bed', '2-bed'):
            pools.append(['Investors and tenants', None, 'Rental demand: ' + (f"{prof['rent_ratio']:.1f} times the islandwide rate of rental contracts per home within 1 km." if prof['rent_ratio'] is not None else 'not enough rental records nearby.')])
        k = sum(1 if p[1] is True else .5 if p[1] == 'part' else 0 for p in pools)
        x['pools'] = pools; x['dn'] = dn
        x['rating'] = 'Wide' if k >= 3 else 'Good' if k >= 2 else 'Narrow' if k >= 1 else 'Very thin'
        beds = int(t[0]) if t[0].isdigit() else 0
        if prof['kind'] == 'Rental and investment area': x['fit'] = 'Most wanted here (investors and tenants)' if beds <= 2 else 'Own-stay size in a rental area'
        else: x['fit'] = ('Most wanted size for own stay' if beds in (3, 4) else 'Mainly an investor or small-family size' if beds <= 2 else 'Niche: large families')
        if beds == 3 and x['size'] < OWN_MIN_SQFT * .95 and prof['kind'] != 'Rental and investment area': x['fit'] += f"; compact for a family (under about {OWN_MIN_SQFT:,} sq ft)"
        if x['rating'] == 'Very thin': x['v'] = f"{x['v'].replace(' psf', '')} (own stay only)"
    risky = [t for t, x in units.items() if x['rating'] in ('Narrow', 'Very thin')]
    walkers = [t for t, x in units.items() if x['rating'] == 'Very thin']
    mopl = mop_pipeline(c['towns'], sale_y)
    pv = 'Buy' if mid <= buy else f'Buy only below {fmt_money(walk)} psf' if mid <= walk else f'Walk away above {fmt_money(walk)} psf'
    keep = [t for t in units if t not in walkers]
    main = pv
    near1 = [x for x in comps if x['dist'] <= 1000]
    comp_names = ', '.join(x['name'] for x in comps)
    if pv == 'Buy':
        line = f"Buy. A {tm} here at about {RNG} psf is at or below what the closest competitors' {tm}-size resales support (about {fmt_money(buy)} psf as a new launch)."
    elif pv.startswith('Buy only'):
        line = f"Buy only below {fmt_money(walk)} psf. A {tm} here at about {RNG} psf is a little above what the closest competitors' {tm}-size resales support (about {fmt_money(buy)} psf as a new launch){', so aim for the lower end' if lo != hi else ', so negotiate or choose a cheaper stack'}."
    else:
        line = f"Walk away above {fmt_money(walk)} psf. A {tm} here at about {RNG} psf is {(mid / buy - 1) * 100:.0f}% above what the closest competitors' {tm}-size resales support (about {fmt_money(buy)} psf as a new launch). Buy only at or below about {fmt_money(buy)} psf."
    fam = [t for t, x in units.items() if x['fit'].startswith('Most wanted')]
    if fam: line += f" {' and '.join(fam)} {'is' if len(fam) == 1 else 'are'} the most wanted size{'s' if len(fam) > 1 else ''} in this {prof['kind'].lower()}."
    if walkers: line += f" The {' and '.join(walkers)} {'has' if len(walkers) == 1 else 'have'} a very thin resale pool: buy only to live in."
    reasons = [
        f"The closest competitors ({comp_names}) work out to about {fmt_money(buy)} psf as a brand-new launch, after adding 5% where they were not built under the harmonised floor-area rules, {prem_why}{', and 10% for this project being integrated' if c['integrated'] else ''}." + (" A launch nearby from the last 2 years counts for half: it is the most direct evidence of what new homes here cost today." if any(x['kind'] != 'Resale' and x['dist'] <= 2000 for x in comps) and any(x['kind'] == 'Resale' for x in comps) else ''),
        f"Bought at the {EXP} {fmt_money(round(mid))} psf, the base case makes about {pct(u['gm']['base'])} after stamp duty and selling costs by {c['buy_year'] + int(n)} ({yr(u['gm']['base'])}); bought at {fmt_money(buy)} psf it makes about {pct(u['tab']['buy']['base'])}.",
        f"Who can buy a {tm} from you (tested at today's {fmt_q(round(mid * u['size'], -3))}; about {fmt_q(round(u['xq'], -3))} by {sale_y} in the base case): " + '; '.join(f"{p[0].split(' (')[0]} {'yes' if p[1] is True else 'with some savings' if p[1] == 'part' else 'no' if p[1] is False else 'see rents'}" for p in u['pools']) + f". Resale pool: {u['rating'].lower()}."]
    if c.get('ec'):
        r = .04 / 12; cap = .30 * 16000 * (1 - (1 + r) ** -360) / r   # largest loan at the income ceiling under the 30% MSR, 4% test rate
        reasons.append(f"At launch, a household at the $16,000 income ceiling can borrow at most about {fmt_q(round(cap, -4))} under the 30% mortgage servicing ratio, so a {tm} at {fmt_money(round(mid))} psf ({fmt_q(round(mid * u['size'], -3))}) needs about {fmt_q(round(mid * u['size'] - cap + bsd(mid * u['size']), -4))} in cash and CPF, including stamp duty.")
    reasons.insert(1, tx_line)
    if hi_up and c.get('land') and hi_up[2] > c['land'] * 1.1:
        reasons.insert(2, f"The newest land bid nearby, {hi_up[0]} ({hi_up[1]:,} m, {fmt_money(hi_up[2])} psf ppr), is {(hi_up[2] / c['land'] - 1) * 100:.0f}% above this site's land cost. It breaks even at about {fmt_money(hi_up[5])} psf, and " + (f"analysts expect it to launch at {hi_up[7]}." if hi_up[10] == 'analysts' else f"is likely to launch at about {fmt_money(hi_up[8])} psf (break-even plus the {MARGIN['avg'] * 100:.0f}% that launches since 2023 priced above theirs)."))
    elif hi_up and hi_up[8] > mid:
        reasons.insert(2, f"The {hi_up[0]} site nearby ({hi_up[1]:,} m, land {fmt_money(hi_up[2])} psf ppr) is likely to launch at about {fmt_money(hi_up[8])}" + (f" to {fmt_money(hi_up[9])}" if hi_up[9] != hi_up[8] else '') + " psf: more than this project's price.")
    entry_score = (7 if mid <= buy else 6 if mid <= walk else 4 if mid <= buy * 1.15 else 3) + (1 if hi_up and mid <= hi_up[8] else 0)
    exit_score = {'Wide': 8, 'Good': 7, 'Narrow': 5, 'Very thin': 3}[u['rating']] - (1 if c.get('heavy_supply') else 0)
    score = []
    for nm, s, ev in c['score']:
        if ev == 'entry':
            gp = lambda v: f'{(v / buy - 1) * 100:+.0f}'.replace('-', '−') + '%'
            score.append([nm, entry_score, f"A {tm} here at about {RNG} psf against about {fmt_money(buy)} psf from the closest competitors' {tm}-size resales ({gp(lo) if lo == hi else gp(lo) + ' to ' + gp(hi)})."])
        elif ev == 'exit': score.append([nm, exit_score, f"The {tm} has a {u['rating'].lower()} resale pool in this {prof['kind'].lower()} ({sum(1 for p in u['pools'] if p[1] is True)} buyer groups can fund the down payment today)" + ('; heavy competing supply at the exit.' if c.get('heavy_supply') else '; little competing private supply nearby.')])
        else: score.append([nm, s, ev])
    # ---------- presentation helpers (26 Nov 2026 redesign): key points, recommendation, price gauge, timeline, $ profit ----------
    tone_pv = 'good' if pv == 'Buy' else 'warn' if pv.startswith('Buy only') else 'bad'
    points = []
    for r in reasons:
        if r.startswith('The closest competitors'): points.append(['🏘️', 'What the closest competitors support', tone_pv, r])
        elif r == tx_line: points.append(['🧾', 'Latest transactions nearby', 'info', r])
        elif 'land bid' in r or 'just to cover costs' in r: points.append(['🏗️', 'Land bids nearby', 'good' if hi_up and hi_up[8] >= mid else 'info', r])
        elif r.startswith('Bought at'): points.append(['📈', 'Potential gain', 'good' if u['gm']['base'] > 0.1 else 'warn' if u['gm']['base'] > 0 else 'bad', r])
        elif r.startswith('Who can buy a'): points.append(['👥', 'Who can buy it from you later', {'Wide': 'good', 'Good': 'good', 'Narrow': 'warn', 'Very thin': 'bad'}[u['rating']], r])
        elif r.startswith('At launch, a household'): points.append(['💳', 'Cash needed under EC loan rules', 'warn', r])
        else: points.append(['📌', 'Also note', 'info', r])
    good_units = [t for t in units if t not in walkers]
    best = next((t for t in ('3-bed', '2-bed', '4-bed') if t in good_units), good_units[0] if good_units else tm)
    bu = units[best]
    pf = lambda e, x, k='base': x['ex'][k] * x['size'] * (1 - SELL) - (e * x['size'] + bsd(e * x['size']) + LEGAL)
    rec = [['🎯', 'Target', f"{' or '.join(good_units) if good_units else best} at or below {fmt_money(buy)} psf; a {best} of about {bu['size']:,} sq ft is about {fmt_q(round(buy * bu['size'], -3))}."],
           ['🛑', 'Walk away', f"Above {fmt_money(walk)} psf (a {best} above about {fmt_q(round(walk * bu['size'], -3))})." + f" The {EXP} {RNG} psf is {'within' if hi <= walk else 'partly above' if lo <= walk else 'above'} that."]]
    if walkers: rec.append(['🚫', 'Own stay only', f"The {(', '.join(walkers[:-1]) + ' and ' + walkers[-1]) if len(walkers) > 1 else walkers[0]}: few buyer groups could fund it today, so buy it only to live in long term."])
    if fam: rec.insert(1, ['🛏️', 'Best size here', f"{' and '.join(fam)}: this is an {prof['kind'].lower()}" + (", and family sizes sell fastest (Thomson Reserve's 3- and 4-bedders sold out at launch; its 2-bedders were the slowest)." if prof['kind'] != 'Rental and investment area' else ', where smaller units suit investors and tenants.')])
    rec.append(['⏳', 'Hold', f"Plan to keep it until about {c['buy_year'] + int(n)} ({n:g} years)" + (": the 5-year minimum occupation period applies." if c.get('ec') else ": Seller's Stamp Duty applies if you sell within 4 years.")])
    if ref: rec.append(['🔍', 'Before you book', f"Compare your unit's psf with {ref['name']} ({fmt_money(ref['psf'])} psf, {ref['basis']}) and ask for the price of each stack; a higher floor or better facing should not push you past {fmt_money(walk)} psf."])
    if hi_up: rec.append(['🏗️', 'Watch', f"The {hi_up[0]} launch nearby: likely at about {fmt_money(hi_up[8])}" + (f" to {fmt_money(hi_up[9])}" if hi_up[9] != hi_up[8] else '') + f" psf ({'analysts' if hi_up[10] == 'analysts' else 'our estimate'}). It sets the next price benchmark for this area."])
    gauge = {'tm': tm, 'lo': lo, 'hi': hi, 'buy': buy, 'walk': walk, 'floor': (floor[0] if floor and not c.get('selling') else None), 'next': [hi_up[0], hi_up[8], hi_up[9], 'analysts' if hi_up[10] == 'analysts' else 'estimate'] if hi_up else None,
             'ref': [ref['name'] + f" ({tm} size)", round(rm['psf']) if rm else round(ref['psf'])] if ref else None, 'exp': EXP}
    sale_y = c['buy_year'] + int(n)
    steps = [['🛒', f"Buy {c['buy_year']}", 'At the ' + EXP + ' price'],
             (['🔓', f"MOP ends about {sale_y}", '5 years after TOP'] if c.get('ec') else ['🔓', f"Stamp duty ends {c['buy_year'] + 4}", "Seller's Stamp Duty: 4 years"]),
             ['💰', f"Sell about {sale_y}", f"Base case {fmt_money(round(ex['base']))} psf"]]
    profit = {t: {k: round(pf(x['P']['mid'], x, k), -3) for k in g} for t, x in units.items()}
    profit_buy = {t: round(pf(x['P']['buy'], x), -3) for t, x in units.items()}
    profit = {'exp': profit, 'buy': profit_buy, 'main': best}
    # ---------- supply and land prices: should buyers worry? (Jack, 26 Nov 2026) ----------
    ring = RING(me); ly = (c.get('launch_year') or c['buy_year'])
    newp = []
    for p_ in ALLP:
        g_ = GEO.get(_slug(p_['name']))
        if not g_ or 'lat' not in g_ or _nm(p_['name']) == _nm(c['name']) or _slug(p_['name']) in (c['geo_key'], *c.get('self_slugs', ())) or p_['launchSort'] < 202301: continue
        d_ = _km(me, g_) * 1000
        if d_ <= 2000: newp.append([p_['name'], round(d_), p_['units'], p_['launchSort'] // 100, 'Launched' if p_['psf'] and p_['launchSort'] <= 202611 else 'Coming', p_['psf'], p_['launchSort']])
    newp.sort(key=lambda r: r[1])
    lm = lambda ls: (ls // 100) * 12 + ls % 100
    my_ls = c.get('launch_sort') or next((p_['launchSort'] for p_ in ALLP if _slug(p_['name']) in (c['geo_key'], *c.get('self_slugs', ())) or _nm(p_['name']) == _nm(c['name'])), ly * 100 + 6)
    same = [r for r in newp if abs(lm(r[6]) - lm(my_ls)) <= 30 and r[2]]   # launches within about 2.5 years: they complete within about 2 years of each other
    cl_homes = sum(r[2] for r in same)   # other new homes completing within about 2 years of this one (launch years as a proxy)
    depth = sum(v['m12'][1] for v in COMP['p'].values() if not v['ec'] == (not c.get('ec')) and _km(me, v) <= 2)
    cs = CLUSTER.get(ring)
    drag = (cs['low'] - cs['high']) if cs else 0
    risk = 'High' if cs and cl_homes > 1.5 * max(cs['med'], 400) and drag > 0.5 else 'Moderate' if cs and cl_homes > max(cs['med'], 400) else 'Low'
    sup_ans = (f"Besides this project's own {c['homes']:,} homes, " + (f"about {cl_homes:,} new homes within 2 km launch within about 2 years of it ({', '.join(r[0] for r in same[:4])})" if same else "no other new homes within 2 km launch within about 2 years of it") + f"; the condo resale market within 2 km handles about {depth:,} resales a year. "
               + (f"Our test of {cs['n']} condos completed 2016 to 2022 in the {RING_NAME[ring]}: those with more than {cs['med']:,} other new homes completing within 2 km and 2 years grew {cs['high']:.1f}% a year over the past 4 years, against {cs['low']:.1f}% for those with fewer (URA caveats). " if cs else '')
               + {'High': 'That points to a real drag on resale prices around completion: plan to hold longer, and pick the unit types and stacks that stand out.',
                  'Moderate': 'Expect some competition when units complete together, mainly on rents and resale speed, but no collapse: the local buyer pool is deep.',
                  'Low': 'Supply nearby is not a big concern here.'}[risk])
    lr = sorted(land_rows + LAND_EXTRA.get(pid, []), key=lambda r: r[1])
    if c.get('land'): lr = lr + [[c['name'] + ' (this project)', 0, c['land'], '', 'This project', be(c['land']), None, f"{tm} at about {fmt_money(round(mid))} psf ({EXP})", 0, 0, '']]
    prior = [r for r in lr if r[4] == 'Launched' and r[6]]
    land_ans = ''
    if c.get('land') and prior:
        pr = max(prior, key=lambda r: r[2])
        pa = next((p_ for p_ in ALLP if _nm(p_['name']).startswith(_nm(pr[0].split(' (')[0])[:10])), None)
        tq = _q(pa['launchSort']) if pa else NOW_Q; mkt = IDX[NOW_Q] / IDX.get(tq, IDX[NOW_Q]) - 1
        dl, db, dp = c['land'] / pr[2] - 1, be(c['land']) / pr[5] - 1, mid / pr[6] - 1
        rr = (1 + dp) / (1 + mkt) - 1
        real_txt = 'about the same as its buyers did' if abs(rr) < 0.01 else f"about {abs(rr) * 100:.0f}% {'more' if rr > 0 else 'less'} than its buyers did"
        land_ans = (f"This site's land ({fmt_money(c['land'])} psf ppr) cost {pc0(dl)} more than {pr[0]}'s ({fmt_money(pr[2])}), which lifts the developer's break-even by about {pc0(db)}. "
                    f"A {tm} here at about {fmt_money(round(mid))} psf is {pc0(dp)} above {pr[0]}'s {fmt_money(pr[6])} launch average; private prices have risen about {pc0(mkt)} since then (URA index), so in today's money you pay {real_txt}, "
                    + ("while the developer's costs rose more: the developer absorbs most of the higher land bid. " if (1 + dp) / (1 + mkt) - 1 < db else "about as much as the developer's higher costs: the land bid is being passed on. "))
    land_ans += (f"Across {PASS['n']} launches since 2023, launch prices rose roughly dollar for dollar with break-even (about ${PASS['pass_'] * 100:.0f} per $100), so developers kept a similar dollar margin while their percentage margin shrank "
                 f"({PASS['hi'][1] * 100:.0f}% above break-even on land of $1,200 psf ppr or more, {PASS['lo'][1] * 100:.0f}% on cheaper land). Part of that is location: dearer land is usually where homes sell for more anyway. "
                 f"So a high bid does show up in prices, but only as far as buyers will pay against nearby homes. The test that protects you is the price against same-size competitors: our buy-at and walk-away prices.")
    clock = ''
    adate = re.search(r'(20\d\d)', str(c.get('land_src', '')) + ' ' + ' '.join(str(f_[4]) for f_ in c.get('facts', []) if 'Land' in f_[0]))
    if c.get('selling') and c.get('absorb'):
        u_, sp_, mo_ = c['absorb']
        clock = (f"{sp_}% sold so far. Developers must sell every unit within 5 years of buying the land or repay most of a 40% stamp duty (IRAS); "
                 + ("with most units sold, there is little pressure to cut prices." if sp_ >= 80 else "with many units left, late discounts or deals on slower stacks are possible as the deadline nears, but the best stacks rarely get cheaper."))
    else:
        clock = "Developers must sell every unit within 5 years of buying the land or repay most of a 40% stamp duty (IRAS). That pushes them to price to sell at launch; slow sellers sometimes offer deals near the deadline, but the best stacks rarely get cheaper."
    nxt_ans = ((f"The next launch nearby, {hi_up[0]}, is likely at about {fmt_money(hi_up[8])}" + (f" to {fmt_money(hi_up[9])}" if hi_up[9] != hi_up[8] else '') + f" psf, {'above' if hi_up[8] > mid else 'close to' if hi_up[9] >= mid * .97 else 'below'} this project's {tm}. "
                + ("Waiting for it is unlikely to get you a cheaper new home here, and a dearer neighbour helps support this project's resale price." if hi_up[8] >= mid else "A cheaper neighbour later could cap this project's resale price; compare both before committing."))
               if hi_up else "No other land site nearby is waiting to launch, so there is no newer, cheaper launch to wait for here.")
    pipe_ans = (f"Islandwide, about {sum(y[1] for y in PIPE['by_year'] if y[0] in (2027, 2028)):,} private homes complete in 2027 and 2028 and {PIPE['unsold']:,} homes in the pipeline were still unsold at mid-2026 (URA). "
                "That is enough to keep price growth moderate, but local supply and the local buyer pool matter more for your resale.")
    concerns = [['🏙️', 'Will too many new condos nearby hurt my price?', risk, sup_ans],
                ['💸', 'The developer paid more for the land. Am I paying more?', 'Low' if mid <= buy else 'Moderate' if mid <= walk else 'High', land_ans],
                ['🏷️', 'Will the developer cut prices later?', 'Low' if (c.get('absorb') and c['absorb'][1] >= 80) else 'Moderate', clock],
                ['⏳', 'Should I wait for the next launch nearby?', 'Low' if (not hi_up or hi_up[8] >= mid) else 'Moderate', nxt_ans],
                ['🇸🇬', 'What about supply across Singapore?', 'Moderate', pipe_ans]]
    extra_sup = SUPPLY_EXTRA.get(pid, [])
    if extra_sup: sup_ans += ' ' + ' '.join(f"Possible extra supply: {e[0]} (about {e[1]:,} homes), {e[2]}." for e in extra_sup)
    supply = {'risk': risk, 'ring': RING_NAME[ring], 'homes': cl_homes, 'depth': depth, 'projects': newp[:8], 'ladder': [r[:7] + [r[11] if len(r) > 11 else (r[7] if r[4] == 'This project' else '')] for r in lr], 'concerns': concerns,
              'pipe': PIPE['by_year'],
              'line': (f"Supply risk here: {risk.lower()}. " + ("You are not paying for the developer's land bid: you pay what same-size competitors support. " if mid <= walk else "The price is above what same-size competitors support, whatever the land cost. ")
                       + ("No cheaper new launch is coming nearby." if (not hi_up or hi_up[8] >= mid) else "A cheaper new launch may come nearby."))}
    EXS['pipe'] = PIPE['src']; EXS['absd_dev'] = ABSD_SRC
    points.append(['🏙️', 'Supply and land prices', {'Low': 'good', 'Moderate': 'warn', 'High': 'bad'}[risk], supply['line'] + ' ' + concerns[0][3].split('. ')[0] + '.'])
    # ---------- floor plans compared (Jack, 26 Nov 2026): this project's main layout per bedroom type against the competitors' ----------
    selfk = next((k for k in (pid, c['geo_key'], *c.get('self_slugs', ())) if k in FPD), None)
    fpk = lambda n: next((k for k in (_slug(n), re.sub(r'^the-', '', _slug(n)), 'the-' + _slug(n)) if k in FPD), None)   # 'The Panorama' is stored as 'panorama'
    ck = [(fpk(x['name']), x) for x in comps if fpk(x['name']) and fpk(x['name']) != selfk]
    if len(ck) < 3:
        extra = sorted(((k, _km(me, g) * 1000) for k, g in PLANGEO.items() if k != selfk and k not in [a for a, _ in ck]), key=lambda t: t[1])
        ck += [(k, {'name': next((x['name'] for x in comps if _slug(x['name']) == k), k.replace('-', ' ').title()), 'dist': round(d), 'key': None}) for k, d in extra if d <= 3000][:3 - len(ck)]
    fpl = {'types': [], 'rows': {}}
    for t, sz in sizes.items():
        if not t[0].isdigit(): continue
        bd = int(t[0]); rows = []
        me_p = plan_facts(selfk, bd) if selfk else None
        if me_p: rows.append(dict(me_p, name=c['name'], self=True, dist=0, psf=round(per[t]['mid'])))
        for k, x in ck:
            fp_ = plan_facts(k, bd)
            if not fp_: continue
            m = matched(x.get('key'), fp_['sqft']) if x.get('key') and fp_['sqft'] else None
            lp = layout_psf(k, bd)
            rows.append(dict(fp_, name=x['name'], self=False, dist=x['dist'], psf=round(m['psf']) if m else round(lp['psf']) if lp else None))
        if len(rows) >= 2 or (rows and rows[0]['self']):
            fpl['types'].append(t); fpl['rows'][t] = rows
    fpl['note'] = ("Main layout per bedroom type (most units where counts are published), redrawn from the developers' plans in the Stacked Homes directory. "
                   "Score out of 10, same rules for every plan: start at 4; +1 regular shape, dumbbell, kitchen that can be closed off, kitchen or yard window, AC ledge and planter under 5%, store or shelter or utility room; "
                   "−1 long corridor, ledge and planter 10% or more, balcony over 12%. Efficiency = the share of the area not taken by AC ledges, planters, bay windows and corridors. "
                   "Plans under the 2023 rules exclude AC ledges from the strata area, so their sq ft is all usable.")
    S = dict(SRC_BASE); S.update(c['src_extra']); S.update(EXS)
    S['urarent'] = ['URA private residential rental contracts (Data Service), ' + COMP['rentQ'], 'https://eservice.ura.gov.sg/maps/?service=PRR']
    S['edgeprop_be'] = ["EdgeProp land-sale pages: estimated break-even price for each government land site", 'https://www.edgeprop.sg/property-news/833-1312-psf-ppr-what-has-been-driving-decade-rising-gls-land-prices']
    S.update({'tr_sales': ['99.co, Thomson Reserve launch sales: three- and four-bedroom homes sell out, Nov 2026', 'https://www.99.co/singapore/insider/thomson-reserve-launch-sales/'],
              'tr_left': ['Stacked Homes, Thomson Reserve sold 1,143 units (2-bedders left), Nov 2026', 'https://stackedhomes.com/thomson-reserve-sold-1143-units/'],
              'era_apr26': ['ERA, April 2026 developer sales: popular 3-bedroom layouts sold out at launch', 'https://www.era.com.sg/research-articles/april-2026-monthly-developer-sales'],
              'singstat_inc': ['SingStat via data.gov.sg, household employment income by type of dwelling, 2025', 'https://data.gov.sg/datasets/d_ce5d8bb5c34f6b78b5b2f1fab09ccbce/view'],
              'hdb_rpi': ['HDB Resale Price Index, data.gov.sg (Q3 2026)', 'https://data.gov.sg/datasets/d_14f63e595975691e7c24a27ae4c07c79/view'],
              'hdb_info': ['HDB Property Information (year completed, flats by type), data.gov.sg', 'https://data.gov.sg/datasets/d_17f5382f26140b1fdae0ba2ef6239d2f/view'],
              'iras_absd': ['IRAS, stamp duty remissions and reliefs (ABSD refund when the first home is sold within 6 months)', 'https://www.iras.gov.sg/taxes/stamp-duty/for-property/appeals-refunds-reliefs-and-remissions/common-stamp-duty-remissions-and-reliefs-for-property']})
    S['caveats'] = ['URA private residential transactions (caveats), Nov 2025 to Oct 2026; 4-year change from Nov 2021 to Oct 2022', f"/condo-analysis/{c['file_slug']}/#near"]
    std = {
     'v': 2, 'asOf': AS_OF, 'confidence': c['confidence'],
     'confNote': c.get('conf_note') or f"No developer price list yet. Price range: {c['expected_note']} {c['sizes_note']} The verdict will be re-checked the day prices are released.",
     'strip': [['Verdict', main if len(main) < 34 else main.replace(' psf', ''), prof['kind'] + ': ' + ', '.join(f"{t} {x['fit'].split(';')[0].lower()}" for t, x in units.items())],
               ['Buy at or below', f"{fmt_money(buy)} psf", f"{tm} about {fmt_q(round(buy * u['size'], -3))}" + (f". Below the developer's break-even of about {fmt_money(floor[0])}, so a launch this low is unlikely" if buy < FLOOR0 else '')],
               ['Walk away above', f"{fmt_money(walk)} psf", f"{tm} about {fmt_q(round(walk * u['size'], -3))}. This project's {tm}: about {RNG}"],
               ['Potential gain', pct(u['gm']['base']), f"Base case after costs by {c['buy_year'] + int(n)}, bought at {fmt_money(round(mid))} psf ({yr(u['gm']['base'])}). Bear {pct(u['gm']['bear'])}, bull {pct(u['gm']['bull'])}"]],
     'verdict': {'line': line, 'reasons': reasons,
                 'suits': f"Buyers who can buy at or below about {fmt_money(walk)} psf and plan to live here for 5 years or more. {_first_sentence(c['who'])}.",
                 'skip': ('Buyers who would have to pay above the walk-away price, or who may need to sell before the 5-year minimum occupation period ends.' if c.get('ec') else 'Buyers who would have to pay above the walk-away price, or sell within the 4-year Seller\'s Stamp Duty period.'),
                 'change': [(f"If the developer prices a {tm} at or below about {fmt_money(buy)} psf, it is in line with its closest competitors." if c.get('selling') else f"If the {tm} launches at or below about {fmt_money(buy)} psf, it is priced in line with its closest competitors."),
                            'If a closer or newer competitor launches or resells at a different price, the buy-at and walk-away prices move with it.',
                            *([f"If the {hi_up[0]} site launches at its likely {fmt_money(hi_up[8])}+ psf, this price will look cheaper next to it."] if hi_up else []),
                            'If official unit sizes are smaller than assumed, quanta fall and more local upgraders can afford the resale price.']},
     'types': [[f"{t} (about {x['size']:,} sq ft)", x['v'], f"{fmt_money(x['P']['buy'])} psf ({fmt_q(round(x['P']['buy'] * x['size'], -3))})", f"{fmt_money(x['P']['walk'])} psf ({fmt_q(round(x['P']['walk'] * x['size'], -3))})",
                f"At about {fmt_money(round(x['P']['mid']))} psf: about {pct(x['gm']['base'])} by {c['buy_year'] + int(n)}. Resale about {fmt_q(round(x['xq'], -3))} in {sale_y}: {x['rating'].lower()} resale pool. {x['fit']}." + (f" At launch, a 75% loan needs about {fmt_money(round(x['msr'], -2))} a month under the 30% mortgage limit" + (" (above the $16,000 income ceiling)." if x['msr'] > 16000 else " (ceiling $16,000).") if c.get('ec') else '')] for t, x in units.items()],
     'typesMid': {t: round(x['P']['mid']) for t, x in units.items()},
     'priceA': c['priceA_none'] if floor is None else [['Land', f"{fmt_money(land)} psf ppr", 'C', None, c['land_src'] + '. psf ppr = land price per square foot of floor area the site may build.'],
                ['Building, finance, fees and other costs', f"about {fmt_money(floor[0] - land)} psf", 'E', 'edgeprop_be', "EdgeProp's break-even method: about 1.36 times the land price plus $459 psf (it matches all 29 EdgeProp break-evens in our data)."],
                ['Developer break-even', f"about {fmt_money(floor[0])} psf", 'E', 'edgeprop_be', 'The price at which the developer only covers its costs. A launch below this is unlikely.'],
                ['Likely launch, from cost', f"about {fmt_money(floor[1])} psf", 'E', None, f"Launches since 2023 priced on average {MARGIN['avg'] * 100:.0f}% above their break-even (range {MARGIN['lo'] * 100:.0f}% to {MARGIN['hi'] * 100:.0f}%, {MARGIN['n']} launches)."]],
     'comps': [[x['name'], x['dist'], x['units'], x['tenure'], x['top'] or '–', x['kind'], round(x['psf']), x.get('time'), x['adj_h'], x['adj_n'], x['adj_i'], round(x['equiv']), x['g'], x.get('basis'), bool(x.get('twin'))] for x in comps],
     'compsNote': (f"{len(near1)} of the {len(comps)} competitors are within 1 km. " if near1 else 'No suitable competitor within 1 km, so the nearest within 2 to 3 km are used. ')
                  + ("Only executive condos are compared (an EC sells below private condos because of its buyer rules). " if c.get('ec') else '')
                  + "Near-twins come first: up to two condos within 1.5 km with a similar number of homes (half to double) completed in 2016 or later. Then every suitable condo within 1 km (same tenure, completed 2011 or later first), widening to 2 km and 3 km only if fewer than 3"
                  + (". Resale ECs past their 5-year minimum occupation period sell to any Singaporean or PR" if c.get('ec') else '; executive condos are left out')
                  + ". Resale prices are URA medians for the last 6 months where there were at least 5 resales, otherwise the last 12 months. Condos launched before June 2023 measured their areas under the old rules (including air-con ledges), so their psf is raised 5% to compare like for like.",
     'prem': {'txt': prem_txt, 'rk': pinfo['rk'], 'a0': round(pinfo['a0'], 3), 'b': round(pinfo['b'], 4), 'n': pinfo['launches'], 'pairs': pinfo['pairs']},
     'priceDecide': f"Like for like by size: for each unit type we take each resale competitor's average psf for units within about 15% of that size (last 6 months, or 12 or 24 if too few). Where a competitor has too few resales of a size, that size is estimated from its own nearest size, so every unit type is judged against the same competitors. Each is raised by {prem_why}. Buy at or below = the average of the competitors' new-launch equivalents for that size (a launch nearby from the last 2 years counts for half); walk away above = 5% more. " + '; '.join(f"{t}: buy at or below {fmt_money(per[t]['buy'])}, walk away above {fmt_money(per[t]['walk'])}, this project about {fmt_money(round(per[t]['mid']))} psf" for t in sizes) + ". " + ("This project's price by unit type is from the developer's caveats. " if any(per[t]['how'] == 'caveats' for t in sizes) else "This project's price by unit type follows the developer's launch 'from' prices. " if any(per[t]['how'] == 'from' for t in sizes) else f"This project's price by unit type follows how psf changes with size in launches selling now (developers' caveats, {BETA_NL_N} launches): it changes little, about {(2 ** BETA_NL - 1) * 100:+.0f}% per sq ft for a unit twice the size. ") + ("No developer floor can be worked out: the developers already owned the land." if floor is None else f"The developer breaks even at about {fmt_money(floor[0])} psf (EdgeProp's method); launches since 2023 priced on average {MARGIN['avg'] * 100:.0f}% above break-even, which points to about {fmt_money(floor[1])} psf" + (', so expect the launch above our buy-at price.' if buy < floor[0] else '.')),
     'gain': {'timeline': c['timeline'],
              'costs': ("No Seller's Stamp Duty: the sale is after the 5-year minimum occupation period. " if c.get('ec') else '') + "Potential gain is after Buyer's Stamp Duty at IRAS rates, about $6,000 legal fees and a 2% agent fee plus 9% GST when you sell. Loan interest, property tax, maintenance and rent are not included.",
              'scen': [['Bear', f"{g['bear']*100:.1f}% a year", ('The competitors\' own fall over the past 4 years carries on' if base_raw < 0 else 'Half the base case') + ': competing supply at the exit, or a softer market.'],
                       ['Base', f"{g['base']*100:.1f}% a year", ("No condo nearby has a suitable record (a 3-bed price change over 4 years with at least 10 resales in the past year), so we use URA's islandwide non-landed index: 4.7% a year from Q3 2016 to Q3 2026." if growth_only == ['index'] else "The average yearly 3-bed price change over the past 4 years (URA caveats) of the competitors with a suitable record (at least 10 resales in the past year)" + (f", widened to the nearest suitable condos: {', '.join(growth_only)}" if growth_only and growth_only != ['index'] else '') + ': ' + ', '.join(f"{n} {v:.1f}%" for n, v in gsrc) + '. That period included the 2022–2023 rise.' + cap_note)],
                       ['Bull', f"{g['bull']*100:.1f}% a year", bull_why]],
              'rows': [[t, lab, fmt_money(round(e)), pct(x['tab'][k]['bear']), pct(x['tab'][k]['base']), pct(x['tab'][k]['bull']), yr(x['tab'][k]['base'])]
                       for t, x in units.items() for k, lab, e in (('buy', 'Buy-at', x['P']['buy']), ('exp', EXP.capitalize(), x['P']['mid']), ('walk', 'Walk-away', x['P']['walk']))],
              'years': n},
     'district': {'summary': c['district_summary'], 'rows': [([r[0], next((ch[1] + ' at this price. ' + ch[2] for ch in checks if ch[0] == 'Rental yield at this price'), r[1]), 'C', 'caveats'] if r[0] == 'Rents' and 'Not available yet' in r[1] and any(ch[0] == 'Rental yield at this price' for ch in checks) else r) for r in c['district']], 'line': c['district_line']},
     'exit': {'who': c['who'],
              'profile': {'kind': prof['kind'], 'rows': [['🏘️', 'Rental demand within 1 km', (f"{prof['rent_ratio']:.1f}× the islandwide rate" if prof['rent_ratio'] is not None else 'Not enough data'), 'URA rental contracts in the last 4 quarters per home in nearby condos, against the islandwide average. Above 1.25× points to an investor and tenant market.'],
                                                          ['🏡', 'Landed homes nearby', f"{prof['landed5']:,} sales in 5 years", 'Landed sales within 1.5 km (URA caveats): a measure of how many landed owners live nearby who may right-size into a condo.' + (f" Median landed price in the past year: about {fmt_q(prof['landed_med'])}." if prof['landed_med'] else '')],
                                                          ['🏢', 'Nearest office hub', f"{prof['hub'][0]}, about {prof['hub'][1]:.1f} km", 'Straight line. Within about 3 km, rental demand from workers is usually stronger.'],
                                                          ['🏫', 'Primary schools within 1 km', str(prof['schools']), 'OneMap with MOE school list. Families pay for school proximity.'],
                                                          ['🔁', 'Condo resales within 1 km', f"{prof['resale12']:,} in the past year", 'URA caveats: depth of the resale market you will sell into.']]},
              'units': [[t, fmt_q(round(x['P']['mid'] * x['size'], -3)), fmt_q(round(x['dn'], -3)), x['rating'], x['fit'], x['pools'], fmt_q(round(x['xq'], -3))] for t, x in units.items()],
              'mop': [[t, nn] for t, nn in mopl],
              'mopNote': f"HDB 4-room and bigger flats completed from 2021 that reach their 5-year minimum occupation period by about {sale_y}, in the towns resale buyers come from (HDB Property Information, data.gov.sg). New MOP flats add fresh upgraders.",
              'capital': [[f"{t} {f} ({HDB_T[t][f][1]} resales)", fmt_money(HDB_T[t][f][0]), fmt_money(HDB_T[t][f][0] - OUTSTANDING), fmt_money(round(HDB_T[t][f][0] * (1 + BF['hdb_rpi']['cagr10'] / 100) ** yrs - OUTSTANDING, -3))] for t in c['towns'] for f in HDB_T[t]],
              'note': ("At launch an EC bought from the developer is capped by the 30% mortgage servicing ratio (MSR) and a $16,000 household income ceiling; resale buyers after the minimum occupation period face only the 55% TDSR. " if c.get('ec') else '')
                      + f"How we test each buyer group, in today's money (prices, HDB values and incomes tend to rise together): the unit at today's {EXP} price; a 25% down payment plus Buyer's Stamp Duty; HDB upgraders put their flat's sale proceeds in first (median resale price, minus an illustrative $150,000 loan). The group can buy if that capital covers the down payment and stamp duty; the income the remaining 30-year loan needs (tested at 4% under the 55% TDSR) is shown against SingStat's 2025 averages by home type, excluding employer CPF (4-room {fmt_money(inc_now['4-room'])}, 5-room and executive {fmt_money(inc_now['5-room'])}, condo {fmt_money(inc_now['condo'])}). HDB resale prices rose {BF['hdb_rpi']['cagr10']:.1f}% a year over the past 10 years, so upgraders' capital usually grows too. "
                      + "Singaporean HDB owners who buy before selling pay 20% Additional Buyer's Stamp Duty upfront and get it back only if they sell the flat within 6 months (IRAS).",
              'line': (f"In this {prof['kind'].lower()}, " + '; '.join(f"the {t} resale pool is {x['rating'].lower()}" for t, x in units.items()) + '.')},
     'plan': plan_rows, 'planLine': plan_line,
     'tx': {'rows': tx, 'line': tx_line, 'm6': COMP['m6'], 'm12': COMP['m12'], 'price': round(mid), 'exp': EXP, 'sz': szt, 'main': tm},
     'land': {'rows': land_rows, 'line': land_line},
     'checks': checks,
     'score': score, 'scoreNote': f"Overall {sum(s[1] for s in score) / len(score):.1f} out of 10. The buy-at and walk-away prices decide the verdict; the scorecard shows how good the place is to live in.",
     'facts': c['facts'], 'pros': c['pros'], 'cons': c['cons'],
     'compare': [[c['name'] + f" ({EXP})", RNG.replace(' to ', '–'), '', '', f"About {pct(u['gm']['base'])} by {c['buy_year'] + int(n)}"]] + c['compare'],
     'faq': [[q, a if a else f"At the {EXP} {RNG} psf, the base case makes about {pct(u['gm']['base'])} by {c['buy_year'] + int(n)} after stamp duty and selling costs ({yr(u['gm']['base'])}). Bought at about {fmt_money(buy)} psf, in line with its closest competitors, it makes about {pct(u['tab']['buy']['base'])}."] for q, a in c['faq_extra']]
            + [[f"What price should I pay for a {tm}?", f"At or below about {fmt_money(buy)} psf, about {fmt_q(round(buy * u['size'], -3))} for {u['size']:,} sq ft, in line with its closest competitors. Walk away above about {fmt_money(walk)} psf ({fmt_q(round(walk * u['size'], -3))}). These are estimates until the developer releases prices."]],
     'points': points, 'rec': rec, 'gauge': gauge, 'steps': steps, 'profit': profit, 'fplans': fpl, 'supply': supply,
     'src': S,
    }
    return std


AS_OF = '25 Nov 2026'
HDB_T = {}
SRC_BASE = {}
