#!/usr/bin/env python3
"""Refresh news.json from the public Telegram channel preview.

From the site root:

    python3 scripts/refresh-news.py

or:

    npm run refresh-news

Reads https://t.me/s/PropNexPropertyNewsUpdate (no login), keeps the latest
property posts, skips seminars and other promo posts, downloads each photo
into news/images/, and writes news.json. It also rebuilds a static page at
news/<id>/index.html for each story.

Plain-English summaries, three takeaways and three buyer/seller questions
live in news/copy.json, keyed by the Telegram post id. Re-running this script
keeps that copy and rebuilds the list page, detail pages, sitemap entries and
NewsArticle / FAQ schema. A new post with no entry yet still gets a page.

Refresh, then deploy:

    python3 scripts/refresh-news.py
    git add news.json news sitemap.xml scripts/refresh-news.py
    git commit -m "Refresh Singapore property news"
    git push origin main

Netlify publishes https://www.sellingsgproperty.com. To rewrite pages from
existing news.json without calling Telegram:

    python3 scripts/refresh-news.py --pages-only
"""

from __future__ import annotations

import html
import json
import re
import ssl
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

CHANNEL = "PropNexPropertyNewsUpdate"
PREVIEW = f"https://t.me/s/{CHANNEL}"
MAX_ITEMS = 51
PAGE_SIZE = 17
MAX_PAGES = 3
ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "news.json"
COPY_PATH = ROOT / "news" / "copy.json"
NEWS_DIR = ROOT / "news"
IMAGE_DIR = NEWS_DIR / "images"
SITEMAP_PATH = ROOT / "sitemap.xml"
PLACEHOLDER = "/news/images/placeholder.svg"
SITEMAP_START = "<!-- news-details:start -->"
SITEMAP_END = "<!-- news-details:end -->"
SGT = timezone(timedelta(hours=8))

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

# Promo / event posts are dropped even if they mention districts or landed homes.
PROMO_RE = re.compile(
    r"\b(seminar|webinar|zoom\s*ces|zoom|event-details|register now|sign\s*up|"
    r"rsvp|open house|training session)\b",
    re.I,
)

# Keep posts that are actually about property. Labour, wills, and similar
# channel items fall through.
PROPERTY_RE = re.compile(
    r"\b("
    r"hdb|bto|condo|condominium|psf|ppr|plot|bungalow|flat|flats|homes|home|"
    r"housing|rent|rental|launch|residential|landed|masterplan|precinct|"
    r"tenure|absd|enbloc|en-bloc|gcb|ura|mrt|resale|units|planning area|"
    r"private home|build-to-rent|foreclosure|ec\b|executive condo"
    r")\b",
    re.I,
)

PHOTO_RE = re.compile(
    r'class="(tgme_widget_message_photo_wrap[^"]*)"[^>]*style="([^"]*)"',
    re.I,
)


def fetch(url: str, timeout: int = 30) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
            "Accept-Language": "en-SG,en;q=0.9",
        },
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as res:
        return res.read()


def clean_lines(raw_html: str) -> list[str]:
    text = raw_html.replace("<br/>", "\n").replace("<br>", "\n").replace("<br />", "\n")
    text = re.sub(r"</?(b|strong|i|em|a)\b[^>]*>", "", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text).replace("\u2060", "").replace("\xa0", " ")
    lines = []
    for line in text.splitlines():
        line = re.sub(r"\s+", " ", line).strip()
        line = re.sub(r"\s*[❤♥]+\s*\d*\s*$", "", line).strip()
        if not line or re.fullmatch(r"[❤♥\d\s]+", line):
            continue
        lines.append(line)
    return lines


def headline_from(lines: list[str]) -> str:
    if not lines:
        return ""
    first = lines[0]
    letters = [c for c in first if c.isalpha()]
    if (
        len(lines) > 1
        and letters
        and all(c.isupper() for c in letters)
        and len(first) <= 48
    ):
        return lines[1]
    return first


