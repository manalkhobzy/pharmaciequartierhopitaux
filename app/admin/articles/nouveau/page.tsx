import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ArticleForm from '@/components/admin/ArticleForm'
import { createArticleAction } from '../actions'

export default function NouvelArticlePage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Nouvel article</h1>
          <p className="text-sm text-gray-500 mt-0.5">Rédigez et publiez un nouvel article</p>
        </div>
      </div>

      <ArticleForm action={createArticleAction} submitLabel="Enregistrer l'article" />
    </div>
  )
}
