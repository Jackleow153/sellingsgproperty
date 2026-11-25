"""All analyses on method v2. Run: python3 scripts/analysis/projects_v2.py > /tmp/std.json, then replace the STD line in
data/condo-analysis.html with these entries (keys = original file ids)."""
import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))
import std_v2
from batch1 import P as P1, SRC, HDB
from batch2 import P as P2

std_v2.SRC_BASE = SRC
std_v2.HDB_T = dict(HDB)
std_v2.HDB_T['Hougang'] = {'4-room': (618888, 591), '5-room': (783888, 255)}   # C: HDB resale records, Nov 2025 to Oct 2026

H = dict(
 name='Hougang Central', land=1179, land_src='HDB tender: $1,500,738,338 for 118,268 sq m of floor area, about $1,179 psf ppr', build=448, build_lab='E', build_src='gamuda',
 build_note='No developer cost published. We use the cost Gamuda filed for Chencharu Close, another HDB integrated site with a bus interchange, as the closest published figure.',
 expected=(2500, 2600), expected_note='PropNex expects above $2,500 psf and SRI $2,500 to $2,600 (Stacked Homes and EdgeProp, Dec 2025).',
 sizes={'2-bed': 700, '3-bed': 1000, '4-bed': 1345}, sizes_src='sizes', sizes_note='No unit mix released. Sizes borrowed from ParkTown Residence, the same developers\' last integrated condo (Stacked Homes).',
 bull_add=0.01, bull_why='Base plus 1 point for the Cross Island Line interchange at Hougang, Confirmed for 2030.',
 years=5, buy_year=2027, timeline="Buy at launch (UOL targets the second half of 2027). TOP is targeted for 2030 or 2031; Seller's Stamp Duty applies for 4 years, so we look at a sale in 2032, about a year after TOP (5 years). CICT expects the mall's construction to start only in 2027.",
 towns=['Hougang', 'Serangoon'],
 who='Most buyers at resale will be HDB upgraders from Hougang, Kovan and Serangoon, plus private-to-private movers and families near the four primary schools within about 1 km.',
 district=[['10-year price trend', 'URA non-landed index 134.9 (Q3 2016) to 212.7 (Q3 2026): about 4.7% a year islandwide. Hougang\'s 2018–19 launches grew 3.4% to 3.7% a year from launch to 2026 (Riverfront, The Florence).', 'C', 'ppi'],
           ['New vs 3-year-old resale gap', 'Analysts expect $2,500 to $2,600 psf here; The Florence and Riverfront (both completed 2023) trade at $1,904 and $1,747 (before the 5% area adjustment).', 'C', 'caveats'],
           ['Volume and liquidity', '100 resale condos within 3 km. The Florence had 103 resales and Riverfront 110 in the past 12 months. How fast units sell: Not available yet.', 'C', 'caveats'],
           ['Rents', 'Gross yields: The Florence 2.6%, Riverfront 2.7%, Sengkang Grand 2.4%. URA: rents in the suburbs (OCR) rose 3.1% in Q3 2026.', 'C', 'ura'],
           ['Supply risk', 'No other new private project within 2 km; the first government land sale in the area since 2019. About 830 homes here reach TOP together.', 'C', 'cl']],
 district_summary='Hougang is in a maturing phase: steady growth, deep resale liquidity, and very little new private supply nearby.',
 district_line='This district is maturing: prices have risen steadily and there is little competing supply, but the expected launch price is well above what the nearest condos support.',
 plan=[['Hougang MRT becomes a Cross Island Line interchange', 'On site', 'CRL Phase 1 targeted for 2030', 'Faster east-west trips; the main catalyst', 'Confirmed', 'lta'],
       ['The integrated development: mall of about 300,000 sq ft, new bus interchange, town plaza', 'On site', 'Target 2030/2031; mall construction expected to start 2027', 'Daily convenience; also footfall and noise', 'Confirmed', 'cl'],
       ['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Sets the land use around the site', 'Confirmed', 'mp'],
       ['Defu industrial area: housing mix under study, linked to the Paya Lebar Air Base move', 'About 2 to 3 km, not measured', 'No date', 'More homes nearby later', 'Planned', 'dmp']],
 plan_line='Only the Cross Island Line interchange and the integrated hub itself are Confirmed. The CRL adds 1 point a year to the bull case only.',
 score=[['Location', 8, 'Hougang town centre on an MRT interchange (North East Line now, Cross Island Line 2030, Confirmed) with the town\'s largest mall on site; deep upgrader pool (591 four-room resales a year in Hougang).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 8, 'A mall of about 300,000 sq ft on site (Confirmed) and Hougang Mall about 200 m away (OneMap). Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 10, 'Integrated with Hougang MRT (NE14), Confirmed by HDB\'s tender and the developers.']],
 pros=['Directly on an MRT interchange, with the Cross Island Line Confirmed for 2030', 'The town\'s largest mall, a bus interchange and a town plaza on site', 'Very little new private supply within 2 km', 'Deep, liquid resale market around it'],
 cons=['The expected launch price is well above what the closest competitors support', 'Large 3-bed and 4-bed quanta outrun local upgraders at resale', 'Footfall and noise from the interchange and mall', 'Mall construction only starting in 2027'],
 compare=[['ParkTown Residence', '$2,360', 'Feb 2025', 'Mall, hawker centre, bus interchange', 'Integrated twin'], ['Sengkang Grand Residences', '$1,747 at launch', 'May 2019', 'Next to Buangkok MRT', 'Grew about 2.4% a year since launch']],
 facts=[['Land price', '$1,500,738,338, about $1,179 psf ppr', 'C', 'hdb', '14 Jan 2026'], ['Bids', '3; next bids about $1,155 and $1,100 psf ppr', 'C', 'edgeprop', '16 Dec 2025'],
        ['Homes', 'About 830 (HDB estimated up to 835)', 'C', 'cl', '14 Jan 2026'], ['Tenure', '99 years', 'C', 'hdb', '14 Jan 2026'],
        ['Launch', 'Target second half of 2027, not announced', 'R', 'uol', '12 Aug 2026'], ['Completion', 'Target 2030 / 2031 for the development', 'C', 'cl', '14 Jan 2026'],
        ['Expected price', '$2,500 to $2,600 psf (analysts)', 'E', 'stacked', '16 Dec 2025'], ['Price list, unit mix, floor plans', 'Not available yet', 'C', 'cl', '25 Nov 2026']],
 faq_extra=[['Is Hougang Central a good investment?', None], ['When will the price list be out?', 'Not announced. UOL targets a launch in the second half of 2027. This analysis will be updated with the real prices and sizes.']],
 src_extra={'hdb': ['HDB tender result, 14 Jan 2026', 'https://www.hdb.gov.sg/-/media/business-partners/land-developers-and-land-users/buying-land-land-sales/sites-sold-by-hdb/Mix-Residential-Site-Sold-14-Jan-2026.pdf'],
            'cl': ['CapitaLand / CICT news release, 14 Jan 2026', 'https://www.capitaland.com/en/about-capitaland/newsroom/news-releases/international/2026/january/CICT-and-consortium-awarded-hougang-central-site.html'],
            'uol': ['UOL 1H2026 results presentation (SGX), 12 Aug 2026', 'https://links.sgx.com/FileOpen/UOL%201H2026%20Results%20Presentation.ashx?App=Announcement&FileID=900463'],
            'lta': ['LTA, next phase of rail development, Mar 2026', 'https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/3/news-releases/next-phase-of-rail-development.html'],
            'edgeprop': ['EdgeProp, CapitaLand-UOL tops bid at $1,179 psf ppr, Dec 2025', 'https://www.edgeprop.sg/property-news/capitaland-uol-group-tops-bid-mixed-use-development-plot-hougang-central-15-bil-bid-or-1179-psf-ppr'],
            'stacked': ['Stacked Homes, Hougang Central bid may put prices above $2,500 psf, 16 Dec 2025', 'https://stackedhomes.com/capitaland-uols-1-5-billion-hougang-central-bid-may-put-future-prices-above-2500-psf/'],
            'sizes': ['Stacked Homes, ParkTown Residence unit mix, 23 Jan 2025', 'https://stackedhomes.com/is-the-upcoming-1193-unit-parktown-residence-in-tampines-worth-a-look-heres-all-you-need-to-know/'],
            'mp': ['URA, Master Plan 2025 gazetted, 1 Dec 2025', 'https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr25-64'],
            'dmp': ['URA, Draft Master Plan 2025 release, 25 Jun 2025', 'https://www.ura.gov.sg/news/media/pr25-32/']},
 confidence='Low')

