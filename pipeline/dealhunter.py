#!/usr/bin/env python3
"""
BaselMulhouseFlyDeals — Deal Hunter v2

Cherche des allers-retours DIRECTS au départ de Bâle-Mulhouse, les compare au prix de
référence de la destination (table destination_benchmarks) et synchronise la table deals.

Règles (toutes testées dans test_dealhunter.py) :
  - vol direct à l'aller ET au retour, aller-retour uniquement ;
  - prix < prix de référence ET remise >= MIN_DISCOUNT_PCT (15 % par défaut) ;
  - au plus MAX_PER_DESTINATION deals par destination, sur des mois différents ;
  - lien de réservation = deep link Kiwi officiel (affilid Travelpayouts complet) ;
  - synchronisation : un deal retrouvé est mis à jour, un nouveau est inséré, un deal
    non retrouvé est retiré quand sa validité (expires_at) est dépassée.

Source : Travelpayouts /aviasales/v3/prices_for_dates (prix vus par des voyageurs dans les
dernières 48 h : ce sont des prix constatés, pas garantis).

Usage :
  export SUPABASE_URL=... SUPABASE_SERVICE_KEY=... TRAVELPAYOUTS_TOKEN=...
  python3 dealhunter.py                # dry-run : affiche ce qui serait fait, n'écrit rien
  python3 dealhunter.py --publish      # écrit dans Supabase (+ Telegram si configuré)
"""

from __future__ import annotations

import argparse
import calendar
import json
import os
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone

MIN_DISCOUNT_PCT = int(os.environ.get("MIN_DISCOUNT_PCT", "15"))
MAX_PER_DESTINATION = int(os.environ.get("MAX_PER_DESTINATION", "3"))
# Les prix de référence de la table destination_benchmarks datent d'avant la hausse générale des
# tarifs aériens de 2026. Décision du propriétaire du site (14/11/2026) : les relever de 25 %.
# La table n'est pas modifiée : remettre 1.0 ici (ou BENCHMARK_FACTOR=1.0) annule le relèvement.
BENCHMARK_FACTOR = float(os.environ.get("BENCHMARK_FACTOR", "1.25"))
DEAL_TTL_DAYS = 5          # un deal non retrouvé reste affiché au plus 5 jours
SCAN_MONTHS = 9
ORIGIN = "BSL"
# Identifiant d'affiliation Kiwi fourni par Travelpayouts (visible dans tout lien kiwi.tpx.gr :
# ce n'est pas un secret). L'ancien code envoyait seulement « 707798 », que Kiwi ne peut pas
# rattacher au compte : les clics n'étaient très probablement pas comptés.
_TP_MARKER = "488de323a4ee43df95eb88630-707798"
KIWI_AFFILID = os.environ.get("KIWI_AFFILID", f"travelpayoutsdeeplink_www.baselmulhouseflydeals.com_{_TP_MARKER}")
KIWI_SUB1 = os.environ.get("KIWI_SUB1", _TP_MARKER)

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


# Colonnes réelles de public.deals (lues le 12/11/2026). Pas de `company` ni de `link` :
# les envoyer fait échouer l'insertion (PGRST204). Le site retombe sur airline / deal_url.
DEAL_COLUMNS = frozenset({
    "airline", "category", "created_at", "deal_score", "deal_url", "departure_city",
    "departure_date", "description", "destination", "discount_percentage", "duration_days",
    "expires_at", "hotel_rating", "hotel_stars", "id", "image_url", "insider_tip", "is_active",
    "is_featured", "is_school_holiday", "month_departure", "original_price", "price",
    "price_average_estimated", "price_per_night", "return_date", "score_ai", "score_editor",
    "score_final", "season", "source", "status", "title",
})


DISPLAY_NAMES = {"Athenes": "Athènes", "Edimbourg": "Édimbourg", "Heraklion": "Héraklion",
                 "Palma de Mallorca": "Palma de Majorque", "Malaga": "Málaga"}


def booking_link(iata: str, dep: str, ret: str) -> str:
    """Deep link Kiwi officiel : recherche pré-remplie, vols directs, attribuée au compte Travelpayouts."""
    q = urllib.parse.urlencode({
        "affilid": KIWI_AFFILID, "sub1": KIWI_SUB1, "lang": "fr", "currency": "eur",
        "from": ORIGIN, "to": iata, "departure": dep, "return": ret, "stopNumber": 0,
    })
    return f"https://www.kiwi.com/deep?{q}"


