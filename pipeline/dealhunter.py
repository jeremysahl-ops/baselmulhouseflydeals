#!/usr/bin/env python3
"""
BaselMulhouseFlyDeals — Deal Hunter (version corrigée, branche fix-benchmark)

Remplace le calcul « de tête » fait par l'agent LLM OpenClaw `gflights` :
toute la décision publier / ne pas publier est ici, en code, testée.

Différences avec ~/.openclaw/workspace/dealhunter.py (version du 16/03/2026) :
  - Aucun secret dans le code : tout vient des variables d'environnement.
  - --dry-run par défaut : rien n'est écrit tant qu'on ne passe pas --publish.
  - Remise minimale obligatoire (MIN_DISCOUNT_PCT, 5 % par défaut) : un prix
    à 1-3 % sous le benchmark n'est plus un « deal ».
  - Plus de delete_all_deals() au démarrage (il supprimait TOUS les deals actifs).
  - Noms de destinations alignés sur la table destination_benchmarks
    (l'agent utilisait « GrandeCanarie » / « Majorque », introuvables en base).

Usage :
  export SUPABASE_URL=... SUPABASE_SERVICE_KEY=... TRAVELPAYOUTS_TOKEN=...
  python3 dealhunter.py                # dry-run : affiche ce qui serait publié
  python3 dealhunter.py --publish      # écrit dans Supabase (+ Telegram si configuré)
"""

from __future__ import annotations

import argparse
import calendar
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime

MIN_DISCOUNT_PCT = int(os.environ.get("MIN_DISCOUNT_PCT", "5"))
ORIGIN = "BSL"
KIWI_AFFILID = os.environ.get("KIWI_AFFILID", "707798")

# Nom = exactement la valeur de destination_benchmarks.destination
DESTINATIONS = {
    "Agadir": ("AGA", "agadir-maroc"), "Alicante": ("ALC", "alicante-espagne"),
    "Amsterdam": ("AMS", "amsterdam-pays-bas"), "Antalya": ("AYT", "antalya-turquie"),
    "Athenes": ("ATH", "athenes-grece"), "Barcelone": ("BCN", "barcelone-espagne"),
    "Belgrade": ("BEG", "belgrade-serbie"), "Berlin": ("BER", "berlin-allemagne"),
    "Bucarest": ("OTP", "bucarest-roumanie"), "Budapest": ("BUD", "budapest-hongrie"),
    "Casablanca": ("CMN", "casablanca-maroc"), "Copenhague": ("CPH", "copenhague-danemark"),
    "Cracovie": ("KRK", "cracovie-pologne"), "Djerba": ("DJE", "djerba-tunisie"),
    "Dublin": ("DUB", "dublin-irlande"), "Dubrovnik": ("DBV", "dubrovnik-croatie"),
    "Edimbourg": ("EDI", "edimbourg-royaume-uni"), "Faro": ("FAO", "faro-portugal"),
    "Fuerteventura": ("FUE", "fuerteventura-espagne"),
    "Grande Canarie": ("LPA", "las-palmas-espagne"), "Hambourg": ("HAM", "hambourg-allemagne"),
    "Heraklion": ("HER", "heraklion-grece"), "Hurghada": ("HRG", "hurghada-egypte"),
    "Ibiza": ("IBZ", "ibiza-espagne"), "Istanbul": ("IST", "istanbul-turquie"),
    "Lanzarote": ("ACE", "lanzarote-espagne"), "Lisbonne": ("LIS", "lisbonne-portugal"),
    "Londres": ("LHR", "londres-royaume-uni"), "Madrid": ("MAD", "madrid-espagne"),
    "Malaga": ("AGP", "malaga-espagne"), "Manchester": ("MAN", "manchester-royaume-uni"),
    "Marrakech": ("RAK", "marrakech-maroc"), "Marseille": ("MRS", "marseille-france"),
    "Munich": ("MUC", "munich-allemagne"), "Mykonos": ("JMK", "mykonos-grece"),
    "Naples": ("NAP", "naples-italie"), "Nice": ("NCE", "nice-france"),
    "Oslo": ("OSL", "oslo-norvege"), "Palma de Mallorca": ("PMI", "palma-de-majorque-espagne"),
    "Paris": ("CDG", "paris-france"), "Porto": ("OPO", "porto-portugal"),
    "Prague": ("PRG", "prague-republique-tcheque"), "Rhodes": ("RHO", "rhodes-grece"),
    "Rome": ("FCO", "rome-italie"), "Sofia": ("SOF", "sofia-bulgarie"),
    "Split": ("SPU", "split-croatie"), "Tenerife": ("TFS", "tenerife-espagne"),
    "Tunis": ("TUN", "tunis-tunisie"), "Varsovie": ("WAW", "varsovie-pologne"),
    "Venise": ("VCE", "venise-italie"), "Vienne": ("VIE", "vienne-autriche"),
    "Zagreb": ("ZAG", "zagreb-croatie"),
    # Dubai, Montreal, Singapour : pas de benchmark en base -> retirés (ils étaient toujours SKIP).
}

