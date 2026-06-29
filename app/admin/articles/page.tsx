import Link from 'next/link'
import { PlusCircle, Pencil, Star, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'
import { togglePublishedAction, setConseilDuMoisAction, deleteArticleAction } from './actions'
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton'

export default async function ArticlesListPage() {
  const supabase = await createClient()

  const [
    { data: articles },
    { data: settings },
  ] = await Promise.all([
    supabase.from('articles').select('*').order('created_at', { ascending: false }),
    supabase.from('settings').select('key,value'),
  ])

  const conseilId = settings?.find((s) => s.key === 'conseil_du_mois_id')?.value

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-sm text-gray-500 mt-1">{articles?.length ?? 0} article(s) au total</p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-light transition-colors"
        >
          <PlusCircle size={16} />
          Nouvel article
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {(!articles || articles.length === 0) ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Aucun article pour l'instant</p>
            <Link href="/admin/articles/nouveau" className="text-primary text-sm font-medium hover:underline">
              Rédiger le premier article →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Conseil</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article: Article) => {
                const isConseil = article.id === conseilId
                return (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Titre */}
                    <td className="px-4 py-3.5 max-w-0 w-full">
                      <div className="flex items-center gap-2 min-w-0">
                        {isConseil && (
                          <Star size={13} className="text-amber-400 fill-amber-400 shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-900 truncate">{article.title}</span>
                      </div>
                    </td>

                    {/* Catégorie */}
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-gray-400">
                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Statut toggle */}
                    <td className="px-4 py-3.5 text-center">
                      <form action={togglePublishedAction}>
                        <input type="hidden" name="id" value={article.id} />
                        <input type="hidden" name="published" value={String(!article.published)} />
                        <button
                          type="submit"
                          title={article.published ? 'Dépublier' : 'Publier'}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-colors ${
                            article.published
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          {article.published ? <Eye size={11} /> : <EyeOff size={11} />}
                          {article.published ? 'Publié' : 'Brouillon'}
                        </button>
                      </form>
                    </td>

                    {/* Conseil du Mois */}
                    <td className="px-4 py-3.5 text-center">
                      <form action={setConseilDuMoisAction}>
                        <input type="hidden" name="id" value={isConseil ? '' : article.id} />
                        <button
                          type="submit"
                          title={isConseil ? 'Retirer comme Conseil du Mois' : 'Définir comme Conseil du Mois'}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-colors ${
                            isConseil
                              ? 'bg-amber-100 text-amber-500 hover:bg-amber-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-400'
                          }`}
                        >
                          <Star size={14} className={isConseil ? 'fill-amber-400' : ''} />
                        </button>
                      </form>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <Pencil size={12} />
                          <span className="hidden sm:inline">Modifier</span>
                        </Link>
                        <DeleteConfirmButton
                          formAction={deleteArticleAction}
                          id={article.id}
                          message="Supprimer cet article définitivement ?"
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