@dataclass(frozen=True)
class Offer:
    price: int
    airline: str
    dep: str   # YYYY-MM-DD
    ret: str

    @property
    def nights(self) -> int:
        return (datetime.strptime(self.ret, "%Y-%m-%d") - datetime.strptime(self.dep, "%Y-%m-%d")).days


def parse_offer(f: dict) -> tuple[Offer | None, str]:
    """Normalise une ligne de l'API. Renvoie (offre, "") ou (None, raison du rejet)."""
    try:
        if int(f.get("transfers", 0)) != 0 or int(f.get("return_transfers", 0)) != 0:
            return None, "not_direct"
        price = int(round(float(f.get("price"))))
    except (TypeError, ValueError):
        return None, "invalid_price"
    if price <= 0:
        return None, "invalid_price"
    dates = parse_dates(f)
    if not dates:
        return None, "not_round_trip"
    return Offer(price, str(f.get("airline") or ""), *dates), ""


@dataclass(frozen=True)
class Pick:
    offer: Offer
    verdict: Verdict
    dtype: str
    season: str
    benchmark: float


def select_deals(dest: str, offers: list[Offer], bench: dict, stats: dict | None = None,
                 max_per_dest: int = MAX_PER_DESTINATION) -> list[Pick]:
    """Les meilleurs deals d'une destination : plus forte remise d'abord, un seul par mois de départ."""
    stats = stats if stats is not None else {}
    picks: list[Pick] = []
    for o in set(offers):
        dtype = deal_type(o.nights)
        if not dtype:
            stats["bad_duration"] = stats.get("bad_duration", 0) + 1
            continue
        season = get_season(int(o.dep[5:7]))
        avg = bench.get((dest, season))
        v = evaluate(o.price, avg)
        if not v.publish:
            stats[v.reason] = stats.get(v.reason, 0) + 1
            continue
        picks.append(Pick(o, v, dtype, season, avg))
    picks.sort(key=lambda p: (-p.verdict.discount_pct, p.offer.price, p.offer.dep))
    out, months = [], set()
    for p in picks:
        if p.offer.dep[:7] in months:
            continue
        months.add(p.offer.dep[:7])
        out.append(p)
        if len(out) >= max_per_dest:
            break
    return out


def build_deal(dest: str, iata: str, p: Pick, now: datetime | None = None) -> dict:
    now = now or datetime.now(timezone.utc)
    o, v = p.offer, p.verdict
    name = DISPLAY_NAMES.get(dest, dest)
    deal = {
        "title": f"{name} à {o.price} € aller-retour",
        "description": f"Vol direct · {o.nights} nuit{'s' if o.nights > 1 else ''} sur place",
        "destination": dest, "departure_city": "Bâle-Mulhouse",
        "price": o.price, "original_price": int(round(p.benchmark)),
        "price_average_estimated": p.benchmark, "airline": o.airline,
        "category": CATEGORY[p.dtype],
        "departure_date": o.dep, "return_date": o.ret, "duration_days": o.nights,
        "month_departure": int(o.dep[5:7]), "season": p.season,
        "discount_percentage": v.discount_pct,
        "score_ai": v.score, "score_final": v.score, "deal_score": v.score,
        "deal_url": booking_link(iata, o.dep, o.ret),
        "image_url": None,  # les visuels sont gérés par le site (lib/destinations.ts), contrôlés à l'œil
        "expires_at": (now + timedelta(days=DEAL_TTL_DAYS)).isoformat(timespec="seconds"),
        "is_active": True, "status": "active", "source": "travelpayouts",
    }
    unknown = set(deal) - DEAL_COLUMNS
    if unknown:
        raise ValueError(f"colonnes inexistantes dans deals : {sorted(unknown)}")
    return deal


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


def supabase_headers(key: str) -> dict:
    """En-têtes Supabase. Les nouvelles clés (sb_secret_… / sb_publishable_…) ne sont pas des JWT :
    on les passe uniquement dans `apikey`. Les anciennes clés JWT vont aussi dans Authorization."""
    h = {"apikey": key, "Content-Type": "application/json"}
    if not key.startswith("sb_"):
        h["Authorization"] = f"Bearer {key}"
    return h


