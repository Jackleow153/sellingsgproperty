"""MRT and likely-future-buyer facts for the cards on /undervalued-pty/ (28 Nov 2026).

Resale condos (flagged on the value screen):
  MRT       nearest MRT/LRT exit, straight line from the condo's URA location (LTA MRT Station Exit, data.gov.sg
            d_b39d3a0871985372d7e1637193335da5); rail plans only from std_v2.RAIL (LTA-confirmed lines at existing stations).
  Buyers    HDB upgraders: 4-room and bigger flats completed 2020-2026 (MOP 2025-2031) in the HDB towns whose planning area
            (URA Master Plan 2025, data.gov.sg d_2cc750190544007400b2cfd5d7f53209) lies within 1 km (data/hdb-mop.json);
            landed owners: landed resales within 1.5 km in 5 years (URA, data/comp-tx.json 'landed');
            office workers: nearest office hub within 4 km (std_v2.HUBS, approximate points).
Selling-now condos: the MRT row, rail plans and exit buyers already in their condo analysis (assets/std/<id>.json).
  Walking  Stacked Homes condo directory: nearest MRT and walking time/distance (route-based), cached in data/geo/walk-cache.json;
            shown first, with the LTA straight line as a cross-check (both shown when they name different stations).
Run: python3 scripts/analysis/value_context.py  ->  data/value-context.json  (inputs in data/geo/, see their 'about')
"""
import json, math, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
import std_v2 as S

ROOT = S.ROOT
MRT_SRC = ['LTA MRT Station Exit (data.gov.sg)', 'https://data.gov.sg/datasets/d_b39d3a0871985372d7e1637193335da5/view']
PA_SRC = ['URA Master Plan 2025 Planning Area Boundary (data.gov.sg)', 'https://data.gov.sg/datasets/d_2cc750190544007400b2cfd5d7f53209/view']
HDB_SRC = ['HDB Property Information (data.gov.sg)', 'https://data.gov.sg/datasets/d_17f5382f26140b1fdae0ba2ef6239d2f/view']
# planning area -> HDB town (HDB towns that share a planning area's name; the old town centre counts as Central Area)
PA_TOWN = {'KALLANG': 'Kallang/Whampoa', 'NOVENA': 'Kallang/Whampoa', 'DOWNTOWN CORE': 'Central Area', 'OUTRAM': 'Central Area', 'ROCHOR': 'Central Area'}
MOP_FROM, MOP_TO = 2020, 2026   # completion years: these flats reach their 5-year MOP in 2025 to 2031


def km(a_lat, a_lon, b_lat, b_lon):
    return math.hypot((a_lat - b_lat) * 110.574, (a_lon - b_lon) * 111.320 * math.cos(math.radians(1.35)))


def seg_km(p, a, b):
    """Distance in km from point p to segment ab (lon/lat pairs), on a local flat projection."""
    kx, ky = 111.320 * math.cos(math.radians(1.35)), 110.574
    px, py = p[0] * kx, p[1] * ky; ax, ay = a[0] * kx, a[1] * ky; bx, by = b[0] * kx, b[1] * ky
    dx, dy = bx - ax, by - ay; L = dx * dx + dy * dy
    t = 0 if L == 0 else max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / L))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def rings(geom):
    if geom['type'] == 'Polygon': return [geom['coordinates']]
    return geom['coordinates']


def inside(pt, poly):
    x, y = pt; c = False
    for ring in poly:
        for i in range(len(ring)):
            (x1, y1), (x2, y2) = ring[i][:2], ring[i - 1][:2]
            if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c


def pa_dist(pt, geom):
    best = 1e9
    for poly in rings(geom):
        if inside(pt, poly): return 0.0
        for ring in poly:
            for i in range(1, len(ring)): best = min(best, seg_km(pt, ring[i - 1][:2], ring[i][:2]))
    return best


def station_name(s):
    s = re.sub(r'\s+(MRT|LRT) STATION$', '', s.strip().upper())
    return s.title().replace("'S", "'s")


GEO = os.path.join(ROOT, 'data', 'geo')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
SH_SLUG = {'CITYSCAPE @FARRER PARK': 'cityscape-at-farrer-park', 'UPTOWN @ FARRER': 'uptown-at-farrer', '8 @ MOUNT SOPHIA': '8-at-mount-sophia'}


