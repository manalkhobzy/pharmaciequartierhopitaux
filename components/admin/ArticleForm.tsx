'use client'

import { useState, useTransition } from 'react'
import { Loader2, Upload, X, Eye } from 'lucide-react'
import dynamic from 'next/dynamic'
import slugify from 'slugify'
import type { Article } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'

const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-200 rounded-xl h-64 flex items-center justify-center bg-gray-50">
      <Loader2 size={20} className="animate-spin text-gray-400" />
    </div>
  ),
})

const CATEGORIES = [
  'Conseils santé',
  'Médicaments',
  'Nutrition',
  'Phytothérapie',
  'Aromathérapie',
  'Dermatologie',
  'Pédiatrie',
  'Seniors',
  'Prévention',
  'Actualités',
]

interface ArticleFormProps {
  article?: Article
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export default function ArticleForm({ article, action, submitLabel }: ArticleFormProps) {
  const [isPending, startTransition] = useTransition()
  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [slugManual, setSlugManual] = useState(!!article)
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '')
  const [category, setCategory] = useState(article?.category ?? CATEGORIES[0])
  const [readTime, setReadTime] = useState(article?.read_time ?? '5 min')
  const [imageUrl, setImageUrl] = useState(article?.image_url ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [published, setPublished] = useState(article?.published ?? false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!slugManual) {
      setSlug(slugify(val, { lower: true, strict: true, locale: 'fr' }))
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(filename, file, { contentType: file.type })
    if (error) {
      setError("Erreur lors de l'upload de l'image.")
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path)
      setImageUrl(publicUrl)
    }
    setUploading(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!title.trim()) { setError('Le titre est requis.'); return }
    if (!slug.trim()) { setError('Le slug est requis.'); return }
    if (!content.trim() || content === '<p></p>') { setError('Le contenu est requis.'); return }

    const fd = new FormData(e.currentTarget)
    fd.set('content', content)
    fd.set('published', String(published))
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {article && <input type="hidden" name="id" value={article.id} />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-5">

          {/* Titre */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Titre *
              </label>
              <input
                name="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Titre de l'article"
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Slug (URL) *
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl">
                  /actualites-et-conseils/
                </span>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }}
                  placeholder="mon-article"
                  required
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-xl text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Extrait */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Extrait (résumé)
              </label>
              <textarea
                name="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Résumé affiché dans la liste des articles (2-3 phrases)"
                rows={3}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Éditeur TipTap */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Contenu *
            </label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>

        </div>

        {/* Colonne latérale */}
        <div className="space-y-5">

          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 mb-4 uppercase tracking-wide">Publication</p>

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-medium text-gray-900">Statut</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {published ? 'Visible sur le site' : 'Brouillon — non visible'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  published ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  published ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60"
            >
              {isPending && <Loader2 size={15} className="animate-spin" />}
              {isPending ? 'Enregistrement…' : submitLabel}
            </button>

            {article && (
              <a
                href={`/actualites-et-conseils/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 text-gray-500 text-xs font-medium py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Eye size={13} />
                Voir sur le site
              </a>
            )}
          </div>

          {/* Métadonnées */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Métadonnées</p>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Catégorie</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Temps de lecture</label>
              <input
                name="read_time"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {/* Image de couverture */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Image de couverture</p>

            <input type="hidden" name="image_url" value={imageUrl} />

            {imageUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Couverture"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/40 hover:bg-primary-50/30 transition-colors">
                  {uploading ? (
                    <Loader2 size={22} className="animate-spin text-gray-400 mx-auto mb-2" />
                  ) : (
                    <Upload size={22} className="text-gray-300 mx-auto mb-2" />
                  )}
                  <p className="text-xs text-gray-400">
                    {uploading ? 'Upload en cours…' : 'Cliquer pour uploader'}
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1">JPG, PNG, WEBP · max 5 Mo</p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>

        </div>
      </div>
    </form>
  )
}
