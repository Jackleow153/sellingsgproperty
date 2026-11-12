#!/usr/bin/env python3
"""Open a new story's article and ask grok-4.7 for original key points.

The article URL stays in memory for this run. It is not written to
news.json, news/copy.json, or the HTML. A page that cannot be opened,
a missing XAI_API_KEY, or an unusable model reply leaves the headline draft.
Stories that already have real key points are not sent.
"""

from __future__ import annotations

import json
import os
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from urllib.parse import urlparse

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
MODEL = "grok-4.7"
API_URL = "https://api.x.ai/v1/responses"
GOOGLE_COOKIE = "CONSENT=YES+cb; SOCS=CAI"
MIN_ARTICLE_CHARS = 700
MAX_ARTICLE_CHARS = 7000
MIN_PARAGRAPH = 80
MIN_POINTS = 3
MAX_POINTS = 12

_FILLER_PREFIXES = (
    "figures named in the headline",
    "标题里的数字",
    "标题中的数字",
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
_BOILER_BITS = (
    "buyers should",
    "sellers should",
    "carried this singapore property headline",
    "notes below are for buyers",
    "not a copy of the original article",
    "ask what the number refers to",
    "one market headline is not a valuation",
    "不是原文照搬",
    "下面的说明是写给买家",
    "报道了这则新加坡房地产标题",
)
_PROMO_BITS = (
    "trusted source",
    "subscribe",
    "newsletter",
    "get access",
    "sign in",
    "cookie",
    "privacy policy",
    "all rights reserved",
    "advertisement",
)
_STOP_BITS = (
    "meanwhile in other",
    "related stories",
    "related articles",
    "weekly sales",
    "you may also like",
    "recommended for you",
)
_PUSH = ("buy now", "act now", "立即购买", "马上买", "立刻买", "现在就买")
_URL_RE = re.compile(r"https?://|t\.me/|www\.", re.I)
_SKIP_PATH = re.compile(r"/(subscribe|login|account|newsletters?)(/|$)", re.I)
_STOP_WORDS = {
    "this", "that", "with", "from", "have", "will", "what", "when", "your",
    "about", "into", "than", "then", "they", "their", "after", "before",
    "over", "under", "singapore", "really", "good", "does", "which", "where",
    "while", "been", "were", "being", "such", "more", "most", "some", "only",
    "just", "very", "also", "them", "these", "those", "there", "here",
    "would", "could", "should", "tell",
}
_BLOCKED_HOSTS = (
    "news.google.",
    "google.",
    "gstatic.",
    "t.me",
    "telegram.",
    "web.telegram.",
)
GENERIC_QUESTION = "If this is the home you had in mind, what are you still leaving for later?"
GENERIC_QUESTION_ZH = "如果这就是你心里的那套房子，你还把什么留到以后？"

_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["keypoints", "zh_keypoints", "question", "zh_question", "zh_title"],
    "properties": {
        "keypoints": {
            "type": "array",
            "minItems": MIN_POINTS,
            "maxItems": MAX_POINTS,
            "items": {"type": "string"},
        },
        "zh_keypoints": {
            "type": "array",
            "minItems": MIN_POINTS,
            "maxItems": MAX_POINTS,
            "items": {"type": "string"},
        },
        "question": {"type": "string"},
        "zh_question": {"type": "string"},
        "zh_title": {"type": "string"},
    },
}

_SYSTEM = """You write original key points for one Singapore property news page.
Use only the headline and article text in the user message. Do not use outside knowledge and do not search.
Paraphrase. Do not paste the publisher's sentences.
Include a figure only when that same figure appears in the supplied text. Do not invent prices, counts, dates, yields, or names.
Write 5 to 12 points when the article supports them. If it supports fewer, write only the supported points, at least 3. Do not pad.
Each point is one or two sentences about what the article says.
Do not start a point with advice such as "If you are", "Buyers", "Sellers", "Do not", or "Owners who".
Do not use the phrases "buyers should" or "sellers should".
Do not say "buy now", "act now", or "立即购买".
A death, crime, trespass, or relationship story is not a price signal and is not a reason to buy.
Write one subtle question for a buyer or a seller, in English and in Simplified Chinese. Do not answer it.
Chinese key points follow the English points in the same order, with the same figures, in Simplified Chinese.
Keep project names in English. Keep Plus, Prime, and Standard in English.
Call an HDB executive flat 公寓式组屋. Call a 3Gen flat 三代同堂组屋.
Write money in Chinese as 55万9000新元, 278万新元, or 每月5300新元.
Keep analyst names in English: Wong Siew Ying, Christine Sun, Eugene Lim, Nicholas Mak. 徐芳达 is fine for Chee Hong Tat.
No URLs.
zh_title is a Simplified Chinese headline for the same story."""


