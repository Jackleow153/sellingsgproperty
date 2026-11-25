# Run: python3 scripts/analysis/hougang-central-std.py scripts/analysis/hougang-central-calc.py > /tmp/std.json, then replace the STD line in data/condo-analysis.html.
"""Builds STD['hougang-central-site'] for data/condo-analysis.html from hougang_calc.py (single source of numbers)."""
import json, runpy, io, contextlib, sys
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    ns = runpy.run_path(sys.argv[1])
o = json.loads(buf.getvalue())
U = o['units']; A = o['A']; B = o['B']; X = o['exit']
m = lambda n: f"${n:,.0f}"
mq = lambda n: f"${n/1e6:.2f}M" if n >= 1e6 else f"${round(n/1000):,}k"
pc = lambda v: f"{v:.1f}%" if v >= 0 else f"−{abs(v):.1f}%"

S = {
 'hdb': ['HDB tender result, 14 Jan 2026', 'https://www.hdb.gov.sg/-/media/business-partners/land-developers-and-land-users/buying-land-land-sales/sites-sold-by-hdb/Mix-Residential-Site-Sold-14-Jan-2026.pdf'],
 'cl': ['CapitaLand / CICT news release, 14 Jan 2026', 'https://www.capitaland.com/en/about-capitaland/newsroom/news-releases/international/2026/january/CICT-and-consortium-awarded-hougang-central-site.html'],
 'uol': ['UOL 1H2026 results presentation (SGX), 12 Aug 2026', 'https://links.sgx.com/FileOpen/UOL%201H2026%20Results%20Presentation.ashx?App=Announcement&FileID=900463'],
 'cict': ['CICT 3Q 2026 business update (SGX), 29 Oct 2026', 'https://investor.cict.com.sg/newsroom/20261029_070044_C38U_3PQVW1J3DJO49A76.1.pdf'],
 'lta': ['LTA, next phase of rail development, Mar 2026', 'https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/3/news-releases/next-phase-of-rail-development.html'],
 'gamuda': ['Gamuda Berhad Bursa filing, 29 Sep 2025 (Chencharu Close), as set out on chencharuyishun.sg', 'https://chencharuyishun.sg/developer/'],
 'arcadis': ['Arcadis Construction Cost Handbook Singapore 2022', 'https://media.arcadis.com/-/media/project/arcadiscom/com/perspectives/asia/publications/cch/2022/singapore-construction-cost-handbook-2022.pdf?rev=842b76624b8c40a0affc61f99debde9f'],
 'ppi': ['URA private residential price index, non-landed (data.gov.sg), Q3 2026', 'https://data.gov.sg/datasets/d_97f8a2e995022d311c6c68cfda6d034c/view'],
 'ura': ['URA, 3rd Quarter 2026 real estate statistics, 23 Oct 2026', 'https://www.ura.gov.sg/news/media/pr26-73/'],
 'caveats': ['URA private residential transactions (caveats), Nov 2025 to Oct 2026', '/condo-analysis/hougang-central-mixed-use/#near'],
 'mall': ['Our mall-condo study: yearly psf from URA caveats via Stacked Homes, Nov 2026', '/insights/integrated-mall-condo-returns-2026/'],
 'parktown': ['UOL, ParkTown Residence launch weekend, Feb 2025', 'https://www.uol.com.sg/news/over-87-of-parktown-residence-units-sold-at-launch-weekend/'],
 'parktown2': ['EdgeProp, ParkTown Residence average $2,360 psf, Feb 2025', 'https://edgeprop.sg/property-news/uol-capitaland-moves-1041-units-parktown-residence-launch-day-average-price-achieved-2360-psf'],
 'edgeprop': ['EdgeProp, CapitaLand-UOL tops bid at $1,179 psf ppr, Dec 2025', 'https://www.edgeprop.sg/property-news/capitaland-uol-group-tops-bid-mixed-use-development-plot-hougang-central-15-bil-bid-or-1179-psf-ppr'],
 'stacked': ['Stacked Homes, Hougang Central bid may put prices above $2,500 psf, 16 Dec 2025', 'https://stackedhomes.com/capitaland-uols-1-5-billion-hougang-central-bid-may-put-future-prices-above-2500-psf/'],
 'stacked2': ['Stacked Homes, Hougang mega project and nearby condos, 29 May 2026', 'https://stackedhomes.com/hougang-central-gls-integrated-site-sengkang-data/'],
 'sizes': ['Stacked Homes, ParkTown Residence unit mix, 23 Jan 2025', 'https://stackedhomes.com/is-the-upcoming-1193-unit-parktown-residence-in-tampines-worth-a-look-heres-all-you-need-to-know/'],
 'iras': ["IRAS, Buyer's Stamp Duty rates", "https://www.iras.gov.sg/taxes/stamp-duty/for-property/buying-or-acquiring-property/buyer's-stamp-duty-(bsd)-for-all-property-buyers"],
 'ssd': ["MAS / MOF / MND, Seller's Stamp Duty holding period, 3 Jul 2025", 'https://www.mas.gov.sg/news/media-releases/2025/extension-of-the-holding-period-of-sellers-stamp-duty-and-higher-ssd-rates'],
 'mas': ['MAS, property loan rules (TDSR, LTV, 4% medium-term rate)', 'https://www.mas.gov.sg/regulation/explainers/new-housing-loans'],
 'singstat': ['SingStat, Key Household Income Trends 2025 (preliminary), Feb 2026', 'https://www.singstat.gov.sg/-/media/files/visualising_data/infographics/households/key-household-income-trends-2025.ashx'],
 'hdbresale': ['HDB resale flat prices (data.gov.sg), Nov 2025 to Oct 2026', 'https://data.gov.sg/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view'],
 'mp': ['URA, Master Plan 2025 gazetted, 1 Dec 2025', 'https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr25-64'],
 'dmp': ['URA, Draft Master Plan 2025 release, 25 Jun 2025', 'https://www.ura.gov.sg/news/media/pr25-32/'],
}
t3 = U['3-bed']; t2 = U['2-bed']; t4 = U['4-bed']
walk_all = sorted({U[k]['walk'] for k in U}); buy_all = sorted({U[k]['buyAt'] for k in U})

