'use client'

import { useState, useTransition } from 'react'
import { Loader2, Upload, X, Eye } from 'lucide-react'
import type { Slide } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'

const COLOR_PRESETS = [
  { label: 'Vert nature',  accent: '#2E7D32', bg: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
  { label: 'Bleu océan',   accent: '#1565C0', bg: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
  { label: 'Rose care',    accent: '#880E4F', bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
  { label: 'Orange chaud', accent: '#E65100', bg: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)' },
  { label: 'Violet zen',   accent: '#6A1B9A', bg: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
  { label: 'Turquoise',    accent: '#00695C', bg: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' },
]

interface SlideFormProps {
  slide?: Slide
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export default function SlideForm({ slide, action, submitLabel }: SlideFormProps) {
  const [isPending, startTransition] = useTransition()
  const [title, setTitle] = useState(slide?.title ?? '')
  const [subtitle, setSubtitle] = useState(slide?.subtitle ?? '')
  const [ctaLabel, setCtaLabel] = useState(slide?.cta_label ?? 'En savoir plus')
  const [ctaHref, setCtaHref] = useState(slide?.cta_href ?? '/')
  const [imageUrl, setImageUrl] = useState(slide?.image_url ?? '')
  const [imageAlt, setImageAlt] = useState(slide?.image_alt ?? '')
  const [orderIndex, setOrderIndex] = useState(slide?.order_index ?? 0)
  const [active, setActive] = useState(slide?.active ?? true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const initialPreset = COLOR_PRESETS.find((p) => p.accent === slide?.accent_color) ?? COLOR_PRESETS[0]
  const [selectedPreset, setSelectedPreset] = useState(initialPreset)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `slides/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(filename, file, { contentType: file.type })
    if (error) {
      setError("Erreur lors de l'upload de l'image.")
    } else {
      const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(data.path)
      setImageUrl(publicUrl)
      if (!imageAlt) setImageAlt(title)
    }
    setUploading(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!title.trim()) { setError('Le titre est requis.'); return }
    const fd = new FormData(e.currentTarget)
    fd.set('active', String(active))
    fd.set('accent_color', selectedPreset.accent)
    fd.set('bg_gradient', selectedPreset.bg)
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {slide && <input type="hidden" name="id" value={slide.id} />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Prévisualisation live */}
      <div
        className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
        style={{ height: 140, background: selectedPreset.bg }}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <p className="text-xl font-bold leading-tight" style={{ color: selectedPreset.accent }}>
            {title || 'Titre du slide'}
          </p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {subtitle || 'Sous-titre affiché ici…'}
          </p>
          <div className="mt-3">
            <span
              className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded"
              style={{ backgroundColor: selectedPreset.accent }}
            >
              {ctaLabel || 'Bouton CTA'}
            </span>
          </div>
        </div>
        {imageUrl && (
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        <span className="absolute top-2 right-3 text-[10px] text-gray-400 font-medium">Aperçu</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-5">

          {/* Textes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Contenu</p>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Titre *</label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Votre ordonnance prête en 1h"
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Sous-titre</label>
              <textarea
                name="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Description courte affichée sous le titre"
                rows={2}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Texte du bouton</label>
                <input
                  name="cta_label"
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  placeholder="En savoir plus"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Lien du bouton</label>
                <input
                  name="cta_href"
                  value={ctaHref}
                  onChange={(e) => setCtaHref(e.target.value)}
                  placeholder="/services ou https://wa.me/…"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Couleur */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Thème de couleur</p>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_PRESETS.map((preset) => {
                const isSelected = selectedPreset.accent === preset.accent
                return (
                  <button
                    key={preset.accent}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected ? 'border-gray-900 shadow-md scale-[1.02]' : 'border-transparent hover:border-gray-300'
                    }`}
                    style={{ height: 56, background: preset.bg }}
                  >
                    <span
                      className="absolute bottom-1.5 left-2 text-[10px] font-bold"
                      style={{ color: preset.accent }}
                    >
                      {preset.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-[9px]">✓</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <input type="hidden" name="accent_color" value={selectedPreset.accent} />
            <input type="hidden" name="bg_gradient" value={selectedPreset.bg} />
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Image de fond (côté droit, optionnelle)
            </p>
            <input type="hidden" name="image_url" value={imageUrl} />

            {imageUrl ? (
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Aperçu" className="w-28 h-20 object-cover rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <input
                    name="image_alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Texte alternatif (accessibilité)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={12} /> Supprimer l'image
                  </button>
                </div>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-primary/40 hover:bg-primary-50/30 transition-colors">
                  {uploading
                    ? <Loader2 size={20} className="animate-spin text-gray-400 mx-auto mb-1" />
                    : <Upload size={20} className="text-gray-300 mx-auto mb-1" />}
                  <p className="text-xs text-gray-400">{uploading ? 'Upload…' : 'Cliquer pour uploader'}</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, WEBP · 1400×400 px recommandé</p>
                </div>
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
              </label>
            )}
          </div>

        </div>

        {/* Colonne latérale */}
        <div className="space-y-5">

          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Publication</p>

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-medium text-gray-900">Visible</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {active ? 'Affiché sur la homepage' : 'Masqué du carousel'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Position (ordre)</label>
              <input
                name="order_index"
                type="number"
                min={0}
                value={orderIndex}
                onChange={(e) => setOrderIndex(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <p className="text-[10px] text-gray-400 mt-1">0 = premier. Les flèches ▲▼ dans la liste font la même chose.</p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60"
            >
              {isPending && <Loader2 size={15} className="animate-spin" />}
              {isPending ? 'Enregistrement…' : submitLabel}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 text-gray-500 text-xs font-medium py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Eye size={13} />
              Voir la homepage
            </a>
          </div>

        </div>
      </div>
    </form>
  )
}