def pick_photo(block: str) -> tuple[str | None, bool]:
    """Return (image url, weak). Weak means a tiny or blurred preview.

    Telegram often posts the headline with a blurred preview, then the sharp
    article image as the next message with no caption.
    """
    options = []
    for cls, style in PHOTO_RE.findall(block):
        url_match = re.search(r"background-image:url\('([^']+)'\)", style)
        if not url_match:
            continue
        width_match = re.search(r"width:\s*(\d+)px", style)
        width = int(width_match.group(1)) if width_match else 0
        blurred = "blured" in cls or "blurred" in cls
        options.append((url_match.group(1), width, blurred))
    if not options:
        return None, True
    clear = [item for item in options if not item[2]]
    pool = clear or options
    pool.sort(key=lambda item: item[1], reverse=True)
    url, width, blurred = pool[0]
    return url, blurred or width < 360


def attach_followup_images(messages: list[dict]) -> None:
    for index, post in enumerate(messages):
        if post["image_url"] and not post["image_weak"]:
            continue
        for nxt in messages[index + 1 : index + 3]:
            if nxt["title"]:
                break
            if nxt["image_url"] and not nxt["image_weak"]:
                post["image_url"] = nxt["image_url"]
                post["image_weak"] = False
                break


def parse_messages(page_html: str) -> list[dict]:
    parts = page_html.split("tgme_widget_message_wrap")
    found = []
    for part in parts[1:]:
        post = re.search(r'data-post="[^"]+/(\d+)"', part)
        when = re.search(r'datetime="([^"]+)"', part)
        if not post or not when:
            continue
        text_match = re.search(
            r'class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>',
            part,
            re.S,
        )
        lines = clean_lines(text_match.group(1)) if text_match else []
        title = headline_from(lines)
        image_url, image_weak = pick_photo(part)
        found.append(
            {
                "id": post.group(1),
                "datetime": when.group(1),
                "title": title,
                "body": "\n".join(lines),
                "image_url": image_url,
                "image_weak": image_weak,
            }
        )
    attach_followup_images(found)
    return found


def keep_post(post: dict) -> bool:
    title = post["title"].strip()
    if len(title) < 8:
        return False
    blob = f"{title}\n{post['body']}"
    if PROMO_RE.search(blob):
        return False
    if not PROPERTY_RE.search(blob):
        return False
    return True


def format_date(iso_value: str) -> str:
    dt = datetime.fromisoformat(iso_value)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(SGT).strftime("%Y/%m/%d")


def extension_for(content_type: str, url: str) -> str:
    ctype = (content_type or "").split(";")[0].strip().lower()
    mapping = {
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif",
    }
    if ctype in mapping:
        return mapping[ctype]
    path = url.split("?", 1)[0].lower()
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        if path.endswith(ext):
            return ".jpg" if ext == ".jpeg" else ext
    return ".jpg"


def download_image(url: str, post_id: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "image/*,*/*"})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=30, context=ctx) as res:
        data = res.read()
        ext = extension_for(res.headers.get("Content-Type", ""), url)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{post_id}{ext}"
    dest = IMAGE_DIR / filename
    dest.write_bytes(data)
    # Shrink tall article screenshots so the repo stays light. Display size is ~190px.
    try:
        import subprocess

        subprocess.run(
            ["sips", "-Z", "960", str(dest)],
            check=False,
            capture_output=True,
        )
    except OSError:
        pass
    return f"/news/images/{filename}"


def collect_posts() -> list[dict]:
    seen: dict[str, dict] = {}
    before = None
    for _ in range(MAX_PAGES):
        url = PREVIEW if not before else f"{PREVIEW}?before={before}"
        page = fetch(url).decode("utf-8", "replace")
        batch = parse_messages(page)
        if not batch:
            break
        oldest = batch[0]["id"]
        for post in batch:
            seen[post["id"]] = post
        if before == oldest:
            break
        before = oldest
        kept = [p for p in seen.values() if keep_post(p)]
        if len(kept) >= MAX_ITEMS and len(batch) < 5:
            break
        if len(kept) >= MAX_ITEMS + 4:
            break
    posts = [p for p in seen.values() if keep_post(p)]
    posts.sort(key=lambda p: p["datetime"], reverse=True)
    # Drop duplicate headlines, keeping the newest.
    unique = []
    titles = set()
    for post in posts:
        key = re.sub(r"\W+", " ", post["title"].lower()).strip()
        if key in titles:
            continue
        titles.add(key)
        unique.append(post)
        if len(unique) >= MAX_ITEMS:
            break
    return unique


