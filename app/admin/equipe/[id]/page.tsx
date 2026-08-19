import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import EquipeForm from '@/components/admin/EquipeForm'
import { updateMembreAction } from '../actions'

export default async function EditMembrePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: membre } = await supabase.from('equipe').select('*').eq('id', id).single()

  if (!membre) notFound()

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/equipe" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modifier le membre</h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate max-w-xl">{membre.nom}</p>
        </div>
      </div>
      <EquipeForm membre={membre} action={updateMembreAction} submitLabel="Enregistrer les modifications" />
    </div>
  )
}
