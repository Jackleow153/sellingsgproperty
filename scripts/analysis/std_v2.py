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
IDX = {"2024Q4": 203.4, "2025Q1": 205.4, "2025Q2": 206.8, "2025Q3": 208.5, "2025Q4": 208.1, "2026Q1": 210.8, "2026Q2": 210.6, "2026Q3": 212.7}
NOW_Q = '2026Q3'
HARMONISED_FROM = 202306      # launches from June 2023 follow the harmonised floor-area rules
NEW_PREMIUM, HARMONISE, INTEG, WALK = 0.15, 0.05, 0.10, 0.05
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
                        analyst=(u or {}).get('analyst', '') if not launched else '', floor=round((psf * 1.09 + (420 if psf >= 1600 else 380) + 180) / 0.9 / 10) * 10))
    return out
LAND = _land_sites()

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
        base = sum(x['psf'] * (1 + HARMONISE) * (1 + (INTEG if c['integrated'] and not x['integ'] else 0)) for x in res) / len(res)
        now = l['avgPsf'] * IDX[NOW_Q] / IDX.get(ql, IDX[NOW_Q])
        vals.append((l['name'], now / base - 1, l['region']))
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
        x['new'] = bool(x['top']) and x['top'] >= 2000
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
    for band in (1000, 2000, 3000):
        for test in (lambda x: x['size_ok'] and recent(x), lambda x: recent(x), lambda x: x['size_ok'] and x['new'], lambda x: x['new']):
            for x in sorted([y for y in pool if y['dist'] <= band and y not in pick and test(y)], key=lambda y: y['dist']):
                if len(pick) < 5: pick.append(x)
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


