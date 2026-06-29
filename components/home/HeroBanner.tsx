"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { PHARMACIE } from "@/lib/constants"

const slides = [
  {
    title: "Votre ordonnance\nprête en 1h",
    subtitle: "Envoyez votre ordonnance par WhatsApp et venez récupérer vos médicaments en toute simplicité.",
    cta: { label: "Envoyer mon ordonnance", href: `https://wa.me/${PHARMACIE.whatsapp}?text=${PHARMACIE.whatsappOrdonnanceMsg}`, external: true },
    image_url: "/images/hero/ordonnance.webp",
    image_alt: "Service ordonnance WhatsApp",
  },
  {
    title: "Parapharmacie\nen libre accès",
    subtitle: "Soins, cosmétiques et compléments alimentaires sélectionnés par nos pharmaciens.",
    cta: { label: "Découvrir nos services", href: "/services", external: false },
    image_url: "/images/hero/parapharmacie.webp",
    image_alt: "Rayon parapharmacie",
  },
  {
    title: "Préparations\nmagistrales",
    subtitle: "Formules personnalisées préparées sur mesure dans notre officine pour chaque patient.",
    cta: { label: "En savoir plus", href: "/services", external: false },
    image_url: "/images/hero/preparations.webp",
    image_alt: "Préparations magistrales",
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [])
  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative bg-linear-to-br from-primary-700 via-primary-500 to-primary-400 overflow-hidden min-h-140 flex items-center">

      {/* Pattern grille en overlay */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Cercles décoratifs */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/4" aria-hidden="true" />
      <div className="absolute right-32 bottom-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center w-full">

        {/* Colonne texte */}
        <div>
          {/* Badge localisation */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            279 Bd Abdelmoumen, Casablanca
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {slide.cta.external ? (
                  <a
                    href={slide.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-primary-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-primary-50 transition-all shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {slide.cta.label}
                  </a>
                ) : (
                  <Link
                    href={slide.cta.href}
                    className="flex items-center gap-2 bg-white text-primary-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-primary-50 transition-all shadow-lg"
                  >
                    {slide.cta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href="/services"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
                >
                  Nos services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicateurs + flèches */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={prev} aria-label="Slide précédente" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Aller à la slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Slide suivante" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Colonne droite — Image de la slide */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              {!imageErrors[current] ? (
                <Image
                  src={slide.image_url}
                  alt={slide.image_alt}
                  fill
                  className="object-cover"
                  onError={() => setImageErrors(prev => ({ ...prev, [current]: true }))}
                  priority={current === 0}
                />
              ) : (
                /* Placeholder affiché si l'image est absente */
                <div className="w-full h-full bg-white/10 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/30 rounded-2xl">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm text-center px-4">
                    Ajouter une image dans<br />
                    <code className="text-white/80 text-xs">{slide.image_url}</code>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
