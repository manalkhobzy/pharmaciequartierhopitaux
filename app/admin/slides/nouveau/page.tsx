import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SlideForm from '@/components/admin/SlideForm'
import { createSlideAction } from '../actions'

export default function NouveauSlidePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/slides" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouveau slide</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ajoutez un slide au carousel de la homepage</p>
        </div>
      </div>
      <SlideForm action={createSlideAction} submitLabel="Créer le slide" />
    </div>
  )
}
