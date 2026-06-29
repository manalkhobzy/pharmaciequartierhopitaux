"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, MessageCircle } from "lucide-react"
import { NAV_LINKS, PHARMACIE } from "@/lib/constants"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Menu de navigation"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="font-semibold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block px-6 py-3.5 text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-5 border-t border-gray-100">
          <Link
            href={`https://wa.me/${PHARMACIE.whatsapp}?text=${PHARMACIE.whatsappOrdonnanceMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-light transition-colors"
          >
            <MessageCircle size={18} />
            Envoyer mon ordonnance
          </Link>
          <p className="text-center text-sm text-text-muted mt-3">
            {PHARMACIE.telephone}
          </p>
        </div>
      </nav>
    </div>
  )
}
