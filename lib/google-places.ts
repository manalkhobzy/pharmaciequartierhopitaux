/**
 * Récupération des avis Google via Places API (New).
 *
 * L'ancienne Places API (maps.googleapis.com/maps/api/place/details/json) est
 * gelée depuis le 1er mars 2025 : elle reste servie pour les projets Google Cloud
 * qui l'avaient déjà activée, mais ne peut plus être activée sur un projet créé
 * après cette date. Ce module utilise donc places.googleapis.com/v1.
 *
 * Variables d'environnement attendues :
 *   GOOGLE_PLACES_API_KEY  clé API Google Cloud, Places API (New) activée
 *   GOOGLE_PLACE_ID        identifiant du lieu, au format ChIJ...
 *
 * Sans ces variables, la fonction renvoie null et le composant appelant masque
 * simplement la liste des avis. Aucun avis fictif n'est affiché.
 */

// ─── Types exposés au reste de l'application ────────────────────────────────

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url: string
  time: number
}

export interface PlaceDetails {
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

// ─── Types bruts renvoyés par Places API (New) ──────────────────────────────

interface ApiLocalizedText {
  text?: string
  languageCode?: string
}

interface ApiReview {
  rating?: number
  text?: ApiLocalizedText
  originalText?: ApiLocalizedText
  relativePublishTimeDescription?: string
  publishTime?: string
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
}

interface ApiPlace {
  rating?: number
  userRatingCount?: number
  reviews?: ApiReview[]
}

// ─── Implémentation ─────────────────────────────────────────────────────────

const ENDPOINT = 'https://places.googleapis.com/v1/places'
const FIELD_MASK = 'rating,userRatingCount,reviews'
const REVALIDATE_SECONDS = 43200 // 12 h

export async function fetchPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId || apiKey.startsWith('VOTRE_')) return null

  try {
    const res = await fetch(
      `${ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=fr`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': FIELD_MASK,
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    )

    if (!res.ok) {
      // Cas fréquents : 403 clé restreinte ou API non activée, 404 Place ID invalide
      console.error(
        `[google-places] HTTP ${res.status} — ${await res.text().catch(() => '')}`,
      )
      return null
    }

    const data = (await res.json()) as ApiPlace
    if (typeof data.rating !== 'number') return null

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r) => r.authorAttribution?.displayName)
      .map((r) => ({
        author_name: r.authorAttribution?.displayName ?? '',
        rating: typeof r.rating === 'number' ? r.rating : 5,
        // originalText = l'avis tel qu'il a été écrit, non traduit par Google
        text: r.originalText?.text ?? r.text?.text ?? '',
        relative_time_description: r.relativePublishTimeDescription ?? '',
        profile_photo_url: r.authorAttribution?.photoUri ?? '',
        time: r.publishTime ? Date.parse(r.publishTime) : 0,
      }))
      .sort((a, b) => b.time - a.time)

    return {
      rating: data.rating,
      user_ratings_total: data.userRatingCount ?? 0,
      reviews,
    }
  } catch (error) {
    console.error('[google-places] échec de la requête', error)
    return null
  }
}
