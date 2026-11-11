#!/usr/bin/env python3
"""Weekly HDB resale refresh for the Undervalued Pty page.

The URA private-condo screen in undervalued-pty/index.html stays as it is.
This script writes a separate section on the same page from registered HDB
resale prices. Those prices are never folded into the URA caveat medians.

The live source is the Housing & Development Board dataset "Resale flat
prices based on registration date, from Jan 2017 onwards" on data.gov.sg
(dataset d_8b84c4ee58e3cfc0ece0d773c8ca6abc). The file is downloaded through
the public dataset API. No API key is required.

PropertyGuru, EdgeProp and 99.co are not fetched. They do not offer this
open transaction file. A file you already have can be passed with --from
when it uses the same HDB columns (CSV or a JSON "rows" array).

Private condo caveats are not refreshed here. The URA Data Service needs an
AccessKey, and this script does not invent one. If URA_ACCESS_KEY is set,
the condo screen is still left unchanged.

From the site root:

    python3 scripts/refresh-buylow.py --sample
    python3 scripts/refresh-buylow.py
    python3 scripts/refresh-buylow.py --from export.csv
    python3 scripts/refresh-buylow.py --dry-run

--sample loads data/buylow-listings.sample.json. Those rows are a worked
example so the page can be tested. They are not a live HDB extract.

A failed download keeps undervalued-pty/listings.json and exits non-zero.
Nothing is deployed.

    python3 scripts/refresh-buylow.py --deploy

--deploy commits only undervalued-pty/index.html and
undervalued-pty/listings.json, then pushes origin main. It refuses sample
data. It does not commit the home page, the news pages, or this script.
Run it only after the Undervalued Pty navigation is already on main, or
commit that navigation yourself in the same release.

Weekly job, install it yourself if you want it. This script does not install
cron or launchd. Monday 07:00 in the Mac's local timezone:

    crontab -e
    0 7 * * 1 cd /Users/jackleow/sellingsgproperty && /usr/bin/python3 scripts/refresh-buylow.py --deploy >> /tmp/buylow-refresh.log 2>&1

launchd: a StartCalendarInterval of Weekday 1, Hour 7, Minute 0, with
ProgramArguments python3, scripts/refresh-buylow.py, --deploy, and
WorkingDirectory set to the site root. A failed download keeps the last good
file and does not push.

Comparison: same town, same flat type (3-room, 4-room, 5-room, Executive),
older lease-commencement year versus a newer year 1 to 10 years later, median
resale price over the last 12 months, dollar gap over $100,000. Each older
group is paired once, with the newer group that has the largest size-adjusted
gap. A card is clean only when both sides have at least 4 resales, the
size-adjusted gap is still over $100,000, and the older side's median
remaining lease is 70 years or more. The same town is the location check.
HDB rows have no coordinates and no photos. A missing photo is the
"Real Estate SG" box. At most 24 cards are published, clean cards first.
"""

from __future__ import annotations

import argparse
import csv
import html
import io
import json
import math
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "undervalued-pty" / "index.html"
OUT_JSON = ROOT / "undervalued-pty" / "listings.json"
SAMPLE_PATH = ROOT / "data" / "buylow-listings.sample.json"
START = "<!-- listed-now:start -->"
END = "<!-- listed-now:end -->"
SGT = timezone(timedelta(hours=8))
UA = "SellingSgProperty-buylow/1.0 (+https://www.sellingsgproperty.com/undervalued-pty/; weekly HDB resale refresh)"
DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
DATASET_API = f"https://api-open.data.gov.sg/v1/public/api/datasets/{DATASET_ID}"
MIN_GAP = 100_000
MAX_AGE = 10
MIN_N = 4
MIN_LEASE = 70
MAX_PAIRS = 24
SQM_TO_SQFT = 10.76391041671
FLAT_TYPES = {"3 ROOM": "3-room", "4 ROOM": "4-room", "5 ROOM": "5-room", "EXECUTIVE": "Executive"}
LINK_RE = re.compile(r"https?://|t\.me/|mailto:|wa\.me/", re.I)
SAMPLE_AS_OF = datetime(2026, 11, 2, 12, 0, tzinfo=SGT)


