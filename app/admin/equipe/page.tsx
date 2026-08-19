import Link from 'next/link'
import { PlusCircle, Pencil, ChevronUp, ChevronDown, Eye, EyeOff, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Membre } from '@/lib/supabase/types'
import { toggleMembreActiveAction, moveMembreAction, deleteMembreAction } from './actions'
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton'

export default async function EquipePage() {
  const supabase = await createClient()
  const { data: membres } = await supabase
    .from('equipe')
    .select('*')
    .order('order_index', { ascending: true })

  const list = (membres ?? []) as Membre[]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Équipe</h1>
          <p className="text-sm text-gray-500 mt-1">{list.length} membre(s) — affichés sur &quot;Notre pharmacie&quot;</p>
        </div>
        <Link
          href="/admin/equipe/nouveau"
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-light transition-colors"
        >
          <PlusCircle size={16} />
          Nouveau membre
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-3">Aucun membre pour l&apos;instant</p>
            <Link href="/admin/equipe/nouveau" className="text-primary text-sm font-medium hover:underline">
              Ajouter le premier membre →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Ordre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Membre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Fonction</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((membre, idx) => (
                <tr key={membre.id} className="hover:bg-gray-50/50 transition-colors">

                  {/* Ordre ▲▼ */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <form action={moveMembreAction}>
                        <input type="hidden" name="id" value={membre.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={idx === 0} className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                          <ChevronUp size={14} />
                        </button>
                      </form>
                      <span className="text-xs text-gray-400 text-center font-mono">{idx + 1}</span>
                      <form action={moveMembreAction}>
                        <input type="hidden" name="id" value={membre.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={idx === list.length - 1} className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                          <ChevronDown size={14} />
                        </button>
                      </form>
                    </div>
                  </td>

                  {/* Photo + nom */}
                  <td className="px-4 py-3 max-w-0 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      {membre.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={membre.photo_url} alt={membre.nom} className="w-10 h-10 rounded-full object-cover shrink-0 border border-white shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 rounded-full shrink-0 bg-primary-50 text-primary flex items-center justify-center border border-white shadow-sm">
                          <User size={16} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{membre.nom}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate md:hidden">{membre.titre}</p>
                      </div>
                    </div>
                  </td>

                  {/* Fonction */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                      {membre.titre}
                    </span>
                  </td>

                  {/* Actif toggle */}
                  <td className="px-4 py-3 text-center">
                    <form action={toggleMembreActiveAction}>
                      <input type="hidden" name="id" value={membre.id} />
                      <input type="hidden" name="active" value={String(!membre.active)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-colors ${
                          membre.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {membre.active ? <Eye size={11} /> : <EyeOff size={11} />}
                        {membre.active ? 'Visible' : 'Masqué'}
                      </button>
                    </form>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/equipe/${membre.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Pencil size={12} />
                        <span className="hidden sm:inline">Modifier</span>
                      </Link>
                      <DeleteConfirmButton
                        formAction={deleteMembreAction}
                        id={membre.id}
                        message="Supprimer ce membre de l'équipe définitivement ?"
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