def load_copy() -> dict:
    if not COPY_PATH.exists():
        return {}
    data = json.loads(COPY_PATH.read_text(encoding="utf-8"))
    return data if isinstance(data, dict) else {}


def clip_text(text: str, limit: int = 158) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(".,;:")
    return cut + "."


def story_copy(post_id: str, title: str, copy_book: dict) -> dict:
    entry = copy_book.get(post_id) or {}
    summary = [str(part).strip() for part in entry.get("summary", []) if str(part).strip()]
    takeaways = [str(part).strip() for part in entry.get("takeaways", []) if str(part).strip()]
    written = 2 <= len(summary) <= 4 and len(takeaways) == 3
    if not written:
        summary = [
            title,
            "A fuller plain-English brief for this Singapore property story has not been added yet. The headline is listed so buyers and sellers can see what was reported. It is not, by itself, a reason to buy or sell.",
            "When a write-up is added, it will explain what the news means for someone buying or selling a home in Singapore, including HDB, condo, new launch and resale decisions.",
        ]
        takeaways = [
            "Do not change a buying or selling decision on a headline alone. Read the details and check them against your own budget.",
            "If you are buying, compare this news with the actual home, the location, and the monthly cost you can live with.",
            "If you are selling, be ready to answer questions about the area in plain language. Buyers remember what they can verify.",
        ]
    questions = [str(part).strip() for part in entry.get("questions", []) if str(part).strip()]
    if len(questions) != 3:
        questions = [
            "What does this mean for someone buying property in Singapore?",
            "What should a seller take from this market update?",
            "What should you check before you act on this news?",
        ]
    description = str(entry.get("description") or summary[0]).strip()
    keywords = str(
        entry.get("keywords")
        or "Singapore property, HDB, condo, new launch, resale, buyers, sellers, market update"
    ).strip()
    facts = [str(part).strip() for part in entry.get("facts", []) if str(part).strip()]
    return {
        "summary": summary,
        "takeaways": takeaways,
        "questions": questions,
        "facts": facts,
        "description": clip_text(description),
        "keywords": keywords,
        "written": written,
    }


def esc(value: str) -> str:
    return html.escape(value, quote=True)


NAV_HTML = """
  <nav class="site-nav" aria-label="Primary">
    <div class="site-nav-inner">
      <a class="brand" href="/">
        <strong>SellingSgProperty.</strong>
        <span>SG</span>
      </a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/insights">Insights</a>
        <a href="/news/" class="active" aria-current="page">News</a>
        <a href="/contact">Get my free situation check.</a>
        <a href="/mortgage-calculator">Mortgage loan calculator</a>
      </div>
      <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-panel" aria-label="Open navigation menu">☰</button>
    </div>
    <div class="mobile-panel" id="mobile-panel">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/insights">Insights</a>
      <a href="/news/" class="active" aria-current="page">News</a>
      <a href="/contact">Get my free situation check.</a>
      <a href="/mortgage-calculator">Mortgage loan calculator</a>
    </div>
  </nav>
"""

