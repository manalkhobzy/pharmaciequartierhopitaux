import Link from 'next/link'
import Image from 'next/image'
import { Sun, Syringe, Leaf, Apple, FileText, ShoppingBag, FlaskConical, Droplets, ChevronRight, Camera, MessageCircle, Clock, Heart, Shield, type LucideIcon } from 'lucide-react'
import HeroCarousel from '@/components/home/HeroCarousel'
import { getConseilDuMois, getCategories } from '@/lib/articles'
import { getActiveSlides } from '@/lib/slides'
import type { Article } from '@/lib/supabase/types'

// ─── DONNÉES ────────────────────────────────────────────────────────────────

const HORAIRES = [
  { jour: 'lun.', heures: '09:00 – 20:00', dayIndex: 1 },
  { jour: 'mar.', heures: '09:00 – 20:00', dayIndex: 2 },
  { jour: 'mer.', heures: '09:00 – 20:00', dayIndex: 3 },
  { jour: 'jeu.', heures: '09:00 – 20:00', dayIndex: 4 },
  { jour: 'ven.', heures: '09:00 – 20:00', dayIndex: 5 },
  { jour: 'sam.', heures: '09:00 – 13:30', dayIndex: 6 },
  { jour: 'dim.', heures: 'fermé', dayIndex: 0 },
]

const SERVICES: { label: string; description: string; Icon: LucideIcon; iconBg: string; iconColor: string; href: string }[] = [
  { label: "Envoi d'ordonnance", description: 'Photo WhatsApp · prête en 1h', Icon: FileText, iconBg: '#E8F5EE', iconColor: '#1B6B4A', href: '/ordonnance' },
  { label: 'Parapharmacie', description: 'Dermo-cosmétique, hygiène, nutrition', Icon: ShoppingBag, iconBg: '#EFF6FF', iconColor: '#1565C0', href: '/nos-services' },
  { label: 'Préparations magistrales', description: 'Formules personnalisées sur mesure', Icon: FlaskConical, iconBg: '#F5F3FF', iconColor: '#7C3AED', href: '/nos-services' },
  { label: 'Phytothérapie', description: 'Plantes médicinales & remèdes naturels', Icon: Leaf, iconBg: '#F0FDF4', iconColor: '#16A34A', href: '/nos-services' },
  { label: 'Aromathérapie', description: 'Huiles essentielles & bien-être', Icon: Droplets, iconBg: '#FFF7ED', iconColor: '#EA580C', href: '/nos-services' },
]

// ─── COMPOSANTS SERVEUR ──────────────────────────────────────────────────────

