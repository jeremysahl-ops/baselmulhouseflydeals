-- ============================================================
-- BaselMulhouseFlyDeals — Setup Supabase
-- Colle ce SQL dans : Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Table deals
CREATE TABLE IF NOT EXISTS public.deals (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category      TEXT NOT NULL CHECK (category IN ('vol', 'vol-hotel', 'city-trip', 'sejour', 'derniere-minute')),
  title         TEXT NOT NULL,
  price         INTEGER NOT NULL,
  dates         TEXT NOT NULL,
  company       TEXT NOT NULL,
  destination   TEXT NOT NULL,
  link          TEXT NOT NULL,
  insider_tip   TEXT,
  image_url     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Index pour requêtes par catégorie
CREATE INDEX IF NOT EXISTS deals_category_idx ON public.deals (category);
CREATE INDEX IF NOT EXISTS deals_created_at_idx ON public.deals (created_at DESC);

-- 3. Row Level Security (lecture publique, écriture authentifiée)
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Lecture publique (anon)
CREATE POLICY "Lecture publique des deals"
  ON public.deals FOR SELECT
  TO anon
  USING (true);

-- Insertion/Update/Delete uniquement pour les utilisateurs authentifiés
CREATE POLICY "Écriture authentifiée"
  ON public.deals FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Données de test
INSERT INTO public.deals (category, title, price, dates, company, destination, link, insider_tip, image_url)
VALUES
  (
    'derniere-minute',
    '🔥 Vol Basel → Barcelone dès 39€ A/R – Week-end soleil !',
    39,
    '14 – 16 mars 2025',
    'Vueling',
    'Barcelone',
    'https://www.vueling.com',
    'Réserve tôt le matin, les prix montent vite. Prends la navette gratuite depuis Mulhouse.',
    'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80'
  ),
  (
    'city-trip',
    '🌆 City Trip Lisbonne 3 jours depuis Basel – Vol + Hôtel 189€',
    189,
    '21 – 24 mars 2025',
    'EasyJet + Booking',
    'Lisbonne',
    'https://www.easyjet.com',
    'Le quartier Alfama est magique au coucher du soleil. Pastel de nata en priorité.',
    'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80'
  ),
  (
    'vol',
    '✈️ Vol Basel → Rome dès 29€ – Printemps à la Dolce Vita',
    29,
    '5 – 8 avril 2025',
    'Ryanair',
    'Rome',
    'https://www.ryanair.com',
    'Aéroport de Ciampino est moins central mais le bus express est rapide.',
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80'
  ),
  (
    'sejour',
    '🌴 Séjour Madère 7 nuits tout compris dès 699€ depuis Basel',
    699,
    '1 – 8 mai 2025',
    'TUI',
    'Madère',
    'https://www.tui.com',
    'Loue une voiture pour explorer les levadas. Évite les hôtels de la côte sud en été.',
    NULL
  ),
  (
    'vol-hotel',
    '🏨 Vol + Hôtel Amsterdam 2 nuits – les tulipes en fleurs !',
    249,
    '18 – 20 avril 2025',
    'Transavia + NH Hotels',
    'Amsterdam',
    'https://www.transavia.com',
    'Prends le train depuis Schiphol, beaucoup moins cher que le taxi.',
    'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80'
  );

-- 5. Vue utile (optionnel)
CREATE OR REPLACE VIEW public.deals_recents AS
  SELECT * FROM public.deals
  ORDER BY created_at DESC
  LIMIT 20;