class Supabase:
    def __init__(self, url: str, key: str):
        self.url = url.rstrip("/")
        self.h = supabase_headers(key)

    def benchmarks(self) -> dict[tuple[str, str], float]:
        status, rows = http_json(f"{self.url}/rest/v1/destination_benchmarks?select=destination,season,avg_price", self.h)
        if status != 200 or not isinstance(rows, list):
            sys.exit(f"Impossible de lire destination_benchmarks ({status}): {rows}")
        out: dict[tuple[str, str], float] = {}
        for r in rows:
            k = (r["destination"], r["season"])
            if k in out:
                sys.exit(f"Benchmark en double pour {k} : corrige la table avant de publier.")
            out[k] = None if r["avg_price"] is None else round(float(r["avg_price"]) * BENCHMARK_FACTOR)
        return out

    def active_deals(self) -> dict[tuple[str, str, str], dict]:
        """Deals actifs publiés par ce robot, indexés par (destination, départ, retour)."""
        q = urllib.parse.urlencode({"is_active": "eq.true", "source": "eq.travelpayouts",
                                    "select": "id,destination,departure_date,return_date,price,expires_at"})
        status, rows = http_json(f"{self.url}/rest/v1/deals?{q}", self.h)
        if status != 200 or not isinstance(rows, list):
            sys.exit(f"Impossible de lire deals ({status}): {rows}")
        return {(r["destination"], r["departure_date"], r["return_date"]): r for r in rows}

    def insert(self, deal: dict) -> bool:
        status, body = http_json(f"{self.url}/rest/v1/deals", {**self.h, "Prefer": "return=minimal"}, deal, "POST")
        if status not in (200, 201):
            print(f"  ❌ insertion {deal['destination']} {deal['departure_date']}: {status} {body}")
            return False
        return True

    def update(self, deal_id: str, fields: dict) -> bool:
        q = urllib.parse.urlencode({"id": f"eq.{deal_id}"})
        status, body = http_json(f"{self.url}/rest/v1/deals?{q}", {**self.h, "Prefer": "return=minimal"}, fields, "PATCH")
        if status not in (200, 204):
            print(f"  ❌ mise à jour {deal_id}: {status} {body}")
            return False
        return True

    def record_price_stats(self, rows: list[dict]) -> str:
        """Historique des prix (table optionnelle price_stats). Sert à calculer plus tard un prix
        habituel à partir de vraies observations. Sans la table, on continue sans rien stocker."""
        if not rows:
            return "rien à enregistrer"
        status, body = http_json(f"{self.url}/rest/v1/price_stats",
                                 {**self.h, "Prefer": "return=minimal,resolution=merge-duplicates"}, rows, "POST")
        if status in (200, 201):
            return f"{len(rows)} lignes"
        if status == 404:
            return "table price_stats absente (voir pipeline/sql/2026-11-14_newsletter_et_historique.sql)"
        return f"erreur {status}: {str(body)[:120]}"


def send_telegram(text: str) -> None:
    bot, chat = env("TELEGRAM_BOT_TOKEN", False), env("TELEGRAM_CHAT_ID", False)
    if bot and chat:
        http_json(f"https://api.telegram.org/bot{bot}/sendMessage", {"Content-Type": "application/json"},
                  {"chat_id": chat, "text": text}, "POST")


# ─── Pipeline ─────────────────────────────────────────────────────────────────

def scan_months(today: date, n: int = SCAN_MONTHS) -> list[str]:
    """Mois de départ à scanner : le mois en cours puis les n suivants."""
    start = datetime(today.year, today.month, 1)
    return [add_months(start, i).strftime("%Y-%m") for i in range(0, n + 1)]


def fetch_offers(token: str, iata: str, dep_month: str, ret_month: str) -> tuple[list[dict], bool]:
    """Jusqu'à 30 allers-retours directs les moins chers pour un mois de départ / de retour."""
    q = urllib.parse.urlencode({
        "origin": ORIGIN, "destination": iata, "departure_at": dep_month, "return_at": ret_month,
        "one_way": "false", "direct": "true", "sorting": "price", "unique": "false",
        "limit": 30, "currency": "eur", "market": "fr", "token": token,
    })
    status, data = http_json(f"https://api.travelpayouts.com/aviasales/v3/prices_for_dates?{q}")
    if status == 429:  # quota : 600 appels / minute
        time.sleep(20)
        status, data = http_json(f"https://api.travelpayouts.com/aviasales/v3/prices_for_dates?{q}")
    ok = status == 200 and isinstance(data, dict) and bool(data.get("success"))
    return ((data.get("data") or []) if ok else []), ok


def plan_sync(existing: dict, selected: dict, now: datetime) -> tuple[list, list, list]:
    """Compare les deals en base et ceux du run. Renvoie (à insérer, à mettre à jour, à retirer).

    - retrouvé  -> mise à jour (prix, remise, validité prolongée)
    - nouveau   -> insertion
    - disparu   -> retiré seulement si sa validité est dépassée (ou absente : anciens deals)
    """
    inserts = [d for k, d in selected.items() if k not in existing]
    updates = [(existing[k]["id"], d) for k, d in selected.items() if k in existing]
    stale = []
    for k, row in existing.items():
        if k in selected:
            continue
        exp = row.get("expires_at")
        if not exp or datetime.fromisoformat(exp.replace("Z", "+00:00")) < now:
            stale.append(row["id"])
    return inserts, updates, stale


