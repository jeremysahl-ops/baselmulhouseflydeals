"""Tests des règles du robot. Lancer : python3 -m unittest pipeline/test_dealhunter.py"""
import os
import sys
import unittest
from datetime import datetime, timezone
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, os.path.dirname(__file__))
from dealhunter import (DEAL_COLUMNS, Offer, booking_link, build_deal, evaluate, get_score,  # noqa: E402
                        get_season, parse_dates, parse_offer, plan_sync, scan_months, select_deals,
                        supabase_headers)

NOW = datetime(2026, 11, 14, 12, 0, tzinfo=timezone.utc)


def api_row(price=66, dep="2026-12-04", ret="2026-12-08", transfers=0, return_transfers=0, airline="U2"):
    return {"price": price, "airline": airline, "transfers": transfers, "return_transfers": return_transfers,
            "departure_at": f"{dep}T07:00:00+01:00", "return_at": f"{ret}T21:30:00+01:00" if ret else None}


class EvaluateTest(unittest.TestCase):
    def test_above_or_equal_benchmark_is_rejected(self):
        self.assertEqual(evaluate(161, 150).reason, "above_benchmark")   # Naples été (cas réel)
        self.assertEqual(evaluate(90, 90).reason, "above_benchmark")     # Malaga automne (égalité)

    def test_small_discount_is_rejected(self):
        self.assertEqual(evaluate(185, 190).reason, "below_min_discount")  # Athènes -3 % (cas réel)
        self.assertEqual(evaluate(70, 80).reason, "below_min_discount")    # -12 % : pas un « deal »

    def test_real_deal_is_published(self):
        v = evaluate(46, 120)                                             # Barcelone -62 %
        self.assertTrue(v.publish)
        self.assertEqual((v.discount_pct, v.score), (62, 5))

    def test_threshold_boundary(self):
        self.assertTrue(evaluate(85, 100).publish)                       # -15 % pile
        self.assertFalse(evaluate(86, 100).publish)                      # -14 %

    def test_missing_or_bad_inputs(self):
        self.assertEqual(evaluate(100, None).reason, "no_benchmark")
        self.assertEqual(evaluate("abc", 100).reason, "invalid_price")
        self.assertEqual(evaluate(100, 0).reason, "invalid_price")

    def test_string_numbers_compare_numerically(self):
        self.assertTrue(evaluate("99", "150").publish)   # "99" < "150" est False en chaînes

    def test_seasons_and_scores(self):
        self.assertEqual([get_season(m) for m in (1, 4, 7, 10, 12)],
                         ["hiver", "printemps", "ete", "automne", "hiver"])
        self.assertEqual([get_score(d) for d in (45, 30, 20, 7, 2)], [5, 4, 3, 2, 1])


class OfferTest(unittest.TestCase):
    def test_one_way_is_never_treated_as_round_trip(self):
        self.assertIsNone(parse_dates({"departure_at": "2026-12-04T07:00:00+01:00"}))
        self.assertIsNone(parse_dates({"departure_at": "2026-12-04", "return_at": "2026-12-01"}))
        self.assertEqual(parse_offer(api_row(ret=None)), (None, "not_round_trip"))

    def test_flights_with_stopovers_are_rejected(self):
        self.assertEqual(parse_offer(api_row(transfers=1)), (None, "not_direct"))
        self.assertEqual(parse_offer(api_row(return_transfers="2")), (None, "not_direct"))  # l'API renvoie parfois des chaînes

    def test_valid_offer(self):
        o, why = parse_offer(api_row(price="64"))
        self.assertEqual((o.price, o.dep, o.ret, o.nights, o.airline, why), (64, "2026-12-04", "2026-12-08", 4, "U2", ""))

    def test_bad_price(self):
        self.assertEqual(parse_offer(api_row(price=None))[1], "invalid_price")
        self.assertEqual(parse_offer(api_row(price=0))[1], "invalid_price")


