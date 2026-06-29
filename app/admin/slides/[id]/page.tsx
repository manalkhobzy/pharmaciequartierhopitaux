import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SlideForm from '@/components/admin/SlideForm'
import { updateSlideAction } from '../actions'

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: slide } = await supabase.from('slides').select('*').eq('id', id).single()

  if (!slide) notFound()

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/slides" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modifier le slide</h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate max-w-xl">{slide.title}</p>
        </div>
      </div>
      <SlideForm slide={slide} action={updateSlideAction} submitLabel="Enregistrer les modifications" />
    </div>
  )
}