class FetchError(Exception):
    pass


def now_sg() -> datetime:
    return datetime.now(SGT)


def month_window(as_of: datetime) -> tuple[str, str]:
    first = as_of.replace(day=1)
    start = first - timedelta(days=365)
    return start.strftime("%Y-%m"), as_of.strftime("%Y-%m")


def esc(value) -> str:
    return html.escape(str(value), quote=True)


def fmt_k(value: float) -> str:
    sign = "-" if value < 0 else ""
    return f"{sign}${abs(round(value / 1000)):,}k"


def fmt_m(value: float) -> str:
    if value < 1_000_000:
        return fmt_k(value)
    digits = 2 if round(value / 10_000) % 10 == 0 else 3
    text = f"{value / 1_000_000:.{digits}f}".rstrip("0").rstrip(".")
    return f"${text}M"


def comma(value: float) -> str:
    return f"{round(value):,}"


def title_name(name: str) -> str:
    return re.sub(r"(^|[\s/(@-])([a-z])", lambda m: m.group(1) + m.group(2).upper(), name.strip().lower())


def as_number(value):
    if isinstance(value, str):
        value = value.replace(",", "").replace("$", "").replace("S$", "").strip()
        value = re.sub(r"[^\d.\-]", "", value)
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if math.isnan(number) or math.isinf(number):
        return None
    return number


def median(values: list[float]) -> float:
    ordered = sorted(values)
    mid = len(ordered) // 2
    if len(ordered) % 2:
        return ordered[mid]
    return (ordered[mid - 1] + ordered[mid]) / 2


def cell(row: dict, *keys: str) -> str:
    for key in keys:
        value = row.get(key)
        if value is None:
            continue
        text = str(value).strip()
        if text:
            return text
    return ""


def norm_flat(value: str) -> str:
    text = re.sub(r"\s+", " ", value.strip().upper().replace("-", " "))
    if text in {"EXECUTIVE MAISONETTE", "EXECUTIVE APARTMENT"}:
        return "EXECUTIVE"
    return text


def parse_year(value: str) -> int | None:
    match = re.search(r"(19|20)\d{2}", value or "")
    if not match:
        return None
    year = int(match.group(0))
    if year < 1960 or year > 2035:
        return None
    return year


def parse_years_left(value: str) -> int | None:
    match = re.search(r"(\d+)\s*year", value or "", re.I)
    if match:
        return int(match.group(1))
    number = as_number(value)
    if number is None:
        return None
    year = int(number)
    if year < 0 or year > 99:
        return None
    return year


def local_image(value) -> str | None:
    if not isinstance(value, str):
        return None
    if "://" in value or value.startswith("//") or value.lower().startswith("http"):
        return None
    if not value.startswith("/"):
        return None
    relative = value.lstrip("/")
    path = (ROOT / relative).resolve()
    try:
        path.relative_to(ROOT)
    except ValueError:
        return None
    if path.is_file():
        return "/" + path.relative_to(ROOT).as_posix()
    return None


def normalize_raw(raw: dict) -> dict:
    return {str(key).strip().lower(): value for key, value in raw.items() if key is not None}


def parse_transaction(raw: dict, start: str, end: str) -> tuple[dict | None, str | None]:
    if not isinstance(raw, dict):
        return None, "unreadable"
    row = normalize_raw(raw)
    month = cell(row, "month")[:7]
    if not re.fullmatch(r"\d{4}-\d{2}", month) or month < start or month > end:
        return None, "month"
    flat_type = norm_flat(cell(row, "flat_type", "flat type"))
    if flat_type not in FLAT_TYPES:
        return None, "flat-type"
    price = as_number(cell(row, "resale_price", "price"))
    if price is None or price <= 0:
        return None, "price"
    sqm = as_number(cell(row, "floor_area_sqm", "floor_area", "area"))
    if sqm is None or sqm <= 0:
        return None, "area"
    lease_year = parse_year(cell(row, "lease_commence_date", "lease_commence"))
    if lease_year is None:
        return None, "lease"
    town = re.sub(r"\s+", " ", cell(row, "town").upper())
    if not town:
        return None, "town"
    street = re.sub(r"\s+", " ", cell(row, "street_name", "street").upper())
    return {
        "month": month,
        "town": town,
        "flatType": flat_type,
        "block": cell(row, "block").upper(),
        "streetKey": street,
        "street": title_name(street) if street else "",
        "storey": cell(row, "storey_range", "storey").upper(),
        "sqm": round(sqm, 2),
        "price": int(round(price)),
        "leaseYear": lease_year,
        "leaseLeft": parse_years_left(cell(row, "remaining_lease", "remaining")),
        "image": local_image(row.get("image")),
    }, None


