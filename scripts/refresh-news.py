#!/usr/bin/env python3
"""Refresh news.json from the public Telegram channel preview.

From the site root:

    python3 scripts/refresh-news.py

or:

    npm run refresh-news

Reads https://t.me/s/PropNexPropertyNewsUpdate (no login), keeps the latest
property posts, skips seminars and other promo posts, downloads each photo
into news/images/, and writes news.json. The News page loads that file.
"""

from __future__ import annotations

import html
import json
import re
import ssl
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

CHANNEL = "PropNexPropertyNewsUpdate"
PREVIEW = f"https://t.me/s/{CHANNEL}"
MAX_ITEMS = 12
MAX_PAGES = 3
ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "news.json"
IMAGE_DIR = ROOT / "news" / "images"
PLACEHOLDER = "/news/images/placeholder.svg"
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
                "link": f"https://t.me/{CHANNEL}/{post['id']}",
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
    JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} items to {JSON_PATH.relative_to(ROOT)}")
    for item in items:
        print(f"  {item['date']}  {item['title']}")


if __name__ == "__main__":
    main()
