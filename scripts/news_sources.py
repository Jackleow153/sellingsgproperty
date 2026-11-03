#!/usr/bin/env python3
"""Fetch Singapore property headlines from Business Times, Stomp and Google News.

PropNex stays in refresh-news.py. This module only returns headlines, dates,
publisher names and image URLs. It does not keep article bodies or outbound
links, and it does not write the site.
"""

from __future__ import annotations

import hashlib
import re
import ssl
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from xml.etree import ElementTree as ET

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
SGT = timezone(timedelta(hours=8))
FRESH_DAYS = 40
MAX_ITEMS = 51

BT_PAGES = (
    "https://www.businesstimes.com.sg/property",
    "https://www.businesstimes.com.sg/property/residential",
)
GN_QUERY = (
    'Singapore (HDB OR BTO OR condo OR "private home" OR "resale flat" '
    'OR "new launch" OR bungalow OR "executive condo") when:40d'
)
STOMP_QUERY = "site:stomp.sg (HDB OR BTO OR condo OR renovation OR resale) when:21d"

FEED_CAPS = {
    "propnex": 12,
    "business-times": 8,
    "stomp": 6,
    "google-news": 12,
}
FEED_PRIORITY = {
    "propnex": 4,
    "business-times": 3,
    "stomp": 2,
    "google-news": 1,
}

PROPERTY_RE = re.compile(
    r"\b("
    r"hdb|bto|condo|condominium|psf|ppr|plot|bungalow|flat|flats|homes|home|"
    r"housing|rent|rental|launch|residential|landed|masterplan|"
    r"tenure|absd|enbloc|en bloc|gcb|ura|resale|planning area|"
    r"private home|private property|build-to-rent|foreclosure|ec\b|executive condo|"
    r"auction|hip\b"
    r")\b",
    re.I,
)
STRONG_RE = re.compile(
    r"\b("
    r"hdb|bto|condo|condominium|psf|bungalow|gcb|flat|flats|rent|rental|"
    r"launch|resale|en bloc|enbloc|executive condo|\bec\b|build-to-rent|"
    r"auction|\bhip\b"
    r")\b",
    re.I,
)
NON_SG_RE = re.compile(
    r"\b("
    r"australia|australian|japan|japanese|tokyo|india|europe|european|"
    r"london|britain|united states|u\.s\.|hines|sendai|hiroshima|"
    r"vietnam|malaysia|johor|langkawi|hong kong|korea|thailand|indonesia"
    r")\b",
    re.I,
)
SG_SIGNAL_RE = re.compile(
    r"\b("
    r"singapore|hdb|bto|gcb|good class bungalow|ura|absd|"
    r"executive condo|orchard|sembawang|tampines|toa payoh|tiong bahru|"
    r"punggol|sengkang|tengah|dawson|queenstown|canberra|jervois|lentor|"
    r"hougang|bayshore|gillman|thomson|clementi|bedok|yishun|woodlands|"
    r"jurong|pasir ris|bishan|kallang|geylang|sentosa|ccr|rcr|ocr|"
    r"psf|en bloc|enbloc|resale flat|private home|build-to-rent|jumbo"
    r")\b",
    re.I,
)
COMMERCIAL_RE = re.compile(
    r"\b(reit|logistics trust|ipo|asset[- ]light|income support|office sale|mall occupancy)\b",
    re.I,
)
VIRAL_RE = re.compile(
    r"\b("
    r"sexually|sexual|ejaculat|caning|child abuse|blaze|caught fire|scdf|"
    r"haze|laundry|dangle|drug|steal|breaking into|vice syndicate|supercars?|"
    r"livestreamer|holiday homes|died after|parking fines?|use toilet|"
    r"claim to own|did not invite|firefighters?|\bfire\b|halloween|"
    r"trick-or-treat|python|pizzeria|stranger|manufacturing|"
    r"bathroom|shower|filmed|neighbour from hell|loud music|"
    r"\bdies\b|\bdied\b|falling from height|names reveal"
    r")\b",
    re.I,
)
SKIP_RE = re.compile(
    r"\b("
    r"what is a|commentary on|public servants|what'?s moving the market|"
    r"hottest searches|most expensive bungalows|solar push|hanging panels|"
    r"heritage buildings"
    r")\b",
    re.I,
)
CRIME_RE = re.compile(
    r"\b("
    r"jail|jailed|launder|forfeit|scam|snatch|tussle|shell firms|"
    r"convicted|defaulting"
    r")\b",
    re.I,
)
STOMP_LESSON_RE = re.compile(
    r"\b(bto|renovat|reno\b|kitchen)\b",
    re.I,
)

