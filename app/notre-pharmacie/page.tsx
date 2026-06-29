import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Notre Pharmacie",
  description:
    "Découvrez la Pharmacie Quartier des Hôpitaux : 45 ans d'histoire, équipe à l'écoute, parapharmacie en libre accès. Dr Manal Sordo, 279 Bd Abdelmoumen, Casablanca.",
}
import { MapPin, Phone, Clock, MessageSquare, FlaskConical, Sparkles, Leaf, ShoppingBag, Smartphone, HeartHandshake, ShoppingCart, Package, Pill } from 'lucide-react'
import AvisGoogle from '@/components/shared/AvisGoogle'
import { PHARMACIE } from '@/lib/constants'

const EQUIPE = [
  {
    nom: 'Dr Manal Sordo',
    titre: 'Docteur en Pharmacie, Faculté de Pharmacie de Lille.',
    photo: '/images/team-manal-sordo.webp',
  },
  {
    nom: 'Équipe officine',
    titre: 'délivrance des ordonnances, vente de médicaments et conseil médical',
    photo: '/images/team-equipe-officine.webp',
  },
  {
    nom: 'Conseil parapharmacie',
    titre: 'Spécialistes beauté, soin & bien-être',
    photo: '/images/team-conseil-parapharmacie.webp',
  },
]

const EXPERTISES = [
  { label: 'Aromathérapie',           icon: <Leaf        className="w-7 h-7 text-primary" /> },
  { label: 'Cosmétologie',            icon: <Sparkles    className="w-7 h-7 text-primary" /> },
  { label: 'Préparations magistrales',icon: <FlaskConical className="w-7 h-7 text-primary" /> },
  { label: 'Dermatologie',            icon: <HeartHandshake className="w-7 h-7 text-primary" /> },
  { label: 'Phytothérapie',           icon: <Leaf        className="w-7 h-7 text-primary" /> },
  { label: 'Parapharmacie',           icon: <ShoppingBag className="w-7 h-7 text-primary" /> },
]

const SERVICES = [
  { label: 'Ordonnance WhatsApp',       icon: <Smartphone    className="w-7 h-7 text-primary" /> },
  { label: 'Conseil personnalisé',      icon: <MessageSquare className="w-7 h-7 text-primary" /> },
  { label: 'Libre accès parapharmacie',icon: <ShoppingCart  className="w-7 h-7 text-primary" /> },
  { label: 'Préparations sur mesure',  icon: <Package       className="w-7 h-7 text-primary" /> },
  { label: 'Produits naturels',        icon: <Pill          className="w-7 h-7 text-primary" /> },
]

function LeafDecor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 118 C30 118 4 90 4 60 C4 30 30 2 30 2 C30 2 56 30 56 60 C56 90 30 118 30 118Z" fill="currentColor" />
      <line x1="30" y1="2" x2="30" y2="118" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <path d="M30 35 Q15 50 8 65" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M30 35 Q45 50 52 65" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M30 70 Q15 85 8 100" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M30 70 Q45 85 52 100" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
    </svg>
  )
}

