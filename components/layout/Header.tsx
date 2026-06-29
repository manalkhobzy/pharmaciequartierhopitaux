'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: "Envoi d'ordonnance", href: '/ordonnance', highlight: true },
  { label: 'Nos services', href: '/nos-services' },
  { label: 'Notre pharmacie', href: '/notre-pharmacie' },
  { label: 'Actualités et conseils', href: '/actualites-et-conseils' },
  { label: 'Nous contacter', href: '/nous-contacter' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* HEADER — barre top + logo (scroll normalement) */}
      <header className="w-full">

        {/* BARRE TOP — bleu marine */}
        <div className="bg-navy text-white text-xs py-1.5 px-4 text-center tracking-wide">
          Découvrez notre service ordonnance WhatsApp - Préparation en 1h ·{' '}
          <a href="https://wa.me/212653468785" className="underline font-semibold">
            06 53 46 87 85
          </a>
        </div>

        {/* HEADER PRINCIPAL — blanc */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-4 bg-pharmacy-green rounded-sm absolute" />
                  <div className="w-4 h-12 bg-pharmacy-green rounded-sm absolute" />
                </div>
              </div>
              <div>
                <div className="font-bold text-navy text-lg leading-tight">Pharmacie & Parapharmacie</div>
                <div className="font-bold text-navy text-lg leading-tight">Quartier des Hôpitaux</div>
                <div className="text-gray-500 text-xs">Casablanca - 279 Bd Abdelmoumen</div>
              </div>
            </Link>

            {/* CONTACT RAPIDE — desktop */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
              <a href="tel:+212522860654" className="flex items-center gap-2 hover:text-navy font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                05 22 86 06 54
              </a>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lun–Ven 9h–20h · Sam 9h–13h30
              </div>
              
            </div>

            {/* BURGER mobile */}
            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* MENU MOBILE */}
        {open && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 space-y-2">
              <p className="font-semibold">05 22 86 06 54</p>
              <p>Lun–Ven 9h–20h · Sam 9h–13h30</p>
            </div>
          </div>
        )}

      </header>

      {/* BARRE DE NAVIGATION — sticky, indépendante du header */}
      <nav className="hidden lg:flex bg-gray-50 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        {navLinks.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-3.5 border-b-2 transition-colors whitespace-nowrap
                ${link.highlight
                  ? `bg-gray-200 hover:bg-gray-300 ${isActive ? 'border-navy text-navy' : 'border-transparent text-navy'}`
                  : isActive
                    ? 'border-navy text-navy'
                    : 'border-transparent text-gray-600 hover:text-navy hover:border-navy'
                }`}
            >
              {link.highlight && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
              {link.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