def clean_rows(raw_rows: list[dict], as_of: datetime):
    start, end = month_window(as_of)
    dropped = Counter()
    duplicates = 0
    kept = []
    seen = set()
    for raw in raw_rows:
        flat, reason = parse_transaction(raw, start, end)
        if reason:
            dropped[reason] += 1
            continue
        key = (
            flat["month"], flat["town"], flat["flatType"], flat["block"], flat["streetKey"],
            flat["storey"], flat["sqm"], flat["price"], flat["leaseYear"],
        )
        if key in seen:
            duplicates += 1
            continue
        seen.add(key)
        kept.append(flat)
    return kept, dropped, duplicates, start, end


def mode_street(rows: list[dict]) -> str:
    counts = Counter(row["street"] for row in rows if row["street"])
    if not counts:
        return "Street not listed"
    top = max(counts.values())
    return sorted(name for name, count in counts.items() if count == top)[0]


def aggregate(kept: list[dict]) -> list[dict]:
    groups = defaultdict(list)
    for row in kept:
        groups[(row["town"], row["flatType"], row["leaseYear"])].append(row)
    projects = []
    for rows in groups.values():
        first = rows[0]
        price = int(round(median([row["price"] for row in rows])))
        sqm = median([row["sqm"] for row in rows])
        sqft = int(round(sqm * SQM_TO_SQFT))
        if sqft <= 0:
            continue
        leases = [row["leaseLeft"] for row in rows if row["leaseLeft"] is not None]
        projects.append({
            "town": first["town"],
            "townLabel": title_name(first["town"]),
            "flatType": first["flatType"],
            "flatLabel": FLAT_TYPES[first["flatType"]],
            "name": f"{FLAT_TYPES[first['flatType']]} · lease from {first['leaseYear']}",
            "street": mode_street(rows),
            "leaseYear": first["leaseYear"],
            "leaseLeft": int(round(median(leases))) if leases else None,
            "n": len(rows),
            "price": price,
            "sqft": sqft,
            "psf": int(round(price / sqft)),
            "image": next((row["image"] for row in rows if row["image"]), None),
        })
    projects.sort(key=lambda item: (item["town"], item["flatType"], item["leaseYear"]))
    return projects


def make_pair(buy: dict, compare: dict, gap: float, adjusted: float) -> dict:
    checks = {
        "sales": buy["n"] >= MIN_N and compare["n"] >= MIN_N,
        "sizeAdj": adjusted > MIN_GAP,
        "sameTown": True,
        "sameType": True,
        "lease70": buy["leaseLeft"] is not None and buy["leaseLeft"] >= MIN_LEASE,
        "age": True,
    }
    age = compare["leaseYear"] - buy["leaseYear"]
    return {
        "town": buy["town"],
        "townLabel": buy["townLabel"],
        "flatType": buy["flatType"],
        "flatLabel": buy["flatLabel"],
        "ageGap": age,
        "gap": int(round(gap)),
        "sizeAdj": int(round(adjusted)),
        "clean": all(checks.values()),
        "checks": checks,
        "buy": buy,
        "compare": compare,
    }


