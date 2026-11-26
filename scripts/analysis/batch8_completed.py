"""Batch 8 on method v2 (26 Nov 2026): completed condos (CX deep-dive files), resale mode. The price tested is the condo's own recent
resales by unit size (URA caveats); competitors are converted to a condo of the same age with the age pattern of the new-launch premium.
Built from the sourced data the deep dive already shows (CX: developer, lease, unit mix, MRT, schools; XSCORE scores and sources). Imported by projects_v2.py."""
import json, os, re, subprocess
import std_v2
from batch7_post import _grab
from batch5_prime import MP, ONEMAP

CX, XS = _grab('CX'), _grab('XSCORE')
COMP = std_v2.COMP['p']
norm = lambda t: re.sub(r'[^a-z0-9]', '', t.lower())
TOWNS8 = {'panorama': ['Ang Mo Kio', 'Yishun'], 'sky-vue': ['Bishan', 'Ang Mo Kio'], 'sky-habitat': ['Bishan', 'Ang Mo Kio'], 'thomson-three': ['Bishan', 'Ang Mo Kio'],
          'thomson-impressions': ['Bishan', 'Ang Mo Kio'], 'amo-residence': ['Ang Mo Kio', 'Bishan'], 'centro-residences': ['Ang Mo Kio', 'Bishan'],
          'lentor-modern': ['Ang Mo Kio', 'Yishun'], 'jadescape': ['Bishan', 'Toa Payoh']}


def ura_key(name):
    n = norm(name); alts = {n, norm(re.sub(r'^the\s+', '', name, flags=re.I)), 'the' + n}
    return next((k for k, v in COMP.items() if norm(v['n']) in alts), None)


def sizes_from(mix):
    out = {}
    for b, rng, _u in mix:
        m = re.match(r'(\d)BR', b)
        if not m or int(m.group(1)) not in (2, 3, 4): continue
        v = [int(x.replace(',', '')) for x in re.findall(r'\d[\d,]*', rng)]
        if v: out[f'{m.group(1)}-bed'] = int(round(min(v) / 5) * 5)   # the smaller, main layout of each type
    return out


P, META8 = {}, {}
for k, cx in CX.items():
    xs = XS.get(k) or {}
    name = xs.get('name') or k.replace('-', ' ').title()
    uk = ura_key(name)
    if not uk: continue
    v = COMP[uk]; h = std_v2.HOMES.get(uk) or {}
    top = h.get('top') or (cx.get('leaseY', 2013) + 4)
    lh = not re.search(r'freehold|999', str(v['t']), re.I)
    homes = int(re.search(r'\d[\d,]*', cx.get('unitsTxt', '0')).group().replace(',', '')) if re.search(r'\d', cx.get('unitsTxt', '')) else (h.get('units') or 500)
    loc = (xs.get('scores', {}).get('loc') or [0, ''])[1]
    region = 'CCR' if 'Prime' in loc else 'RCR' if 'City fringe' in loc else 'OCR'
    own = v['m12'][0]
    std_v2.GEO.setdefault(k, {'lat': v['lat'], 'lon': v['lon']})
    std_v2.NEAR.setdefault(k, {'mrt': [[m[0], m[1]] for m in cx.get('mrt') or []], 'schools': cx.get('schools') or []})
    sizes = sizes_from(cx.get('mix') or [])
    m0 = (cx.get('mrt') or [None])[0]
    sc = xs.get('scores', {})
    towns = TOWNS8.get(k, ['Ang Mo Kio', 'Bishan'])
    g = v.get('gA')
    c = dict(
        name=name, resale=True, top_year=top, own_key=uk, self_names=(v['n'],), self_slugs=(k,), leasehold=lh, region=region, ec=bool(v['ec']),
        expected=(own, own), exp_word='recent resale average', expected_note=f"{name}'s own resales: median {own:,} psf over the last 12 months ({v['m12'][1]} resales, URA caveats).",
        conf_note=f"Prices tested are {name}'s own resales of each unit size (URA caveats, last 6 to 24 months). Completed in {top}; lease {cx.get('lease', 'not stated')}.",
        sizes=sizes or {'3-bed': 1000}, sizes_note="Sizes are the smaller, main layout of each bedroom type in the unit mix.",
        land=None, land_src='', build=380, build_lab='E', build_src='arcadis', build_note='',
        priceA_none=[['Land', 'Not relevant for a completed condo', 'C', None, 'The price tested is the resale market, not the developer cost.'],
                     ['Developer floor price', 'Not relevant', 'C', None, 'The condo is completed and sold.']],
        bull_add=0.0, bull_why='No new Confirmed catalyst near the condo in the holding period, so the bull case equals the base case.',
        years=4, buy_year=2026, launch_year=2026,
        timeline=f"Buy a resale now (November 2026). Seller's Stamp Duty applies for 4 years, so we look at a sale in 2030. The condo was completed in {top}.",
        towns=towns,
        who=f"Most buyers at resale will be HDB upgraders from {towns[0]} and {towns[1]}, plus private-condo owners nearby moving or right-sizing.",
        district=[['10-year price trend', f"URA non-landed index about 4.7% a year islandwide." + (f" {name} itself moved {g:.1f}% a year over the past 4 years (all sizes, URA caveats)." if g is not None else ''), 'C', 'caveats'],
                  ['Volume and liquidity', f"{name}: {v['m12'][1]} resales in the past 12 months (URA caveats).", 'C', 'caveats'],
                  ['Rents', (f"Median rent about ${v['rent'][0]:.2f} psf a month ({v['rent'][1]} contracts, URA)." if v.get('rent') else 'Not available.'), 'C', 'caveats']],
        district_summary=f"{name}, completed {top}.", district_line=f"{name} resells regularly; see the competitors and supply sections for the local market.",
        plan=([[f"{m0[0]} MRT", f"About {m0[1]:,} m", 'Open', 'Already in prices', 'Confirmed', 'onemap']] if m0 else [])
             + [['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Sets the land use around the condo', 'Confirmed', 'mp']],
        plan_line='No new Confirmed catalyst near the condo in the holding period. Any growth has to come from the market.',
        score=[['Location', (sc.get('loc') or [6, ''])[0], (sc.get('loc') or [6, ''])[1]], ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
               ['Nearby food', (sc.get('food') or [5, ''])[0], (sc.get('food') or [5, ''])[1]], ['MRT proximity', (sc.get('mrt') or [5, ''])[0], (sc.get('mrt') or [5, ''])[1]]],
        pros=[xs['verdict']] if xs.get('verdict') else [], cons=[], compare=[],
        facts=[['Developer', cx.get('dev', ''), 'C', 'caveats', ''], ['Lease', f"From {cx.get('lease', 'not stated')}" if lh else 'Freehold', 'C', 'caveats', ''],
               ['Homes', cx.get('unitsTxt', ''), 'C', 'caveats', ''], ['Completed', str(top), 'C', 'caveats', ''],
               ['Highest psf on record', cx.get('hi', ''), 'R', 'caveats', ''], ['Lowest psf on record', cx.get('lo', ''), 'R', 'caveats', '']],
        faq_extra=[[f"Is {name} a good buy at today's resale prices?", None], ['What does a typical resale cost?', f"The median over the last 12 months was {own:,} psf ({v['m12'][1]} resales, URA caveats); see the unit-type table for each size."]],
        src_extra={**{f's{i}': [a[0], a[1]] for i, a in enumerate(xs.get('src') or [])}, 'onemap': ONEMAP, 'mp': MP}, confidence='Medium')
    P[k] = c; META8[k] = (k, k, homes, False, False)
