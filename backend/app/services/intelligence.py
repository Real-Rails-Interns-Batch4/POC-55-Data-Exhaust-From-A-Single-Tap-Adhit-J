from __future__ import annotations

import json
import os
import time
from pathlib import Path
from urllib.error import URLError
from urllib.parse import quote_plus
from urllib.request import Request, urlopen


BASE_DIR = Path(__file__).resolve().parents[3]

SOURCE_CACHE_TTL_SECONDS = 15 * 60
SOURCE_CACHE: dict[str, tuple[float, dict[str, str]]] = {}


def _get_cached_source(name: str):
    cached = SOURCE_CACHE.get(name)
    if not cached:
        return None

    cached_at, payload = cached
    if time.time() - cached_at > SOURCE_CACHE_TTL_SECONDS:
        SOURCE_CACHE.pop(name, None)
        return None

    return payload


def _store_cached_source(name: str, payload: dict[str, str]):
    SOURCE_CACHE[name] = (time.time(), payload)


def _fetch_json(url: str, timeout: int = 10, headers: dict[str, str] | None = None):
    request = Request(url, headers=headers or {})

    with urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def _mock_sources():
    return [
        {
            "name": "CFPB",
            "full": "Consumer Financial Protection Bureau",
            "desc": "Consumer complaint and demand intelligence. Uses mock data when the CFPB service is unavailable.",
            "color": "#34D399",
            "bg": "rgba(52,211,153,0.08)",
            "border": "rgba(52,211,153,0.2)",
            "icon": "🏛",
            "status": "MOCK",
            "summary": "Offline fallback enabled. Complaint snapshots come from local mock data.",
        },
        {
            "name": "GDELT",
            "full": "Global Database of Events, Language & Tone",
            "desc": "Global events and influence monitoring. Uses mock data when the GDELT service is unavailable.",
            "color": "#38BDF8",
            "bg": "rgba(56,189,248,0.08)",
            "border": "rgba(56,189,248,0.2)",
            "icon": "🌐",
            "status": "MOCK",
            "summary": "Offline fallback enabled. Event snapshots come from local mock data.",
        },
        {
            "name": "Synthetic",
            "full": "Synthetic Event Feed",
            "desc": "Demonstration sequence of SDK, location, ad-network and partner interactions based on real-world behavioral patterns.",
            "color": "#FBBF24",
            "bg": "rgba(251,191,36,0.08)",
            "border": "rgba(251,191,36,0.2)",
            "icon": "⚗",
            "status": "MOCK",
            "summary": "Always available for the tap-to-partner visualization.",
        },
    ]


def _mock_intelligence():
    return {
        "title": "Data Exhaust from a Single Tap",
        "metric": {
            "partnersTouched": 5,
        },
        "whyThisMatters": "A single tap can trigger multiple downstream data-sharing events across SDKs, ad networks, and analytics providers.",
        "whoControls": "Mobile platforms, analytics SDK providers, ad networks and data brokers influence how interaction data moves across the ecosystem.",
        "privacyImplications": [
            "Location exposure through third-party SDKs",
            "Device fingerprinting across advertising networks",
            "Behavioral profiling based on interaction patterns",
        ],
        "mitigationTips": [
            "Limit location permissions",
            "Disable ad personalization",
            "Review third-party app permissions",
            "Use privacy-focused alternatives when possible",
        ],
        "sources": _mock_sources(),
    }


def _fetch_cfpb_source():
    cached = _get_cached_source("CFPB")
    if cached:
        return cached

    cfpb_url = os.environ.get("CFPB_API_URL", "https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/")
    payload = _fetch_json(cfpb_url, timeout=8)
    hits = payload.get("hits", {})
    aggregations = payload.get("aggregations", {})

    complaint = (hits.get("hits") or [{}])[0].get("_source", {})
    top_products = []
    for bucket in (aggregations.get("product", {}).get("product", {}).get("buckets") or [])[:3]:
        top_products.append(f"{bucket.get('key')} ({bucket.get('doc_count'):,})")

    summary = (
        f"{hits.get('total', {}).get('value', 0):,} complaints in the live CFPB index. "
        f"Latest example: {complaint.get('company', 'Unknown company')} - {complaint.get('product', 'Unknown product')}"
    )

    if top_products:
        summary = f"{summary}. Top categories: {', '.join(top_products)}."

    source = {
        "name": "CFPB",
        "full": "Consumer Financial Protection Bureau",
        "desc": "Consumer complaint and demand intelligence. Pulls live complaint index data when the internet is available.",
        "color": "#34D399",
        "bg": "rgba(52,211,153,0.08)",
        "border": "rgba(52,211,153,0.2)",
        "icon": "🏛",
        "status": "LIVE",
        "summary": summary,
    }

    _store_cached_source("CFPB", source)
    return source


def _fetch_gdelt_source():
    cached = _get_cached_source("GDELT")
    if cached:
        return cached

    query = quote_plus("privacy")
    payload = None
    last_error = None

    gdelt_url = os.environ.get("GDELT_API_URL", "https://api.gdeltproject.org/api/v2/doc/doc")

    for timeout in (20, 30):
        try:
            payload = _fetch_json(
                f"{gdelt_url}?query={query}&mode=ArtList&maxrecords=1&format=json",
                timeout=timeout,
                headers={"User-Agent": "Mozilla/5.0"},
            )
            break
        except (URLError, TimeoutError) as exc:
            last_error = exc

    if payload is None:
        raise last_error or TimeoutError("Unable to fetch live GDELT data")

    articles = payload.get("articles") or []
    article = articles[0] if articles else {}

    summary = (
        f"Latest article: {article.get('title', 'No recent article')}"
    )
    if article.get("domain"):
        summary = f"{summary} from {article['domain']}"
    if article.get("seendate"):
        summary = f"{summary} on {article['seendate']}"

    source = {
        "name": "GDELT",
        "full": "Global Database of Events, Language & Tone",
        "desc": "Global events and influence monitoring. Pulls live event and media snapshots when the internet is available.",
        "color": "#38BDF8",
        "bg": "rgba(56,189,248,0.08)",
        "border": "rgba(56,189,248,0.2)",
        "icon": "🌐",
        "status": "LIVE",
        "summary": summary,
    }

    _store_cached_source("GDELT", source)
    return source


def _fetch_sources():
    sources = _mock_sources()

    try:
        sources[0] = _fetch_cfpb_source()
    except (URLError, TimeoutError, json.JSONDecodeError, KeyError, IndexError, ValueError):
        pass

    try:
        sources[1] = _fetch_gdelt_source()
    except (URLError, TimeoutError, json.JSONDecodeError, KeyError, IndexError, ValueError):
        pass

    return sources


def build_sidebar_data():
    data = _mock_intelligence()
    data["sources"] = _fetch_sources()
    return data