function InfoBar() {
  return (
    <div className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 grid grid-cols-3 divide-x divide-white/20">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-4 px-2 sm:px-6 py-4">
          <svg className="w-5 h-5 sm:w-8 sm:h-8 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-bold text-[10px] sm:text-sm uppercase tracking-wide">PRÉPARATION</p>
            <p className="text-white/70 text-[10px] sm:text-sm">de vos ordonnances en 1h</p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-4 px-2 sm:px-6 py-4">
          <svg className="w-5 h-5 sm:w-8 sm:h-8 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div>
            <p className="font-bold text-[10px] sm:text-sm uppercase tracking-wide">BESOIN D&apos;AIDE ?</p>
            <p className="text-white/70 text-[10px] sm:text-sm">Contactez-nous !</p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-4 px-2 sm:px-6 py-4">
          <svg className="w-5 h-5 sm:w-8 sm:h-8 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="font-bold text-[10px] sm:text-sm uppercase tracking-wide">WHATSAPP</p>
            <p className="text-white/70 text-[10px] sm:text-sm">Ordonnance · 06 53 46 87 85</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WelcomeSection() {
  const today = new Date().getDay()
  return (
    <section className="pt-6 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Bienvenue dans notre pharmacie</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-lg overflow-hidden">
            <Image src="/images/pharmacie.webp" alt="Pharmacie Quartier des Hôpitaux — Casablanca" width={600} height={400} className="w-full h-auto" />
          </div>
          <div className="text-gray-700 text-sm leading-relaxed space-y-3 text-justify">
            <p className="font-bold text-gray-900">Bienvenue à la Pharmacie Quartier des Hôpitaux !</p>
            <p>Idéalement située au 279 Boulevard Abdelmoumen à Casablanca et proche des transports en commun (Arrêt Abd El Moumen Tram T1, T2), la Dr Manal Sordo et son équipe vous accueillent non-stop du lundi au vendredi de 9h00 à 20h00 et le samedi jusqu&apos;à 13h30.</p>
            <p>N&apos;hésitez pas à nous envoyer votre{' '}<Link href="/ordonnance" className="text-navy font-semibold underline">ordonnance par WhatsApp</Link>, ou à venir nous rendre visite.</p>
            <p className="font-semibold">À très bientôt !</p>
          </div>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-navy px-4 py-2 flex items-center justify-between">
              <span className="text-white font-bold text-sm">Horaires d&apos;ouverture</span>
            </div>
            <div className="divide-y divide-gray-100">
              {HORAIRES.map((h) => {
                const isToday = h.dayIndex === today
                return (
                  <div key={h.jour} className={`flex items-center justify-between px-4 py-2 text-sm ${isToday ? 'bg-navy/5 font-bold text-navy' : 'text-gray-700'}`}>
                    <span className={`w-8 ${isToday ? 'text-navy' : 'text-gray-500'}`}>{h.jour}</span>
                    <span className={isToday ? 'text-navy font-bold' : ''}>{h.heures}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CATEGORY_CONFIG: Record<string, { bg: string; iconBg: string; iconColor: string; Icon: LucideIcon }> = {
  'Conseils santé': { bg: '#F0FDF4', iconBg: '#DCFCE7', iconColor: '#16A34A', Icon: Leaf },
  'Médicaments':    { bg: '#EFF6FF', iconBg: '#DBEAFE', iconColor: '#2563EB', Icon: FlaskConical },
  'Nutrition':      { bg: '#FFF8ED', iconBg: '#FEF3C7', iconColor: '#D97706', Icon: Apple },
  'Phytothérapie':  { bg: '#F0FDF4', iconBg: '#DCFCE7', iconColor: '#059669', Icon: Leaf },
  'Aromathérapie':  { bg: '#FFF7ED', iconBg: '#FFEDD5', iconColor: '#EA580C', Icon: Droplets },
  'Dermatologie':   { bg: '#FFF8ED', iconBg: '#FEF9C3', iconColor: '#CA8A04', Icon: Sun },
  'Pédiatrie':      { bg: '#F0FDF4', iconBg: '#DCFCE7', iconColor: '#16A34A', Icon: Syringe },
  'Seniors':        { bg: '#F5F3FF', iconBg: '#EDE9FE', iconColor: '#7C3AED', Icon: Heart },
  'Prévention':     { bg: '#ECFDF5', iconBg: '#D1FAE5', iconColor: '#059669', Icon: Shield },
  'Actualités':     { bg: '#EFF6FF', iconBg: '#DBEAFE', iconColor: '#2563EB', Icon: FileText },
  'Bien-être':      { bg: '#FFF1F2', iconBg: '#FFE4E6', iconColor: '#E11D48', Icon: Heart },
}
const DEFAULT_CATEGORY_CONFIG = { bg: '#F9FAFB', iconBg: '#F3F4F6', iconColor: '#6B7280', Icon: FileText }

function ConseilsActualites({ conseil, categories }: { conseil: Article | null; categories: string[] }) {
  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LE CONSEIL DU MOIS */}
        <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
          {conseil?.image_url ? (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={conseil.image_url}
                alt={conseil.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                Conseil du mois
              </span>
            </div>
          ) : (
            <div className="w-full aspect-[16/9] bg-navy/5 flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-navy/40">Conseil du mois</span>
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            {conseil ? (
              <>
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">
                  {conseil.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
                  {conseil.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                  <Link href={`/actualites-et-conseils/${conseil.slug}`} className="btn-navy inline-flex items-center justify-center gap-1.5 shrink-0">
                    Lire la suite <ChevronRight size={15} />
                  </Link>
                  <Link href="/actualites-et-conseils" className="text-navy text-sm font-medium hover:underline whitespace-nowrap">Tous les conseils</Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-sm mb-5 italic flex-1">Aucun conseil du mois sélectionné pour le moment.</p>
                <Link href="/actualites-et-conseils" className="text-navy text-sm font-medium hover:underline pt-4 border-t border-gray-100">Voir tous les conseils →</Link>
              </>
            )}
          </div>
        </div>

        {/* ACTUALITÉS SANTÉ */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">ACTUALITÉS SANTÉ</p>
            <Link href="/actualites-et-conseils" className="text-navy text-sm hover:underline">Voir toutes les actus</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 4).map((cat) => {
              const { bg, iconBg, iconColor, Icon } = CATEGORY_CONFIG[cat] ?? DEFAULT_CATEGORY_CONFIG
              return (
                <Link
                  key={cat}
                  href={`/actualites-et-conseils?categorie=${encodeURIComponent(cat)}`}
                  className="rounded-xl p-4 flex flex-col gap-3 min-h-24 hover:brightness-95 transition-all"
                  style={{ backgroundColor: bg }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
                    <Icon size={17} style={{ color: iconColor }} strokeWidth={2} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 leading-snug">{cat}</p>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

function ClickCollect() {
  const steps = [
    { num: '1', Icon: Camera,        title: 'Photographiez',  desc: 'Prenez votre ordonnance en photo.' },
    { num: '2', Icon: MessageCircle, title: 'Envoyez',        desc: 'Envoyez la photo sur WhatsApp.' },
    { num: '3', Icon: Clock,         title: 'Prête en 1h',    desc: 'Récupérez vos médicaments en pharmacie.' },
  ]
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary-50 rounded-2xl px-6 sm:px-8 py-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-2/5 shrink-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <MessageCircle size={12} /> Service WhatsApp
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-snug">Envoyez votre ordonnance, récupérez-la prête en 1h</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Photographiez votre ordonnance et envoyez-la sur WhatsApp. Notre équipe prépare vos médicaments et vous avertit dès que tout est prêt.</p>
            <Link href="/ordonnance" className="btn-navy inline-flex items-center justify-center gap-2 w-full sm:w-auto">En savoir plus<ChevronRight size={15} /></Link>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {steps.map(({ num, Icon, title, desc }) => (
              <div key={num} className="bg-white rounded-xl p-5 shadow-sm flex items-center sm:flex-col sm:items-start gap-4 sm:gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Icon size={20} className="text-primary" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {num}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesIcons() {
  return (
    <section className="py-14 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">CE QUE NOUS PROPOSONS</p>
          <h2 className="text-2xl font-bold text-gray-900">Nos services</h2>
          <div className="w-10 h-1 bg-primary rounded-full mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICES.map(({ label, description, Icon, iconBg, iconColor, href }) => (
            <Link key={label} href={href} className="group bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
                <Icon size={26} style={{ color: iconColor }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-snug mb-1">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
              </div>
              <span className="mt-auto text-xs font-semibold flex items-center gap-1" style={{ color: iconColor }}>
                En savoir plus <ChevronRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramSection() {
  return (
    <section className="border-t border-gray-100">
      <div className="py-4 px-6 flex items-center justify-center gap-8" style={{ backgroundColor: '#4DC1CB' }}>
        <span className="text-white font-bold text-sm">Suivez-nous sur les réseaux !</span>
        <a href="https://instagram.com/pharmaquartierdeshopitaux" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-semibold text-sm hover:opacity-80">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagram
        </a>
      </div>
    </section>
  )
}

// ─── PAGE PRINCIPALE (Server Component) ─────────────────────────────────────

export default async function HomePage() {
  const [conseil, slides, categories] = await Promise.all([
    getConseilDuMois(),
    getActiveSlides(),
    getCategories(),
  ])

  return (
    <>
      <HeroCarousel slides={slides} />
      <InfoBar />
      <WelcomeSection />
      <ConseilsActualites conseil={conseil} categories={categories} />
      <ClickCollect />
      <ServicesIcons />
      <InstagramSection />
    </>
  )
}
