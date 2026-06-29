"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Phone } from "lucide-react"
import { PHARMACIE } from "@/lib/constants"

function getOpenStatus() {
  const now = new Date()
  const day = now.getDay()
  const current = now.getHours() * 60 + now.getMinutes()
  if (day >= 1 && day <= 5) return current >= 540 && current < 1200
  if (day === 6) return current >= 540 && current < 810
  return false
}

function getDayIndex() {
  const day = new Date().getDay()
  return day === 0 ? 6 : day - 1
}

export default function HorairesWidget() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [todayIndex, setTodayIndex] = useState(0)

  useEffect(() => {
    setIsOpen(getOpenStatus())
    setTodayIndex(getDayIndex())
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header vert */}
      <div className="bg-primary-500 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white text-sm">Nos horaires</h3>
        </div>
        {isOpen !== null && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isOpen
                ? "bg-green-400/20 text-green-100 border border-green-300/30"
                : "bg-red-400/20 text-red-100 border border-red-300/30"
            }`}
          >
            {isOpen ? "Ouvert maintenant" : "Fermé"}
          </span>
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {PHARMACIE.horaires.map((h, i) => (
          <div
            key={h.jour}
            className={`flex items-center justify-between px-5 py-2.5 text-sm ${
              i === todayIndex ? "bg-primary-50" : ""
            }`}
          >
            <span className={`font-medium ${i === todayIndex ? "text-primary-600" : "text-gray-700"}`}>
              {h.jour}
            </span>
            <span className={`${i === todayIndex ? "text-primary-600 font-semibold" : "text-gray-500"}`}>
              {h.ouvert && h.ouverture && h.fermeture
                ? `${h.ouverture} – ${h.fermeture}`
                : "Fermé"}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <Link
          href="/nous-contacter"
          className="flex items-center justify-center gap-2 w-full bg-primary-500 text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Nous contacter
        </Link>
      </div>
    </div>
  )
}