def has_cjk(text: str) -> bool:
    return bool(re.search(r"[\u4e00-\u9fff]", text or ""))


def _norm_title(text: str) -> str:
    text = (text or "").replace("’", "'").replace("‘", "'").replace("`", "'")
    text = re.sub(r"\s+", " ", text).strip()
    return text.rstrip(".。?!？！").lower()


def point_is_filler(point: str, title: str) -> bool:
    """True when a stored point is only the headline or its figure line."""
    text = re.sub(r"\s+", " ", point or "").strip()
    if not text:
        return True
    low = text.lower()
    if any(low.startswith(prefix) or text.startswith(prefix) for prefix in _FILLER_PREFIXES):
        return True
    folded = _norm_title(text)
    original = _norm_title(title)
    return bool(original) and folded == original


def is_headline_only(entry: dict | None, title: str) -> bool:
    """True for a missing brief or a draft whose English points are only the headline.

    An empty keypoint list is not headline-only. Those older stories show
    their facts, and this job must not replace them.
    """
    if not isinstance(entry, dict):
        return True
    points = [str(point).strip() for point in (entry.get("keypoints") or []) if str(point).strip()]
    if not points:
        return False
    return all(point_is_filler(point, title) for point in points)


def stories_awaiting_points(items: list[dict], book: dict) -> list[dict]:
    """Headline-only stories that already carry an in-memory article URL."""
    waiting = []
    for item in items:
        if not str(item.get("article_url") or "").strip():
            continue
        entry = book.get(item.get("id")) if isinstance(book, dict) else None
        if is_headline_only(entry, item.get("title") or ""):
            waiting.append(item)
    return waiting


def _blocked_host(host: str) -> bool:
    host = (host or "").lower()
    return any(bad in host for bad in _BLOCKED_HOSTS)


def choose_article_url(current: str, incoming: str) -> str:
    """Keep a publisher URL ahead of a Google News token."""
    current = (current or "").strip()
    incoming = (incoming or "").strip()
    if not incoming:
        return current
    if not current:
        return incoming
    incoming_direct = not _blocked_host(urlparse(incoming).netloc)
    current_direct = not _blocked_host(urlparse(current).netloc)
    if incoming_direct and not current_direct:
        return incoming
    return current


def caption_article_url(body: str) -> str:
    """Return a publisher link printed in a clipping caption, if there is one."""
    for match in re.finditer(r"https?://[^\s<>'\"]+", body or ""):
        url = match.group(0).rstrip(").,;]}>")
        if _blocked_host(urlparse(url).netloc):
            continue
        return url
    return ""


def _slug_hits(title: str, url: str) -> int:
    slug = urlparse(url).path.replace("-", " ").replace("/", " ").lower()
    words = {
        word.lower()
        for word in re.findall(r"[A-Za-z0-9][A-Za-z0-9'-]{2,}", title or "")
        if word.lower() not in _STOP_WORDS
    }
    return sum(1 for word in words if word in slug)


def pick_article_href(window: str, page_url: str, title: str = "") -> str:
    """Pick the article link in a listing-card window. Empty when none matches."""
    page = urlparse(page_url)
    host = page.netloc.lower()
    page_path = page.path.rstrip("/")
    found: list[tuple[int, str]] = []
    for match in re.finditer(r'href="([^"]+)"', window or "", flags=re.I):
        href = unescape(match.group(1)).strip()
        if href.startswith("/"):
            full = f"{page.scheme}://{page.netloc}{href}"
        elif href.startswith("http://") or href.startswith("https://"):
            full = href
        else:
            continue
        target = urlparse(full)
        if target.netloc.lower() != host:
            continue
        path = target.path.rstrip("/")
        if not path or path == page_path or path.count("/") < 2:
            continue
        if path in ("/property", "/property/residential"):
            continue
        if _SKIP_PATH.search(path):
            continue
        clean = f"{target.scheme}://{target.netloc}{path}"
        if all(clean != item[1] for item in found):
            found.append((match.start(), clean))
    if not found:
        return ""
    if not title:
        found.sort(key=lambda item: len(urlparse(item[1]).path), reverse=True)
        return found[0][1]
    needed = 2 if len(re.findall(r"[A-Za-z][A-Za-z'-]{3,}", title)) >= 2 else 1
    found.sort(key=lambda item: (_slug_hits(title, item[1]), -item[0]), reverse=True)
    if _slug_hits(title, found[0][1]) < needed:
        return ""
    return found[0][1]