P = {'hougang-central-site': H}
P.update(P1); P.update(P2)
META = {  # nearby / geo keys, file slug, homes, integrated, heavy competing supply at the exit
 'hougang-central-site': ('hougang-central-mixed-use', 'hougang-central-mixed-use', 830, True, False),
 'chencharu-central-residences': ('chencharu-central-residences', 'chencharu-central-residences', 875, True, False),
 'one-chuan-grove': ('one-chuan-grove', 'one-chuan-grove', 1056, False, True),
 'bayshore-drive-site': ('bayshore-drive-mixed-use-gls', 'bayshore-drive-mixed-use-gls', 1280, True, True),
 'upper-thomson-road-parcel-a': ('upper-thomson-road-parcel-a', 'upper-thomson-road-parcel-a', 595, False, True),
 'lentor-signature': ('lentor-central-gls-4th-site', 'lentor-central-gls-4th-site', 555, False, True),
 'bedok-rise-site': ('bedok-rise-gls', 'bedok-rise-gls', 380, False, True)}
BUY_YEAR = {'chencharu-central-residences': 2027, 'one-chuan-grove': 2027, 'bayshore-drive-site': 2028}
for pid, (nk, fs, homes, integ, heavy) in META.items():
    c = P[pid]
    c.update(nearby_key=nk, geo_key=nk, file_slug=fs, homes=homes, integrated=integ, heavy_supply=heavy)
    c.setdefault('buy_year', BUY_YEAR.get(pid))
    c['years'] = int(c['years'])

if __name__ == '__main__':
    print(json.dumps({pid: std_v2.build(pid, c) for pid, c in P.items()}, ensure_ascii=False, separators=(',', ':')))
