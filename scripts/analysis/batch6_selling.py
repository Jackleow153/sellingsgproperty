"""Batch 6 on method v2: condos selling now (launched files in NL.L with under 95% sold). Configs are generated from each file's
existing, sourced data (price, unit list, scores, pros and cons, sources) plus URA nearby data. Imported by projects_v2.py."""
import json, os, re, statistics, subprocess
from batch5_prime import district, NEAR, MP, ONEMAP, ARC, ARC_RCR

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC_HTML = open(os.path.join(ROOT, 'data', 'condo-analysis.html')).read()
NL = json.loads(re.search(r'^const NL = (.*?);$', SRC_HTML, re.M).group(1))
_js = r'''const fs=require("fs");const app=fs.readFileSync(process.argv[1],"utf8");const i=app.indexOf("const projects = [");const st=app.indexOf("[",i);let d=0,j=st;for(;j<app.length;j++){const c=app[j];if(c=="[")d++;else if(c=="]"){d--;if(d==0){j++;break}}}const P=eval(app.slice(st,j));console.log(JSON.stringify(P.map(p=>({name:p.name,mall:!!p.mall,psf:p.avgPSF,launchSort:p.launchSort}))))'''
APP = json.loads(subprocess.run(['node', '-e', _js, os.path.join(ROOT, 'assets', 'app.js')], capture_output=True, text=True, check=True).stdout)
NAME = {re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', p['name'].lower())): p for p in APP}
norm = lambda t: re.sub(r'[^a-z0-9]', '', t.lower())
PSF = {norm(p['name']): p['psf'] for p in APP if p.get('psf')}

TOWNS = {'thomson-reserve': ['Bishan', 'Ang Mo Kio'], 'lucerne-grand': ['Jurong East', 'Jurong West'], 'dunearn-house': ['Queenstown', 'Clementi'],
         'amberwood-at-holland': ['Queenstown', 'Clementi'], 'vela-bay': ['Bedok', 'Tampines'], 'lentor-gardens-residences': ['Ang Mo Kio', 'Yishun'],
         'hudson-place-residences': ['Queenstown', 'Clementi'], 'narra-residences': ['Bukit Panjang', 'Bukit Batok'], 'promenade-peak': ['Bukit Merah', 'Queenstown'],
         'zyon-grand': ['Bukit Merah', 'Queenstown'], 'the-robertson-opus': ['Bukit Merah', 'Queenstown'], 'union-square-residences': ['Bukit Merah', 'Queenstown'],
         'coastal-cabana': ['Pasir Ris', 'Tampines'], 'one-marina-gardens': ['Bukit Merah', 'Kallang/Whampoa'], 'elta': ['Clementi', 'Queenstown'],
         'the-sen': ['Bukit Batok', 'Bukit Panjang'], 'sora': ['Jurong East', 'Jurong West'], 'w-residences-marina-view': ['Bukit Merah', 'Kallang/Whampoa'],
         'newport-residences': ['Bukit Merah', 'Queenstown'], 'aurea': ['Kallang/Whampoa', 'Geylang'], 'the-collective-at-one-sophia': ['Kallang/Whampoa', 'Toa Payoh'],
         'meyer-blue': ['Marine Parade', 'Bedok'], 'kassia': ['Pasir Ris', 'Tampines'], '8-bt': ['Bukit Batok', 'Bukit Panjang']}
HDB6 = {'Jurong East': {'4-room': (549444, 140), '5-room': (712500, 118)}, 'Jurong West': {'4-room': (534500, 592), '5-room': (635444, 460)},
        'Pasir Ris': {'4-room': (635000, 303), '5-room': (735000, 242)}}   # C: our medians, HDB resale records Nov 2025 to Oct 2026
AS_OF_FILE = '10 Nov 2026'


def _num(t):
    m = re.search(r'\d[\d,]*', str(t)); return int(m.group().replace(',', '')) if m else None


def _sizes(fp):
    by = {}
    for r in fp:
        sz = _num(r[2]) if not isinstance(r[2], (int, float)) else r[2]
        if sz and isinstance(r[0], int) and 1 <= r[0] <= 5: by.setdefault(r[0], []).append(sz)
    out = {f'{b}-bed': int(round(statistics.median(v) / 5) * 5) for b, v in sorted(by.items()) if b in (2, 3, 4)}
    if not out: out = {f'{b}-bed': int(round(statistics.median(v) / 5) * 5) for b, v in sorted(by.items())}
    return out


def _top_year(t):
    ys = [int(y) for y in re.findall(r'20[2-3]\d', t)]
    return ys[0] if ys else 2030


def make(x):
    k = x['id']; ec = k == 'coastal-cabana'
    lh = not re.search(r'freehold|999', x['tenure'], re.I)
    homes = _num(x['units']); avg = x['avgPsf']
    app = NAME.get(k) or next((p for p in APP if norm(p['name']).startswith(norm(x['name'])[:10])), {})
    integ = bool(app.get('mall'))
    land = _num(x['land']) if re.match(r'\s*(About\s+)?\$[\d,]+ psf', x['land']) else None
    ccr = 'CCR' in x['region']
    top = _top_year(x['top'])
    n = (top + 5 - 2026) if ec else max(4, top + 1 - 2026)
    sale = 2026 + n
    towns = TOWNS[k]
    rows = NEAR[k]['r3']['rows']
    same = [r for r in rows if r[1] <= 1000 and (not any(w in r[2] for w in ('Freehold', '999', '947'))) == lh and bool(r[12]) == ec and (r[3] or 0) >= 2011]
    gap = (f"Current average ${avg:,} psf against " + ', '.join(f"{r[0]} (completed {r[3]}) at ${r[5]:,}" for r in same[:2]) + ' before the 5% area adjustment.'
           if same else f"Current average ${avg:,} psf; no {'executive condo' if ec else 'same-tenure condo'} completed since 2011 resells within 1 km.")
    names = {s: p['name'] for s, p in NAME.items()}
    near_l = [f"{names.get(s, s.replace('-', ' ').title())} ({d:.1f} km)" for s, d in NEAR[k].get('launches', []) if d <= 1.5 and s != k]
    supply = ('Other new projects within 1.5 km: ' + ', '.join(near_l[:5]) + '.') if near_l else 'No other new project within 1.5 km.'
    mrt = NEAR[k].get('mrt') or []
    m0 = mrt[0] if mrt else None
    sc = x['scores']
    s0 = {f's{i}': [a[0], a[1]] for i, a in enumerate(x['src'])}
    sold_line = x['sold'].rstrip('.')
    tl = (f"Buy now (November 2026) at the current average. Completion: {x['top']}. "
          + (f"The 5-year minimum occupation period then runs to about {sale}, when any Singaporean or PR can buy it. We look at a sale in {sale} ({n} years)." if ec
             else f"Seller's Stamp Duty applies for 4 years, so we look at a sale in {sale}, after the stamp duty ends and about a year after TOP ({n} years)."))
    c = dict(
        name=x['name'], selling=True, ec=ec, leasehold=lh, land=land, land_src=x['land'],
        priceA_none=[['Land', x['land'], 'R', 's0', 'No land price per square foot of floor area was found, so no cost floor is worked out.'],
                     ['Developer floor price', 'Not available', 'C', None, 'Without a land price, no cost floor can be worked out.']],
        build=420 if ccr else 380, build_lab='E', build_src='arcadis', build_note=ARC if ccr else ARC_RCR,
        expected=(avg, avg), exp_word='current average', expected_note=x['avg'],
        conf_note=f"Real prices: {x['avg']}. Sales: {sold_line}. Sizes are the main layouts in the developer's unit list. Checked {AS_OF_FILE}; prices of the units left can differ from the average.",
        sizes=_sizes(x['fp']), sizes_note="Sizes are the main layouts in the developer's unit list.",
        bull_add=0.0, bull_why='No new Confirmed catalyst near the site in the holding period, so the bull case equals the base case.',
        years=n, buy_year=2026, timeline=tl, towns=towns,
        who=(f"At the {sale} resale, buyers are Singaporeans and PRs with no income ceiling, mostly HDB upgraders from {towns[0]} and {towns[1]}." if ec else
             f"Most buyers at resale will be HDB upgraders from {towns[0]} and {towns[1]} and private-condo owners nearby" + (", plus investors; foreign buyers pay 60% Additional Buyer's Stamp Duty." if ccr else '.')),
        district=district(k, lh, gap, supply, 'caveats') if not ec else district_ec(k, gap, supply),
        district_summary=f"{x['area']}, {x['district']}: {x['region']}.",
        district_line=('Several new projects nearby compete for the same buyers.' if len(near_l) >= 2 else 'Little new supply nearby competes for the same buyers.'),
        plan=([[f"{m0[0]} {'station' if 'LRT' in m0[0] else 'MRT'}", f"About {m0[1]:,} m", 'Open', 'Already in prices', 'Confirmed', 'onemap']] if m0 else [])
             + [['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Sets the land use around the site', 'Confirmed', 'mp']],
        plan_line='No new Confirmed catalyst near the site in the holding period. Any growth has to come from the project itself and the wider market.',
        score=[['Location', sc['loc'][0], sc['loc'][1]], ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
               ['Nearby food', sc['food'][0], sc['food'][1]], ['MRT proximity', sc['mrt'][0], sc['mrt'][1]]],
        pros=x['pros'][:4], cons=x['cons'][:4],
        compare=[[a[0], (f"${PSF[norm(a[0])]:,}" if PSF.get(norm(a[0])) else ''), '', '', a[1]] for a in x['alts'][:3]],
        facts=[['Sales so far', x['sold'], 'R', 's0', AS_OF_FILE], ['Price', x['avg'], 'R', 's0', AS_OF_FILE], ['Land cost', x['land'], 'R', 's0', AS_OF_FILE],
               ['Completion', x['top'], 'R', 's0', AS_OF_FILE], ['Tenure', x['tenure'], 'C', 's0', AS_OF_FILE], ['MRT', x['mrt'], 'C', 'onemap', AS_OF_FILE]],
        faq_extra=[[f"Is {x['name']} a good buy now?", None], ['How many units are left?', f"{sold_line} (checked {AS_OF_FILE}). Ask the sales team which stacks are still available before deciding."]],
        src_extra={**s0, 'onemap': ONEMAP, 'mp': MP}, confidence='Medium',
        self_slugs=tuple({k, re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', x['name'].lower())), re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', (app.get('name') or '').lower()))}))
    return c, (k, k, homes, integ, False)