def _fetch(url: str, *, data: bytes | None = None, cookie: str = "", timeout: int = 25) -> str:
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-SG,en;q=0.9",
    }
    if cookie:
        headers["Cookie"] = cookie
    if data is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
    req = urllib.request.Request(url, data=data, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout, context=ssl.create_default_context()) as res:
        return res.read().decode("utf-8", "replace")


def resolve_google_news(link: str) -> str:
    """Turn a news.google.com/rss/articles token into the publisher URL."""
    gid = urlparse(link).path.rstrip("/").split("/")[-1]
    if not gid or len(gid) < 20:
        return ""
    html = _fetch(
        f"https://news.google.com/rss/articles/{urllib.parse.quote(gid)}"
        "?hl=en-SG&gl=SG&ceid=SG:en",
        cookie=GOOGLE_COOKIE,
        timeout=20,
    )
    sg_match = re.search(r'data-n-a-sg="([^"]+)"', html)
    ts_match = re.search(r'data-n-a-ts="([^"]+)"', html)
    if not sg_match or not ts_match or not ts_match.group(1).isdigit():
        return ""
    inner = (
        '["garturlreq",[["X","X",["X","X"],null,null,1,1,"US:en",null,1,'
        'null,null,null,null,null,0,1],"X","X",1,[1,1,1],1,1,null,0,0,null,0],'
        f'"{gid}",{ts_match.group(1)},"{sg_match.group(1)}"]'
    )
    body = urllib.parse.urlencode(
        {"f.req": json.dumps([[["Fbv4je", inner, None, "generic"]]], separators=(",", ":"))}
    ).encode()
    raw = _fetch(
        "https://news.google.com/_/DotsSplashUi/data/batchexecute?rpcids=Fbv4je",
        data=body,
        cookie=GOOGLE_COOKIE,
        timeout=20,
    )
    row = json.loads(raw.split("\n\n", 1)[1])[0][2]
    if not row:
        return ""
    target = json.loads(row)[1]
    return target if isinstance(target, str) else ""


def publisher_url(url: str) -> str:
    """Resolve a Google News token. Return a direct publisher URL, or empty."""
    url = (url or "").strip()
    if not url.lower().startswith("http"):
        return ""
    host = urlparse(url).netloc.lower()
    if "news.google." in host:
        try:
            url = resolve_google_news(url)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, ValueError, IndexError, KeyError):
            return ""
        host = urlparse(url).netloc.lower()
    if not url.lower().startswith("http") or _blocked_host(host):
        return ""
    return url.split("#", 1)[0]


def article_text(html: str) -> str:
    """Paragraphs from the article body. Promo lines and related stories are left out."""
    match = re.search(r"<article\b[^>]*>(.*)</article>", html or "", flags=re.I | re.S)
    chunk = match.group(1) if match else (html or "")
    chunk = re.sub(
        r"<(script|style|nav|footer|aside|form)\b[^>]*>.*?</\1>",
        " ",
        chunk,
        flags=re.I | re.S,
    )
    kept: list[str] = []
    total = 0
    for raw in re.findall(r"<p\b[^>]*>(.*?)</p>", chunk, flags=re.I | re.S):
        text = unescape(re.sub(r"<[^>]+>", " ", raw))
        text = re.sub(r"\s+", " ", text).strip()
        low = text.lower()
        if any(bit in low for bit in _STOP_BITS):
            break
        if len(text) < MIN_PARAGRAPH:
            continue
        if any(bit in low for bit in _PROMO_BITS):
            continue
        kept.append(text)
        total += len(text)
        if total >= MAX_ARTICLE_CHARS:
            break
    return "\n\n".join(kept)[:MAX_ARTICLE_CHARS]


