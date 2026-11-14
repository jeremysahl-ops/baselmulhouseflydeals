#!/usr/bin/env python3
"""
Expire les deals actifs dont la date de départ est passée (remplace le cron OpenClaw /expire,
qui n'a jamais rien expiré : l'agent n'avait pas d'instructions pour /expire en session cron).

  python3 expire.py           # dry-run : liste ce qui serait expiré
  python3 expire.py --apply   # PATCH is_active=false, status='expired'

Variables : SUPABASE_URL, SUPABASE_SERVICE_KEY (+ TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID optionnels).
"""
from __future__ import annotations

import argparse
import os
import sys
import urllib.parse
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dealhunter import env, http_json, send_telegram, supabase_headers  # noqa: E402


def main(apply: bool, today: date | None = None) -> int:
    url = env("SUPABASE_URL").rstrip("/")
    key = env("SUPABASE_SERVICE_KEY")
    h = supabase_headers(key)
    cutoff = (today or date.today()).isoformat()
    filt = {"is_active": "eq.true", "departure_date": f"lt.{cutoff}"}

    q = urllib.parse.urlencode({**filt, "select": "id,destination,departure_date,price"})
    status, rows = http_json(f"{url}/rest/v1/deals?{q}", h)
    if status != 200 or not isinstance(rows, list):
        sys.exit(f"Lecture des deals impossible ({status}): {rows}")

    for r in sorted(rows, key=lambda r: r["departure_date"]):
        print(f"  {'expire' if apply else '[dry-run]'} {r['departure_date']} {r['destination']} {r['price']}€")

    if apply and rows:
        # Un seul PATCH avec le même filtre : pas de course entre lecture et écriture par id.
        status, body = http_json(f"{url}/rest/v1/deals?{urllib.parse.urlencode(filt)}",
                                 {**h, "Prefer": "return=minimal"},
                                 {"is_active": False, "status": "expired"}, "PATCH")
        if status not in (200, 204):
            sys.exit(f"PATCH échoué ({status}): {body}")
        send_telegram(f"🗓️ {len(rows)} deal(s) expiré(s) (départ avant le {cutoff}).")

    print(f"{len(rows)} deal(s) {'expiré(s)' if apply else 'à expirer'} (départ < {cutoff}).")
    return len(rows)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true")
    main(ap.parse_args().apply)