def walk(k):
    """Nearest MRT by walking route from the Stacked Homes condo directory, cached (location facts rarely change)."""
    cf = os.path.join(GEO, 'walk-cache.json')
    cache = json.load(open(cf)) if os.path.exists(cf) else {}
    if k in cache: return cache[k]
    n = S.COMP['p'][k]['n']
    slug = SH_SLUG.get(n) or (S.HOMES.get(k) or {}).get('slug') or re.sub(r'[^a-z0-9]+', '-', n.lower().replace('@', ' at ')).strip('-')
    url = f'https://directory.stackedhomes.com/condo/{slug}/'
    try: h = subprocess.run(['curl', '-sL', '-m', '40', '-A', UA, url], capture_output=True, timeout=60).stdout.decode('utf-8', 'ignore')
    except Exception: h = ''
    t = re.sub(r'<script.*?</script>|<style.*?</style>', '', h, flags=re.S); t = re.sub(r'<[^>]+>', ' | ', t); t = re.sub(r'(\s*\|\s*)+', ' | ', t)
    m = re.search(r'What is the nearest MRT station\? \| ([^|]+?) \(([A-Z/ ]+)\), an? (\d+)-minute walk \(([\d.,]+ ?k?m)\)', t)
    res = None
    if m:
        d = m.group(4); metres = int(float(d.replace('km', '').replace(',', '')) * 1000) if 'km' in d else int(d.replace('m', '').replace(',', ''))
        res = dict(station=m.group(1).strip(), line=m.group(2).strip(), minutes=int(m.group(3)), m=metres, src=['Stacked Homes condo directory', url])
    if h: cache[k] = res; json.dump(cache, open(cf, 'w'), ensure_ascii=False, separators=(',', ':'))
    return res


def build():
    ex = json.load(open(os.path.join(GEO, 'mrt-exits.json')))['exits']
    pas = [(nm, {'type': typ, 'coordinates': co}) for nm, typ, co in json.load(open(os.path.join(GEO, 'planning-areas.json')))['areas']]
    R = json.load(open(os.path.join(ROOT, 'data', 'value-screen.json')))['rows']
    keys = {r['key'] for r in R if r.get('tag') in ('undervalued', 'price', 'check')}
    out = {}
    for k in sorted(keys):
        v = S.COMP['p'][k]; lat, lon = v['lat'], v['lon']
        # nearest exit, then the nearest exit of the next-nearest different station (for a second option)
        d = sorted(((km(lat, lon, a, b) * 1000, nm, code) for a, b, nm, code in ex))
        st = []
        for m, nm, code in d:
            if nm not in [s[1] for s in st]: st.append((m, nm, code))
            if len(st) == 2: break
        mrt = [dict(station=station_name(nm), kind='LRT' if 'LRT' in nm.upper() else 'MRT', exit=code, m=int(round(m, -1))) for m, nm, code in st]
        if mrt[0]['kind'] == 'LRT':   # also the nearest MRT (heavy rail) station
            hm = next(((m, nm, code) for m, nm, code in d if 'LRT' not in nm.upper()), None)
            if hm: mrt.append(dict(station=station_name(hm[1]), kind='MRT', exit=hm[2], m=int(round(hm[0], -1))))
        rail = []
        for s in mrt:
            r = S.RAIL.get(s['station'])
            if r and s['m'] <= 1000: rail.append(dict(line=r[0], year=r[1], station=s['station']))
        # HDB towns around the condo
        here = [(nm, pa_dist((lon, lat), g)) for nm, g in pas]
        towns = []
        for nm, dk in sorted(here, key=lambda t: t[1]):
            if dk > 1.0: continue
            t = PA_TOWN.get(nm, nm.title())
            if t in S.MOP and t not in towns: towns.append(t)
        mop = {t: n for t in towns for n in [sum(S.MOP[t].get(str(y), 0) for y in range(MOP_FROM, MOP_TO + 1))] if n > 0}
        own_pa = next((nm for nm, dk in here if dk == 0), None)
        landed = sum(x[2] for x in S.COMP['landed'] if km(lat, lon, x[0], x[1]) <= 1.5)
        hub = min(((nm, km(lat, lon, la, lo)) for nm, la, lo in S.HUBS), key=lambda t: t[1])
        out[k] = dict(name=S._tc(v['n']), mrt=mrt, walk=walk(k), rail=rail, pa=own_pa, towns=towns, mop=mop, landed5=landed,
                      hub=[hub[0], round(hub[1], 1)] if hub[1] <= 4 else None)
    return dict(_about=__doc__.strip().split('\n')[0], src=dict(mrt=MRT_SRC, pa=PA_SRC, hdb=HDB_SRC), mop_years=[MOP_FROM, MOP_TO], p=out)


if __name__ == '__main__':
    res = build()
    json.dump(res, open(os.path.join(ROOT, 'data', 'value-context.json'), 'w'), ensure_ascii=False, indent=0, separators=(',', ':'))
    print(len(res['p']), 'condos;', sum(1 for c in res['p'].values() if c['walk']), 'with a walking distance')
