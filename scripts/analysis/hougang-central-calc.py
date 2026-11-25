"""Hougang Central (sellingsgproperty.com analysis pilot) - every number on the page comes from this script.
Inputs are labelled C (Confirmed), R (Reported), E (Estimate) with source keys."""
import json

def bsd(p):  # IRAS residential BSD, from 15 Feb 2023 (C: IRAS)
    tiers = [(180000, .01), (180000, .02), (640000, .03), (500000, .04), (1500000, .05), (float('inf'), .06)]
    left, d = p, 0.0
    for band, r in tiers:
        x = min(left, band); d += x * r; left -= x
        if left <= 0: break
    return d

LEGAL = 6000            # E: standard's worked example
SELL = 0.02 * 1.09      # 2% agent fee + 9% GST (C: GST 9%)
YEARS = 5               # buy 2H2027 launch -> TOP 2030/31 target -> sell TOP+1 (2032); also clears 4-year SSD (C: MAS 2025)

# ---- A. developer floor (psf of GFA ~ psf of saleable area) ----
land = 1179             # C: HDB / CapitaLand, 14 Jan 2026
build = 448             # E: Gamuda Bursa filing 29 Sep 2025, preliminary main construction cost, Chencharu Close integrated site (analog)
land_finance = round(land * 0.03 * 3)  # E: land carried ~3 years at ~3% a year
fees = 180              # E: professional fees, marketing, show flat, stamp duty on land, property tax during build
cost = land + build + land_finance + fees
floor_lo = round(cost / 0.90 / 10) * 10   # 10% margin on price
floor_hi = round(cost / 0.85 / 10) * 10   # 15% margin
A = floor_lo

# ---- B. fair value today ----
parktown = 2360         # C: ParkTown Residence launch-weekend average, Feb 2025 (UOL / EdgeProp)
idx_2025q1, idx_2026q3 = 205.4, 212.7   # C: URA non-landed price index (data.gov.sg)
b1 = round(parktown * idx_2026q3 / idx_2025q1 / 5) * 5
florence = 1904         # C: URA caveats, Nov 2025-Oct 2026, 103 deals (The Florence Residences, TOP 2023)
sgr26, flo26 = 2091, 1892   # C: 2026 average psf, Sengkang Grand Residences vs The Florence Residences (URA caveats via Stacked Homes)
integ_prem = sgr26 / flo26 - 1                     # ~ +10.5% for integrated + next to MRT, same completion year
new_prem = (0.10, 0.15)                            # E: brand-new lease and condition vs a 3-year-old condo
b2 = (round(florence * (1 + integ_prem) * (1 + new_prem[0]) / 5) * 5, round(florence * (1 + integ_prem) * (1 + new_prem[1]) / 5) * 5)
B = round((b1 + (b2[0] + b2[1]) / 2) / 2 / 10) * 10

# ---- base-case growth from comparables (launch -> TOP+1, annualised) ----
def cagr(a, b, n): return (b / a) ** (1 / n) - 1
comps = {
    'Sengkang Grand Residences': cagr(1747, 2027, 5),   # 2019 -> 2024 (TOP 2023)
    'The Florence Residences':   cagr(1448, 1773, 5),   # 2019 -> 2024
    'Riverfront Residences':     cagr(1313, 1669, 6),   # 2018 -> 2024
    'The Woodleigh Residences':  cagr(2036, 2446, 6),   # Nov 2018 first units -> 2025 (TOP 2024), as in the mall study
    'Watertown':                 cagr(1169, 1358, 6),   # Jan 2012 first-month median -> 2018 (TOP 2017), as in the mall study
}
BASE, BEAR, BULL = 0.035, 0.0175, 0.045

def exit_psf(g): return B * (1 + g) ** YEARS

def net_return(entry_psf, size, g, years=YEARS):
    price = entry_psf * size
    cost_in = price + bsd(price) + LEGAL
    out = exit_psf(g) * size * (1 - SELL) if years == YEARS else B * (1 + g) ** years * size * (1 - SELL)
    return (out / cost_in) ** (1 / years) - 1

def solve_entry(size, g, target):
    lo, hi = 1000.0, 4000.0
    for _ in range(80):
        mid = (lo + hi) / 2
        if net_return(mid, size, g) > target: lo = mid
        else: hi = mid
    return lo

def exit_needed(entry_psf, size, years, target=0.05):
    price = entry_psf * size
    return (price + bsd(price) + LEGAL) * (1 + target) ** years / (1 - SELL) / size

