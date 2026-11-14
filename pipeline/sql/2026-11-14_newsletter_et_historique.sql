-- ============================================================================
-- À coller une fois dans Supabase > SQL Editor > New query > Run.
-- Crée deux tables. Sans elles : le formulaire d'alertes répond « indisponible »
-- et le robot ne garde pas d'historique des prix (il fonctionne quand même).
-- Peut être relancé sans risque (IF NOT EXISTS).
-- ============================================================================

-- 1) Abonnés aux alertes e-mail --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscribers (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email             text NOT NULL CHECK (email = lower(email) AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$' AND length(email) <= 254),
  source            text,                                   -- page d'inscription (accueil, alertes…)
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(), -- pour un futur lien de désinscription
  unsubscribed_at   timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email)
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Le site (clé publique) peut seulement AJOUTER une adresse : aucune lecture, modification
-- ni suppression possible depuis l'extérieur. Seule la clé secrète (robot) peut lire la liste.
DROP POLICY IF EXISTS "Inscription publique" ON public.subscribers;
CREATE POLICY "Inscription publique" ON public.subscribers
  FOR INSERT TO anon
  WITH CHECK (unsubscribed_at IS NULL);

GRANT INSERT ON public.subscribers TO anon;

-- 2) Historique des prix relevés par le robot --------------------------------------
-- Une ligne par destination, mois de départ et jour de relevé. Servira à calculer un
-- « prix habituel » à partir de vraies observations plutôt que d'une estimation.
CREATE TABLE IF NOT EXISTS public.price_stats (
  destination  text NOT NULL,
  depart_month date NOT NULL,          -- 1er jour du mois de départ
  observed_on  date NOT NULL,          -- jour du relevé
  min_price    integer NOT NULL,
  median_price integer NOT NULL,
  n_offers     integer NOT NULL,
  PRIMARY KEY (destination, depart_month, observed_on)
);

ALTER TABLE public.price_stats ENABLE ROW LEVEL SECURITY;  -- aucune règle : accès réservé à la clé secrète