std = {
 'asOf': '25 Nov 2026', 'confidence': 'Low',
 'confNote': 'No developer price list, unit sizes or floor plans yet. Unit sizes are borrowed from ParkTown Residence, the same developers\' last integrated condo. The verdict will be re-checked the day prices are released.',
 'strip': [
   ['Verdict', 'Own-stay only', '2-bed and 3-bed. 4-bed: walk away'],
   ['Buy at or below', f"{m(t3['buyAt'])} psf", f"Below the developer's floor of about {m(A['floor'][0])}, so not a realistic launch price"],
   ['Walk away above', f"{m(t3['walk'])} psf", f"3-bed about {mq(t3['walkQuantum'])}. Analysts expect $2,500 to $2,600"],
   ['5% test', 'Fail', f"Base case {pc(t3['at2600']['base'])} to {pc(t3['at2500']['base'])} a year at $2,500 to $2,600 psf"]],
 'verdict': {
   'line': f"Own-stay only. At any realistic launch price this won't deliver 5% a year, so buy the 2-bed or 3-bed only to live in, and walk away above about {m(t3['walk'])} psf (3-bed about {mq(t3['walkQuantum'])}). Skip the 4-bed unless you will live in it for 10 years or more.",
   'reasons': [
     f"The 5% price is below the developer's cost. To earn 5% a year after costs you would have to buy at about {m(t3['buyAt'])} psf, but land, building, finance and a normal margin put the developer's realistic floor at about {m(A['floor'][0])} to {m(A['floor'][1])} psf.",
     f"Comparable condos grew 2.5% to 4.1% a year from launch to a year after completion (Sengkang Grand, Woodleigh, Watertown, The Florence, Riverfront). A 5% net return here needs about 6.2% a year in price growth, which none of them came close to.",
     f"At the base-case resale price in 2032, a 3-bed of about 1,000 sq ft costs about {mq(t3['exitQuantum'])}. A buyer then needs about {m(t3['incomeNeeded'])} a month and {mq(t3['upfrontAtExit'])} upfront, more than a typical Hougang or Serangoon 5-room upgrader brings."],
   'suits': 'Families in Hougang, Kovan and Serangoon who want to live above the MRT interchange and the new mall for 10 years or more, and who would buy within the walk-away price.',
   'skip': 'Investors who need 5% a year, buyers who must sell within 5 to 6 years, and anyone stretching to a 4-bed.',
   'change': [
     f"If the developer prices the 3-bed at or below about {m(t3['walk'])} psf, the base case reaches about 3% a year: worth a look even for a mixed own-stay and investment purchase.",
     'If official unit sizes are clearly smaller than ParkTown\'s, quanta fall and more local upgraders can afford the exit price, which lowers the exit risk.',
     'If the Cross Island Line opening slips past 2032 or completion slips past 2031, the bear case becomes more likely.']},
 'types': [
   ['2-bed (about 700 sq ft)', 'Own-stay only', m(t2['buyAt']) + ' psf (' + mq(t2['buyAtQuantum']) + ')', m(t2['walk']) + ' psf (' + mq(t2['walkQuantum']) + ')', f"Widest resale pool: base-case exit about {mq(t2['exitQuantum'])}, needing about {m(t2['incomeNeeded'])} a month, close to the median household."],
   ['3-bed (about 1,000 sq ft)', 'Own-stay only', m(t3['buyAt']) + ' psf (' + mq(t3['buyAtQuantum']) + ')', m(t3['walk']) + ' psf (' + mq(t3['walkQuantum']) + ')', f"Exit about {mq(t3['exitQuantum'])} needs about {m(t3['incomeNeeded'])} a month and {mq(t3['upfrontAtExit'])} upfront: exit risk."],
   ['4-bed (about 1,345 sq ft)', 'Walk away', m(t4['buyAt']) + ' psf (' + mq(t4['buyAtQuantum']) + ')', m(t4['walk']) + ' psf (' + mq(t4['walkQuantum']) + ')', f"Exit about {mq(t4['exitQuantum'])} needs about {m(t4['incomeNeeded'])} a month and {mq(t4['upfrontAtExit'])} upfront, beyond most local upgraders."]],
 'priceA': [
   ['Land', f"{m(A['land'])} psf ppr", 'C', 'hdb', 'psf ppr = land price per square foot of floor area the site may build. $1,500,738,338 for 118,268 sq m of floor area.'],
   ['Building cost', f"about {m(A['build'])} psf", 'E', 'gamuda', 'Preliminary main construction cost Gamuda filed for Chencharu Close, another HDB integrated site with a bus interchange. Cross-check: Arcadis 2022 put above-average condos at S$2,550 to 3,350 per sq m (about $237 to $311 psf) before integrated works and recent cost rises.'],
   ['Finance on the land', f"about {m(A['landFinance'])} psf", 'E', None, 'Land carried about 3 years before sales money arrives, at about 3% a year.'],
   ['Fees, marketing, stamp duty, taxes', f"about {m(A['fees'])} psf", 'E', None, 'Professional fees, show flat and marketing, stamp duty on the land, property tax while building.'],
   ['Cost before profit', f"about {m(A['cost'])} psf", 'E', None, 'Sum of the lines above.'],
   ['Developer floor price', f"about {m(A['floor'][0])} to {m(A['floor'][1])} psf", 'E', None, 'Cost plus a normal 10% to 15% margin on the selling price. Below this, a launch is unrealistic.']],
 'priceB': [
   ['ParkTown Residence launch average', '$2,360 psf (Feb 2025)', 'C', 'parktown2', 'Same developers, same HDB integrated model (mall, bus interchange, hawker centre), 87% sold at launch.'],
   ['Market change since', f"+{(212.7/205.4-1)*100:.1f}%", 'C', 'ppi', 'URA non-landed price index, 205.4 in Q1 2025 to 212.7 in Q3 2026.'],
   ['Route 1: ParkTown, today', f"about {m(B['b1'])} psf", 'E', None, 'No location adjustment: Hougang and Tampines are both mature eastern towns with large upgrader pools.'],
   ['Route 2: newest condo nearby', '$1,904 psf', 'C', 'caveats', 'The Florence Residences, completed 2023, about 780 m away. URA median, 103 resales in the past 12 months.'],
   ['+ integrated and next to the MRT', f"+{B['integPrem']}%", 'C', 'mall', 'Sengkang Grand Residences (integrated, 2 min to Buangkok MRT) against The Florence (12 min to Kovan MRT), both completed 2023: $2,091 against $1,892 psf in 2026.'],
   ['+ brand-new 99-year lease', '+10% to +15%', 'E', None, 'About 9 more years of lease and a new building against a 3-year-old condo.'],
   ['Route 2 result', f"about {m(B['b2'][0])} to {m(B['b2'][1])} psf", 'E', None, ''],
   ['Fair value today', f"about {m(B['B'])} psf", 'E', None, 'Average of the two routes.']],
 'priceC': f"Working backwards from the base-case resale price in 2032 (about {m(X['base'])} psf, section below), the highest entry price that still earns 5% a year after costs is about {m(t2['C'])} psf for a 2-bed and {m(t3['C'])} psf for a 3-bed or 4-bed.",
 'priceDecide': f"Buy-at price = the lower of fair value ({m(B['B'])}) and the 5% ceiling ({m(t3['C'])}) = about {m(t3['buyAt'])} psf. That is below the developer's floor of about {m(A['floor'][0])}, so at any realistic launch price this won't deliver 5% a year: buy it only to live in. Walk-away price = the entry at which the base case falls to about 3% a year, roughly what a home loan costs: about {m(t3['walk'])} psf for a 3-bed and {m(t2['walk'])} for a 2-bed.",
 'test': {
   'timeline': "Buy at launch (UOL targets the second half of 2027). TOP (Temporary Occupation Permit, when you get the keys) is targeted for 2030 or 2031. Seller's Stamp Duty applies for 4 years on homes bought from 4 July 2025, so the earliest clean sale is late 2031; we test a sale in 2032, about one year after TOP (5 years), and also 6 years in case completion slips. CICT expects the mall's construction to start only in 2027.",
   'costs': "Included: Buyer's Stamp Duty at IRAS rates, about $6,000 legal fees, 2% agent fee plus 9% GST when you sell. Return on cash also includes a 75% bank loan at about 2.6% a year (an assumption), interest during the progressive payments, the instalments after TOP, and about $1,500 property tax plus $0.45 psf a month maintenance after TOP. No rent is included: this is an own-stay test.",
   'key': 'Because of stamp duty and selling costs, a 5% net return needs roughly 6.1% to 6.3% a year in price growth.',
   'scen': [['Bear', f"{o['growth']['bear']*100:.2f}% a year", m(X['bear']), 'Half the base case: supply at exit, or a softer market.'],
            ['Base', f"{o['growth']['base']*100:.2f}% a year", m(X['base']), "The median of the comparables' growth from launch to a year after completion (" + ', '.join(f"{k} {v}%" for k, v in o['comps'].items()) + "). Most of those years included the 2021–2023 price jump."],
            ['Bull', f"{o['growth']['bull']*100:.2f}% a year", m(X['bull']), 'Base plus 1 point for the Cross Island Line interchange, which is Confirmed for 2030.']],
   'result': f"Fail. At the expected $2,500 to $2,600 psf, the base case earns about {pc(t3['at2600']['base'])} to {pc(t3['at2500']['base'])} a year after costs. It would pass only at about {m(t3['buyAt'])} psf, below the developer's floor."},
 'district': {
   'summary': 'Hougang is in a maturing phase: steady growth, deep resale liquidity, and very little new private supply nearby, because this is the first government land sale in the area since 2019.',
   'rows': [
     ['10-year price trend', 'URA non-landed index 134.9 (Q3 2016) to 212.7 (Q3 2026): about 4.7% a year islandwide. Hougang\'s 2018–19 launches grew 3.4% to 3.7% a year from launch to 2026 (Riverfront, The Florence).', 'C', 'ppi'],
     ['New vs 3-year-old resale gap', 'Analysts expect $2,500 to $2,600 psf here; The Florence and Riverfront (both completed 2023) trade at $1,904 and $1,747. A new buyer pays 31% to 49% more, a premium that has to be earned back.', 'C', 'caveats'],
     ['Volume and liquidity', '100 resale condos within 3 km. The Florence had 103 resales and Riverfront 110 in the past 12 months. How fast units sell: Not available yet.', 'C', 'caveats'],
     ['Rents', 'Gross yields: The Florence 2.6%, Riverfront 2.7%, Sengkang Grand 2.4%. URA: rents in the suburbs (OCR) rose 3.1% in Q3 2026.', 'C', 'ura'],
     ['Supply risk', 'No other new private project within 2 km. The nearest pipeline is about 3.7 km away (One Chuan Grove, 1,056 homes, preview reported Feb 2027; Chuan Park). About 830 homes here will reach TOP together, and they compete with each other at the exit.', 'C', 'cl']],
   'line': 'This district is maturing: prices have risen steadily and there is little competing supply, but the premium for a brand-new integrated condo over 3-year-old neighbours is already very wide.'},
 'comps': [
   ['Sengkang Grand Residences (integrated)', 680, 'May 2019', 1747, 2023, 2091, 2.4, 3.0, 'Not available yet', 'Launched about a third above Riverfront; nearly flat since completion.'],
   ['The Florence Residences', 1410, 'May 2019', 1448, 2023, 1892, 3.7, 4.1, '446 profit, 14 loss', '960 m from Kovan MRT; low entry price.'],
   ['Riverfront Residences', 1472, 'Jul 2018', 1313, 2023, 1735, 3.4, 4.1, '576 profit, 1 loss', '1.4 km from Hougang MRT; lowest entry price.'],
   ['The Woodleigh Residences (integrated analog)', 667, 'Nov 2018', 2036, 2024, 2484, 2.5, 3.1, 'Not available yet', 'First units sold about 18% above Park Colonial next door; city fringe, so a stronger market.'],
   ['Watertown (integrated analog)', 992, 'Jan 2012', 1169, 2017, 1728, 2.7, 2.5, 'Not available yet', 'Punggol was then seen as remote; 6 of 10 traceable early resales lost money in 2016.'],
   ['ParkTown Residence (integrated, same developers)', 1193, 'Feb 2025', 2360, None, None, None, None, 'Not completed', 'The closest twin; too new for a track record.']],
 'compsLine': "Comparable projects made 2.5% to 4.1% a year from launch to a year after completion; the integrated ones (2.5% to 3.1%) were at the low end, because they launched at a premium. To earn 5% net, Hougang Central must grow about 6.2% a year, roughly 2 points a year more than the best of them. That is unlikely without a much lower launch price.",
 'compsDrivers': 'Winners started cheap: Riverfront and The Florence launched at $1,313 and $1,448 psf and grew about 4% a year. The integrated condos launched at a premium (Sengkang Grand about a third above Riverfront) and grew slower once that premium was paid. Watertown shows the risk of launching high with large supply completing at once.',
 'exit': {
   'who': 'Most buyers at resale (2032 or later) will be HDB upgraders from Hougang, Kovan and Serangoon, plus private-to-private movers and families near the four primary schools within about 1 km. How many Hougang flats reach their Minimum Occupation Period around 2032: Not available yet.',
   'rows': [[k.replace('-bed', '-bed'), mq(U[k]['exitQuantum']), m(U[k]['incomeNeeded']), mq(U[k]['upfrontAtExit'])] for k in ['2-bed', '3-bed', '4-bed']],
   'capital': [[k, m(v + 150000), m(v)] for k, v in t3['upgraderCapital'].items()],
   'note': "Income needed: 75% loan over 30 years, tested at MAS's 4% rate under the 55% debt limit (TDSR, the share of income all loan repayments may take). Median household market income: $12,446 a month (SingStat, 2025). Upgrader capital = the median resale price minus an illustrative $150,000 still owed; the typical outstanding loan is Not available yet. The CPF refund is part of this capital.",
   'line': f"The 2-bed's resale price stays within reach of a median household. The 3-bed's base-case exit price needs about 1.5 times the median income and more upfront money than a typical 5-room upgrader brings, so expect a thinner buyer pool. The 4-bed's needs about 2 times the median income: exit risk."},
 'plan': [
   ['Hougang MRT becomes a Cross Island Line interchange', 'On site', 'CRL Phase 1 targeted for 2030', 'Faster east-west trips; the main catalyst', 'Confirmed', 'lta'],
   ['The integrated development: mall of about 300,000 sq ft, new bus interchange, town plaza', 'On site', 'Target 2030/2031; mall construction expected to start 2027', 'Daily convenience; also footfall and noise', 'Confirmed', 'cl'],
   ['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Sets the land use around the site', 'Confirmed', 'mp'],
   ['Defu industrial area: housing mix under study, linked to the Paya Lebar Air Base move', 'About 2 to 3 km, not measured', 'No date', 'More homes nearby later; could add supply', 'Planned', 'dmp'],
   ['Lifting of airbase height limits benefiting Hougang', 'Area-wide', 'No commitment', 'Commentators expect more redevelopment', 'Speculative', None]],
 'planLine': 'Only the Cross Island Line interchange and the integrated hub itself are Confirmed, and they are already in the expected launch price. Nothing else Confirmed within 2 km lifts the base case.',
 'score': [
   ['Location', 8, 'Hougang town centre on an MRT interchange (North East Line now, Cross Island Line 2030, Confirmed) with the town\'s largest mall on site; deep upgrader pool (591 four-room resales a year in Hougang).'],
   ['Entry price', 4, f"Expected $2,500 to $2,600 psf is 4% to 8% above our fair value of about {m(B['B'])}."],
   ['Exit plan', 5, 'Little competing supply within 2 km, but the 3-bed and 4-bed exit prices outrun most local upgraders.'],
   ['Nearby food', 8, 'A mall of about 300,000 sq ft on site (Confirmed) and Hougang Mall about 200 m away (OneMap). Hawker centres within a 5-minute walk: Not checked yet.'],
   ['MRT proximity', 10, 'Integrated with Hougang MRT (NE14), Confirmed by HDB\'s tender and the developers.']],
 'scoreNote': 'The scorecard (7.0) says this is a good place to live; the price test says it is a poor investment at the expected price. For investment buyers, the price test wins.',
 'facts': [
   ['Land price', '$1,500,738,338, about $1,179 psf ppr', 'C', 'hdb', '14 Jan 2026'],
   ['Bids', '3; next bids about $1,155 and $1,100 psf ppr', 'C', 'edgeprop', '16 Dec 2025'],
   ['Homes', 'About 830 (HDB estimated up to 835)', 'C', 'cl', '14 Jan 2026'],
   ['Tenure', '99 years', 'C', 'hdb', '14 Jan 2026'],
   ['Launch', 'Target second half of 2027, not announced', 'R', 'uol', '12 Aug 2026'],
   ['Completion', 'Target 2030 / 2031 for the development', 'C', 'cl', '14 Jan 2026'],
   ['Expected price', '$2,500 to $2,600 psf (analysts)', 'E', 'stacked', '16 Dec 2025'],
   ['Price list, unit mix, floor plans', 'Not available yet', 'C', 'cl', '25 Nov 2026']],
 'pros': ['Directly on an MRT interchange, with the Cross Island Line Confirmed for 2030', 'The town\'s largest mall, a bus interchange and a town plaza on site', 'Very little new private supply within 2 km', 'Deep, liquid resale market around it'],
 'cons': ['The 5% test fails at any realistic launch price', 'A 31% to 49% premium over 3-year-old condos nearby', 'Large 3-bed and 4-bed quanta outrun local upgraders at resale', 'Footfall and noise from the interchange and mall; construction only starting in 2027'],
 'compare': [['Hougang Central (expected)', '$2,500–2,600', '2H 2027', 'On MRT interchange', 'Fail'], ['ParkTown Residence', '$2,360', 'Feb 2025', 'Mall, hawker centre and bus interchange on site', 'Not tested'], ['Sengkang Grand Residences', '$1,747 at launch', 'May 2019', 'Next to Buangkok MRT', '3.0% a year to TOP+1']],
 'faq': [
   ['Is Hougang Central a good investment?', f"Not at the expected $2,500 to $2,600 psf. After stamp duty and selling costs, the base case earns about {pc(t3['at2600']['base'])} to {pc(t3['at2500']['base'])} a year by 2032. It would earn 5% only at about {m(t3['buyAt'])} psf, below what the developer can realistically sell at."],
   ['What price should I pay for a 3-bedroom?', f"Our walk-away price is about {m(t3['walk'])} psf, about {mq(t3['walkQuantum'])} for 1,000 sq ft. Above that, the base case falls below about 3% a year. These are estimates until the developer releases prices and sizes."],
   ['Who should buy Hougang Central?', 'Families who want to live above the MRT interchange and the new mall for 10 years or more. It does not suit buyers who need 5% a year or must sell within 5 to 6 years.'],
   ['When will the price list be out?', 'Not announced. UOL targets a launch in the second half of 2027. This analysis will be updated with the real prices and sizes.']],
 'chart': {
   'subject': [[2027, 2550], [2032, X['base']]],
   'five': [[2027, 2550], [2032, round(2550 * 1.0 + (t3['need5y'] - 2550))]],
   'comps': {'Sengkang Grand Residences': [[2019, 1747], [2020, 1731], [2021, 1720], [2022, 1812], [2023, 2001], [2024, 2027], [2025, 2016], [2026, 2091]],
             'The Florence Residences': [[2019, 1448], [2020, 1542], [2021, 1674], [2022, 1747], [2023, 1773], [2024, 1773], [2025, 1816], [2026, 1892]],
             'Riverfront Residences': [[2018, 1313], [2019, 1325], [2020, 1353], [2021, 1377], [2022, 1504], [2023, 1636], [2024, 1669], [2025, 1731], [2026, 1735]]},
   'note': f"Brass: Hougang Central bought at $2,550 psf (midpoint of analysts' range) and its base-case 2032 price. Dashed brass: the path needed for 5% a year net (about {m(t3['need5y'])} psf by 2032). Navy: what comparables actually did, yearly average psf from URA caveats. 2026 is January to November."},
 'src': S,
}
# 5% need table for a 1,000 sq ft unit at realistic entry prices
need = []
for e in (2300, 2400, 2500, 2600):
    price = e * 1000
    need.append([m(e), m(round(ns['bsd'](price))), m(round(ns['exit_needed'](e, 1000, 5))), m(round(ns['exit_needed'](e, 1000, 6)))])
std['test']['need'] = need
# returns table per type at $2,500 and $2,600
std['test']['returns'] = [[k, f"${e:,}", pc(U[k][lab]['bear']), pc(U[k][lab]['base']), pc(U[k][lab]['bull']), pc(U[k][lab]['cash']), pc(U[k][lab]['cashBear']), mq(U[k][lab]['cashIn'])]
                          for k in ['2-bed', '3-bed', '4-bed'] for e, lab in ((2500, 'at2500'), (2600, 'at2600'))]
std['chart']['five'] = [[2027, 2550], [2032, t3['need5y']]]
print(json.dumps({'hougang-central-site': std}, ensure_ascii=False, separators=(',', ':')))
