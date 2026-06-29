"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  MessageCircle, FlaskConical, ShoppingBag, Leaf, Droplets, Pill,
  Syringe, Heart, Apple, Sparkles, Home, CreditCard,
} from "lucide-react"
import { SERVICES } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Pill: <Pill className="w-6 h-6" />,
  Syringe: <Syringe className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
}

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary-500 text-xs font-bold uppercase tracking-widest">
            Ce que nous proposons
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">Nos services</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Tout ce dont vous avez besoin, en un seul endroit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                href={`/services#${service.id}`}
                className="group flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  {iconMap[service.icon]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">{service.titre}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  )
}
