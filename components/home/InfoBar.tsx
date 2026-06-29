import Link from "next/link"
import { Phone, Clock, MessageCircle } from "lucide-react"
import { PHARMACIE } from "@/lib/constants"

export default function InfoBar() {
  return (
    <div className="bg-primary-500 text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 opacity-80" />
          <span className="hidden sm:inline">Lun–Ven 9h–20h · Sam 9h–13h30</span>
          <span className="sm:hidden">9h–20h Lun–Ven</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`tel:${PHARMACIE.telephoneLink}`}
            className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 opacity-80" />
            <span className="hidden md:inline">{PHARMACIE.telephone}</span>
          </Link>
          <span className="text-white/30 hidden md:inline">|</span>
          <Link
            href={`https://wa.me/${PHARMACIE.whatsapp}?text=${PHARMACIE.whatsappOrdonnanceMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium hover:text-white/80 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ordonnance WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