DETAIL_CSS = """
    :root {
      --bg: #0d0d0d;
      --red: #e85d4c;
      --muted: #8d8d8d;
      --line: rgba(255, 255, 255, 0.08);
      --violet: #6d28d9;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
      background: var(--bg);
      color: #fff;
      min-height: 100vh;
    }
    a { color: inherit; }
    .site-nav {
      background: #fff;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 40;
    }
    .site-nav-inner {
      max-width: 1536px;
      margin: 0 auto;
      padding: 0 32px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand { text-decoration: none; color: #0f172a; line-height: 1; }
    .brand strong { display: block; font-size: 1.7rem; font-weight: 900; letter-spacing: -0.04em; }
    .brand span { display: block; margin-top: 2px; color: var(--violet); font-size: 9px; font-weight: 600; letter-spacing: 0.18em; }
    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-links a {
      text-decoration: none;
      color: #334155;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 8px 18px;
      border-bottom: 3px solid transparent;
    }
    .nav-links a:hover { color: #0f172a; }
    .nav-links a.active { color: var(--violet); font-weight: 700; border-bottom-color: var(--violet); border-radius: 0; }
    .menu-btn {
      display: none; width: 44px; height: 44px; border: 0; background: transparent;
      font-size: 1.4rem; cursor: pointer; color: #475569;
    }
    .mobile-panel { display: none; background: #fff; color: #0f172a; border-top: 1px solid #e2e8f0; padding: 8px 24px 20px; }
    .mobile-panel.open { display: block; }
    .mobile-panel a { display: block; text-decoration: none; padding: 12px 4px; font-weight: 500; border-bottom: 1px solid #f1f5f9; }
    .mobile-panel a.active { color: var(--violet); font-weight: 700; }
    .story {
      max-width: 760px;
      margin: 0 auto;
      padding: 28px 28px 72px;
    }
    .back {
      display: inline-block;
      margin: 4px 0 18px;
      color: var(--muted);
      text-decoration: none;
      font-size: 0.92rem;
    }
    .back:hover { color: #fff; }
    .kicker {
      margin: 0 0 10px;
      color: var(--red);
      font-size: 0.78rem;
      font-weight: 600;
    }
    h1 {
      margin: 0;
      font-size: 2rem;
      line-height: 1.25;
      letter-spacing: -0.03em;
      font-weight: 700;
    }
    .story-date {
      display: block;
      margin-top: 12px;
      color: var(--muted);
      font-size: 0.92rem;
      font-variant-numeric: tabular-nums;
    }
    .hero {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      margin: 22px 0 8px;
      background: #1a1a1a;
      display: block;
    }
    .summary h2,
    .facts h2 {
      margin: 28px 0 8px;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .summary p {
      color: #ececec;
      font-size: 1.05rem;
      line-height: 1.75;
      margin: 1.15rem 0;
    }
    .facts ul { margin: 0; padding: 0; list-style: none; }
    .facts li {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid var(--line);
      color: #f2f2f2;
      line-height: 1.5;
      font-size: 1rem;
    }
    .takeaways {
      margin-top: 36px;
      padding-top: 8px;
      border-top: 1px solid var(--line);
    }
    .takeaways h2 {
      margin: 22px 0 8px;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .takeaways li strong {
      display: block;
      margin-bottom: 4px;
      color: #fff;
      font-weight: 700;
    }
    .takeaways ul { margin: 0; padding: 0; list-style: none; }
    .takeaways li {
      position: relative;
      margin: 0;
      padding: 14px 0 14px 18px;
      border-bottom: 1px solid var(--line);
      color: #f2f2f2;
      line-height: 1.6;
      font-size: 1.02rem;
    }
    .takeaways li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--red);
    }
    @media (max-width: 1200px) {
      .nav-links { display: none; }
      .menu-btn { display: inline-flex; align-items: center; justify-content: center; }
      .site-nav-inner { padding: 0 16px; }
    }
    @media (max-width: 640px) {
      .story { padding: 18px 16px 56px; }
      h1 { font-size: 1.45rem; }
      .hero { height: 190px; }
      .summary p, .takeaways li { font-size: 1rem; }
    }
"""

MENU_JS = """
    document.getElementById("menu-btn").addEventListener("click", function () {
      const panel = document.getElementById("mobile-panel");
      const open = panel.classList.toggle("open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
      this.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      this.textContent = open ? "×" : "☰";
    });
"""


def json_ld(data: dict) -> str:
    raw = json.dumps(data, ensure_ascii=False, indent=2)
    raw = raw.replace("<", "\\u003c")
    return f'<script type="application/ld+json">\n{raw}\n  </script>'


