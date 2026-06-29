import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft, MessageCircle } from "lucide-react"
import { getAllArticles, getArticleBySlug } from "@/lib/articles"
import { PHARMACIE } from "@/lib/constants"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at ?? article.created_at,
      images: article.image_url ? [{ url: article.image_url }] : [],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const allArticles = await getAllArticles()
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at ?? article.created_at,
    image: article.image_url ?? undefined,
    author: { "@type": "Organization", name: "Pharmacie Quartier des Hôpitaux" },
    publisher: { "@type": "Organization", name: "Pharmacie Quartier des Hôpitaux" },
  }

  const publishDate = new Date(article.published_at ?? article.created_at)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <Link href="/actualites-et-conseils" className="hover:text-primary transition-colors">Actualités et conseils</Link>
            <span className="text-gray-300">/</span>
            <span className="text-primary font-medium line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-text-dark mt-3 mb-5 max-w-3xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 text-sm text-text-muted flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {publishDate.toLocaleDateString("fr-FR", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {article.read_time}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={15} />
              {article.category}
            </span>
          </div>
        </div>
      </section>

      {/* Contenu + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Article HTML depuis TipTap */}
          <article className="lg:col-span-2">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/actualites-et-conseils"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} />
                Retour aux actualités et conseils
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#25D366" }}>
              <h3 className="font-bold text-lg mb-2">Une question ?</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Notre équipe est disponible pour vous conseiller sur ce sujet.
              </p>
              <Link
                href={`https://wa.me/${PHARMACIE.whatsapp}?text=${PHARMACIE.whatsappContactMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-green-700 font-semibold py-2.5 px-4 rounded-xl hover:bg-white/90 transition-colors text-sm"
              >
                <MessageCircle size={16} />
                Nous écrire sur WhatsApp
              </Link>
            </div>

            {related.length > 0 && (
              <div>
                <h3 className="font-bold text-text-dark mb-4">Articles récents</h3>
                <div className="space-y-3">
                  {related.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/actualites-et-conseils/${a.slug}`}
                      className="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary-50 transition-colors"
                    >
                      <span className="text-xs text-primary font-medium">{a.category}</span>
                      <span className="text-sm font-medium text-text-dark line-clamp-2">{a.title}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                        <Clock size={11} />
                        {a.read_time}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-bold text-text-dark mb-3 text-sm">Nous rendre visite</h3>
              <p className="text-xs text-text-muted mb-1">{PHARMACIE.adresseShort}</p>
              <p className="text-xs text-text-muted mb-3">Lun–Ven : 9h–20h · Sam : 9h–13h30</p>
              <Link
                href={`tel:${PHARMACIE.telephoneLink}`}
                className="text-primary text-sm font-semibold hover:underline"
              >
                {PHARMACIE.telephone}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
