-- ============================================================
-- MIGRATION : Ajout de la table equipe (membres de l'équipe)
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- (uniquement si les autres tables existent déjà)
-- ============================================================

-- ── Table equipe ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS equipe (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nom           TEXT        NOT NULL,
  titre         TEXT        NOT NULL DEFAULT '',
  titre_long    TEXT        NOT NULL DEFAULT '',
  description   TEXT        NOT NULL DEFAULT '',
  photo_url     TEXT,
  order_index   INTEGER     NOT NULL DEFAULT 0,
  active        BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Trigger auto-update updated_at ───────────────────────────
DROP TRIGGER IF EXISTS equipe_updated_at ON equipe;
CREATE TRIGGER equipe_updated_at
  BEFORE UPDATE ON equipe
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE equipe ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active equipe" ON equipe;
CREATE POLICY "Public can read active equipe"
  ON equipe FOR SELECT TO anon
  USING (active = true);

DROP POLICY IF EXISTS "Auth full access on equipe" ON equipe;
CREATE POLICY "Auth full access on equipe"
  ON equipe FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── Données initiales (équipe actuelle) ───────────────────────
INSERT INTO equipe (nom, titre, titre_long, description, photo_url, order_index, active)
VALUES
  (
    'Dr Manal Khobzi Sordo',
    'Docteur en Pharmacie',
    'Docteur en Pharmacie, Faculté de Pharmacie de Lille',
    'Diplômée de la Faculté de Pharmacie de Lille, la Dr Khobzi Sordo a exercé 2 ans en France avant de reprendre la Pharmacie Quartier des Hôpitaux. Spécialisée en dermatologie, phytothérapie et aromathérapie.',
    '/images/Manal.webp',
    0,
    true
  ),
  (
    'Asmae',
    'Pharmacienne assistante',
    'Pharmacienne assistante',
    'Pharmacienne assistante, Asmae vous accompagne à la délivrance de vos ordonnances et vous conseille sur vos traitements.',
    '/images/Asmae.webp',
    1,
    true
  ),
  (
    'Ilham',
    'Aide pharmacien',
    'Aide pharmacien, plus de 20 ans d''expérience',
    'Forte de plus de 20 ans d''expérience en officine, Ilham prépare vos ordonnances et vous oriente au quotidien.',
    '/images/Ilham.webp',
    2,
    true
  ),
  (
    'Nezha',
    'Aide pharmacien',
    'Aide pharmacien, de formation infirmière',
    'De formation infirmière, Nezha apporte un regard soignant à l''accueil et au suivi des patients de la pharmacie.',
    '/images/Nezha.webp',
    3,
    true
  ),
  (
    'Rayhab',
    'Conseillère en dermo-cosmétique',
    'Conseillère en dermo-cosmétique et parapharmacie',
    'Rayhab vous guide dans le choix de vos soins : dermo-cosmétique, capillaire, hygiène et bien-être.',
    '/images/Rayhab.webp',
    4,
    true
  )
ON CONFLICT DO NOTHING;
