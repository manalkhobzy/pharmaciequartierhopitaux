-- ============================================================
-- MIGRATION : Ajout de la table slides (carousel homepage)
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- (uniquement si les autres tables existent déjà)
-- ============================================================

-- ── Table slides ─────────────────────────────────────────────
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

-- ── Trigger auto-update updated_at ───────────────────────────
DROP TRIGGER IF EXISTS slides_updated_at ON slides;
CREATE TRIGGER slides_updated_at
  BEFORE UPDATE ON slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active slides" ON slides;
CREATE POLICY "Public can read active slides"
  ON slides FOR SELECT TO anon
  USING (active = true);

DROP POLICY IF EXISTS "Auth full access on slides" ON slides;
CREATE POLICY "Auth full access on slides"
  ON slides FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── Données initiales (3 slides homepage) ────────────────────
INSERT INTO slides (title, subtitle, cta_label, cta_href, accent_color, bg_gradient, image_url, image_alt, order_index, active)
VALUES
  (
    'Votre ordonnance prête en 1h',
    'Envoyez-la sur WhatsApp, passez la récupérer.',
    'Envoyer mon ordonnance',
    'https://wa.me/212653468785',
    '#2E7D32',
    'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    '/images/hero/ordonnance.webp',
    'Service ordonnance WhatsApp',
    0,
    true
  ),
  (
    'Parapharmacie en libre accès',
    'Espaces spécialisés offrant un vaste choix de produits dermo-cosmétiques, d''hygiène et de compléments alimentaires.',
    'Découvrir nos produits',
    '/services',
    '#1565C0',
    'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    '/images/hero/parapharmacie.webp',
    'Rayon parapharmacie',
    1,
    true
  ),
  (
    'Préparations magistrales',
    'Des solutions thérapeutiques personnalisées créées selon la prescription médicale de votre médecin.',
    'En savoir plus',
    '/services',
    '#880E4F',
    'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    '/images/hero/preparations.webp',
    'Préparations magistrales',
    2,
    true
  )
ON CONFLICT DO NOTHING;