export default function QuiSommesNousPage() {
  return (
    <div className="bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">Notre pharmacie</span>
          </nav>
        </div>
      </div>

      {/* ── TITRE ── */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Notre pharmacie</h1>
      </div>

      {/* ── PRÉSENTATION PRINCIPALE ── */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="relative w-full rounded-lg overflow-hidden aspect-4/3">
            <Image
              src="/images/pharmacie-facade.webp"
              fill
              className="object-cover"
              alt="Pharmacie Quartier des Hôpitaux"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">
            Bienvenue à la Pharmacie Quartier des Hôpitaux !
          </h2>
          <p>
            Idéalement située au <strong>279 Boulevard Abdelmoumen</strong> à Casablanca,
            la Dr Manal Sordo et son équipe vous accueillent du lundi au vendredi de
            9h00 à 20h00 et le samedi de 9h00 à 13h30.
          </p>
          <p>Notre priorité : <strong>prendre soin de vous</strong>. Nous vous proposons entre autres :</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            <li>Une <strong>parapharmacie en libre accès</strong> avec les grandes marques dermo.</li>
            <li>Des <strong>préparations magistrales</strong> en collaboration avec vos médecins et dermatologues partenaires.</li>
            <li>Des conseils personnalisés en <strong>phytothérapie</strong>, <strong>aromathérapie</strong> et <strong>homéopathie</strong> sur commande.</li>
            <li>Un service <strong>ordonnance WhatsApp</strong> : envoyez votre photo d&apos;ordonnance, nous préparons tout. Vous n&apos;avez plus qu&apos;à passer.</li>
          </ul>
          <p>Notre engagement : vous offrir une prise en charge <strong>globale, professionnelle et bienveillante</strong>.</p>
          <p className="font-semibold text-gray-900">À très bientôt !</p>
        </div>
      </section>

      {/* ── NOS EXPERTISES ── */}
      <section className="relative overflow-hidden bg-primary-50 py-16">
        <LeafDecor className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-28 text-primary opacity-25 rotate-[15deg]" />
        <LeafDecor className="absolute left-8 top-8 w-8 h-16 text-primary opacity-15 -rotate-[30deg]" />
        <LeafDecor className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-28 text-primary opacity-25 -rotate-[15deg]" />
        <LeafDecor className="absolute right-8 bottom-8 w-8 h-16 text-primary opacity-15 rotate-[30deg]" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            {/* Grille icônes */}
            <div className="lg:col-span-2 grid grid-cols-3 gap-y-8 gap-x-4">
              {EXPERTISES.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Carte description */}
            <div className="bg-primary rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-lg font-bold mb-4">Nos Expertises</h2>
              <p className="text-sm leading-relaxed text-white/90">
                Notre équipe de professionnels qualifiés s&apos;engage jour après jour pour vous et votre santé.
                Bénéficiez de conseils personnalisés en Aromathérapie, Phytothérapie, Cosmétologie,
                Dermatologie et Préparations magistrales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── NOTRE ÉQUIPE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notre équipe</h2>
          <p className="text-sm text-gray-500 mb-12">
            Notre équipe vous accueille et vous conseille du lundi au samedi.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {EQUIPE.map((membre) => (
              <div key={membre.nom} className="flex flex-col items-center gap-3 w-60">
                <div className="w-56 h-56 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                  <Image
                    src={membre.photo}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                    alt={membre.nom}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{membre.nom}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{membre.titre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS SERVICES ── */}
      <section className="relative overflow-hidden bg-primary-50 py-16">
        <LeafDecor className="absolute -left-4 bottom-1/3 w-12 h-24 text-primary opacity-20 rotate-[25deg]" />
        <LeafDecor className="absolute -right-4 top-1/3 w-12 h-24 text-primary opacity-20 -rotate-[25deg]" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            {/* Carte description à gauche */}
            <div className="bg-primary rounded-2xl p-8 text-white shadow-lg order-last lg:order-first">
              <h2 className="text-lg font-bold mb-4">Nos services</h2>
              <p className="text-sm leading-relaxed text-white/90">
                Découvrez tous les services de notre pharmacie pour faciliter votre quotidien :
                Ordonnance WhatsApp, Conseil personnalisé, Libre accès parapharmacie et Préparations sur mesure.
              </p>
            </div>

            {/* Grille icônes */}
            <div className="lg:col-span-2 grid grid-cols-3 gap-y-8 gap-x-4">
              {SERVICES.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── AVIS GOOGLE ── */}
      <AvisGoogle />

      {/* ── INFORMATIONS PRATIQUES ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informations pratiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Adresse</p>
                <p className="text-sm text-gray-600">
                  279 Boulevard Abdelmoumen<br />
                  Casablanca 20340, Maroc
                </p>
                <a
                  href="https://maps.google.com/?q=279+Bd+Abdelmoumen+Casablanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-navy hover:underline mt-1 inline-block"
                >
                  Voir sur Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Téléphone</p>
                <a href="tel:+212522860654" className="text-sm text-navy hover:underline font-medium">
                  05 22 86 06 54
                </a>
                <p className="text-xs text-gray-500 mt-1">WhatsApp : 06 53 46 87 85</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Horaires</p>
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p>Lundi – Vendredi : <span className="font-medium text-gray-800">9h00 – 20h00</span></p>
                  <p>Samedi : <span className="font-medium text-gray-800">9h00 – 13h30</span></p>
                  <p className="text-gray-400">Dimanche : Fermé</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CARTE GOOGLE MAPS ── */}
      <section aria-label="Carte de localisation" className="h-96">
        <iframe
          src={PHARMACIE.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Pharmacie Quartier des Hôpitaux"
        />
      </section>

    </div>
  )
}