DEFAULT_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"


# ─── Logique métier pure (testée dans test_dealhunter.py) ─────────────────────

def get_season(month: int) -> str:
    if month in (3, 4, 5):
        return "printemps"
    if month in (6, 7, 8):
        return "ete"
    if month in (9, 10, 11):
        return "automne"
    return "hiver"


def get_score(discount_pct: int) -> int:
    if discount_pct >= 40:
        return 5
    if discount_pct >= 25:
        return 4
    if discount_pct >= 15:
        return 3
    if discount_pct >= 5:
        return 2
    return 1


@dataclass(frozen=True)
class Verdict:
    publish: bool
    reason: str
    discount_pct: int | None = None
    score: int | None = None


def evaluate(price, avg_price, min_discount_pct: int = MIN_DISCOUNT_PCT) -> Verdict:
    """Décide si un prix est un deal publiable. Seul endroit où la règle vit."""
    if avg_price is None:
        return Verdict(False, "no_benchmark")
    try:
        price = float(price)
        avg_price = float(avg_price)
    except (TypeError, ValueError):
        return Verdict(False, "invalid_price")
    if avg_price <= 0 or price <= 0:
        return Verdict(False, "invalid_price")
    if price >= avg_price:
        return Verdict(False, "above_benchmark")
    discount = round((avg_price - price) / avg_price * 100)
    if discount < min_discount_pct:
        return Verdict(False, "below_min_discount", discount, get_score(discount))
    return Verdict(True, "ok", discount, get_score(discount))


def deal_type(duration_days: int) -> str | None:
    if 2 <= duration_days <= 4:
        return "weekend"
    if 5 <= duration_days <= 8:
        return "evasion"
    if 10 <= duration_days <= 15:
        return "longue_escapade"
    return None


CATEGORY = {"weekend": "city-trip", "evasion": "vol", "longue_escapade": "sejour"}


def parse_dates(flight: dict) -> tuple[str, str] | None:
    """(départ, retour) au format YYYY-MM-DD, ou None si ce n'est pas un aller-retour exploitable.

    L'ancien code inventait un retour à J+7 quand return_at manquait : un prix aller simple
    pouvait alors être publié comme « A/R ». On refuse désormais ces vols.
    """
    dep = (flight.get("departure_at") or "")[:10]
    ret = (flight.get("return_at") or "")[:10]
    if not dep or not ret:
        return None
    try:
        if datetime.strptime(ret, "%Y-%m-%d") <= datetime.strptime(dep, "%Y-%m-%d"):
            return None
    except ValueError:
        return None
    return dep, ret


def add_months(dt: datetime, months: int) -> datetime:
    m = dt.month - 1 + months
    y = dt.year + m // 12
    m = m % 12 + 1
    return dt.replace(year=y, month=m, day=min(dt.day, calendar.monthrange(y, m)[1]))


# ─── I/O ──────────────────────────────────────────────────────────────────────

def env(name: str, required: bool = True) -> str | None:
    v = os.environ.get(name)
    if required and not v:
        sys.exit(f"Variable d'environnement manquante : {name}")
    return v


def http_json(url, headers=None, data=None, method="GET"):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            raw = r.read().decode()
            return r.status, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()
    except Exception as e:  # réseau, timeout…
        return None, str(e)