def run(publish: bool) -> int:
    sb = Supabase(env("SUPABASE_URL"), env("SUPABASE_SERVICE_KEY"))
    token = env("TRAVELPAYOUTS_TOKEN")
    bench = sb.benchmarks()
    now = datetime.now(timezone.utc)
    today = date.today()
    stats = {k: 0 for k in ("calls", "calls_failed", "offers", "not_direct", "not_round_trip", "invalid_price",
                            "bad_duration", "no_benchmark", "above_benchmark", "below_min_discount")}
    selected: dict[tuple[str, str, str], dict] = {}
    price_stats: list[dict] = []
    months = scan_months(today)

    for dest, (iata, _slug) in DESTINATIONS.items():
        offers: set[Offer] = set()
        for month in months:
            nxt = add_months(datetime.strptime(month + "-01", "%Y-%m-%d"), 1).strftime("%Y-%m")
            for ret_month in (month, nxt):
                rows, ok = fetch_offers(token, iata, month, ret_month)
                stats["calls"] += 1
                stats["calls_failed"] += 0 if ok else 1
                time.sleep(0.12)
                for f in rows:
                    o, why = parse_offer(f)
                    if o is None:
                        stats[why] += 1
                    elif o.dep > today.isoformat():
                        offers.add(o)
        stats["offers"] += len(offers)

        by_month: dict[str, list[int]] = {}
        for o in offers:
            by_month.setdefault(o.dep[:7], []).append(o.price)
        price_stats += [{"destination": dest, "depart_month": m + "-01", "observed_on": today.isoformat(),
                         "min_price": min(p), "median_price": round(statistics.median(p)), "n_offers": len(p)}
                        for m, p in by_month.items()]

        for p in select_deals(dest, list(offers), bench, stats):
            deal = build_deal(dest, iata, p, now)
            selected[(dest, p.offer.dep, p.offer.ret)] = deal
            print(f"  {deal['title']} · {p.offer.dep} → {p.offer.ret} · -{p.verdict.discount_pct}% vs {p.benchmark:.0f} €")

    # Garde-fou : si l'API ne répond pas (jeton invalide, panne), on ne touche à rien.
    if stats["calls_failed"] > stats["calls"] / 2 or stats["offers"] == 0:
        msg = f"⚠️ Robot deals : source de prix indisponible ({stats['calls_failed']}/{stats['calls']} appels en échec). Rien n'a été modifié."
        print(msg)
        if publish:
            send_telegram(msg)
        return 1

    existing = sb.active_deals()
    inserts, updates, stale = plan_sync(existing, selected, now)
    done = {"nouveaux": 0, "mis à jour": 0, "retirés": 0}
    if publish:
        done["nouveaux"] = sum(sb.insert(d) for d in inserts)
        refresh = ("price", "original_price", "price_average_estimated", "discount_percentage", "deal_score",
                   "score_ai", "score_final", "expires_at", "deal_url", "title", "description", "airline", "image_url")
        done["mis à jour"] = sum(sb.update(i, {k: d[k] for k in refresh}) for i, d in updates)
        done["retirés"] = sum(sb.update(i, {"is_active": False, "status": "stale"}) for i in stale)
        history = sb.record_price_stats(price_stats)
    else:
        done = {"nouveaux": len(inserts), "mis à jour": len(updates), "retirés": len(stale)}
        history = f"{len(price_stats)} lignes (non écrites)"

    tag = "" if publish else " (dry-run, rien n'est écrit)"
    summary = (f"Run terminé{tag} | deals retenus: {len(selected)} | " + " | ".join(f"{k}: {n}" for k, n in done.items())
               + f" | historique: {history}\n" + " | ".join(f"{k}: {n}" for k, n in stats.items()))
    print("\n" + summary)
    if publish:
        best = sorted(inserts, key=lambda d: -d["discount_percentage"])[:5]
        lines = [f"• {d['title']} (-{d['discount_percentage']} %), {d['departure_date']} → {d['return_date']}" for d in best]
        send_telegram(f"Robot deals : {len(selected)} deals en ligne, dont {done['nouveaux']} nouveaux, "
                      f"{done['retirés']} retirés." + ("\n\nNouveautés :\n" + "\n".join(lines) if lines else ""))
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--publish", action="store_true", help="écrit réellement dans Supabase")
    sys.exit(run(publish=ap.parse_args().publish))
