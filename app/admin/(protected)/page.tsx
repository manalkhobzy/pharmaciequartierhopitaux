import Link from 'next/link'
import { FileText, BookOpen, Star, PlusCircle, ArrowRight, TrendingUp, Wrench, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'
import { toggleMaintenanceAction } from '../actions'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalArticles },
    { count: publishedArticles },
    { count: draftArticles },
    { data: recentArticles },
    { data: settings },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', false),
    supabase.from('articles').select('id,title,slug,category,published,created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('settings').select('key,value'),
  ])

  const conseilId = settings?.find((s) => s.key === 'conseil_du_mois_id')?.value
  const maintenance = settings?.find((s) => s.key === 'maintenance_mode')?.value === 'true'
  let conseilArticle: Article | null = null
  if (conseilId) {
    const { data } = await supabase.from('articles').select('*').eq('id', conseilId).single()
    conseilArticle = data
  }

  const stats = [
    { label: 'Total articles', value: totalArticles ?? 0, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Publiés', value: publishedArticles ?? 0, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Brouillons', value: draftArticles ?? 0, icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Vue d&apos;ensemble du contenu éditorial</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bannière maintenance active */}
      {maintenance && (
        <div className="mb-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Site en maintenance</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Les visiteurs voient actuellement la page de maintenance. Désactivez-la dès que le site est prêt.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Articles récents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Articles récents</h2>
            <Link href="/admin/articles" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {(recentArticles ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">Aucun article pour l&apos;instant</p>
            ) : (
              recentArticles!.map((a: Partial<Article> & { id: string; title: string }) => (
                <Link
                  key={a.id}
                  href={`/admin/articles/${a.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.category}</p>
                  </div>
                  <span className={`ml-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                    a.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {a.published ? 'Publié' : 'Brouillon'}
                  </span>
                </Link>
              ))
            )}
          </div>
          <div className="px-5 py-4 border-t border-gray-100">
            <Link
              href="/admin/articles/nouveau"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              <PlusCircle size={16} />
              Rédiger un nouvel article
            </Link>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-6">

          {/* Conseil du mois */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <Star size={15} className="text-amber-500 fill-amber-400" />
              <h2 className="font-semibold text-gray-900 text-sm">Conseil du Mois</h2>
            </div>
            <div className="p-5">
              {conseilArticle ? (
                <div>
                  <p className="text-xs text-primary font-semibold mb-1">{conseilArticle.category}</p>
                  <p className="text-sm font-medium text-gray-900 leading-snug mb-3">
                    {conseilArticle.title}
                  </p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-3">
                    {conseilArticle.excerpt}
                  </p>
                  <Link
                    href={`/admin/articles/${conseilArticle.id}`}
                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                  >
                    Modifier <ArrowRight size={11} />
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Star size={28} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-xs text-gray-400 mb-4">Aucun conseil du mois sélectionné</p>
                  <Link href="/admin/articles" className="text-xs text-primary font-medium hover:underline">
                    Choisir dans les articles →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mode maintenance */}
          <div className={`rounded-2xl border shadow-sm overflow-hidden ${maintenance ? 'border-amber-200' : 'border-gray-100'}`}>
            <div className={`flex items-center justify-between px-5 py-4 border-b ${maintenance ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <Wrench size={15} className={maintenance ? 'text-amber-500' : 'text-gray-500'} />
                <h2 className="font-semibold text-gray-900 text-sm">Mode maintenance</h2>
              </div>
              {maintenance && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-200 text-amber-800">
                  Actif
                </span>
              )}
            </div>
            <div className="p-5 bg-white">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {maintenance
                  ? "Les visiteurs voient la page de maintenance. Désactivez dès que le site est prêt."
                  : "Remplace temporairement le site par une page d'information pendant vos travaux."}
              </p>
              <form action={toggleMaintenanceAction}>
                <input type="hidden" name="value" value={maintenance ? 'false' : 'true'} />
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    maintenance
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  <Wrench size={14} />
                  {maintenance ? 'Désactiver la maintenance' : 'Mettre en maintenance'}
                </button>
              </form>
            </div>
          </div>

        </div>
        {/* fin colonne droite */}

      </div>
    </div>
  )
}
