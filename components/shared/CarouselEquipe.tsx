'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const EQUIPE = [
  {
    nom: 'Dr Manal Sordo',
    titre: 'Docteur en Pharmacie',
    description:
      'Diplômée de la Faculté de Pharmacie de Lille, la Dr Sordo a exercé 2 ans en France avant de reprendre la Pharmacie Quartier des Hôpitaux. Spécialisée en dermatologie, phytothérapie et aromathérapie.',
    photo: '/images/team-manal-sordo.webp',
  },
  {
    nom: 'Équipe officine',
    titre: 'Préparateurs en pharmacie',
    description:
      'Notre équipe de préparateurs est formée pour vous accueillir avec professionnalisme, vous conseiller sur vos traitements et préparer vos ordonnances avec soin.',
    photo: '/images/team-equipe-officine.webp',
  },
  {
    nom: 'Conseil parapharmacie',
    titre: 'Spécialistes beauté & soin',
    description:
      'Nos conseillers en parapharmacie vous orientent dans le choix de vos soins : dermo-cosmétique, capillaire, hygiène et bien-être.',
    photo: '/images/team-conseil-parapharmacie.webp',
  },
]

export default function CarouselEquipe() {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + EQUIPE.length) % EQUIPE.length)
  const next = () => setIndex((i) => (i + 1) % EQUIPE.length)
  const membre = EQUIPE[index]

  return (
    <div className="relative">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        aria-label="Suivant"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>

      <div className="text-center px-8">
        <Image
          src={membre.photo ?? '/images/article-placeholder.webp'}
          width={400}
          height={400}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-5 shadow-md"
          alt={membre.nom}
        />
        <h3 className="font-bold text-gray-900 text-lg">{membre.nom}</h3>
        <p className="text-sm font-medium text-gray-500 mb-4">{membre.titre}</p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">{membre.description}</p>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {EQUIPE.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ backgroundColor: i === index ? '#1B3560' : '#CBD5E1' }}
            aria-label={`Membre ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
