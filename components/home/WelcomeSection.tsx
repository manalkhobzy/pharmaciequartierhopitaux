"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star } from "lucide-react"

const engagements = [
  "Conseils personnalisés : phytothérapie, aromathérapie, homéopathie",
  "Parapharmacie en libre accès (Vichy, La Roche-Posay, CeraVe, Dercos…)",
  "Service ordonnance WhatsApp — préparation en avance",
  "Préparations magistrales avec les dermatos partenaires",
  "Prix justes, sans intermédiaire",
]

export default function WelcomeSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Placeholder image amélioré */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-4/3">
              <Image
                src="/images/pharmacie-facade.webp"
                fill
                className="object-cover"
                alt="Pharmacie Quartier des Hôpitaux — vue intérieure"
                priority
              />
              {/* Carte flottante avis Google */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3 z-10">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">5/5 · 17 avis Google</p>
                  <p className="text-gray-500 text-xs">&ldquo;Moderne, bienveillante, prix justes&rdquo;</p>
                </div>
              </div>
            </div>

            {/* Badge expérience */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-5 py-3 border border-gray-100 hidden sm:block">
              <p className="text-2xl font-bold text-primary-500">45+</p>
              <p className="text-xs text-gray-500">ans d&apos;expérience</p>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="text-primary-500 text-xs font-bold uppercase tracking-widest">
              Bienvenue
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-5">
              Pharmacie Quartier des Hôpitaux
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7">
              La Dr Manal Sordo et son équipe vous accueillent dans un espace entièrement rénové,
              moderne et chaleureux. Notre priorité : prendre soin de vous avec des conseils
              personnalisés, une sélection rigoureuse de marques dermatologiques et des services
              adaptés à vos besoins.
            </p>

            <ul className="space-y-3 mb-8">
              {engagements.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 shrink-0 text-primary-500 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/notre-pharmacie"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-sm"
            >
              En savoir plus sur notre équipe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