class Supabase:
    def __init__(self, url: str, key: str):
        self.url = url.rstrip("/")
        self.h = {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"}

    def benchmarks(self) -> dict[tuple[str, str], float]:
        status, rows = http_json(f"{self.url}/rest/v1/destination_benchmarks?select=destination,season,avg_price", self.h)
        if status != 200 or not isinstance(rows, list):
            sys.exit(f"Impossible de lire destination_benchmarks ({status}): {rows}")
        out: dict[tuple[str, str], float] = {}
        for r in rows:
            k = (r["destination"], r["season"])
            if k in out:
                sys.exit(f"Benchmark en double pour {k} : corrige la table avant de publier.")
            out[k] = r["avg_price"]
        return out

    def is_duplicate(self, dest: str, dep: str, price) -> bool:
        q = urllib.parse.urlencode({"destination": f"eq.{dest}", "departure_date": f"eq.{dep}",
                                    "price": f"eq.{price}", "is_active": "eq.true", "select": "id"})
        status, rows = http_json(f"{self.url}/rest/v1/deals?{q}", self.h)
        return status == 200 and bool(rows)

    def insert(self, deal: dict) -> bool:
        status, body = http_json(f"{self.url}/rest/v1/deals", {**self.h, "Prefer": "return=minimal"}, deal, "POST")
        if status not in (200, 201):
            print(f"  ❌ insertion {deal['destination']} {deal['departure_date']}: {status} {body}")
            return False
        return True


def send_telegram(text: str) -> None:
    bot, chat = env("TELEGRAM_BOT_TOKEN", False), env("TELEGRAM_CHAT_ID", False)
    if bot and chat:
        http_json(f"https://api.telegram.org/bot{bot}/sendMessage", {"Content-Type": "application/json"},
                  {"chat_id": chat, "text": text}, "POST")


# ─── Pipeline ─────────────────────────────────────────────────────────────────

def scan_months(today: date, n: int = 9) -> list[str]:
    start = datetime(today.year, today.month, 1)
    return [add_months(start, i).strftime("%Y-%m") for i in range(1, n + 1)]


def run(publish: bool) -> dict:
    sb = Supabase(env("SUPABASE_URL"), env("SUPABASE_SERVICE_KEY"))
    token = env("TRAVELPAYOUTS_TOKEN")
    bench = sb.benchmarks()
    stats = {k: 0 for k in ("scanned", "published", "would_publish", "no_benchmark",
                            "above_benchmark", "below_min_discount", "invalid_price",
                            "bad_duration", "not_round_trip", "duplicate")}
    seen: set = set()

    for dest, (iata, slug) in DESTINATIONS.items():
        for month in scan_months(date.today()):
            stats["scanned"] += 1
            q = urllib.parse.urlencode({"origin": ORIGIN, "destination": iata, "currency": "eur",
                                        "depart_date": month, "token": token})
            status, data = http_json(f"https://api.travelpayouts.com/v1/prices/cheap?{q}")
            time.sleep(0.2)
            if status != 200 or not isinstance(data, dict) or not data.get("success"):
                continue
            for flights in (data.get("data") or {}).values():
                for f in flights.values():
                    price = f.get("price")
                    dates = parse_dates(f)
                    if not price:
                        continue
                    if not dates:
                        stats["not_round_trip"] += 1
                        continue
                    dep, ret = dates
                    if (dest, dep, ret, price) in seen:
                        continue
                    seen.add((dest, dep, ret, price))

                    duration = (datetime.strptime(ret, "%Y-%m-%d") - datetime.strptime(dep, "%Y-%m-%d")).days
                    dtype = deal_type(duration)
                    if not dtype:
                        stats["bad_duration"] += 1
                        continue

                    month_num = int(dep[5:7])
                    season = get_season(month_num)
                    avg = bench.get((dest, season))
                    v = evaluate(price, avg)
                    if not v.publish:
                        stats[v.reason] += 1
                        if v.reason in ("above_benchmark", "below_min_discount"):
                            print(f"  · ignoré {dest} {season} {price}€ vs {avg}€ ({v.reason})")
                        continue
                    if sb.is_duplicate(dest, dep, price):
                        stats["duplicate"] += 1
                        continue

                    link = f"https://www.kiwi.com/fr/search/results/bale-suisse/{slug}/{dep}/{ret}/?affilid={KIWI_AFFILID}"
                    deal = {
                        "title": f"✈️ {dest} à {price}€ A/R depuis Bâle",
                        "destination": dest, "price": price,
                        "airline": f.get("airline", ""), "company": f.get("airline", ""),
                        "category": CATEGORY[dtype],
                        "departure_date": dep, "return_date": ret, "duration_days": duration,
                        "month_departure": month_num, "season": season,
                        "discount_percentage": v.discount_pct,
                        "score_ai": v.score, "score_final": v.score, "deal_score": v.score,
                        "deal_url": link, "link": link, "image_url": DEFAULT_IMAGE,
                        "is_active": True, "status": "active", "source": "travelpayouts",
                    }
                    if not publish:
                        stats["would_publish"] += 1
                        print(f"  [dry-run] {deal['title']} (-{v.discount_pct}% vs {avg}€)")
                        continue
                    if sb.insert(deal):
                        stats["published"] += 1
                        print(f"  ✅ {deal['title']} (-{v.discount_pct}%)")
                        if v.score >= 4:
                            send_telegram(f"🔥 {dest} à {price}€ A/R -{v.discount_pct}% Score:{v.score}/5\n{link}")

    summary = "Run terminé" + (" (dry-run)" if not publish else "") + " | " + \
              " | ".join(f"{k}: {n}" for k, n in stats.items())
    print("\n" + summary)
    if publish:
        send_telegram(summary)
    return stats


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--publish", action="store_true", help="écrit réellement dans Supabase")
    run(publish=ap.parse_args().publish)