def pair_projects(projects: list[dict]) -> list[dict]:
    buckets = defaultdict(list)
    for project in projects:
        buckets[(project["town"], project["flatType"])].append(project)
    pairs = []
    for bucket in buckets.values():
        for buy in bucket:
            best = None
            for compare in bucket:
                age = compare["leaseYear"] - buy["leaseYear"]
                if age < 1 or age > MAX_AGE:
                    continue
                gap = compare["price"] - buy["price"]
                if gap <= MIN_GAP:
                    continue
                adjusted = (compare["psf"] - buy["psf"]) * buy["sqft"]
                rank = (adjusted, -age)
                if best is None or rank > best[0]:
                    best = (rank, compare, gap, adjusted)
            if best:
                _, compare, gap, adjusted = best
                pairs.append(make_pair(buy, compare, gap, adjusted))
    pairs.sort(key=lambda item: (not item["clean"], -item["sizeAdj"], item["town"], item["buy"]["leaseYear"]))
    return pairs


def assert_public(text: str, label: str) -> None:
    if LINK_RE.search(text):
        raise SystemExit(f"{label} contains an outbound link. The file was not accepted.")
    if re.search(r"<a\b|href\s*=", text, re.I):
        raise SystemExit(f"{label} contains a hyperlink. The file was not accepted.")


def build_document(raw_rows: list[dict], source: str, as_of: datetime) -> dict:
    kept, dropped, duplicates, start, end = clean_rows(raw_rows, as_of)
    projects = aggregate(kept)
    pairs = pair_projects(projects)
    shown = pairs[:MAX_PAIRS]
    stamp = as_of.isoformat(timespec="seconds")
    when = f"{as_of.day} {as_of.strftime('%b %Y')}"
    clean_n = sum(1 for pair in pairs if pair["clean"])
    dropped_n = sum(dropped.values()) + duplicates
    months = [row["month"] for row in kept]
    span = f"{min(months)} to {max(months)}" if months else f"{start} to {end}"
    if source == "sample":
        lead = (
            "Worked example for testing. These are sample HDB resale figures, "
            "not a live download from the HDB open dataset and not URA condo caveats."
        )
    elif source == "hdb":
        lead = (
            "Registered HDB resale prices from the HDB open dataset on data.gov.sg, cleaned on "
            + when + ". These are past transactions, not asking prices, and they are not mixed into the URA condo medians below."
        )
    else:
        lead = (
            "HDB-shaped resale rows from a local file, cleaned on "
            + when + ". These are past transactions, not asking prices, and they are not mixed into the URA condo medians below."
        )
    note = (
        f"{lead} Resales in this screen were registered from {span}. "
        f"A card compares the same town and the same flat type. The newer lease started 1 to {MAX_AGE} years "
        f"after the older lease, and the median price gap is more than $100,000. "
        f"A clean card also needs at least {MIN_N} resales on each side, a size-adjusted gap still over $100,000, "
        f"and a median remaining lease of {MIN_LEASE} years or more on the older side. "
        f"The same town is the location check. The street is the most common street in that group. "
        f"Repeated registration rows are dropped before the median. "
        f"{len(kept)} resales kept, {len(projects)} groups, {len(pairs)} pairs found, {clean_n} clean. "
        f"{len(shown)} cards are shown, largest clean gaps first. {dropped_n} rows dropped. Updated {when}."
    )
    used = []
    seen_projects = set()
    for pair in shown:
        for side in (pair["buy"], pair["compare"]):
            key = (side["town"], side["flatType"], side["leaseYear"])
            if key not in seen_projects:
                seen_projects.add(key)
                used.append(side)
    document = {
        "source": source,
        "sample": source == "sample",
        "market": "HDB resale",
        "updated": stamp,
        "note": note,
        "rules": {
            "minGap": MIN_GAP,
            "maxAgeGap": MAX_AGE,
            "minSalesClean": MIN_N,
            "minLeaseLeft": MIN_LEASE,
            "flatTypes": list(FLAT_TYPES),
            "windowStart": start,
            "windowEnd": end,
            "maxCards": MAX_PAIRS,
        },
        "counts": {
            "raw": len(raw_rows),
            "kept": len(kept),
            "dropped": dropped_n,
            "droppedReasons": dict(dropped),
            "duplicates": duplicates,
            "projects": len(projects),
            "pairs": len(pairs),
            "shown": len(shown),
            "clean": clean_n,
        },
        "projects": used,
        "pairs": shown,
    }
    encoded = json.dumps(document, ensure_ascii=False)
    assert_public(encoded, "listings.json")
    return document