STOP = {
    "a", "an", "the", "of", "in", "on", "to", "for", "and", "or", "but", "with",
    "at", "by", "from", "as", "is", "are", "was", "were", "be", "over", "under",
    "about", "after", "before", "its", "their", "this", "that", "into", "than",
    "more", "most", "new", "up", "out", "it", "can", "could", "may", "might",
    "not", "no", "if", "who", "what", "when", "where", "why", "how", "via",
    "per", "amid", "while", "yet", "than", "has", "have", "had", "been", "will",
    "would", "should", "first", "his", "her", "their",
}
GENERIC = {
    "home", "homes", "house", "houses", "flat", "flats", "price", "prices",
    "priced", "property", "market", "resale", "launch", "unit", "units",
    "sold", "sale", "sales", "buyer", "buyers", "seller", "sellers", "rent",
    "rental", "rents", "hdb", "bto", "condo", "condominium", "private",
    "residential", "singapore", "news", "reported", "says", "said", "report",
    "quarter", "q3", "year", "years", "month", "months", "singaporeans",
    "deal", "deals", "data", "flash", "average", "record", "high", "higher",
}
PLACES = (
    "sembawang", "thomson", "tiong bahru", "maju", "gillman", "orchard",
    "tampines", "toa payoh", "tengah", "dawson", "queenstown", "punggol",
    "sengkang", "bayshore", "lentor", "hougang", "canberra", "jervois",
    "lornie", "telok blangah", "bukit timah", "marine parade", "skyparc",
)
HOUSING_WORDS = {"hdb", "flat", "flats", "condo", "bungalow", "ec", "room"}

PUBLISHERS = {
    "the straits times": ("The Straits Times", "海峡时报"),
    "straits times": ("The Straits Times", "海峡时报"),
    "the business times": ("Business Times", "商业时报"),
    "business times": ("Business Times", "商业时报"),
    "cna": ("CNA", "CNA"),
    "channel newsasia": ("CNA", "CNA"),
    "edgeprop singapore": ("EdgeProp Singapore", "EdgeProp"),
    "edgeprop": ("EdgeProp Singapore", "EdgeProp"),
    "the edge singapore": ("The Edge Singapore", "The Edge Singapore"),
    "stacked homes": ("Stacked Homes", "Stacked Homes"),
    "hdb": ("HDB", "建屋发展局（HDB）"),
    "stomp": ("Stomp", "Stomp"),
    "stomp singapore": ("Stomp", "Stomp"),
    "asiaone.com": ("AsiaOne", "亚洲新闻网"),
    "asiaone": ("AsiaOne", "亚洲新闻网"),
    "yahoo news singapore": ("Yahoo News Singapore", "Yahoo News Singapore"),
    "mothership": ("Mothership", "Mothership"),
    "vulcan post": ("Vulcan Post", "Vulcan Post"),
    "singapore business review": ("Singapore Business Review", "新加坡商业评论"),
    "99.co": ("99.co", "99.co"),
    "mingtiandi": ("Mingtiandi", "Mingtiandi"),
    "era real estate singapore": ("ERA", "ERA"),
    "uchify": ("Uchify", "Uchify"),
    "the independent singapore": ("The Independent Singapore", "The Independent Singapore"),
    "real estate asia": ("Real Estate Asia", "Real Estate Asia"),
    "beansprout": ("Beansprout", "Beansprout"),
}

# Masthead phrases, checked against caption or clipping text. The Telegram
# channel name is not an article publisher.
OUTLET_PHRASES = (
    ("the straits times", PUBLISHERS["the straits times"]),
    ("straits times", PUBLISHERS["straits times"]),
    ("the business times", PUBLISHERS["the business times"]),
    ("business times", PUBLISHERS["business times"]),
    ("channel newsasia", PUBLISHERS["channel newsasia"]),
    ("edgeprop", PUBLISHERS["edgeprop"]),
    ("the edge singapore", PUBLISHERS["the edge singapore"]),
    ("stacked homes", PUBLISHERS["stacked homes"]),
    ("asiaone", PUBLISHERS["asiaone"]),
    ("yahoo news singapore", PUBLISHERS["yahoo news singapore"]),
    ("mothership", PUBLISHERS["mothership"]),
    ("vulcan post", PUBLISHERS["vulcan post"]),
    ("singapore business review", PUBLISHERS["singapore business review"]),
    ("mingtiandi", PUBLISHERS["mingtiandi"]),
    ("real estate asia", PUBLISHERS["real estate asia"]),
    ("stomp", PUBLISHERS["stomp"]),
    ("cna", PUBLISHERS["cna"]),
)

RELAY_LABELS = {"propnex property news", "博纳房产新闻"}