def district_ec(k, gap, supply):
    rows = [r for r in NEAR[k]['r3']['rows'] if r[12]]
    g = [r for r in rows if r[10] is not None and (r[6] or 0) >= 10]
    w1 = [r for r in rows if r[1] <= 1000]
    gt = (f"Nearby ECs with a 3-bed record moved {min(r[10] for r in g):.1f}% to {max(r[10] for r in g):.1f}% a year over the past 4 years ({', '.join(r[0] for r in g[:3])}; URA caveats)." if len(g) > 1
          else f"Few nearby ECs have a 3-bed price record over 4 years with 10 or more resales a year.")
    return [['10-year price trend', 'URA non-landed index about 4.7% a year islandwide. ' + gt, 'C', 'caveats'], ['New vs older resale gap', gap, 'C', 'caveats'],
            ['Volume and liquidity', f"{len(w1)} resale ECs within 1 km with {sum(r[6] or 0 for r in w1)} resales in the past 12 months. How fast units sell: Not available yet.", 'C', 'caveats'],
            ['Rents', 'Gross yields of nearby ECs: Not available yet. URA: suburban (OCR) rents rose 3.1% in Q3 2026.', 'C', 'ura'], ['Supply risk', supply, 'C', 'caveats']]


SELLING = [x for x in NL['L'] if x['soldPct'] < 95 and x['id'] != 'sophia-meadow']
P, META6 = {}, {}
for x in SELLING:
    P[x['id']], META6[x['id']] = make(x)
