"""Tests de la règle de publication. Lancer : python3 -m unittest pipeline/test_dealhunter.py"""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from dealhunter import DEAL_COLUMNS, build_deal, evaluate, get_season, get_score, parse_dates  # noqa: E402


class EvaluateTest(unittest.TestCase):
    def test_above_or_equal_benchmark_is_rejected(self):
        self.assertEqual(evaluate(161, 150).reason, "above_benchmark")   # Naples été (cas réel)
        self.assertEqual(evaluate(90, 90).reason, "above_benchmark")     # Malaga automne (égalité)

    def test_small_discount_is_rejected(self):
        v = evaluate(185, 190)                                            # Athènes -3 % (cas réel)
        self.assertFalse(v.publish)
        self.assertEqual(v.reason, "below_min_discount")

    def test_real_deal_is_published(self):
        v = evaluate(46, 120)                                             # Barcelone -62 %
        self.assertTrue(v.publish)
        self.assertEqual((v.discount_pct, v.score), (62, 5))

    def test_threshold_boundary(self):
        self.assertTrue(evaluate(95, 100).publish)                       # -5 % pile
        self.assertFalse(evaluate(96, 100).publish)                      # -4 %

    def test_missing_or_bad_inputs(self):
        self.assertEqual(evaluate(100, None).reason, "no_benchmark")
        self.assertEqual(evaluate("abc", 100).reason, "invalid_price")
        self.assertEqual(evaluate(100, 0).reason, "invalid_price")

    def test_string_numbers_compare_numerically(self):
        # "99" < "150" est False en comparaison de chaînes : on doit comparer des nombres.
        self.assertTrue(evaluate("99", "150").publish)

    def test_one_way_is_never_treated_as_round_trip(self):
        self.assertIsNone(parse_dates({"departure_at": "2026-12-04T07:00:00+01:00"}))
        self.assertIsNone(parse_dates({"departure_at": "2026-12-04T07:00", "return_at": ""}))
        self.assertIsNone(parse_dates({"departure_at": "2026-12-04", "return_at": "2026-12-01"}))
        self.assertEqual(parse_dates({"departure_at": "2026-12-04T07:00:00+01:00",
                                      "return_at": "2026-12-07T21:30:00+01:00"}),
                         ("2026-12-04", "2026-12-07"))

    def test_deal_only_uses_existing_columns(self):
        # Le 14/11/2026, 19 insertions ont échoué à cause de `company` / `link` (PGRST204).
        d = build_deal("Nice", "nice-france", {"price": 66, "airline": "U2"},
                       "2026-12-04", "2026-12-08", 4, "weekend", "hiver", evaluate(66, 80))
        self.assertLessEqual(set(d), DEAL_COLUMNS)
        self.assertNotIn("company", d)
        self.assertNotIn("link", d)
        self.assertEqual((d["price"], d["discount_percentage"], d["month_departure"]), (66, 18, 12))
        self.assertIn("/nice-france/2026-12-04/2026-12-08/", d["deal_url"])

    def test_seasons_and_scores(self):
        self.assertEqual([get_season(m) for m in (1, 4, 7, 10, 12)],
                         ["hiver", "printemps", "ete", "automne", "hiver"])
        self.assertEqual([get_score(d) for d in (45, 30, 20, 7, 2)], [5, 4, 3, 2, 1])


if __name__ == "__main__":
    unittest.main()
