"""Condo analysis engine, method v2 (Jack, 25 Nov 2026), replacing the 5% test:
- Competitors: closest first (within 1 km, then 2 km, then 3 km), same tenure, similar size (0.4x to 2.5x the homes),
  no executive condos, completed 2000 or later where possible; recent launches (last 24 months, already launched) count too.
- Each competitor becomes a "new-launch equivalent": resale psf +5% if not built under the harmonised floor-area rules
  (June 2023), +15% new-launch premium, +10% if this project is integrated and the competitor is not; recent launches are
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


def competitors(c):
    """Up to 4 competitors, closest first, by the rules above. Returns list of dicts."""
    homes, lh, now = c['homes'], c.get('leasehold', True), 2026
    pool = []
    for r in NEAR[c['nearby_key']]['r3']['rows']:
        name, dist, ten, top, h, psf, n = r[:7]
        if bool(r[12]) != bool(c.get('ec')) or not psf or (n or 0) < 3 or _lh(ten) != lh: continue
        g = r[10] if r[10] is not None else r[11]
        if g is None: g = FALLBACK_4Y.get(name)
        pool.append(dict(name=name, dist=dist, units=h, tenure=ten, top=top, psf=psf, deals=n, g=g, g3=r[10], kind='Resale',
                         harmonised=False, integ=name in INTEGRATED, size_ok=bool(h) and 0.4 * homes <= h <= 2.5 * homes,
                         new=bool(top) and top >= 2000))
    me = GEO.get(c['geo_key'])
    for p in RECENT:
        is_ec = 'EC' in p['name'] or 'Executive' in p['type']
        if p['launchSort'] > 202611 or is_ec != bool(c.get('ec')) or _lh(p['tenure']) != lh or _slug(p['name']) == c['geo_key']: continue
        g = GEO.get(_slug(p['name']))
        if not (me and g and 'lat' in g): continue
        d = _km(me, g) * 1000
        pool.append(dict(name=p['name'], dist=round(d), units=p['units'], tenure=p['tenure'], top=None, psf=p['psf'], deals=None, g=None,
                         kind=f"Launched {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p['launchSort'] % 100 - 1]} {p['launchSort'] // 100}",
                         launchSort=p['launchSort'], harmonised=p['launchSort'] >= HARMONISED_FROM, integ=p['mall'],
                         size_ok=bool(p['units']) and 0.4 * homes <= p['units'] <= 2.5 * homes, new=True))
    pick = []
    # Distance is widened before size or age is relaxed: newer (completed 2011+ or a recent launch) and similar size first.
    recent = lambda x: x['kind'] != 'Resale' or (x['top'] or 0) >= 2011
    for test in (lambda x: x['size_ok'] and recent(x), lambda x: recent(x), lambda x: x['size_ok'] and x['new'], lambda x: x['new']):
        for band in (1000, 2000, 3000):
            for x in sorted([y for y in pool if y['dist'] <= band and y not in pick and test(y)], key=lambda y: y['dist']):
                if len(pick) < 4: pick.append(x)
            if len(pick) >= 3: break
        if len(pick) >= 3: break
    for x in pick:
        if x['kind'] == 'Resale':
            x['adj_h'] = 0 if x['harmonised'] else HARMONISE
            x['adj_n'] = NEW_PREMIUM
            x['adj_i'] = INTEG if c['integrated'] and not x['integ'] else 0
            x['equiv'] = x['psf'] * (1 + x['adj_h']) * (1 + x['adj_n']) * (1 + x['adj_i'])
        else:
            x['time'] = IDX[NOW_Q] / IDX[_q(x['launchSort'])] - 1
            x['adj_h'] = 0 if x['harmonised'] else HARMONISE
            x['adj_n'] = 0
            x['adj_i'] = INTEG if c['integrated'] and not x['integ'] else 0
            x['equiv'] = x['psf'] * (1 + x['time']) * (1 + x['adj_h']) * (1 + x['adj_i'])
    return pick


def gain(entry, size, exit_psf):
    price = entry * size
    return exit_psf * size * (1 - SELL) / (price + bsd(price) + LEGAL) - 1


def build(pid, c):
    comps = competitors(c)
    buy = round(sum(x['equiv'] for x in comps) / len(comps) / 10) * 10
    walk = round(buy * (1 + WALK) / 10) * 10
    # Growth: suitable record = 3-bed 4-year change (URA) with at least 10 resales in 12 months. Competitors first;
    # if fewer than 2 qualify, add the nearest suitable same-tenure condos within 2 km; then any distance; then the index.
    ok = lambda r: r[10] is not None and (r[6] or 0) >= 10 and bool(r[12]) == bool(c.get('ec')) and _lh(r[2]) == c.get('leasehold', True)
    gsrc = [(x['name'], x['g3']) for x in comps if x.get('g3') is not None and (x['deals'] or 0) >= 10]
    growth_only = []
    rows = sorted(NEAR[c['nearby_key']]['r3']['rows'], key=lambda r: r[1])
    for limit in (2000, 99999):
        for r in rows:
            if len(gsrc) >= 2 or r[1] > limit: break
            if ok(r) and not any(n == r[0] for n, _ in gsrc): gsrc.append((r[0], r[10])); growth_only.append(f"{r[0]} ({r[1] / 1000:.1f} km)")
        if gsrc: break
    if not gsrc: gsrc = [('URA non-landed index, Q3 2016 to Q3 2026', 4.7)]; growth_only.append('index')
    gs = [g for _, g in gsrc]
    base = round(sum(gs) / len(gs) / 100, 4)
    g = {'bear': base / 2 if base > 0 else base * 1.5, 'base': base, 'bull': base + c.get('bull_add', 0)}
    n = c['years']
    ex = {k: buy * (1 + v) ** n for k, v in g.items()}
    lo, hi = c['expected']; mid = (lo + hi) / 2
    EXP = c.get('exp_word', 'expected')
    land, build_, fin, fees = c['land'], c['build'], round(c['land'] * 0.09), 180
    cost = land + build_ + fin + fees; floor = [round(cost / 0.9 / 10) * 10, round(cost / 0.85 / 10) * 10]
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
    main = u['v'] if u['v'] != 'Walk away' else (f"{pv.replace(' psf', '')}: {' and '.join(keep)} only" if keep else 'Walk away')
    near1 = [x for x in comps if x['dist'] <= 1000]
    comp_names = ', '.join(x['name'] for x in comps)
    if pv == 'Buy':
        line = f"Buy. The {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf is at or below what the closest competitors support (about {fmt_money(buy)} psf)."
    elif pv.startswith('Buy only'):
        line = f"Buy only below {fmt_money(walk)} psf. The {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf is a little above what the closest competitors support (about {fmt_money(buy)} psf), so aim for the lower end."
    else:
        line = f"Walk away above {fmt_money(walk)} psf. The {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf is {(mid / buy - 1) * 100:.0f}% above what the closest competitors support (about {fmt_money(buy)} psf for a new launch here). Buy only at or below about {fmt_money(buy)} psf."
    if walkers: line += f" Skip the {' and '.join(walkers)}: its resale price would outrun local buyers." if len(walkers) == 1 else f" Skip the {' and '.join(walkers)}: their resale prices would outrun local buyers."
    reasons = [
        f"The closest competitors ({comp_names}) work out to about {fmt_money(buy)} psf as a brand-new launch, after adding 5% where they were not built under the harmonised floor-area rules, a 15% new-launch premium{' and 10% for this project being integrated' if c['integrated'] else ''}.",
        f"Bought at the {EXP} {fmt_money(round(mid))} psf, the base case makes about {pct(u['gm']['base'])} after stamp duty and selling costs by {c['buy_year'] + int(n)} ({yr(u['gm']['base'])}); bought at {fmt_money(buy)} psf it makes about {pct(u['tab']['buy']['base'])}.",
        f"At the base-case resale price, a {tm} of about {u['size']:,} sq ft costs about {fmt_q(u['xq'])}; a buyer then needs about {fmt_money(round(u['inc'], -2))} a month and {fmt_q(round(u['up'], -3))} upfront, against {fmt_q(min(caps))} to {fmt_q(max(caps))} that typical {' and '.join(c['towns'])} upgraders bring."]
    if c.get('ec'):
        r = .04 / 12; cap = .30 * 16000 * (1 - (1 + r) ** -360) / r   # largest loan at the income ceiling under the 30% MSR, 4% test rate
        reasons.append(f"At launch, a household at the $16,000 income ceiling can borrow at most about {fmt_q(round(cap, -4))} under the 30% mortgage servicing ratio, so a {tm} at {fmt_money(round(mid))} psf ({fmt_q(round(mid * u['size'], -3))}) needs about {fmt_q(round(mid * u['size'] - cap + bsd(mid * u['size']), -4))} in cash and CPF, including stamp duty.")
    entry_score = 7 if mid <= buy else 6 if mid <= walk else 4 if mid <= buy * 1.15 else 3
    exit_score = (7 if not risky else 5 if len(risky) < len(units) else 4) - (1 if c.get('heavy_supply') else 0)
    score = []
    for nm, s, ev in c['score']:
        if ev == 'entry': score.append([nm, entry_score, f"{EXP.capitalize()} {fmt_money(lo)} to {fmt_money(hi)} psf against about {fmt_money(buy)} psf from the closest competitors ({f'{(lo / buy - 1) * 100:+.0f}'.replace('-', '−')}% to {f'{(hi / buy - 1) * 100:+.0f}'.replace('-', '−')}%)."])
        elif ev == 'exit': score.append([nm, exit_score, ('Exit prices stay within reach of most local upgraders' if not risky else f"The {', '.join(risky)} exit prices outrun most local upgraders") + ('; heavy competing supply at the exit.' if c.get('heavy_supply') else '; little competing private supply nearby.')])
        else: score.append([nm, s, ev])
    S = dict(SRC_BASE); S.update(c['src_extra'])
    S['caveats'] = ['URA private residential transactions (caveats), Nov 2025 to Oct 2026; 4-year change from Nov 2021 to Oct 2022', f"/condo-analysis/{c['file_slug']}/#near"]
    std = {
     'v': 2, 'asOf': AS_OF, 'confidence': c['confidence'],
     'confNote': f"No developer price list yet. Price range: {c['expected_note']} {c['sizes_note']} The verdict will be re-checked the day prices are released.",
     'strip': [['Verdict', main if len(main) < 34 else main.replace(' psf', ''), ', '.join(f"{t}: {x['v']}" for t, x in units.items() if x['v'] != main) or 'Same for every unit type'],
               ['Buy at or below', f"{fmt_money(buy)} psf", f"{tm} about {fmt_q(round(buy * u['size'], -3))}" + (f". Below the developer's floor of about {fmt_money(floor[0])}, so a launch this low is unlikely" if buy < floor[0] else '')],
               ['Walk away above', f"{fmt_money(walk)} psf", f"{tm} about {fmt_q(round(walk * u['size'], -3))}. {EXP.capitalize()} {fmt_money(lo)} to {fmt_money(hi)}"],
               ['Potential gain', pct(u['gm']['base']), f"Base case after costs by {c['buy_year'] + int(n)}, bought at {fmt_money(round(mid))} psf ({yr(u['gm']['base'])}). Bear {pct(u['gm']['bear'])}, bull {pct(u['gm']['bull'])}"]],
     'verdict': {'line': line, 'reasons': reasons,
                 'suits': f"Buyers who can buy at or below about {fmt_money(walk)} psf and plan to live here for 5 years or more. {c['who'].split('.')[0]}.",
                 'skip': ('Buyers who would have to pay above the walk-away price, or who may need to sell before the 5-year minimum occupation period ends.' if c.get('ec') else 'Buyers who would have to pay above the walk-away price, or sell within the 4-year Seller\'s Stamp Duty period.'),
                 'change': [f"If the {tm} launches at or below about {fmt_money(buy)} psf, it is priced in line with its closest competitors.",
                            'If a closer or newer competitor launches or resells at a different price, the buy-at and walk-away prices move with it.',
                            'If official unit sizes are smaller than assumed, quanta fall and more local upgraders can afford the resale price.']},
     'types': [[f"{t} (about {x['size']:,} sq ft)", x['v'], f"{fmt_money(buy)} psf ({fmt_q(round(buy * x['size'], -3))})", f"{fmt_money(walk)} psf ({fmt_q(round(walk * x['size'], -3))})",
                f"At {fmt_money(round(mid))} psf: about {pct(x['gm']['base'])} by {c['buy_year'] + int(n)}. Resale about {fmt_q(round(x['xq'], -3))} needs about {fmt_money(round(x['inc'], -2))} a month." + (f" At launch, a 75% loan needs about {fmt_money(round(x['msr'], -2))} a month under the 30% mortgage limit" + (" (above the $16,000 income ceiling)." if x['msr'] > 16000 else " (ceiling $16,000).") if c.get('ec') else '')] for t, x in units.items()],
     'priceA': [['Land', f"{fmt_money(land)} psf ppr", 'C', None, c['land_src'] + '. psf ppr = land price per square foot of floor area the site may build.'],
                ['Building cost', f"about {fmt_money(build_)} psf", c['build_lab'], c['build_src'], c['build_note']],
                ['Finance, fees, marketing, stamp duty', f"about {fmt_money(fin + fees)} psf", 'E', None, 'Land carried about 3 years at about 3% a year, plus fees, show flat, stamp duty on the land and property tax while building.'],
                ['Developer floor price', f"about {fmt_money(floor[0])} to {fmt_money(floor[1])} psf", 'E', None, 'Cost plus a normal 10% to 15% margin. A launch below this is unlikely.']],
     'comps': [[x['name'], x['dist'], x['units'], x['tenure'], x['top'] or '–', x['kind'], round(x['psf']), x.get('time'), x['adj_h'], x['adj_n'], x['adj_i'], round(x['equiv']), x['g']] for x in comps],
     'compsNote': (f"{len(near1)} of the {len(comps)} competitors are within 1 km. " if near1 else 'No suitable competitor within 1 km, so the nearest within 2 to 3 km are used. ')
                  + ("Only executive condos are compared (an EC sells below private condos because of its buyer rules), closest first, with a similar number of homes, completed 2011 or later where possible. Resale ECs past their 5-year minimum occupation period sell to any Singaporean or PR. Resale prices" if c.get('ec') else "Chosen closest first, with the same tenure and a similar number of homes, completed 2000 or later where possible; executive condos are left out. Resale prices")
                  + " are URA medians for the past 12 months. Condos launched before June 2023 measured their areas under the old rules (including air-con ledges), so their psf is raised 5% to compare like for like.",
     'priceDecide': f"Buy at or below = the average of the competitors' new-launch equivalents = about {fmt_money(buy)} psf. Walk away above = 5% more = about {fmt_money(walk)} psf. The developer's floor is about {fmt_money(floor[0])} to {fmt_money(floor[1])} psf" + (', so expect the launch above our buy-at price.' if buy < floor[0] else '.'),
     'gain': {'timeline': c['timeline'],
              'costs': ("No Seller's Stamp Duty: the sale is after the 5-year minimum occupation period. " if c.get('ec') else '') + "Potential gain is after Buyer's Stamp Duty at IRAS rates, about $6,000 legal fees and a 2% agent fee plus 9% GST when you sell. Loan interest, property tax, maintenance and rent are not included.",
              'scen': [['Bear', f"{g['bear']*100:.1f}% a year", ('Half the base case' if base > 0 else 'One and a half times the base-case fall') + ': competing supply at the exit, or a softer market.'],
                       ['Base', f"{g['base']*100:.1f}% a year", ("No condo nearby has a suitable record (a 3-bed price change over 4 years with at least 10 resales in the past year), so we use URA's islandwide non-landed index: 4.7% a year from Q3 2016 to Q3 2026." if growth_only == ['index'] else "The average yearly 3-bed price change over the past 4 years (URA caveats) of the competitors with a suitable record (at least 10 resales in the past year)" + (f", widened to the nearest suitable condos: {', '.join(growth_only)}" if growth_only and growth_only != ['index'] else '') + ': ' + ', '.join(f"{n} {v:.1f}%" for n, v in gsrc) + '. That period included the 2022–2023 rise.')],
                       ['Bull', f"{g['bull']*100:.1f}% a year", c['bull_why']]],
              'rows': [[t, lab, fmt_money(round(e)), pct(x['tab'][k]['bear']), pct(x['tab'][k]['base']), pct(x['tab'][k]['bull']), yr(x['tab'][k]['base'])]
                       for t, x in units.items() for k, lab, e in (('buy', 'Buy-at', buy), ('exp', EXP.capitalize(), mid), ('walk', 'Walk-away', walk))],
              'years': n},
     'district': {'summary': c['district_summary'], 'rows': c['district'], 'line': c['district_line']},
     'exit': {'who': c['who'],
              'rows': [[t, fmt_q(round(x['xq'], -3)), fmt_money(round(x['inc'], -2)), fmt_q(round(x['up'], -3))] for t, x in units.items()],
              'capital': [[f"{t} {f} ({HDB_T[t][f][1]} resales)", fmt_money(HDB_T[t][f][0]), fmt_money(HDB_T[t][f][0] - OUTSTANDING)] for t in c['towns'] for f in HDB_T[t]],
              'note': ("At launch an EC bought from the developer is capped by the 30% mortgage servicing ratio (MSR) and a $16,000 household income ceiling; resale buyers after the minimum occupation period face only the 55% TDSR. " if c.get('ec') else '') + "Income needed: 75% loan over 30 years, tested at MAS's 4% rate under the 55% debt limit (TDSR, the share of income all loan repayments may take). Median household market income: $12,446 a month (SingStat, 2025). Upgrader capital = our median resale price minus an illustrative $150,000 still owed; the typical outstanding loan is Not available yet.",
              'line': (f"The {(', '.join(risky[:-1]) + ' and ' + risky[-1]) if len(risky) > 1 else risky[0]} resale prices outrun most local upgraders: exit risk." if risky else 'Resale prices stay within reach of typical local upgraders.')},
     'plan': c['plan'], 'planLine': c['plan_line'],
     'score': score, 'scoreNote': f"Overall {sum(s[1] for s in score) / len(score):.1f} out of 10. The buy-at and walk-away prices decide the verdict; the scorecard shows how good the place is to live in.",
     'facts': c['facts'], 'pros': c['pros'], 'cons': c['cons'],
     'compare': [[c['name'] + f" ({EXP})", f"{fmt_money(lo)}–{fmt_money(hi)}", '', '', f"About {pct(u['gm']['base'])} by {c['buy_year'] + int(n)}"]] + c['compare'],
     'faq': [[q, a if a else f"At the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf, the base case makes about {pct(u['gm']['base'])} by {c['buy_year'] + int(n)} after stamp duty and selling costs ({yr(u['gm']['base'])}). Bought at about {fmt_money(buy)} psf, in line with its closest competitors, it makes about {pct(u['tab']['buy']['base'])}."] for q, a in c['faq_extra']]
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
