import Link from 'next/link'
import { PlusCircle, Pencil, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Slide } from '@/lib/supabase/types'
import { toggleSlideActiveAction, moveSlideAction, deleteSlideAction } from './actions'
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton'

const THEME_LABELS: Record<string, string> = {
  '#2E7D32': '🟢 Vert',
  '#1565C0': '🔵 Bleu',
  '#880E4F': '🩷 Rose',
  '#E65100': '🟠 Orange',
  '#6A1B9A': '🟣 Violet',
  '#00695C': '🩵 Turquoise',
}

export default async function SlidesListPage() {
  const supabase = await createClient()
  const { data: slides } = await supabase
    .from('slides')
    .select('*')
    .order('order_index', { ascending: true })

  const list = (slides ?? []) as Slide[]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Slider homepage</h1>
          <p className="text-sm text-gray-500 mt-1">{list.length} slide(s) — glissez pour réordonner</p>
        </div>
        <Link
          href="/admin/slides/nouveau"
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-light transition-colors"
        >
          <PlusCircle size={16} />
          Nouveau slide
        </Link>
      </div>

      {/* Prévisualisation */}
      {list.length > 0 && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 120, background: list[0].bg_gradient, position: 'relative' }}>
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <p className="text-lg font-bold leading-tight" style={{ color: list[0].accent_color }}>{list[0].title}</p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{list[0].subtitle}</p>
          </div>
          <div className="absolute bottom-3 left-8 flex gap-1.5">
            {list.map((_, i) => (
              <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? '#1B3560' : '#94a3b8' }} />
            ))}
          </div>
          <span className="absolute top-2 right-3 text-[10px] text-gray-400 font-medium">Aperçu du 1er slide</span>
        </div>
      )}

      {/* Liste */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-3">Aucun slide pour l'instant</p>
            <Link href="/admin/slides/nouveau" className="text-primary text-sm font-medium hover:underline">
              Créer le premier slide →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Ordre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aperçu</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Bouton CTA</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((slide, idx) => (
                <tr key={slide.id} className="hover:bg-gray-50/50 transition-colors">

                  {/* Ordre ▲▼ */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <form action={moveSlideAction}>
                        <input type="hidden" name="id" value={slide.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={idx === 0} className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                          <ChevronUp size={14} />
                        </button>
                      </form>
                      <span className="text-xs text-gray-400 text-center font-mono">{idx + 1}</span>
                      <form action={moveSlideAction}>
                        <input type="hidden" name="id" value={slide.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={idx === list.length - 1} className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                          <ChevronDown size={14} />
                        </button>
                      </form>
                    </div>
                  </td>

                  {/* Aperçu couleur + titre */}
                  <td className="px-4 py-3 max-w-0 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-lg shrink-0 border border-white shadow-sm"
                        style={{ background: slide.bg_gradient }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{slide.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {THEME_LABELS[slide.accent_color] ?? slide.accent_color}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CTA */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                      {slide.cta_label}
                    </span>
                  </td>

                  {/* Actif toggle */}
                  <td className="px-4 py-3 text-center">
                    <form action={toggleSlideActiveAction}>
                      <input type="hidden" name="id" value={slide.id} />
                      <input type="hidden" name="active" value={String(!slide.active)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-colors ${
                          slide.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {slide.active ? <Eye size={11} /> : <EyeOff size={11} />}
                        {slide.active ? 'Visible' : 'Masqué'}
                      </button>
                    </form>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/slides/${slide.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Pencil size={12} />
                        <span className="hidden sm:inline">Modifier</span>
                      </Link>
                      <DeleteConfirmButton
                        formAction={deleteSlideAction}
                        id={slide.id}
                        message="Supprimer ce slide définitivement ?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
