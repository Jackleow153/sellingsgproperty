#!/usr/bin/env python3
"""Refresh the on-site Singapore property news from four public sources.

From the site root:

    python3 scripts/refresh-news.py

or:

    npm run refresh-news

Sources, in priority order when the same story appears more than once:

    1. PropNex public preview https://t.me/s/PropNexPropertyNewsUpdate
    2. Business Times property and residential listing pages
    3. Stomp, dated from Google News site search
    4. Google News search for Singapore property headlines

The run keeps property stories, drops seminars, foreign property, commercial
REIT notes and viral clips, and collapses the same story to one page by
title and distinctive figures. Existing news/copy.json briefs are kept.
A headline with no brief yet gets an original buyer/seller draft. Detail
pages name the publisher printed on the article and do not link out.
A clipping collected from the PropNex channel is credited to the masthead
on that clipping, such as The Straits Times or Business Times, not to
"PropNex Property News". news.json stores that publisher name, not the
article URL.

Preview what would be published, without writing files:

    python3 scripts/refresh-news.py --dry-run

Rewrite pages from the saved list without fetching:

    python3 scripts/refresh-news.py --pages-only

Publish the refreshed pages to the live site:

    python3 scripts/refresh-news.py --deploy

--deploy commits news.json, news/, and sitemap.xml, then pushes main.
Netlify publishes https://www.sellingsgproperty.com. A run with no new
story leaves those files uncommitted.

GitHub Actions runs that command twice a day, at 09:17 and 17:47
Singapore time (.github/workflows/refresh-news.yml). 09:17 Asia/Singapore
is 01:17 UTC. The 17:47 run is only a backup. An unchanged news list
does not commit.

When a new story's article page can be opened, the job calls grok-4.7
once for that article and stores original key points. The article URL
is not written to the site. A page that cannot be opened stays a
headline draft. Stories that already have key points are not sent.
The call needs XAI_API_KEY. A missing key still publishes the headline.
A filled story's Chinese headline comes from that same call. A new
clipping's publisher is read on the Mac runner only when the caption
does not already name one. A run that finds no new story, and no
headline-only article it can open, skips image downloads, masthead
reading, and the page rebuild, and does not commit. This script does
not install cron or launchd. A plain run without --deploy still writes
the local files and does not push. --dry-run and --pages-only do not
call the model.

Plain-English summaries and one buyer or seller question live in
news/copy.json, keyed by story id. The page shows the article's key
points, then that one question, and does not show an answer. The same
entry can include a "zh" object (title, summary, facts, questions) in
Simplified Chinese. The EN / 中文 choice is stored in the browser under
localStorage key ssp-news-lang.
"""

from __future__ import annotations

import html
import json
import os
import re
import shutil
import ssl
import subprocess
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

from article_points import caption_article_url, fill_article_points, stories_awaiting_points
from news_sources import (
    collect_business_times,
    collect_google_news,
    collect_stomp,
    chinese_headline,
    draft_copy,
    has_cjk,
    is_relay_label,
    merge_posts,
    outlet_from_text,
    propnex_own_piece,
    self_check,
)

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

# Publisher read from the saved clipping at news/images/<id>.jpg.
# The Telegram caption is the headline only. 9752 is a PropNex seminar
# poster, not a newspaper, so it stays PropNex.
CLIPPING_OUTLETS = {
    "9806": ("The Straits Times", "海峡时报"),
    "9805": ("The Straits Times", "海峡时报"),
    "9803": ("The Straits Times", "海峡时报"),
    "9802": ("Business Times", "商业时报"),
    "9799": ("The Straits Times", "海峡时报"),
    "9798": ("The Straits Times", "海峡时报"),
    "9794": ("The Straits Times", "海峡时报"),
    "9792": ("The Straits Times", "海峡时报"),
    "9790": ("Business Times", "商业时报"),
    "9789": ("The Straits Times", "海峡时报"),
    "9788": ("The Straits Times", "海峡时报"),
    "9787": ("Business Times", "商业时报"),
    "9781": ("The Straits Times", "海峡时报"),
    "9778": ("Business Times", "商业时报"),
    "9774": ("Business Times", "商业时报"),
    "9770": ("Business Times", "商业时报"),
    "9769": ("The Straits Times", "海峡时报"),
    "9768": ("Business Times", "商业时报"),
    "9762": ("Business Times", "商业时报"),
    "9758": ("Business Times", "商业时报"),
    "9757": ("Business Times", "商业时报"),
    "9752": ("PropNex", "博纳"),
}

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

# Promo / event posts are dropped even if they mention districts or landed homes.
PROMO_RE = re.compile(
    r"\b(seminar|webinar|zoom\s*ces|zoom|event-details|register now|sign\s*up|"
    r"rsvp|open house|training session|blog post|calling all|quick pointers|"
    r"shockingly)\b",
    re.I,
)
CRIME_TITLE_RE = re.compile(
    r"\b(jail|jailed|launder|forfeit|scam|snatch|tussle|shell firms|convicted)\b",
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
    if PROMO_RE.search(blob) or CRIME_TITLE_RE.search(title):
        return False
    if re.search(r"\bbuilding\b", title, re.I) and not re.search(
        r"\b(hdb|bto|condo|flat|flats|home|homes)\b", title, re.I
    ):
        return False
    # The headline itself has to be about property. A promo caption that only
    # mentions a home in the body is not a news story.
    if not PROPERTY_RE.search(title):
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


def download_image(url: str, post_id: str, referer: str | None = None) -> str:
    headers = {"User-Agent": USER_AGENT, "Accept": "image/*,*/*"}
    if referer:
        headers["Referer"] = referer
    req = urllib.request.Request(url, headers=headers)
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=30, context=ctx) as res:
        data = res.read()
        ext = extension_for(res.headers.get("Content-Type", ""), url)
    if len(data) < 2500:
        raise OSError(f"image too small ({len(data)} bytes)")
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


