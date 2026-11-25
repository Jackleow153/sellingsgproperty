"""Batch 1 analyses to docs/ANALYSIS-STANDARD.md: Chencharu Central Residences, One Chuan Grove, Bayshore Drive site.
Run: python3 scripts/analysis/batch1.py > /tmp/batch1.json, then merge into the STD line of data/condo-analysis.html
(keys are the original NL.U file ids). Inputs carry C / R / E labels and source keys; see SRC."""
import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from std_lib import *

AS_OF = '25 Nov 2026'
IDX = {'2024Q4': 203.4, '2025Q1': 205.4, '2026Q2': 210.6, '2026Q3': 212.7}   # C: URA non-landed price index
SRC = {
 'ppi': ['URA private residential price index, non-landed (data.gov.sg), Q3 2026', 'https://data.gov.sg/datasets/d_97f8a2e995022d311c6c68cfda6d034c/view'],
 'ura': ['URA, 3rd Quarter 2026 real estate statistics, 23 Oct 2026', 'https://www.ura.gov.sg/news/media/pr26-73/'],
 'mall': ['Our mall-condo study: yearly psf from URA caveats via Stacked Homes, Nov 2026', '/insights/integrated-mall-condo-returns-2026/'],
 'iras': ["IRAS, Buyer's Stamp Duty rates", "https://www.iras.gov.sg/taxes/stamp-duty/for-property/buying-or-acquiring-property/buyer's-stamp-duty-(bsd)-for-all-property-buyers"],
 'ssd': ["MAS / MOF / MND, Seller's Stamp Duty holding period, 3 Jul 2025", 'https://www.mas.gov.sg/news/media-releases/2025/extension-of-the-holding-period-of-sellers-stamp-duty-and-higher-ssd-rates'],
 'mas': ['MAS, property loan rules (TDSR, LTV, 4% medium-term rate)', 'https://www.mas.gov.sg/regulation/explainers/new-housing-loans'],
 'singstat': ['SingStat, Key Household Income Trends 2025 (preliminary), Feb 2026', 'https://www.singstat.gov.sg/-/media/files/visualising_data/infographics/households/key-household-income-trends-2025.ashx'],
 'hdbresale': ['HDB resale flat prices (data.gov.sg), Nov 2025 to Oct 2026, our medians', 'https://data.gov.sg/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view'],
 'parktown': ['EdgeProp, ParkTown Residence average $2,360 psf, Feb 2025', 'https://edgeprop.sg/property-news/uol-capitaland-moves-1041-units-parktown-residence-launch-day-average-price-achieved-2360-psf'],
 'arcadis': ['Arcadis Construction Cost Handbook Singapore 2022', 'https://media.arcadis.com/-/media/project/arcadiscom/com/perspectives/asia/publications/cch/2022/singapore-construction-cost-handbook-2022.pdf?rev=842b76624b8c40a0affc61f99debde9f'],
 'gamuda': ['Gamuda Berhad Bursa filing, 29 Sep 2025 (Chencharu Close), as set out on chencharuyishun.sg', 'https://chencharuyishun.sg/developer/'],
}
MALL = {  # C: launch (year, psf), completion year and yearly average psf from URA caveats (our mall-condo study)
 'North Park Residences': (2015.3, 1374, 2018, {'2015': 1359, '2016': 1310, '2017': 1319, '2018': 1317, '2019': 1572, '2020': 1472, '2021': 1563, '2022': 1654, '2023': 1766, '2024': 1809, '2025': 1865, '2026': 1863}),
 'Symphony Suites': (2015.1, 1016, 2018, {'2015': 1026, '2016': 1052, '2017': 1049, '2018': 1090, '2019': 1126, '2020': 1104, '2021': 1139, '2022': 1189, '2023': 1243, '2024': 1299, '2025': 1343, '2026': 1364}),
 'Hillion Residences': (2013.2, 1275, 2017, {'2015': 1399, '2016': 1376, '2017': 1472, '2018': 1468, '2019': 1517, '2020': 1443, '2021': 1501, '2022': 1597, '2023': 1720, '2024': 1739, '2025': 1819, '2026': 1796}),
 'Sengkang Grand Residences': (2019.4, 1747, 2023, {'2019': 1747, '2020': 1731, '2021': 1720, '2022': 1812, '2023': 2001, '2024': 2027, '2025': 2016, '2026': 2091}),
 'Watertown': (2012.05, 1169, 2017, {'2015': 1167, '2016': 1213, '2017': 1322, '2018': 1358, '2019': 1341, '2020': 1348, '2021': 1391, '2022': 1523, '2023': 1637, '2024': 1669, '2025': 1758, '2026': 1728}),
 'Forest Woods': (2016.5, 1408, 2020, {'2016': 1408, '2017': 1408, '2018': 1540, '2019': 1559, '2020': 1658, '2021': 1672, '2022': 1795, '2023': 1910, '2024': 1985, '2025': 2031, '2026': 2160}),
 'Park Colonial': (2018.5, 1725, 2022, {'2018': 1748, '2019': 1800, '2020': 1933, '2021': 1944, '2022': 2021, '2023': 2097, '2024': 2237, '2025': 2259, '2026': 2374}),
 'The Tre Ver': (2018.6, 1555, 2022, {'2018': 1555, '2019': 1613, '2020': 1640, '2021': 1735, '2022': 1803, '2023': 1909, '2024': 1935, '2025': 1975, '2026': 2003}),
 'Parc Esta': (2018.7, 1701, 2022, {'2018': 1701, '2019': 1692, '2020': 1705, '2021': 1789, '2022': 2049, '2023': 2119, '2024': 2235, '2025': 2289, '2026': 2331}),
 'The Woodleigh Residences': (2018.9, 2036, 2024, {'2018': 2033, '2019': 1851, '2020': 1924, '2021': 2151, '2022': 2179, '2023': 2293, '2024': 2311, '2025': 2446, '2026': 2484}),
 'Bedok Residences': (2011.9, 1350, 2015, {'2015': 1426, '2016': 1373, '2017': 1393, '2018': 1440, '2019': 1468, '2020': 1448, '2021': 1491, '2022': 1559, '2023': 1651, '2024': 1745, '2025': 1862, '2026': 1817}),
 'Waterfront Isle': (2011.1, 920, 2015, {'2015': 1162, '2016': 1128, '2017': 1145, '2018': 1175, '2019': 1185, '2020': 1212, '2021': 1228, '2022': 1304, '2023': 1502, '2024': 1572, '2025': 1609, '2026': 1701}),
 'Archipelago': (2011.95, 1000, 2015, {'2016': 1138, '2017': 1183, '2018': 1242, '2019': 1180, '2020': 1145, '2021': 1172, '2022': 1315, '2023': 1442, '2024': 1486, '2025': 1587, '2026': 1564}),
 'Urban Vista': (2013.2, 1494, 2016, {'2014': 1203, '2017': 1434, '2018': 1434, '2019': 1406, '2020': 1282, '2021': 1374, '2022': 1432, '2023': 1536, '2024': 1542, '2025': 1539, '2026': 1553}),
}
UNITS_MALL = {'North Park Residences': 920, 'Symphony Suites': 660, 'Hillion Residences': 546, 'Sengkang Grand Residences': 680, 'Watertown': 992, 'Forest Woods': 519, 'Park Colonial': 805, 'The Tre Ver': 729, 'Parc Esta': 1399, 'The Woodleigh Residences': 667, 'Bedok Residences': 583, 'Waterfront Isle': 561, 'Archipelago': 577, 'Urban Vista': 582}
HDB = {  # C: our medians from HDB resale records, Nov 2025 to Oct 2026 [price, deals]
 'Yishun': {'4-room': (550000, 796), '5-room': (693194, 266)}, 'Sembawang': {'4-room': (600000, 393), '5-room': (639444, 244)},
 'Serangoon': {'4-room': (653444, 180), '5-room': (838000, 69)}, 'Ang Mo Kio': {'4-room': (620000, 287), '5-room': (981500, 146)},
 'Bishan': {'4-room': (788000, 200), '5-room': (970000, 122)}, 'Bedok': {'4-room': (612500, 538), '5-room': (820000, 232)},
 'Tampines': {'4-room': (665500, 922), '5-room': (815000, 597)}}