class SelectTest(unittest.TestCase):
    BENCH = {("Nice", "hiver"): 80, ("Nice", "printemps"): 100}

    def test_best_discount_first_one_per_month_capped(self):
        offers = [Offer(60, "U2", "2026-12-04", "2026-12-08"),   # -25 %
                  Offer(40, "U2", "2026-12-11", "2026-12-15"),   # -50 % (même mois : le seul gardé)
                  Offer(50, "U2", "2027-01-08", "2027-01-12"),   # -38 %
                  Offer(48, "U2", "2027-02-05", "2027-02-09"),   # -40 %
                  Offer(60, "U2", "2027-03-05", "2027-03-09"),   # -40 % (printemps, réf. 100)
                  Offer(75, "U2", "2027-01-15", "2027-01-19")]   # -6 % : rejeté
        stats = {}
        picks = select_deals("Nice", offers, self.BENCH, stats, max_per_dest=3)
        self.assertEqual([(p.offer.dep, p.verdict.discount_pct) for p in picks],
                         [("2026-12-11", 50), ("2027-02-05", 40), ("2027-03-05", 40)])
        self.assertEqual(stats["below_min_discount"], 1)

    def test_duration_and_missing_benchmark(self):
        stats = {}
        self.assertEqual(select_deals("Nice", [Offer(20, "U2", "2026-12-04", "2026-12-05")], self.BENCH, stats), [])   # 1 nuit
        self.assertEqual(select_deals("Inconnue", [Offer(20, "U2", "2026-12-04", "2026-12-08")], self.BENCH, stats), [])
        self.assertEqual((stats["bad_duration"], stats["no_benchmark"]), (1, 1))


class DealTest(unittest.TestCase):
    def pick(self):
        return select_deals("Athenes", [Offer(66, "U2", "2026-12-04", "2026-12-08")], {("Athenes", "hiver"): 120})[0]

    def test_deal_only_uses_existing_columns(self):
        # Le 14/11/2026, 19 insertions ont échoué à cause de `company` / `link` (PGRST204).
        d = build_deal("Athenes", "ATH", self.pick(), NOW)
        self.assertLessEqual(set(d), DEAL_COLUMNS)
        self.assertEqual((d["price"], d["original_price"], d["discount_percentage"], d["duration_days"]), (66, 120, 45, 4))
        self.assertEqual(d["title"], "Athènes à 66 € aller-retour")
        self.assertEqual(d["destination"], "Athenes")            # clé de la table des prix de référence
        self.assertEqual(d["expires_at"], "2026-11-19T12:00:00+00:00")

    def test_booking_link_is_the_official_tracked_kiwi_deep_link(self):
        u = urlparse(booking_link("ATH", "2026-12-04", "2026-12-08"))
        q = parse_qs(u.query)
        self.assertEqual((u.netloc, u.path), ("www.kiwi.com", "/deep"))
        self.assertTrue(q["affilid"][0].startswith("travelpayoutsdeeplink_www.baselmulhouseflydeals.com_"))
        self.assertNotEqual(q["affilid"][0], "707798")           # l'ancien identifiant, non rattaché au compte
        self.assertEqual((q["from"], q["to"], q["departure"], q["return"], q["stopNumber"]),
                         (["BSL"], ["ATH"], ["2026-12-04"], ["2026-12-08"], ["0"]))


class SyncTest(unittest.TestCase):
    def test_insert_update_and_retire(self):
        k_found, k_new = ("Nice", "2026-12-04", "2026-12-08"), ("Rome", "2027-01-08", "2027-01-12")
        existing = {
            k_found: {"id": "a", "expires_at": "2026-11-13T00:00:00+00:00"},
            ("Porto", "2026-12-01", "2026-12-05"): {"id": "b", "expires_at": "2026-11-13T00:00:00+00:00"},   # périmé
            ("Zagreb", "2026-12-01", "2026-12-05"): {"id": "c", "expires_at": "2026-11-17T00:00:00Z"},       # encore valable
            ("Alicante", "2027-04-15", "2027-04-19"): {"id": "d", "expires_at": None},                       # ancien format
        }
        inserts, updates, stale = plan_sync(existing, {k_found: {"x": 1}, k_new: {"x": 2}}, NOW)
        self.assertEqual(inserts, [{"x": 2}])
        self.assertEqual(updates, [("a", {"x": 1})])
        self.assertEqual(sorted(stale), ["b", "d"])


class MiscTest(unittest.TestCase):
    def test_supabase_headers(self):
        self.assertNotIn("Authorization", supabase_headers("sb_secret_abc"))
        self.assertEqual(supabase_headers("eyJ.x.y")["Authorization"], "Bearer eyJ.x.y")

    def test_scan_months_starts_with_current_month(self):
        from datetime import date
        m = scan_months(date(2026, 11, 14), 3)
        self.assertEqual(m, ["2026-11", "2026-12", "2027-01", "2027-02"])


if __name__ == "__main__":
    unittest.main()