def collect_posts(known_ids: set[str] | None = None) -> list[dict]:
    """Read the public channel preview, newest page first.

    Stop after a page that already contains a saved message and no new
    property story. Older pages are not fetched.
    """
    seen: dict[str, dict] = {}
    before = None
    known_ids = known_ids or set()
    for _ in range(MAX_PAGES):
        url = PREVIEW if not before else f"{PREVIEW}?before={before}"
        page = fetch(url).decode("utf-8", "replace")
        batch = parse_messages(page)
        if not batch:
            break
        oldest = batch[0]["id"]
        for post in batch:
            seen[post["id"]] = post
        # Older pages are already saved once this page's new property posts
        # are none and at least one message is already on the site. Seminars
        # that were never saved do not force another fetch.
        if known_ids and any(post["id"] in known_ids for post in batch):
            if not any(keep_post(post) and post["id"] not in known_ids for post in batch):
                break
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


def text_list(entry: dict, key: str) -> list[str]:
    return [str(part).strip() for part in entry.get(key, []) if str(part).strip()]


KEYPOINT_CAP = 12
_BOILER_BITS = (
    "carried this singapore property headline",
    "notes below are for buyers",
    "not a copy of the original article",
    "ask what the number refers to",
    "one market headline is not a valuation",
    "buyers should",
    "sellers should",
    "不是原文照搬",
    "下面的说明是写给买家",
    "报道了这则新加坡房地产标题",
    "买房的人要把标题",
    "卖房的人不要把一条标题",
)
_ADVICE_STARTS = (
    "if you are",
    "if you own",
    "if you need",
    "do not ",
    "don't ",
    "buyers ",
    "sellers ",
    "owners who",
    "renting can",
    "a buyer",
    "investors who",
    "use 597",
    "use the homes",
    "如果你",
    "不要",
    "买家应",
    "买家不",
    "卖家应",
    "卖家不",
    "屋主应",
    "屋主不",
    "房东应",
    "房东不",
)


def _point_sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.?!。！？])\s+", text.strip())
    return [part.strip() for part in parts if part.strip()]


def _title_echo(line: str, title: str) -> bool:
    """True when a fact only repeats the story title, not a point from the article."""
    title = title.strip().rstrip(".。")
    if not title:
        return False
    text = line.strip()
    if text.lower().startswith("headline:"):
        rest = text.split(":", 1)[1].strip().rstrip(".。")
        return rest.lower() == title.lower()
    if text.startswith("标题："):
        rest = text.split("：", 1)[1].strip().rstrip(".。")
        return rest == title
    return False


def _hard_meta(line: str, title: str = "") -> bool:
    low = line.lower().strip()
    if low.startswith("source named") or low.startswith("figure in the headline"):
        return True
    if line.startswith("本页来源") or line.startswith("标题中的数字"):
        return True
    return _title_echo(line, title)


def _keep_point(line: str, title: str = "") -> bool:
    low = line.lower().strip()
    if _hard_meta(line, title):
        return False
    if any(bit in low for bit in _BOILER_BITS):
        return False
    if any(low.startswith(prefix) for prefix in _ADVICE_STARTS):
        return False
    if "headline does not" in low or "标题没有" in line or "标题并未" in line:
        return False
    return True


def boilerplate_description(text: str) -> bool:
    low = text.lower()
    return (
        "carried this singapore property headline" in low
        or "notes below are for buyers" in low
        or "报道了这则新加坡房地产标题" in text
    )


def content_keypoints(*groups: list[str], limit: int = KEYPOINT_CAP) -> list[str]:
    """Up to 12 points about the article. Advice and headline-only filler are left out."""
    found: list[str] = []
    seen: set[str] = set()
    for group in groups:
        for line in group:
            for sentence in _point_sentences(line):
                if not _keep_point(sentence):
                    continue
                key = re.sub(r"\s+", " ", sentence).strip()
                if not key or key in seen:
                    continue
                seen.add(key)
                found.append(key)
                if len(found) >= limit:
                    return found
    return found


def align_text(primary: list[str], alternate: list[str]) -> list[str]:
    aligned = []
    for index, item in enumerate(primary):
        if index < len(alternate) and alternate[index]:
            aligned.append(alternate[index])
        else:
            aligned.append(item)
    return aligned