def title_overlaps(title: str, text: str) -> bool:
    words = [
        word.lower()
        for word in re.findall(r"[A-Za-z][A-Za-z'-]{3,}", title or "")
        if word.lower() not in _STOP_WORDS
    ]
    if not words:
        return False
    haystack = (text or "").lower()
    hits = sum(1 for word in set(words) if word in haystack)
    needed = 2 if len(set(words)) >= 2 else 1
    return hits >= needed


def opened_article_text(url: str, title: str) -> str:
    """Fetch the publisher page. Empty when it is too short or the wrong story."""
    direct = publisher_url(url)
    if not direct:
        return ""
    try:
        html = _fetch(direct, timeout=25)
    except (urllib.error.URLError, TimeoutError):
        return ""
    text = article_text(html)
    if len(text) < MIN_ARTICLE_CHARS or not title_overlaps(title, text):
        return ""
    return text


def canonical_numbers(text: str) -> set[str]:
    """Money and figures in one form, so 278万 matches $2.78 million.

    A loose fragment such as 78 does not match 2.78. Commas are ignored.
    """
    values: set[str] = set()
    occupied: list[tuple[int, int]] = []

    def free(start: int, end: int) -> bool:
        return all(end <= left or start >= right for left, right in occupied)

    def add_amount(token: str, multiplier: float) -> None:
        values.add(str(int(round(float(token.replace(",", "")) * multiplier))))

    numbered = text or ""
    numbered = numbered.replace("，", ",")
    patterns: tuple[tuple[str, str], ...] = (
        (r"(\d[\d,]*)\s*亿(?:\s*(\d[\d,]*)\s*万)?", "yi"),
        (r"(\d[\d,]*)\s*万(?:\s*(\d{1,4})(?!\d))?", "wan"),
        (r"(?:S\$|\$)\s*(\d[\d,]*(?:\.\d+)?)(?:\s*(million|billion|mil\b))?", "dollar"),
        (r"(\d[\d,]*(?:\.\d+)?)\s*(million|billion|mil\b)", "unit"),
        (r"(\d[\d,]*(?:\.\d+)?)\s*(?:%|％|percent|per cent)", "percent"),
        (r"\d[\d,]*(?:\.\d+)?", "plain"),
    )
    for pattern, kind in patterns:
        for match in re.finditer(pattern, numbered, flags=re.I):
            if not free(match.start(), match.end()):
                continue
            occupied.append((match.start(), match.end()))
            if kind == "yi":
                amount = float(match.group(1).replace(",", "")) * 100_000_000
                if match.group(2):
                    amount += float(match.group(2).replace(",", "")) * 10_000
                values.add(str(int(round(amount))))
            elif kind == "wan":
                amount = float(match.group(1).replace(",", "")) * 10_000
                if match.group(2):
                    amount += float(match.group(2).replace(",", ""))
                values.add(str(int(round(amount))))
            elif kind in {"dollar", "unit"}:
                unit = (match.group(2) or "").lower()
                multiplier = {"million": 1_000_000, "mil": 1_000_000, "billion": 1_000_000_000}.get(unit, 1)
                add_amount(match.group(1), multiplier)
            elif kind == "percent":
                values.add(match.group(1).replace(",", "") + "%")
            else:
                values.add(match.group(0).replace(",", ""))
    return values


def _numbers_ok(text: str, source: str) -> bool:
    return canonical_numbers(text) <= canonical_numbers(source)


def _pasted(point: str, source: str) -> bool:
    folded = re.sub(r"\s+", " ", point or "").strip().lower()
    if len(folded) < 80:
        return False
    return folded in re.sub(r"\s+", " ", source or "").lower()


def _point_ok(point: str, source: str) -> bool:
    text = re.sub(r"\s+", " ", point or "").strip()
    if not (12 <= len(text) <= 500):
        return False
    if _URL_RE.search(text):
        return False
    low = text.lower()
    if any(low.startswith(prefix) or text.startswith(prefix) for prefix in _ADVICE_STARTS):
        return False
    if any(bit in low or bit in text for bit in _BOILER_BITS):
        return False
    if "headline does not" in low or "标题没有" in text or "标题并未" in text:
        return False
    if not _numbers_ok(text, source):
        return False
    if _pasted(text, source):
        return False
    return True