def thumb_html(project: dict) -> str:
    image = project.get("image")
    if image:
        return f'<img class="thumb-img" src="{esc(image)}" alt="{esc(project["name"])}">'
    return '<div class="thumb" role="img" aria-label="Real Estate SG">Real Estate SG</div>'


def pill(ok: bool, yes: str, no: str) -> str:
    return f'<span class="pill {"ok" if ok else "no"}">{"✓ " + yes if ok else "✕ " + no}</span>'


def lease_text(project: dict) -> str:
    if project["leaseLeft"] is None:
        return "Lease years not listed"
    return f'{project["leaseLeft"]} yrs left'


def side_html(project: dict, tag: str, buy: bool) -> str:
    return (
        '<div class="side">'
        f'<span class="tag{" buy" if buy else ""}">{tag}</span>'
        f'<span class="name">{esc(project["name"])}<span class="blk">{esc(project["street"])}</span></span>'
        f'<span class="price">{fmt_m(project["price"])}</span>'
        f'<span class="meta">Lease from {project["leaseYear"]} · {lease_text(project)} · '
        f'{comma(project["sqft"])} sqft · ${comma(project["psf"])} psf · {project["n"]} resales</span>'
        "</div>"
    )


def card_html(pair: dict) -> str:
    buy, compare = pair["buy"], pair["compare"]
    checks = pair["checks"]
    lease_no = "lease years not listed" if buy["leaseLeft"] is None else "under 70 yrs left"
    thin = f'only {buy["n"]} and {compare["n"]} resales'
    return (
        f'<article class="card listed-card{(" tierA" if pair["clean"] else "")}">'
        '<div class="listed-top">'
        f'{thumb_html(buy)}'
        '<div class="listed-main">'
        f'<div class="town">{esc(buy["townLabel"])}<small>{esc(buy["flatLabel"])} · older lease vs newer lease</small></div>'
        f'<div class="headgap"><strong class="num">+{fmt_k(pair["gap"])}</strong>'
        f'<small>transaction gap · {fmt_k(pair["sizeAdj"])} at equal size · same town</small></div>'
        "</div></div>"
        f'{side_html(buy, "BUY", True)}{side_html(compare, "VS", False)}'
        '<div class="ask-pills">'
        f'{pill(checks["sales"], "4+ resales each side", thin)}'
        f'{pill(checks["sizeAdj"], "gap holds at equal size", "gap shrinks under $100k at equal size")}'
        f'{pill(checks["sameTown"], "same town", "different town")}'
        f'{pill(checks["sameType"], "same flat type", "different flat type")}'
        f'{pill(checks["lease70"], "70+ yrs lease left", lease_no)}'
        f'{pill(True, "lease year gap " + str(pair["ageGap"]) + " years", "")}'
        "</div></article>"
    )


def render_block(document: dict) -> str:
    cards = "\n".join(card_html(pair) for pair in document["pairs"])
    if not cards:
        cards = '<div class="empty">No HDB resale gaps passed the weekly screen.</div>'
    return (
        f'<p id="listed-note">{esc(document["note"])}</p>\n'
        f'<div class="list" id="listed-cards">\n{cards}\n</div>'
    )


def spliced_page(block: str) -> str:
    page = PAGE.read_text()
    if START not in page or END not in page or page.count(START) != 1 or page.count(END) != 1:
        raise SystemExit(f"{PAGE.name} is missing the weekly markers. The page was left unchanged.")
    pre, rest = page.split(START, 1)
    _, post = rest.split(END, 1)
    updated = pre + START + "\n" + block + "\n" + END + post
    region = updated.split(START, 1)[1].split(END, 1)[0]
    assert_public(region, "HDB resale section")
    if "const DATA" not in updated or updated.count("const DATA") != page.count("const DATA"):
        raise SystemExit("The URA data script changed. The page was not written.")
    return updated


def write_outputs(document: dict) -> None:
    encoded = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
    assert_public(encoded, "listings.json")
    page = spliced_page(render_block(document))
    OUT_JSON.write_text(encoded)
    PAGE.write_text(page)