def story_copy(post_id: str, title: str, copy_book: dict) -> dict:
    entry = copy_book.get(post_id) or {}
    summary = text_list(entry, "summary")
    takeaways = text_list(entry, "takeaways")
    written = 2 <= len(summary) <= 4 and len(takeaways) == 3
    zh_entry = entry.get("zh") if isinstance(entry.get("zh"), dict) else {}
    title_zh = str(zh_entry.get("title") or "").strip()
    if not has_cjk(title_zh):
        title_zh = chinese_headline(title)
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
        zh_summary = [
            title_zh or title,
            "这篇新加坡房地产消息还没有更完整的白话说明。标题列出来，是为了让买家和卖家看到报道了什么。标题本身不是买卖的理由。",
            "补上说明之后，会解释这则消息对在新加坡买房或卖房的人意味着什么，包括HDB组屋、公寓（condo）、新盘和转售。",
        ]
        zh_takeaways = [
            "不要只凭标题改变买卖决定。读完细节，再对照自己的预算。",
            "如果你在买房，把这则消息和实际的房子、地点，以及你负担得来的每月开销比较。",
            "如果你在卖房，准备用白话回答关于这个地区的问题。买家记得住他们核实得了的事情。",
        ]
        zh_questions = [
            "如果这就是你心里的那套房子，你还把什么留到以后？",
        ]
        zh_facts: list[str] = []
    questions = text_list(entry, "questions")
    if len(questions) != 1:
        questions = [
            "If this is the home you had in mind, what are you still leaving for later?",
        ]
    description = str(entry.get("description") or summary[0]).strip()
    keywords = str(
        entry.get("keywords")
        or "Singapore property, HDB, condo, new launch, resale, buyers, sellers, market update"
    ).strip()
    facts = text_list(entry, "facts")
    if written:
        zh_summary = align_text(summary, text_list(zh_entry, "summary"))
        zh_takeaways = align_text(takeaways, text_list(zh_entry, "takeaways"))
        zh_questions = align_text(questions, text_list(zh_entry, "questions"))
        zh_facts = align_text(facts, text_list(zh_entry, "facts"))
    raw_points = text_list(entry, "keypoints")
    raw_zh_points = text_list(zh_entry, "keypoints")
    keypoints = []
    zh_keypoints = []
    for index, point in enumerate(raw_points):
        if not _keep_point(point, title):
            continue
        zh_point = raw_zh_points[index] if index < len(raw_zh_points) else ""
        if not (zh_point and _keep_point(zh_point, title_zh)):
            if zh_point and not _hard_meta(zh_point, title_zh) and not any(bit in zh_point for bit in _BOILER_BITS):
                pass
            else:
                zh_point = point
        keypoints.append(point)
        zh_keypoints.append(zh_point or point)
        if len(keypoints) >= KEYPOINT_CAP:
            break
    # A stored point can contain a phrase such as "buyers should" and still be
    # what the article is about. If the advice filter removes every point, keep
    # the stored points so the Key points section is not dropped.
    if not keypoints and raw_points:
        for index, point in enumerate(raw_points[:KEYPOINT_CAP]):
            if _hard_meta(point, title):
                continue
            zh_point = raw_zh_points[index] if index < len(raw_zh_points) else ""
            if not zh_point or _hard_meta(zh_point, title_zh):
                zh_point = point
            keypoints.append(point)
            zh_keypoints.append(zh_point)
    if not keypoints:
        raw_zh_facts = text_list(zh_entry, "facts") if written else []
        for index, fact in enumerate(facts):
            if not _keep_point(fact, title):
                continue
            keypoints.append(fact)
            zh_fact = raw_zh_facts[index] if index < len(raw_zh_facts) else ""
            # The English line already passed the filter. Keep its Chinese twin
            # even when a prefix such as 买家 would have dropped it on its own.
            if zh_fact and not _hard_meta(zh_fact, title_zh) and not any(bit in zh_fact for bit in _BOILER_BITS):
                zh_keypoints.append(zh_fact)
            else:
                zh_keypoints.append(fact)
            if len(keypoints) >= KEYPOINT_CAP:
                break
    if boilerplate_description(description):
        description = " ".join(keypoints[:2]) or title
    return {
        "summary": summary,
        "keypoints": keypoints,
        "takeaways": takeaways,
        "questions": questions,
        "facts": facts,
        "description": clip_text(description),
        "keywords": keywords,
        "written": written,
        "zh": {
            "title": title_zh or title,
            "summary": zh_summary,
            "keypoints": zh_keypoints,
            "takeaways": zh_takeaways,
            "questions": zh_questions,
            "facts": zh_facts,
            "ready": bool(title_zh) and len(text_list(zh_entry, "summary")) >= 2 and len(text_list(zh_entry, "takeaways")) == 3,
        },
    }


def chinese_date(date: str) -> str:
    parts = date.split("/")
    if len(parts) != 3:
        return date
    try:
        year, month, day = (int(part) for part in parts)
    except ValueError:
        return date
    return f"{year}年{month}月{day}日"


def bi(en: str, zh: str) -> str:
    chinese = zh.strip() or en
    return (
        f'<span class="en">{esc(en)}</span>'
        f'<span class="zh" lang="zh-Hans">{esc(chinese)}</span>'
    )


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def has_photo(image: str | None) -> bool:
    return bool(image) and not str(image).endswith("placeholder.svg")


def _fallback_box(tag: str, class_name: str) -> str:
    return (
        f'<{tag} class="{class_name}" role="img" aria-label="Real Estate SG">'
        "Real Estate SG"
        f"</{tag}>"
    )


def _broken_image_script(tag: str, class_name: str) -> str:
    return (
        "this.onerror=null;"
        f"var n=document.createElement('{tag}');"
        f"n.className='{class_name}';"
        "n.setAttribute('role','img');"
        "n.setAttribute('aria-label','Real Estate SG');"
        "n.textContent='Real Estate SG';"
        "this.replaceWith(n)"
    )