def detail_schema(item: dict, copy: dict) -> str:
    title = item["title"]
    date = item["date"].replace("/", "-")
    path = f"/news/{item['id']}/"
    page_url = f"https://www.sellingsgproperty.com{path}"
    image = item.get("image") or PLACEHOLDER
    image_url = "https://www.sellingsgproperty.com" + image
    article_body = "\n\n".join(copy["facts"] + copy["summary"] + copy["takeaways"])
    news = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "description": copy["description"],
        "articleBody": article_body,
        "datePublished": f"{date}T08:00:00+08:00",
        "dateModified": f"{date}T08:00:00+08:00",
        "inLanguage": "en-SG",
        "articleSection": "Real estate",
        "keywords": copy["keywords"],
        "image": [image_url],
        "url": page_url,
        "mainEntityOfPage": {"@type": "WebPage", "@id": page_url},
        "author": {"@id": "https://www.sellingsgproperty.com/#jackleow"},
        "publisher": {"@id": "https://www.sellingsgproperty.com/#organization"},
        "isAccessibleForFree": True,
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".facts li", ".summary p", ".takeaways li"],
        },
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {"@type": "Answer", "text": answer},
            }
            for question, answer in zip(copy["questions"], copy["takeaways"])
        ],
    }
    crumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sellingsgproperty.com/"},
            {"@type": "ListItem", "position": 2, "name": "News", "item": "https://www.sellingsgproperty.com/news/"},
            {"@type": "ListItem", "position": 3, "name": title, "item": page_url},
        ],
    }
    return "\n  ".join(json_ld(block) for block in (news, faq, crumbs))