def load_json(path: Path) -> tuple[list[dict], dict]:
    payload = json.loads(path.read_text())
    if isinstance(payload, list):
        return payload, {}
    if isinstance(payload, dict):
        rows = payload.get("rows")
        if rows is None:
            rows = payload.get("transactions")
        if isinstance(rows, list):
            return rows, payload
    raise SystemExit(f"{path.name} needs a rows array of HDB transactions, or a CSV with the HDB columns.")


def load_csv(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return [dict(row) for row in csv.DictReader(handle)]


def load_path(path: Path) -> tuple[list[dict], dict]:
    if path.suffix.lower() == ".csv":
        return load_csv(path), {}
    return load_json(path)


def fetch_json(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        raise FetchError(f"HTTP {error.code} from the HDB open dataset") from error
    except urllib.error.URLError as error:
        raise FetchError(f"Could not reach the HDB open dataset ({error.reason})") from error
    except json.JSONDecodeError as error:
        raise FetchError("The HDB open dataset returned a response that was not JSON") from error
    if not isinstance(payload, dict):
        raise FetchError("The HDB open dataset returned an unexpected response")
    return payload


def file_url(payload: dict) -> str | None:
    data = payload.get("data")
    if not isinstance(data, dict):
        return None
    url = data.get("url") or data.get("download_url")
    if isinstance(url, str) and url.startswith("https://"):
        return url
    return None


def read_hdb_csv(response, start: str, end: str) -> list[dict]:
    text = io.TextIOWrapper(response, encoding="utf-8-sig", newline="")
    reader = csv.DictReader(text)
    fields = [str(name).strip().lower() for name in (reader.fieldnames or [])]
    if "month" not in fields or "resale_price" not in fields:
        raise FetchError("The HDB file is missing the month or resale_price column")
    rows = []
    for raw in reader:
        row = {str(key).strip().lower(): value for key, value in raw.items() if key is not None}
        month = str(row.get("month") or "").strip()[:7]
        if month < start or month > end:
            continue
        rows.append(row)
    return rows


def fetch_hdb(as_of: datetime) -> list[dict]:
    print("Requesting the HDB resale file from data.gov.sg.")
    payload = fetch_json(DATASET_API + "/initiate-download")
    url = file_url(payload)
    if not url:
        for _ in range(8):
            time.sleep(3)
            url = file_url(fetch_json(DATASET_API + "/poll-download"))
            if url:
                break
    if not url:
        raise FetchError("The HDB download did not return a file")
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/csv"})
    start, end = month_window(as_of)
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            rows = read_hdb_csv(response, start, end)
    except urllib.error.HTTPError as error:
        raise FetchError(f"HTTP {error.code} while downloading the HDB resale file") from error
    except urllib.error.URLError as error:
        raise FetchError(f"Could not download the HDB resale file ({error.reason})") from error
    except csv.Error as error:
        raise FetchError(f"The HDB resale file could not be read ({error})") from error
    print(f"Read {len(rows)} HDB resale rows registered from {start} to {end}.")
    return rows


def expect_sample(document: dict) -> None:
    found = {}
    for pair in document["pairs"]:
        key = (pair["town"], pair["flatType"], pair["buy"]["leaseYear"], pair["compare"]["leaseYear"])
        found[key] = pair
    expected = {
        ("TAMPINES", "4 ROOM", 2010, 2016): "clean",
        ("ANG MO KIO", "3 ROOM", 1980, 1986): "lease70",
        ("BEDOK", "5 ROOM", 2012, 2018): "sales",
        ("JURONG WEST", "4 ROOM", 2008, 2014): "sizeAdj",
    }
    if set(found) != set(expected):
        raise SystemExit(f"Sample pairs did not match the worked example: {sorted(found)}")
    for key, flag in expected.items():
        pair = found[key]
        if flag == "clean":
            if not pair["clean"] or pair["gap"] <= MIN_GAP or pair["sizeAdj"] <= MIN_GAP:
                raise SystemExit(f"{key} should be a clean card: {pair['checks']}")
        elif pair["checks"][flag] or pair["clean"]:
            raise SystemExit(f"{key} should fail {flag}: {pair['checks']}")
    if document["counts"]["duplicates"] < 1:
        raise SystemExit(f"Sample dedup did not drop the repeated row: {document['counts']}")
    reasons = document["counts"]["droppedReasons"]
    for reason in ("month", "flat-type", "price", "area", "lease"):
        if reasons.get(reason, 0) < 1:
            raise SystemExit(f"Sample cleaner did not drop {reason}: {reasons}")
    if reasons.get("flat-type", 0) < 3:
        raise SystemExit(f"Sample cleaner did not drop the excluded flat types: {reasons}")
    if any(project.get("image") for project in document["projects"]):
        raise SystemExit("Sample images should fall back to the Real Estate SG box")
    if document["counts"]["shown"] != 4 or document["counts"]["clean"] != 1:
        raise SystemExit(f"Sample counts were unexpected: {document['counts']}")
    blob = json.dumps(document)
    if "http" in blob or "t.me" in blob:
        raise SystemExit("Sample output contains an outbound link")


def self_test() -> None:
    if parse_years_left("61 years 04 months") != 61 or parse_years_left("61 years") != 61:
        raise SystemExit("Remaining lease parser failed")
    if fmt_k(-134000) != "-$134k" or fmt_k(280000) != "$280k":
        raise SystemExit("Money format failed")
    start, end = month_window(SAMPLE_AS_OF)
    if start != "2025-11" or end != "2026-11":
        raise SystemExit(f"Month window was {start} to {end}")
    secret = "https://example.com/secret.jpg"
    older = {
        "month": "2026-09", "town": "TAMPINES", "flat_type": "4 ROOM", "block": "201",
        "street_name": "TAMPINES ST 21", "storey_range": "10 TO 12", "floor_area_sqm": 93,
        "lease_commence_date": 2010, "remaining_lease": "83 years 01 months", "resale_price": 620000,
        "image": secret,
    }
    newer = dict(older, block="801", lease_commence_date=2016, remaining_lease="89 years", resale_price=830000, floor_area_sqm=90)
    rows = []
    for index, price in enumerate((600000, 620000, 630000, 640000)):
        rows.append(dict(older, block=str(200 + index), resale_price=price))
    rows.append(dict(rows[0]))
    for index, price in enumerate((800000, 820000, 840000, 860000)):
        rows.append(dict(newer, block=str(800 + index), resale_price=price))
    rows.append(dict(older, month="2024-01", block="1"))
    rows.append(dict(older, flat_type="2 ROOM", block="2"))
    rows.append(dict(older, resale_price=0, block="3"))
    document = build_document(rows, "import", SAMPLE_AS_OF)
    blob = json.dumps(document)
    if "http" in blob or "secret" in blob or "example.com" in blob:
        raise SystemExit("Published JSON kept an image link")
    if document["counts"]["duplicates"] != 1:
        raise SystemExit(f"Dedup failed: {document['counts']}")
    if len(document["pairs"]) != 1 or not document["pairs"][0]["clean"]:
        raise SystemExit(f"Fixture pair failed: {document['pairs']}")
    if document["pairs"][0]["gap"] != 205000:
        raise SystemExit(f"Fixture gap was {document['pairs'][0]['gap']}")
    if local_image(secret) is not None or local_image("/etc/passwd") is not None:
        raise SystemExit("Image guard accepted a remote or outside path")


def deploy() -> None:
    branch = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=ROOT, check=True, capture_output=True, text=True).stdout.strip()
    if branch != "main":
        raise SystemExit(f"Refusing to deploy from branch {branch}. Push happens from main.")
    message = "Refresh HDB resale transaction gaps\n\nUpdate the Undervalued Pty cards from the latest cleaned HDB resale prices.\n"
    commit = subprocess.run(
        ["git", "commit", "--only", "-m", message, "--", "undervalued-pty/index.html", "undervalued-pty/listings.json"],
        cwd=ROOT, capture_output=True, text=True,
    )
    if commit.returncode != 0:
        detail = (commit.stdout + commit.stderr).strip()
        if "nothing to commit" in detail.lower() or "no changes added" in detail.lower():
            print("No transaction changes to deploy.")
            return
        raise SystemExit(detail or "git commit failed")
    print(commit.stdout.strip())
    push = subprocess.run(["git", "push", "origin", "main"], cwd=ROOT, capture_output=True, text=True)
    if push.returncode != 0:
        raise SystemExit((push.stdout + push.stderr).strip() or "git push failed")
    print(push.stdout.strip() or push.stderr.strip())
    print("Pushed main. Netlify publishes https://www.sellingsgproperty.com")


def print_summary(document: dict) -> None:
    counts = document["counts"]
    print(
        f"source {document['source']} · raw {counts['raw']} · kept {counts['kept']} · "
        f"groups {counts['projects']} · pairs {counts['pairs']} · shown {counts['shown']} · clean {counts['clean']}"
    )
    print(f"dropped {counts['droppedReasons']} · duplicates {counts['duplicates']}")
    for pair in document["pairs"]:
        mark = "clean" if pair["clean"] else "review"
        print(
            f"  {mark} {pair['townLabel']} {pair['flatLabel']} "
            f"{pair['buy']['leaseYear']} vs {pair['compare']['leaseYear']} "
            f"+{fmt_k(pair['gap'])} / {fmt_k(pair['sizeAdj'])}"
        )


def parse_args():
    parser = argparse.ArgumentParser(description="Refresh HDB resale gaps on the Undervalued Pty page.")
    parser.add_argument("--sample", action="store_true", help="Load the labeled worked example and write the page.")
    parser.add_argument("--from", dest="from_file", help="Read an HDB-shaped CSV or a JSON file with a rows array.")
    parser.add_argument("--dry-run", action="store_true", help="Print the result without writing files.")
    parser.add_argument("--deploy", action="store_true", help="Commit the tool page and listings.json, then push main. Refuses sample data.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    self_test()
    as_of = SAMPLE_AS_OF if args.sample else now_sg()
    if args.sample and args.from_file:
        print("Use either --sample or --from, not both.", file=sys.stderr)
        return 1
    if not args.sample and not args.from_file:
        if os.environ.get("URA_ACCESS_KEY"):
            print("URA_ACCESS_KEY is set. Private condo caveats stay on the existing screen. This run updates HDB resale gaps only.")
        else:
            print("URA_ACCESS_KEY is not set. Private condo caveats stay on the existing screen. This run updates HDB resale gaps only.")
    try:
        if args.sample:
            rows, _meta = load_path(SAMPLE_PATH)
            source = "sample"
        elif args.from_file:
            path = Path(args.from_file)
            rows, meta = load_path(path)
            source = "sample" if meta.get("sample") else "import"
        else:
            rows = fetch_hdb(as_of)
            source = "hdb"
    except FetchError as error:
        print(error, file=sys.stderr)
        print("Kept the existing listings file. Nothing was deployed.", file=sys.stderr)
        return 2
    except (OSError, json.JSONDecodeError, csv.Error) as error:
        print(f"Could not read resale rows: {error}", file=sys.stderr)
        return 1
    if source != "sample" and not rows:
        print("No resale rows were read. Kept the existing listings file. Nothing was deployed.", file=sys.stderr)
        return 2
    document = build_document(rows, source, as_of)
    if source == "sample":
        expect_sample(document)
    if source != "sample" and document["counts"]["kept"] == 0:
        print("No resale rows passed the cleaner. Kept the existing listings file. Nothing was deployed.", file=sys.stderr)
        return 2
    print_summary(document)
    if args.dry_run:
        print("Dry run. No files written and nothing deployed.")
        return 0
    write_outputs(document)
    print(f"Wrote {OUT_JSON.relative_to(ROOT)}")
    print(f"Updated the HDB resale section in {PAGE.relative_to(ROOT)}")
    if args.deploy:
        if source == "sample":
            print("Refusing to deploy sample HDB figures. Run without --sample after a live or imported update.", file=sys.stderr)
            return 1
        deploy()
    elif source == "sample":
        print("Sample figures are labeled on the page and were not deployed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