def media_markup(image: str | None, *, hero: bool) -> str:
    """Use a saved source image. Otherwise show a text box, never a broken image."""
    if hero:
        if not has_photo(image):
            return _fallback_box("div", "hero hero-fallback")
        return (
            f'<img class="hero" src="{esc(image)}" alt="" width="760" height="280" '
            f'onerror="{_broken_image_script("div", "hero hero-fallback")}">'
        )
    if not has_photo(image):
        return _fallback_box("span", "news-thumb news-fallback")
    return (
        f'<img class="news-thumb" src="{esc(image)}" alt="" width="190" height="118" loading="lazy" '
        f'onerror="{_broken_image_script("span", "news-thumb news-fallback")}">'
    )


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
        <a href="/undervalued-pty/">Undervalued Pty</a>
        <a href="https://the-one-chuan-grove.sg/" target="_blank" rel="noopener">One Chuan Grove</a>
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
      <a href="/undervalued-pty/">Undervalued Pty</a>
      <a href="https://the-one-chuan-grove.sg/" target="_blank" rel="noopener">One Chuan Grove</a>
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
      padding: 8px 8px;
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
    .story-meta {
      margin: 12px 0 0;
      color: var(--muted);
      font-size: 0.92rem;
    }
    .story-date {
      display: inline;
      margin: 0;
      color: var(--muted);
      font-size: 0.92rem;
      font-variant-numeric: tabular-nums;
    }
    .source-name {
      margin: 6px 0 0;
      color: #e6e6e6;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.4;
      text-decoration: none;
      cursor: default;
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
    .hero-fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 16px;
      background: #1a1a1a;
      color: #f4f4f5;
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-align: center;
      line-height: 1.2;
    }
    .keypoints h2 {
      margin: 28px 0 8px;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .keypoints ul { margin: 0; padding: 0; list-style: none; }
    .keypoints li {
      position: relative;
      margin: 0;
      padding: 12px 0 12px 18px;
      border-bottom: 1px solid var(--line);
      color: #f2f2f2;
      line-height: 1.55;
      font-size: 1.02rem;
    }
    .keypoints li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 20px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--red);
    }
    .questions {
      margin-top: 36px;
      padding-top: 8px;
      border-top: 1px solid var(--line);
    }
    .questions h2 {
      margin: 22px 0 8px;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .questions ul { margin: 0; padding: 0; list-style: none; }
    .questions li {
      position: relative;
      margin: 0;
      padding: 14px 0 14px 18px;
      border-bottom: 1px solid var(--line);
      color: #fff;
      font-weight: 700;
      line-height: 1.6;
      font-size: 1.05rem;
    }
    .questions li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--red);
    }
    @media (max-width: 1360px) {
      .nav-links { display: none; }
      .menu-btn { display: inline-flex; align-items: center; justify-content: center; }
      .site-nav-inner { padding: 0 16px; }
    }
    .story-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .story-title-row h1 { flex: 1 1 auto; min-width: 0; }
    html:not([data-lang="zh"]) .zh { display: none; }
    html[data-lang="zh"] .en { display: none; }
    html[data-lang="zh"] body {
      font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", Inter, sans-serif;
    }
    .zh { letter-spacing: 0; }
    .lang-switch {
      display: inline-flex;
      flex: 0 0 auto;
      margin-top: 4px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      overflow: hidden;
    }
    .lang-switch button {
      appearance: none;
      border: 0;
      background: transparent;
      color: #d0d0d0;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      padding: 7px 13px;
      cursor: pointer;
      line-height: 1.2;
    }
    .lang-switch button + button { border-left: 1px solid rgba(255, 255, 255, 0.18); }
    html:not([data-lang="zh"]) .lang-switch [data-lang-set="en"],
    html[data-lang="zh"] .lang-switch [data-lang-set="zh"] {
      background: var(--red);
      color: #fff;
    }
    .lang-switch button:focus-visible {
      outline: 2px solid #fff;
      outline-offset: -3px;
    }
    @media (max-width: 640px) {
      .story { padding: 18px 16px 56px; }
      h1 { font-size: 1.45rem; }
      .hero { height: 190px; }
      .hero-fallback { font-size: 1.05rem; letter-spacing: 0.05em; }
      .keypoints li, .questions li { font-size: 1rem; }
      .lang-switch button { padding: 8px 12px; }
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

LANG_BOOT = """  <script>
    try {
      if (localStorage.getItem("ssp-news-lang") === "zh") {
        document.documentElement.setAttribute("data-lang", "zh");
        document.documentElement.lang = "zh-Hans";
      }
    } catch (e) {}
  </script>"""

LANG_SWITCH = """<div class="lang-switch" role="group" aria-label="Language">
      <button type="button" data-lang-set="en">EN</button>
      <button type="button" data-lang-set="zh" lang="zh-Hans">中文</button>
    </div>"""

LANG_JS = """
    (function () {
      var KEY = "ssp-news-lang";
      function apply(lang) {
        var zh = lang === "zh";
        if (zh) {
          document.documentElement.setAttribute("data-lang", "zh");
          document.documentElement.lang = "zh-Hans";
        } else {
          document.documentElement.removeAttribute("data-lang");
          document.documentElement.lang = "en";
        }
        document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
          var on = btn.getAttribute("data-lang-set") === (zh ? "zh" : "en");
          btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
        var pager = document.getElementById("news-pager");
        if (pager) pager.setAttribute("aria-label", zh ? "新闻分页" : "News pages");
        try { localStorage.setItem(KEY, zh ? "zh" : "en"); } catch (e) {}
      }
      document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          apply(btn.getAttribute("data-lang-set"));
        });
      });
      var saved = "en";
      try { if (localStorage.getItem(KEY) === "zh") saved = "zh"; } catch (e) {}
      apply(saved);
    })();
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
    news = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "description": copy["description"],
        "articleBody": "\n\n".join(copy["keypoints"] + copy["questions"]),
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
            "cssSelector": [".keypoints li", ".questions li"],
        },
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
    return "\n  ".join(json_ld(block) for block in (news, crumbs))


def render_detail_page(item: dict, copy: dict) -> str:
    title = item["title"]
    date = item["date"]
    source_name = (item.get("sourceName") or "").strip()
    source_name_zh = (item.get("sourceNameZh") or source_name).strip()
    if is_relay_label(source_name) or not source_name:
        raise SystemExit(
            f"Detail page {item['id']} has no article source. "
            "The Telegram channel name is not the publisher."
        )
    image = item.get("image") or PLACEHOLDER
    iso_date = date.replace("/", "-")
    path = f"/news/{item['id']}/"
    page_url = f"https://www.sellingsgproperty.com{path}"
    image_url = "https://www.sellingsgproperty.com" + image
    description = copy["description"]
    zh = copy["zh"]
    zh_points = zh.get("keypoints") or []
    point_items = "\n".join(
        "        <li>" + bi(point, zh_points[index] if index < len(zh_points) else point) + "</li>"
        for index, point in enumerate(copy["keypoints"][:KEYPOINT_CAP])
    )
    keypoints_html = ""
    if point_items:
        keypoints_html = (
            '    <section class="keypoints" aria-labelledby="keypoints-heading">\n'
            '      <h2 id="keypoints-heading">' + bi("Key points", "要点") + "</h2>\n"
            "      <ul>\n"
            f"{point_items}\n"
            "      </ul>\n"
            "    </section>\n"
        )
    bullets = "\n".join(
        "        <li>"
        + bi(question, zh["questions"][index] if index < len(zh.get("questions") or []) else question)
        + "</li>"
        for index, question in enumerate(copy["questions"])
    )
    schema = detail_schema(item, copy)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
{LANG_BOOT}
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
    <a class="back" href="/news/">{bi("← All news", "← 全部新闻")}</a>
    <p class="kicker">{bi("Real estate", "房地产")}</p>
    <div class="story-title-row">
      <h1>{bi(title, zh["title"])}</h1>
      {LANG_SWITCH}
    </div>
    <p class="story-meta"><time class="story-date" datetime="{esc(iso_date)}">{bi(date, chinese_date(date))}</time></p>
    <p class="source-name">{bi("Source: " + source_name, "来源：" + source_name_zh)}</p>
    {media_markup(image, hero=True)}
{keypoints_html}    <section class="questions" aria-labelledby="questions-heading">
      <h2 id="questions-heading">{bi("Milo chat for thoughts", "Milo chat for thoughts")}</h2>
      <ul>
{bullets}
      </ul>
    </section>
  </article>
  <script>{MENU_JS}{LANG_JS}</script>
  <script src="/js/content-protect.js"></script>
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


def pager_button(en: str, zh: str, href: str | None) -> str:
    label = bi(en, zh)
    if href:
        return f'<a class="pager-btn" href="{href}">{label}</a>'
    return f'<span class="pager-btn is-disabled">{label}</span>'


def render_pager(count: int) -> str:
    pages = max(1, (count + PAGE_SIZE - 1) // PAGE_SIZE)
    parts = [pager_button("Previous Page", "上一页", None)]
    for number in range(1, pages + 1):
        href = "/news/" if number == 1 else f"/news/?page={number}"
        current = ' is-current" aria-current="page' if number == 1 else ""
        parts.append(f'<a class="pager-num{current}" href="{href}">{number}</a>')
    next_href = "/news/?page=2" if pages > 1 else None
    parts.append(pager_button("Next page", "下一页", next_href))
    return '<nav class="pager" id="news-pager" aria-label="News pages">' + "".join(parts) + "</nav>"


def render_list_html(items: list[dict], copy_book: dict) -> str:
    rows = []
    for index, item in enumerate(items):
        href = f"/news/{item['id']}/"
        date = item["date"]
        iso_date = date.replace("/", "-")
        image = item.get("image") or ""
        hidden = " hidden" if index >= PAGE_SIZE else ""
        start = ' class="is-page-start"' if index == 0 else ""
        entry = copy_book.get(item["id"]) or {}
        zh_entry = entry.get("zh") if isinstance(entry.get("zh"), dict) else {}
        title_zh = str(zh_entry.get("title") or "").strip()
        if not has_cjk(title_zh):
            title_zh = chinese_headline(item["title"])
        rows.append(
            f"    <li{start}{hidden}><a class=\"news-row\" href=\"" + esc(href) + "\">"
            + media_markup(image, hero=False)
            + "<div class=\"news-copy\">"
            + "<span class=\"news-cat\">" + bi("Real estate", "房地产") + "</span>"
            + "<h2 class=\"news-title\">" + bi(item["title"], title_zh) + "</h2>"
            + "<time class=\"news-date\" datetime=\"" + esc(iso_date) + "\">" + bi(date, chinese_date(date)) + "</time>"
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
    text = replace_marked(text, LIST_START, LIST_END, render_list_html(items, load_copy()))
    text = replace_marked(text, SCHEMA_START, SCHEMA_END, render_list_schema(items))
    lowered = text.lower()
    if "t.me/" in lowered or "telegram.org" in lowered:
        raise SystemExit("News list tried to link off-site. Aborting.")
    for host in ("news.google.com", "businesstimes.com", "stomp.sg"):
        if host in lowered:
            raise SystemExit(f"News list contains {host}. Aborting.")
    INDEX_PATH.write_text(text, encoding="utf-8")


def write_detail_pages(items: list[dict]) -> None:
    copy_book = load_copy()
    keep_ids = set()
    missing = []
    missing_zh = []
    for item in items:
        copy = story_copy(item["id"], item["title"], copy_book)
        if not copy["written"]:
            missing.append(item["id"])
        elif not copy["zh"]["ready"]:
            missing_zh.append(item["id"])
        page = render_detail_page(item, copy)
        offsite = [
            url
            for url in re.findall(r"<a\b[^>]*\bhref=[\"'](https?://[^\"']+)", page)
            if "sellingsgproperty.com" not in url
            and urllib.parse.urlparse(url).hostname != "the-one-chuan-grove.sg"
        ]
        if offsite:
            raise SystemExit(f"Detail page {item['id']} contains an off-site link: {offsite[0]}")
        if "takeaways-heading" in page or "What this means" in page:
            raise SystemExit(f"Detail page {item['id']} still shows a takeaway answer.")
        if 'id="questions-heading"' not in page or 'id="keypoints-heading"' not in page:
            raise SystemExit(f"Detail page {item['id']} is missing key points or questions.")
        question_block = re.search(r'<section class="questions".*?</section>', page, re.S)
        question_count = len(re.findall(r"<li\b", question_block.group(0))) if question_block else 0
        if question_count != 1:
            raise SystemExit(f"Detail page {item['id']} should ask one question, found {question_count}.")
        source = re.search(r'<p class="source-name">(.*?)</p>', page, re.S)
        if not source or "Source:" not in source.group(1) or "<a" in source.group(1).lower():
            raise SystemExit(f"Detail page {item['id']} is missing a plain-text source line.")
        folder = NEWS_DIR / item["id"]
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(page, encoding="utf-8")
        keep_ids.add(item["id"])
        item["path"] = f"/news/{item['id']}/"
        item["description"] = copy["description"]

    for child in NEWS_DIR.iterdir():
        if not child.is_dir() or child.name == "images" or child.name in keep_ids:
            continue
        if not (child / "index.html").exists():
            continue
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
    if missing_zh:
        print("No Chinese brief yet for: " + ", ".join(missing_zh))
        print('Add a "zh" object (title, summary, facts, takeaways, questions) in news/copy.json, then run: python3 scripts/refresh-news.py --pages-only')
    print("To publish: python3 scripts/refresh-news.py --deploy")


def load_saved_posts() -> list[dict]:
    if not JSON_PATH.exists():
        return []
    payload = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    posts = []
    for raw in payload.get("items") or []:
        date = str(raw.get("date") or "")
        try:
            when = datetime.strptime(date, "%Y/%m/%d").replace(tzinfo=SGT)
            stamp = when.isoformat(timespec="seconds")
        except ValueError:
            stamp = ""
        posts.append(
            {
                "id": str(raw.get("id")),
                "title": raw.get("title") or "",
                "date": date,
                "datetime": stamp,
                "image": raw.get("image") or PLACEHOLDER,
                "image_url": "",
                "image_referer": "",
                "sourceName": raw.get("sourceName") or "",
                "sourceNameZh": raw.get("sourceNameZh") or "",
                "sourceFeed": raw.get("sourceFeed") or "propnex",
                "category": raw.get("category") or "Real estate",
                "saved": True,
            }
        )
    return posts


def tag_propnex(posts: list[dict]) -> list[dict]:
    tagged = []
    for post in posts:
        found = CLIPPING_OUTLETS.get(str(post["id"]))
        if not found:
            found = outlet_from_text(f"{post.get('title') or ''}\n{post.get('body') or ''}")
        name, zh = found or ("", "")
        tagged.append(
            {
                "id": str(post["id"]),
                "title": post["title"],
                "datetime": post["datetime"],
                "date": format_date(post["datetime"]),
                "image": "",
                "image_url": post.get("image_url") or "",
                "image_referer": "",
                "sourceName": name,
                "sourceNameZh": zh,
                "sourceFeed": "propnex",
                "category": "Real estate",
                "body": post.get("body") or "",
                "article_url": caption_article_url(post.get("body") or ""),
                "saved": False,
            }
        )
    return tagged


def masthead_text(image: Path) -> str:
    """Read the top of a saved clipping. Empty when the reader is unavailable."""
    compiler = shutil.which("swiftc")
    source = Path(__file__).resolve().parent / "masthead.swift"
    if not compiler or not source.exists() or not image.exists():
        return ""
    binary = Path("/tmp/ssp-masthead-ocr")
    if not binary.exists() or binary.stat().st_mtime < source.stat().st_mtime:
        built = subprocess.run(
            [compiler, "-O", "-o", str(binary), str(source)],
            capture_output=True,
            text=True,
            check=False,
        )
        if built.returncode != 0 or not binary.exists():
            print("masthead reader unavailable")
            return ""
    try:
        out = subprocess.run(
            [str(binary), str(image)],
            capture_output=True,
            text=True,
            timeout=40,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return ""
    return out.stdout or ""


def apply_article_sources(items: list[dict]) -> None:
    """Credit each PropNex clipping to the paper named on the article."""
    for item in items:
        item_id = str(item.get("id") or "")
        if item.get("sourceFeed") == "propnex" and item_id in CLIPPING_OUTLETS:
            item["sourceName"], item["sourceNameZh"] = CLIPPING_OUTLETS[item_id]
            continue
        if item.get("sourceName") and not is_relay_label(item.get("sourceName") or ""):
            continue
        blob = f"{item.get('title') or ''}\n{item.get('body') or ''}"
        found = outlet_from_text(blob)
        image = item.get("image") or ""
        clipping = ""
        if not found and image.startswith("/news/images/") and not image.endswith("placeholder.svg"):
            path = ROOT / image.lstrip("/")
            if path.exists():
                clipping = masthead_text(path)
                found = outlet_from_text(clipping)
        if not found and propnex_own_piece(blob + "\n" + clipping):
            found = ("PropNex", "博纳")
        if found:
            item["sourceName"], item["sourceNameZh"] = found
        elif is_relay_label(item.get("sourceName") or ""):
            item["sourceName"] = ""
            item["sourceNameZh"] = ""


def story_has_publisher(item: dict) -> bool:
    name = (item.get("sourceName") or "").strip()
    return bool(name) and not is_relay_label(name)


def drop_unsourced(items: list[dict]) -> list[dict]:
    """Leave out a new clipping when its masthead cannot be read.

    Saved stories stay. One unreadable clipping does not block the rest.
    """
    kept = []
    kept_images = set()
    dropped = []
    for item in items:
        if story_has_publisher(item) or item.get("saved"):
            kept.append(item)
            kept_images.add(Path(item.get("image") or "").name)
        else:
            dropped.append(item)
            print(f"skip unsourced {item.get('id')}: {(item.get('title') or '')[:90]}")
    if len(kept) < 8:
        raise SystemExit(
            f"Only {len(kept)} stories have a publisher. The news list was left unchanged."
        )
    for item in dropped:
        name = Path(item.get("image") or "").name
        if not name or name in kept_images or name == "placeholder.svg":
            continue
        path = IMAGE_DIR / name
        if path.is_file():
            path.unlink()
    return kept


def git_at(*args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=check,
        capture_output=True,
        text=True,
    )


def deploy_news() -> None:
    """Commit the news files and push main. Other local edits stay uncommitted."""
    branch = git_at("rev-parse", "--abbrev-ref", "HEAD").stdout.strip()
    if branch == "HEAD":
        git_at("checkout", "-B", "main")
        branch = "main"
    if branch != "main":
        raise SystemExit(f"Refusing to deploy from branch {branch}. Push happens from main.")
    paths = ["news.json", "news", "sitemap.xml"]
    git_at("add", "-A", "--", *paths)
    staged = git_at("diff", "--cached", "--quiet", "--", *paths, check=False)
    if staged.returncode == 0:
        print("No news changes to publish.")
        return
    if staged.returncode != 1:
        raise SystemExit((staged.stderr or staged.stdout).strip() or "git diff failed")
    message = (
        "Refresh Singapore property news\n\n"
        "Publish new on-site briefs from the public property headlines.\n"
    )
    commit_args = ["commit", "--only", "-m", message, "--", *paths]
    if os.environ.get("GITHUB_ACTIONS"):
        commit_args = [
            "-c", "user.name=github-actions[bot]",
            "-c", "user.email=41898282+github-actions[bot]@users.noreply.github.com",
            *commit_args,
        ]
    commit = git_at(*commit_args, check=False)
    if commit.returncode != 0:
        detail = (commit.stdout + commit.stderr).strip()
        if "nothing to commit" in detail.lower() or "no changes added" in detail.lower():
            print("No news changes to publish.")
            return
        raise SystemExit(detail or "git commit failed")
    print(commit.stdout.strip())
    push = git_at("push", "origin", "main", check=False)
    if push.returncode != 0:
        git_at("pull", "--rebase", "--autostash", "origin", "main")
        push = git_at("push", "origin", "main", check=False)
    if push.returncode != 0:
        raise SystemExit((push.stdout + push.stderr).strip() or "git push failed")
    print((push.stdout or push.stderr).strip())
    print("Pushed main. Netlify publishes https://www.sellingsgproperty.com")


def entry_is_written(entry: dict | None) -> bool:
    if not isinstance(entry, dict):
        return False
    summary = text_list(entry, "summary")
    takeaways = text_list(entry, "takeaways")
    return 2 <= len(summary) <= 4 and len(takeaways) == 3


def save_copy(book: dict) -> None:
    raw = json.dumps(book, ensure_ascii=False, indent=2) + "\n"
    if re.search(r"https?://|t\.me/", raw):
        raise SystemExit("news/copy.json would contain an external URL. Aborting.")
    COPY_PATH.parent.mkdir(parents=True, exist_ok=True)
    COPY_PATH.write_text(raw, encoding="utf-8")


def ensure_copy(items: list[dict]) -> None:
    """Fill missing briefs. Never replace a summary that is already written."""
    book = load_copy()
    changed = False
    for item in items:
        if entry_is_written(book.get(item["id"])):
            continue
        book[item["id"]] = draft_copy(item["title"], item.get("sourceName") or "Property news")
        changed = True
        print(f"draft brief for {item['id']}: {item['title'][:80]}")
    if changed:
        save_copy(book)


def write_opened_points(items: list[dict]) -> None:
    """Fill headline-only briefs from articles that opened on this run."""
    book = load_copy()
    if fill_article_points(items, book):
        save_copy(book)


def drop_private_fields(items: list[dict]) -> None:
    """Drop the article URL and clipping text before any page is written."""
    for item in items:
        item.pop("article_url", None)
        item.pop("body", None)


def dump_news(items: list[dict]) -> None:
    public = []
    for item in items:
        public.append(
            {
                "id": item["id"],
                "title": item["title"],
                "date": item["date"],
                "image": item.get("image") or PLACEHOLDER,
                "sourceName": (item.get("sourceName") or "").strip(),
                "sourceNameZh": (item.get("sourceNameZh") or item.get("sourceName") or "").strip(),
                "sourceFeed": item.get("sourceFeed") or "propnex",
                "category": "Real estate",
                "path": item.get("path") or f"/news/{item['id']}/",
                "description": item.get("description") or "",
            }
        )
        if is_relay_label(public[-1]["sourceName"]) or not public[-1]["sourceName"]:
            raise SystemExit(
                f"{item['id']} has no article source. "
                "Refusing to write the Telegram channel name."
            )
    names = []
    for row in public:
        if row["sourceName"] not in names:
            names.append(row["sourceName"])
    updated = datetime.now(SGT).isoformat(timespec="seconds")
    if JSON_PATH.exists():
        try:
            previous = json.loads(JSON_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            previous = {}
        if previous.get("items") == public and previous.get("updated"):
            updated = previous["updated"]
    payload = {
        "updated": updated,
        "sources": names,
        "items": public,
    }
    raw = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    if re.search(r"https?://|t\.me/", raw):
        raise SystemExit("news.json would contain an external URL. Aborting.")
    JSON_PATH.write_text(raw, encoding="utf-8")


def local_image(post_id: str) -> str:
    """Reuse a photo already saved for this story. Empty when none is on disk."""
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        path = IMAGE_DIR / f"{post_id}{ext}"
        if path.is_file() and path.stat().st_size >= 2500:
            return f"/news/images/{path.name}"
    return ""


def attach_images(items: list[dict]) -> None:
    used = {"placeholder.svg"}
    for item in items:
        image = item.get("image") or PLACEHOLDER
        if item.get("image_url"):
            already = local_image(str(item["id"]))
            if already:
                image = already
            else:
                try:
                    image = download_image(
                        item["image_url"],
                        item["id"],
                        item.get("image_referer") or None,
                    )
                except Exception as exc:
                    print(f"image skip {item['id']}: {exc}")
                    image = item.get("image") or PLACEHOLDER
        item["image"] = image or PLACEHOLDER
        used.add(Path(item["image"]).name)
    if IMAGE_DIR.exists():
        for path in IMAGE_DIR.iterdir():
            if path.name not in used and path.suffix.lower() in {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".gif",
            }:
                path.unlink()


def story_key(item: dict) -> tuple[str, str, str, str, str, str]:
    return (
        str(item.get("id") or ""),
        item.get("title") or "",
        item.get("date") or "",
        (item.get("sourceName") or "").strip(),
        (item.get("sourceNameZh") or "").strip(),
        item.get("sourceFeed") or "",
    )


def list_unchanged(saved: list[dict], items: list[dict]) -> bool:
    """True when this run would publish the same stories already on the site.

    Same-day order can shuffle after a timestamp refresh. That is not a new
    story, so the pages, photos, and masthead reader stay untouched.
    """
    if sorted(story_key(item) for item in saved) != sorted(story_key(item) for item in items):
        return False
    saved_by_id = {str(item.get("id")): item for item in saved}
    for item in items:
        old = saved_by_id.get(str(item.get("id")))
        if not old:
            return False
        image = old.get("image") or ""
        if image and not image.endswith("placeholder.svg"):
            if not (ROOT / image.lstrip("/")).is_file():
                return False
        elif item.get("image_url"):
            return False
    return True


def fetch_fresh_posts(saved: list[dict] | None = None) -> list[dict]:
    known = {str(item.get("id")) for item in (saved or [])}
    fresh: list[dict] = []
    collectors = [
        ("PropNex", lambda: tag_propnex(collect_posts(known))),
        ("Business Times", collect_business_times),
        ("Stomp", collect_stomp),
        ("Google News", collect_google_news),
    ]
    for name, collector in collectors:
        try:
            batch = collector()
            print(f"{name}: {len(batch)} headlines")
            fresh.extend(batch)
        except Exception as exc:
            print(f"{name} skipped: {exc}")
    return fresh


def pages_only() -> None:
    self_check()
    items = load_saved_posts()
    if len(items) < 8:
        raise SystemExit("news.json has too few stories. Run a full refresh first.")
    apply_article_sources(items)
    ensure_copy(items)
    write_detail_pages(items)
    dump_news(items)
    print(f"Rebuilt {len(items)} stories from news.json")


def publish_stories(items: list[dict]) -> None:
    drop_private_fields(items)
    write_detail_pages(items)
    dump_news(items)
    print(f"Wrote {len(items)} items to {JSON_PATH.relative_to(ROOT)}")
    for item in items:
        print(f"  {item['date']}  [{item['sourceFeed']}]  {item['title']}")
    if "--deploy" in sys.argv:
        deploy_news()


def main() -> None:
    self_check()
    saved = load_saved_posts()
    fresh = fetch_fresh_posts(saved)
    items = merge_posts(saved, fresh)
    if len(items) < 8:
        raise SystemExit(
            f"Only {len(items)} stories after merging. The news list was left unchanged."
        )
    pending = stories_awaiting_points(items, load_copy())
    key_set = bool(os.environ.get("XAI_API_KEY", "").strip())
    if "--dry-run" not in sys.argv and list_unchanged(saved, items) and not (pending and key_set):
        if pending:
            print(
                "XAI_API_KEY is not set. "
                "Headline drafts were left as they are."
            )
        print(
            f"No new stories among {len(items)}. "
            "Skipped image download, masthead reading, and page rebuild."
        )
        if "--deploy" in sys.argv:
            deploy_news()
        return
    if "--dry-run" not in sys.argv and list_unchanged(saved, items):
        print(
            f"No new stories among {len(items)}. "
            f"Opening {len(pending)} headline-only article(s) that still have a link."
        )
        ensure_copy(items)
        write_opened_points(items)
        publish_stories(items)
        return
    apply_article_sources(items)
    if "--dry-run" in sys.argv:
        print(f"\n{len(items)} stories")
        for item in items:
            flag = "keep" if item.get("saved") else "NEW"
            link = "link" if item.get("article_url") else "no-link"
            print(
                f"{flag}\t{link}\t{item['id']}\t{item['date']}\t{item['sourceFeed']}\t"
                f"{item['sourceName']}\t{item['title']}"
            )
        if pending:
            print(
                f"{len(pending)} headline-only stories have an article link. "
                "Dry run does not open them or call the model."
            )
        return
    attach_images(items)
    apply_article_sources(items)
    items = drop_unsourced(items)
    ensure_copy(items)
    write_opened_points(items)
    publish_stories(items)


if __name__ == "__main__":
    if "--pages-only" in sys.argv:
        pages_only()
    else:
        main()
