#!/usr/bin/env python3
"""
Applique pipeline/sql/2026-11-12_restore_benchmarks.sql via l'API REST Supabase
(le SQL Editor n'est pas accessible par API). Les id et valeurs viennent du fichier SQL :
une seule source de vérité. La section 3 (commentée dans le SQL) n'est PAS appliquée.

  python3 apply_cleanup.py           # dry-run (lecture seule)
  python3 apply_cleanup.py --apply   # écrit

Idempotent : chaque PATCH de benchmark est filtré sur la valeur gonflée attendue.
Variables : SUPABASE_URL, SUPABASE_SERVICE_KEY.
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import urllib.parse
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dealhunter import env, http_json  # noqa: E402

SQL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sql", "2026-11-12_restore_benchmarks.sql")
RE_BENCH = re.compile(r"^UPDATE public\.destination_benchmarks SET avg_price = (\d+) WHERE id = '([0-9a-f-]{36})' AND avg_price = (\d+);")
RE_DEAL = re.compile(r"^UPDATE public\.deals SET is_active = false, status = 'above_benchmark' WHERE id = '([0-9a-f-]{36})' AND is_active = true;")


def parse_sql(path: str = SQL):
    bench, deals = [], []
    for line in open(path, encoding="utf-8"):
        if m := RE_BENCH.match(line):
            bench.append({"new": int(m[1]), "id": m[2], "old": int(m[3])})
        elif m := RE_DEAL.match(line):
            deals.append(m[1])
    return bench, deals


class Api:
    def __init__(self):
        self.url = env("SUPABASE_URL").rstrip("/")
        key = env("SUPABASE_SERVICE_KEY")
        self.h = {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"}

    def get(self, table, params):
        status, body = http_json(f"{self.url}/rest/v1/{table}?{urllib.parse.urlencode(params)}", self.h)
        if status != 200:
            sys.exit(f"GET {table} échoué ({status}): {body}")
        return body

    def patch(self, table, params, data) -> int:
        h = {**self.h, "Prefer": "return=representation"}
        status, body = http_json(f"{self.url}/rest/v1/{table}?{urllib.parse.urlencode(params)}", h, data, "PATCH")
        if status not in (200, 204):
            sys.exit(f"PATCH {table} {params} échoué ({status}): {body}")
        return len(body) if isinstance(body, list) else 0


def main(apply: bool) -> int:
    bench, deal_ids = parse_sql()
    if len(bench) != 132 or len(deal_ids) != 11:
        sys.exit(f"SQL inattendu : {len(bench)} benchmarks / {len(deal_ids)} deals (attendu 132 / 11)")
    api = Api()
    tag = "APPLY" if apply else "dry-run"

    # 1) Benchmarks : annule le ×1.2
    current = {r["id"]: r["avg_price"] for r in api.get("destination_benchmarks", {"select": "id,avg_price"})}
    todo = [b for b in bench if current.get(b["id"]) == b["old"]]
    done = [b for b in bench if current.get(b["id"]) == b["new"]]
    other = [b for b in bench if current.get(b["id"]) not in (b["old"], b["new"])]
    print(f"[{tag}] benchmarks : {len(todo)} à restaurer, {len(done)} déjà restaurés, {len(other)} valeur inattendue")
    for b in other:
        print(f"   ⚠️ {b['id']} vaut {current.get(b['id'])} (attendu {b['old']} ou {b['new']}) : ignoré")
    if apply:
        n = sum(api.patch("destination_benchmarks", {"id": f"eq.{b['id']}", "avg_price": f"eq.{b['old']}"},
                          {"avg_price": b["new"]}) for b in todo)
        print(f"   → {n} ligne(s) modifiée(s)")

    # 2) Deals au-dessus du vrai benchmark
    ids = ",".join(deal_ids)
    still = api.get("deals", {"select": "id", "id": f"in.({ids})", "is_active": "eq.true"})
    print(f"[{tag}] deals au-dessus du vrai benchmark : {len(still)} encore actifs sur 11")
    if apply and still:
        n = api.patch("deals", {"id": f"in.({ids})", "is_active": "eq.true"},
                      {"is_active": False, "status": "above_benchmark"})
        print(f"   → {n} deal(s) désactivé(s)")

    # 3) Expiration des départs passés
    today = date.today().isoformat()
    past = api.get("deals", {"select": "id", "is_active": "eq.true", "departure_date": f"lt.{today}"})
    print(f"[{tag}] deals actifs au départ passé (< {today}) : {len(past)}"
          + (" (dont ceux du point précédent)" if not apply else ""))
    if apply and past:
        n = api.patch("deals", {"is_active": "eq.true", "departure_date": f"lt.{today}"},
                      {"is_active": False, "status": "expired"})
        print(f"   → {n} deal(s) expiré(s)")

    # 4) Contrôle final
    if apply:
        bm = {(r["destination"], r["season"]): r["avg_price"]
              for r in api.get("destination_benchmarks", {"select": "destination,season,avg_price"})}
        left = api.get("deals", {"select": "id,destination,season,price", "is_active": "eq.true"})
        bad = [d for d in left if (d["destination"], d["season"]) in bm and d["price"] >= bm[(d["destination"], d["season"])]]
        still_inflated = sum(1 for r in api.get("destination_benchmarks", {"select": "id,avg_price"})
                             if any(b["id"] == r["id"] and r["avg_price"] == b["old"] for b in bench))
        print(f"[CONTRÔLE] deals actifs restants : {len(left)} | au-dessus du benchmark : {len(bad)}"
              f" | benchmarks encore gonflés : {still_inflated}")
        return 1 if (bad or still_inflated) else 0
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true")
    sys.exit(main(ap.parse_args().apply))
