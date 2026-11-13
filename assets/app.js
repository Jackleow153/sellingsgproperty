
        // BUILD:CARD-RENDER START (scripts/build-pages.cjs runs everything from here to "Filter Functions")
        // Full Project Data from Excel + Realistic Details
        const projects = [
            // 2025 Launches
            { id: 1, name: "Union Square Residences", location: "Havelock Road, D01", district: "rcr", year: "2024", launchSort: 202411, developer: "City Developments Limited (CDL) (entity: CDL Libra/Conservo/Centro)", totalUnits: 366, availableUnits: 89, top: "Q1 2029 (VP ~2031)", tenure: "99 Years Leasehold", image: "", startingPrice: 1380000, avgPSF: 2966, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Clarke Quay (NE5) 431m", description: "Premium development in the heart of the CBD with excellent connectivity and lifestyle amenities.", unitMix: [{ type: "1 Bedroom", units: 110, size: "463 sqft", psf: 2966, price: 1380000 }, { type: "1 Bedroom + Study", units: 50, size: "506 sqft", psf: 2966, price: 1500000 }, { type: "2 Bedroom", units: 147, size: "700-743 sqft", psf: 2966, price: 2200000 }, { type: "3 Bedroom", units: 73, size: "990-1,066 sqft", psf: 2966, price: 3120000 }], amenities: ["Infinity Pool", "Sky Gym", "Co-working Lounge", "BBQ Pavilion", "Concierge"], distanceMRT: "431m to Clarke Quay MRT", schools: "River Valley Primary", launchDate: "9 Nov 2024", siteArea: "78,900 sqft" },
            
            { id: 2, name: "Aurea", location: "Beach Road, D07", district: "ccr", year: "2025", launchSort: 202503, developer: "GMC Property Pte. Ltd. (JV: Far East Organization & Perennial Holdings)", totalUnits: 188, availableUnits: 34, top: "Q2 2029 (VP ~2030)", tenure: "99 Years Leasehold", image: "", startingPrice: 1920000, avgPSF: 2840, bedrooms: [2,3,4,5,6], type: "Private Condominium", mrt: "Nicoll Highway (CC5) 600m", description: "Modern development in vibrant Bugis with excellent MRT connectivity and lifestyle options.", unitMix: [{ type: "2 Bedroom", units: 74, size: "635-710 sqft", psf: 2840, price: 1920000 }, { type: "3 Bedroom", units: 37, size: "1001 sqft", psf: 2840, price: 2850000 }, { type: "4 Bedroom", units: 37, size: "1442-1798 sqft", psf: 2840, price: 4000000 }], amenities: ["Rooftop Pool", "Gym", "Co-working Space", "BBQ Area", "Sky Terrace"], distanceMRT: "600m to Nicoll Highway MRT", schools: "Stamford Primary", launchDate: "Mar 2025", siteArea: "52,400 sqft" },
            
            { id: 3, name: "The Collective at One Sophia", location: "Sophia Road, D09", district: "ccr", year: "2024", launchSort: 202411, developer: "Sophia Residential Pte Ltd / Sophia Commercial Pte Ltd (JV: CEL Development, SingHaiyi Crystal & Ultra Infinity)", totalUnits: 367, availableUnits: 67, top: "Q4 2028", tenure: "99 Years Leasehold", image: "", startingPrice: 1140000, avgPSF: 2809, bedrooms: [0,1,2,3], type: "Private Condominium", mrt: "Bencoolen (DT21) ~3 min", description: "Prime development near Orchard Road with excellent connectivity and lifestyle amenities.", unitMix: [{ type: "Studio", units: 110, size: "431-452 sqft", psf: 2809, price: 1140000 }, { type: "1 Bedroom", units: 147, size: "484-538 sqft", psf: 2809, price: 1720000 }, { type: "2 Bedroom", units: 73, size: "646-764 sqft", psf: 2809, price: 2560000 }], amenities: ["Infinity Pool", "Sky Gym", "Co-working Lounge", "BBQ Pavilion", "Concierge"], distanceMRT: "~3 min to Bencoolen MRT", schools: "St. Margaret's School (Primary)", launchDate: "Nov 2024 (preview sales from 6 Nov 2024; public launch Jan 2025)", siteArea: "82,500 sqft" },
            
            { id: 4, name: "The Orie", location: "Lorong 1 Toa Payoh, D12", district: "rcr", year: "2025", launchSort: 202501, developer: "City Developments Ltd, Frasers Property & Sekisui House (entity: Transcend Residential (Toa Payoh) Pte Ltd)", totalUnits: 777, availableUnits: 234, top: "2028/2029 (Q2 2028 per developer site; corrected from EdgeProp anomaly)", tenure: "99 Years Leasehold", image: "", startingPrice: 1280000, avgPSF: 2704, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Braddell (NS18) ~5 min", description: "Large family-oriented development in mature Toa Payoh estate with excellent schools and amenities.", unitMix: [{ type: "1 Bedroom + Study", units: 155, size: "517 sqft", psf: 2704, price: 1280000 }, { type: "2 Bedroom", units: 233, size: "592-700 sqft", psf: 2704, price: 1890000 }, { type: "3 Bedroom", units: 311, size: "850-1,130 sqft", psf: 2704, price: 2670000 }], amenities: ["Lap Pool", "Gym", "Playground", "BBQ Area", "Community Garden"], distanceMRT: "~5 min to Braddell MRT (also near Caldecott MRT for showflat)", schools: "CHIJ Primary (Toa Payoh), First Toa Payoh Primary, Kheng Cheng School, Pei Chun Public School", launchDate: "Jan 2025", siteArea: "178,900 sqft" },
            
            { id: 5, name: "Arina East Residences", location: "Tanjong Rhu Road, D15", district: "rcr", year: "2025", launchSort: 202506, developer: "ZACD LV Development Pte Ltd (ZACD Group, Welltech Construction (Qingjian) & FRX Capital)", totalUnits: 107, availableUnits: 23, top: "Q4 2027 (VP 2028)", tenure: "Freehold", image: "", startingPrice: 1270000, avgPSF: 2811, bedrooms: [1,2,3,4], type: "Private Condominium", mrt: "Katong Park (TE24) ~3 min", description: "Rare freehold development in established East Coast area with excellent lifestyle amenities.", unitMix: [{ type: "1 Bedroom", units: 10, size: "495 sqft", psf: 2811, price: 1270000 }, { type: "2 Bedroom", units: 32, size: "678-861 sqft", psf: 2811, price: 1920000 }, { type: "3 Bedroom", units: 43, size: "969-1,238 sqft", psf: 2811, price: 2930000 }, { type: "4 Bedroom", units: 21, size: "1,324-1,679 sqft", psf: 2811, price: 3980000 }], amenities: ["Rooftop Infinity Pool", "Private Gym", "Wine Cellar", "Library Lounge", "Concierge"], distanceMRT: "~3 min to Katong Park MRT", schools: "Kong Hwa School, Tanjong Katong Primary", launchDate: "Jun 2025 (preview ~Apr–Jul 2025)", siteArea: "45,200 sqft" },
            
            { id: 6, name: "Meyer Blue", location: "83 Meyer Road, D15", district: "rcr", year: "2024", launchSort: 202410, developer: "UOL Group & Singapore Land (entity: United Venture Development (Meyer) Pte Ltd)", totalUnits: 226, availableUnits: 45, top: "~2028 (31 Dec 2028 per developer)", tenure: "Freehold", image: "", startingPrice: 2000000, avgPSF: 3172, bedrooms: [2,3,4,5], type: "Private Condominium", mrt: "Katong Park (TE24) / Tanjong Katong (TE25), ~6 min walk to Katong Park", description: "Premium freehold development in established Meyer Road area with excellent lifestyle and connectivity.", unitMix: [{ type: "2 Bedroom Premium", units: 68, size: "667 sqft", psf: 3172, price: 2000000 }, { type: "2 Bedroom + Study", units: 68, size: "710 sqft", psf: 3172, price: 2100000 }, { type: "3 Bedroom", units: 90, size: "990-1,141 sqft", psf: 3172, price: 3200000 }, { type: "4 Bedroom", units: 45, size: "1,518-1,733 sqft", psf: 3172, price: 4800000 }, { type: "5 Bedroom", units: 20, size: "1,905 sqft", psf: 3172, price: 6000000 }], amenities: ["Rooftop Infinity Pool", "Private Gym", "Wine Cellar", "Library Lounge", "Concierge"], distanceMRT: "~6 min walk to Katong Park MRT", schools: "None within 1km (nearest Kong Hwa ~1.5km, Tao Nan ~1.7km+)", launchDate: "5 Oct 2024 (private launch)", siteArea: "58,400 sqft" },
            
            { id: 7, name: "Emerald of Katong", location: "Jalan Tembusu, D15", district: "rcr", year: "2024", launchSort: 202411, developer: "Sim Lian Group (entity: Sim Lian JV (Katong) Pte Ltd)", totalUnits: 846, availableUnits: 312, top: "Q2 2029 (VP ~30 Jun 2029)", tenure: "99 Years Leasehold (fr. 2023)", image: "", startingPrice: 1430000, avgPSF: 2839, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Tanjong Katong (TE25), ~5 min walk / Marine Parade (TE26)", description: "Large family development in vibrant Katong with excellent schools and lifestyle amenities.", unitMix: [{ type: "1 Bedroom + Study", units: 50, size: "484 sqft", psf: 2839, price: 1430000 }, { type: "2 Bedroom", units: 254, size: "624-700 sqft", psf: 2839, price: 1780000 }, { type: "3 Bedroom", units: 338, size: "883-1,023 sqft", psf: 2839, price: 2500000 }, { type: "4 Bedroom", units: 169, size: "1,152-1,313 sqft", psf: 2839, price: 3700000 }, { type: "5 Bedroom", units: 35, size: "1,475-1,561 sqft", psf: 2839, price: 4500000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~5 min walk to Tanjong Katong MRT", schools: "Tanjong Katong Primary, Haig Girls' School (within 1km)", launchDate: "Nov 2024", siteArea: "198,500 sqft" },
            
            { id: 8, name: "Bagnall Haus", location: "Upper East Coast Road, D16", district: "ocr", year: "2025", launchSort: 202501, developer: "Roxy-Pacific Holdings (entity: RL Bagnall Pte Ltd)", totalUnits: 113, availableUnits: 28, top: "~2028 (31 Dec 2028 per developer)", tenure: "Freehold", image: "", startingPrice: 1240000, avgPSF: 2575, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Sungei Bedok (DT37/TE31), ~2 min / Bedok South (TE30)", description: "Rare freehold development in established Upper East Coast area with excellent lifestyle.", unitMix: [{ type: "1 Bedroom", units: 20, size: "495 sqft", psf: 2575, price: 1240000 }, { type: "2 Bedroom + Study", units: 34, size: "721 sqft", psf: 2575, price: 1850000 }, { type: "3 Bedroom", units: 45, size: "1,033 sqft", psf: 2575, price: 2650000 }, { type: "4 Bedroom Deluxe", units: 23, size: "1,385 sqft", psf: 2575, price: 3550000 }], amenities: ["Rooftop Infinity Pool", "Private Gym", "Wine Cellar", "Library Lounge", "Concierge"], distanceMRT: "~2 min to Sungei Bedok MRT", schools: "Temasek Primary (~1km, borderline)", launchDate: "18 Jan 2025", siteArea: "42,500 sqft" },
            
            { id: 9, name: "Kassia", location: "Flora Drive, D17", district: "ocr", year: "2024", launchSort: 202407, developer: "Tripartite Developers (Hong Leong Holdings, CDL & TID) (Tripartite Developers Pte Ltd)", totalUnits: 276, availableUnits: 67, top: "Q4 2029 (VP no later than ~Nov 2029)", tenure: "Freehold", image: "", startingPrice: 883000, avgPSF: 2032, bedrooms: [1,2,3,4], type: "Private Condominium", mrt: "Tampines East (DT33), bus/~15-min walk; upcoming Pasir Ris East (CR4) / Loyang (CR3)", description: "Family-friendly freehold development in established Flora Drive area with excellent schools.", unitMix: [{ type: "1 Bedroom", units: 30, size: "474 sqft", psf: 2032, price: 883000 }, { type: "1 Bedroom + Study", units: 20, size: "500 sqft", psf: 2032, price: 950000 }, { type: "2 Bedroom", units: 83, size: "600 sqft", psf: 2032, price: 1200000 }, { type: "3 Bedroom", units: 110, size: "850 sqft", psf: 2032, price: 1700000 }, { type: "4 Bedroom", units: 55, size: "1,345 sqft", psf: 2032, price: 2700000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Area", "Community Garden"], distanceMRT: "bus to Tampines East MRT (~15 min walk)", schools: "East Spring Primary (~600m); also Japanese School nearby (~462m)", launchDate: "Jul 2024", siteArea: "78,900 sqft" },
            
            { id: 10, name: "Parktown Residence", location: "Tampines Street 62, D18", district: "ocr", year: "2025", launchSort: 202502, developer: "UOL, CapitaLand Development & Singapore Land (entity: Topaz Residential/Commercial Pte Ltd)", totalUnits: 1193, availableUnits: 456, top: "30 Jun 2030 (VP 30 Jun 2030)", tenure: "99 Years Leasehold", image: "", startingPrice: 1050000, avgPSF: 2328, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Tampines North (CR6) integrated, ~2 min (453m)", description: "Large family development in mature Tampines estate with excellent schools and connectivity.", unitMix: [{ type: "1 Bedroom + Study", units: 100, size: "463-506 sqft", psf: 2328, price: 1050000 }, { type: "2 Bedroom", units: 358, size: "592-764 sqft", psf: 2328, price: 1400000 }, { type: "3 Bedroom", units: 478, size: "926-1,184 sqft", psf: 2328, price: 2200000 }, { type: "4 Bedroom", units: 239, size: "1,335-1,496 sqft", psf: 2328, price: 3500000 }, { type: "5 Bedroom Premium", units: 119, size: "1,679 sqft", psf: 2328, price: 4500000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~2 min (453m) to Tampines North MRT", schools: "Angsana Primary, Poi Ching School (strong network confirmed)", launchDate: "Feb 2025", siteArea: "245,600 sqft" },
            
            { id: 11, name: "Chuan Park", location: "Lorong Chuan, D19", district: "ocr", year: "2024", launchSort: 202411, developer: "Kingsford Development & MCC Land (entity: Chuan Park Development Pte Ltd)", totalUnits: 916, availableUnits: 312, top: "Q4 2028", tenure: "99 LH (fr. 2024)", image: "", startingPrice: 1600000, avgPSF: 2650, bedrooms: [2,3,4,5], type: "Private Condominium", mrt: "Lorong Chuan (CC14), next to / <10 min walk", description: "Large-scale family development in established Serangoon area with excellent schools and amenities.", unitMix: [{ type: "2 Bedroom", units: 275, size: "700 sqft", psf: 2650, price: 1600000 }, { type: "3 Bedroom", units: 366, size: "861 sqft", psf: 2650, price: 2300000 }, { type: "4 Bedroom", units: 183, size: "1,173 sqft", psf: 2650, price: 3100000 }, { type: "5 Bedroom", units: 92, size: "1,485 sqft", psf: 2650, price: 3900000 }], amenities: ["50m Lap Pool", "Residents' Gym", "Kids Club", "Wellness Spa", "BBQ Pavilions", "Community Garden"], distanceMRT: "next to Lorong Chuan MRT", schools: "St. Gabriel's Primary (~495m / 2 mins), Yangzheng Primary (~0.53km), CHIJ Our Lady of Good Counsel (~0.62km)", launchDate: "Nov 2024", siteArea: "245,600 sqft" },
            
            { id: 12, name: "8@BT", location: "6 / 8 Bukit Timah Link, D21", district: "ccr", year: "2024", launchSort: 202409, developer: "Bukit Sembawang Estates (entity: Bukit One Pte Ltd)", totalUnits: 158, availableUnits: 34, top: "Q4 2027 (VP 30 Nov 2028)", tenure: "99 LH (fr. 2023)", image: "", startingPrice: 1310000, avgPSF: 2674, bedrooms: [1,2,3,4], type: "Private Condominium", mrt: "Beauty World (DT5), ~2 min walk", description: "Premium development in prime Bukit Timah with excellent schools and lifestyle amenities.", unitMix: [{ type: "1 Bedroom", units: 47, size: "517-592 sqft", psf: 2674, price: 1310000 }, { type: "2 Bedroom", units: 63, size: "624-829 sqft", psf: 2674, price: 1700000 }, { type: "3 Bedroom", units: 32, size: "1001-1270 sqft", psf: 2674, price: 2600000 }, { type: "4 Bedroom / PH", units: 16, size: "1356-1593 sqft", psf: 2674, price: 4300000 }], amenities: ["Resort Pool", "Tennis Court", "Kids Club", "Wellness Spa", "BBQ Pavilions", "Sky Terraces"], distanceMRT: "~2 min walk to Beauty World MRT", schools: "Pei Hwa Presbyterian Primary (~0.4km); also Bukit Timah Primary, Methodist Girls’ School nearby", launchDate: "21 Sep 2024", siteArea: "52,400 sqft" },
            
            { id: 13, name: "Nava Grove", location: "38–42 Pine Grove, D21", district: "ccr", year: "2024", launchSort: 202411, developer: "MCL Land & Sinarmas Land (entity: Golden Ray Edge 3 Pte Ltd)", totalUnits: 552, availableUnits: 178, top: "2028 (VP 14 Nov 2028)", tenure: "99 LH (fr. 2024)", image: "", startingPrice: 1390000, avgPSF: 2606, bedrooms: [2,3,4,5], type: "Private Condominium", mrt: "Dover (EW22), ~1km / bus (no easy walking MRT; upcoming Maju CR16)", description: "Premium development in prime Bukit Timah with excellent schools and lifestyle amenities.", unitMix: [{ type: "2 Bedroom", units: 166, size: "624 sqft", psf: 2606, price: 1390000 }, { type: "2 Bedroom Premium", units: 50, size: "700 sqft", psf: 2606, price: 1500000 }, { type: "2 Bedroom + Study", units: 50, size: "786 sqft", psf: 2606, price: 1650000 }, { type: "3 Bedroom", units: 221, size: "947-990 sqft", psf: 2606, price: 2000000 }, { type: "4 Bedroom", units: 110, size: "1,335 sqft", psf: 2606, price: 2800000 }, { type: "5 Bedroom Premium + PL", units: 50, size: "1,550-1,722 sqft", psf: 2606, price: 3800000 }], amenities: ["Resort Pool", "Tennis Court", "Kids Club", "Wellness Spa", "BBQ Pavilions", "Sky Terraces"], distanceMRT: "~1km / bus to Dover MRT (no easy walking MRT)", schools: "Henry Park Primary, Pei Tong Primary (~1km borderline); also Methodist Girls’ School & universities nearby", launchDate: "Nov 2024", siteArea: "134,500 sqft" },
            
            { id: 14, name: "Sora", location: "72 Yuan Ching Road, D22", district: "ocr", year: "2024", launchSort: 202407, developer: "SingHaiyi, Chip Eng Seng (CEL) & KSH Holdings (entity: Lakeside Residential Pte Ltd)", totalUnits: 440, availableUnits: 134, top: "Q4 2028", tenure: "99 LH", image: "", startingPrice: 996000, avgPSF: 2160, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Chinese Garden (EW25) / Lakeside (EW26), ~13–15 min walk", description: "Family-friendly development in mature Clementi estate with excellent schools and connectivity.", unitMix: [{ type: "1 Bedroom + Study", units: 50, size: "538-689 sqft", psf: 2160, price: 996000 }, { type: "2 Bedroom Deluxe", units: 132, size: "646-807 sqft", psf: 2160, price: 1400000 }, { type: "3 Bedroom", units: 176, size: "936-1410 sqft", psf: 2160, price: 2000000 }, { type: "4 Bedroom Luxury", units: 88, size: "1528-1787 sqft", psf: 2160, price: 3200000 }, { type: "5 Bedroom Luxury", units: 44, size: "1679-1938 sqft", psf: 2160, price: 4000000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Area", "Community Garden"], distanceMRT: "~13–15 min walk to Chinese Garden / Lakeside MRT", schools: "Lakeside Primary (~950m)", launchDate: "Jul 2024", siteArea: "112,500 sqft" },
            
            { id: 15, name: "Norwood Grand", location: "Champions Way, D25", district: "ocr", year: "2024", launchSort: 202410, developer: "CDL (entity: CDL Stellar Pte Ltd)", totalUnits: 348, availableUnits: 89, top: "2028 (VP 31 Mar 2030)", tenure: "99 LH (fr. 2023)", image: "", startingPrice: 1050000, avgPSF: 2069, bedrooms: [1,2,3,4], type: "Private Condominium", mrt: "Woodlands South (TE3), ~5 min walk", description: "Family development in mature Woodlands estate with excellent schools and connectivity.", unitMix: [{ type: "1 Bedroom + Study", units: 104, size: "495 sqft", psf: 2069, price: 1050000 }, { type: "2 Bedroom", units: 104, size: "600 sqft", psf: 2069, price: 1250000 }, { type: "3 Bedroom", units: 139, size: "850 sqft", psf: 2069, price: 1800000 }, { type: "4 Bedroom", units: 70, size: "1,119-1335 sqft", psf: 2069, price: 2700000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Area", "Community Garden"], distanceMRT: "~5 min walk to Woodlands South MRT", schools: "Innova Primary (adjacent), Woodgrove Primary, Si Ling Primary, Woodlands Primary", launchDate: "Oct 2024", siteArea: "98,400 sqft" },
            
            { id: 16, name: "Springleaf Residence", location: "Upper Thomson Road, D26", district: "ocr", year: "2025", launchSort: 202508, developer: "GuocoLand & Hong Leong Holdings (entity: Springleaf Residence Pte Ltd)", totalUnits: 941, availableUnits: 312, top: "Q4 2031 (EdgeProp)", tenure: "99 LH (fr. 2024)", image: "", startingPrice: 860000, avgPSF: 2178, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Springleaf (TE4), ~2 min (~260m)", description: "Large family development in established Upper Thomson area with excellent schools and nature access.", unitMix: [{ type: "1 Bedroom conserved", units: 100, size: "388 sqft", psf: 2178, price: 860000 }, { type: "2 Bedroom", units: 282, size: "527-646 sqft", psf: 2178, price: 1400000 }, { type: "3 Bedroom", units: 376, size: "786-1,076 sqft", psf: 2178, price: 2000000 }, { type: "4 Bedroom", units: 188, size: "1,227 sqft", psf: 2178, price: 2700000 }, { type: "5 Bedroom", units: 94, size: "1,453-1,475 sqft", psf: 2178, price: 3200000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~260m to Springleaf MRT", schools: "None within 1km (Anderson Primary ~1 MRT stop; CHIJ St Nicholas etc. ~1–2 stops away)", launchDate: "Aug 2025", siteArea: "198,500 sqft" },
            
            { id: 17, name: "Coastal Cabana (EC)", location: "Jalan Loyang Besar, D17", district: "ocr", year: "2026", launchSort: 202601, developer: "Qingjian Realty, Forsea Holdings, ZACD Group & Jianan Capital (entity: Pasir Ris Development Pte Ltd)", totalUnits: 748, availableUnits: 234, top: "Q1 2029 (VP 31 Mar 2029)", tenure: "99 LH (EC)", image: "", startingPrice: 1430000, avgPSF: 1792, bedrooms: [3,4,5], type: "Executive Condominium", mrt: "Pasir Ris (EW1), ~650m; upcoming Pasir Ris East (CR4)", description: "Executive Condominium in established Upper East Coast area with excellent schools and lifestyle.", unitMix: [{ type: "3 Bedroom Deluxe", units: 224, size: "872 sqft", psf: 1792, price: 1430000 }, { type: "3 Bedroom Premium / +Study", units: 150, size: "915 sqft", psf: 1792, price: 1600000 }, { type: "4 Bedroom", units: 150, size: "990-1,216 sqft", psf: 1792, price: 1900000 }, { type: "5 Bedroom Premium", units: 75, size: "1,367-1,421 sqft", psf: 1792, price: 2500000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~650m to Pasir Ris MRT", schools: "Casuarina Primary (~0.4km), Pasir Ris Primary (~0.8km)", launchDate: "Jan 2026 (sales launch 17 Jan; EdgeProp Dec 2025 preview)", siteArea: "178,900 sqft" },
            
            // 2026 Launches (YTD)
            { id: 18, name: "Narra Residences", location: "Dairy Farm Walk, D23", district: "ocr", year: "2026", launchSort: 202601, developer: "Santarli Realty & Apex Asia (+ partners) (entity: Dairy Farm Walk JV Development Pte Ltd)", totalUnits: 540, availableUnits: 312, top: "Q1 2030", tenure: "99 LH", image: "", startingPrice: 998000, avgPSF: 2180, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Hillview (DT3), minutes away / ~10 min; Cashew (DT2)", description: "Family development in mature Bukit Panjang estate with excellent schools and connectivity.", unitMix: [{ type: "1 Bedroom + Study", units: 50, size: "517 sqft", psf: 2180, price: 998000 }, { type: "2 Bedroom", units: 162, size: "560-721 sqft", psf: 2180, price: 1400000 }, { type: "3 Bedroom", units: 216, size: "818-1,173 sqft", psf: 2180, price: 2000000 }, { type: "4 Bedroom", units: 108, size: "1,152-1,378 sqft", psf: 2180, price: 2800000 }, { type: "5 Bedroom + PL", units: 50, size: "1,658-1,679 sqft", psf: 2180, price: 3600000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Area", "Community Garden"], distanceMRT: "~10 min to Hillview MRT", schools: "CHIJ Our Lady Queen of Peace, Bukit Panjang Primary (within 1km; + GESS & The Perse intl schools)", launchDate: "Jan 2026", siteArea: "124,500 sqft" },
            
            { id: 19, name: "Newport Residences", location: "80 Anson Road, D02", district: "ccr", year: "2026", launchSort: 202601, developer: "CDL (entity: CDL Pisces Commercial / Serviced Residences / Hong Leong Properties Pte Ltd)", totalUnits: 246, availableUnits: 89, top: "Q4 2027", tenure: "Freehold", image: "", startingPrice: 1600000, avgPSF: 3131, bedrooms: [1,2,3,4], type: "Private Condominium", mrt: "Prince Edward (CC33), ~330m; Tanjong Pagar (EW15), ~6 min", description: "Premium freehold development in the heart of the CBD with excellent connectivity.", unitMix: [{ type: "1 Bedroom", units: 74, size: "431-495 sqft", psf: 3131, price: 1600000 }, { type: "1 Bedroom + Study", units: 50, size: "581 sqft", psf: 3131, price: 1850000 }, { type: "2 Bedroom", units: 98, size: "646-926 sqft", psf: 3131, price: 2200000 }, { type: "3 Bedroom", units: 49, size: "980-1,227 sqft", psf: 3131, price: 3000000 }, { type: "4 Bedroom Premium", units: 20, size: "2,067 sqft", psf: 3131, price: 6500000 }], amenities: ["Infinity Pool", "Sky Gym", "Co-working Lounge", "BBQ Pavilion", "Concierge"], distanceMRT: "~330m to Prince Edward MRT", schools: "Cantonment Primary (~500m)", launchDate: "Jan 2026", siteArea: "58,400 sqft" },
            
            { id: 20, name: "River Modern", location: "River Valley Green, D09", district: "ccr", year: "2026", launchSort: 202603, developer: "GuocoLand (entity: River Modern Pte Ltd)", totalUnits: 455, availableUnits: 178, top: "Q3 2030", tenure: "99 LH", image: "", startingPrice: 2000000, avgPSF: 3266, bedrooms: [2,3,4], type: "Private Condominium", mrt: "Great World (TE15), direct underground link", description: "Modern development in prime River Valley with excellent connectivity and lifestyle amenities.", unitMix: [{ type: "2 Bedroom", units: 136, size: "538-689 sqft", psf: 3266, price: 2000000 }, { type: "3 Bedroom", units: 182, size: "797-1,109 sqft", psf: 3266, price: 2600000 }, { type: "4 Bedroom", units: 91, size: "1,464-1,830 sqft", psf: 3266, price: 4800000 }], amenities: ["Infinity Pool", "Sky Gym", "Co-working Lounge", "BBQ Pavilion", "Concierge"], distanceMRT: "direct link to Great World MRT", schools: "River Valley Primary (on River Valley Green / same road)", launchDate: "Mar 2026", siteArea: "98,400 sqft" },
            
            { id: 21, name: "Rivelle Tampines (EC)", location: "Tampines Street 95 (Tampines West), D18", district: "ocr", year: "2026", launchSort: 202603, developer: "Sim Lian Group (entity: Sim Lian JV (Tampines 7) Pte Ltd)", totalUnits: 572, availableUnits: 7, top: "Q2 2030", tenure: "99 LH (EC)", image: "", startingPrice: 1588000, avgPSF: 1939, bedrooms: [3,4,5], type: "Executive Condominium", mrt: "Tampines West (DT31), directly opposite / 5-min walk; Bedok Reservoir (DT30)", description: "Executive Condominium in Tampines West, nearly fully sold (98.8%) with strong schools and direct MRT access. First 2026 EC to hit high take-up.", unitMix: [{ type: "3 Bedroom", units: 280, size: "883-926 sqft", psf: 1939, price: 1588000 }, { type: "3 Bedroom Premium", units: 120, size: "926 sqft", psf: 1939, price: 1720000 }, { type: "4 Bedroom", units: 120, size: "1044-1184 sqft", psf: 1939, price: 2100000 }, { type: "5 Bedroom", units: 52, size: "1378 sqft", psf: 1939, price: 2800000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "directly opposite / 5-min walk to Tampines West (DT31) MRT", schools: "St Hilda's Primary, Junyuan Primary, Tampines Primary, St Anthony's Canossian Primary (within 1km)", launchDate: "Mar 2026", siteArea: "134,500 sqft" },
            
            { id: 22, name: "Pinery Residences", location: "Tampines Street 94 (Tampines West), D18", district: "ocr", year: "2026", launchSort: 202603, developer: "Hoi Hup Realty & Sunway MCL (entity: Hoi Hup Sunway Tampines Residential / Commercial Pte Ltd)", totalUnits: 588, availableUnits: 40, top: "Q1 2030 (VP 9 Oct 2031)", tenure: "99 LH", image: "", startingPrice: 1486000, avgPSF: 2546, bedrooms: [2,3,4,5], type: "Private Condominium", mrt: "Tampines West (DT31), direct underground link via Pinery Mall (24-hour access)", description: "Private condo integrated above Pinery Mall in Tampines West with 24h direct MRT link. Strong 93.2% sales momentum since Mar 2026 launch.", unitMix: [{ type: "2 Bedroom", units: 200, size: "624-667 sqft", psf: 2546, price: 1486000 }, { type: "2 Bedroom Premium + Study", units: 80, size: "700 sqft", psf: 2546, price: 1620000 }, { type: "3 Bedroom", units: 160, size: "807-1023 sqft", psf: 2546, price: 2100000 }, { type: "4 Bedroom", units: 100, size: "1055-1238 sqft", psf: 2546, price: 2700000 }, { type: "5 Bedroom Luxury", units: 48, size: "1389-1475 sqft", psf: 2546, price: 3600000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden", "Mall Link"], distanceMRT: "direct underground link (24-hour) to Tampines West (DT31) MRT via Pinery Mall", schools: "St Hilda's Primary, Tampines Primary, St Anthony's Canossian Primary, Junyuan Primary (within 1km)", launchDate: "Mar 2026", siteArea: "145,600 sqft" },
            
            { id: 23, name: "Tengah Garden Residences", location: "Tengah Garden Walk / Avenue (Tengah), D24", district: "ocr", year: "2026", launchSort: 202604, developer: "Hong Leong Holdings, GuocoLand & CSC Land Group (entity: Tengah Garden Development Pte Ltd / TGA Development Pte Ltd)", totalUnits: 863, availableUnits: 3, top: "~2030 (Q3 2029 / Dec 2030 est.)", tenure: "99 LH (fr. 2025)", image: "", startingPrice: 980000, avgPSF: 2120, bedrooms: [2,3,4], type: "Private Condominium", mrt: "Hong Kah (Jurong Region Line, upcoming), ~1 min covered walk", description: "First private condominium in Tengah (not EC). 99.7% sold on launch weekend at avg $2,120 psf. Affordable entry among 2026 OCR privates. Note: EdgeProp AI Buddy may confuse with a different 2025 EC — verify on correct new-launches page.", unitMix: [{ type: "2 Bedroom", units: 320, size: "550-624 sqft", psf: 2120, price: 980000 }, { type: "3 Bedroom", units: 360, size: "657-904 sqft", psf: 2120, price: 1450000 }, { type: "4 Bedroom", units: 183, size: "1130-1259 sqft", psf: 2120, price: 2500000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~1 min covered walk to upcoming Hong Kah MRT (Jurong Region Line)", schools: "Anglo-Chinese Primary (relocating to Tengah), Princess Elizabeth Primary (catchments still forming)", launchDate: "Apr 2026", siteArea: "198,500 sqft" },
            
            { id: 24, name: "Vela Bay", location: "Bayshore Road / Bayshore Walk (Bayshore precinct, Bedok), D16", district: "ocr", year: "2026", launchSort: 202604, developer: "SingHaiyi Group + Haiyi Holdings & Chuan Capital (entity: Bayshore Walk Pte Ltd)", totalUnits: 515, availableUnits: 144, top: "~2030 (VP 31 Dec 2031)", tenure: "99 LH (fr. 2025)", image: "", startingPrice: 1300000, avgPSF: 2886, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "Bayshore (TE29), doorstep (~2 min)", description: "First private condominium in the new Bayshore precinct (D16, OCR). ~70% sea-facing units. 72% sold on launch day Apr 2026 at $2,886 psf. Doorstep to Bayshore MRT.", unitMix: [{ type: "1 Bedroom + Study", units: 90, size: "484 sqft", psf: 2886, price: 1300000 }, { type: "2 Bedroom", units: 140, size: "592 sqft", psf: 2886, price: 1750000 }, { type: "2 Bedroom Premium", units: 60, size: "678-689 sqft", psf: 2886, price: 1950000 }, { type: "3 Bedroom", units: 110, size: "883-1033 sqft", psf: 2886, price: 2600000 }, { type: "4 Bedroom / PL", units: 70, size: "1173-1378 sqft", psf: 2886, price: 3500000 }, { type: "5 Bedroom PL", units: 30, size: "1582 sqft", psf: 2886, price: 4600000 }, { type: "Penthouse", units: 15, size: "1765 sqft", psf: 2886, price: 5200000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "doorstep (~2 min) to Bayshore (TE29) MRT", schools: "Temasek Primary (within 1km)", launchDate: "Apr 2026", siteArea: "124,500 sqft" },
            
            { id: 25, name: "Hudson Place Residences", location: "Media Circle (one-north / Queenstown planning area), D05", district: "rcr", year: "2026", launchSort: 202605, developer: "Qingjian Realty, Forsea Holdings, CYZ Land & Jianan Capital (entity: Media Circle Alpha Development Pte Ltd)", totalUnits: 327, availableUnits: 118, top: "~2029 (VP 30 Sep 2029)", tenure: "99 LH (fr. 2025)", image: "", startingPrice: 1400000, avgPSF: 2458, bedrooms: [2,3,4], type: "Private Condominium", mrt: "one-north (CC23) / Buona Vista (CC22, EW21), ~10 min walk / shuttle", description: "Design-led New York red-brick inspired residences in Media Circle, one-north (Queenstown planning area, RCR). Third Qingjian-led project in the precinct. 63.9% sold launch weekend May 2026 at $2,458 psf. Not MRT-adjacent — ~10 min walk to one-north/Buona Vista + developer 1-year shuttle.", unitMix: [{ type: "2 Bedroom Premium", units: 110, size: "646 sqft", psf: 2458, price: 1400000 }, { type: "2 Bedroom Premium + Study", units: 50, size: "689 sqft", psf: 2458, price: 1550000 }, { type: "3 Bedroom / +Study", units: 90, size: "893-1055 sqft", psf: 2458, price: 2200000 }, { type: "4 Bedroom / +Flexi", units: 50, size: "1152-1432 sqft", psf: 2458, price: 3000000 }, { type: "Penthouse", units: 27, size: "1744-2916 sqft", psf: 2458, price: 4800000 }], amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Community Garden"], distanceMRT: "~10 min walk to one-north (CC23) / Buona Vista (CC22/EW21); developer offers 1-year shuttle", schools: "New Town Primary (~890m); Fairfield Methodist (~1.38km) & Queenstown Primary (~1.44km) in 1–2km band (family consideration)", launchDate: "May 2026", siteArea: "82,500 sqft" },
            
            // Launched in 2026 (moved from the former "Upcoming 2026" tab; launch results verified Nov 2026)
            { id: 26, name: "Lentor Gardens Residences", location: "Lentor Gardens (Lentor Hills), D26", district: "ocr", year: "2026", launchSort: 202607, developer: "Kingsford Group (entity: Kingsford Huray Development Pte Ltd)", totalUnits: 502, availableUnits: 229, top: "Q3 2029 (expected)", tenure: "99 LH", image: "/project/lentor-gardens-residences/lentor-gardens-card.webp", startingPrice: 1356600, avgPSF: 2350, bedrooms: [2,3,4], type: "Private Condominium", mrt: "Lentor (TE5), ~700–780m", description: "Kingsford Group's first project in Lentor Hills and the seventh private launch in the estate. Launched 18 July 2026: 270 of 499 apartments (54%) sold on launch day at an average of $2,350 psf (excluding the three strata terraced houses). All three shops were also sold, at an average of $2,550 psf. Indicative prices started from about $2,050 psf. Land bought at $920 psf ppr, the lowest Lentor GLS land rate. Expected TOP Q3 2029.", unitMix: [{ type: "2 Bedroom", units: "—", size: "646–732 sqft", psf: 2350, psfLabel: "from ~$2,050 (avg $2,350)", price: 1356600, priceLabel: "from ~$1.36M" }, { type: "3 Bedroom", units: "—", size: "872+ sqft", psf: 2350, psfLabel: "avg $2,350", price: 1900000, priceLabel: "TBC" }, { type: "4 Bedroom", units: "—", size: "1,346 sqft", psf: 2350, psfLabel: "from ~$2,050", price: 2760000, priceLabel: "from ~$2.76M" }], pricingNote: "Average and entry psf are developer-announced figures; unit counts per type are not published here.", amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Childcare Centre"], distanceMRT: "~700–780m to Lentor (TE5) MRT", schools: "CHIJ St. Nicholas Girls' (~1km, borderline); Anderson Primary nearby", launchDate: "18 Jul 2026 (preview 4 Jul 2026)", siteArea: "222,161 sqft" },

            { id: 27, name: "Sophia Meadow", location: "132 Sophia Road (Mount Sophia), D09", district: "ccr", year: "2026", launchSort: 202608, developer: "Sin Thai Hin Development (Pte) Ltd", totalUnits: 41, availableUnits: 41, top: "VP 30 Nov 2029 (expected)", tenure: "103-year leasehold (from 15 Mar 2024)", image: "", startingPrice: 1273000, avgPSF: 2650, bedrooms: [1,2,3], type: "Private Condominium", mrt: "Dhoby Ghaut (NS24/NE6/CC1), ~9 min walk", description: "Boutique 41-unit, five-storey development at 132 Sophia Road, Mount Sophia (D9 CCR). 103-year leasehold. Preview from 25 July 2026, booking from 1 August 2026. Indicative pricing about $2,500 to $2,800 psf, with one-bedders from about $1.27M. Launch-weekend take-up was not publicly reported.", unitMix: [{ type: "1 Bedroom", units: 10, size: "484 sqft", psf: 2630, psfLabel: "~$2,480–2,630", price: 1273000, priceLabel: "from ~$1.27M" }, { type: "1 Bedroom + Study", units: 4, size: "560 sqft", psf: 2700, psfLabel: "indicative", price: 0, priceLabel: "TBC" }, { type: "2 Bedroom", units: 17, size: "614–635 sqft", psf: 2770, psfLabel: "~$2,770–2,800", price: 1700000, priceLabel: "from ~$1.70M" }, { type: "3 Bedroom", units: 10, size: "840–893 sqft", psf: 2660, psfLabel: "~$2,660–2,940", price: 2379000, priceLabel: "from ~$2.38M" }], pricingNote: "Indicative pricing from marketing listings at launch; check the latest developer price list.", amenities: ["Rooftop Pool", "Gym", "Lounge"], distanceMRT: "~9 min walk to Dhoby Ghaut MRT", schools: "St Margaret's School (Primary), Anglo-Chinese School (Junior) within 1km", launchDate: "1 Aug 2026 (preview 25 Jul 2026)", siteArea: "13,783 sqft" },

            { id: 28, name: "Thomson Reserve", location: "Bright Hill Drive (Upper Thomson; former Thomson View), D20", district: "rcr", year: "2026", launchSort: 202610, developer: "UOL Group, Singapore Land Group & CapitaLand Development (JV)", totalUnits: 1268, availableUnits: 125, top: "2H 2030 (expected)", tenure: "99 LH (fresh lease)", image: "", startingPrice: 1544000, avgPSF: 2900, bedrooms: [2,3,4,5], type: "Private Condominium", mrt: "Upper Thomson (TE8), ~320m sheltered walk; Bright Hill (CRL, upcoming)", description: "Redevelopment of the former Thomson View (en bloc $810M, $1,178 psf ppr) by UOL, Singapore Land and CapitaLand Development. 1,268 homes, two- to five-bedroom. Preview drew 11,800 visitors on 17–18 Oct 2026. Over the 30 Oct VIP and 31 Oct 2026 public launch, 1,143 units (90.1%) were sold at an average of $2,900 psf, the best-selling launch of 2026 by volume. 125 units remained after the launch period (123 two-bedders and two 5-bedroom suites). Lowest launch price was $2,608 psf for a 592 sq ft two-bedder.", unitMix: [{ type: "2 Bedroom", units: "—", size: "from 592 sqft", psf: 2608, psfLabel: "from $2,608", price: 1544000, priceLabel: "from ~$1.54M" }, { type: "3 Bedroom", units: "—", size: "—", psf: 2900, psfLabel: "sold out at launch", price: 0, priceLabel: "Sold out" }, { type: "4 Bedroom", units: "—", size: "—", psf: 2900, psfLabel: "sold out at launch", price: 0, priceLabel: "Sold out" }, { type: "5 Bedroom Suite", units: "2 left", size: "—", psf: 2900, psfLabel: "avg $2,900 (project)", price: 0, priceLabel: "TBC" }], pricingNote: "Project average $2,900 psf; availability as reported at the end of the launch period (31 Oct 2026) and may have changed.", amenities: ["Lap Pool", "Gym", "Kids Playground", "BBQ Pavilions", "Clubhouse", "Tennis Court"], distanceMRT: "~320m sheltered walk to Upper Thomson (TE8) MRT; Bright Hill CRL interchange upcoming", schools: "Ai Tong School (within 1km)", launchDate: "31 Oct 2026 (VIP 30 Oct; preview 17 Oct 2026)", siteArea: "555,063 sqft" },

            { id: 29, name: "Dunearn House", location: "760–770 Dunearn Road (Bukit Timah Turf City), D11", district: "ccr", year: "2026", launchSort: 202607, developer: "Frasers Property, CSC Land Group & Sekisui House (entity: Phoenix Dunearn Pte Ltd)", totalUnits: 380, availableUnits: 168, top: "Est. 2030", tenure: "99 LH (from 30 Sep 2025)", image: "", startingPrice: 1475000, avgPSF: 3140, bedrooms: [2,3,4], type: "Private Condominium", mrt: "Sixth Avenue (DT7), ~4 min walk; future Turf City (CRL)", description: "First private launch in the Bukit Timah Turf City masterplan. Launched 25–26 July 2026: 212 of 380 units (56%) sold at an average of $3,140 psf. Three-bedroom and three-bedroom flexi types sold out over the launch weekend; 89% of standard four-bedders were taken up. Prices started from $1.475M. Land bought at $1,410 psf ppr; the adjacent second Dunearn Road plot later went for $1,625 psf ppr.", unitMix: [{ type: "2 Bedroom / 2 Bedroom + Study", units: "—", size: "from ~603 sqft", psf: 3140, psfLabel: "avg $3,140 (project)", price: 1475000, priceLabel: "from $1.475M" }, { type: "3 Bedroom / 3 Bedroom Flexi", units: "—", size: "—", psf: 3140, psfLabel: "sold out at launch", price: 0, priceLabel: "Sold out" }, { type: "4 Bedroom", units: "—", size: "~1,180–1,378 sqft", psf: 3140, psfLabel: "avg $3,140 (project)", price: 0, priceLabel: "TBC" }], pricingNote: "Project average $3,140 psf at launch weekend (25–26 Jul 2026). Availability may have changed since.", amenities: ["Resort Pool", "Gym", "Kids Club", "BBQ Pavilions", "Landscaped Garden Zones"], distanceMRT: "~4 min walk to Sixth Avenue (DT7) MRT; future Turf City (CRL) within walking distance", schools: "Methodist Girls' School (Primary) likely within 1km (developer awaiting confirmation); Bukit Timah school belt", launchDate: "25 Jul 2026", siteArea: "~145,250 sqft" },

            { id: 30, name: "Duet@Emily", location: "Mount Emily Road (Nos. 2, 4 & 6), D09", district: "ccr", year: "2026", launchSort: 202605, developer: "ZACD Property Pte Ltd (ZACD Group)", totalUnits: 20, availableUnits: 20, top: "TBC (sources differ, 2026–2028)", tenure: "Freehold", image: "", startingPrice: 1010000, avgPSF: 2500, bedrooms: [1,2], type: "Private Condominium", mrt: "Rochor (DT13) ~400m; Little India (NE7/DT12) ~430m", description: "Boutique 20-unit freehold project pairing a restored heritage building with a new residential annex at Mount Emily Road (D9 CCR). One- and two-bedroom units plus loft units. Huttons listed it as a May 2026 launch; URA caveats show sales from July 2026 at about $2,430 to $2,690 psf. Units sold are not published here because the developer has not released a total.", unitMix: [{ type: "1 Bedroom", units: "—", size: "409–506 sqft", psf: 2470, psfLabel: "~$2,430–2,650", price: 1010000, priceLabel: "from ~$1.01M" }, { type: "2 Bedroom", units: "—", size: "549–850 sqft", psf: 2450, psfLabel: "~$2,420–2,690", price: 1345000, priceLabel: "from ~$1.35M" }, { type: "Loft", units: "—", size: "up to ~1,335 sqft", psf: 2730, psfLabel: "~$2,730", price: 3291000, priceLabel: "~$3.29M" }], pricingNote: "Prices from URA caveats and marketing listings in 2026; check the developer's current price list.", amenities: ["Lounge", "BBQ & Dining Area", "Rooftop Communal Space"], distanceMRT: "~5 min walk to Rochor or Little India MRT; Dhoby Ghaut interchange nearby", schools: "St Margaret's School (Primary), Anglo-Chinese School (Junior) within 1km", launchDate: "2026 (Huttons: May 2026; caveats from Jul 2026)", siteArea: "5,548 sqft" },

            { id: 32, name: "Lucerne Grand", location: "Lakeside Drive (Jurong Lake District), D22", district: "ocr", year: "2026", launchSort: 202610, developer: "City Developments Limited (entity: CDL Polaris Properties Pte Ltd)", totalUnits: 570, availableUnits: 220, top: "Est. 2030", tenure: "99 LH", image: "", startingPrice: 1498000, avgPSF: 2480, bedrooms: [2,3,4], type: "Private Condominium", mrt: "Lakeside (EW26), directly linked", description: "CDL's 570-unit mixed-use project with the Lucerne Galleria retail podium (including a supermarket), directly linked to Lakeside MRT. First new private launch in the Lakeside precinct since Lake Grande in 2016. Launched 3 October 2026: 350 units (61.4%) sold by 6pm on 4 October at an average of $2,480 psf. About 93% of buyers were Singapore citizens. Land bought at $1,132 psf ppr in June 2025.", unitMix: [{ type: "2 Bedroom", units: "—", size: "from 624 sqft", psf: 2400, psfLabel: "avg ~$2,500", price: 1498000, priceLabel: "from $1.498M" }, { type: "3 Bedroom", units: "—", size: "from 883 sqft", psf: 2250, psfLabel: "avg ~$2,500", price: 1988000, priceLabel: "from $1.988M" }, { type: "4 Bedroom Premium", units: "—", size: "from 1,152 sqft", psf: 2420, psfLabel: "—", price: 2788000, priceLabel: "from $2.788M" }], pricingNote: "Starting prices announced by CDL; project average $2,480 psf at launch weekend.", amenities: ["Direct link to Lakeside MRT", "Lucerne Galleria retail podium", "Supermarket", "Pools", "Gym"], distanceMRT: "Directly connected to Lakeside (EW26) MRT", schools: "Rulang Primary, Lakeside Primary, Boon Lay Garden Primary nearby (verify 1km by block)", launchDate: "3 Oct 2026 (preview 18 Sep 2026)", siteArea: "~148,000 sqft" },

            { id: 33, name: "Amberwood at Holland", location: "30–52 Holland Link (Holland Plain), D10", district: "ccr", year: "2026", launchSort: 202609, developer: "Sim Lian Group (entity: Sim Lian JV (Holland) Pte Ltd)", totalUnits: 212, availableUnits: 189, top: "Est. 2030", tenure: "99 LH", image: "", startingPrice: 2516000, avgPSF: 3019, bedrooms: [3,4,5], type: "Private Condominium", mrt: "King Albert Park (DT6), ~15 min walk", description: "First condo in the new low-rise Holland Plain precinct: 212 three- to five-bedroom homes in 11 blocks of four to six storeys (plot ratio 1.4). Land bought at $1,432 psf ppr in July 2025. Launched 25–26 September 2026: 23 of 212 units (11%) sold, out of 70 units released in phase one, at an average of about $3,019 psf. Sim Lian also holds the adjacent Holland Plain plot (see 2027 tab).", unitMix: [{ type: "3 Bedroom", units: 74, size: "from 872 sqft", psf: 2945, psfLabel: "from ~$2,945", price: 2516000, priceLabel: "from $2.516M" }, { type: "4 Bedroom", units: 74, size: "~1,076–1,087 sqft+", psf: 2950, psfLabel: "~$2,900–2,950", price: 3152300, priceLabel: "from ~$3.15M" }, { type: "5 Bedroom", units: 64, size: "up to 1,572 sqft", psf: 3019, psfLabel: "avg $3,019 (project)", price: 0, priceLabel: "TBC" }], pricingNote: "Average $3,019 psf at launch weekend; 48 larger units are designated 'Luxe' with private lifts.", amenities: ["30m Lap Pool", "50m Lap Pool", "Thermal & Outdoor Baths", "Red-light Wellness", "Explorers' Studio (kids)", "Childcare Centre"], distanceMRT: "~15 min walk to King Albert Park (DT6) MRT", schools: "Methodist Girls' School (Primary) within 1km", launchDate: "26 Sep 2026 (preview 11 Sep 2026)", siteArea: "183,729 sqft" },

            // Upcoming 2027 (expected launch timing from developers and market reports as at 11 Nov 2026)
            { id: 31, name: "One Chuan Grove", location: "Chuan Grove, off Lorong Chuan, D19", district: "ocr", year: "2027", launchSort: 202702, launchShort: "Feb 2027 (reported)", developer: "Chuan Grove Pte Ltd (Sing Holdings Residential 65%, Sunway Developments 35%)", totalUnits: 1056, availableUnits: 1056, top: "16 Jul 2030", tenure: "99-year leasehold", image: "", startingPrice: 1230000, avgPSF: 2600, bedrooms: [1,2,3,4,5], type: "Private Condominium", mrt: "400 m to Lorong Chuan MRT (CC14)", description: "One Chuan Grove is a 99-year leasehold condominium of 1,056 homes at Chuan Grove, off Lorong Chuan, District 19. Developer: Chuan Grove Pte Ltd (Sing Holdings Residential 65%, Sunway Developments 35%). It combines both 2025 Chuan Grove land parcels. The third Chuan Grove Reserve List site is separate and unsold. Nearest MRT is Lorong Chuan (CC14), about 400 m. Launch is expected in February 2027. Preview is reported for 13 February 2027 and booking for 27 February 2027. No developer price list had been released as of 11 November 2026. Analyst estimates put the average around $2,600 to $2,850 psf. Completion is reported as 16 July 2030.", unitMix: [{ type: "1 Bedroom", units: 3, size: "474", psf: 2600, psfLabel: "$2,600–$2,850 est.", price: 1230000, priceLabel: "$1.23m–$1.35m est." }, { type: "2 Bedroom", units: 471, size: "581–710", psf: 2600, psfLabel: "$2,600–$2,850 est.", price: 1510000, priceLabel: "$1.51m–$2.02m est." }, { type: "3 Bedroom", units: 315, size: "807–1,001", psf: 2600, psfLabel: "$2,600–$2,850 est.", price: 2100000, priceLabel: "$2.10m–$2.85m est." }, { type: "4 Bedroom", units: 240, size: "1,076–1,356", psf: 2600, psfLabel: "$2,600–$2,850 est.", price: 2800000, priceLabel: "$2.80m–$3.86m est." }, { type: "5 Bedroom", units: 27, size: "1,561", psf: 2600, psfLabel: "$2,600–$2,850 est.", price: 4060000, priceLabel: "$4.06m–$4.45m est." }], amenities: ["50 m lap pool", "Spa and relaxation pools", "Tennis court", "2 padel courts", "Pickleball", "Indoor badminton", "2 golf simulators", "1,300 sq ft gym", "Private dining", "7 shops", "Childcare centre"], distanceMRT: "About 400 m to Lorong Chuan MRT (CC14)", schools: "St. Gabriel's, CHIJ Our Lady of Good Counsel, Yangzheng and Kuo Chuan Presbyterian, reported within 1 km", launchDate: "February 2027 expected. Preview reported 13 Feb 2027. Booking reported 27 Feb 2027.", siteArea: "326,640 sq ft" },

            { id: 34, name: "Wynwood Grand (EC)", location: "Woodlands Drive 17 (Woodlands South), D25", district: "ocr", year: "2027", launchSort: 202701, launchShort: "Jan 2027 (booking, est.)", developer: "City Developments Limited (entity: CDL Divine Pte Ltd)", totalUnits: 430, availableUnits: 430, top: "TBC", tenure: "99 LH (EC)", image: "", startingPrice: null, avgPSF: null, bedrooms: [3,4,5], type: "Executive Condominium", mrt: "Woodlands South (TE3), ~300m", description: "CDL's executive condominium of about 430 homes in 14 eight-storey blocks at Woodlands Drive 17, with an early childhood centre. Land won at a then-record $782 psf ppr ($360.9M) in August 2025. Market reports target an e-application window in December 2026 and booking in January 2027; CDL has not confirmed dates. Prices not released.", unitMix: [], amenities: [], distanceMRT: "~300m to Woodlands South (TE3) MRT", schools: "To be confirmed", launchDate: "Expected Jan 2027 booking (e-application reportedly Dec 2026; not confirmed by CDL)", siteArea: "271,330 sqft" },

            { id: 36, name: "Solano Grand (EC)", location: "Senja Close (Bukit Panjang), D23", district: "ocr", year: "2027", launchSort: 202702, launchShort: "Q1 2027 (est.)", developer: "City Developments Limited (entity: CDL Constellation Pte Ltd)", totalUnits: 302, availableUnits: 302, top: "TBC", tenure: "99 LH (EC)", image: "", startingPrice: null, avgPSF: null, bedrooms: [2,3,4,5], type: "Executive Condominium", mrt: "Jelapang LRT, ~6 min walk (2 stops to Bukit Panjang DT1)", description: "CDL's EC at Senja Close, the first EC in Bukit Panjang since Blossom Residences (2011). CDL plans about 302 units. Land won at $771 psf ppr ($252.9M) in August 2025. Access is LRT-only (Jelapang LRT to Bukit Panjang MRT). A place of worship is planned on an adjacent plot. Launch expected in Q1 2027 per market reports; prices not released.", unitMix: [], amenities: [], distanceMRT: "~6 min walk to Jelapang LRT; 2 stops to Bukit Panjang (DT1) MRT", schools: "Greenridge, West Spring and West View Primary within 1km (reported)", launchDate: "Expected Q1 2027 (preview reportedly Jan 2027)", siteArea: "~109,350 sqft" },

            { id: 35, name: "Sembawang Road EC", location: "Sembawang Road (Sembawang), D27", district: "ocr", year: "2027", launchSort: 202702, launchShort: "Early 2027 (est.)", developer: "Oriental Pacific Development Pte Ltd", totalUnits: 265, availableUnits: 265, top: "TBC", tenure: "99 LH (EC)", image: "", startingPrice: null, avgPSF: null, bedrooms: [2,3,4,5], type: "Executive Condominium", mrt: "Canberra (NS12), ~500m", description: "Low-rise EC (plot ratio 1.4) along a waterway, about 500m from Canberra MRT. About 265 units. Land won at $197.8M ($692 psf ppr) in September 2025. Project name not yet announced. Launch expected in early 2027 after the 15-month wait-out; prices not released.", unitMix: [], amenities: [], distanceMRT: "~500m to Canberra (NS12) MRT", schools: "To be confirmed", launchDate: "Expected early 2027", siteArea: "~204,170 sqft" },

            { id: 37, name: "Chencharu Central Residences", location: "Chencharu Close (Khatib, Yishun), D27", district: "ocr", year: "2027", launchSort: 202701, launchShort: "Jan 2027 (preview, est.)", developer: "Evia Real Estate, Gamuda Land & Ho Lee Group (entities: Evia MCS, Gamuda (Singapore), H108)", totalUnits: 875, availableUnits: 875, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [2,3,4,5], type: "Private Condominium (mixed-use)", mrt: "Khatib (NS14), ~8–10 min walk", description: "First private development in the new Chencharu town at Khatib: about 875 homes integrated with a retail mall, hawker centre and bus interchange. Land bought for $1.012B ($980 psf ppr) in September 2025. Earlier names included Chencharu Grand and Chencharu Close Residences. Marketing sites report a preview from 16 January 2027; the developer has not released prices.", unitMix: [], amenities: [], distanceMRT: "~8–10 min walk to Khatib (NS14) MRT", schools: "To be confirmed (new precinct)", launchDate: "Expected Jan 2027 (preview reported 16 Jan 2027)", siteArea: "316,997 sqft" },

            { id: 38, name: "Dorset Gardens", location: "Dorset Road (Farrer Park), D08", district: "rcr", year: "2027", launchSort: 202704, launchShort: "1H 2027 (target)", developer: "UOL Group, Singapore Land Group & Kheng Leong (entity: United Venture Development (2022) Pte Ltd)", totalUnits: 428, availableUnits: 428, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Farrer Park (NE8), next to site", description: "Two 28-storey towers with about 428 homes on Dorset Road, next to Farrer Park MRT. Land bought for $524.3M ($1,338 psf ppr) after a nine-bid tender in 2025. UOL targets a launch in the first half of 2027. Prices not released.", unitMix: [], amenities: [], distanceMRT: "Next to Farrer Park (NE8) MRT", schools: "St Joseph's Institution nearby (secondary); primary schools to be confirmed", launchDate: "Target 1H 2027 (UOL)", siteArea: "TBC" },

            { id: 39, name: "Hougang Central (mixed-use)", location: "Hougang Central / Hougang Avenue 10, D19", district: "ocr", year: "2027", launchSort: 202709, launchShort: "2H 2027 (expected)", developer: "UOL Group, CapitaLand Development, Singapore Land Group & Kheng Leong (commercial: CapitaLand Integrated Commercial Trust)", totalUnits: 830, availableUnits: 830, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium (mixed-use)", mrt: "Hougang (NE14), integrated; future CRL interchange", description: "Integrated development above Hougang MRT with about 830 homes, roughly 300,000 sq ft of retail (set to be Hougang's largest mall), a new bus interchange and town plaza. Land awarded for about $1.5B ($1,179 psf ppr) in January 2026. UOL expects to launch it in the second half of 2027. Project name and prices not released.", unitMix: [], amenities: [], distanceMRT: "Above Hougang (NE14) MRT; Cross Island Line interchange planned", schools: "To be confirmed", launchDate: "Expected 2H 2027 (UOL)", siteArea: "504,820 sqft" },

            { id: 40, name: "Telok Blangah Road (GLS)", location: "Telok Blangah Road (Berlayar, former Keppel Club), D04", district: "rcr", year: "2027", launchSort: 202703, launchShort: "2027 (est.)", developer: "Kingsford Group (entity: Kingsford Huray Development Pte Ltd)", totalUnits: 745, availableUnits: 745, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "To be confirmed", description: "First private residential site on the former Keppel Club land in the Greater Southern Waterfront. About 745 homes. Land awarded for $918.3M ($1,326 psf ppr) in November 2025. Launch expected in 2027 per market reports; project name and prices not released.", unitMix: [], amenities: [], distanceMRT: "To be confirmed", schools: "To be confirmed", launchDate: "Expected 2027 (market reports; Q1 2027 most cited)", siteArea: "~147,350 sqft" },

            { id: 41, name: "Bedok Rise (GLS)", location: "Bedok Rise (Tanah Merah), D16", district: "ocr", year: "2027", launchSort: 202703, launchShort: "2027 (est.)", developer: "Allgreen Properties (entity: Bellis Residential Pte Ltd)", totalUnits: 380, availableUnits: 380, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Tanah Merah (EW4), next to site", description: "Last GLS plot next to Tanah Merah MRT, about 380 homes. Allgreen topped 10 bids at $464.8M ($1,330 psf ppr) in November 2025. Launch expected in 2027 per market reports; project name and prices not released.", unitMix: [], amenities: [], distanceMRT: "Next to Tanah Merah (EW4) MRT", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "218,438 sqft" },

            { id: 42, name: "Bukit Timah Road (Newton GLS)", location: "Bukit Timah Road (Newton), D11", district: "ccr", year: "2027", launchSort: 202703, launchShort: "2027 (est.)", developer: "HH Investment Pte Ltd (Huang Hsiang Construction)", totalUnits: 340, availableUnits: 340, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Newton (NS21/DT11), next to site", description: "First private housing site in the new Newton neighbourhood, next to Newton MRT. About 340 homes. HH Investment topped eight bids at $566.3M ($1,820 psf ppr) in November 2025, the highest CCR GLS land rate since 2018 at the time. Launch expected around end-2026 to 2027; project name and prices not released.", unitMix: [], amenities: [], distanceMRT: "Next to Newton (NS21/DT11) MRT interchange", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "63,498 sqft" },

            { id: 43, name: "Tanjong Rhu Road (GLS)", location: "Tanjong Rhu Road, D15", district: "rcr", year: "2027", launchSort: 202705, launchShort: "2027 (est.)", developer: "City Developments Limited & Woh Hup (90:10; entities CDL Constellation, Bedrock Ventures)", totalUnits: 520, availableUnits: 520, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Tanjong Rhu (TE23), ~10 min walk", description: "First GLS residential plot in Tanjong Rhu since 1997. CDL and Woh Hup plan about 520 units in three 26-storey blocks facing Kallang Basin, Marina Bay and the sea. Land bought for $709.3M ($1,455 psf ppr) in February 2026. Launch expected in 2027 per market reports; prices not released.", unitMix: [], amenities: [], distanceMRT: "~10 min walk to Tanjong Rhu (TE23) MRT", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "131,743 sqft" },

            { id: 44, name: "Dover Drive (GLS)", location: "Dover Drive (Dover-Medway, one-north), D05", district: "rcr", year: "2027", launchSort: 202705, launchShort: "2027 (est.)", developer: "Qingjian Realty, Forsea Holdings & Jianan Capital (JV)", totalUnits: 625, availableUnits: 625, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium (with ground-floor commercial)", mrt: "To be confirmed", description: "First project in the new Dover-Medway precinct in the greater one-north area. About 625 homes with ground-floor commercial space. Land bought for $951M ($1,556 psf ppr) in March 2026, a Rest of Central Region record at the time. Launch expected in 2027 per market reports; prices not released.", unitMix: [], amenities: [], distanceMRT: "To be confirmed", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "145,498 sqft" },

            { id: 45, name: "Kallang Close (GLS)", location: "Kallang Close (Kallang River), D14", district: "rcr", year: "2027", launchSort: 202706, launchShort: "2027 (est.)", developer: "Frasers Property & Mitsubishi Estate (entities: Frasers Property Phoenix, MJR Investment)", totalUnits: 470, availableUnits: 470, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Kallang (EW10), close by", description: "Riverfront site along the Kallang River, the first GLS plot in the Boon Keng, Kallang Bahru and Kampong Bugis area in 12 years. About 470 homes with a planned public riverfront promenade. Land bought for $610.75M ($1,415 psf ppr) in April 2026. Launch expected in 2027 per market reports; project name and prices not confirmed by the developers.", unitMix: [], amenities: [], distanceMRT: "Close to Kallang (EW10) MRT", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "123,320 sqft" },

            { id: 46, name: "Holland Plain (Sim Lian, 2nd site)", location: "Holland Plain (off Old Holland Road), D10", district: "ccr", year: "2027", launchSort: 202705, launchShort: "Q2 2027 (flagged)", developer: "Sim Lian Group (Sim Lian Land & Sim Lian Development)", totalUnits: 280, availableUnits: 280, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "King Albert Park (DT6), ~15 min walk", description: "Sim Lian's second site in the Holland Plain precinct, next to Amberwood at Holland. About 280 homes on 169,175 sq ft. Sim Lian was the sole bidder at $454M ($1,491 psf ppr) in May 2026. Sim Lian has flagged a launch around 2Q 2027; name and prices not released.", unitMix: [], amenities: [], distanceMRT: "~15 min walk to King Albert Park (DT6) MRT", schools: "Methodist Girls' School (Primary) in the vicinity (verify 1km)", launchDate: "Expected 2Q 2027 (reported)", siteArea: "169,175 sqft" },

            { id: 47, name: "Dunearn Road (Turf City 2nd site)", location: "Dunearn Road (Bukit Timah Turf City), D11", district: "ccr", year: "2027", launchSort: 202707, launchShort: "2027 (est.)", developer: "Wing Tai Holdings & Metro Holdings (entities: Winrich Investment, Metrobilt Construction)", totalUnits: 330, availableUnits: 330, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium (with ground-floor commercial)", mrt: "Sixth Avenue (DT7); future Turf City (CRL)", description: "Second GLS site in Bukit Timah Turf City, next to Dunearn House. About 330 homes with ground-floor commercial space (including a supermarket and childcare centre). Wing Tai and Metro won six bids at $533M ($1,625 psf ppr) in April 2026. Launch expected in 2027 per market reports; name and prices not released.", unitMix: [], amenities: [], distanceMRT: "Near Sixth Avenue (DT7) MRT; future Turf City (CRL) station in precinct", schools: "Bukit Timah school belt (verify 1km by block)", launchDate: "Expected 2027 (market reports)", siteArea: "205,010 sqft" },

            { id: 48, name: "Lentor Central (GLS, 4th site)", location: "Lentor Central (Lentor Hills), D26", district: "ocr", year: "2027", launchSort: 202703, launchShort: "2027 (est.)", developer: "GuocoLand, Intrepid Investments & TID Residential (Hong Leong Group JV)", totalUnits: 562, availableUnits: 562, top: "TBC", tenure: "99 LH", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium", mrt: "Lentor (TE5), next to site", description: "Eighth GLS site in Lentor Hills, beside Lentor MRT and Lentor Modern mall. GuocoLand plans up to 562 units in three towers of about 27 storeys. Land bought for $657.1M ($1,278 psf ppr), a Lentor record, in March 2026. Launch expected in 2027 per market reports; project name and prices not confirmed.", unitMix: [], amenities: [], distanceMRT: "Next to Lentor (TE5) MRT", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "171,424 sqft" },

            { id: 49, name: "Valley Point Redevelopment", location: "491 River Valley Road (Singapore River), D10", district: "ccr", year: "2027", launchSort: 202708, launchShort: "2027 (announced)", developer: "Frasers Property (51%) & Mitsubishi Estate (49%)", totalUnits: 407, availableUnits: 407, top: "TBC", tenure: "999-year leasehold", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Private Condominium (mixed-use)", mrt: "Great World (TE15), nearby", description: "Redevelopment of Valley Point and Fraser Suites Singapore into a 999-year mixed-use riverfront project with about 407 homes and sky villas, a 184-unit Fraser Suites and retail along the Singapore River. Announced 30 September 2026; Frasers said it aims to launch next year. Both existing buildings are expected to close on 31 March 2027. Project name and prices not released.", unitMix: [], amenities: [], distanceMRT: "Near Great World (TE15) MRT", schools: "To be confirmed", launchDate: "Expected 2027 (Frasers Property announcement)", siteArea: "144,660 sqft" },

            { id: 50, name: "Woodlands Drive 17 EC (Sim Lian)", location: "Woodlands Drive 17 (Woodlands South), D25", district: "ocr", year: "2027", launchSort: 202704, launchShort: "Q2 2027 (est.)", developer: "Sim Lian Group (Sim Lian Land & Sim Lian Development)", totalUnits: 560, availableUnits: 560, top: "TBC", tenure: "99 LH (EC)", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Executive Condominium", mrt: "Woodlands South (TE3), close by", description: "Second EC site on Woodlands Drive 17, next to CDL's Wynwood Grand. About 560 homes. Sim Lian set a record EC land price of $484M ($794 psf ppr) in January 2026. Marketing sites use the name Clovelle of Woodlands, not yet confirmed by the developer. Launch expected around Q2 2027; prices not released.", unitMix: [], amenities: [], distanceMRT: "Close to Woodlands South (TE3) MRT", schools: "To be confirmed", launchDate: "Expected Q2 2027 (market reports)", siteArea: "290,410 sqft" },

            { id: 51, name: "Miltonia Close EC", location: "Miltonia Close (Yishun), D27", district: "ocr", year: "2027", launchSort: 202709, launchShort: "2027 (est.)", developer: "Hoi Hup Realty Pte Ltd", totalUnits: 450, availableUnits: 450, top: "TBC", tenure: "99 LH (EC)", image: "", startingPrice: null, avgPSF: null, bedrooms: [], type: "Executive Condominium", mrt: "To be confirmed", description: "First EC site in Yishun in five years, next to Orchid Country Club with views towards Lower Seletar Reservoir. Hoi Hup plans about 450 units in blocks of about 18 to 20 storeys (HDB estimate: 430). Land awarded for $340.85M ($732 psf ppr) in April 2026. A preview is expected in 2027; prices not released.", unitMix: [], amenities: [], distanceMRT: "To be confirmed", schools: "To be confirmed", launchDate: "Expected 2027 (market reports)", siteArea: "166,315 sqft" },
        ]
        
        function getDistrictGradient(district) {
            if (district === 'ccr') return 'from-violet-700 via-violet-800 to-indigo-900';
            if (district === 'rcr') return 'from-emerald-600 via-teal-700 to-slate-800';
            return 'from-slate-600 via-slate-700 to-zinc-800';
        }

        function getProjectVisual(project) {
            const hasUniqueImage = project.image && (project.image.startsWith('http') || project.image.startsWith('/')) && !project.image.includes('chuanpark.sg');

            if (hasUniqueImage) {
                return `<img src="${project.image}" class="w-full h-56 object-cover group-hover:scale-[1.03] transition duration-700" alt="${project.name}" loading="lazy" width="400" height="224">`;
            }

            const gradient = getDistrictGradient(project.district);

            // Upcoming projects without an image: show a plain "Upcoming" block
            if (project.year === '2027') {
                return `
                <div class="w-full h-56 bg-gradient-to-br ${gradient} flex items-center justify-center p-6 text-white text-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                    <div class="relative z-10 font-black text-[30px] tracking-[-1px]">Upcoming</div>
                </div>
            `;
            }

            // Clean typographic card — project name + district + PSF on solid colour block
            const psf = project.avgPSF ? project.avgPSF.toLocaleString() : '—';
            const psfNote = project.id === 31 ? ' est.' : '';
            return `
                <div class="w-full h-56 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                    <div class="relative z-10">
                        <div class="uppercase tracking-[2px] text-[10px] opacity-70 mb-1">NEW LAUNCH • ${project.year}</div>
                        <div class="font-black text-[22px] leading-[1.05] tracking-[-1.2px]">${project.name}</div>
                        <div class="text-sm opacity-90 mt-0.5">${project.location.split(',')[0]}</div>
                        <div class="mt-3 text-xs inline-flex items-center gap-x-1 bg-white/15 px-3 py-px rounded-full">
                            <span>from</span>
                            <span class="font-bold tabular-nums">$${psf} psf${psfNote}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Each project has its own crawlable page (built by scripts/build-pages.cjs)
        const PROJECT_PAGE_OVERRIDES = { 28: 'thomson-reserve-condo' }
        function projectSlug(project) {
            return PROJECT_PAGE_OVERRIDES[project.id] || (project.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }
        function projectUrl(project) { return `/project/${projectSlug(project)}/` }

        // Render Projects
        function renderProjects(filteredProjects) {
            const grid = document.getElementById('projects-grid')
            grid.innerHTML = ''
            
            const toRender = filteredProjects || projects.slice(0, 12)
            
            toRender.forEach(project => {
                const yearBadgeClass = { '2024': 'bg-slate-100 text-slate-700', '2025': 'bg-blue-100 text-blue-700', '2026': 'bg-emerald-100 text-emerald-700', '2027': 'bg-amber-100 text-amber-700' }[project.year] || 'bg-amber-100 text-amber-700'
                const yearBadge = `<span class="px-2 py-0.5 ${yearBadgeClass} text-[10px] font-bold rounded">${project.year}</span>`
                const isUpcoming = project.year === '2027'
                const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                const launchedLabel = project.launchSort ? `Launched ${MONTHS[(project.launchSort % 100) - 1]} ${Math.floor(project.launchSort / 100)}` : 'Launched'
                const statusBadge = isUpcoming
                    ? '<div class="absolute top-4 right-4 bg-[#B89B5E] text-white text-[10px] font-bold tracking-wide px-2.5 py-px rounded">UPCOMING 2027</div>'
                    : `<div class="absolute top-4 right-4 bg-[#0C1B2A]/90 text-white text-[10px] font-semibold tracking-wide px-2.5 py-px rounded">${launchedLabel}</div>`
                const dateChip = isUpcoming ? `Launch: ${project.launchShort || 'TBC'}` : project.top
                
                const visual = getProjectVisual(project);
                const isPhoto = visual.includes('<img');
                
                const cardHTML = `
                    <div class="condo-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group" data-id="${project.id}" data-district="${project.district}" data-price="${project.startingPrice || ''}" data-year="${project.year}" data-bedrooms="${project.bedrooms.join(',')}">
                        <div class="relative">
                            ${visual}
                            
                            <div class="absolute top-4 left-4 flex gap-2">
                                <span class="px-3 py-1 text-xs font-bold bg-white/95 text-violet-700 rounded-2xl shadow max-w-[10.5rem] truncate">${project.type}</span>
                            </div>
                            
                            ${statusBadge}
                            
                            ${isPhoto ? `
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent h-20"></div>
                            ` : ''}
                        </div>
                        
                        <div class="p-5">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h3 class="font-semibold text-xl tracking-tight text-slate-900"><a href="${projectUrl(project)}" class="hover:text-violet-700">${project.name}</a></h3>
                                    <div class="flex items-center text-xs text-slate-500 mt-0.5">
                                        <i class="fa-solid fa-map-marker-alt mr-1.5 text-violet-400"></i>
                                        <span>${project.location.split(',')[0]}</span>
                                    </div>
                                    <div class="text-[10px] text-slate-500 mt-0.5">
                                        D${project.location.match(/D(\d+)/)?.[1] || project.district.toUpperCase().replace('D','')} (${project.district === 'ccr' ? 'CCR' : project.district === 'rcr' ? 'RCR' : 'OCR'}) . ${project.tenure.includes('Freehold') ? 'Freehold' : '99yr'} . ${project.totalUnits} units
                                    </div>
                                </div>
                                


                            </div>
                            
                            <div class="flex flex-wrap items-center justify-between gap-2 mt-4 text-xs">
                                <div class="px-2.5 py-px bg-slate-100 text-slate-500 rounded text-[10px]">${dateChip}</div>
                                <div class="flex flex-wrap items-center gap-2">
                                    ${project.id === 31 ? '<a href="https://the-one-chuan-grove.sg/" target="_blank" rel="noopener noreferrer" class="px-5 py-1.5 text-xs font-semibold bg-violet-700 text-white rounded-2xl">One Chuan Grove guide</a>' : ''}
                                    <a href="${projectUrl(project)}" class="px-5 py-1.5 text-xs font-semibold border border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white rounded-2xl transition whitespace-nowrap" aria-label="View details of ${project.name}">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                grid.innerHTML += cardHTML
            })
        }
        
        // Default order: upcoming 2027 projects first (soonest expected launch first), then launched projects (most recent first)
        function compareNewest(a, b) {
            const au = a.year === '2027', bu = b.year === '2027'
            if (au !== bu) return au ? -1 : 1
            if (au) return (a.launchSort || 0) - (b.launchSort || 0) || a.id - b.id
            return (b.launchSort || 0) - (a.launchSort || 0) || b.id - a.id
        }

        // Filter Functions
        let currentFilter = 'all'
        
        function filterProjects() {
            const searchInputEl = document.getElementById('search-input')
            const searchTerm = searchInputEl ? searchInputEl.value.toLowerCase() : ''
            const sortMode = document.getElementById('sort-select').value
            
            let filtered = projects
            
            if (searchTerm) {
                filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.developer.toLowerCase().includes(searchTerm) || p.location.toLowerCase().includes(searchTerm))
            }
            
            if (['2024', '2025', '2026', '2027'].includes(currentFilter)) filtered = filtered.filter(p => p.year === currentFilter)
            else if (currentFilter === 'ccr') filtered = filtered.filter(p => p.district === 'ccr')
            else if (currentFilter === 'family') filtered = filtered.filter(p => p.bedrooms.some(b => b >= 3))
            
            filtered = filtered.slice()
            // Projects without released prices sort to the end for price/psf sorts
            if (sortMode === 'lowest-price') filtered.sort((a, b) => (a.startingPrice || Infinity) - (b.startingPrice || Infinity))
            else if (sortMode === 'highest-psf') filtered.sort((a, b) => (b.avgPSF || -1) - (a.avgPSF || -1))
            else if (sortMode === 'most-units') filtered.sort((a, b) => b.availableUnits - a.availableUnits)
            else filtered.sort(compareNewest)
            
            renderProjects(filtered)
        }
        
        function applyQuickFilter(filterType) {
            currentFilter = filterType
            
            document.querySelectorAll('.quick-filter').forEach(el => {
                el.classList.remove('filter-active', 'border-violet-700', 'bg-violet-50')
                el.classList.add('border-slate-300')
                
                if ((filterType === 'all' && el.dataset.filter === 'all') || (['2024', '2025', '2026', '2027'].includes(filterType) && el.dataset.filter === filterType) || (filterType === 'ccr' && el.dataset.filter === 'ccr') || (filterType === 'family' && el.dataset.filter === 'family')) {
                    el.classList.add('filter-active', 'border-violet-700', 'bg-violet-50')
                    el.classList.remove('border-slate-300')
                }
            })
            
            filterProjects()
        }
        
        function resetFilters() {
            currentFilter = 'all'
            const searchInputEl = document.getElementById('search-input')
            if (searchInputEl) searchInputEl.value = ''
            document.getElementById('sort-select').value = 'newest'
            
            document.querySelectorAll('.quick-filter').forEach(el => {
                el.classList.remove('filter-active', 'border-violet-700', 'bg-violet-50')
                el.classList.add('border-slate-300')
                if (el.dataset.filter === 'all') el.classList.add('filter-active', 'border-violet-700', 'bg-violet-50')
            })
            
            filterProjects()
        }
        
        function showAllProjects() {
            filterProjects()
            document.getElementById('browse-section').scrollIntoView({ behavior: 'smooth' })
        }
        
        // Featured This Week promo removed per request

        // Page Navigation
        /* BUILD:ROUTE-META START */
        const ROUTE_META = {
            'home': { path: '/', title: 'New Launch Condos Singapore 2026–2027 | SellingSgProperty', desc: 'Singapore new launch condos from 2024 to 2027 in one place: launch dates, prices, psf, units sold and the 2027 pipeline. Independent analysis by Jack Leow (CEA R074023I).' },
            'blog': { path: '/insights/', title: 'Singapore Property Insights | HDB Upgrading, ABSD & New Launch Guides | SellingSgProperty', desc: 'Guides for Singapore HDB upgraders and new launch condo buyers: ABSD, decoupling, CPF, financing and project comparisons, by Jack Leow (CEA R074023I).' },
            'about': { path: '/about/', title: 'About Jack Leow | SellingSgProperty, Singapore New Launch Condo Research', desc: 'Who runs SellingSgProperty: Jack Leow, PropNex Realty (CEA R074023I). How the new launch data is sourced and what buyers pay (nothing for developer sales).' },
            'contact': { path: '/contact/', title: 'Contact Jack Leow | Free New Launch Condo Situation Check', desc: 'Ask Jack Leow (PropNex, CEA R074023I) about a Singapore new launch condo, HDB upgrading or financing. Free situation check, no obligation.' },
            'mortgage-calculator': { path: '/mortgage-calculator/', title: 'Singapore Mortgage Calculator 2026 | HDB, Bank Loan, MSR & TDSR', desc: 'Free Singapore mortgage calculator for HDB, EC and private property: monthly instalments, upfront cash and CPF, BSD/ABSD, MSR and TDSR limits.' },
            'deep-analysis-arina': { path: '/deep-analysis/arina-east-residences/', title: 'Arina East Residences Review 2026 | Freehold RCR Condo Deep Analysis', desc: 'Deep analysis of Arina East Residences, a freehold boutique condo in Tanjong Rhu (RCR): pricing, unit mix, location, pros and cons, by Jack Leow.' },
        };
        /* BUILD:ROUTE-META END */
        function applyRouteMeta(meta) {
            const url = 'https://www.sellingsgproperty.com' + meta.path
            document.title = meta.title
            const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val) }
            set('meta[name="description"]', 'content', meta.desc)
            set('meta[property="og:title"]', 'content', meta.title)
            set('meta[property="og:description"]', 'content', meta.desc)
            set('meta[property="og:url"]', 'content', url)
            set('meta[name="twitter:title"]', 'content', meta.title)
            set('meta[name="twitter:description"]', 'content', meta.desc)
            set('link[rel="canonical"]', 'href', url)
        }

        function showPage(page, updateHistory = true) {
            // If leaving an article page, clean up listeners + title
            const articlePage = document.getElementById('page-article');
            if (articlePage && articlePage.classList.contains('active')) {
                cleanupArticleView();
            }

            document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'))
            const target = document.getElementById(`page-${page}`);
            if (target) target.classList.add('active')
            
            document.querySelectorAll('[id^="nav-"]').forEach(nav => {
                nav.classList.remove('nav-active')
                if (nav.id === `nav-${page}` || (page === 'contact' && nav.id === 'nav-situation') || (page === 'mortgage-calculator' && nav.id === 'nav-mortgage')) nav.classList.add('nav-active')
            })
            
            window.scrollTo({ top: 0, behavior: 'smooth' })

            if (page === 'home') {
                // no FAQPage schema for blog posts (or home, for consistency)
            }

            // URL + head tags for each SPA route come from ROUTE_META (also used by
            // scripts/build-pages.cjs to pre-render /about/, /contact/ etc. with the right head).
            const meta = ROUTE_META[page] || ROUTE_META.home
            if (updateHistory) {
              history.pushState({ type: 'page', page }, meta.title, meta.path);
            }
            applyRouteMeta(meta)
        }
        
        // Project Modal Functions
        let currentProject = null
        let currentTab = 0
        
        function showProjectModal(projectId) {
            currentProject = projects.find(p => p.id === projectId)
            if (!currentProject) return
            
            const modal = document.getElementById('project-modal')
            const headerContent = document.getElementById('modal-header-content')

            // Update URL so project cards have shareable subpage URLs (e.g. /project/arina-east-residences)
            // This makes the address bar reflect the focused project (modal is still an overlay on the main view)
            try {
              history.pushState({ type: 'project', id: projectId }, `${currentProject.name} | SellingSgProperty`, projectUrl(currentProject));
            } catch (e) {}
            
            headerContent.innerHTML = `
                <div>
                    <div class="flex items-center gap-x-3">
                        <h2 class="font-black text-3xl tracking-tighter">${currentProject.name}</h2>
                        <span class="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-2xl">${currentProject.type}</span>
                    </div>
                    <div class="flex items-center gap-x-2 text-sm text-slate-500 mt-1">
                        <span>${currentProject.location}</span>
                        <span class="px-2 py-px bg-slate-200 rounded text-xs">${currentProject.district.toUpperCase()}</span>
                    </div>
                </div>
            `
            
            modal.classList.remove('hidden')
            modal.classList.add('flex')
            
            switchProjectTab(0)

            // Special button ONLY for Thomson Reserve (id 28), Lentor Gardens (id 26) and Dunearn House (id 29) - "Aukuwa Paper"
            // Inserted in tab bar between Overview and Unit Mix & Pricing
            // Styled as yellow pill button exactly as shown
            // Only for these two project cards. All other projects and code untouched.
            const tabBar = document.getElementById('project-tab-bar')
            if (tabBar) {
                tabBar.querySelectorAll('.aukuwa-paper-btn').forEach(el => el.remove())
                if (currentProject && currentProject.id === 28) {
                    const overviewTab = tabBar.querySelector('[data-tab="0"]')
                    if (overviewTab) {
                        const specialBtn = document.createElement('div')
                        specialBtn.className = 'aukuwa-paper-btn ml-3 px-4 py-1.5 text-xs font-semibold bg-amber-400 text-amber-900 border border-amber-500 rounded-2xl flex items-center gap-x-1.5 cursor-pointer whitespace-nowrap'
                        specialBtn.innerHTML = `<i class="fa-solid fa-file-alt"></i> <span>Aukuwa Paper</span>`
                        specialBtn.onclick = function(e) {
                            e.stopImmediatePropagation()
                            window.location.href = 'https://www.sellingsgproperty.com/project/thomson-reserve-condo/';
                        }
                        overviewTab.parentNode.insertBefore(specialBtn, overviewTab.nextSibling)
                    }
                } else if (currentProject && currentProject.id === 26) {
                    // Lentor Gardens Residences - Aukuwa button added to match Thomson style
                    const overviewTab = tabBar.querySelector('[data-tab="0"]')
                    if (overviewTab) {
                        const specialBtn = document.createElement('div')
                        specialBtn.className = 'aukuwa-paper-btn ml-3 px-4 py-1.5 text-xs font-semibold bg-amber-400 text-amber-900 border border-amber-500 rounded-2xl flex items-center gap-x-1.5 cursor-pointer whitespace-nowrap'
                        specialBtn.innerHTML = `<i class="fa-solid fa-file-alt"></i> <span>Aukuwa Paper</span>`
                        specialBtn.onclick = function(e) {
                            e.stopImmediatePropagation()
                            window.location.href = 'https://www.sellingsgproperty.com/project/lentor-gardens-residences/';
                        }
                        overviewTab.parentNode.insertBefore(specialBtn, overviewTab.nextSibling)
                    }
                } else if (currentProject && currentProject.id === 29) {
                    // Dunearn House - Aukuwa button matching Thomson Reserve style
                    const overviewTab = tabBar.querySelector('[data-tab="0"]')
                    if (overviewTab) {
                        const specialBtn = document.createElement('div')
                        specialBtn.className = 'aukuwa-paper-btn ml-3 px-4 py-1.5 text-xs font-semibold bg-amber-400 text-amber-900 border border-amber-500 rounded-2xl flex items-center gap-x-1.5 cursor-pointer whitespace-nowrap'
                        specialBtn.innerHTML = `<i class="fa-solid fa-file-alt"></i> <span>Aukuwa Paper</span>`
                        specialBtn.onclick = function(e) {
                            e.stopImmediatePropagation()
                            window.location.href = 'https://www.sellingsgproperty.com/project/dunearn-house/';
                        }
                        overviewTab.parentNode.insertBefore(specialBtn, overviewTab.nextSibling)
                    }
                } else if (currentProject && currentProject.id === 31) {
                    const overviewTab = tabBar.querySelector('[data-tab="0"]')
                    if (overviewTab) {
                        const specialBtn = document.createElement('a')
                        specialBtn.className = 'aukuwa-paper-btn ml-3 px-4 py-1.5 text-xs font-semibold bg-violet-700 text-white rounded-2xl whitespace-nowrap'
                        specialBtn.href = 'https://the-one-chuan-grove.sg/'
                        specialBtn.target = '_blank'
                        specialBtn.rel = 'noopener noreferrer'
                        specialBtn.textContent = 'One Chuan Grove guide'
                        overviewTab.parentNode.insertBefore(specialBtn, overviewTab.nextSibling)
                    }
                }
            }
        }
        
        function hideProjectModal() {
            const modal = document.getElementById('project-modal')
            modal.classList.remove('flex')
            modal.classList.add('hidden')

            // Restore clean main URL after closing a project modal (keeps browser history sensible)
            if (history.state && history.state.type === 'project') {
              history.pushState({ type: 'page', page: 'home' }, 'SellingSgProperty | Singapore New Launch Condos 2026 & Property Insights by Jack Leow', '/');
            }
        }
        
        function switchProjectTab(tabIndex) {
            currentTab = tabIndex
            
            document.querySelectorAll('.project-tab').forEach((tab, idx) => {
                if (idx === tabIndex) tab.classList.add('active')
                else tab.classList.remove('active')
            })
            
            const contentContainer = document.getElementById('modal-tab-content')
            let html = ''
            
            switch(tabIndex) {
                case 0:
                    html = `
                        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            <div class="lg:col-span-3">
                                <div class="prose prose-sm max-w-none text-slate-600">
                                    <p class="text-lg leading-relaxed">${currentProject.description}</p>
                                </div>
                                
                                <div class="mt-8 grid grid-cols-2 gap-4">
                                    <div class="bg-slate-50 p-4 rounded-2xl">
                                        <div class="text-xs text-slate-500">EXPECTED TOP</div>
                                        <div class="font-bold text-2xl mt-1">${currentProject.top}</div>
                                    </div>
                                    <div class="bg-slate-50 p-4 rounded-2xl">
                                        <div class="text-xs text-slate-500">TENURE</div>
                                        <div class="font-bold text-2xl mt-1">${currentProject.tenure}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="lg:col-span-2 bg-slate-900 text-white p-6 rounded-3xl flex flex-col">
                                <div class="font-semibold mb-4 text-violet-300">KEY HIGHLIGHTS</div>
                                
                                <div class="space-y-4 text-sm flex-1">
                                    <div class="flex justify-between border-b border-white/10 pb-3">
                                        <span class="text-white/70">MRT Distance</span>
                                        <span class="font-medium">${currentProject.distanceMRT}</span>
                                    </div>
                                    <div class="flex justify-between border-b border-white/10 pb-3">
                                        <span class="text-white/70">Launch Date</span>
                                        <span class="font-medium">${currentProject.launchDate}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-white/70">Developer</span>
                                        <span class="font-medium text-right">${currentProject.developer.split('&')[0].trim()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    break
                    
                case 1:
                    html = `
                        <div>
                            <div class="flex items-end justify-between mb-4">
                                <div>
                                    <div class="font-semibold">Unit Mix &amp; Pricing</div>
                                    <div class="text-xs text-slate-500">${currentProject.id === 31 ? 'No developer price list as of 11 November 2026. Ranges below are estimates from an analyst band of $2,600 to $2,850 psf. Unit counts are reported and may change.' : (currentProject.pricingNote || (currentProject.unitMix.length === 0 ? 'The developer has not released the unit mix or prices yet.' : 'All prices are indicative developer pricing (no commission added)'))}</div>
                                </div>
                            </div>
                            
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b text-left text-xs text-slate-500">
                                        <th class="py-3 font-medium">Unit Type</th>
                                        <th class="py-3 font-medium">Units</th>
                                        <th class="py-3 font-medium">Size (sqft)</th>
                                        <th class="py-3 font-medium text-right">Avg PSF</th>
                                        <th class="py-3 font-medium text-right">Starting Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${currentProject.unitMix.length === 0 ? '<tr><td colspan="5" class="py-6 text-center text-slate-500">Unit mix and prices to be announced by the developer.</td></tr>' : ''}
                                    ${currentProject.unitMix.map(unit => `
                                        <tr class="border-b hover:bg-slate-50">
                                            <td class="py-4 font-semibold">${unit.type}</td>
                                            <td class="py-4 text-emerald-600 font-medium">${unit.units}</td>
                                            <td class="py-4 tabular-nums">${unit.size}</td>
                                            <td class="py-4 text-right font-mono">${unit.psfLabel || ('$' + unit.psf.toLocaleString())}</td>
                                            <td class="py-4 text-right font-bold tabular-nums">${unit.priceLabel || ('$' + (unit.price / 1000000).toFixed(2) + 'M')}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `
                    break
                    
                case 2:
                    html = `
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div class="font-semibold mb-4">Location &amp; Connectivity</div>
                                
                                <div class="space-y-4 text-sm">
                                    <div class="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl">
                                        <i class="fa-solid fa-train text-violet-600 mt-1 w-5"></i>
                                        <div>
                                            <div class="font-medium">MRT</div>
                                            <div>${currentProject.distanceMRT}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl">
                                        <i class="fa-solid fa-school text-violet-600 mt-1 w-5"></i>
                                        <div>
                                            <div class="font-medium">Nearby Schools</div>
                                            <div>${currentProject.schools}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="rounded-3xl overflow-hidden border border-slate-200 h-[280px]">
                                <iframe 
                                    width="100%" 
                                    height="280" 
                                    style="border:0;" 
                                    loading="lazy" 
                                    allowfullscreen 
                                    referrerpolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps?q=${encodeURIComponent(currentProject.location + ', Singapore')}&output=embed">
                                </iframe>
                            </div>
                        </div>
                    `
                    break
                    
                case 3:
                    html = `
                        <div>
                            <div class="font-semibold mb-5">${currentProject.amenities.length ? `Resort-Style Facilities (${currentProject.amenities.length} amenities)` : 'Facilities not yet announced by the developer'}</div>
                            
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                ${currentProject.amenities.map(amenity => `
                                    <div class="flex items-center gap-x-3 bg-slate-50 px-5 py-3 rounded-2xl text-sm">
                                        <i class="fa-solid fa-check text-emerald-500 w-4"></i>
                                        <span>${amenity}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `
                    break
                    
                case 4:
                    html = `
                        <div class="max-w-2xl">
                            <div class="font-semibold mb-4">Developers Profile</div>
                            
                            <div class="flex items-center gap-x-4 mb-6">
                                <div class="w-16 h-16 bg-gradient-to-br from-violet-700 to-indigo-700 text-white rounded-2xl flex items-center justify-center text-4xl font-black">
                                    ${currentProject.developer.split('&')[0].trim().charAt(0)}
                                </div>
                                <div>
                                    <div class="font-bold text-xl">${currentProject.developer.split('&')[0].trim()}</div>
                                </div>
                            </div>
                        </div>
                    `
                    break
            }
            
            contentContainer.innerHTML = html
        }
        
        function enquireNow() {
            hideProjectModal()
            setTimeout(() => showContactModal(currentProject ? currentProject.name : null), 300)
        }
        
        function arrangeViewing() {
            hideProjectModal()
            setTimeout(() => {
                const modal = document.getElementById('contact-modal')
                modal.classList.remove('hidden')
                modal.classList.add('flex')
                // no preselect field in simplified form
            }, 300)
        }
        
        function showContactModal(preSelectedProject = null) {
            const modal = document.getElementById('contact-modal')
            modal.classList.remove('hidden')
            modal.classList.add('flex')
            // preSelectedProject ignored in simplified 3-field form
        }
        
        function hideContactModal() {
            const modal = document.getElementById('contact-modal')
            modal.classList.remove('flex')
            modal.classList.add('hidden')
        }

        function showLegalPopup(type) {
            const modal = document.getElementById('legal-modal');
            const titleEl = document.getElementById('legal-modal-title');
            const contentEl = document.getElementById('legal-modal-content');
            if (!modal || !titleEl || !contentEl) return;

            if (type === 'terms') {
                titleEl.textContent = 'Terms and Conditions';
                contentEl.innerHTML = `
                    <h2 class="text-lg font-bold mb-1">TERMS AND CONDITIONS</h2>
                    <p class="text-xs text-slate-500 mb-4">Last Updated: 7 June 2026</p>

                    <h3 class="font-semibold mt-3 mb-1">1. Introduction</h3>
                    <p class="mb-2">All content, advertising, and estate agency-related activities on or through this Site are conducted in compliance with the Estate Agents Act 2010, the Code of Ethics and Professional Client Care, the Practice Guidelines on Ethical Advertising (PG 02-11), and other applicable CEA guidelines and regulations.</p>

                    <h3 class="font-semibold mt-3 mb-1">2. Purpose of the Site</h3>
                    <p class="mb-2">The Site provides general information, market insights, educational content, analysis, and resources on the Singapore real estate market. This includes new property launches, resale considerations, investment perspectives, and related topics intended to help users make more informed decisions.</p>
                    <p class="mb-2">This Website (“Site”) is operated by Jack Leow, a real estate salesperson registered with the Council for Estate Agencies (CEA) of Singapore under Registration No. R074023I. He represents PropNex Realty Pte Ltd, a licensed estate agent (Estate Agent Licence No. L3008022J).</p>

                    <h3 class="font-semibold mt-3 mb-1">3. Nature of Content – Important Disclaimers</h3>
                    <p class="mb-2">The content on this Site is for general informational and educational purposes only. It does not constitute and should not be construed as:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Professional real estate, legal, financial, tax, or investment advice.</li>
                        <li>A personalised recommendation, solicitation, or offer to buy, sell, rent, lease, or invest in any specific property.</li>
                        <li>A property valuation or financial projection.</li>
                        <li>Advice tailored to your individual financial situation, risk appetite, or objectives.</li>
                    </ul>
                    <p class="mb-2">You must not rely solely on the information on this Site when making any property-related decisions. Always:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Verify all information directly with official sources, including the property developer’s latest sales brochures and documents, URA, HDB, and other relevant authorities.</li>
                        <li>Conduct your own independent due diligence.</li>
                        <li>Consult qualified and licensed professionals (including a CEA-registered real estate salesperson of your choice, a lawyer, and/or a financial advisor) before making any decisions.</li>
                    </ul>
                    <p class="mb-2">For new launches or specific projects featured on the Site: Information is based on publicly available developer materials at the time of publication. Prices, availability, payment schemes, incentives, specifications, and terms are subject to change without notice. Refer only to the developer’s official documentation and authorised sales team for the most current details.</p>

                    <h3 class="font-semibold mt-3 mb-1">4. Accuracy of Information and Updates</h3>
                    <p class="mb-2">While reasonable efforts are made to ensure accuracy, the information on this Site may not always be complete, current, or free from error. Market conditions, government policies, regulations, and property-specific details change frequently.</p>
                    <p class="mb-2">General market information on this Site was last updated on the date indicated on the relevant page or content. We reserve the right to update, modify, correct, or remove any content at any time without prior notice.</p>

                    <h3 class="font-semibold mt-3 mb-1">5. No Guarantees or Warranties</h3>
                    <p class="mb-2">We make no representations or warranties of any kind, express or implied, regarding:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Any specific investment returns, rental yields, capital appreciation, or financial outcomes.</li>
                        <li>The accuracy, completeness, reliability, timeliness, or suitability of any content for your particular purpose.</li>
                        <li>Uninterrupted, error-free, or secure access to the Site.</li>
                    </ul>
                    <p class="mb-2">Any examples, projections, historical data, or case studies (if present) are illustrative only and are based on stated assumptions or information from credible public sources at the relevant time. Past performance or trends are not indicative of future results.</p>

                    <h3 class="font-semibold mt-3 mb-1">6. CEA Compliance and Advertising Standards</h3>
                    <p class="mb-2">All property-related advertising, marketing content, and promotions on this Site comply with CEA requirements. Where applicable, such content includes the required identification of the registered salesperson and estate agent.</p>
                    <p class="mb-2">Photos and images are either actual representations of the properties (with appropriate context) or clearly indicated as illustrative. We do not use or alter images in a manner that misrepresents properties.</p>

                    <h3 class="font-semibold mt-3 mb-1">7. Intellectual Property</h3>
                    <p class="mb-2">Unless otherwise stated, all content, text, graphics, images, logos, layout, and other materials on this Site are owned by or licensed to Jack Leow.</p>
                    <p class="mb-2">You may view and print content for your personal, non-commercial use only. Any other use, reproduction, distribution, modification, or commercial exploitation requires prior written consent.</p>

                    <h3 class="font-semibold mt-3 mb-1">8. User Obligations</h3>
                    <p class="mb-2">You agree not to use the Site for any unlawful purpose or in any way that breaches CEA regulations, Singapore law, or these Terms. This includes (but is not limited to) posting false or misleading information, infringing intellectual property rights, or attempting to scrape or commercially exploit content without permission.</p>

                    <h3 class="font-semibold mt-3 mb-1">9. Contact Forms and Personal Data (PDPA)</h3>
                    <p class="mb-2">When you submit a contact or inquiry form, you consent to the collection, use, and disclosure of your personal data for the purpose of responding to your inquiry and providing relevant property market information or services.</p>
                    <p class="mb-2">We handle personal data in accordance with the Personal Data Protection Act (PDPA). Please refer to our separate Privacy Policy for full details on collection, use, disclosure, and your rights.</p>

                    <h3 class="font-semibold mt-3 mb-1">10. Third-Party Links and Content</h3>
                    <p class="mb-2">The Site may contain links to third-party websites (e.g. developer sites, property portals, government portals, or other resources). These links are provided for convenience only. We do not endorse, control, or accept responsibility for the content, accuracy, availability, or practices of any third-party sites.</p>

                    <h3 class="font-semibold mt-3 mb-1">11. Limitation of Liability</h3>
                    <p class="mb-2">To the maximum extent permitted by applicable Singapore law (including the Unfair Contract Terms Act), Jack Leow under PropNex Realty Pte Ltd, and their respective officers, employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages, or any loss of profits, revenue, data, business opportunities, or goodwill, arising out of or in connection with:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Your access to or use of the Site or reliance on any content.</li>
                        <li>Any decisions you make (or fail to make) based on information from this Site.</li>
                        <li>Any errors, omissions, inaccuracies, or changes in content.</li>
                        <li>Any interruption, delay, or unavailability of the Site.</li>
                    </ul>
                    <p class="mb-2">Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, fraudulent misrepresentation, or any other liability that cannot be excluded or limited under Singapore law.</p>

                    <h3 class="font-semibold mt-3 mb-1">12. Indemnity</h3>
                    <p class="mb-2">You agree to indemnify, defend, and hold harmless Jack Leow under PropNex Realty Pte Ltd, and their respective officers, employees, and agents from and against any claims, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to your use of the Site or any breach of these Terms.</p>

                    <h3 class="font-semibold mt-3 mb-1">13. Governing Law and Dispute Resolution</h3>
                    <p class="mb-2">These Terms and Conditions shall be governed by and construed in accordance with the laws of Singapore. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.</p>

                    <h3 class="font-semibold mt-3 mb-1">14. Changes to These Terms</h3>
                    <p class="mb-2">We may update or amend these Terms at any time. The “Last Updated” date at the top of this page indicates the current version. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms.</p>

                    <h3 class="font-semibold mt-3 mb-1">15. Contact Us</h3>
                    <p class="mb-2">For questions about these Terms, CEA compliance matters, or the content on this Site, please contact:</p>
                    <p class="mb-1">Jack Leow<br>CEA Registration No.: R074023I<br>PropNex Realty Pte Ltd (Estate Agent Licence No. L3008022J)<br>Email: sellingsgproperty@gmail.com</p>
                `;
            } else {
                titleEl.textContent = 'Privacy Policy';
                contentEl.innerHTML = `
                    <h2 class="text-lg font-bold mb-1">PRIVACY POLICY</h2>
                    <p class="text-xs text-slate-500 mb-4">Last Updated: 7 June 2026</p>

                    <h3 class="font-semibold mt-3 mb-1">1. Introduction</h3>
                    <p class="mb-2">This Privacy Policy (“Policy”) explains how Jack Leow, also known as SellingSgProperty (“we”, “us”, or “our”), collects, uses, discloses, and safeguards your personal data when you visit or interact with this Website (“Site”).</p>
                    <p class="mb-2">We are committed to protecting your personal data in accordance with the Personal Data Protection Act 2012 (“PDPA”) of Singapore and other applicable laws.</p>

                    <h3 class="font-semibold mt-3 mb-1">2. Personal Data We Collect</h3>
                    <p class="mb-2">Depending on how you interact with the Site, we may collect the following types of personal data:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Contact and identification information: Name, email address, phone number (including WhatsApp), and any other details you provide in inquiry or contact forms.</li>
                        <li>Property-related information: Details about your property interests, budget range, preferred locations, or specific new launches you inquire about.</li>
                        <li>Technical and usage data: IP address, browser type, device information, pages visited, time spent on the Site, and referral sources (collected via cookies and analytics tools).</li>
                        <li>Marketing preferences: Whether you consent to receive updates on new launches, market insights, or relevant property information.</li>
                    </ul>
                    <p class="mb-2">We do not collect sensitive personal data (e.g. NRIC, financial details, or health information) through this Site unless you voluntarily provide it in the course of a specific inquiry (in which case it will be handled with appropriate safeguards).</p>

                    <h3 class="font-semibold mt-3 mb-1">3. Who We Are</h3>
                    <p class="mb-2">This Site is operated by Jack Leow, a CEA-registered real estate salesperson (Registration No. R074023I) representing PropNex Realty Pte Ltd (Estate Agent Licence No. L3008022J).</p>
                    <p class="mb-2">We provide general information, market insights, and educational content on the Singapore real estate market, including new property launches and related topics.</p>

                    <h3 class="font-semibold mt-3 mb-1">4. How We Collect Personal Data</h3>
                    <p class="mb-2">We collect personal data when you:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Submit a contact, inquiry, or newsletter signup form.</li>
                        <li>Interact with the Site (via cookies and analytics).</li>
                        <li>Communicate with us via email, WhatsApp, or other channels linked from the Site.</li>
                        <li>Voluntarily provide information in comments or feedback (if applicable).</li>
                    </ul>

                    <h3 class="font-semibold mt-3 mb-1">5. Purposes for Which We Collect, Use, and Disclose Personal Data</h3>
                    <p class="mb-2">We collect, use, and disclose your personal data for the following purposes:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>To respond to your inquiries and provide relevant property market information or new launch details.</li>
                        <li>To facilitate professional follow-up regarding your property interests or requests.</li>
                        <li>To send you updates, newsletters, or marketing communications about new property launches, market insights, and related content (only where you have given consent or where permitted under PDPA marketing rules).</li>
                        <li>To improve the Site, analyse usage trends, and enhance user experience.</li>
                        <li>To comply with legal and regulatory obligations (including CEA and PDPA requirements).</li>
                        <li>For any other purpose for which you have provided consent or that is reasonably related to the above.</li>
                    </ul>

                    <h3 class="font-semibold mt-3 mb-1">6. Disclosure of Personal Data to Third Parties</h3>
                    <p class="mb-2">We may disclose your personal data to the following parties where necessary for the purposes stated above:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Authorised service providers and automation tools (e.g. website hosting, form processing, email delivery, analytics, and lead management/automation platforms such as those we use to manage inquiries efficiently).</li>
                        <li>PropNex Realty Pte Ltd or its authorised representatives, where relevant for estate agency work or compliance.</li>
                        <li>Professional advisors (e.g. lawyers) where necessary.</li>
                        <li>Government authorities or regulators where required by law or for compliance purposes.</li>
                    </ul>
                    <p class="mb-2">We do not sell your personal data to third parties. All third-party service providers are required to handle your data securely and only for the purposes we specify.</p>

                    <h3 class="font-semibold mt-3 mb-1">7. Cookies and Similar Technologies</h3>
                    <p class="mb-2">The Site uses cookies and similar technologies (e.g. Google Analytics or equivalent) to collect technical and usage data. This helps us understand how visitors use the Site and improve its performance.</p>
                    <p class="mb-2">You can manage cookie preferences through your browser settings. Some features of the Site may not function properly if cookies are disabled. We will provide a cookie consent notice where required.</p>

                    <h3 class="font-semibold mt-3 mb-1">8. Data Retention</h3>
                    <p class="mb-2">We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law or regulatory obligations (including CEA record-keeping requirements where applicable). When data is no longer needed, we will securely delete or anonymise it.</p>

                    <h3 class="font-semibold mt-3 mb-1">9. Security of Personal Data</h3>
                    <p class="mb-2">We implement reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, misuse, or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

                    <h3 class="font-semibold mt-3 mb-1">10. Your Rights Under the PDPA</h3>
                    <p class="mb-2">You have the following rights in relation to your personal data:</p>
                    <ul class="list-disc pl-5 mb-2 text-sm">
                        <li>Access: Request access to the personal data we hold about you.</li>
                        <li>Correction: Request correction of any inaccurate or incomplete personal data.</li>
                        <li>Withdrawal of consent: Withdraw your consent to the collection, use, or disclosure of your personal data (note that this may affect our ability to respond to your inquiries or provide services).</li>
                        <li>Complaint: Lodge a complaint if you believe we have mishandled your personal data.</li>
                    </ul>
                    <p class="mb-2">To exercise any of these rights, please contact us using the details in section 13. We may require verification of your identity before processing your request.</p>

                    <h3 class="font-semibold mt-3 mb-1">11. Third-Party Websites</h3>
                    <p class="mb-2">The Site may contain links to third-party websites (e.g. developer sites or property portals). We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal data.</p>

                    <h3 class="font-semibold mt-3 mb-1">12. Changes to This Privacy Policy</h3>
                    <p class="mb-2">We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the way we operate the Site. The “Last Updated” date at the top indicates the current version. We encourage you to review this Policy periodically. Continued use of the Site after changes constitutes acceptance of the updated Policy.</p>

                    <h3 class="font-semibold mt-3 mb-1">13. Contact Us</h3>
                    <p class="mb-2">If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact:</p>
                    <p class="mb-1">Jack Leow<br>CEA Registration No.: R074023I<br>PropNex Realty Pte Ltd (Estate Agent Licence No. L3008022J)<br>sellingsgproperty@gmail.com</p>
                    <p class="mb-2">We will respond to your request within a reasonable time in accordance with the PDPA.</p>
                `;
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function hideLegalPopup() {
            const modal = document.getElementById('legal-modal');
            if (modal) {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }
        }
        
        function submitEnquiry(e) {
            e.preventDefault()
            const form = e.target
            const btn = form.querySelector('button[type="submit"]')
            btn.innerHTML = `<span class="flex items-center justify-center gap-x-2"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span>`
            btn.disabled = true
            
            const formData = new FormData(form)
            // Robust Netlify Forms serialization:
            // - Force honeypot empty (prevents silent spam discard)
            // - Force form-name from the <form name="..."> attribute
            // - Send raw FormData (lets fetch set proper multipart/form-data)
            formData.set('bot-field', '')
            formData.set('form-name', form.getAttribute('name') || 'contact')
            
            // Debug helper — open DevTools > Console when you test
            console.group('[Netlify Form Debug] submitEnquiry (modal)')
            console.log('Form name attr:', form.getAttribute('name'))
            console.log('Serialized entries:')
            for (let [k, v] of formData.entries()) { console.log('  ' + k + ':', v) }
            console.groupEnd()
            
            fetch('/.netlify/functions/contact', {
                method: 'POST',
                body: formData
                // Intentionally no Content-Type header — browser sets multipart boundary
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = `✓ Thanks — you'll get a free check shortly`
                    btn.classList.add('!bg-emerald-600')
                    
                    setTimeout(() => {
                        form.reset()
                        hideContactModal()
                        
                        const toast = document.createElement('div')
                        toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-x-3 text-sm z-[200]`
                        toast.innerHTML = `<div><div class="font-semibold">Thanks! We will WhatsApp your free situation check shortly.</div><div class="text-xs opacity-90">No pressure, zero obligation.</div></div>`
                        document.body.appendChild(toast)
                        
                        setTimeout(() => {
                            toast.style.transition = 'all .4s'
                            toast.style.opacity = '0'
                            setTimeout(() => toast.remove(), 400)
                        }, 4500)
                    }, 1800)
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(() => {
                btn.innerHTML = `Send Message`
                btn.disabled = false
                alert("Thanks! Please WhatsApp +65 8062 1538 with your details.")
            })
        }
        
        function handleEnquirySubmit(e) {
            e.preventDefault()
            const form = e.target
            const btn = form.querySelector('button[type="submit"]')
            btn.innerHTML = `<span class="flex items-center justify-center gap-x-2"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span>`
            btn.disabled = true
            
            const formData = new FormData(form)
            // Robust Netlify Forms serialization:
            // - Force honeypot empty (prevents silent spam discard)
            // - Force form-name from the <form name="..."> attribute
            // - Send raw FormData (lets fetch set proper multipart/form-data)
            formData.set('bot-field', '')
            formData.set('form-name', form.getAttribute('name') || 'contact')
            
            // Debug helper — open DevTools > Console when you test
            console.group('[Netlify Form Debug] handleEnquirySubmit (contact page)')
            console.log('Form name attr:', form.getAttribute('name'))
            console.log('Serialized entries:')
            for (let [k, v] of formData.entries()) { console.log('  ' + k + ':', v) }
            console.groupEnd()
            
            // Submit to our custom handler (sends instant email via Resend + logs to Netlify Forms dashboard)
            fetch('/.netlify/functions/contact', {
                method: 'POST',
                body: formData
                // Intentionally no Content-Type header — browser sets multipart boundary
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = `✓ Thanks — you'll get a free check shortly`
                    btn.classList.add('!bg-emerald-600')
                    
                    setTimeout(() => {
                        form.reset()
                        btn.innerHTML = `Send Message`
                        btn.disabled = false
                        btn.classList.remove('!bg-emerald-600')
                        btn.classList.add('bg-violet-700')
                        
                        const success = document.createElement('div')
                        success.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-x-3 text-sm z-[200]'
                        success.innerHTML = `<div><div class="font-semibold">Thanks! We will WhatsApp your free situation check shortly.</div><div class="text-xs opacity-90">No pressure, zero obligation.</div></div>`
                        document.body.appendChild(success)
                        
                        setTimeout(() => {
                            success.style.transition = 'all .4s'
                            success.style.opacity = '0'
                            setTimeout(() => success.remove(), 400)
                        }, 4500)
                    }, 1800)
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(() => {
                // Fallback if the Netlify Function failed (e.g. missing RESEND_API_KEY)
                btn.innerHTML = `Send Message`
                btn.disabled = false
                alert("Thanks! Please WhatsApp +65 8062 1538 with your details.")
            })
        }
        
        function initializeFAQ() {
            const faqData = [
                { q: "Do buyers pay any commission when purchasing new launch condos through SellingSgProperty?", a: "No. We charge zero commission to buyers. We are paid directly by the developer, so you get the same launch price with no extra cost." },
                { q: "What is the indicative price range for Dunearn House in 2026?", a: "Indicative prices for Dunearn House range from approximately $1.9M to $3.3M, or roughly $2,800–$3,100 psf depending on unit type and floor." },
                { q: "Is Dunearn House suitable for families with young children?", a: "Yes. It is one of the most family-friendly new launches in 2026 — just a 7-minute walk to Sixth Avenue MRT, close to top schools, with lush greenery and the major Turf City masterplan transformation coming." },
                { q: "How does ABSD affect buying a new launch condo in Singapore?", a: "ABSD rates depend on your residency status (Singaporean, PR, or foreigner) and whether it is your first or subsequent property. We provide clear guidance tailored to your situation during the free situation check." },
                { q: "Should I buy a new launch condo or a resale condo?", a: "It depends on your timeline, budget, and goals. New launches offer progressive payment schemes and developer incentives but require waiting for TOP. Resales allow immediate move-in but may have higher entry prices in prime locations." },
                { q: "What should I check before booking a new launch unit?", a: "Pressure-test your budget, loan eligibility, TDSR, and Seller's Stamp Duty timeline. Map out your exit plan (resale or rental demand) and avoid rushing into a booking fee without proper analysis." },
                { q: "Can foreigners or PRs buy new launch condos like Dunearn House?", a: "Yes, foreigners and PRs can purchase new launch condos, subject to ABSD and other rules. We give transparent advice based on your profile with no obligation." },
                { q: "How do I get personalized advice for my property situation?", a: "Book a free 30-minute situation check with Jack Leow. It is completely obligation-free and developer-paid — you pay nothing extra." }
            ]
            
            const container = document.getElementById('faq-accordion')
            
            faqData.forEach((item, index) => {
                const details = document.createElement('details')
                details.className = `faq-item border border-slate-200 rounded-2xl mb-3 overflow-hidden ${index === 0 ? '' : ''}`
                details.innerHTML = `
                    <summary class="flex items-center justify-between p-4 font-semibold text-slate-800 hover:bg-slate-50 transition cursor-pointer">
                        <span>${item.q}</span>
                        <i class="fa-solid fa-plus faq-icon text-violet-600 text-sm"></i>
                    </summary>
                    <p class="px-4 pb-4 text-sm text-slate-600">${item.a}</p>
                `
                container.appendChild(details)
            })
        }
        
        function toggleFAQ(element) {
            const content = element.nextElementSibling
            const icon = element.querySelector('i')
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden')
                icon.style.transform = 'rotate(180deg)'
            } else {
                content.classList.add('hidden')
                icon.style.transform = ''
            }
        }
        
        function initMobileMenu() {
            const mobileBtn = document.getElementById('mobile-menu-btn')
            if (mobileBtn) {
                mobileBtn.addEventListener('click', () => {
                    mobileBtn.setAttribute('aria-expanded', 'true');
                    mobileBtn.setAttribute('aria-label', 'Close navigation menu');
                    const nav = document.createElement('div')
                    nav.className = `fixed inset-0 bg-black/70 z-[200] flex xl:hidden`
                    nav.innerHTML = `
                        <div class="bg-white w-72 p-8">
                            <div class="flex justify-between mb-8">
                                <a href="/" class="mobile-logo text-left focus:outline-none active:opacity-70 -ml-1 p-1 rounded-lg active:bg-slate-100" data-page="home">
                                    <span class="font-black text-2xl">SellingSgProperty.</span>
                                    <span class="block text-[9px] text-violet-600 -mt-1 font-medium tracking-widest">SG</span>
                                </a>
                                <button class="text-3xl">×</button>
                            </div>
                            
                            <div class="space-y-1 text-lg">
                                <a href="/" data-page="home" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">Home</a>
                                <a href="/new-launch-condos/" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">New Launches</a>
                                <a href="/about/" data-page="about" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">About Us</a>
                                <a href="/insights/" data-page="blog" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">Insights</a>
                                <a href="/news" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors">News</a>
                                <a href="/undervalued-pty/" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors">Undervalued Pty</a>
                                <a href="/contact/" data-page="contact" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">Free situation check</a>
                                <a href="/mortgage-calculator/" data-page="mortgage-calculator" class="block w-full text-left font-medium py-2 px-1 -mx-1 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer">Mortgage calculator</a>
                            </div>
                        </div>
                    `
                    document.body.appendChild(nav)

                    // Target the close button (×) specifically, not the logo button which is also a <button>
                    const closeBtn = nav.querySelector('button.text-3xl');
                    const closeNav = () => {
                        nav.remove();
                        mobileBtn.setAttribute('aria-expanded', 'false');
                        mobileBtn.setAttribute('aria-label', 'Open navigation menu');
                    };
                    if (closeBtn) closeBtn.onclick = closeNav;
                    nav.addEventListener('click', e => { if (e.target === nav) closeNav(); });
                })
            }
        }
        
        function initializeWebsite() {
            console.log('%c[sellingsgproperty] initializeWebsite starting...', 'color:#64748b');

            try {
                filterProjects()
                
                const searchInput = document.getElementById('search-input')
                const sortSelect = document.getElementById('sort-select')
                
                if (searchInput) searchInput.addEventListener('input', filterProjects)
                if (sortSelect) sortSelect.addEventListener('change', filterProjects)
                
                initializeFAQ()
                initMobileMenu()
                
                const navHome = document.getElementById('nav-home');
                if (navHome) navHome.classList.add('nav-active')
                
                // Delegated nav handler — works for static + dynamically added buttons (e.g. mobile menu, future elements)
                document.addEventListener('click', (e) => {
                    const btn = e.target.closest('[data-page]');
                    if (!btn) return;
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return; // let "open in new tab" work
                    const page = btn.dataset.page;
                    if (!page) return;
                    
                    e.preventDefault();
                    
                    // Close mobile menu if this button is inside one
                    const menu = btn.closest('.fixed');
                    if (menu) menu.remove();
                    
                    if (page === 'faq') {
                        showPage('home');
                        setTimeout(() => {
                            const faqEl = document.getElementById('faq');
                            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                    } else {
                        showPage(page);
                    }
                });
                
                document.addEventListener('keydown', function(e) {
                    if (e.key === '/' && document.activeElement.tagName === 'BODY') {
                        e.preventDefault()
                        const search = document.getElementById('search-input')
                        if (search) search.focus()
                    }
                    
                    if (e.key === 'Escape') {
                        const modals = document.querySelectorAll('.fixed.inset-0')
                        if (modals.length) modals[modals.length - 1].classList.add('hidden')
                    }
                })
                
                const allFilter = document.querySelector('.quick-filter[data-filter="all"]')
                if (allFilter) allFilter.classList.add('filter-active', 'border-violet-700', 'bg-violet-50')
                
                console.log('%c[sellingsgproperty] Updated website with projects initialized.', 'color:#64748b')

                initBlogPagination();

                // Handle deep links to articles (e.g. /insights/hdb-phantom-fear or #insights/...) 
                setTimeout(() => {
                  try {
                    const routed = handleRoute();
                    if (!routed) {
                      // default: ensure home is shown (original behaviour)
                      setBaseMeta(); // ensure clean base tags for home/insights listing
                    }
                  } catch (routeErr) {
                    console.error('Deep link routing error:', routeErr);
                  }
                }, 30);
            } catch (initErr) {
                console.error('Critical initialization error - dynamic content may not appear:', initErr);
                // Fallback: at least try to show something
                const grid = document.getElementById('projects-grid');
                if (grid && grid.children.length === 0) {
                    grid.innerHTML = '<div style="padding:1rem;border:1px solid #f00;color:#f00;background:#fff0f0;border-radius:8px">Error initializing the project cards. Please open the browser Console (F12) and share the red error messages here so we can fix it.</div>';
                }
            }
        }
        
        window.onload = initializeWebsite

/* BUILD:ARTICLES-META START */
const ARTICLES = {"post-hdb-phantom-fear":{"title":"HDB Upgraders: Are You Trapped by Your Own \"Phantom Fear\"? (2026 Edition)","date":"21 March 2026","readTime":"8 min read","category":"HDB UPGRADERS","chipClass":"chip-hdb","img":null,"excerpt":"Yes — most HDB upgraders in Singapore are held back by \"Phantom Fear\" rather than real financial barriers…"},"post-absd-foreigners":{"title":"60% ABSD for Foreigners: Is Singapore Property Still Investable in 2026?","date":"7 March 2026","readTime":"7 min read","category":"FOREIGN BUYERS","chipClass":"chip-absd","img":null,"excerpt":"For most non-FTA foreigners, buying residential new launch condos in Singapore in 2026 is extremely…"},"post-decoupling":{"title":"The Decoupling Guide 2026: Legal Costs vs. ABSD Savings","date":"27 February 2026","readTime":"9 min read","category":"DECOUPLING","chipClass":"chip-decouple","img":null,"excerpt":"Decoupling can save $200k–$350k in ABSD on a second property in 2026, but only makes sense above ~$1.2M–$1.5M…"},"post-resolution-2026":{"title":"Why Buying a Private Property Should Be Your #1 Resolution for 2026 (Especially If You're Scared)","date":"1 January 2026","readTime":"10 min read","category":"WEALTH BUILDING","chipClass":"chip-wealth","img":null,"excerpt":"Every year, thousands of Singaporean families have the financial means to buy a private property — and don't…"},"post-new-launch-vs-resale":{"title":"New Launch vs Resale Condo in 2026: Which Should You Buy?","date":"14 February 2026","readTime":"7 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"New Launch Condos vs Resale Condos in Singapore 2026: which should you buy? Short answer — new launch condos…"},"post-cpf-private":{"title":"How Much CPF Can You Use for a Private Property in Singapore? (2026 Guide)","date":"20 January 2026","readTime":"6 min read","category":"CPF & FINANCING","chipClass":"chip-cpf","img":null,"excerpt":"CPF is most Singaporeans' largest financial asset — and most people dramatically underestimate how powerful…"},"post-district-guide":{"title":"Which Singapore District Should You Buy In? The 2026 Growth Map","date":"15 December 2025","readTime":"8 min read","category":"DISTRICT GUIDE","chipClass":"chip-district","img":null,"excerpt":"Location determines 70% of your property's long-term performance. You can get everything else right — price…"},"post-hdb-sell-signs":{"title":"5 Signs Your HDB Flat Is Ready to Sell — And How to Time It Right in 2026","date":"30 November 2025","readTime":"6 min read","category":"SELL YOUR HDB","chipClass":"chip-sell","img":null,"excerpt":"The difference between selling your HDB at the right time versus the wrong time in 2026 can easily be…"},"post-fomo-new-launch-2026":{"title":"FOMO vs Rational Analysis: The Psychology of Buying New Launch Condos in Singapore 2026","date":"12 April 2026","readTime":"9 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"The single biggest driver of new launch condo purchases in Singapore right now is not price or location — it…"},"post-first-condo-anxiety":{"title":"First Private Condo Anxiety: The Hidden Psychology Costing Singapore Upgraders Millions in 2026","date":"18 April 2026","readTime":"8 min read","category":"WEALTH","chipClass":"chip-wealth","img":null,"excerpt":"The biggest barrier for many HDB upgraders is not money — it is \"first private condo anxiety\". This specific…"},"post-progressive-payment-psychology":{"title":"Why Progressive Payments Make New Launch Condos Psychologically Easier to Buy in 2026","date":"25 April 2026","readTime":"7 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"The progressive payment scheme is one of the most powerful (and under-appreciated) psychological tools in…"},"post-absorption-herd-2026":{"title":"High Absorption Rates in Singapore New Launches: Smart Signal or Dangerous Herd Mentality in 2026?","date":"3 May 2026","readTime":"8 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"When a new launch condo hits 70%+ absorption in the first weekend, two very different stories are told…"},"post-developer-incentives-psych":{"title":"How Developer Incentives in New Launch Condos Exploit Buyer Psychology in 2026 (And How to See Through Them)","date":"10 May 2026","readTime":"7 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"Developer incentives (stamp duty absorption, legal fees paid, furniture vouchers, price discounts) are not…"},"post-dunearn-house-2026":{"title":"Dunearn House 2026: Why It's a Smart Buy in Prime Bukit Timah","date":"28 May 2026","readTime":"14 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"Dunearn House is the first private residential launch in the transformative Bukit Timah Turf City masterplan…"},"post-dunearn-vs-fourth-avenue-2026":{"title":"Dunearn House vs Fourth Avenue Residences: Which Is the Better Investment? (2026)","date":"29 May 2026","readTime":"13 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"If you are weighing Dunearn House as an investment against the already-completed Fourth Avenue Residences…"},"post-how-to-buy-new-launch-2026":{"title":"How to Buy a New Launch Condo in Singapore: A Step-by-Step 2026 Guide","date":"30 May 2026","readTime":"15 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"To buy a new launch condo in Singapore, you'll: (1) get your finances and loan approval ready, (2) register…"},"post-new-launch-vs-resale-cheaper-2026":{"title":"Are New Launch Condos Cheaper Than Resale? A 2026 Singapore Buyer's Guide","date":"31 May 2026","readTime":"12 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"Short answer: no — new launch condos are usually more expensive than resale on a per-square-foot (PSF) basis…"},"post-which-condo-to-buy-2026":{"title":"Which Condo to Buy in Singapore in 2026: A Practical Buyer's Guide","date":"1 Jun 2026","readTime":"14 min read","category":"WEALTH BUILDING","chipClass":"chip-wealth","img":null,"excerpt":"The best condo to buy in Singapore in 2026 is the one that matches three things: your purpose (own-stay…"},"post-dunearn-house-review-2026":{"title":"Dunearn House Review 2026: Is It Worth Buying? (Honest Pros & Cons)","date":"2 Jun 2026","readTime":"14 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"If you're reading this, chances are you've already seen the buzz around Dunearn House — the first private…"},"post-turf-city-masterplan-2026":{"title":"Turf City Masterplan 2026: What Dunearn House Buyers Need to Know","date":"3 Jun 2026","readTime":"12 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"The Bukit Timah Turf City masterplan is the defining long-term catalyst for Dunearn House and other new…"},"post-dunearn-house-buyers-guide-2026":{"title":"Dunearn House Buyer's Guide 2026: Price, Eligibility & Compare","date":"4 Jun 2026","readTime":"15 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"Dunearn House is expected to launch at roughly $2,800–$2,950 psf, with quantum ranging from ~$1.9M (smallest…"},"post-dunearn-house-family-living-guide-2026":{"title":"Why Families Love Dunearn House Bukit Timah: Prime Location Near Sixth Avenue MRT, Top Schools & Green Living in Turf City","date":"5 Jun 2026","readTime":"14 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"Dunearn House is genuinely one of the most family-friendly new launches of 2026. It sits about a 7-minute…"},"post-dunearn-house-investment-analysis-2026":{"title":"Dunearn House Investment Analysis 2026: First-Mover ROI in Turf City","date":"7 Jun 2026","readTime":"15 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"If you're sizing up Dunearn House new launch as an investment, you're really asking one bigger question: what…"},"post-hdb-vs-ec-vs-private-property-2026":{"title":"HDB vs EC vs Private Property: Which Should You Buy? (2026)","date":"10 Jun 2026","readTime":"11 min read","category":"HDB UPGRADERS","chipClass":"chip-hdb","img":null,"excerpt":"Short answer: it depends on your household income, how long you plan to stay, and what your next move looks…"},"post-thomson-reserve-price-review-2026":{"title":"Thomson Reserve Price: Is It Really Too Expensive in 2026?","date":"19 Jun 2026","readTime":"24 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":"insights/thomson-reserve-price-review-2026.jpg","excerpt":"Let's start with the honest version. Yes, Thomson Reserve will likely launch in the S$2,500 to S$3,100 psf…"},"post-thomson-reserve-risks-2026":{"title":"Thomson Reserve Risks: The 8 Real Risks Every Buyer Should Know in 2026","date":"27 Jun 2026","readTime":"30 min read","category":"NEW LAUNCH","chipClass":"chip-newlaunch","img":null,"excerpt":"The eight real risks of buying Thomson Reserve are: floating-rate BUC loan exposure, a 2027–2028 supply wave…"},"post-ipa-new-launch-2026":{"title":"The Dumbest Mistake Before a New Launch Condo: Skipping the IPA","date":"16 Jul 2026","readTime":"18 min read","category":"FINANCING","chipClass":"chip-finance","img":null,"excerpt":"The single most expensive mistake I see Singapore buyers make at a new launch is not the unit they pick, the…"},"post-hdb-vs-condo-affordability-2026":{"title":"Can I Afford a $1.7M Condo If I Can Afford a $970k HDB? A Singapore Affordability Reality Check","date":"17 Jul 2026","readTime":"8 min read","category":"HDB UPGRADERS","chipClass":"chip-buyer","img":"insights/hdb-vs-condo-affordability-2026.jpg","excerpt":"Under the Monetary Authority of Singapore's stress-test rules (4.0% floor rate), a $1,700,000 private condo…"},"post-thomson-reserve-prestige-trap-2026":{"title":"Thomson Reserve and the Prestige Trap: Why \"Good District\" May Be Costing You More Than You Think","date":"7 Aug 2026","readTime":"19 min read","category":"BUYER PSYCHOLOGY","chipClass":"chip-psychology","img":null,"excerpt":"Here is a question almost nobody asks before buying a condo in Singapore: how much of this price am I paying…"},"post-thomson-reserve-enbloc-illusion-2026":{"title":"Thomson Reserve and the $810 Million Illusion: Why a Big En Bloc Price Is Not Proof You Should Buy","date":"8 Aug 2026","readTime":"12 min read","category":"BUYER PSYCHOLOGY","chipClass":"chip-psychology","img":null,"excerpt":"The $810 million paid for the former Thomson View site does not mean Thomson Reserve is a good buy for you…"}};
/* BUILD:ARTICLES-META END */



// ===== ARTICLE PAGE (separate full page, not modal) =====
let currentArticleId = null;

function showArticle(id, pushHistory = true) {
  // Every article is a real, crawlable page at /insights/<slug> (built by scripts/build-pages.cjs)
  if (id) { window.location.href = getCleanPath(id); return; }
  const post = ARTICLES[id];
  if (!post) return;

  currentArticleId = id;

  // Hide everything else, show the dedicated article page
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const articlePage = document.getElementById('page-article');
  articlePage.classList.add('active');

  // Make sure Insights nav stays active
  document.querySelectorAll('[id^="nav-"]').forEach(nav => nav.classList.remove('nav-active'));
  const navBlog = document.getElementById('nav-blog');
  if (navBlog) navBlog.classList.add('nav-active');

  // Populate content
  // Always use clean gradient banner for blog/insight posts (no post-specific images in hero)
  // Only the generic "Singapore Property Insights. Data-driven. No fluff." in the dark banner.
  // Actual post title appears in the white content area below (#article-title).
  const heroImg = document.getElementById('article-hero-img');
  if (heroImg) {
    heroImg.style.display = 'none'; // never show blog image in hero
    const heroWrap = heroImg.parentElement;
    if (heroWrap) {
      heroWrap.innerHTML = `
        <div class="w-full h-[280px] md:h-[380px] bg-gradient-to-br from-slate-800 to-zinc-900 flex items-center justify-center text-white">
          <div class="text-center px-8">
            <div class="text-xs tracking-[2px] opacity-60 mb-2">Singapore Property Insights. Data-driven. No fluff.</div>
          </div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0">
          <div class="max-w-screen-2xl mx-auto px-8 pb-6">
            <span id="article-chip" class="px-3 py-1 text-xs font-bold rounded-2xl"></span>
          </div>
        </div>
      `;
    }
  }
  
  const chipEl = document.getElementById('article-chip');
  chipEl.textContent = post.category || '';
  chipEl.className = (post.chipClass || 'chip-wealth') + ' px-3 py-1 text-xs font-bold rounded-2xl';

  document.getElementById('article-date').textContent = post.date || '';
  document.getElementById('article-read-time').textContent = post.readTime || '';
  document.getElementById('article-title').textContent = post.title || '';

  const bodyEl = document.getElementById('article-body');
  bodyEl.innerHTML = post.body || '';

  // SEO/AEO: dynamic tags + TOC + FAQ schema + E-E-A-T (critical for ranking)
  updateArticleSEO(post, id);
  enhanceArticleWithAEO(bodyEl, post, id);

  // Truncated nav title
  const navTitle = document.getElementById('article-nav-title');
  if (navTitle) {
    const short = post.title && post.title.length > 58 ? post.title.slice(0, 55) + '...' : (post.title || '');
    navTitle.textContent = short;
  }

  // Old LinkedIn share replaced with WhatsApp "Share with fam/frens" (see shareArticleWithFamFrens)

  // Reset progress bar
  const prog = document.getElementById('article-read-progress');
  if (prog) prog.style.width = '0%';

  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Attach window scroll listener for progress (only while article is visible)
  window.addEventListener('scroll', updateArticleProgress, { passive: true });

  if (pushHistory) {
    history.pushState({ type: 'article', id: id }, '', getCleanPath(id));
  }
}

function updateArticleProgress() {
  const prog = document.getElementById('article-read-progress');
  const articlePage = document.getElementById('page-article');
  if (!prog || !articlePage || !articlePage.classList.contains('active')) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  ) - window.innerHeight;

  if (docHeight <= 0) return;
  const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  prog.style.width = pct + '%';
}

function cleanupArticleView() {
  const prog = document.getElementById('article-read-progress');
  if (prog) prog.style.width = '0%';

  window.removeEventListener('scroll', updateArticleProgress);

  // Restore base meta for listings / home (SEO consistency)
  setBaseMeta();
  currentArticleId = null;
}

function shareCurrentArticle() {
  const id = currentArticleId;
  const post = id && ARTICLES[id];
  const url = location.origin + (id ? getCleanPath(id) : '/insights/');

  if (navigator.share && post) {
    navigator.share({
      title: post.title,
      text: 'Singapore property insights by Jack Leow',
      url: url
    }).catch(() => {});
    return;
  }

  // Fallback: copy link
  navigator.clipboard?.writeText(url).then(() => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-5 py-2 rounded-3xl shadow-xl z-[200]';
    toast.textContent = 'Link copied to clipboard';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'all .3s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 200);
    }, 1600);
  }).catch(() => {
    // ultimate fallback
    prompt('Copy this link:', url);
  });
}

function shareArticleWithFamFrens() {
  const id = currentArticleId;
  const post = id && ARTICLES[id];
  const url = location.origin + (id ? getCleanPath(id) : '/insights/');
  const title = post ? post.title : 'Singapore property insight by Jack Leow';

  const text = `Check out this article: ${title} — ${url}`;

  // Copy the link (as requested)
  const copyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    } else {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(ta);
    }
  };

  copyLink();

  // Open WhatsApp with prefilled message
  const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(wa, '_blank');
}

// Client-side router supporting clean paths (/insights/slug) for Netlify/SEO + legacy hash paths
function handleRoute() {
  const target = getIdFromPathOrHash();
  if (target === 'blog') {
    showPage('blog', false);
    return true;
  }
  if (target && ARTICLES[target]) {
    // Show article without pushing another history entry
    showArticle(target, false);
    return true;
  }

  // New subpages: mortgage calculator, deep analysis, about, contact, etc.
  const page = getPageFromPathname();
  if (page) {
    showPage(page, false); // initial load: URL already correct, don't push duplicate history
    return true;
  }

  // Support direct links to project cards (e.g. /project/arina-east-residences opens modal on home)
  if (location.pathname.startsWith('/project/')) {
    const slug = (location.pathname.split('/')[2] || '').toLowerCase();
    const proj = projects.find(p => {
      const pslug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return pslug === slug;
    });
    if (proj) {
      if (slug === 'thomson-reserve-condo') {
        window.location.href = 'https://www.sellingsgproperty.com/project/thomson-reserve-condo/';
        return true;
      }
      showPage('home', false);
      setTimeout(() => showProjectModal(proj.id), 80);
      return true;
    }
  }

  return false;
}

// Keyboard: Escape goes back to the insights list when viewing an article
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const articlePage = document.getElementById('page-article');
    if (articlePage && articlePage.classList.contains('active')) {
      showPage('home'); // back to main landing view at root
    }
  }
});

// Browser back/forward support (clean paths + hash)
window.addEventListener('popstate', function() {
  const state = history.state;
  if (state && state.type === 'article' && ARTICLES[state.id]) {
    showArticle(state.id, false);
  } else if (state && state.type === 'project' && state.id) {
    showPage('home', false);
    setTimeout(() => showProjectModal(state.id), 50);
  } else if (state && state.type === 'page' && state.page) {
    showPage(state.page, false);
  } else {
    // default back to blog list / home or other subpage
    const target = getIdFromPathOrHash();
    if (target === 'blog') {
      showPage('home', false);
    } else if (target && ARTICLES[target]) {
      showArticle(target, false);
    } else {
      const page = getPageFromPathname();
      if (page) {
        showPage(page, false);
      } else if (location.pathname.startsWith('/project/')) {
        const slug = (location.pathname.split('/')[2] || '').toLowerCase();
        const proj = projects.find(p => {
          const pslug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          return pslug === slug;
        });
        if (proj) {
          if (slug === 'thomson-reserve-condo') {
            window.location.href = 'https://www.sellingsgproperty.com/project/thomson-reserve-condo/';
          } else {
            showPage('home', false);
            setTimeout(() => showProjectModal(proj.id), 50);
          }
        } else {
          showPage('home', false);
        }
      } else {
        showPage('home', false);
      }
    }
  }
});

// ===== SEO + AEO HELPERS (dynamic per-article meta, schema, TOC for #1 rankings) =====
const BASE_TITLE = ROUTE_META.home.title;
const BASE_DESC = ROUTE_META.home.desc;

// Clean URL helpers (support /insights/slug instead of #insights/post-xxx for better SEO on Netlify)
function getCleanPath(id) {
  const slug = id.replace(/^post-/, '');
  return `/insights/${slug}/`;
}
function getIdFromPathOrHash() {
  // 1. Hash support (backward compat + direct file://)
  const hash = (location.hash || '').replace('#', '');
  if (hash.startsWith('insights/')) {
    const part = hash.split('/')[1];
    if (ARTICLES[part]) return part;
    const withPost = 'post-' + part;
    if (ARTICLES[withPost]) return withPost;
  }
  if (hash === 'blog' || hash === 'insights') {
    return 'blog';
  }

  // 2. Clean pathname support (Netlify deploys with rewrites)
  const pathname = location.pathname || '';
  if (pathname.startsWith('/insights/')) {
    const slug = pathname.split('/')[2] || '';
    if (ARTICLES[slug]) return slug;
    const withPost = 'post-' + slug;
    if (ARTICLES[withPost]) return withPost;
  }
  if (pathname === '/insights' || pathname === '/blog') {
    return 'blog';
  }
  return null;
}

// Map clean subpage paths to internal page ids (used for direct loads + popstate)
function getPageFromPathname() {
  const p = (location.pathname || '/').replace(/\/$/, '');
  if (p === '' || p === '/' || p === '/home') return 'home';
  if (p === '/insights' || p === '/blog') return 'blog';
  if (p === '/about') return 'about';
  if (p === '/contact') return 'contact';
  if (p === '/mortgage-calculator') return 'mortgage-calculator';
  if (p === '/deep-analysis/arina-east-residences' || p === '/deep-analysis/arina' || p.startsWith('/deep-analysis/arina')) return 'deep-analysis-arina';
  return null;
}

function setBaseMeta() {
  applyRouteMeta(ROUTE_META.home);
  // remove any injected per-article schema
  const oldArt = document.getElementById('article-ld-json');
  if (oldArt) oldArt.remove();
  // FAQ schemas are completely disabled for all blog posts (see enhanceArticleWithAEO)
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateTOC(container, articleId) {
  // Remove existing TOC if any
  const existing = container.querySelector('.article-toc');
  if (existing) existing.remove();

  const headings = container.querySelectorAll('h2, h3');
  if (headings.length < 2) return;

  const toc = document.createElement('div');
  toc.className = 'article-toc my-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm';
  toc.innerHTML = '<div class="font-semibold text-slate-700 mb-2 text-xs tracking-widest">ON THIS PAGE</div><ul class="space-y-1"></ul>';

  const ul = toc.querySelector('ul');
  headings.forEach((h, i) => {
    if (!h.id) h.id = slugify(h.textContent) + '-' + articleId.slice(-4);
    const li = document.createElement('li');
    const level = h.tagName === 'H3' ? 'pl-4 text-xs' : '';
    li.innerHTML = `<a href="#${h.id}" class="toc-link text-slate-600 hover:text-violet-700 transition ${level}">${h.textContent}</a>`;
    ul.appendChild(li);
    // smooth scroll
    h.addEventListener('click', () => {
      // allow default but ensure behavior
    }, { once: true });
  });

  // Insert after the title/meta area (before body content or as first child of body container)
  const bodyEl = container; // the #article-body
  if (bodyEl.firstChild) {
    bodyEl.insertBefore(toc, bodyEl.firstChild);
  } else {
    bodyEl.appendChild(toc);
  }
}

function updateArticleSEO(post, id) {
  // Use current origin so it works on any deploy (netlify.app, custom domain, etc.)
  const baseUrl = location.origin || 'https://www.sellingsgproperty.com';
  const fullUrl = `${baseUrl}${getCleanPath(id)}`;

  // 1. Title
  document.title = `${post.title} | SellingSgProperty`;

  // 2. Description (use a clean excerpt)
  let descText = post.title + ' — Practical 2026 Singapore property guide by Jack Leow with numbers, steps and FAQs.';
  // try to pull first strong sentence
  const leadMatch = (post.body || '').match(/<p><strong>([^<]{40,220})<\/strong>/);
  if (leadMatch) descText = leadMatch[1].replace(/"/g, '') + ' | Jack Leow 2026 insights.';
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', descText);

  // 3. OG + Twitter
  const ogT = document.querySelector('meta[property="og:title"]');
  if (ogT) ogT.setAttribute('content', post.title);
  const ogD = document.querySelector('meta[property="og:description"]');
  if (ogD) ogD.setAttribute('content', descText);
  const ogU = document.querySelector('meta[property="og:url"]');
  if (ogU) ogU.setAttribute('content', fullUrl);
  if (post.img) {
    const ogI = document.querySelector('meta[property="og:image"]');
    if (ogI) ogI.setAttribute('content', post.img);
  }
  const twT = document.querySelector('meta[name="twitter:title"]');
  if (twT) twT.setAttribute('content', post.title);
  const twD = document.querySelector('meta[name="twitter:description"]');
  if (twD) twD.setAttribute('content', descText);

  // 4. Canonical
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute('href', fullUrl);

  // 5. Detailed Article schema (injected)
  const old = document.getElementById('article-ld-json');
  if (old) old.remove();
  // No FAQPage schema for blog posts (see enhanceArticleWithAEO)

  // Map human dates to ISO (simple, no extra deps)
  const dateMap = {
    '21 March 2026': '2026-03-21', '7 March 2026': '2026-03-07', '27 February 2026': '2026-02-27',
    '1 January 2026': '2026-01-01', '14 February 2026': '2026-02-14', '20 January 2026': '2026-01-20',
    '15 December 2025': '2025-12-15', '30 November 2025': '2025-11-30', '12 April 2026': '2026-04-12',
    '18 April 2026': '2026-04-18', '25 April 2026': '2026-04-25', '3 May 2026': '2026-05-03',
    '10 May 2026': '2026-05-10',
    '28 May 2026': '2026-05-28', '29 May 2026': '2026-05-29', '30 May 2026': '2026-05-30',
    '31 May 2026': '2026-05-31', '1 Jun 2026': '2026-06-01', '2 Jun 2026': '2026-06-02',
    '3 Jun 2026': '2026-06-03', '4 Jun 2026': '2026-06-04', '5 Jun 2026': '2026-06-05', '7 Jun 2026': '2026-06-07', '10 Jun 2026': '2026-06-10'
  };
  const isoDate = dateMap[post.date] || '2026-01-01';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": isoDate,
    "dateModified": "2026-06-05",
    "author": { "@id": "https://www.sellingsgproperty.com/#jackleow" },
    "publisher": { "@id": "https://www.sellingsgproperty.com/#organization" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": fullUrl },
    "image": post.img || "https://www.sellingsgproperty.com/assets/og-default.png",
    "description": descText
  };

  const artScript = document.createElement('script');
  artScript.type = 'application/ld+json';
  artScript.id = 'article-ld-json';
  artScript.textContent = JSON.stringify(articleSchema);
  document.head.appendChild(artScript);

  // FAQPage schema deliberately omitted for all blog posts (see enhanceArticleWithAEO)
  // This fixes GSC "FAQ - 2 invalid items detected" errors.
}

function enhanceArticleWithAEO(bodyContainer, post, id) {
  // Generate TOC (AEO + UX win)
  generateTOC(bodyContainer, id);

  // FAQ schema removed - fixes GSC invalid items (Google deprioritized FAQ rich results in 2026)
  // No FAQPage JSON-LD is added for any blog posts (existing or new).
  // Visible "Frequently Asked Questions" section (if kept) has no schema attached.
  // This change is in the central blog post template/rendering (enhanceArticleWithAEO + updateArticleSEO) so it applies to every post automatically.

  // Remove any FAQPage schema scripts from the article body HTML
  bodyContainer.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const txt = (script.textContent || '').trim();
      if (!txt) return;
      const data = JSON.parse(txt);
      const hasFaq = data && (data['@type'] === 'FAQPage' || (Array.isArray(data['@graph']) && data['@graph'].some(item => item && item['@type'] === 'FAQPage')));
      if (hasFaq) {
        script.remove();
      }
    } catch (e) {}
  });

  // Also remove any previously injected FAQ schemas from head
  const oldFaq = document.getElementById('faq-ld-json');
  if (oldFaq) oldFaq.remove();
  const oldHomeFaq = document.getElementById('home-faq-ld-json');
  if (oldHomeFaq) oldHomeFaq.remove();

  // GEO/AIO + AEO: Add HowTo schema for step-by-step guides (e.g. the "How to Buy" article)
  if (id === 'post-how-to-buy-new-launch-2026' && !document.getElementById('howto-ld-json')) {
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Buy a New Launch Condo in Singapore 2026",
      "description": "Step-by-step process including finances, balloting, OTP, stamp duties, progressive payments and key collection.",
      "totalTime": "P3Y",
      "step": [
        {"@type": "HowToStep", "name": "Sort your finances and get IPA", "text": "Secure In-Principle Approval before launch day."},
        {"@type": "HowToStep", "name": "Register interest and attend launch", "text": "Engage agent for VIP preview and select unit."},
        {"@type": "HowToStep", "name": "Pay booking fee and exercise OTP", "text": "5% booking fee then top up within 3 weeks."},
        {"@type": "HowToStep", "name": "Pay stamp duties and follow PPS", "text": "BSD/ABSD within 14 days; progressive payments over construction."},
        {"@type": "HowToStep", "name": "Collect keys at TOP", "text": "Inspect, submit defects list within liability period."}
      ]
    };
    const howtoScript = document.createElement('script');
    howtoScript.type = 'application/ld+json';
    howtoScript.id = 'howto-ld-json';
    howtoScript.textContent = JSON.stringify(howToSchema);
    document.head.appendChild(howtoScript);
  }

  // Add subtle "Last updated" + E-E-A-T note if not present
  if (!bodyContainer.querySelector('.last-updated-eat')) {
    const eat = document.createElement('div');
    eat.className = 'last-updated-eat text-[10px] text-slate-500 mt-8 pt-4 border-t border-slate-100';
    eat.innerHTML = `Last reviewed 21 Jun 2026 • Based on conversations with Singapore upgraders, IRAS/URA/MAS data and current 2026 market conditions. Jack Leow • View full sitemap`;
    bodyContainer.appendChild(eat);
  }

  // GEO/AIO: Add citation/source box for key claims if not present (helps AI grounding)
  if (!bodyContainer.querySelector('.geo-sources') && ((post.title || '').toLowerCase().includes('review') || (post.title || '').toLowerCase().includes('guide'))) {
    const sources = document.createElement('div');
    sources.className = 'geo-sources mt-6 p-4 bg-slate-50 rounded-2xl text-xs text-slate-600';
    sources.innerHTML = `<strong>Sources &amp; Further Reading:</strong> URA Master Plan 2025, IRAS ABSD rates 2026, OneMap school distances, developer sales data (updated Jun 2026). All figures are estimates; verify with official sources before purchase.`;
    bodyContainer.appendChild(sources);
  }

  // GEO/AIO: Add Review schema for review-style articles (great for AI Overviews and rich results)
  if ((id || '').includes('review') && !document.getElementById('review-ld-json')) {
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "RealEstateListing",
        "name": "Dunearn House",
        "description": "First private 99-year leasehold launch in Bukit Timah Turf City masterplan, ~380 units by Frasers/Sekisui/CSC."
      },
      "author": { "@id": "https://www.sellingsgproperty.com/#jackleow" },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.2",
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": "Strong for families and long-term CCR upgraders due to schools, MRT and masterplan upside. Less ideal for yield-focused or freehold buyers."
    };
    const reviewScript = document.createElement('script');
    reviewScript.type = 'application/ld+json';
    reviewScript.id = 'review-ld-json';
    reviewScript.textContent = JSON.stringify(reviewSchema);
    document.head.appendChild(reviewScript);
  }
}

// ===== DYNAMIC BLOG PAGINATION (latest first, 8 at a time for speed) =====
let sortedArticlesList = [];
let currentBlogFilter = 'all';
let currentBlogCount = 8;

const monthMap = {
  'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
};

function parseArticleDate(str) {
  if (!str) return new Date(0);
  const p = str.split(' ');
  if (p.length === 3) {
    return new Date(parseInt(p[2]), monthMap[p[1]] || 0, parseInt(p[0]));
  }
  return new Date(str);
}

function getDataCat(cat) {
  const c = (cat || '').toUpperCase();
  if (c.includes('HDB')) return 'hdb';
  if (c.includes('NEW LAUNCH')) return 'new-launch';
  if (c.includes('ABSD')) return 'absd';
  if (c.includes('WEALTH')) return 'wealth';
  if (c.includes('FOREIGN')) return 'foreign';
  if (c.includes('PSYCHOLOGY') || c.includes('BUYER')) return 'psychology';
  return 'new-launch';
}

function getExcerpt(body) {
  if (!body) return '';
  const m = body.match(/<p[^>]*>(.*?)<\/p>/s);
  if (m) {
    let txt = m[1].replace(/<[^>]+>/g, '').trim();
    return txt.length > 110 ? txt.substring(0, 110) + '...' : txt;
  }
  return '';
}

function createCardFromArt(key, art) {
  const dataCat = getDataCat(art.category);
  const chipCls = art.chipClass || 'chip-newlaunch';
  const chipTxt = art.category || 'NEW LAUNCH';
  const dt = art.date || '';
  const rt = art.readTime || '8 min';
  const ttl = art.title || '';
  const im = art.img;

  let vis = '';
  if (im) {
    vis = `<div class="relative overflow-hidden">
      <img src="${im}" class="w-full h-48 object-cover" alt="${ttl.replace(/"/g,'&quot;')}" loading="lazy">
      <div class="absolute top-4 left-4"><span class="${chipCls} px-3 py-1 text-xs font-bold rounded-2xl">${chipTxt}</span></div>
      <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>`;
  } else {
    vis = `<div class="h-48 bg-gradient-to-br from-violet-700 to-indigo-800 flex items-end p-5 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:3px_3px]"></div>
      <span class="${chipCls} absolute top-4 left-4">${chipTxt}</span>
      <div class="relative text-white">
        <div class="font-black text-xl leading-none tracking-tight line-clamp-2">${ttl.split(/[:–]/)[0]}</div>
      </div>
    </div>`;
  }

  const ex = art.excerpt || getExcerpt(art.body);

  return `<article data-category="${dataCat}" class="blog-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col" onclick="showArticle('${key}')">
    ${vis}
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex items-center justify-between text-xs mb-3">
        <time class="text-slate-400" datetime="${dt}">${dt}</time>
        <span class="text-emerald-600 font-medium flex items-center gap-x-1"><i class="fa-regular fa-clock"></i> ${rt}</span>
      </div>
      <h2 class="font-semibold text-base leading-tight mb-2 line-clamp-2 text-slate-900"><a href="${getCleanPath(key)}" class="hover:underline">${ttl}</a></h2>
      <p class="text-sm text-slate-600 line-clamp-3 flex-1">${ex}</p>
      <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-x-2 text-xs">
          <div class="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center"><span class="text-violet-700 text-[10px] font-black">JL</span></div>
          <span class="font-medium text-slate-700">Jack Leow</span>
        </div>
        <span class="text-violet-600 text-xs font-semibold">Read article →</span>
      </div>
    </div>
  </article>`;
}

function renderBlogCards(filter = 'all', count = 8, append = false) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  if (!append) grid.innerHTML = '';

  let list = sortedArticlesList;
  if (filter !== 'all') {
    list = list.filter(it => getDataCat(it.data.category) === filter);
  }

  const toShow = list.slice(0, count);
  toShow.forEach(it => {
    grid.insertAdjacentHTML('beforeend', createCardFromArt(it.key, it.data));
  });

  const lm = document.getElementById('load-more-container');
  if (lm) {
    lm.style.display = (list.length > count) ? 'block' : 'none';
    lm.dataset.filter = filter;
    lm.dataset.count = count;
  }
}

function loadMoreBlog() {
  const lm = document.getElementById('load-more-container');
  if (!lm) return;
  const f = lm.dataset.filter || 'all';
  const prevCount = parseInt(lm.dataset.count || '4');
  const newCount = prevCount + 4;

  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  let list = sortedArticlesList;
  if (f !== 'all') {
    list = list.filter(it => getDataCat(it.data.category) === f);
  }

  // append only the new ones (skip the first prevCount which are static or already shown)
  const toShow = list.slice(prevCount, newCount);
  toShow.forEach(it => {
    grid.insertAdjacentHTML('beforeend', createCardFromArt(it.key, it.data));
  });

  // update the button state
  lm.style.display = (list.length > newCount) ? 'block' : 'none';
  lm.dataset.count = newCount;
}

function initBlogPagination() {
  const grid = document.getElementById('blog-grid');
  const hasStatic = grid && grid.children.length > 0;

  // build sorted list (latest first)
  sortedArticlesList = Object.keys(ARTICLES).map(k => ({
    key: k,
    data: ARTICLES[k]
  })).sort((a, b) => parseArticleDate(b.data.date) - parseArticleDate(a.data.date));

  if (hasStatic) {
    // static first 4 are present for immediate content/SEO; load more will append next from data
    const lm = document.getElementById('load-more-container');
    if (lm) {
      lm.style.display = (sortedArticlesList.length > 4) ? 'block' : 'none';
      lm.dataset.filter = 'all';
      lm.dataset.count = '4';
    }
  } else {
    // initial latest 8 (dynamic)
    renderBlogCards('all', 8);
  }

  // load more
  const btn = document.getElementById('load-more-btn');
  if (btn) btn.onclick = loadMoreBlog;

  // initial active filter btn
  const allb = document.querySelector('.filter-btn[data-filter="all"]');
  if (allb) allb.classList.add('active');
}

// ===== CATEGORY FILTER (updated for dynamic) =====
function filterPosts(cat) {
  renderBlogCards(cat, 8);
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
}

    