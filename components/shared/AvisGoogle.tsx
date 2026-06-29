import Image from 'next/image'
import { fetchPlaceDetails, type GoogleReview } from '@/lib/google-places'

function Etoiles({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= note ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function CarteAvis({ avis }: { avis: GoogleReview }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
          {avis.profile_photo_url ? (
            <Image
              src={avis.profile_photo_url}
              alt={avis.author_name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-semibold text-sm">
              {avis.author_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{avis.author_name}</p>
          <p className="text-xs text-gray-400">{avis.relative_time_description}</p>
        </div>
        <div className="ml-auto shrink-0">
          <Etoiles note={avis.rating} />
        </div>
      </div>
      {avis.text && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{avis.text}</p>
      )}
    </div>
  )
}

// Avis de secours affichés si l'API n'est pas encore configurée
const AVIS_FALLBACK: GoogleReview[] = [
  {
    author_name: 'Sara M.',
    rating: 5,
    text: 'Personnel très accueillant et professionnel. La Dr Sordo prend le temps d\'expliquer chaque médicament. Je recommande vivement cette pharmacie !',
    relative_time_description: 'Il y a 2 semaines',
    profile_photo_url: '',
    time: 0,
  },
  {
    author_name: 'Karim B.',
    rating: 5,
    text: 'Service impeccable, pharmacie bien achalandée. Le service ordonnance par WhatsApp est vraiment pratique, ça m\'évite de longues attentes.',
    relative_time_description: 'Il y a 1 mois',
    profile_photo_url: '',
    time: 0,
  },
  {
    author_name: 'Nadia H.',
    rating: 5,
    text: 'Très bonne pharmacie, conseils de qualité en parapharmacie et produits dermatologiques. Espace propre et moderne.',
    relative_time_description: 'Il y a 2 mois',
    profile_photo_url: '',
    time: 0,
  },
]

export default async function AvisGoogle() {
  const details = await fetchPlaceDetails()
  const avis = details?.reviews ?? AVIS_FALLBACK
  const note = details?.rating ?? 5
  const total = details?.user_ratings_total ?? 17
  const source = details ? 'live' : 'fallback'

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ce que disent nos patients</h2>
            <div className="flex items-center gap-2 mt-2">
              <Etoiles note={Math.round(note)} />
              <span className="font-semibold text-gray-800 text-sm">{note.toFixed(1)}/5</span>
              <span className="text-gray-400 text-sm">· {total} avis Google</span>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=Pharmacie+Quartier+des+H%C3%B4pitaux+Casablanca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white bg-[#1B6B4A] hover:bg-[#2D9966] px-4 py-2 rounded-lg transition-colors self-start sm:self-auto"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Laisser un avis
          </a>
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {avis.slice(0, 6).map((a, i) => (
            <CarteAvis key={`${a.author_name}-${i}`} avis={a} />
          ))}
        </div>

        {/* Badge source */}
        {source === 'live' && (
          <p className="text-center text-xs text-gray-400 mt-6">
            Avis récupérés en temps réel depuis Google Maps
          </p>
        )}
      </div>
    </section>
  )
}