def _clip(text: str, limit: int = 158) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(".,;:")
    return (cut or text[:limit].rstrip(".,;:")) + "."


def review_model_brief(payload: dict, source_text: str) -> dict | None:
    """Keep a model reply only when its points stay inside the opened article."""
    if not isinstance(payload, dict):
        return None
    blob = json.dumps(payload, ensure_ascii=False)
    if _URL_RE.search(blob):
        return None
    english = payload.get("keypoints")
    chinese = payload.get("zh_keypoints")
    if not isinstance(english, list) or not isinstance(chinese, list):
        return None
    kept_en: list[str] = []
    kept_zh: list[str] = []
    for point, twin in zip(english, chinese):
        point = str(point).strip()
        twin = str(twin).strip()
        if not _point_ok(point, source_text) or not _point_ok(twin, source_text):
            continue
        if not has_cjk(twin):
            continue
        kept_en.append(point)
        kept_zh.append(twin)
        if len(kept_en) >= MAX_POINTS:
            break
    if len(kept_en) < MIN_POINTS:
        return None
    question = re.sub(r"\s+", " ", str(payload.get("question") or "")).strip()
    zh_question = re.sub(r"\s+", " ", str(payload.get("zh_question") or "")).strip()
    if (
        not question
        or not zh_question
        or not has_cjk(zh_question)
        or len(question) > 220
        or len(zh_question) > 220
        or any(phrase in question.lower() for phrase in _PUSH)
        or any(phrase in zh_question for phrase in _PUSH)
        or not _numbers_ok(question, source_text)
        or not _numbers_ok(zh_question, source_text)
    ):
        question = GENERIC_QUESTION
        zh_question = GENERIC_QUESTION_ZH
    zh_title = re.sub(r"\s+", " ", str(payload.get("zh_title") or "")).strip()
    if not has_cjk(zh_title) or len(zh_title) > 120 or _URL_RE.search(zh_title):
        zh_title = ""
    return {
        "keypoints": kept_en,
        "zh_keypoints": kept_zh,
        "question": question,
        "zh_question": zh_question,
        "zh_title": zh_title,
        "description": _clip(" ".join(kept_en[:2])),
    }


def apply_brief(entry: dict, brief: dict) -> None:
    """Replace the headline draft's visible points. Summaries and facts stay."""
    entry["keypoints"] = brief["keypoints"]
    entry["questions"] = [brief["question"]]
    entry["description"] = brief["description"]
    zh = entry.get("zh")
    if not isinstance(zh, dict):
        zh = {}
        entry["zh"] = zh
    zh["keypoints"] = brief["zh_keypoints"]
    zh["questions"] = [brief["zh_question"]]
    if brief.get("zh_title"):
        zh["title"] = brief["zh_title"]


def _parse_model_text(text: str) -> dict:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", cleaned, flags=re.S).strip()
    data = json.loads(cleaned)
    if not isinstance(data, dict):
        raise ValueError("model JSON was not an object")
    return data


def parse_model_response(raw: dict) -> dict:
    if isinstance(raw.get("output_text"), str) and raw["output_text"].strip():
        return _parse_model_text(raw["output_text"])
    for item in raw.get("output") or []:
        if not isinstance(item, dict) or item.get("type") != "message":
            continue
        for part in item.get("content") or []:
            if isinstance(part, dict) and part.get("type") == "output_text" and part.get("text"):
                return _parse_model_text(str(part["text"]))
    raise ValueError("model response had no text")


