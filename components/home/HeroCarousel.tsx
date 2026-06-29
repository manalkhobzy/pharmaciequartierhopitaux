'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Slide } from '@/lib/supabase/types'

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 'fallback-1',
    title: 'Votre ordonnance prête en 1h',
    subtitle: 'Envoyez-la sur WhatsApp, passez la récupérer.',
    cta_label: 'Envoyer mon ordonnance',
    cta_href: 'https://wa.me/212653468785',
    accent_color: '#2E7D32',
    bg_gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    image_url: '/images/hero/ordonnance.webp',
    image_alt: 'Service ordonnance WhatsApp',
    order_index: 0,
    active: true,
    created_at: '',
    updated_at: '',
  },
]

interface HeroCarouselProps {
  slides: Slide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000)
    return () => clearInterval(t)
  }, [items.length])

  const slide = items[current]

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ height: '300px', background: slide.bg_gradient, transition: 'background 0.6s ease' }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center">
        <div className="max-w-xl">
          <h1
            className="text-3xl lg:text-4xl font-bold mb-3 leading-tight"
            style={{ color: slide.accent_color }}
          >
            {slide.title}
          </h1>
          <p className="text-gray-600 text-base mb-6">{slide.subtitle}</p>
          <a
            href={slide.cta_href}
            className="inline-flex items-center gap-2 text-white text-sm font-bold px-6 py-3 rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: slide.accent_color }}
          >
            {slide.cta_label}
          </a>
        </div>

        {slide.image_url && (
          <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-1/2 overflow-hidden">
            <Image
              src={slide.image_url}
              alt={slide.image_alt}
              fill
              className="object-cover"
              priority={current === 0}
            />
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ backgroundColor: i === current ? '#1B3560' : '#94a3b8' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
