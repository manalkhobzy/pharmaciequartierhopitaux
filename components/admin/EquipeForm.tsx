'use client'

import { useState, useTransition } from 'react'
import { Loader2, Upload, X, Eye, User } from 'lucide-react'
import type { Membre } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'

interface EquipeFormProps {
  membre?: Membre
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export default function EquipeForm({ membre, action, submitLabel }: EquipeFormProps) {
  const [isPending, startTransition] = useTransition()
  const [nom, setNom] = useState(membre?.nom ?? '')
  const [titre, setTitre] = useState(membre?.titre ?? '')
  const [titreLong, setTitreLong] = useState(membre?.titre_long ?? '')
  const [description, setDescription] = useState(membre?.description ?? '')
  const [photoUrl, setPhotoUrl] = useState(membre?.photo_url ?? '')
  const [orderIndex, setOrderIndex] = useState(membre?.order_index ?? 0)
  const [active, setActive] = useState(membre?.active ?? true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `equipe/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(filename, file, { contentType: file.type })
    if (error) {
      setError("Erreur lors de l'upload de la photo.")
    } else {
      const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(data.path)
      setPhotoUrl(publicUrl)
    }
    setUploading(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!nom.trim()) { setError('Le nom est requis.'); return }
    const fd = new FormData(e.currentTarget)
    fd.set('active', String(active))
    fd.set('photo_url', photoUrl)
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {membre && <input type="hidden" name="id" value={membre.id} />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-5">

          {/* Identité */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Identité</p>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom *</label>
              <input
                name="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Dr Manal Khobzi Sordo"
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Fonction (courte)</label>
                <input
                  name="titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Docteur en Pharmacie"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Fonction (longue)</label>
                <input
                  name="titre_long"
                  value={titreLong}
                  onChange={(e) => setTitreLong(e.target.value)}
                  placeholder="Docteur en Pharmacie, Faculté de Lille"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Présentation courte du membre affichée sur la page Notre pharmacie"
                rows={4}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Photo */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Photo (optionnelle — sinon l&apos;initiale du prénom est affichée)
            </p>
            <input type="hidden" name="photo_url" value={photoUrl} />

            {photoUrl ? (
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="Aperçu" className="w-20 h-20 object-cover rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={12} /> Supprimer la photo
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
                  <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, WEBP · portrait carré recommandé</p>
                </div>
                <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} disabled={uploading} />
              </label>
            )}
          </div>

        </div>

        {/* Colonne latérale */}
        <div className="space-y-5">

          {/* Aperçu */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Aperçu</p>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl} alt={nom || 'Aperçu'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-50 text-primary">
                    {nom ? (
                      <span className="text-2xl font-bold">{nom.charAt(0)}</span>
                    ) : (
                      <User size={28} />
                    )}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{nom || 'Nom du membre'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{titreLong || titre || 'Fonction'}</p>
              </div>
            </div>
          </div>

          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Publication</p>

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-medium text-gray-900">Visible</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {active ? 'Affiché sur la page Notre pharmacie' : 'Masqué du site'}
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
              href="/notre-pharmacie"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 text-gray-500 text-xs font-medium py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Eye size={13} />
              Voir la page Notre pharmacie
            </a>
          </div>

        </div>
      </div>
    </form>
  )
}