# ---- return on cash (75% loan, normal progressive payment, no rent) ----
RATE = 0.026            # E: home-loan rate assumption (3M SORA ~1.38% Nov 2026 + typical spread)
def return_on_cash(entry_psf, size, g):
    price = entry_psf * size
    # stage (month, share): booking, S&P, foundation, frame, walls, ceiling, wiring, roads, TOP, CSC
    stages = [(0, .05), (2, .15), (10, .10), (18, .10), (24, .05), (28, .05), (32, .05), (38, .05), (48, .25), (60, .15)]
    loan_cap = .75 * price
    flows = {}  # month -> cash (+ in to investor, - out)
    drawn = 0.0
    for m, sh in stages:
        amt = sh * price
        cash_part = amt if m <= 2 else max(0.0, amt - max(0.0, loan_cap - drawn))
        loan_part = amt - cash_part
        drawn += loan_part
        flows[m] = flows.get(m, 0) - cash_part
        stages_drawn = drawn
    flows[0] -= bsd(price) + LEGAL
    # interest-only on drawn amounts until TOP (month 48), then 30-year amortisation
    bal = 0.0; schedule = {m: sh * price for m, sh in stages}
    cum_cash_draw = 0.0
    r = RATE / 12
    for m in range(0, 61):
        if m in schedule and m > 2:
            amt = schedule[m]
            loan_part = min(amt, max(0.0, loan_cap - bal))
            bal += loan_part
        if m >= 48:
            pay = bal * r / (1 - (1 + r) ** -(360 - (m - 48)))
            interest = bal * r; bal -= (pay - interest)
            flows[m] = flows.get(m, 0) - pay
        else:
            flows[m] = flows.get(m, 0) - bal * r
        if m >= 48:  # property tax + maintenance after TOP (E)
            flows[m] -= (1500 / 12 + 0.45 * size)
    sale = exit_psf(g) * size * (1 - SELL)
    flows[60] = flows.get(60, 0) + sale - bal
    # IRR (annualised)
    def npv(rate):
        rm = (1 + rate) ** (1 / 12) - 1
        return sum(v / (1 + rm) ** m for m, v in flows.items())
    lo, hi = -0.9, 1.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if npv(mid) > 0: lo = mid
        else: hi = mid
    cash_in = -sum(v for m, v in flows.items() if v < 0)
    return mid, cash_in, sale - bal

# ---- exit affordability ----
def income_needed(price):  # 75% loan, 4% stress, 30 years, TDSR 55% (C: MAS)
    loan = .75 * price; r = .04 / 12; pay = loan * r / (1 - (1 + r) ** -360)
    return pay / .55
MEDIAN_INCOME = 12446    # C: SingStat, 2025 median monthly household market income (preliminary, Feb 2026)
HDB = {'Hougang 4-room': 618888, 'Hougang 5-room': 783888, 'Serangoon 4-room': 653444, 'Serangoon 5-room': 838000}  # C: HDB resale, Nov 2025-Oct 2026
OUTSTANDING = 150000     # E: illustrative outstanding loan, Not available as an official median

units = {'2-bed': 700, '3-bed': 1000, '4-bed': 1345}   # R: ParkTown Residence sizes as a guide (Stacked Homes / 99.co)
out = {'A': {'land': land, 'build': build, 'landFinance': land_finance, 'fees': fees, 'cost': cost, 'floor': [floor_lo, floor_hi]},
       'B': {'parktown': parktown, 'b1': b1, 'integPrem': round(integ_prem * 100, 1), 'b2': b2, 'B': B},
       'comps': {k: round(v * 100, 1) for k, v in comps.items()},
       'exit': {'base': round(exit_psf(BASE)), 'bear': round(exit_psf(BEAR)), 'bull': round(exit_psf(BULL))},
       'units': {}}
for name, sz in units.items():
    C = solve_entry(sz, BASE, 0.05); W = solve_entry(sz, BASE, 0.03)
    row = {'size': sz, 'C': round(C / 10) * 10, 'walk': round(W / 10) * 10}
    row['buyAt'] = min(B, row['C'])
    for lab, e in (('at2500', 2500), ('at2600', 2600)):
        row[lab] = {s: round(net_return(e, sz, g) * 100, 1) for s, g in (('bear', BEAR), ('base', BASE), ('bull', BULL))}
        roc, cash_in, back = return_on_cash(e, sz, BASE)
        row[lab]['cash'] = round(roc * 100, 1); row[lab]['cashIn'] = round(cash_in, -3); row[lab]['cashBack'] = round(back, -3)
        roc_bear = return_on_cash(e, sz, BEAR)[0]; row[lab]['cashBear'] = round(roc_bear * 100, 1)
    row['need5y'] = round(exit_needed(2550, sz, 5)); row['need6y'] = round(exit_needed(2550, sz, 6))
    xq = exit_psf(BASE) * sz
    row['exitQuantum'] = round(xq, -3); row['incomeNeeded'] = round(income_needed(xq), -2)
    row['upfrontAtExit'] = round(.25 * xq + bsd(xq), -3)
    row['upgraderCapital'] = {k: round(v - OUTSTANDING, -3) for k, v in HDB.items()}
    row['walkQuantum'] = round(row['walk'] * sz, -3); row['buyAtQuantum'] = round(row['buyAt'] * sz, -3)
    out['units'][name] = row
# standard's worked-example check
out['check2300'] = [round(exit_needed(2300, 1000, 5)), round(exit_needed(2300, 1000, 6))]
print(json.dumps(out, indent=1))
