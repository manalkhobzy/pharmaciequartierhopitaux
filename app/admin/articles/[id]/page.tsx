import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ArticleForm from '@/components/admin/ArticleForm'
import { updateArticleAction } from '../actions'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('*').eq('id', id).single()

  if (!article) notFound()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/articles"
          className="text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modifier l'article</h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate max-w-xl">{article.title}</p>
        </div>
      </div>

      <ArticleForm
        article={article}
        action={updateArticleAction}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  )
}
