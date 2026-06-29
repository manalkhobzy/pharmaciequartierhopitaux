import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { ArticleMeta } from "@/lib/articles"

interface Props {
  article: ArticleMeta
}

export default function ConseilDuMois({ article }: Props) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
              Conseil du mois
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white mt-1 mb-2">
              {article.title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          <Link
            href={`/actualites-et-conseils/${article.slug}`}
            className="flex-shrink-0 flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
          >
            Lire la suite
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
