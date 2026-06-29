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

export async function fetchPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId || apiKey === 'VOTRE_CLE_API_ICI') return null

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}` +
    `&fields=rating,user_ratings_total,reviews` +
    `&language=fr` +
    `&reviews_sort=newest` +
    `&key=${apiKey}`

  const res = await fetch(url, {
    next: { revalidate: 43200 }, // re-fetch toutes les 12h
  })

  if (!res.ok) return null

  const data = await res.json()
  if (data.status !== 'OK') return null

  return data.result as PlaceDetails
}
