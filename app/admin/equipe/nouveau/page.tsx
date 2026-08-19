import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import EquipeForm from '@/components/admin/EquipeForm'
import { createMembreAction } from '../actions'

export default function NouveauMembrePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/equipe" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouveau membre</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ajoutez un membre à l&apos;équipe de la pharmacie</p>
        </div>
      </div>
      <EquipeForm action={createMembreAction} submitLabel="Créer le membre" />
    </div>
  )
}
