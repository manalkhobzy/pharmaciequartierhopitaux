"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { ArticleMeta } from "@/lib/articles"

interface Props {
  articles: ArticleMeta[]
}

export default function ActualitesSante({ articles }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <span className="text-primary-500 text-xs font-bold uppercase tracking-widest">
              Blog santé
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1">
              Conseils &amp; Actualités santé
            </h2>
          </div>
          <Link
            href="/actualites"
            className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-sm"
          >
            Voir tous nos conseils
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/actualites/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image ?? '/images/article-placeholder.webp'}
                    fill
                    className="object-cover"
                    alt={article.title}
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full self-start mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2 text-base">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
