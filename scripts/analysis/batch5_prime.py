"""Batch 5 on method v2: prime and city-fringe sites. Bukit Timah Road (Newton), River Opus, Tanjong Rhu Road, Kallang Close,
River Valley Green Parcel C, Peck Hay Road, Dunearn Road Plot 2, Holland Plain Parcel B. District counts are generated from URA data."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NEAR = json.load(open(os.path.join(ROOT, 'data', 'nearby.json')))['proj']

HDB5 = {  # C: our medians from HDB resale records (data.gov.sg), Nov 2025 to Oct 2026 [price, deals]
 'Geylang': {'4-room': (740000, 230), '5-room': (925444, 74)}, 'Marine Parade': {'4-room': (637500, 38), '5-room': (1050000, 31)}}

ARC = "No developer cost published. Arcadis 2022 put prime condos above S$3,350 per sq m of construction area; allowing for construction area above floor area and cost rises since 2022 gives about $420 psf of floor area."
ARC_RCR = "No developer cost published. Arcadis 2022 put above-average condos at S$2,550 to 3,350 per sq m of construction area; allowing for construction area above floor area and cost rises since 2022 gives about $380 psf of floor area."
SIZES_CCR = {'2-bed': 700, '3-bed': 1000, '4-bed': 1350}
SIZES_RCR = {'2-bed': 680, '3-bed': 950, '4-bed': 1250}
SIZES_NOTE = 'No unit mix released. Sizes are typical of 2025–2026 launches in this area (our assumption).'
MP = ['URA, Master Plan 2025 gazetted, 1 Dec 2025', 'https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr25-64']
ONEMAP = ['OneMap (SLA), straight-line distances', 'https://www.onemap.gov.sg/']
TL = "Buy at the 2027 launch. No completion date is published; we assume TOP around 2030 or 2031. Seller's Stamp Duty applies for 4 years, so we look at a sale in 2032 (5 years)."
FAQ_PRICE = 'Not announced. The developer has not released a price list, unit mix or project name. This analysis will be updated with the real prices and sizes.'
MP_ROW = ['Master Plan 2025 (gazetted 1 Dec 2025)', 'Islandwide', 'In force', 'Sets the land use around the site', 'Confirmed', 'mp']
COMMON = dict(sizes_note=SIZES_NOTE, bull_add=0.0, years=5, buy_year=2027, timeline=TL, confidence='Low')


def district(key, lh, exp_txt, supply, supply_src):
    rows = NEAR[key]['r3']['rows']
    same = [r for r in rows if bool(lh) == (not any(w in r[2] for w in ('Freehold', '999', '947'))) and not r[12]]
    w1 = [r for r in rows if r[1] <= 1000 and not r[12]]
    top = max(w1, key=lambda r: r[6] or 0) if w1 else None
    g = [r for r in same if r[10] is not None and (r[6] or 0) >= 10]
    rng = (f'{min(r[10] for r in g):.1f}% to {max(r[10] for r in g):.1f}%' if len(g) > 1 else f'{g[0][10]:.1f}%') if g else ''
    gtxt = (f"Nearby {'99-year' if lh else 'freehold and 999-year'} condos with a 3-bed record moved {rng} a year over the past 4 years ({', '.join(r[0] for r in g[:3])}; URA caveats)."
            if g else f"Few nearby {'99-year' if lh else 'freehold'} condos have a 3-bed price record over 4 years with 10 or more resales a year.")
    return [['10-year price trend', 'URA non-landed index about 4.7% a year islandwide. ' + gtxt, 'C', 'caveats'],
            ['New vs older resale gap', exp_txt, 'C', 'caveats'],
            ['Volume and liquidity', f"{len(w1)}{'+' if len(w1) >= 25 else ''} resale condos within 1 km with {sum(r[6] or 0 for r in w1)} resales in the past 12 months" + (f"; {top[0]} had {top[6]}." if top else '.') + ' How fast units sell: Not available yet.', 'C', 'caveats'],
            ['Rents', 'Gross yields of nearby condos: Not available yet. URA: rents rose in Q3 2026.', 'C', 'ura'],
            ['Supply risk', supply, 'C', supply_src]]


def ours(name, slug): return [f'Our {name} file', f'/condo-analysis/{slug}/']


P = {}
P['bukit-timah-road-site-newton'] = dict(COMMON,
 name='Bukit Timah Road site (Newton)', land=1820, land_src='URA tender: $566.3M, about $1,820 psf ppr, 8 bids', build=420, build_lab='E', build_src='arcadis', build_note=ARC,
 expected=(3400, 3600), expected_note='Huttons and PropNex expect $3,400 to $3,600 psf (EdgeProp, Nov 2025).', sizes=SIZES_CCR, towns=['Toa Payoh', 'Bishan'],
 bull_why='Newton MRT is already an interchange and no new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders and investors who want a prime address on an MRT interchange, plus HDB upgraders from Toa Payoh and Bishan. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('bukit-timah-road-newton-gls', True, "Expected $3,400 to $3,600 psf against Kopar At Newton (completed 2023) at $2,508 before the 5% area adjustment.", 'The Peck Hay Road site (about 380 homes, about 400 m) and the Orchard Boulevard site (about 110 homes, about 1.3 km) will compete at the exit.', 'peckhay'),
 district_summary='Newton is a prime district of mostly small freehold condos, with few large new 99-year projects.',
 district_line='This district is prime and mature, but two new government sites within about 1.3 km will compete for the same buyers.',
 plan=[['Newton MRT interchange (North-South and Downtown Lines)', 'About 17 m', 'Open', 'Already in prices', 'Confirmed', 'onemap'],
       ['Peck Hay Road GLS (CDL and Hong Realty)', 'About 400 m', 'Launch not announced', 'A direct competitor at the exit', 'Confirmed', 'peckhay'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; nearby government sites add supply.',
 score=[['Location', 9, 'Prime Newton address next to an MRT interchange, about 1 km from Orchard Road (OneMap); Anglo-Chinese School (Junior) about 480 m.'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 9, 'Newton Food Centre by Newton MRT, which is about 17 m away (OneMap).'],
        ['MRT proximity', 10, 'Newton MRT interchange about 17 m in a straight line (OneMap).']],
 pros=['Next to Newton MRT interchange', 'Prime district near Orchard Road', 'Anglo-Chinese School (Junior) about 480 m', 'Newton Food Centre close by'],
 cons=['Expected price far above nearby 99-year resale', 'Winner paid 12% more than the next bidder', 'Peck Hay Road site nearby competes at the exit', 'Developer has little Singapore track record'],
 compare=[['Kopar At Newton', '$2,508 resale', 'Completed 2023', 'About 310 m', 'URA median, past 12 months'], ['Peck Hay Road site', 'Land $1,865 psf ppr', 'Not announced', 'About 400 m', 'Expected $3,400 to $3,900']],
 facts=[['Land price', '$566.3M, about $1,820 psf ppr', 'C', 'edgeprop_bt', '11 Nov 2025'], ['Bids', '8; next bid about $1,621 psf ppr (Hoi Hup, Sunway)', 'C', 'edgeprop_bt', '11 Nov 2025'],
        ['Developer', 'HH Investment (Huang Hsiang Construction, Taiwan)', 'C', 'edgeprop_bt', 'Nov 2025'], ['Homes', 'About 340 (estimate)', 'R', 'edgeprop_bt', 'Nov 2025'],
        ['Tenure', '99 years', 'C', 'edgeprop_bt', 'Nov 2025'], ['Expected price', '$3,400 to $3,600 psf (Huttons, PropNex)', 'E', 'edgeprop_bt', 'Nov 2025'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_bt', '25 Nov 2026']],
 faq_extra=[['Is the Bukit Timah Road (Newton) condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'edgeprop_bt': ['EdgeProp, HH Investment tops eight bids for Bukit Timah Road GLS site at $1,820 psf ppr, Nov 2025', 'https://www.edgeprop.sg/property-news/hh-investment-tops-eight-bids-bukit-timah-road-gls-site-1820-psf-ppr'],
            'peckhay': ours('Peck Hay Road site', 'peck-hay-road-gls'), 'onemap': ONEMAP, 'mp': MP})

P['the-river-opus'] = dict(COMMON,
 name='River Opus', land=None, priceA_none=[['Land', 'No land purchase', 'C', 'edgeprop_ro', 'The developers already own Valley Point, so there is no land price to work a cost floor from.'],
                                             ['Developer floor price', 'Not available', 'C', None, 'Without a land price, no cost floor can be worked out.']],
 build=420, build_lab='E', build_src='arcadis', build_note=ARC, leasehold=False, exp_word='tested',
 expected=(3200, 3400), expected_note='No analyst estimate found. We test $3,200 to $3,400 psf, around Newport Residences\' $3,370 freehold launch (Jan 2026).', sizes=SIZES_CCR, towns=['Bukit Merah', 'Queenstown'],
 bull_why='Great World MRT is already open and no new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders and investors who want a 999-year riverfront address near Great World, plus HDB upgraders from Bukit Merah and Queenstown. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('river-opus', False, "Tested $3,200 to $3,400 psf against RV Residences (999-year, completed 2015) at $2,395 and Gramercy Park (freehold, 2016) at $2,874 before the 5% area adjustment.", 'River Valley is in a heavy supply phase: Promenade Peak, Zyon Grand, River Modern and the River Valley Green Parcel C site are all within about 1 km.', 'rvgc'),
 district_summary='Upper River Valley is a prime riverside district with a wave of new launches around Great World.',
 district_line='This district is in a supply phase: four or more new projects within about 1 km compete for the same buyers.',
 plan=[['Great World MRT (Thomson-East Coast Line)', 'About 618 m', 'Open since 2022', 'Already in prices', 'Confirmed', 'onemap'],
       ['River Valley Green Parcel C and River Modern', 'About 900 m', 'Launches 2026 to 2027', 'Direct competitors at the exit', 'Confirmed', 'rvgc'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; nearby launches add supply.',
 score=[['Location', 8, 'Prime riverside River Valley, about 620 m from Great World MRT; Alexandra Primary School about 350 m (OneMap).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 7, 'Great World mall by Great World MRT, about 600 m away (OneMap); dining and retail planned on site (developers).'],
        ['MRT proximity', 7, 'Great World MRT about 618 m in a straight line (OneMap): about an 8-minute walk.']],
 pros=['999-year tenure', 'Riverside, near Great World and the city', 'Alexandra Primary School about 350 m', 'Experienced developers (Frasers, Mitsubishi Estate)'],
 cons=['Heavy new supply within 1 km', 'No land price to check the developer\'s cost', 'MRT about 600 m away', 'No published price, unit mix or completion date'],
 compare=[['Newport Residences', '$3,370', 'Jan 2026', 'About 2.9 km', 'Freehold'], ['RV Residences', '$2,395 resale', 'Completed 2015', 'About 210 m', '999-year; URA median']],
 facts=[['Land', 'Valley Point and Fraser Suites, already owned by the developers', 'C', 'edgeprop_ro', '30 Sep 2026'], ['Developer', 'Frasers Property 51%, Mitsubishi Estate 49%', 'C', 'edgeprop_ro', '30 Sep 2026'],
        ['Homes', 'About 407 (developers); 417 in one research note', 'R', 'edgeprop_ro', 'Sep 2026'], ['Tenure', '999 years from 1877', 'C', 'edgeprop_ro', 'Sep 2026'],
        ['Launch', '2027 (developers); about Feb 2027 (listing site)', 'R', 'edgeprop_ro', '2026'], ['Price list, unit mix', 'Not available yet', 'C', 'edgeprop_ro', '25 Nov 2026']],
 faq_extra=[['Is River Opus a good investment?', None], ['When will the price list be out?', 'Not announced. The developers say 2027. This analysis will be updated with the real prices and sizes.']],
 src_extra={'edgeprop_ro': ['EdgeProp, Valley Point and Fraser Suites to be redeveloped into a luxury mixed-use riverfront project, Sep 2026', 'https://www.edgeprop.sg/property-news/valley-point-and-fraser-suites-singapore-be-redeveloped-luxury-mixed-use-riverfront-project'],
            'rvgc': ours('River Valley Green Parcel C', 'river-valley-green-parcel-c'), 'onemap': ONEMAP, 'mp': MP})

P['tanjong-rhu-road-site'] = dict(COMMON,
 name='Tanjong Rhu Road site', land=1455, land_src='URA tender: $709.3M, about $1,455 psf ppr, 5 bids', build=380, build_lab='E', build_src='arcadis', build_note=ARC_RCR,
 expected=(2900, 3000), expected_note='CBRE expects $2,900 to $3,000 psf; PropNex slightly above $3,000 (EdgeProp, Feb 2026).', sizes=SIZES_RCR, towns=['Kallang/Whampoa', 'Marine Parade'],
 bull_why='Tanjong Rhu MRT opened in 2024 and no new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders from the older Tanjong Rhu condos, HDB upgraders from Kallang/Whampoa and Marine Parade, and buyers who want the waterfront near the city.',
 district=district('tanjong-rhu-road-gls', True, "Expected $2,900 to $3,000 psf against Water Place (completed 2004) at $1,915 and Sanctuary Green (2004) at $1,692 before the 5% area adjustment.", 'The first large new condo in Tanjong Rhu in over 20 years; a second Tanjong Rhu plot is due for tender, and Arina East Residences (freehold) is about 900 m away.', 'propnex_tr'),
 district_summary='Tanjong Rhu is a waterfront estate of 1990s and 2000s condos with almost no new supply for two decades.',
 district_line='This district is mature: older condos and little new supply, though a second government plot is coming next door.',
 plan=[['Tanjong Rhu MRT (Thomson-East Coast Line)', 'About 347 m', 'Open since 2024', 'Direct line to the city and the east; already in prices', 'Confirmed', 'onemap'],
       ['Second Tanjong Rhu plot', 'Next door', 'Tender due', 'A direct competitor at the exit', 'Planned', 'propnex_tr'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; a second plot next door adds supply.',
 score=[['Location', 7, 'Waterfront Tanjong Rhu by the Kallang Basin and Sports Hub, about 350 m from Tanjong Rhu MRT (OneMap).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 5, 'Few shops within a short walk. Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 8, 'Tanjong Rhu MRT about 347 m in a straight line (OneMap): about a 5-minute walk.']],
 pros=['First large new condo in Tanjong Rhu in over 20 years', 'Tanjong Rhu MRT about 350 m away', 'Waterfront and Sports Hub nearby', 'CDL and Woh Hup (Band 1 builders)'],
 cons=['Expected price far above nearby older resale', 'Second plot next door competes at the exit', 'Few shops within a short walk', 'No published unit mix or name yet'],
 compare=[['Water Place', '$1,915 resale', 'Completed 2004', 'About 430 m', 'URA median, past 12 months'], ['Aurea', '$3,005', 'Mar 2025', 'About 1.4 km', 'Launch average']],
 facts=[['Land price', '$709.3M, about $1,455 psf ppr', 'C', 'edgeprop_tr', '5 Feb 2026'], ['Bids', '5; next bid about $1,419 psf ppr (Sunway MCL, Sinarmas Land)', 'C', 'edgeprop_tr', '5 Feb 2026'],
        ['Developer', 'CDL 90%, Woh Hup 10%', 'C', 'edgeprop_tr', 'Feb 2026'], ['Homes', 'About 520 to 525 (estimate)', 'R', 'edgeprop_tr', 'Feb 2026'],
        ['Tenure', '99 years', 'C', 'edgeprop_tr', 'Feb 2026'], ['Expected price', '$2,900 to $3,000 psf (CBRE); slightly above $3,000 (PropNex)', 'E', 'edgeprop_tr', 'Feb 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_tr', '25 Nov 2026']],
 faq_extra=[['Is the Tanjong Rhu Road condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'edgeprop_tr': ['EdgeProp, CDL-Woh Hup JV submits top bid of $1,455 psf ppr for Tanjong Rhu Road GLS site, Feb 2026', 'https://www.edgeprop.sg/property-news/cdl-woh-hup-jv-submits-top-bid-1455-psf-ppr-tanjong-rhu-road-gls-site'],
            'propnex_tr': ['PropNex, Tanjong Rhu to receive first large condo project in over two decades', 'https://www.propnex.com/picks-details/1200/tanjong-rhu-to-receive-first-large-condo-project-in-over-two-decades'],
            'onemap': ONEMAP, 'mp': MP})

P['kallang-close-site'] = dict(COMMON,
 name='Kallang Close site', land=1415, land_src='URA tender: $610.7M, about $1,415 psf ppr, 4 bids', build=380, build_lab='E', build_src='arcadis', build_note=ARC_RCR,
 expected=(3000, 3100), expected_note='Knight Frank expects prices from $2,900 psf and an average above $3,000 (EdgeProp, Apr 2026).', sizes=SIZES_RCR, towns=['Kallang/Whampoa', 'Geylang'],
 bull_why='Kallang MRT is already open and no new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be HDB upgraders from Kallang/Whampoa and Geylang, city workers, and buyers who want the Kallang River next to an MRT station.',
 district=district('kallang-close-gls', True, "Expected about $3,000 psf against Sturdee Residences (completed 2019) at $2,198 and Eight Riversuites (2016) at $1,882 before the 5% area adjustment.", 'Aurea (about 1.1 km) and the Tanjong Rhu Road site (about 1.7 km) launch around the same time.', 'tanjongrhu'),
 district_summary='Kallang Close sits on the Kallang River next to Kallang MRT, among mid-2000s and 2010s condos.',
 district_line='This district is maturing: a riverside MRT location with moderate competing supply from Aurea and Tanjong Rhu.',
 plan=[['Kallang MRT (East-West Line)', 'About 39 m', 'Open', 'Already in prices', 'Confirmed', 'onemap'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period. Any growth has to come from the location and the wider market.',
 score=[['Location', 7, 'On the Kallang River next to Kallang MRT, about 3 km from the city centre.'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 6, 'Shops and eateries along Kallang and Bendemeer. Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 10, 'Kallang MRT about 39 m in a straight line (OneMap).']],
 pros=['Next to Kallang MRT', 'Kallang River setting', 'Experienced developers (Frasers, Mitsubishi Estate)', 'Close to the city'],
 cons=['Expected price far above nearby resale', 'Aurea and Tanjong Rhu launches compete', 'Winning bid only 0.7% above the next', 'No published unit mix or name yet'],
 compare=[['Aurea', '$3,005', 'Mar 2025', 'About 1.0 km', 'Launch average'], ['Sturdee Residences', '$2,198 resale', 'Completed 2019', 'About 950 m', 'URA median, past 12 months']],
 facts=[['Land price', '$610.7M, about $1,415 psf ppr', 'C', 'edgeprop_kc', 'Apr 2026'], ['Bids', '4; next bid about $1,405 psf ppr (CDL)', 'C', 'edgeprop_kc', '7 Apr 2026'],
        ['Developer', 'Frasers Property and Mitsubishi Estate', 'C', 'frasers_kc', 'Apr 2026'], ['Homes', 'About 470 (developers)', 'C', 'frasers_kc', 'Apr 2026'],
        ['Tenure', '99 years', 'C', 'edgeprop_kc', 'Apr 2026'], ['Expected price', 'From $2,900 psf, average above $3,000 (Knight Frank)', 'E', 'edgeprop_kc', 'Apr 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_kc', '25 Nov 2026']],
 faq_extra=[['Is the Kallang Close condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'edgeprop_kc': ['EdgeProp, Frasers Property-Mitsubishi Estate tops bid for Kallang Close GLS site at $1,415 psf ppr, Apr 2026', 'https://www.edgeprop.sg/property-news/frasers-property-mitsubishi-estate-tops-bid-kallang-close-gls-site-1415-psf-ppr'],
            'frasers_kc': ['Frasers Property, joint venture for the Kallang Close GLS site, Apr 2026', 'https://www.frasersproperty.com/sg/press-releases/2026/04-apr/frasers-property-mitsubishi-estate-joint-venture-kallang-close-gls'],
            'tanjongrhu': ours('Tanjong Rhu Road site', 'tanjong-rhu-road-gls'), 'onemap': ONEMAP, 'mp': MP})

P['river-valley-green-parcel-c'] = dict(COMMON,
 name='River Valley Green Parcel C', land=1730, land_src='URA tender: $750.6M, about $1,730 psf ppr, 4 bids', build=420, build_lab='E', build_src='arcadis', build_note=ARC,
 expected=(3300, 3500), expected_note='PropNex and CBRE expect $3,300 to $3,500 psf (EdgeProp, Jun 2026).', sizes=SIZES_CCR, towns=['Bukit Merah', 'Queenstown'],
 bull_why='Great World MRT is already open and no new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders and investors who want River Valley next to Great World MRT, plus HDB upgraders from Bukit Merah and Queenstown. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('river-valley-green-parcel-c', True, "Expected $3,300 to $3,500 psf against River Modern next door (launched Mar 2026 at $3,266) and Martin Modern (completed 2021) at $2,822.", 'River Modern (next door), Promenade Peak (about 300 m) and Zyon Grand (about 400 m) all complete around the same time.', 'rivermodern'),
 district_summary='River Valley Green is the centre of a new cluster of 99-year prime condos around Great World MRT.',
 district_line='This district is in a heavy supply phase: four new projects within about 400 m reach completion close together.',
 plan=[['Great World MRT (Thomson-East Coast Line)', 'About 121 m', 'Open since 2022', 'Already in prices', 'Confirmed', 'onemap'],
       ['River Modern, Promenade Peak, Zyon Grand', 'Next door to about 400 m', 'Launched 2024 to 2026', 'Direct competitors at the exit', 'Confirmed', 'rivermodern'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; the cluster of new launches adds supply.',
 score=[['Location', 9, 'Prime River Valley next to Great World MRT and River Valley Primary School (about 137 m, OneMap).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 8, 'Great World mall by Great World MRT, about 120 m away (OneMap).'],
        ['MRT proximity', 9, 'Great World MRT about 121 m in a straight line (OneMap): about a 2-minute walk.']],
 pros=['Great World MRT about 120 m away', 'River Valley Primary School about 140 m away', 'Prime River Valley, near the Singapore River', 'Strong recent launches nearby'],
 cons=['Heavy new supply within 400 m', 'Highest land price in the cluster', 'Expected price above River Modern next door', 'No published unit mix or name yet'],
 compare=[['River Modern', '$3,266', 'Mar 2026', 'Next door', 'Launch average'], ['Martin Modern', '$2,822 resale', 'Completed 2021', 'About 350 m', 'URA median, past 12 months']],
 facts=[['Land price', '$750.6M, about $1,730 psf ppr', 'C', 'edgeprop_rv', '18 Jun 2026'], ['Bids', '4; next bid about $1,661 psf ppr (China Overseas Land)', 'C', 'edgeprop_rv', '18 Jun 2026'],
        ['Developer', 'Sunway MCL and CSC Land', 'C', 'edgeprop_rv', 'Jun 2026'], ['Homes', 'About 470 (estimate)', 'R', 'edgeprop_rv', 'Jun 2026'],
        ['Tenure', '99 years', 'C', 'edgeprop_rv', 'Jun 2026'], ['Expected price', '$3,300 to $3,500 psf (PropNex, CBRE)', 'E', 'edgeprop_rv', 'Jun 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_rv', '25 Nov 2026']],
 faq_extra=[['Is the River Valley Green Parcel C condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'edgeprop_rv': ['EdgeProp, Sunway MCL-CSC Land JV tops bids for River Valley Green GLS site at $1,730 psf ppr, Jun 2026', 'https://www.edgeprop.sg/property-news/sunway-mcl-csc-land-group-jv-tops-bids-river-valley-green-gls-site-1730-psf-ppr'],
            'rivermodern': ours('River Modern', 'river-modern'), 'onemap': ONEMAP, 'mp': MP})

P['peck-hay-road-site'] = dict(COMMON,
 name='Peck Hay Road site', land=1865, land_src='URA tender: $542.4M, about $1,865 psf ppr, 4 bids', build=420, build_lab='E', build_src='arcadis', build_note=ARC,
 expected=(3400, 3900), expected_note='PropNex, ERA, CBRE and Knight Frank expect $3,400 to $3,900 psf (EdgeProp, Jun 2026).', sizes=SIZES_CCR, towns=['Toa Payoh', 'Bishan'],
 bull_why='No new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders and investors who want a prime address near Orchard Road and Anglo-Chinese School (Junior), plus HDB upgraders from Toa Payoh and Bishan. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('peck-hay-road-gls', True, "Expected $3,400 to $3,900 psf against Kopar At Newton (completed 2023) at $2,508 and Cairnhill Nine (2016) at $2,458 before the 5% area adjustment.", 'The Bukit Timah Road (Newton) site (about 340 homes, about 400 m) and the Orchard Boulevard site (about 1.1 km) will compete at the exit.', 'newton'),
 district_summary='Peck Hay Road is a quiet prime street between Newton and Orchard, mostly small freehold condos.',
 district_line='This district is prime and mature, but two new government sites within about 1.1 km will compete for the same buyers.',
 plan=[['Newton MRT interchange', 'About 324 m', 'Open', 'Already in prices', 'Confirmed', 'onemap'],
       ['Bukit Timah Road (Newton) GLS', 'About 400 m', 'Launch 2027 (estimate)', 'A direct competitor at the exit', 'Confirmed', 'newton'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; nearby government sites add supply.',
 score=[['Location', 9, 'Prime street between Newton and Orchard; Anglo-Chinese School (Junior) about 270 m (OneMap).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 7, 'Orchard Road malls about 800 m away (Orchard MRT 819 m, OneMap). Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 8, 'Newton MRT about 324 m in a straight line (OneMap): about a 4-minute walk.']],
 pros=['Prime street near Orchard Road', 'Anglo-Chinese School (Junior) about 270 m', 'Newton MRT about 320 m', 'CDL (Band 1 builder record)'],
 cons=['Highest land rate in this batch ($1,865 psf ppr)', 'Expected price far above nearby 99-year resale', 'Newton site nearby competes at the exit', 'No published unit mix or name yet'],
 compare=[['Kopar At Newton', '$2,508 resale', 'Completed 2023', 'About 470 m', 'URA median, past 12 months'], ['Bukit Timah Road (Newton) site', 'Land $1,820 psf ppr', '2027 (estimate)', 'About 400 m', 'Expected $3,400 to $3,600']],
 facts=[['Land price', '$542.4M, about $1,865 psf ppr', 'C', 'edgeprop_ph', '11 Jun 2026'], ['Bids', '4; next bid about $1,720 psf ppr (Sunway MCL, CSC Land)', 'C', 'edgeprop_ph', '11 Jun 2026'],
        ['Developer', 'CDL and Hong Realty', 'C', 'edgeprop_ph', 'Jun 2026'], ['Homes', 'About 315 to 380 (sources differ)', 'R', 'edgeprop_ph', 'Jun 2026'],
        ['Tenure', '99 years', 'C', 'edgeprop_ph', 'Jun 2026'], ['Expected price', '$3,400 to $3,900 psf (PropNex, ERA, CBRE, Knight Frank)', 'E', 'edgeprop_ph', 'Jun 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_ph', '25 Nov 2026']],
 faq_extra=[['Is the Peck Hay Road condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'edgeprop_ph': ['EdgeProp, CDL and Hong Leong JV submits top bid of $1,865 psf ppr for Peck Hay Road GLS site, Jun 2026', 'https://www.edgeprop.sg/property-news/cdl-and-hong-leong-jv-submits-top-bid-1865-psf-ppr-peck-hay-road-gls-site'],
            'newton': ours('Bukit Timah Road (Newton) site', 'bukit-timah-road-newton-gls'), 'onemap': ONEMAP, 'mp': MP})

P['dunearn-road-plot-2'] = dict(COMMON,
 name='Dunearn Road Plot 2', land=1625, land_src='URA tender: $533M, about $1,625 psf ppr, 6 bids', build=420, build_lab='E', build_src='arcadis', build_note=ARC,
 expected=(3000, 3300), expected_note='PropNex, SRI and CBRE expect $3,000 to $3,300 psf (EdgeProp, Apr 2026).', sizes=SIZES_CCR, towns=['Queenstown', 'Clementi'],
 bull_why='Sixth Avenue MRT is already open and the Turf City plans are not Confirmed for the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders from the Bukit Timah area, HDB upgraders from Queenstown and Clementi, and families who want the Bukit Timah schools belt. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('dunearn-road-turf-city-2nd-site', True, "Expected $3,000 to $3,300 psf against Dunearn House next door (launched Jul 2026 at $3,140) and Fourth Avenue Residences (completed 2022) at $2,601.", 'Dunearn House (next door) and Amberwood at Holland (about 900 m) are selling now, and more Turf City and Holland Plain sites are planned.', 'dunearnhouse'),
 district_summary='Turf City is the start of a new 99-year housing area in the freehold-dominated Bukit Timah belt.',
 district_line='This district is entering a supply phase: Dunearn House next door, Holland Plain nearby and more Turf City land to come.',
 plan=[['Sixth Avenue MRT (Downtown Line)', 'About 445 m', 'Open', 'Already in prices', 'Confirmed', 'onemap'],
       ['Dunearn House (first Turf City site)', 'Next door', 'Launched Jul 2026', 'A direct competitor at the exit', 'Confirmed', 'dunearnhouse'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; more Turf City and Holland Plain land adds supply.',
 score=[['Location', 8, 'Bukit Timah belt near Sixth Avenue MRT, within reach of the area\'s popular schools.'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 6, 'Shops and eateries along Sixth Avenue and Bukit Timah Road. Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 7, 'Sixth Avenue MRT about 445 m in a straight line (OneMap): about a 6-minute walk.']],
 pros=['Bukit Timah belt address', 'Sixth Avenue MRT about 450 m', 'Experienced developers (Wing Tai, Metro)', 'Dunearn House next door sets a clear benchmark'],
 cons=['Dunearn House next door competes directly', 'More Turf City and Holland Plain supply to come', 'Land cost 15% above Dunearn House', 'No published unit mix or name yet'],
 compare=[['Dunearn House', '$3,140', 'Jul 2026', 'Next door', 'Launch average'], ['Fourth Avenue Residences', '$2,601 resale', 'Completed 2022', 'About 610 m', 'URA median, past 12 months']],
 facts=[['Land price', '$533M, about $1,625 psf ppr', 'C', 'edgeprop_dr', '28 Apr 2026'], ['Bids', '6; next bid about $1,576 psf ppr (Frasers, CSC Land, Sekisui House)', 'C', 'edgeprop_dr', '28 Apr 2026'],
        ['Developer', 'Wing Tai and Metro Holdings', 'C', 'edgeprop_dr', 'Apr 2026'], ['Homes', 'About 330 to 335 (estimate)', 'R', 'edgeprop_dr', 'Apr 2026'],
        ['Tenure', '99 years', 'C', 'edgeprop_dr', 'Apr 2026'], ['Expected price', '$3,000 to $3,300 psf (PropNex, SRI, CBRE)', 'E', 'edgeprop_dr', 'Apr 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'edgeprop_dr', '25 Nov 2026']],
 faq_extra=[['Is the Dunearn Road Plot 2 condo a good investment?', None], ['How does it compare with Dunearn House?', 'Dunearn House, next door, launched at about $3,140 psf in July 2026. This site\'s land cost about 15% more, so expect it to launch at or above Dunearn House\'s price.']],
 src_extra={'edgeprop_dr': ['EdgeProp, Wing Tai-Metro JV tops six bids for second Dunearn Road GLS site at $1,625 psf ppr, Apr 2026', 'https://www.edgeprop.sg/property-news/wing-tai-metro-jv-tops-six-bids-second-dunearn-road-gls-site-1625-psf-ppr'],
            'dunearnhouse': ours('Dunearn House', 'dunearn-house'), 'onemap': ONEMAP, 'mp': MP})

P['holland-plain-parcel-b'] = dict(COMMON,
 name='Holland Plain Parcel B', land=1491, land_src='URA tender: $454M, about $1,491 psf ppr, 1 bid', build=420, build_lab='E', build_src='arcadis', build_note=ARC,
 expected=(3000, 3100), expected_note='CBRE expects $3,000 to $3,100 psf if Sim Lian combines this site with its plot next door (CBRE, May 2026).', sizes=SIZES_CCR, towns=['Queenstown', 'Clementi'],
 bull_why='No new Confirmed catalyst is due in the holding period, so the bull case equals the base case.',
 who='Most buyers at resale will be private-condo upgraders from the Holland and Bukit Timah area, HDB upgraders from Queenstown and Clementi, and families for Methodist Girls\' School about 630 m away. Foreign buyers pay 60% Additional Buyer\'s Stamp Duty.',
 district=district('holland-plain-sim-lian-2nd-site', True, "Expected $3,000 to $3,100 psf against Amberwood at Holland next door (launched Sep 2026 at $3,019) and Mayfair Modern (completed 2022) at $2,241.", 'Amberwood at Holland (about 400 m) is selling now, and Dunearn House and Dunearn Road Plot 2 are about 1.2 to 2.8 km away.', 'amberwood'),
 district_summary='Holland Plain is a new 99-year housing precinct in a district of large freehold condos and landed homes.',
 district_line='This district is entering a supply phase: Amberwood at Holland next door and more Holland Plain and Turf City land to come.',
 plan=[['King Albert Park MRT (Downtown Line)', 'About 949 m', 'Open', 'Already in prices', 'Confirmed', 'onemap'],
       ['Amberwood at Holland (Sim Lian, Holland Plain first site)', 'About 400 m', 'Launched Sep 2026', 'A direct competitor at the exit', 'Confirmed', 'amberwood'], MP_ROW],
 plan_line='No new Confirmed catalyst in the holding period; the Holland Plain precinct adds supply.',
 score=[['Location', 7, 'New Holland Plain precinct in the Bukit Timah area; Methodist Girls\' School (primary) about 630 m (OneMap).'],
        ['Entry price', None, 'entry'], ['Exit plan', None, 'exit'],
        ['Nearby food', 5, 'Little within a short walk. Hawker centres within a 5-minute walk: Not checked yet.'],
        ['MRT proximity', 4, 'King Albert Park MRT about 949 m in a straight line (OneMap): about a 13-minute walk.']],
 pros=['Prime District 10 address', 'Methodist Girls\' School (primary) about 630 m', 'Can be combined with Sim Lian\'s plot next door', 'Lower land rate than Turf City sites'],
 cons=['Only one bidder: no market check on the land price', 'Amberwood at Holland next door competes directly', 'MRT about 950 m away', 'No published unit mix or name yet'],
 compare=[['Amberwood at Holland', '$3,019', 'Sep 2026', 'About 400 m', 'Launch average'], ['Mayfair Modern', '$2,241 resale', 'Completed 2022', 'About 1.2 km', 'URA median, past 12 months']],
 facts=[['Land price', '$454M, about $1,491 psf ppr', 'C', 'ura_hp', '12 May 2026'], ['Bids', '1 (sole bid)', 'C', 'ura_hp', '7 May 2026'],
        ['Developer', 'Sim Lian Land and Sim Lian Development', 'C', 'ura_hp', '12 May 2026'], ['Homes', 'About 280 (estimate)', 'R', 'edgeprop_hp', 'May 2026'],
        ['Tenure', '99 years', 'C', 'ura_hp', 'May 2026'], ['Expected price', '$3,000 to $3,100 psf if combined with the plot next door (CBRE)', 'E', 'cbre_hp', 'May 2026'], ['Price list, unit mix, name', 'Not available yet', 'C', 'ura_hp', '25 Nov 2026']],
 faq_extra=[['Is the Holland Plain Parcel B condo a good investment?', None], ['When will the price list be out?', FAQ_PRICE]],
 src_extra={'ura_hp': ['URA, tender award for the Holland Plain site, 12 May 2026', 'https://www.ura.gov.sg/news/media/pr26-37/'],
            'edgeprop_hp': ['EdgeProp, Sim Lian puts in sole bid of $1,491 psf ppr for second Holland Plain site, May 2026', 'https://www.edgeprop.sg/property-news/sim-lian-puts-sole-bid-1491-psf-ppr-second-prime-condo-site-new-holland-plain-precinct'],
            'cbre_hp': ['CBRE, commentary on the Holland Plain tender closing, May 2026', 'https://www.cbre.com.sg/press-releases/commentary-on-ura-tender-closing-at-holland-plain'],
            'amberwood': ours('Amberwood at Holland', 'amberwood-at-holland'), 'onemap': ONEMAP, 'mp': MP})

META5 = {'bukit-timah-road-site-newton': ('bukit-timah-road-newton-gls', 340), 'the-river-opus': ('river-opus', 407), 'tanjong-rhu-road-site': ('tanjong-rhu-road-gls', 520),
         'kallang-close-site': ('kallang-close-gls', 470), 'river-valley-green-parcel-c': ('river-valley-green-parcel-c', 470), 'peck-hay-road-site': ('peck-hay-road-gls', 315),
         'dunearn-road-plot-2': ('dunearn-road-turf-city-2nd-site', 330), 'holland-plain-parcel-b': ('holland-plain-sim-lian-2nd-site', 280)}