def fetch(url: str, timeout: int = 35) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/rss+xml,application/xml,application/xhtml+xml,*/*;q=0.8",
            "Accept-Language": "en-SG,en;q=0.9",
        },
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as res:
        return res.read().decode("utf-8", "replace")


def is_relay_label(name: str) -> bool:
    """True for the Telegram channel name, which is not the article publisher."""
    key = re.sub(r"\s+", " ", (name or "").strip().lower())
    return key in RELAY_LABELS


def outlet_from_text(text: str) -> tuple[str, str] | None:
    """Return the publisher named in a caption or masthead, if one is there.

    The earliest phrase wins, so a masthead beats a later mention of another
    paper. The channel name PropNex Property News is ignored.
    """
    folded = " " + re.sub(r"[^a-z0-9]+", " ", (text or "").lower()).strip() + " "
    best = None
    best_at = None
    for phrase, labels in OUTLET_PHRASES:
        needle = f" {phrase} "
        start = 0
        while True:
            at = folded.find(needle, start)
            if at == -1:
                break
            if best_at is None or at < best_at:
                best = labels
                best_at = at
            break
    return best


def propnex_own_piece(text: str) -> bool:
    """True when the clipping is PropNex's own seminar, not a newspaper page."""
    folded = re.sub(r"[^a-z0-9]+", " ", (text or "").lower())
    return "consumer seminar" in folded or "propnex consumer" in folded


def publisher_labels(name: str) -> tuple[str, str]:
    key = re.sub(r"\s+", " ", (name or "").strip().lower())
    key = re.sub(r"\s*[-–—|].*$", "", key).strip()
    if key in PUBLISHERS:
        return PUBLISHERS[key]
    for known, labels in PUBLISHERS.items():
        if known and (key == known or key.endswith(known) or known.endswith(key)):
            return labels
    clean = re.sub(r"\s+", " ", (name or "").strip()) or "Property news"
    return clean, clean


def strip_publisher(title: str, publisher: str = "") -> str:
    text = unescape(title or "").replace("\xa0", " ").strip()
    candidates = []
    if publisher:
        candidates.append(publisher.strip())
        labels = publisher_labels(publisher)
        candidates.extend(labels)
    for suffix in candidates:
        if suffix and text.lower().endswith(suffix.lower()):
            cut = text[: -len(suffix)].rstrip(" -–—|")
            if len(cut) >= 12:
                text = cut
                break
    text = re.sub(r"\s+[-–—|]\s+[^-–—|]{2,48}$", "", text).strip()
    text = re.sub(r",?\s+singapore news$", "", text, flags=re.I).strip(" ,")
    text = re.sub(r",?\s+lifestyle news$", "", text, flags=re.I).strip(" ,")
    return re.sub(r"\s+", " ", text)


def normalize_title(title: str) -> str:
    text = strip_publisher(title).lower()
    text = (
        text.replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("s'pore", "singapore")
    )
    text = re.sub(r"\b(?:3q|q3)\s*20?26\b", "q3", text)
    text = re.sub(r"\b3q2026\b", "q3", text)
    text = re.sub(r"\bthird quarter\b", "q3", text)
    text = text.replace(",", "")
    text = re.sub(r"(\d)\.(\d)", r"\1p\2", text)
    text = re.sub(r"(\d)(million|mil|psf|ppr)\b", r"\1 \2", text)
    text = re.sub(r"(\d+p\d+)m\b", r"\1", text)
    text = re.sub(r"[^a-z0-9p]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def story_id(title: str) -> str:
    digest = hashlib.sha1(normalize_title(title).encode("utf-8")).hexdigest()[:8]
    return "n" + digest


TOKEN_FOLDS = {
    "november": "nov",
    "waiting": "wait",
    "plans": "plan",
    "planned": "plan",
    "planning": "plan",
    "flats": "flat",
    "homes": "home",
    "units": "unit",
    "years": "year",
    "prices": "price",
    "price": "price",
    "renovations": "renovation",
    "homeowners": "homeowner",
    "dipped": "dip",
    "dips": "dip",
    "falling": "fall",
    "fallen": "fall",
    "falls": "fall",
}


def content_tokens(title: str) -> list[str]:
    tokens = []
    for token in normalize_title(title).split():
        token = TOKEN_FOLDS.get(token, token)
        if token in STOP or len(token) <= 1:
            continue
        tokens.append(token)
    return tokens


def jaccard(left: set[str], right: set[str]) -> float:
    if not left or not right:
        return 0.0
    return len(left & right) / len(left | right)


def distinctive_numbers(tokens: list[str]) -> set[str]:
    found = set()
    for token in tokens:
        match = re.fullmatch(r"(\d+)p(\d+)", token)
        if match and (len(match.group(1)) >= 3 or len(match.group(2)) >= 3):
            found.add(token)
            continue
        if re.fullmatch(r"\d{4,}", token):
            value = int(token)
            if 1990 <= value <= 2035:
                continue
            found.add(token)
    return found


def places_in(title: str) -> set[str]:
    norm = normalize_title(title)
    return {place for place in PLACES if place in norm}


def private_quarter(title: str) -> bool:
    """Same private-home price release, not every private-home story from that quarter."""
    norm = normalize_title(title)
    has_private = "private home" in norm or "private homes" in norm
    has_price = re.search(r"\bprices?\b", norm) is not None
    return has_private and has_price and re.search(r"\bq3\b", norm) is not None


def titles_match(left: str, right: str) -> bool:
    a = normalize_title(left)
    b = normalize_title(right)
    if not a or not b:
        return False
    if a == b:
        return True
    short, long = (a, b) if len(a) <= len(b) else (b, a)
    if len(short) >= 28 and short in long:
        return True
    tokens_a = content_tokens(left)
    tokens_b = content_tokens(right)
    set_a, set_b = set(tokens_a), set(tokens_b)
    score = jaccard(set_a, set_b)
    if score >= 0.5:
        return True
    rare_a = {token for token in set_a if len(token) >= 5 and token not in GENERIC and not token.isdigit()}
    rare_b = {token for token in set_b if len(token) >= 5 and token not in GENERIC and not token.isdigit()}
    if len(rare_a & rare_b) >= 2 and jaccard(rare_a, rare_b) >= 0.28:
        return True
    shared_places = places_in(left) & places_in(right)
    if len(shared_places) >= 2:
        return True
    if len(shared_places) == 1 and score >= 0.18:
        return True
    if private_quarter(left) and private_quarter(right):
        return True
    shared_prices = distinctive_numbers(tokens_a) & distinctive_numbers(tokens_b)
    shared_housing = HOUSING_WORDS & set_a & set_b
    if shared_prices and (shared_places or shared_housing):
        return True
    if "15" in set_a and "15" in set_b and {"hdb", "resale", "wait"} <= (set_a & set_b):
        return True
    if "0p1" in set_a and "0p1" in set_b and {"hdb", "resale"} <= (set_a & set_b):
        return True
    if (
        "september" in set_a
        and "september" in set_b
        and "sales" in set_a
        and "sales" in set_b
        and ({"condo", "private"} & set_a)
        and ({"condo", "private"} & set_b)
    ):
        return True
    if {"sole", "bid", "marina"} <= (set_a & set_b):
        return True
    return False


def parse_dt(value: str) -> datetime:
    text = (value or "").strip()
    if not text:
        raise ValueError("missing datetime")
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    text = re.sub(r"\.(\d+)", "", text)
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        parsed = parsedate_to_datetime(value)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def format_date(value: str) -> str:
    return parse_dt(value).astimezone(SGT).strftime("%Y/%m/%d")


def iso_dt(value: datetime) -> str:
    return value.astimezone(timezone.utc).isoformat(timespec="seconds")


def singapore_property(title: str, *, residential_page: bool = False) -> bool:
    if VIRAL_RE.search(title) or COMMERCIAL_RE.search(title) or SKIP_RE.search(title) or CRIME_RE.search(title):
        return False
    if re.search(r"\bbuilding\b", title, re.I) and not re.search(
        r"\b(hdb|bto|condo|flat|flats|home|homes)\b", title, re.I
    ):
        return False
    if NON_SG_RE.search(title) and not re.search(r"\b(hdb|bto|gcb)\b", title, re.I):
        return False
    if not STRONG_RE.search(title):
        return False
    if SG_SIGNAL_RE.search(title):
        return True
    if residential_page and not NON_SG_RE.search(title):
        return True
    return "singapore" in title.lower()


def richness(title: str) -> int:
    score = len(re.findall(r"\d", title))
    if re.search(r"\b(may|could|what is|commentary)\b", title, re.I):
        score -= 2
    return score


def make_post(
    title: str,
    when: datetime,
    feed: str,
    source_name: str,
    source_name_zh: str,
    image_url: str | None = None,
    referer: str | None = None,
    post_id: str | None = None,
) -> dict:
    title = re.sub(r"\s+", " ", title).strip()
    return {
        "id": post_id or story_id(title),
        "title": title,
        "datetime": iso_dt(when),
        "date": when.astimezone(SGT).strftime("%Y/%m/%d"),
        "image": "",
        "image_url": image_url or "",
        "image_referer": referer or "",
        "sourceName": source_name,
        "sourceNameZh": source_name_zh,
        "sourceFeed": feed,
        "category": "Real estate",
        "saved": False,
    }


def image_from_html(fragment: str) -> str:
    match = re.search(r'<img[^>]+src="([^"]+)"', fragment or "", re.I)
    if not match:
        return ""
    url = unescape(match.group(1)).strip()
    if url.startswith("//"):
        url = "https:" + url
    if not url.startswith("http"):
        return ""
    if any(host in url for host in ("news.google.com", "gstatic.com", "googleusercontent.com")):
        return ""
    return url


def collect_business_times() -> list[dict]:
    found: list[dict] = []
    seen = set()
    for page_url in BT_PAGES:
        text = fetch(page_url)
        residential = page_url.rstrip("/").endswith("/residential")
        positions = [match.start() for match in re.finditer(r'data-testid="card-title-component"', text)]
        for index, pos in enumerate(positions):
            end = positions[index + 1] if index + 1 < len(positions) else pos + 2500
            chunk = text[pos:end]
            title_match = re.search(r'title="([^"]+)"', chunk)
            if not title_match:
                continue
            title = unescape(title_match.group(1)).replace("\xa0", " ")
            title = re.sub(r"\s+", " ", title).strip()
            if not singapore_property(title, residential_page=residential):
                continue
            key = normalize_title(title)
            if not key or key in seen:
                continue
            time_match = re.search(r'data-testid="created-time-component"[^>]*>([^<]+)', chunk)
            if not time_match:
                continue
            when = parse_dt(time_match.group(1).strip())
            before = text[max(0, pos - 2200) : pos]
            image_url = image_from_html(before) or image_from_html(chunk)
            seen.add(key)
            found.append(
                make_post(
                    title,
                    when,
                    "business-times",
                    "Business Times",
                    "商业时报",
                    image_url=image_url,
                    referer="https://www.businesstimes.com.sg/",
                )
            )
    found.sort(key=lambda post: post["datetime"], reverse=True)
    return found


def google_feed(query: str) -> list[tuple[str, datetime, str, str]]:
    url = (
        "https://news.google.com/rss/search?q="
        + urllib.parse.quote(query)
        + "&hl=en-SG&gl=SG&ceid=SG:en"
    )
    root = ET.fromstring(fetch(url))
    rows = []
    for item in root.findall(".//item"):
        raw_title = item.findtext("title") or ""
        source = item.find("source")
        publisher = source.text.strip() if source is not None and source.text else ""
        title = strip_publisher(raw_title, publisher)
        pub_date = item.findtext("pubDate") or ""
        if not title or not pub_date:
            continue
        when = parse_dt(pub_date)
        description = item.findtext("description") or ""
        rows.append((title, when, publisher, description))
    return rows


def collect_google_news() -> list[dict]:
    posts = []
    seen = set()
    for title, when, publisher, description in google_feed(GN_QUERY):
        if not singapore_property(title):
            continue
        if not STRONG_RE.search(title) and not SG_SIGNAL_RE.search(title):
            continue
        key = normalize_title(title)
        if not key or key in seen:
            continue
        seen.add(key)
        source_name, source_zh = publisher_labels(publisher)
        posts.append(
            make_post(
                title,
                when,
                "google-news",
                source_name,
                source_zh,
                image_url=image_from_html(description),
            )
        )
    posts.sort(key=lambda post: (post["datetime"], richness(post["title"])), reverse=True)
    return posts


def collect_stomp() -> list[dict]:
    posts = []
    seen = set()
    for title, when, publisher, description in google_feed(STOMP_QUERY):
        if "stomp" not in publisher.lower():
            continue
        if VIRAL_RE.search(title) or not STOMP_LESSON_RE.search(title):
            continue
        if not PROPERTY_RE.search(title):
            continue
        key = normalize_title(title)
        if not key or key in seen:
            continue
        seen.add(key)
        posts.append(
            make_post(
                title,
                when,
                "stomp",
                "Stomp",
                "Stomp",
                image_url=image_from_html(description),
            )
        )
    posts.sort(key=lambda post: post["datetime"], reverse=True)
    return posts


def fresh_enough(post: dict, now: datetime | None = None) -> bool:
    cutoff = (now or datetime.now(SGT)) - timedelta(days=FRESH_DAYS)
    try:
        return parse_dt(post["datetime"]) >= cutoff
    except ValueError:
        return False


def merge_posts(saved: list[dict], fresh: list[dict], now: datetime | None = None) -> list[dict]:
    """Keep saved stories, then add fresh ones that are not the same story.

    Higher-priority feeds should appear earlier in ``fresh``. A Google News
    copy of a Business Times or PropNex story is dropped. Saved titles and
    ids stay in place.
    """
    kept = [dict(item) for item in saved]
    added = {feed: 0 for feed in FEED_CAPS}

    def find(post: dict) -> dict | None:
        for item in kept:
            if item.get("id") and item["id"] == post.get("id"):
                return item
            if titles_match(item.get("title", ""), post.get("title", "")):
                return item
        return None

    ordered = sorted(
        fresh,
        key=lambda post: (
            FEED_PRIORITY.get(post.get("sourceFeed", ""), 0),
            post.get("datetime", ""),
            richness(post.get("title", "")),
        ),
        reverse=True,
    )
    for post in ordered:
        match = find(post)
        if match:
            if post.get("image_url") and not match.get("image_url"):
                image = match.get("image") or ""
                if not image or image.endswith("placeholder.svg"):
                    match["image_url"] = post["image_url"]
                    match["image_referer"] = post.get("image_referer") or ""
            current = FEED_PRIORITY.get(match.get("sourceFeed", ""), 0)
            incoming = FEED_PRIORITY.get(post.get("sourceFeed", ""), 0)
            incoming_name = post.get("sourceName") or ""
            if (
                incoming_name
                and not is_relay_label(incoming_name)
                and (
                    is_relay_label(match.get("sourceName") or "")
                    or (match.get("sourceFeed") == "google-news" and incoming > current)
                )
            ):
                match["sourceName"] = incoming_name
                match["sourceNameZh"] = post.get("sourceNameZh") or incoming_name
                if match.get("sourceFeed") == "google-news" and incoming > current:
                    match["sourceFeed"] = post["sourceFeed"]
            if match.get("id") == post.get("id") and post.get("sourceFeed") == "propnex":
                match["title"] = post["title"]
                match["datetime"] = post["datetime"]
                match["date"] = post["date"]
                if post.get("image_url"):
                    match["image_url"] = post["image_url"]
            print(f"deduped [{post.get('sourceFeed')}] {post['title'][:90]}")
            continue
        if not fresh_enough(post, now):
            continue
        feed = post.get("sourceFeed") or "google-news"
        if added.get(feed, 0) >= FEED_CAPS.get(feed, 12):
            continue
        kept.append(dict(post))
        added[feed] = added.get(feed, 0) + 1
        print(f"add [{feed}] {post['date']} {post['title'][:90]}")

    def when_key(post: dict) -> float:
        try:
            return parse_dt(post.get("datetime") or "").timestamp()
        except ValueError:
            return 0.0

    kept.sort(key=when_key, reverse=True)
    return kept[:MAX_ITEMS]


def extract_figures(title: str) -> list[str]:
    pattern = re.compile(
        r"(?:S\$|\$)\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:million|mil|m|psf(?:\s?ppr)?))?|"
        r"\d+(?:\.\d+)?\s?%|"
        r"\b\d[\d,]*\s?(?:flats|units|homes|bids)\b|"
        r"\bQ3\b|\b3Q\s?2026\b",
        re.I,
    )
    figures = []
    for match in pattern.finditer(title):
        figure = re.sub(r"\s+", " ", match.group(0)).strip()
        if figure.lower() in {"q3", "3q 2026", "3q2026"}:
            continue
        if figure not in figures:
            figures.append(figure)
    return figures[:4]


def draft_copy(title: str, source_name: str) -> dict:
    """Original buyer/seller brief from the headline only.

    Figure tokens are copied out of the headline. The publisher's article
    text is not reused. A hand-written news/copy.json entry replaces this.
    """
    figures = extract_figures(title)
    source = source_name or "a property report"
    figure_text = ""
    if figures:
        figure_text = " The headline gives these figures: " + ", ".join(figures) + "."
    low = title.lower()
    if "hdb" in low or "bto" in low or "flat" in low:
        buyer = "HDB buyers should compare the headline with the actual flat, the remaining lease, the town and the monthly mortgage."
        seller = "HDB sellers should not copy one headline price onto their own block. Buyers will ask about floor, lease and condition."
        topic = "HDB"
    elif "rent" in low or "build-to-rent" in low:
        buyer = "Renters who want to buy later should set the rent next to what they can still save each month for an HDB flat or a condo."
        seller = "Landlords should price against what tenants can pay, not against a headline about a new rental idea."
        topic = "rent"
    elif "bungalow" in low or "gcb" in low or "landed" in low:
        buyer = "Landed buyers should treat one address as one house. The land size, the road and the price have to be checked on that property."
        seller = "Landed sellers should not move their asking price just because another bungalow was in the news."
        topic = "landed"
    elif "condo" in low or "launch" in low or "psf" in low or "private home" in low:
        buyer = "Condo and new-launch buyers should compare the price per square foot with the unit size, the tenure and the monthly loan."
        seller = "Resale sellers nearby should see whether buyers are comparing them with a new launch, then price the home they actually have."
        topic = "condo"
    else:
        buyer = "Buyers should check this headline against the home, the location and the monthly cost they can live with."
        seller = "Sellers should answer questions about their own unit. One market headline is not a valuation."
        topic = "property"

    summary = [
        f"{source} carried this Singapore property headline: {title}.{figure_text} The notes below are for buyers and sellers. They are not a copy of the original article.",
        buyer + " Ask what the number refers to: a land bid, a transacted resale price, an asking price, or a whole-market move.",
        seller + " If you are timing a sale or an HDB upgrade, use the figure as a question to research, then confirm it on the official data or the listing itself.",
    ]
    questions = [
        "What should a buyer check before acting on this headline?",
        "What should a seller avoid assuming?",
        "Which figure, if any, is safe to repeat?",
    ]
    takeaways = [
        buyer + " Walk away from any purchase that only makes sense because of a headline.",
        seller + " Show the lease, the size and recent nearby sales rather than a screenshot of the news.",
        (
            "Only repeat figures that are in the headline"
            + (": " + ", ".join(figures) + "." if figures else ".")
            + " Do not fill gaps with a guess about grants, timing or a project that was not named."
        ),
    ]
    facts = [f"Source named on this page: {source}", f"Headline: {title}"]
    facts.extend(f"Figure in the headline: {figure}" for figure in figures)
    zh_title = title
    zh_summary = [
        f"{source}报道了这则新加坡房地产标题：{title}。下面的说明是写给买家和卖家的，不是原文照搬。",
        "买房的人要把标题里的数字，拿来和实际的房子、地段、剩余屋契和每月供款比较。先问清楚数字指的是地价、成交价、开价，还是整个市场的变动。",
        "卖房的人不要把一条标题直接套到自己的单位上。准备出售或从组屋升级时，把数字当成要去核实的问题，再对照官方数据或真实挂牌。",
    ]
    zh_questions = [
        "买家在根据这则标题行动之前该核对什么？",
        "卖家不该擅自假设什么？",
        "哪些数字可以复述？",
    ]
    zh_takeaways = [
        "买家要核对房子、地点和每月能负担的开销。只因为一条标题而划算的交易，就不该成交。",
        "卖家要用屋契、面积和附近的成交来回答问题，而不是只拿出新闻截图。",
        "只复述标题里出现的数字。标题没有写的补助、时间表或项目名称，不要自己补。",
    ]
    zh_facts = [f"本页来源：{source}", f"标题：{title}"]
    zh_facts.extend(f"标题中的数字：{figure}" for figure in figures)
    description = summary[0]
    if len(description) > 158:
        description = description[:158].rsplit(" ", 1)[0].rstrip(".,;:") + "."
    return {
        "summary": summary,
        "facts": facts,
        "takeaways": takeaways,
        "questions": questions,
        "description": description,
        "keywords": f"Singapore property, {topic}, HDB, condo, new launch, resale, buyers, sellers, market update",
        "zh": {
            "title": zh_title,
            "summary": zh_summary,
            "facts": zh_facts,
            "takeaways": zh_takeaways,
            "questions": zh_questions,
        },
    }


def self_check() -> None:
    pairs = [
        (
            True,
            "Thomson Reserve sells 90% of units at average of S$2,900 psf over launch weekend",
            "Thomson Reserve sells 90% of units at average of S$2,900 psf over launch weekend",
        ),
        (
            True,
            "Thomson Reserve sells 90% of units at average of S$2,900 psf over launch weekend",
            "Thomson Reserve launch sales hit over 90% or 1,143 units at average of $2,900 psf",
        ),
        (
            False,
            "Why Singapore is exploring build-to-rent",
            "Build-to-rent homes could appeal to young S’poreans, but can rent be kept under $2,000?",
        ),
        (
            True,
            "Why Singapore is exploring build-to-rent",
            "Bridge to home ownership: Why Singapore is exploring build-to-rent",
        ),
        (
            True,
            "1,310 flats in Sembawang with under 3 years’ wait to go on sale in Nov",
            "Over 1,300 BTO flats with shorter waiting time of under 3 years to be offered in Sembawang in November",
        ),
        (
            True,
            "About 11,000 homes planned on Maju Forest, Gillman Barracks sites with more greenery to be retained",
            "HDB: Revised plans cut 1,200 homes to preserve more greenery at Maju Forest and Gillman Barracks",
        ),
        (
            True,
            "Hong Leong, TID place top bid of S$181.86m or S$1,755 psf ppr for Orchard plot",
            "Hong Leong Holdings-TID joint venture submits top bid of $1,755 psf ppr for Orchard Boulevard GLS site",
        ),
        (
            True,
            "Whopping $1.818 mil transacted price for a Dawson five-room flat — all-time high",
            "Queenstown 5-room HDB flat with 94 years left on lease sold for record S$1.818 million",
        ),
        (
            True,
            "HDB resale prices dip 0.1% in third quarter; private home prices rise 1.4%",
            "HDB resale prices dipped 0.1% in Q3; more flats sold after 15-month wait-out period lifted",
        ),
        (
            True,
            "Private home prices accelerate with 1.4% rise while HDB resale values dip further in Q3: flash data",
            "Singapore private home prices rise 1.4% q-o-q in 3Q2026 as landed and OCR homes lead gains",
        ),
        (
            False,
            "Private home prices up 1.4% while rents gain 1.3% in 3Q2026",
            "HDB resale deal volume jumps 17.7% q-o-q in 3Q2026",
        ),
        (
            True,
            "New mall, parks and plans for a school under Toa Payoh West masterplan",
            "Toa Payoh to get first shopping mall near Caldecott MRT station; over 6,000 new homes planned",
        ),
        (
            False,
            "1,310 flats in Sembawang with under 3 years’ wait to go on sale in Nov",
            "Bukit Sembawang Plans Central Singapore Condo Project After $153M Site Buy",
        ),
        (
            True,
            "1,310 flats in Sembawang with under 3 years’ wait to go on sale in Nov",
            "More than 1,300 BTO flats with shorter waiting times to be offered in Sembawang, Singapore News",
        ),
        (
            True,
            "Whopping $1.818 mil transacted price for a Dawson five-room flat — all-time high in Singapore per HDB data",
            "5-Room HDB Flat Sells For Record $1.818M",
        ),
        (
            True,
            "Homeowner stunned after stranger caught taking photos inside HDB flat twice in a week amid renovations",
            "Stranger enters BTO flat undergoing renovation twice in a week, surprising homeowners, Singapore News",
        ),
        (
            False,
            "One in five prime-region private home resale deals sold at a loss in Q3",
            "Private home prices up 1.4% while rents gain 1.3% in 3Q2026, speeding up slightly",
        ),
        (
            True,
            "HDB Q3 resale prices dip 0.1% even as more flats sold",
            "HDB resale prices dipped 0.1% in Q3; more flats sold after 15-month wait-out period lifted",
        ),
        (
            False,
            "HDB Q3 resale prices dip 0.1% even as more flats sold",
            "Singapore private home prices rise 1.4% q-o-q in 3Q2026 as landed and OCR homes lead gains",
        ),
        (
            True,
            "HDB Q3 resale prices dip 0.1% even as more flats sold",
            "HDB resale prices dip 0.1% in third quarter; private home prices rise 1.4%",
        ),
        (
            False,
            "Hao Mart founder halts foreclosure of his Jervois Hill bungalow by OG",
            "Another duplex penthouse at Mon Jervois heads to auction, this time at $4.38 mil",
        ),
        (
            True,
            "New private home sales nearly double in September to 296 units",
            "Singapore New Condo Sales Jumped 93.5% In September",
        ),
        (
            True,
            "EL Development puts in sole bid for Marina Gardens Lane site at S$450m or S$1,243 psf ppr",
            "Sole $351M Bid for Luxury Condo Site in Singapore’s Marina Bay Lands Below Expectations",
        ),
    ]
    failed = []
    for expected, left, right in pairs:
        got = titles_match(left, right)
        if got != expected:
            failed.append(f"expected {expected} for {left[:48]} <> {right[:48]}")
    same = story_id("One in five prime-region private home resale deals sold at a loss in Q3")
    again = story_id("One in five prime-region private home resale deals sold at a loss in Q3 - The Business Times")
    if same != again:
        failed.append("story id changed when a publisher suffix was added")
    if same.isdigit() or not same.startswith("n"):
        failed.append("story id should be a prefixed hash")
    rejected = [
        "Why Singapore Property Investors Are Turning Their Attention To This Japanese City",
        "Firefighters put out Yishun flat fire, winning bystander boy's heart",
        "Back by sustained global AI demand, manufacturing firms in Singapore optimistic about next six months: EDB survey",
        "Tengah resident decorates HDB corridor with Halloween decor for neighbourhood trick-or-treat event",
        "ACRES captures 2-metre python seen slithering in Choa Chu Kang HDB estate",
        "Man, 20, filmed woman, 19, through HDB bathroom window during shower, also targeted her mother",
        "Pregnant HDB resident says neighbour from hell reported her to police after she played loud music",
        "Buying A Langkawi Condo: Why One Singaporean Chose Clarissa",
        "Woman, 26, dies after falling from height at Yishun HDB block",
        "What can HDB names reveal about Singapore?",
    ]
    for title in rejected:
        if singapore_property(title):
            failed.append("should reject: " + title[:60])
    if not singapore_property("Canberra Drive EC site draws crowd of 13 bids; top offer of S$825 psf ppr from Santarli-led JV sets record"):
        failed.append("should keep Canberra Drive EC")
    if not singapore_property("One in five prime-region private home resale deals sold at a loss in Q3"):
        failed.append("should keep prime-region loss story")
    if outlet_from_text("THE STRAITS TIMES\nBuild-to-rent homes") != (
        "The Straits Times",
        "海峡时报",
    ):
        failed.append("masthead should be The Straits Times")
    if outlet_from_text("THE BUSINESS TIMES") != ("Business Times", "商业时报"):
        failed.append("masthead should be Business Times")
    if outlet_from_text("THE STRAITS TIMES\nAnalysts told the Business Times") != (
        "The Straits Times",
        "海峡时报",
    ):
        failed.append("earliest masthead should win")
    if outlet_from_text("PropNex Property News") is not None:
        failed.append("channel name is not an article publisher")
    if not is_relay_label("PropNex Property News") or not is_relay_label("博纳房产新闻"):
        failed.append("relay label should match the channel name")
    if is_relay_label("The Straits Times") or is_relay_label("PropNex"):
        failed.append("a real publisher is not the channel name")
    if not propnex_own_piece("PropNex Consumer Seminar"):
        failed.append("seminar poster should stay PropNex's own piece")
    if propnex_own_piece("THE BUSINESS TIMES"):
        failed.append("a newspaper masthead is not a seminar")
    if failed:
        raise SystemExit("news source self-check failed:\n" + "\n".join(failed))


if __name__ == "__main__":
    self_check()
    print("self-check ok")
