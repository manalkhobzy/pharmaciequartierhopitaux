import type { Metadata } from 'next'
import { Cross, Phone, MessageCircle, Wrench } from 'lucide-react'
import { PHARMACIE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Site en maintenance | Pharmacie Quartier des Hôpitaux',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  const waMsg = encodeURIComponent('Bonjour, je vous contacte depuis le site.')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-emerald-50 flex flex-col items-center justify-center p-6">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <Cross size={22} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Pharmacie</p>
          <p className="text-sm font-bold text-gray-900 leading-tight">Quartier des Hôpitaux</p>
        </div>
      </div>

      {/* Card principale */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-md w-full text-center">

        {/* Icône animée */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-50 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
            <Wrench size={40} className="text-amber-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
          Site en maintenance
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          Nous effectuons des améliorations pour mieux vous servir.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Notre site sera de retour très bientôt. Merci de votre patience.
        </p>

        {/* Barre de progression décorative */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-primary-light"
            style={{ width: '65%' }}
          />
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 border-t border-gray-100" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Besoin urgent ?</span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        {/* Boutons contact */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${PHARMACIE.telephoneLink}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all"
          >
            <Phone size={16} />
            {PHARMACIE.telephone}
          </a>
          <a
            href={`https://wa.me/${PHARMACIE.whatsapp}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm shadow-[#25D366]/30"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center space-y-1">
        <p className="text-xs text-gray-400">{PHARMACIE.adresseShort}</p>
        <p className="text-xs text-gray-300">Dr Manal Sordo · {PHARMACIE.slogan}</p>
      </div>

    </div>
  )
}