def build(pid, c):
    comps = competitors(c)
    prem_n, prem_cnt, prem_rk = region_premium(c)
    for x in comps:
        if x['kind'] == 'Resale':
            x['adj_n'] = prem_n
            x['equiv'] = x['psf'] * (1 + x['adj_h']) * (1 + x['adj_n']) * (1 + x['adj_i'])
    buy = round(sum(x['equiv'] for x in comps) / len(comps) / 10) * 10
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
    base = round(sum(gs) / len(gs) / 100, 4)
    g = {'bear': base / 2 if base > 0 else base * 1.5, 'base': base, 'bull': base + bull_add}
    n = c['years']
    ex = {k: buy * (1 + v) ** n for k, v in g.items()}
    lo, hi = c['expected']; mid = (lo + hi) / 2
    RNG = fmt_money(lo) if lo == hi else f'{fmt_money(lo)} to {fmt_money(hi)}'
    pc0 = lambda v: (f"{v * 100:+.0f}%").replace('-', '−')
    tx = []
    for x in comps:
        if x['kind'] != 'Resale':
            tx.append([x['name'], x['dist'], None, None, None, None, None, None, None, None, None, x['kind'], round(x['psf']), round(mid - x['psf']), mid / x['psf'] - 1, round(x['equiv']), mid / x['equiv'] - 1, None]); continue
        tx.append([x['name'], x['dist'], *(x['m6'] or [None, 0]), *x['m12'], x['lo6'], x['hi6'], *((x['b3'] or [None, None, 0])[:2]), x['last'], x['basis'], round(x['psf']), round(mid - x['psf']), mid / x['psf'] - 1, round(x['equiv']), mid / x['equiv'] - 1, x['rent'][0] if x['rent'] and x['rent'][1] >= 5 else None])
    ref = next((x for x in comps if x.get('twin') and x['kind'] == 'Resale'), None) or (res[0] if res else None)
    tx_line = (f"{ref['name']} ({ref['dist']:,} m away{', ' + format(ref['units'], ',') + ' homes' if ref['units'] else ''}{', completed ' + str(ref['top']) if ref['top'] else ''}) resold at a median {fmt_money(ref['psf'])} psf in the {ref['basis']} "
               f"({(ref['m6'] if ref['basis'] == 'last 6 months' else ref['m12'])[1]} resales). At {fmt_money(round(mid))} psf this project is {fmt_money(abs(round(mid - ref['psf'])))} psf ({pc0(mid / ref['psf'] - 1)}) {'above' if mid >= ref['psf'] else 'below'} it"
               + (f"; a 3-bed there sold for a median {fmt_q(ref['b3'][1])} ({fmt_money(ref['b3'][0])} psf)." if ref['b3'] else '.')) if ref else 'No resale competitor has enough recent resales.'
    # Market check: premium over the closest resale (after the 5% area adjustment) against launches selling now
    mk_avg, mk_n, mk_reg, mk_vals = market_norm()
    loo = [v for nm, v, r in mk_vals if _nm(nm) != _nm(c['name'])]; mk = sum(loo) / len(loo) if loo else mk_avg
    regk = ('CCR' if 'CCR' in c.get('region', '') else 'RCR' if 'RCR' in c.get('region', '') else 'OCR') if c.get('region') else None
    rl = [v for nm, v, r in mk_vals if regk and regk in r and _nm(nm) != _nm(c['name'])] if regk else []
    base_res = sum(x['psf'] * (1 + HARMONISE) * (1 + (INTEG if c['integrated'] and not x['integ'] else 0)) for x in res) / len(res) if res else None
    prem = mid / base_res - 1 if base_res else None
    # Nearby land bids (2 km) and the cost floor they set for the next launches
    land_rows = []
    for L in LAND:
        if L['slug'] in (c['geo_key'], *c.get('self_slugs', ())) or L['lid'] == pid or _nm(L['name']) == _nm(c['name']): continue
        d = _km(me, L['geo']) * 1000
        if d > 2000: continue
        est = LAND_EST.get(L['name'])
        if est and est[1]: EXS[est[1]] = est[2]
        land_rows.append([L['name'], round(d), L['psf'], L['date'], 'Launched' if L['launched'] else 'Upcoming', L['floor'], L['price'], (est[0] if est else L['analyst']) or ''])
    land_rows.sort(key=lambda r: r[1]); land_rows = land_rows[:6]
    up_land = [r for r in land_rows if r[4] == 'Upcoming']
    hi_up = max(up_land, key=lambda r: r[2]) if up_land else None
    land_line = ''
    if land_rows:
        land_line = f"Land bids within 2 km range from {fmt_money(min(r[2] for r in land_rows))} to {fmt_money(max(r[2] for r in land_rows))} psf ppr" + (f", against {fmt_money(c['land'])} for this site" if c.get('land') else '') + '.'
        if hi_up: land_line += f" The {hi_up[0]} site ({hi_up[1]:,} m, {fmt_money(hi_up[2])} psf ppr{', ' + hi_up[3][0].lower() + hi_up[3][1:] if hi_up[3] else ''}) needs about {fmt_money(hi_up[5])} psf just to cover land and building, so its launch is likely {'above' if hi_up[5] > mid else 'near'} this project's {fmt_money(round(mid))} psf" + (f". Expected: {hi_up[7]}." if hi_up[7] and 'Not' not in hi_up[7] else '.')
    # Other checks
    checks = []
    if prem is not None:
        checks.append(['Premium over closest resale', pc0(prem), f"Against its resale competitors' latest prices (after the 5% area adjustment). Launches selling now averaged {pc0(mk)} over theirs ({len(loo)} launches" + (f"; {pc0(sum(rl) / len(rl))} in the {regk}, {len(rl)} launches" if rl else '') + "). " + ('In line with the market.' if abs(prem - (sum(rl) / len(rl) if rl else mk)) <= 0.05 else 'Above what the market usually pays.' if prem > (sum(rl) / len(rl) if rl else mk) else 'Below what the market usually pays.')])
    rents = [x['rent'] for x in res if x['rent'] and x['rent'][1] >= 5]
    if rents:
        rp = sum(r[0] for r in rents) / len(rents); r3 = [r[2] for r in rents if r[2] and r[3] >= 3]
        checks.append(['Rental yield at this price', f"{rp * 12 / mid * 100:.1f}% gross", f"Competitors' median rent about ${rp:.2f} psf a month (URA rental contracts, {COMP['rentQ']})" + (f"; a 3-bed rents for about {fmt_money(round(sum(r3) / len(r3), -1))} a month." if r3 else '.')])
    sup = [p for p in ALLP if p['launchSort'] >= 202401 and _nm(p['name']) != _nm(c['name']) and _slug(p['name']) not in (c['geo_key'], *c.get('self_slugs', ())) and GEO.get(_slug(p['name'])) and _km(me, GEO[_slug(p['name'])]) <= 2]
    checks.append(['New supply within 2 km', f"{len(sup)} project{'s' if len(sup) != 1 else ''}", (f"About {sum(p['units'] or 0 for p in sup):,} homes launched since 2024 or coming: " + ', '.join(p['name'] for p in sup[:5]) + ('…' if len(sup) > 5 else '') + '.') if sup else 'No other project launched since 2024 or coming within 2 km.'])
    if c.get('absorb'):
        u_, sp_, mo_ = c['absorb']; sold_ = round(u_ * sp_ / 100); per = sold_ / max(1, mo_); left = u_ - sold_
        checks.append(['Sales pace', f"About {per:,.0f} a month", f"{sold_:,} of {u_:,} homes sold in about {max(1, mo_)} month{'s' if mo_ > 1 else ''} since launch; {left:,} left" + (f", about {left / per:.0f} months at that pace." if per >= 1 and left else '.')])
    if c.get('land'):
        nl = [r for r in land_rows if r[6]]
        checks.append(['Price to land cost', f"{mid / c['land']:.2f}x", f"Price psf divided by land psf ppr." + (f" Launched projects nearby: {sum(r[6] / r[2] for r in nl) / len(nl):.2f}x on average." if nl else '')])
    EXP = c.get('exp_word', 'expected')
    land, build_, fin, fees = c['land'], c['build'], round((c['land'] or 0) * 0.09), 180
    floor = None if land is None else [round((land + build_ + fin + fees) / 0.9 / 10) * 10, round((land + build_ + fin + fees) / 0.85 / 10) * 10]
    FLOOR0 = floor[0] if floor else 0
    units = {}
    for t, sz in c['sizes'].items():
        xq = ex['base'] * sz; inc = income_needed(xq); up = .25 * xq + bsd(xq)
        msr = income_needed(mid * sz) * .55 / .30   # EC from the developer: 30% mortgage servicing ratio
        gm = {k: gain(mid, sz, ex[k]) for k in g}
        if inc > 1.8 * MEDIAN_INCOME: v = 'Walk away'
        elif mid <= buy: v = 'Buy'
        elif mid <= walk: v = f'Buy only below {fmt_money(walk)} psf'
        else: v = f'Walk away above {fmt_money(walk)} psf'
        units[t] = dict(size=sz, xq=xq, inc=inc, up=up, gm=gm, v=v, msr=msr,
                        tab={lab: {k: gain(e, sz, ex[k]) for k in g} for lab, e in (('buy', buy), ('exp', mid), ('walk', walk))})
    tm = '3-bed' if '3-bed' in units else list(units)[0]; u = units[tm]
    pct = lambda x: f"{x*100:+.0f}%".replace('+-', '−').replace('-', '−')
    yr = lambda x: fmt_pct(((1 + x) ** (1 / n) - 1) * 100) + ' a year'
    caps = [HDB_T[t][f][0] - OUTSTANDING for t in c['towns'] for f in HDB_T[t]]
    risky = [t for t, x in units.items() if x['up'] > max(caps) or x['inc'] > 1.5 * MEDIAN_INCOME]
    walkers = [t for t, x in units.items() if x['v'] == 'Walk away']
    pv = 'Buy' if mid <= buy else f'Buy only below {fmt_money(walk)} psf' if mid <= walk else f'Walk away above {fmt_money(walk)} psf'
    keep = [t for t in units if t not in walkers]
    main = u['v'] if u['v'] != 'Walk away' else (pv if pv.startswith('Walk away') else f"{pv.replace(' psf', '')}: {' and '.join(keep)} only" if keep else pv)
    near1 = [x for x in comps if x['dist'] <= 1000]
    comp_names = ', '.join(x['name'] for x in comps)
    if pv == 'Buy':
        line = f"Buy. The {EXP} {RNG} psf is at or below what the closest competitors support (about {fmt_money(buy)} psf)."
    elif pv.startswith('Buy only'):
        line = f"Buy only below {fmt_money(walk)} psf. The {EXP} {RNG} psf is a little above what the closest competitors support (about {fmt_money(buy)} psf){', so aim for the lower end' if lo != hi else ', so negotiate or choose a cheaper stack'}."
    else:
        line = f"Walk away above {fmt_money(walk)} psf. The {EXP} {RNG} psf is {(mid / buy - 1) * 100:.0f}% above what the closest competitors support (about {fmt_money(buy)} psf for a new launch here). Buy only at or below about {fmt_money(buy)} psf."
    if walkers: line += f" Skip the {' and '.join(walkers)}: its resale price would outrun local buyers." if len(walkers) == 1 else f" Skip the {' and '.join(walkers)}: their resale prices would outrun local buyers."
    reasons = [
        f"The closest competitors ({comp_names}) work out to about {fmt_money(buy)} psf as a brand-new launch, after adding 5% where they were not built under the harmonised floor-area rules, a {prem_n * 100:.0f}% new-launch premium (what launches selling now in the {prem_rk} charge over their closest resale, {prem_cnt} launches){' and 10% for this project being integrated' if c['integrated'] else ''}.",
        f"Bought at the {EXP} {fmt_money(round(mid))} psf, the base case makes about {pct(u['gm']['base'])} after stamp duty and selling costs by {c['buy_year'] + int(n)} ({yr(u['gm']['base'])}); bought at {fmt_money(buy)} psf it makes about {pct(u['tab']['buy']['base'])}.",
        f"At the base-case resale price, a {tm} of about {u['size']:,} sq ft costs about {fmt_q(u['xq'])}; a buyer then needs about {fmt_money(round(u['inc'], -2))} a month and {fmt_q(round(u['up'], -3))} upfront, against {fmt_q(min(caps))} to {fmt_q(max(caps))} that typical {' and '.join(c['towns'])} upgraders bring."]
    if c.get('ec'):
        r = .04 / 12; cap = .30 * 16000 * (1 - (1 + r) ** -360) / r   # largest loan at the income ceiling under the 30% MSR, 4% test rate
        reasons.append(f"At launch, a household at the $16,000 income ceiling can borrow at most about {fmt_q(round(cap, -4))} under the 30% mortgage servicing ratio, so a {tm} at {fmt_money(round(mid))} psf ({fmt_q(round(mid * u['size'], -3))}) needs about {fmt_q(round(mid * u['size'] - cap + bsd(mid * u['size']), -4))} in cash and CPF, including stamp duty.")
    reasons.insert(1, tx_line)
    if hi_up and c.get('land') and hi_up[2] > c['land'] * 1.1:
        reasons.insert(2, f"The newest land bid nearby, {hi_up[0]} ({hi_up[1]:,} m, {fmt_money(hi_up[2])} psf ppr), is {(hi_up[2] / c['land'] - 1) * 100:.0f}% above this site's land cost; that launch needs about {fmt_money(hi_up[5])} psf just to cover costs" + (f", and is expected at {hi_up[7]}." if hi_up[7] and 'Not' not in hi_up[7] else '.'))
    elif hi_up and hi_up[5] > mid:
        reasons.insert(2, f"The {hi_up[0]} site nearby ({hi_up[1]:,} m, land {fmt_money(hi_up[2])} psf ppr) needs about {fmt_money(hi_up[5])} psf just to cover costs: more than this project's price.")
    entry_score = (7 if mid <= buy else 6 if mid <= walk else 4 if mid <= buy * 1.15 else 3) + (1 if hi_up and mid <= hi_up[5] else 0)
    exit_score = (7 if not risky else 5 if len(risky) < len(units) else 4) - (1 if c.get('heavy_supply') else 0)
    score = []
    for nm, s, ev in c['score']:
        if ev == 'entry':
            gp = lambda v: f'{(v / buy - 1) * 100:+.0f}'.replace('-', '−') + '%'
            score.append([nm, entry_score, f"{EXP.capitalize()} {RNG} psf against about {fmt_money(buy)} psf from the closest competitors ({gp(lo) if lo == hi else gp(lo) + ' to ' + gp(hi)})."])
        elif ev == 'exit': score.append([nm, exit_score, ('Exit prices stay within reach of most local upgraders' if not risky else f"The {', '.join(risky)} exit prices outrun most local upgraders") + ('; heavy competing supply at the exit.' if c.get('heavy_supply') else '; little competing private supply nearby.')])
        else: score.append([nm, s, ev])
    S = dict(SRC_BASE); S.update(c['src_extra']); S.update(EXS)
    S['urarent'] = ['URA private residential rental contracts (Data Service), ' + COMP['rentQ'], 'https://eservice.ura.gov.sg/maps/?service=PRR']
    S['caveats'] = ['URA private residential transactions (caveats), Nov 2025 to Oct 2026; 4-year change from Nov 2021 to Oct 2022', f"/condo-analysis/{c['file_slug']}/#near"]
    std = {
     'v': 2, 'asOf': AS_OF, 'confidence': c['confidence'],
     'confNote': c.get('conf_note') or f"No developer price list yet. Price range: {c['expected_note']} {c['sizes_note']} The verdict will be re-checked the day prices are released.",
     'strip': [['Verdict', main if len(main) < 34 else main.replace(' psf', ''), ('Every unit type\'s resale price needs over 1.8 times the median household income: a thin pool of resale buyers' if not keep else ', '.join(f"{t}: {x['v']}" for t, x in units.items() if x['v'] != main) or 'Same for every unit type')],
               ['Buy at or below', f"{fmt_money(buy)} psf", f"{tm} about {fmt_q(round(buy * u['size'], -3))}" + (f". Below the developer's floor of about {fmt_money(floor[0])}, so a launch this low is unlikely" if buy < FLOOR0 else '')],
               ['Walk away above', f"{fmt_money(walk)} psf", f"{tm} about {fmt_q(round(walk * u['size'], -3))}. {EXP.capitalize()} {RNG}"],
               ['Potential gain', pct(u['gm']['base']), f"Base case after costs by {c['buy_year'] + int(n)}, bought at {fmt_money(round(mid))} psf ({yr(u['gm']['base'])}). Bear {pct(u['gm']['bear'])}, bull {pct(u['gm']['bull'])}"]],
     'verdict': {'line': line, 'reasons': reasons,
                 'suits': f"Buyers who can buy at or below about {fmt_money(walk)} psf and plan to live here for 5 years or more. {c['who'].split('.')[0]}.",
                 'skip': ('Buyers who would have to pay above the walk-away price, or who may need to sell before the 5-year minimum occupation period ends.' if c.get('ec') else 'Buyers who would have to pay above the walk-away price, or sell within the 4-year Seller\'s Stamp Duty period.'),
                 'change': [(f"If the developer prices a {tm} at or below about {fmt_money(buy)} psf, it is in line with its closest competitors." if c.get('selling') else f"If the {tm} launches at or below about {fmt_money(buy)} psf, it is priced in line with its closest competitors."),
                            'If a closer or newer competitor launches or resells at a different price, the buy-at and walk-away prices move with it.',
                            *([f"If the {hi_up[0]} site launches well above {fmt_money(round(mid))} psf, this price will look cheaper next to it."] if hi_up else []),
                            'If official unit sizes are smaller than assumed, quanta fall and more local upgraders can afford the resale price.']},
     'types': [[f"{t} (about {x['size']:,} sq ft)", x['v'], f"{fmt_money(buy)} psf ({fmt_q(round(buy * x['size'], -3))})", f"{fmt_money(walk)} psf ({fmt_q(round(walk * x['size'], -3))})",
                f"At {fmt_money(round(mid))} psf: about {pct(x['gm']['base'])} by {c['buy_year'] + int(n)}. Resale about {fmt_q(round(x['xq'], -3))} needs about {fmt_money(round(x['inc'], -2))} a month." + (f" At launch, a 75% loan needs about {fmt_money(round(x['msr'], -2))} a month under the 30% mortgage limit" + (" (above the $16,000 income ceiling)." if x['msr'] > 16000 else " (ceiling $16,000).") if c.get('ec') else '')] for t, x in units.items()],
     'priceA': c['priceA_none'] if floor is None else [['Land', f"{fmt_money(land)} psf ppr", 'C', None, c['land_src'] + '. psf ppr = land price per square foot of floor area the site may build.'],
                ['Building cost', f"about {fmt_money(build_)} psf", c['build_lab'], c['build_src'], c['build_note']],
                ['Finance, fees, marketing, stamp duty', f"about {fmt_money(fin + fees)} psf", 'E', None, 'Land carried about 3 years at about 3% a year, plus fees, show flat, stamp duty on the land and property tax while building.'],
                ['Developer floor price', f"about {fmt_money(floor[0])} to {fmt_money(floor[1])} psf", 'E', None, 'Cost plus a normal 10% to 15% margin. A launch below this is unlikely.']],
     'comps': [[x['name'], x['dist'], x['units'], x['tenure'], x['top'] or '–', x['kind'], round(x['psf']), x.get('time'), x['adj_h'], x['adj_n'], x['adj_i'], round(x['equiv']), x['g'], x.get('basis'), bool(x.get('twin'))] for x in comps],
     'compsNote': (f"{len(near1)} of the {len(comps)} competitors are within 1 km. " if near1 else 'No suitable competitor within 1 km, so the nearest within 2 to 3 km are used. ')
                  + ("Only executive condos are compared (an EC sells below private condos because of its buyer rules). " if c.get('ec') else '')
                  + "Near-twins come first: up to two condos within 1.5 km with a similar number of homes (half to double) completed in 2016 or later. Then every suitable condo within 1 km (same tenure, completed 2011 or later first), widening to 2 km and 3 km only if fewer than 3"
                  + (". Resale ECs past their 5-year minimum occupation period sell to any Singaporean or PR" if c.get('ec') else '; executive condos are left out')
                  + ". Resale prices are URA medians for the last 6 months where there were at least 5 resales, otherwise the last 12 months. Condos launched before June 2023 measured their areas under the old rules (including air-con ledges), so their psf is raised 5% to compare like for like.",
     'priceDecide': f"Each resale competitor's latest psf is raised by the {prem_n * 100:.0f}% new-launch premium that launches selling now in the {prem_rk} carry over their closest resale ({prem_cnt} launches). Buy at or below = the average of the competitors' new-launch equivalents = about {fmt_money(buy)} psf. Walk away above = 5% more = about {fmt_money(walk)} psf. " + ("No developer floor can be worked out: the developers already owned the land." if floor is None else f"The developer's floor is about {fmt_money(floor[0])} to {fmt_money(floor[1])} psf" + (', so expect the launch above our buy-at price.' if buy < floor[0] else '.')),
     'gain': {'timeline': c['timeline'],
              'costs': ("No Seller's Stamp Duty: the sale is after the 5-year minimum occupation period. " if c.get('ec') else '') + "Potential gain is after Buyer's Stamp Duty at IRAS rates, about $6,000 legal fees and a 2% agent fee plus 9% GST when you sell. Loan interest, property tax, maintenance and rent are not included.",
              'scen': [['Bear', f"{g['bear']*100:.1f}% a year", ('Half the base case' if base > 0 else 'One and a half times the base-case fall') + ': competing supply at the exit, or a softer market.'],
                       ['Base', f"{g['base']*100:.1f}% a year", ("No condo nearby has a suitable record (a 3-bed price change over 4 years with at least 10 resales in the past year), so we use URA's islandwide non-landed index: 4.7% a year from Q3 2016 to Q3 2026." if growth_only == ['index'] else "The average yearly 3-bed price change over the past 4 years (URA caveats) of the competitors with a suitable record (at least 10 resales in the past year)" + (f", widened to the nearest suitable condos: {', '.join(growth_only)}" if growth_only and growth_only != ['index'] else '') + ': ' + ', '.join(f"{n} {v:.1f}%" for n, v in gsrc) + '. That period included the 2022–2023 rise.')],
                       ['Bull', f"{g['bull']*100:.1f}% a year", bull_why]],
              'rows': [[t, lab, fmt_money(round(e)), pct(x['tab'][k]['bear']), pct(x['tab'][k]['base']), pct(x['tab'][k]['bull']), yr(x['tab'][k]['base'])]
                       for t, x in units.items() for k, lab, e in (('buy', 'Buy-at', buy), ('exp', EXP.capitalize(), mid), ('walk', 'Walk-away', walk))],
              'years': n},
     'district': {'summary': c['district_summary'], 'rows': [([r[0], next((ch[1] + ' at this price. ' + ch[2] for ch in checks if ch[0] == 'Rental yield at this price'), r[1]), 'C', 'caveats'] if r[0] == 'Rents' and 'Not available yet' in r[1] and any(ch[0] == 'Rental yield at this price' for ch in checks) else r) for r in c['district']], 'line': c['district_line']},
     'exit': {'who': c['who'],
              'rows': [[t, fmt_q(round(x['xq'], -3)), fmt_money(round(x['inc'], -2)), fmt_q(round(x['up'], -3))] for t, x in units.items()],
              'capital': [[f"{t} {f} ({HDB_T[t][f][1]} resales)", fmt_money(HDB_T[t][f][0]), fmt_money(HDB_T[t][f][0] - OUTSTANDING)] for t in c['towns'] for f in HDB_T[t]],
              'note': ("At launch an EC bought from the developer is capped by the 30% mortgage servicing ratio (MSR) and a $16,000 household income ceiling; resale buyers after the minimum occupation period face only the 55% TDSR. " if c.get('ec') else '') + "Income needed: 75% loan over 30 years, tested at MAS's 4% rate under the 55% debt limit (TDSR, the share of income all loan repayments may take). Median household market income: $12,446 a month (SingStat, 2025). Upgrader capital = our median resale price minus an illustrative $150,000 still owed; the typical outstanding loan is Not available yet.",
              'line': (f"The {(', '.join(risky[:-1]) + ' and ' + risky[-1]) if len(risky) > 1 else risky[0]} resale prices outrun most local upgraders: exit risk." if risky else 'Resale prices stay within reach of typical local upgraders.')},
     'plan': plan_rows, 'planLine': plan_line,
     'tx': {'rows': tx, 'line': tx_line, 'm6': COMP['m6'], 'm12': COMP['m12'], 'price': round(mid), 'exp': EXP},
     'land': {'rows': land_rows, 'line': land_line},
     'checks': checks,
     'score': score, 'scoreNote': f"Overall {sum(s[1] for s in score) / len(score):.1f} out of 10. The buy-at and walk-away prices decide the verdict; the scorecard shows how good the place is to live in.",
     'facts': c['facts'], 'pros': c['pros'], 'cons': c['cons'],
     'compare': [[c['name'] + f" ({EXP})", RNG.replace(' to ', '–'), '', '', f"About {pct(u['gm']['base'])} by {c['buy_year'] + int(n)}"]] + c['compare'],
     'faq': [[q, a if a else f"At the {EXP} {RNG} psf, the base case makes about {pct(u['gm']['base'])} by {c['buy_year'] + int(n)} after stamp duty and selling costs ({yr(u['gm']['base'])}). Bought at about {fmt_money(buy)} psf, in line with its closest competitors, it makes about {pct(u['tab']['buy']['base'])}."] for q, a in c['faq_extra']]
            + [[f"What price should I pay for a {tm}?", f"At or below about {fmt_money(buy)} psf, about {fmt_q(round(buy * u['size'], -3))} for {u['size']:,} sq ft, in line with its closest competitors. Walk away above about {fmt_money(walk)} psf ({fmt_q(round(walk * u['size'], -3))}). These are estimates until the developer releases prices."]],
     'chart': {'subject': [[c['buy_year'], round(mid)], [c['buy_year'] + int(n), round(ex['base'])]],
               'buyat': [[c['buy_year'], buy], [c['buy_year'] + int(n), round(ex['base'])]],
               'comps': {x['name']: [[2022, round(x['psf'] / (1 + x['g'] / 100) ** 4)], [2026, round(x['psf'])]] for x in comps if x['g'] is not None},
               'note': f"Navy: the competitors' URA prices four years ago and now. Brass: this project bought at the buy-at price (solid) and at the {EXP} price (dashed), both reaching the base-case price by {c['buy_year'] + int(n)}. The gap between the two brass lines is the extra you pay."},
     'src': S,
    }
    return std


AS_OF = '25 Nov 2026'
HDB_T = {}
SRC_BASE = {}