P = {}
# ------------------------------------------------------------------ Chencharu
P['chencharu-central-residences'] = dict(
 name='Chencharu Central Residences', land=980, land_src='Gamuda filing / HDB award: $1,012,588,989.89, about $980 psf ppr (C)', build=448, build_lab='R', build_src='gamuda',
 build_note="This project's own preliminary main construction cost in Gamuda's Bursa filing (it includes the podium for the bus interchange and hawker centre).",
 route1=[('ParkTown Residence launch average (integrated, mature town)', 2360, '2025Q1', 'parktown'), ('Tengah Garden Residences launch average (first private condo in a new HDB town)', 2120, '2026Q2', 'tengah')],
 route2=('North Park Residences', 1934, 'Integrated with Northpoint City at Yishun MRT, completed 2018. URA median, 24 resales in the past 12 months.', 0.0, (0.15, 0.20), 'About 11 more years of lease and a brand-new building against an 8-year-old condo.'),
 expected=(2300, 2450), expected_note='PropNex and Knight Frank expected above $2,300 psf at the tender (The Business Times, Sep 2025); an agency guide price of about $1.3M for a 527 sq ft 2-bed implies about $2,470 psf.',
 sizes={'2-bed': 600, '3-bed': 880, '4-bed': 1090, '5-bed': 1330}, sizes_src='tagency', sizes_note='Sizes from a PropNex agency ebook (Reported), 527 to 1,389 sq ft; the developer has not released floor plans.',
 comps=['North Park Residences', 'Symphony Suites', 'Hillion Residences', 'Sengkang Grand Residences', 'Watertown'], bull_add=0.005,
 bull_why='Base plus 0.5 point as the Chencharu estate fills in (HDB plan, Confirmed); the North-South Corridor road opens from 2029 (Confirmed) but is not a new train line.',
 years=5, top_month=54, timeline="Buy at the reported launch (end January 2027). No TOP date is published: HDB's completion period runs to September 2032 (Confirmed), and we assume keys around mid-2031. Seller's Stamp Duty applies for 4 years, so we test a sale in early 2032 (5 years) and also 6 years.",
 towns=['Yishun', 'Sembawang'],
 who='Most buyers at resale will be HDB upgraders from Yishun and Sembawang, plus Chencharu BTO owners later (their 5-year minimum occupation periods end mostly after 2032). Families near Khatib and Yishun schools add to the pool.',
 district=[
  ['10-year price trend', 'URA non-landed index about 4.7% a year islandwide (Q3 2016 to Q3 2026). Yishun\'s integrated North Park Residences grew 2.7% a year from launch in 2015 to 2026; Symphony Suites 2.5%.', 'C', 'mall'],
  ['New vs older resale gap', 'Expected $2,300 to $2,450 psf here against North Park Residences at $1,934 (URA, past 12 months) and The Wisteria (completed 2018, mixed-use) at $1,395. A new buyer pays 19% to 27% more than North Park, Yishun\'s best-performing condo.', 'C', 'caveats'],
  ['Volume and liquidity', '25 resale condos within 3 km, only 2 within 1 km: a thin private resale market. How fast units sell: Not available yet.', 'C', 'caveats'],
  ['Rents', 'Gross yields: North Park Residences 2.7%, Symphony Suites 3.4% (our study). URA: suburban (OCR) rents rose 3.1% in Q3 2026.', 'C', 'ura'],
  ['Supply risk', 'No other private condo within 2 km. The Miltonia Close executive condo site (about 2.1 km) and Canberra Drive EC site (about 2.9 km) add EC supply. About 10,000 homes are planned in Chencharu by 2040, at least 80% public.', 'C', 'hdbplan']],
 district_summary='Yishun is a value market: steady but slower growth, a thin private resale pool near Khatib, and a large HDB upgrader base.',
 district_line='This district is in a steady, value phase: Yishun condos grew about 2.5% to 2.7% a year, and the private resale pool near Khatib is thin, so the exit depends on HDB upgraders.',
 plan=[['Chencharu estate: about 10,000 homes by 2040, at least 80% public, a new park and Chencharu Link, a 400 m bus-only road', 'Around the site', 'Over the next 15 years', 'Amenities and buses; also a large new HDB supply', 'Confirmed', 'hdbplan'],
       ['The integrated podium: bus interchange (at least 5,400 sq m), hawker centre (at least 3,500 sq m), supermarket', 'On site', 'With the project (completion period to Sep 2032)', 'Daily convenience; footfall and noise', 'Confirmed', 'gamuda'],
       ['North-South Corridor: viaduct from 2029, city-bound tunnel from 2031', 'Along the north-south spine', 'Phased from 2029', 'Faster bus and car trips south', 'Confirmed', 'lta_nsc'],
       ['Educational institution and nursing home in Chencharu', 'In the estate', 'No date', 'Local amenities', 'Planned', 'mothership']],
 plan_line='The estate plan and the North-South Corridor are Confirmed but modest catalysts; no new MRT line is planned near Khatib, so the base case gets no transport premium.',
 score=[['Location', 6, 'A new estate inside mature Yishun, one stop from Northpoint City at Yishun MRT; large upgrader pool (796 four-room resales a year in Yishun). Not a town centre.'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 9, 'A hawker centre of at least 3,500 sq m and a supermarket inside the development (Confirmed, Gamuda filing). Not open until the project is complete.'],
        ['MRT proximity', 7, 'Within 450 m of Khatib MRT (Confirmed, Gamuda filing): about a 6-minute walk.']],
 pros=['Bus interchange, hawker centre and supermarket in the development', 'Lowest land rate of the three ($980 psf ppr), so the lowest developer floor', 'Within 450 m of Khatib MRT, one stop from Northpoint City', 'No other private condo within 2 km'],
 cons=['Comparable Yishun condos grew only about 2.5% to 3.4% a year', 'Thin private resale market near Khatib; exit relies on HDB upgraders', 'Large new HDB supply in Chencharu through 2040', 'Completion period runs to September 2032'],
 compare=[['ParkTown Residence', '$2,360', 'Feb 2025', 'Bus interchange, hawker centre, mall', 'Not tested'], ['Tengah Garden Residences', '$2,120', 'Apr 2026', 'First private condo in a new town', 'Not tested'], ['North Park Residences', '$1,374 at launch', 'Apr 2015', 'Integrated, Yishun MRT', '3.4% a year to TOP+1']],
 facts=[['Land price', '$1,012,588,989.89, about $980 psf ppr', 'C', 'gamuda', '26 Sep 2025'], ['Bids', '3; next bids about $818 and $670 psf ppr', 'C', 'edgeprop_c', '11 Sep 2025'],
        ['Homes', 'About 875 (HDB estimate; may vary)', 'R', 'gamuda', '29 Sep 2025'], ['Tenure', '99 years', 'C', 'gamuda', '29 Sep 2025'],
        ['Launch', 'End January 2027 (agency ebook); Q1 2027 target (Malaysian press)', 'R', 'guide', '18 Nov 2026'], ['Completion period', 'To September 2032 (84 months from award)', 'C', 'gamuda', '26 Sep 2025'],
        ['Price list, floor plans', 'Not available yet', 'C', 'guide', '25 Nov 2026']],
 faq_extra=[['Is Chencharu Central Residences a good investment?', None], ['How does it compare with Chencharu BTO flats?', 'They serve different buyers: a Chencharu Acres 4-room BTO flat is $353,000 to $428,000 before grants (HDB, Nov 2026), with income and ownership rules. See our Chencharu guide for the side-by-side.']],
 src_extra={'tengah': ['Hong Leong Holdings, Tengah Garden Residences 99% sold at $2,120 psf, Apr 2026', 'https://www.hongleong.com.sg/tengah-garden-residences-99-sold-at-launch/'],
            'caveats': ['URA private residential transactions (caveats), Nov 2025 to Oct 2026', '/condo-analysis/chencharu-central-residences/#near'],
            'hdbplan': ['HDB, Masterplan for Chencharu, 12 Jun 2024', 'https://www.hdb.gov.sg/about-us/news-and-publications/press-releases/HDB-Unveils-Masterplan-for-Chencharu'],
            'lta_nsc': ['LTA, North-South Corridor timeline, Sep 2026, as set out on chencharuyishun.sg', 'https://chencharuyishun.sg/location/'],
            'mothership': ['Mothership, citing HDB, 12 Jun 2024 (Reported)', 'https://chencharuyishun.sg/facts/'],
            'edgeprop_c': ['EdgeProp, Chencharu Close tender, Sep 2025', 'https://www.edgeprop.sg/property-news/evia-real-estate-led-consortium-submits-top-bid-980-psf-ppr-first-mixed-use-site-chencharu-close'],
            'tagency': ['PropNex agency ebook, 16 Nov 2026, as set out on chencharuyishun.sg (Reported)', 'https://chencharuyishun.sg/floor-plans/'],
            'guide': ['Our Chencharu guide, chencharuyishun.sg', 'https://chencharuyishun.sg/']},
 chart_comps=['North Park Residences', 'Symphony Suites'], confidence='Low',
)
# ------------------------------------------------------------------ One Chuan Grove
P['one-chuan-grove'] = dict(
 name='One Chuan Grove', land=1355, land_src='Two URA parcels, $1,376 and $1,331 psf ppr; blended $1,355 (our division of the total price by combined floor area)', build=380, build_lab='E', build_src='arcadis',
 build_note='No developer cost published. Arcadis 2022 put above-average condos at S$2,550 to 3,350 per sq m of construction area (about $237 to $311 psf); allowing for construction area above floor area and cost rises since 2022 gives about $380 psf of floor area.',
 route1=[('Chuan Park launch average (next door, at Lorong Chuan MRT)', 2579, '2024Q4', 'chuanpark')],
 route2=('Park Colonial', 2374, 'Next to Woodleigh MRT, completed 2022, about 3 km away. 2026 average from URA caveats.', 0.0, (0.10, 0.15), 'About 7 more years of lease and a brand-new building against a 4-year-old condo.'),
 expected=(2600, 2800), expected_note='PropNex about $2,600 and SRI about $2,800 psf (99.co, Sep 2025).',
 sizes={'2-bed': 646, '3-bed': 893, '4-bed': 1200, '5-bed': 1561}, sizes_src='ocg_sizes', sizes_note='Sizes from the developer (474 to 1,561 sq ft, Confirmed) and reported layouts; typical size per type used.',
 comps=['Forest Woods', 'Park Colonial', 'The Tre Ver', 'Parc Esta', 'The Woodleigh Residences'], bull_add=0.0,
 bull_why='No new Confirmed catalyst near the site: the Circle Line loop opened in July 2026 and is already in today\'s prices, so the bull case equals the base case.',
 years=4.5, top_month=41, timeline="Buy at the reported February 2027 preview. Completion is reported for 16 July 2030 (project signboard). Seller's Stamp Duty ends in February 2031, so we test a sale about a year after TOP, in mid-2031 (4.5 years), and also 5.5 years.",
 towns=['Serangoon', 'Ang Mo Kio', 'Bishan'],
 who='Most buyers at resale will be HDB upgraders from Serangoon, Ang Mo Kio and Bishan, plus private-to-private movers and families chasing St. Gabriel\'s, Kuo Chuan Presbyterian and CHIJ Our Lady of Good Counsel within about 1 km (reported).',
 district=[
  ['10-year price trend', 'URA non-landed index about 4.7% a year islandwide. Nearby 2016–2018 launches grew 3.1% to 4.2% a year from launch to 2026 (Forest Woods, Park Colonial, The Tre Ver, Woodleigh).', 'C', 'mall'],
  ['New vs older resale gap', 'Expected $2,600 to $2,800 psf against The Scala (completed 2013, next door) at $1,991 and Park Colonial (2022) at $2,374: 10% to 41% more.', 'C', 'caveats'],
  ['Volume and liquidity', '162 resale condos within 3 km, 17 within 1 km: a deep, liquid market. How fast units sell: Not available yet.', 'C', 'caveats'],
  ['Rents', 'Gross yields: Park Colonial 2.8%, Forest Woods 2.3%, The Tre Ver 3.0% (our study). URA: suburban rents rose 3.1% in Q3 2026.', 'C', 'ura'],
  ['Supply risk', 'Heavy around the exit: Chuan Park (916 homes) next door completes first, and the third Chuan Grove site (about 930 homes) was released on the Reserve List on 27 Oct 2026. Thomson Reserve (1,268 homes) is about 4 km away.', 'C', 'reserve']],
 district_summary='Lorong Chuan is a mature, well-connected market with deep resale liquidity, but about 3,000 new homes will compete within a short walk.',
 district_line='This district is mature and liquid, but entering an oversupplied phase around the exit: One Chuan Grove, Chuan Park and the next Chuan Grove site add about 2,900 homes within a few hundred metres.',
 plan=[['Circle Line loop (Stage 6) opened; Lorong Chuan is one stop from Serangoon and Bishan interchanges', 'At the MRT', 'Opened 12 Jul 2026', 'Better connectivity, already in prices', 'Confirmed', 'lta_ccl'],
       ['Third Chuan Grove site, about 930 homes, on the Reserve List', 'Next door', 'Released 27 Oct 2026; sold only if a developer triggers it', 'Competing supply at the exit', 'Confirmed', 'reserve'],
       ['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Keeps the area residential', 'Confirmed', 'mp']],
 plan_line='No major transformation is planned near this site. Any growth has to come from the project itself and the wider market; the only nearby change is more housing supply.',
 score=[['Location', 7, 'Mature Serangoon area on the Circle Line, one stop from two interchanges, with popular primary schools within about 1 km (reported).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 5, 'Seven shops and a childcare centre in the project (developer). Hawker centres within a 10-minute walk: Not checked yet.'],
        ['MRT proximity', 8, 'Lorong Chuan MRT within about 400 m (Confirmed by the developer\'s partner filing): about a 5-minute walk.']],
 pros=['On the Circle Line, one stop from Serangoon and Bishan interchanges', 'Developer-published sizes and a large range of layouts', 'Deep, liquid resale market nearby', 'Popular primary schools within about 1 km (reported)'],
 cons=['Highest land rate of the three ($1,355 psf ppr blended)', 'About 2,900 new homes within a few hundred metres compete at the exit', 'No new Confirmed catalyst left to lift prices', '5-bed quanta above $4M'],
 compare=[['Chuan Park', '$2,579', 'Nov 2024', 'At Lorong Chuan MRT', 'Not tested'], ['Park Colonial', '$1,725 at launch', 'Jul 2018', 'Next to Woodleigh MRT', 'Grew about 4% a year to TOP+1'], ['Thomson Reserve', 'about $2,900', 'Oct 2026', 'Upper Thomson', 'Not tested']],
 facts=[['Land price', '$1,327.5M for two parcels; blended about $1,355 psf ppr', 'C', 'edgeprop_o', 'Jul / Sep 2025'], ['Bids', 'Parcel 1: 7 bids; parcel 2: 5 bids', 'C', 'edgeprop_o', 'Jul 2025'],
        ['Homes', '1,056 in five blocks', 'C', 'singholdings', 'Nov 2026'], ['Sizes', '474 to 1,561 sq ft', 'C', 'singholdings', 'Nov 2026'],
        ['Launch', 'Preview reported for 13 Feb 2027', 'R', 'guide', '14 Nov 2026'], ['Completion', '16 Jul 2030 (project signboard)', 'R', 'guide', '14 Nov 2026'],
        ['Price list', 'Not available yet', 'C', 'guide', '25 Nov 2026']],
 faq_extra=[['Is One Chuan Grove a good investment?', None], ['How does it compare with Chuan Park?', 'Chuan Park launched at $2,579 psf in November 2024 at Lorong Chuan MRT and is 99% sold (EdgeProp). One Chuan Grove is expected at $2,600 to $2,800 psf, two years later, about 400 m from the station.']],
 src_extra={'chuanpark': ['EdgeProp, Chuan Park 76% sold at $2,579 psf; Chuan Grove context', 'https://www.edgeprop.sg/property-news/gls-plots-chuan-grove-and-former-raffles-town-club-site-released-can-yield-930-and-250-residential'],
            'caveats': ['URA private residential transactions (caveats), Nov 2025 to Oct 2026', '/condo-analysis/one-chuan-grove/#near'],
            'reserve': ['URA, Chuan Grove Reserve List site, released 27 Oct 2026', 'https://www.ura.gov.sg/land-sales/sites-for-application/chuan-grove-oct26/'],
            'lta_ccl': ['LTA, Circle Line Stage 6 opening', 'https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/5/news-releases/circle-line-stage-6-to-open-for-public-'],
            'mp': ['URA, Master Plan 2025 gazetted, 1 Dec 2025', 'https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr25-64'],
            'edgeprop_o': ['EdgeProp, Chuan Grove tender (parcel 1), Jul 2025', 'https://www.edgeprop.sg/property-news/sing-holdings-sunway-developments-jv-tops-seven-bids-chuan-grove-gls-site-1376-psf-ppr'],
            'singholdings': ['Sing Holdings, One Chuan Grove project page', 'https://singholdings.com/projects/one-chuan-grove/'],
            'ocg_sizes': ['Sing Holdings project page (sizes) and our One Chuan Grove guide (layouts)', 'https://the-one-chuan-grove.sg/floor-plans/'],
            'analysts_o': ['99.co, Sing Holdings-Sunway second Chuan Grove site', 'https://www.99.co/singapore/insider/sing-holdings-sunway-second-chuan-grove-gls/'],
            'guide': ['Our One Chuan Grove guide, the-one-chuan-grove.sg', 'https://the-one-chuan-grove.sg/']},
 chart_comps=['Forest Woods', 'Park Colonial', 'The Tre Ver'], confidence='Medium',
)
# ------------------------------------------------------------------ Bayshore Drive
P['bayshore-drive-site'] = dict(
 name='Bayshore Drive site', land=1323, land_src='URA tender: $2.128B, about $1,323 psf ppr', build=448, build_lab='E', build_src='gamuda',
 build_note='No developer cost published. We use the cost Gamuda filed for Chencharu Close, another integrated site with a bus interchange, as the closest published figure.',
 route1=[('Vela Bay launch average (next door, Bayshore MRT, sea views)', 2886, '2026Q2', 'vela')],
 route2=('Parc Esta', 2331, 'Near Eunos MRT, completed 2022. 2026 average from URA caveats.', 0.105, (0.10, 0.15), 'Plus 10.5% for integration with the MRT and a mall (Sengkang Grand against The Florence, both completed 2023), and 10% to 15% for a brand-new lease against a 4-year-old condo.'),
 expected=(2850, 3000), exp_word='tested', expected_note='No analyst estimate published (ERA, Jul 2026). We test around Vela Bay: $2,886 psf at launch and about $2,943 psf for units left (Nov 2026).',
 sizes={'2-bed': 650, '3-bed': 958, '4-bed': 1275}, sizes_src='vela_sizes', sizes_note='No unit mix released. Sizes borrowed from Vela Bay next door (developer-published sizes).',
 comps=['Bedok Residences', 'Waterfront Isle', 'Archipelago', 'Urban Vista', 'Parc Esta'], bull_add=0.005,
 bull_why='Base plus 0.5 point as the Bayshore precinct fills in, with the mall around end-2030 and SAFRA next door in 2030 (Reported); Bedok South MRT opens on 26 Dec 2026 (Confirmed), before you buy, so it is already in the price.',
 years=5, top_month=54, timeline="No launch date is announced; we assume a launch in 2028 at the earliest and keys about 4.5 years later. Seller's Stamp Duty applies for 4 years, so we test a sale about 5 years after buying, and also 6 years. The mall is expected around end-2030 (The Edge).",
 towns=['Bedok', 'Tampines'],
 who='Most buyers at resale will be HDB upgraders from Bedok and Tampines, private-to-private movers in the East Coast, and families near Temasek Primary. Bayshore\'s own HDB flats (about 7,000 planned) reach their minimum occupation period mostly after this exit.',
 district=[
  ['10-year price trend', 'URA non-landed index about 4.7% a year islandwide. Bedok-area condos grew 2.0% to 4.0% a year from their 2011–2013 launches to 2026 (our study).', 'C', 'mall'],
  ['New vs older resale gap', 'Expected around $2,850 to $3,000 psf against Costa Del Sol (completed 2004) at $1,975 and Eco (2017) at $1,571 within about 1 km: 44% to 91% more. Vela Bay already set the record.', 'C', 'caveats'],
  ['Volume and liquidity', '69 resale condos within 3 km, 16 within 1 km; mostly 1990s condos. How fast units sell: Not available yet.', 'C', 'caveats'],
  ['Rents', 'Gross yields: Bedok Residences 3.0%, Archipelago 2.7% (our study). URA: suburban rents rose 3.1% in Q3 2026.', 'C', 'ura'],
  ['Supply risk', 'About 10,000 homes are planned in Bayshore, about 3,000 private (ERA). Vela Bay (515) and this site (about 1,280) are the first; Bedok Rise (about 380) is about 1.4 km away and New Upper Changi Road about 2 km.', 'R', 'era']],
 district_summary='Bayshore is a new precinct in the making: a record entry price, few amenities yet, and about 1,500 more private homes still to come after the first two sites.',
 district_line='This district is in an early, supply-heavy phase: the first two projects set record suburban prices, and about 10,000 homes are planned around them.',
 plan=[['Bedok South MRT station (Thomson-East Coast Line) directly beneath the site', 'On site', 'Opens 26 Dec 2026', 'Direct train access; already in prices', 'Confirmed', 'st_mrt'],
       ['Mall of about 22,100 sq m and a bus interchange in the development', 'On site', 'Mall around end-2030', 'Daily convenience; footfall', 'Confirmed', 'edge_fct'],
       ['Bayshore precinct: about 10,000 homes, about 3,000 private', 'Around the site', 'Over the next decade', 'More amenities, and more competing supply', 'Planned', 'era'],
       ['SAFRA clubhouse next door', 'Next door', 'Slated for 2030', 'Leisure amenity', 'Planned', 'edge_fct']],
 plan_line='The MRT station and the integrated mall are Confirmed, but the station opens before you buy, so it is already in the price. The precinct plan brings amenities and supply together.',
 score=[['Location', 6, 'East Coast Park and the sea next door, Temasek Primary within 1 km, but a precinct still to be built with no shops yet.'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 8, 'A mall of about 22,100 sq m in the development (Confirmed) and East Coast Lagoon Food Village through the park.'],
        ['MRT proximity', 10, 'Bedok South MRT directly beneath the site (URA site details via ERA and The Edge), opening 26 Dec 2026.']],
 pros=['Bedok South MRT directly beneath the site, opening 26 Dec 2026', 'Mall and bus interchange in the development', 'East Coast Park next door; sea views from higher floors', 'Land cost about 5% below Vela Bay\'s'],
 cons=['Record suburban prices: 44% to 91% above nearby resale', 'About 1,500 more private homes still planned in the precinct', 'No launch date; completion years away', 'Comparable Bedok condos grew modestly from launch'],
 compare=[['Vela Bay', '$2,886', 'Apr 2026', 'Linked to Bayshore MRT', 'Not tested'], ['Parc Esta', '$1,701 at launch', 'Sep 2018', 'Near Eunos MRT', 'Grew about 5% a year to TOP+1'], ['Bedok Residences', '$1,350 at launch', 'Nov 2011', 'Integrated, Bedok MRT', 'Grew about 0.4% a year to TOP+1']],
 facts=[['Land price', '$2.128B, about $1,323 psf ppr', 'C', 'ura_b', '20 Jul 2026'], ['Bids', '3; next about $1,250 and $1,235 psf ppr', 'C', 'era', 'Jul 2026'],
        ['Homes', 'About 1,280 (URA estimate)', 'C', 'ura_b', '20 Jul 2026'], ['Commercial', 'About 22,500 sq m, including a mall', 'C', 'era', 'Jul 2026'],
        ['Launch', 'Not announced', 'C', 'ura_b', '25 Nov 2026'], ['Mall completion', 'Around end-2030', 'R', 'edge_fct', '21 Jul 2026'],
        ['Price list, unit mix', 'Not available yet', 'C', 'ura_b', '25 Nov 2026']],
 faq_extra=[['Is the Bayshore Drive condo a good investment?', None], ['How does it compare with Vela Bay?', 'Vela Bay, next door, launched at $2,886 psf in April 2026 and was 77% sold by November. This site paid about 5% less for its land and adds its own MRT station, mall and bus interchange, but it is more than twice Vela Bay\'s size.']],
 src_extra={'vela': ['EdgeProp, Vela Bay sells 72% on launch day at $2,886 psf, Apr 2026', 'https://www.edgeprop.sg/property-news/vela-bay-sells-72-launch-day-average-2886-psf'],
            'vela_sizes': ['Vela Bay unit sizes, as listed on our Vela Bay file', '/condo-analysis/vela-bay/'],
            'caveats': ['URA private residential transactions (caveats), Nov 2025 to Oct 2026', '/condo-analysis/bayshore-drive-mixed-use-gls/#near'],
            'era': ['ERA, Bayshore Drive GLS site analysis, 16 Jul 2026 and 30 Jul 2026', 'https://www.era.com.sg/research-articles/bayshore-drive-government-land-sale-gls-site-analysis'],
            'edge_fct': ['The Edge Singapore, $613M retail mall at Bayshore Drive, 21 Jul 2026', 'https://sg.finance.yahoo.com/news/613-mil-retail-mall-bayshore-032459200.html'],
            'st_mrt': ['The Straits Times, three new MRT stations in the east open on Dec 26, 5 Nov 2026', '/news/9819/'],
            'ura_b': ['URA, tender award for Bayshore Drive, Jul 2026', 'https://www.ura.gov.sg/news/media/pr26-55/']},
 chart_comps=['Bedok Residences', 'Parc Esta', 'Waterfront Isle'], confidence='Low',
)


def build(pid, c):
    A = floor_price(c['land'], c['build'])
    r1 = [round(p * IDX['2026Q3'] / IDX[q] / 5) * 5 for (_, p, q, _) in c['route1']]
    b1 = round(sum(r1) / len(r1) / 5) * 5
    nm2, p2, note2, integ, newp, newnote = c['route2']
    b2 = (round(p2 * (1 + integ) * (1 + newp[0]) / 5) * 5, round(p2 * (1 + integ) * (1 + newp[1]) / 5) * 5)
    B = round((b1 + sum(b2) / 2) / 2 / 10) * 10
    gr = comps_growth({k: MALL[k] for k in c['comps']})
    base = round(median(list(gr.values())), 3)
    g = {'bear': base / 2, 'base': base, 'bull': base + c['bull_add']}
    pr = Project(B, c['years'], c['top_month'], g)
    lo, hi = c['expected']; mid = (lo + hi) / 2
    EXP = c.get('exp_word', 'expected')
    def rng(t):  # base-case returns at lo and hi, lowest first
        a, b = sorted([pr.net_return(lo, units[t]['size'], base) * 100, pr.net_return(hi, units[t]['size'], base) * 100])
        return f"{fmt_pct(a)} to {fmt_pct(b)}"
    units, types = {}, []
    for t, sz in c['sizes'].items():
        C = round(pr.solve_entry(sz, 0.05) / 10) * 10; W = round(pr.solve_entry(sz, 0.03) / 10) * 10
        buy = min(B, C)
        xq = pr.exit_psf(g['base']) * sz; inc = income_needed(xq); up = .25 * xq + bsd(xq)
        rets = {e: {s: pr.net_return(e, sz, g[s]) * 100 for s in g} for e in (lo, hi)}
        cash = {e: (pr.return_on_cash(e, sz, g['base']), pr.return_on_cash(e, sz, g['bear'])) for e in (lo, hi)}
        base_mid = pr.net_return(mid, sz, g['base']) * 100
        if inc > 1.8 * MEDIAN_INCOME: v = 'Walk away'          # structural flaw: exit buyers can't afford it
        elif base_mid >= 5: v = 'Buy'
        elif C >= A['floor'][0]: v = f'Buy only below {fmt_money(C)} psf'
        else: v = 'Own-stay only'
        units[t] = dict(size=sz, C=C, W=W, buy=buy, xq=xq, inc=inc, up=up, rets=rets, cash=cash, base_mid=base_mid, v=v)
    t_main = '3-bed' if '3-bed' in units else list(units)[0]
    u3 = units[t_main]
    test = 'Pass' if u3['base_mid'] >= 5 else 'Borderline' if u3['base_mid'] >= 3 else 'Fail'
    verdicts = sorted({u['v'] for u in units.values()}, key=lambda v: ['Buy', 'Buy only', 'Own-stay only', 'Walk away'].index(v.split(' below')[0]) if v.split(' below')[0] in ['Buy', 'Buy only', 'Own-stay only', 'Walk away'] else 0)
    rows_cap = []
    for town in c['towns']:
        for ft, (price, n) in HDB[town].items():
            rows_cap.append([f"{town} {ft} ({n} resales)", fmt_money(price), fmt_money(price - OUTSTANDING)])
    cap_vals = [HDB[t][f][0] - OUTSTANDING for t in c['towns'] for f in HDB[t]]
    def walk_note(t):
        u = units[t]; mult = u['inc'] / MEDIAN_INCOME
        reach = 'within reach of a median household' if mult <= 1.2 else f'about {mult:.1f} times the median household income'
        return f"Exit about {fmt_q(u['xq'])} needs about {fmt_money(round(u['inc'], -2))} a month ({reach}) and {fmt_q(round(u['up'], -3))} upfront."
    exit_risky = [t for t, u in units.items() if u['up'] > max(cap_vals) or u['inc'] > 1.5 * MEDIAN_INCOME]
    pass_any = [t for t, u in units.items() if u['v'].startswith('Buy')]
    # verdict line
    main_v = u3['v']
    if main_v.startswith('Buy only'):
        line = f"{main_v.split(' psf')[0]} psf for the {t_main}: a good project where the price decides. At the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf the base case earns about {rng(t_main)} a year after costs; walk away above about {fmt_money(u3['W'])} psf ({fmt_q(round(u3['W']*u3['size'],-3))})."
    elif main_v == 'Buy':
        line = f"Buy the {t_main} at the expected price: the base case clears 5% a year after costs."
    else:
        line = f"{main_v}. At the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf this won't deliver 5% a year, so buy only to live in, and walk away above about {fmt_money(u3['W'])} psf ({t_main} about {fmt_q(round(u3['W']*u3['size'],-3))})."
    walkers = [t for t, u in units.items() if u['v'] == 'Walk away']
    if walkers: line += f" Skip the {' and '.join(walkers)} unless you will live in {'it' if len(walkers) == 1 else 'them'} for 10 years or more."
    reasons = []
    if u3['C'] < A['floor'][0]:
        reasons.append(f"The 5% price is below the developer's cost. To earn 5% a year after costs you would have to buy at about {fmt_money(u3['buy'])} psf, but land, building, finance and a normal margin put the developer's realistic floor at about {fmt_money(A['floor'][0])} to {fmt_money(A['floor'][1])} psf.")
    else:
        reasons.append(f"The 5% price is reachable: about {fmt_money(u3['C'])} psf, above the developer's floor of about {fmt_money(A['floor'][0])} psf, but below the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf.")
    reasons.append(f"Comparable condos grew {min(gr.values())*100:.1f}% to {max(gr.values())*100:.1f}% a year from launch to a year after completion (median {base*100:.1f}%, our base case). A 5% net return needs about 6.1% to 6.3% a year in price growth.")
    reasons.append(f"At the base-case resale price, a {t_main} of about {u3['size']:,} sq ft costs about {fmt_q(u3['xq'])}; a buyer then needs about {fmt_money(round(u3['inc'], -2))} a month and {fmt_q(round(u3['up'], -3))} upfront, against {fmt_q(min(cap_vals))} to {fmt_q(max(cap_vals))} that typical {' and '.join(c['towns'])} upgraders bring.")
    entry_score = 7 if mid <= B * 1.02 else 6 if mid <= B * 1.06 else 4 if mid <= B * 1.12 else 3
    entry_ev = f"{EXP.capitalize()} {fmt_money(lo)} to {fmt_money(hi)} psf against our fair value of about {fmt_money(B)} ({(lo/B-1)*100:+.0f}% to {(hi/B-1)*100:+.0f}%)."
    exit_score = 7 if not exit_risky else 5 if len(exit_risky) < len(units) else 4
    if 'oversupplied' in c['district_line'] or 'supply-heavy' in c['district_line']: exit_score -= 1
    exit_ev = ('Exit prices stay within reach of most local upgraders' if not exit_risky else f"The {', '.join(exit_risky)} exit prices outrun most local upgraders") + ('; heavy competing supply at the exit.' if exit_score < 5 or 'oversupplied' in c['district_line'] or 'supply-heavy' in c['district_line'] else '; little competing private supply nearby.')
    score = []
    for name, s, ev in c['score']:
        if ev == 'entry': score.append([name, entry_score, entry_ev])
        elif ev == 'exit': score.append([name, exit_score, exit_ev])
        else: score.append([name, s, ev])
    overall = sum(s[1] for s in score) / len(score)
    S = dict(SRC); S.update(c['src_extra'])
    need = []
    for e in sorted({lo - 100, lo, hi, hi + 100}):
        price = e * 1000
        need.append([fmt_money(e), fmt_money(round(bsd(price))), fmt_money(round(pr.exit_needed(e, 1000, c['years']))), fmt_money(round(pr.exit_needed(e, 1000, c['years'] + 1)))])
    rets = []
    for t, u in units.items():
        for e in (lo, hi):
            (cb, cin), (cbear, _) = u['cash'][e]
            rets.append([t, fmt_money(e), fmt_pct(u['rets'][e]['bear']), fmt_pct(u['rets'][e]['base']), fmt_pct(u['rets'][e]['bull']), fmt_pct(cb * 100), fmt_pct(cbear * 100), fmt_q(round(cin, -3))])
    comps_rows = []
    for k in c['comps']:
        ly, lp, top, psf = MALL[k]
        since = cagr(lp, psf['2026'], 2026.5 - ly) * 100
        comps_rows.append([k, UNITS_MALL[k], str(int(ly)), lp, top, psf['2026'], round(since, 1), round(gr[k] * 100, 1) if k in gr else None, 'Not available yet', ''])
    yrs = c['years']
    buy_year = {'chencharu-central-residences': 2027, 'one-chuan-grove': 2027, 'bayshore-drive-site': 2028}[pid]
    std = {
     'asOf': AS_OF, 'confidence': c['confidence'],
     'confNote': f"No developer price list yet. Price range: {c['expected_note']} {c['sizes_note']} The verdict will be re-checked the day prices are released.",
     'strip': [['Verdict', main_v if len(main_v) < 30 else main_v.replace(' psf', ''), ', '.join(f"{t}: {u['v']}" for t, u in units.items() if u['v'] != main_v) or 'Same for every unit type'],
               ['Buy at or below', f"{fmt_money(u3['buy'])} psf", (f"Below the developer's floor of about {fmt_money(A['floor'][0])}, so not a realistic launch price" if u3['buy'] < A['floor'][0] else f"{t_main} about {fmt_q(round(u3['buy']*u3['size'],-3))}")],
               ['Walk away above', f"{fmt_money(u3['W'])} psf", f"{t_main} about {fmt_q(round(u3['W']*u3['size'],-3))}. {EXP.capitalize()} {fmt_money(lo)} to {fmt_money(hi)}"],
               ['5% test', test, f"Base case {rng(t_main)} a year at {fmt_money(lo)} to {fmt_money(hi)} psf"]],
     'verdict': {'line': line, 'reasons': reasons,
                 'suits': f"Buyers who want to live here for 10 years or more and can buy within the walk-away price. {c['who'].split('.')[0]}.",
                 'skip': 'Investors who need 5% a year, buyers who must sell within 5 to 6 years, and anyone stretching for the largest units.' if test != 'Pass' else 'Buyers who cannot hold for at least 5 years.',
                 'change': [f"If the {t_main} launches at or below about {fmt_money(u3['W'])} psf, the base case reaches about 3% a year.",
                            'If the official unit sizes are smaller than assumed, quanta fall and more local upgraders can afford the exit price.',
                            'If completion slips by a year or more, the 6-year column applies and returns fall further.']},
     'types': [[f"{t} (about {u['size']:,} sq ft)", u['v'], f"{fmt_money(u['buy'])} psf ({fmt_q(round(u['buy']*u['size'],-3))})", f"{fmt_money(u['W'])} psf ({fmt_q(round(u['W']*u['size'],-3))})", walk_note(t)] for t, u in units.items()],
     'priceA': [['Land', f"{fmt_money(A['land'])} psf ppr", 'C', None, c['land_src'] + '. psf ppr = land price per square foot of floor area the site may build.'],
                ['Building cost', f"about {fmt_money(A['build'])} psf", c['build_lab'], c['build_src'], c['build_note']],
                ['Finance on the land', f"about {fmt_money(A['landFinance'])} psf", 'E', None, 'Land carried about 3 years before sales money arrives, at about 3% a year.'],
                ['Fees, marketing, stamp duty, taxes', f"about {fmt_money(A['fees'])} psf", 'E', None, 'Professional fees, show flat and marketing, stamp duty on the land, property tax while building.'],
                ['Cost before profit', f"about {fmt_money(A['cost'])} psf", 'E', None, 'Sum of the lines above.'],
                ['Developer floor price', f"about {fmt_money(A['floor'][0])} to {fmt_money(A['floor'][1])} psf", 'E', None, 'Cost plus a normal 10% to 15% margin on the selling price. Below this, a launch is unrealistic.']],
     'priceB': [[f"Route 1: {lab}", f"{fmt_money(p)} psf", 'C', sk, f"Moved to Q3 2026 with URA's non-landed index: about {fmt_money(v)} psf."] for (lab, p, q, sk), v in zip(c['route1'], r1)]
               + [['Route 1 result', f"about {fmt_money(b1)} psf", 'E', None, 'Average of the route 1 anchors.' if len(r1) > 1 else 'No location adjustment: same area.'],
                  [f"Route 2: {nm2}", f"{fmt_money(p2)} psf", 'C', 'caveats' if nm2 in ('North Park Residences',) else 'mall', note2],
                  ['Adjustments', (f"+{integ*100:.1f}% and " if integ else '') + f"+{newp[0]*100:.0f}% to +{newp[1]*100:.0f}%", 'E', None, newnote],
                  ['Route 2 result', f"about {fmt_money(b2[0])} to {fmt_money(b2[1])} psf", 'E', None, ''],
                  ['Fair value today', f"about {fmt_money(B)} psf", 'E', None, 'Average of the two routes.']],
     'priceC': f"Working backwards from the base-case resale price (about {fmt_money(round(pr.exit_psf(base)))} psf after {yrs:g} years), the highest entry that still earns 5% a year after costs is about " + ', '.join(f"{fmt_money(u['C'])} psf for a {t}" for t, u in units.items()) + '.',
     'priceDecide': (f"Buy-at price = the lower of fair value ({fmt_money(B)}) and the 5% ceiling ({fmt_money(u3['C'])}) = about {fmt_money(u3['buy'])} psf. "
                     + (f"That is below the developer's floor of about {fmt_money(A['floor'][0])}, so at any realistic launch price this won't deliver 5% a year: buy it only to live in. " if u3['buy'] < A['floor'][0] else 'That is above the developer floor, so a launch at this level is possible. ')
                     + f"Walk-away price = the entry at which the base case falls to about 3% a year, roughly what a home loan costs: about {fmt_money(u3['W'])} psf for the {t_main}."),
     'test': {'timeline': c['timeline'],
              'costs': "Included: Buyer's Stamp Duty at IRAS rates, about $6,000 legal fees, 2% agent fee plus 9% GST when you sell. Return on cash also includes a 75% bank loan at about 2.6% a year (an assumption), interest during the progressive payments, the instalments after TOP, and about $1,500 property tax plus $0.45 psf a month maintenance after TOP. No rent: this is an own-stay test.",
              'key': 'Because of stamp duty and selling costs, a 5% net return needs roughly 6.1% to 6.3% a year in price growth.',
              'need': need,
              'scen': [['Bear', f"{g['bear']*100:.2f}% a year", fmt_money(round(pr.exit_psf(g['bear']))), 'Half the base case: competing supply at exit, or a softer market.'],
                       ['Base', f"{g['base']*100:.2f}% a year", fmt_money(round(pr.exit_psf(g['base']))), f"The median of the comparables' growth from launch to a year after completion ({', '.join(f'{k} {v*100:.1f}%' for k, v in gr.items())}). Most of those years included the 2021–2023 price jump."],
                       ['Bull', f"{g['bull']*100:.2f}% a year", fmt_money(round(pr.exit_psf(g['bull']))), c['bull_why']]],
              'returns': rets,
              'result': f"{test}. At the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf, the base case earns about {rng(t_main)} a year after costs. It would pass at about {fmt_money(u3['C'])} psf" + (", below the developer's floor." if u3['C'] < A['floor'][0] else '.')},
     'district': {'summary': c['district_summary'], 'rows': c['district'], 'line': c['district_line']},
     'comps': comps_rows,
     'compsLine': f"Comparable projects made {min(gr.values())*100:.1f}% to {max(gr.values())*100:.1f}% a year from launch to a year after completion. To earn 5% net, {c['name']} must grow about 6.2% a year, about {(0.062-max(gr.values()))*100:.1f} points more than the best of them" + (', which is unlikely without a lower launch price.' if test != 'Pass' else '.'),
     'compsDrivers': 'Winners started cheaper than their neighbours or completed into the 2021–2023 price jump; condos that launched at a premium, or with heavy supply completing at once, grew slower. Layout efficiency: Not available yet.',
     'exit': {'who': c['who'],
              'rows': [[t, fmt_q(round(u['xq'], -3)), fmt_money(round(u['inc'], -2)), fmt_q(round(u['up'], -3))] for t, u in units.items()],
              'capital': rows_cap,
              'note': "Income needed: 75% loan over 30 years, tested at MAS's 4% rate under the 55% debt limit (TDSR, the share of income all loan repayments may take). Median household market income: $12,446 a month (SingStat, 2025). Upgrader capital = our median resale price minus an illustrative $150,000 still owed; the typical outstanding loan is Not available yet. The CPF refund is part of this capital.",
              'line': (f"The {' and '.join(exit_risky)} exit prices outrun most local upgraders: exit risk." if exit_risky else 'Exit prices stay within reach of typical local upgraders.')},
     'plan': c['plan'], 'planLine': c['plan_line'],
     'score': score, 'scoreNote': f"The scorecard ({overall:.1f}) " + ('agrees with the price test.' if (overall >= 7.5) == (test == 'Pass') else f"says this is {'a good' if overall >= 6.5 else 'an average'} place to live; the price test says it is {'a poor' if test == 'Fail' else 'a borderline'} investment at the expected price. For investment buyers, the price test wins."),
     'facts': c['facts'], 'pros': c['pros'], 'cons': c['cons'], 'compare': [[c['name'] + ' (expected)', f"{fmt_money(lo)}–{fmt_money(hi)}", '', '', test]] + c['compare'],
     'faq': [[q, a if a else f"{'Not' if test != 'Pass' else 'Yes'} at the {EXP} {fmt_money(lo)} to {fmt_money(hi)} psf. After stamp duty and selling costs, the base case earns about {rng(t_main)} a year. It would earn 5% at about {fmt_money(u3['C'])} psf."] for q, a in c['faq_extra']]
            + [[f"What price should I pay for a {t_main}?", f"Our walk-away price is about {fmt_money(u3['W'])} psf, about {fmt_q(round(u3['W']*u3['size'],-3))} for {u3['size']:,} sq ft. Above that, the base case falls below about 3% a year. These are estimates until the developer releases prices."]],
     'chart': {'subject': [[buy_year, mid], [int(buy_year + yrs), round(pr.exit_psf(base))]],
               'five': [[buy_year, mid], [int(buy_year + yrs), round(pr.exit_needed(mid, u3['size'], yrs))]],
               'comps': {k: [[int(y), v] for y, v in sorted(MALL[k][3].items()) if int(y) >= int(MALL[k][0])] for k in c['chart_comps']},
               'note': f"Brass: {c['name']} bought at {fmt_money(mid)} psf (middle of the expected range) and its base-case price. Dashed brass: the path needed for 5% a year net. Navy: what comparables actually did, yearly average psf from URA caveats. 2026 is January to November."},
     'src': S,
    }
    return std


out = {pid: build(pid, c) for pid, c in P.items()}
print(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