def call_model(title: str, source_name: str, article: str) -> dict:
    key = os.environ.get("XAI_API_KEY", "").strip()
    if not key:
        raise RuntimeError("missing key")
    payload = {
        "model": MODEL,
        "store": False,
        "input": [
            {"role": "system", "content": _SYSTEM},
            {
                "role": "user",
                "content": (
                    f"Publisher: {source_name or 'Property news'}\n"
                    f"Headline: {title}\n\n"
                    f"Article text:\n{article[:MAX_ARTICLE_CHARS]}"
                ),
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "article_points",
                "strict": True,
                "schema": _SCHEMA,
            }
        },
    }
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120, context=ssl.create_default_context()) as res:
            raw = json.loads(res.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as exc:
        try:
            detail = exc.read().decode("utf-8", "replace")
            detail = json.loads(detail).get("error", detail) if detail.lstrip().startswith("{") else detail
        except Exception:
            detail = ""
        detail = " ".join(str(detail).split())[:160]
        raise RuntimeError(f"HTTP {exc.code}: {detail}" if detail else f"HTTP {exc.code}") from None
    return parse_model_response(raw)


def fill_article_points(items: list[dict], book: dict) -> bool:
    """Call the model once per new article that opened. Return True when copy changed."""
    pending = stories_awaiting_points(items, book)
    if not pending:
        return False
    if not os.environ.get("XAI_API_KEY", "").strip():
        print(
            "XAI_API_KEY is not set. "
            "New articles stay as headline drafts until that secret is added."
        )
        return False
    changed = False
    for item in pending:
        story_id = str(item.get("id") or "")
        title = item.get("title") or ""
        entry = book.get(story_id) if isinstance(book, dict) else None
        if not isinstance(entry, dict) or not is_headline_only(entry, title):
            continue
        try:
            text = opened_article_text(str(item.get("article_url") or ""), title)
        except Exception:
            print(f"left headline draft {story_id}: could not open the article")
            continue
        if not text:
            print(f"left headline draft {story_id}: article page did not open")
            continue
        try:
            payload = call_model(title, str(item.get("sourceName") or ""), text)
            brief = review_model_brief(payload, f"{title}\n{text}")
        except Exception as exc:
            reason = (str(exc) or type(exc).__name__)[:200]
            print(f"left headline draft {story_id}: model call failed ({reason})")
            continue
        if not brief:
            print(f"left headline draft {story_id}: model output was not usable")
            continue
        apply_brief(entry, brief)
        changed = True
        print(f"wrote {len(brief['keypoints'])} key points for {story_id}")
    return changed


def self_check() -> list[str]:
    failed: list[str] = []
    title = "Singapore's 99 Year HDB Lease: Why The Clock Does Not Reset"
    curly = "Singapore’s 99 Year HDB Lease: Why The Clock Does Not Reset."
    if not point_is_filler(curly, title):
        failed.append("a headline point should count as filler")
    draft = {
        "keypoints": [
            curly,
            "Figures named in the headline: 99 year.",
        ]
    }
    if not is_headline_only(draft, title):
        failed.append("a headline draft should be headline-only")
    if is_headline_only({"keypoints": []}, title):
        failed.append("an empty keypoint list is not headline-only")
    if not is_headline_only(None, title):
        failed.append("a missing brief is headline-only")
    real = {"keypoints": ["The Esta two-bedroom median rent is $5,300 a month."]}
    if is_headline_only(real, "How To Tell If A Singapore Condo Is Really A Good Rental Investment"):
        failed.append("a real point is not headline-only")
    direct = choose_article_url(
        "https://news.google.com/rss/articles/CBMi-example",
        "https://www.businesstimes.com.sg/property/example-plot",
    )
    if "businesstimes.com" not in direct:
        failed.append("a publisher URL should replace a Google News token")
    if choose_article_url(direct, "https://news.google.com/rss/articles/CBMi-other") != direct:
        failed.append("a Google News token should not replace a publisher URL")
    if caption_article_url("See https://t.me/s/PropNexPropertyNewsUpdate and https://www.straitstimes.com/singapore/housing/example"):
        kept = caption_article_url(
            "See https://t.me/s/PropNexPropertyNewsUpdate and https://www.straitstimes.com/singapore/housing/example"
        )
        if "straitstimes.com" not in kept or "t.me" in kept:
            failed.append("a caption should keep the publisher link only")
    else:
        failed.append("a caption should find the publisher link")
    window = (
        '<a href="/property">Property</a>'
        '<a href="/subscribe">Subscribe</a>'
        '<a href="https://www.businesstimes.com.sg/login">Log in</a>'
        '<a href="https://www.businesstimes.com.sg/property/hong-leong-example-plot">Story</a>'
    )
    picked = pick_article_href(window, "https://www.businesstimes.com.sg/property/residential")
    if picked != "https://www.businesstimes.com.sg/property/hong-leong-example-plot":
        failed.append("card window should pick the article href")
    mixed = window + '<a href="https://www.businesstimes.com.sg/property/a-much-longer-unrelated-kitchen-fire-story">Other</a>'
    matched = pick_article_href(mixed, "https://www.businesstimes.com.sg/property/residential", "Hong Leong example plot draws a top bid")
    if matched != "https://www.businesstimes.com.sg/property/hong-leong-example-plot":
        failed.append("card window should prefer the href that matches the headline")
    if pick_article_href(mixed, "https://www.businesstimes.com.sg/property/residential", "Canberra Drive site draws a record bid"):
        failed.append("a card window should not guess a link for a different headline")
    source = (
        "For example, two-bedroom units at The Esta usually fetch a median rent of "
        "$5,300 per month and the median resale price is $2.78 million, so the gross "
        "yield was just 2.29 percent in the East Coast."
    )
    brief = review_model_brief(
        {
            "keypoints": [
                "Two-bedroom units at The Esta have a median rent of $5,300 a month.",
                "The same comparison puts the median resale price at $2.78 million.",
                "That pair works out to a gross yield of 2.29 percent.",
                "The price is $9,999,999.",
            ],
            "zh_keypoints": [
                "The Esta 的两房单位，租金中位数是每月5300新元。",
                "同一组比较里，转售价中位数是278万新元。",
                "这组数字对应的毛回报率是2.29%。",
                "价钱是9999999新元。",
            ],
            "question": "Buy now before this yield moves?",
            "zh_question": "要立即购买吗？",
            "zh_title": "怎样判断一套公寓适不适合收租",
        },
        source,
    )
    if not brief or len(brief["keypoints"]) != 3:
        failed.append("unknown figures should be dropped and three real points kept")
    elif brief["question"] != GENERIC_QUESTION or brief["zh_question"] != GENERIC_QUESTION_ZH:
        failed.append("a buy-now question should fall back to the generic question")
    pasted = source
    rejected = review_model_brief(
        {
            "keypoints": [pasted, pasted, pasted],
            "zh_keypoints": [pasted, pasted, pasted],
            "question": GENERIC_QUESTION,
            "zh_question": GENERIC_QUESTION_ZH,
            "zh_title": "标题",
        },
        source,
    )
    if rejected is not None:
        failed.append("pasted sentences should be rejected")
    linked = review_model_brief(
        {
            "keypoints": [
                "See https://example.com/story for the rent.",
                "The rent is $5,300.",
                "The price is $2.78 million.",
            ],
            "zh_keypoints": ["链接", "租金", "价钱"],
            "question": GENERIC_QUESTION,
            "zh_question": GENERIC_QUESTION_ZH,
            "zh_title": "标题",
        },
        source,
    )
    if linked is not None:
        failed.append("a URL in the model output should be rejected")
    sample = (
        "<html><article><p>Search Sign In and other short navigation.</p>"
        "<p>For example, two-bedroom units at The Esta usually fetch a median rent of "
        "$5,300 per month, against a median resale price of $2.78 million.</p>"
        "<p>Subscribe to read the rest of this story and get access to the newsletter.</p>"
        "<p>Meanwhile in other property news, a different project sold ten units.</p>"
        "<p>This later paragraph should not be included in the extracted article text at all.</p>"
        "</article></html>"
    )
    extracted = article_text(sample)
    if "$5,300" not in extracted or "Subscribe" in extracted or "later paragraph" in extracted:
        failed.append("article text should keep the body and drop promo and related copy")
    if not _numbers_ok("181万8000新元", "The house sold for S$1.818 million."):
        failed.append("1.818 million should allow 181万8000新元")
    if not _numbers_ok("1亿5300万新元", "The land price was $153 million."):
        failed.append("153 million should allow 1亿5300万新元")
    if _numbers_ok("78万新元", "The price was $2.78 million."):
        failed.append("2.78 million must not allow 78万")
    if not title_overlaps(
        "How To Tell If A Singapore Condo Is Really A Good Rental Investment",
        "The Esta condo rental yield is the question in this investment piece.",
    ):
        failed.append("the opened page should share distinctive title words")
    if title_overlaps("Canberra Drive EC site draws a record bid", "A kitchen fire on a different estate."):
        failed.append("an unrelated page should not pass the title check")
    return failed


if __name__ == "__main__":
    problems = self_check()
    if problems:
        raise SystemExit("article point self-check failed:\n" + "\n".join(problems))
    print("self-check ok")
