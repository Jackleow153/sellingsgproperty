"""Shared maths for analyses written to docs/ANALYSIS-STANDARD.md. Every published number comes from these functions.
Conventions (stated on each page): legal $6,000; selling 2% + 9% GST; MAS stress 4%, TDSR 55%, 75% LTV, 30 years;
return on cash uses a 75% loan at RATE with normal progressive payments, no rent (own-stay test)."""
import statistics

LEGAL = 6000
SELL = 0.02 * 1.09
RATE = 0.026          # E: home-loan rate assumption (3M SORA about 1.38% in Nov 2026 plus a typical spread)
MEDIAN_INCOME = 12446  # C: SingStat, 2025 median monthly household market income (preliminary)
OUTSTANDING = 150000   # E: illustrative HDB loan still owed (no official typical figure)


def bsd(p):  # IRAS residential BSD (from 15 Feb 2023)
    tiers = [(180000, .01), (180000, .02), (640000, .03), (500000, .04), (1500000, .05), (float('inf'), .06)]
    left, d = p, 0.0
    for band, r in tiers:
        x = min(left, band); d += x * r; left -= x
        if left <= 0: break
    return d


def cagr(a, b, years): return (b / a) ** (1 / years) - 1


def floor_price(land, build, finance_years=3, finance_rate=0.03, fees=180):
    fin = round(land * finance_rate * finance_years)
    cost = land + build + fin + fees
    return {'land': land, 'build': build, 'landFinance': fin, 'fees': fees, 'cost': cost,
            'floor': [round(cost / 0.90 / 10) * 10, round(cost / 0.85 / 10) * 10]}


def comps_growth(comps):
    """comps: {name: (launch_year_fraction, launch_psf, top_year, psf_by_year)} -> launch to TOP+1 (calendar-year average, mid-year)."""
    out = {}
    for name, (ly, lp, top, psf) in comps.items():
        y = top + 1
        if str(y) not in psf: continue
        out[name] = cagr(lp, psf[str(y)], (y + 0.5) - ly)
    return out


class Project:
    def __init__(self, B, years, top_month, growth):
        self.B, self.n, self.top_m, self.g = B, years, top_month, growth   # growth: dict bear/base/bull

    def exit_psf(self, g, years=None): return self.B * (1 + g) ** (years or self.n)

    def net_return(self, entry, size, g, years=None):
        n = years or self.n
        price = entry * size
        cost_in = price + bsd(price) + LEGAL
        return (self.exit_psf(g, n) * size * (1 - SELL) / cost_in) ** (1 / n) - 1

    def solve_entry(self, size, target, g=None):
        g = self.g['base'] if g is None else g
        lo, hi = 800.0, 5000.0
        for _ in range(80):
            mid = (lo + hi) / 2
            if self.net_return(mid, size, g) > target: lo = mid
            else: hi = mid
        return lo

    def exit_needed(self, entry, size, years, target=0.05):
        price = entry * size
        return (price + bsd(price) + LEGAL) * (1 + target) ** years / (1 - SELL) / size

    def return_on_cash(self, entry, size, g):
        price, top, sale = entry * size, self.top_m, round(self.n * 12)
        csc = min(top + 12, sale)
        # booking, S&P, foundation, frame, walls, ceiling, wiring, roads/car park, TOP, CSC: spread over the build
        build_pts = [round(top * f) for f in (0.2, 0.37, 0.5, 0.58, 0.67, 0.79)]
        stages = [(0, .05), (2, .15)] + list(zip(build_pts, [.10, .10, .05, .05, .05, .05])) + [(top, .25), (csc, .15)]
        loan_cap, bal, flows, r = .75 * price, 0.0, {}, RATE / 12
        flows[0] = -(bsd(price) + LEGAL)
        for m, sh in stages:
            amt = sh * price
            loan = 0.0 if m <= 2 else min(amt, max(0.0, loan_cap - bal))
            bal += loan
            flows[m] = flows.get(m, 0) - (amt - loan)
            if m == csc and csc == sale: pass
        bal_t = 0.0; sched = {}
        for m, sh in stages: sched[m] = sched.get(m, 0) + sh * price
        bal = 0.0
        for m in range(0, sale + 1):
            if m in sched and m > 2: bal += min(sched[m], max(0.0, loan_cap - bal))
            if m >= top:
                pay = bal * r / (1 - (1 + r) ** -(360 - (m - top)))
                bal -= pay - bal * r
                flows[m] = flows.get(m, 0) - pay - (1500 / 12 + 0.45 * size)
            else:
                flows[m] = flows.get(m, 0) - bal * r
        flows[sale] = flows.get(sale, 0) + self.exit_psf(g) * size * (1 - SELL) - bal

        def npv(rate):
            rm = (1 + rate) ** (1 / 12) - 1
            return sum(v / (1 + rm) ** m for m, v in flows.items())
        lo, hi = -0.95, 1.0
        for _ in range(200):
            mid = (lo + hi) / 2
            if npv(mid) > 0: lo = mid
            else: hi = mid
        return mid, -sum(v for v in flows.values() if v < 0)


def income_needed(price):
    loan = .75 * price; r = .04 / 12
    return loan * r / (1 - (1 + r) ** -360) / .55


def fmt_money(n): return f"${n:,.0f}"
def fmt_q(n): return f"${n/1e6:.2f}M" if n >= 1e6 else f"${round(n/1000):,}k"
def fmt_pct(v):
    v = round(v, 1)
    return f"{v:.1f}%" if v >= 0 else f"−{abs(v):.1f}%"
def median(v): return statistics.median(v)
