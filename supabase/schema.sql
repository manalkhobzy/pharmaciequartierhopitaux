-- ============================================================
-- PHARMACIE QUARTIER DES HÔPITAUX — Schéma Supabase complet
-- Idempotent : peut être ré-exécuté sans erreur
-- Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================

-- ── Table articles ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  excerpt      TEXT        NOT NULL DEFAULT '',
  content      TEXT        NOT NULL DEFAULT '',
  category     TEXT        NOT NULL DEFAULT '',
  image_url    TEXT,
  read_time    TEXT        NOT NULL DEFAULT '5 min',
  published    BOOLEAN     NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Table settings ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

INSERT INTO settings (key, value)
VALUES ('conseil_du_mois_id', NULL)
ON CONFLICT (key) DO NOTHING;

-- ── Table slides (carousel homepage) ───────────────────────
CREATE TABLE IF NOT EXISTS slides (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  subtitle      TEXT        NOT NULL DEFAULT '',
  cta_label     TEXT        NOT NULL DEFAULT 'En savoir plus',
  cta_href      TEXT        NOT NULL DEFAULT '/',
  accent_color  TEXT        NOT NULL DEFAULT '#1B6B4A',
  bg_gradient   TEXT        NOT NULL DEFAULT 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
  image_url     TEXT,
  image_alt     TEXT        NOT NULL DEFAULT '',
  order_index   INTEGER     NOT NULL DEFAULT 0,
  active        BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO slides (title, subtitle, cta_label, cta_href, accent_color, bg_gradient, image_url, image_alt, order_index, active)
VALUES
  ('Votre ordonnance prête en 1h', 'Envoyez-la sur WhatsApp, passez la récupérer.', 'Envoyer mon ordonnance', 'https://wa.me/212653468785', '#2E7D32', 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', '/images/hero/ordonnance.webp', 'Service ordonnance WhatsApp', 0, true),
  ('Parapharmacie en libre accès', 'Espaces spécialisés offrant un vaste choix de produits dermo-cosmétiques, d''hygiène et de compléments alimentaires.', 'Découvrir nos produits', '/services', '#1565C0', 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', '/images/hero/parapharmacie.webp', 'Rayon parapharmacie', 1, true),
  ('Préparations magistrales', 'Des solutions thérapeutiques personnalisées créées selon la prescription médicale de votre médecin.', 'En savoir plus', '/services', '#880E4F', 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)', '/images/hero/preparations.webp', 'Préparations magistrales', 2, true)
ON CONFLICT DO NOTHING;

-- ── Fonction trigger updated_at ─────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS slides_updated_at ON slides;
CREATE TRIGGER slides_updated_at
  BEFORE UPDATE ON slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS ─────────────────────────────────────────────────────
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides   ENABLE ROW LEVEL SECURITY;

-- articles
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT TO anon USING (published = true);

DROP POLICY IF EXISTS "Auth full access on articles" ON articles;
CREATE POLICY "Auth full access on articles"
  ON articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- settings
DROP POLICY IF EXISTS "Public can read settings" ON settings;
CREATE POLICY "Public can read settings"
  ON settings FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Auth full access on settings" ON settings;
CREATE POLICY "Auth full access on settings"
  ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- slides
DROP POLICY IF EXISTS "Public can read active slides" ON slides;
CREATE POLICY "Public can read active slides"
  ON slides FOR SELECT TO anon USING (active = true);

DROP POLICY IF EXISTS "Auth full access on slides" ON slides;
CREATE POLICY "Auth full access on slides"
  ON slides FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Storage bucket article-images ────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read article images" ON storage.objects;
CREATE POLICY "Public read article images"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Auth upload article images" ON storage.objects;
CREATE POLICY "Auth upload article images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Auth update article images" ON storage.objects;
CREATE POLICY "Auth update article images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Auth delete article images" ON storage.objects;
CREATE POLICY "Auth delete article images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'article-images');
