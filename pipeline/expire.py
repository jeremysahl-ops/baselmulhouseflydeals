#!/usr/bin/env python3
"""
Retire les deals qui ne doivent plus être affichés :
  - date de départ passée ;
  - validité dépassée (expires_at) : le robot ne les a pas retrouvés depuis plusieurs jours.

  python3 expire.py           # dry-run : liste ce qui serait retiré
  python3 expire.py --apply   # écrit (is_active=false)

Variables : SUPABASE_URL, SUPABASE_SERVICE_KEY (+ TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID optionnels).
"""
from __future__ import annotations

import argparse
import os
import sys
import urllib.parse
from datetime import date, datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dealhunter import env, http_json, send_telegram, supabase_headers  # noqa: E402


def main(apply: bool) -> int:
    url = env("SUPABASE_URL").rstrip("/")
    h = supabase_headers(env("SUPABASE_SERVICE_KEY"))
    today = date.today().isoformat()
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    rules = [
        ("départ passé", {"is_active": "eq.true", "departure_date": f"lt.{today}"}, "expired"),
        ("validité dépassée", {"is_active": "eq.true", "expires_at": f"lt.{now}"}, "stale"),
    ]
    total = 0
    for label, filt, new_status in rules:
        q = urllib.parse.urlencode({**filt, "select": "id,destination,departure_date,price"})
        status, rows = http_json(f"{url}/rest/v1/deals?{q}", h)
        if status != 200 or not isinstance(rows, list):
            sys.exit(f"Lecture des deals impossible ({status}): {rows}")
        for r in sorted(rows, key=lambda r: r["departure_date"] or ""):
            print(f"  {'retire' if apply else '[dry-run]'} ({label}) {r['departure_date']} {r['destination']} {r['price']} €")
        if apply and rows:
            # Un seul PATCH avec le même filtre : pas de course entre lecture et écriture.
            status, body = http_json(f"{url}/rest/v1/deals?{urllib.parse.urlencode(filt)}",
                                     {**h, "Prefer": "return=minimal"},
                                     {"is_active": False, "status": new_status}, "PATCH")
            if status not in (200, 204):
                sys.exit(f"PATCH échoué ({status}): {body}")
        total += len(rows)

    if apply and total:
        send_telegram(f"Robot deals : {total} deal(s) retiré(s) (départ passé ou prix non retrouvé).")
    print(f"{total} deal(s) {'retiré(s)' if apply else 'à retirer'}.")
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true")
    sys.exit(main(ap.parse_args().apply))