def render_detail_page(item: dict, copy: dict) -> str:
    title = item["title"]
    date = item["date"]
    image = item.get("image") or PLACEHOLDER
    iso_date = date.replace("/", "-")
    path = f"/news/{item['id']}/"
    page_url = f"https://www.sellingsgproperty.com{path}"
    image_url = "https://www.sellingsgproperty.com" + image
    description = copy["description"]
    paragraphs = "\n".join(f"      <p>{esc(part)}</p>" for part in copy["summary"])
    fact_items = "\n".join(f"        <li>{esc(fact)}</li>" for fact in copy["facts"])
    facts_html = ""
    if fact_items:
        facts_html = (
            '    <section class="facts" aria-labelledby="facts-heading">\n'
            '      <h2 id="facts-heading">Key facts</h2>\n'
            "      <ul>\n"
            f"{fact_items}\n"
            "      </ul>\n"
            "    </section>\n"
        )
    bullets = "\n".join(
        f"        <li><strong>{esc(question)}</strong> {esc(answer)}</li>"
        for question, answer in zip(copy["questions"], copy["takeaways"])
    )
    schema = detail_schema(item, copy)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} | Singapore Property News | SellingSgProperty</title>
  <meta name="description" content="{esc(description)}">
  <link rel="canonical" href="{page_url}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{page_url}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="{esc(image_url)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  {schema}
  <style>{DETAIL_CSS}</style>
</head>
<body>
{NAV_HTML}
  <article class="story">
    <a class="back" href="/news/">← All news</a>
    <p class="kicker">Real estate</p>
    <h1>{esc(title)}</h1>
    <time class="story-date" datetime="{esc(iso_date)}">{esc(date)}</time>
    <img class="hero" src="{esc(image)}" alt="" width="760" height="280" onerror="this.onerror=null;this.src='{PLACEHOLDER}'">
{facts_html}    <div class="summary">
      <h2>What this means</h2>
{paragraphs}
    </div>
    <section class="takeaways" aria-labelledby="takeaways-heading">
      <h2 id="takeaways-heading">3 Takeaways for Buyers &amp; Sellers</h2>
      <ul>
{bullets}
      </ul>
    </section>
  </article>
  <script>{MENU_JS}</script>
</body>
</html>
"""


def update_sitemap(items: list[dict]) -> None:
    if not SITEMAP_PATH.exists():
        return
    text = SITEMAP_PATH.read_text(encoding="utf-8")
    if SITEMAP_START not in text or SITEMAP_END not in text:
        print("sitemap markers missing; left sitemap.xml unchanged")
        return
    blocks = []
    for item in items:
        lastmod = item["date"].replace("/", "-")
        blocks.append(
            "  <url>\n"
            f"    <loc>https://www.sellingsgproperty.com/news/{item['id']}/</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.6</priority>\n"
            "  </url>"
        )
    replacement = SITEMAP_START + "\n" + "\n".join(blocks) + "\n  " + SITEMAP_END
    pattern = re.compile(re.escape(SITEMAP_START) + r".*?" + re.escape(SITEMAP_END), re.S)
    SITEMAP_PATH.write_text(pattern.sub(replacement, text, count=1), encoding="utf-8")


LIST_START = "<!-- news-list:start -->"
LIST_END = "<!-- news-list:end -->"
SCHEMA_START = "<!-- news-schema:start -->"
SCHEMA_END = "<!-- news-schema:end -->"
INDEX_PATH = NEWS_DIR / "index.html"


def replace_marked(text: str, start: str, end: str, inner: str) -> str:
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pattern.search(text):
        raise SystemExit(f"Missing markers {start} ... {end}")
    block = start + "\n" + inner.rstrip() + "\n  " + end

    def _repl(_match: re.Match) -> str:
        return block

    return pattern.sub(_repl, text, count=1)


def render_pager(count: int) -> str:
    pages = max(1, (count + PAGE_SIZE - 1) // PAGE_SIZE)
    parts = ['<span class="pager-btn is-disabled">Previous Page</span>']
    for number in range(1, pages + 1):
        href = "/news/" if number == 1 else f"/news/?page={number}"
        current = ' is-current" aria-current="page' if number == 1 else ""
        parts.append(f'<a class="pager-num{current}" href="{href}">{number}</a>')
    if pages > 1:
        parts.append('<a class="pager-btn" href="/news/?page=2">Next page</a>')
    else:
        parts.append('<span class="pager-btn is-disabled">Next page</span>')
    return '<nav class="pager" id="news-pager" aria-label="News pages">' + "".join(parts) + "</nav>"


def render_list_html(items: list[dict]) -> str:
    rows = []
    for index, item in enumerate(items):
        href = f"/news/{item['id']}/"
        date = item["date"]
        iso_date = date.replace("/", "-")
        image = item.get("image") or PLACEHOLDER
        hidden = " hidden" if index >= PAGE_SIZE else ""
        start = ' class="is-page-start"' if index == 0 else ""
        rows.append(
            f"    <li{start}{hidden}><a class=\"news-row\" href=\"" + esc(href) + "\">"
            + "<img class=\"news-thumb\" src=\"" + esc(image) + "\" alt=\"\" width=\"190\" height=\"118\" loading=\"lazy\" "
            + "onerror=\"this.onerror=null;this.src='" + PLACEHOLDER + "'\">"
            + "<div class=\"news-copy\">"
            + "<span class=\"news-cat\">Real estate</span>"
            + "<h2 class=\"news-title\">" + esc(item["title"]) + "</h2>"
            + "<time class=\"news-date\" datetime=\"" + esc(iso_date) + "\">" + esc(date) + "</time>"
            + "</div></a></li>"
        )
    return (
        "<ul class=\"news-list\" id=\"news-list\">\n"
        + "\n".join(rows)
        + "\n  </ul>\n  "
        + render_pager(len(items))
    )


def render_list_schema(items: list[dict]) -> str:
    elements = []
    for index, item in enumerate(items, start=1):
        elements.append(
            {
                "@type": "ListItem",
                "position": index,
                "url": f"https://www.sellingsgproperty.com/news/{item['id']}/",
                "name": item["title"],
            }
        )
    data = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Singapore Property News for Buyers and Sellers",
        "url": "https://www.sellingsgproperty.com/news/",
        "description": "Latest Singapore property market updates for HDB upgraders, condo buyers and sellers, written in plain English.",
        "isPartOf": {"@id": "https://www.sellingsgproperty.com/#website"},
        "mainEntity": {"@type": "ItemList", "itemListElement": elements},
    }
    return json_ld(data)


def write_news_index(items: list[dict]) -> None:
    if not INDEX_PATH.exists():
        print("news/index.html missing; list page not updated")
        return
    text = INDEX_PATH.read_text(encoding="utf-8")
    text = replace_marked(text, LIST_START, LIST_END, render_list_html(items))
    text = replace_marked(text, SCHEMA_START, SCHEMA_END, render_list_schema(items))
    if "t.me/" in text or "telegram.org" in text.lower():
        raise SystemExit("News list tried to link off-site. Aborting.")
    INDEX_PATH.write_text(text, encoding="utf-8")


def write_detail_pages(items: list[dict]) -> None:
    copy_book = load_copy()
    keep_ids = set()
    missing = []
    for item in items:
        copy = story_copy(item["id"], item["title"], copy_book)
        if not copy["written"]:
            missing.append(item["id"])
        page = render_detail_page(item, copy)
        offsite = [
            url
            for url in re.findall(r"<a\b[^>]*\bhref=[\"'](https?://[^\"']+)", page)
            if "sellingsgproperty.com" not in url
        ]
        if offsite:
            raise SystemExit(f"Detail page {item['id']} contains an off-site link: {offsite[0]}")
        folder = NEWS_DIR / item["id"]
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(page, encoding="utf-8")
        keep_ids.add(item["id"])
        item["path"] = f"/news/{item['id']}/"
        item["description"] = copy["description"]

    for child in NEWS_DIR.iterdir():
        if child.is_dir() and child.name.isdigit() and child.name not in keep_ids:
            for file in child.iterdir():
                if file.is_file():
                    file.unlink()
            child.rmdir()

    update_sitemap(items)
    write_news_index(items)
    print(f"Wrote {len(items)} detail pages under news/<id>/")
    if missing:
        print("No brief in news/copy.json yet for: " + ", ".join(missing))
        print("Add summary, takeaways and questions for those ids, then run: python3 scripts/refresh-news.py --pages-only")
    print("To deploy: commit the news files and push main. Netlify publishes https://www.sellingsgproperty.com")


def pages_only() -> None:
    if not JSON_PATH.exists():
        raise SystemExit("news.json is missing. Run python3 scripts/refresh-news.py first.")
    payload = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    items = payload.get("items") or []
    if not items:
        raise SystemExit("news.json has no items.")
    write_detail_pages(items)
    payload["items"] = items
    JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    posts = collect_posts()
    if not posts:
        raise SystemExit("No property posts found. The channel preview may have changed.")

    items = []
    used_images = {"placeholder.svg"}
    for post in posts:
        image = PLACEHOLDER
        if post["image_url"]:
            try:
                image = download_image(post["image_url"], post["id"])
                used_images.add(Path(image).name)
            except Exception as exc:  # keep the row even if Telegram blocks the file
                print(f"image skip {post['id']}: {exc}")
        items.append(
            {
                "id": post["id"],
                "title": post["title"],
                "date": format_date(post["datetime"]),
                "image": image,
                "source": f"https://t.me/{CHANNEL}/{post['id']}",
                "category": "Real estate",
            }
        )

    if IMAGE_DIR.exists():
        for path in IMAGE_DIR.iterdir():
            if path.name not in used_images and path.suffix.lower() in {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".gif",
            }:
                path.unlink()

    payload = {
        "source": PREVIEW,
        "updated": datetime.now(SGT).isoformat(timespec="seconds"),
        "items": items,
    }
    write_detail_pages(items)
    payload["items"] = items
    JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} items to {JSON_PATH.relative_to(ROOT)}")
    for item in items:
        print(f"  {item['date']}  {item['title']}")


if __name__ == "__main__":
    if "--pages-only" in sys.argv:
        pages_only()
    else:
        main()
