import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { getAllArticles, getCategories } from "@/lib/articles"

const PER_PAGE = 12

export const metadata: Metadata = {
  title: "Actualités et conseils",
  description:
    "Articles santé, conseils bien-être et actualités médicales rédigés par l'équipe de la Pharmacie Quartier des Hôpitaux Casablanca.",
}

function buildUrl(page: number, cat: string, q: string) {
  const p = new URLSearchParams()
  if (cat) p.set("categorie", cat)
  if (q) p.set("q", q)
  if (page > 1) p.set("page", String(page))
  const qs = p.toString()
  return `/actualites${qs ? "?" + qs : ""}`
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; page?: string; q?: string }>
}) {
  const params = await searchParams
  const selectedCat = params?.categorie ?? ""
  const query = params?.q ?? ""
  const currentPage = Math.max(1, Number(params?.page ?? 1))

  const articles = await getAllArticles()
  const categories = await getCategories()

  let filtered = selectedCat
    ? articles.filter((a) => a.category === selectedCat)
    : articles

  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    )
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  )

  return (
    <>
      {/* Breadcrumb + barre de recherche */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-text-dark font-medium">Actualités</span>
          </nav>
          <form action="/actualites" method="get" className="relative">
            {selectedCat && (
              <input type="hidden" name="categorie" value={selectedCat} />
            )}
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un article…"
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 w-52 transition-all"
            />
          </form>
        </div>
      </div>

      {/* Onglets catégories */}
      <div className="border-b border-gray-200 bg-white sticky top-13 z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            <Link
              href={buildUrl(1, "", query)}
              className={`px-5 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                !selectedCat
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-primary hover:border-primary/50"
              }`}
            >
              Toutes
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={buildUrl(1, cat, query)}
                className={`px-5 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-primary hover:border-primary/50"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grille d'articles */}
      <div className="bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {paginated.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={article.image_url ?? "/images/article-placeholder.webp"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                      alt={article.title}
                    />
                    <span className="absolute bottom-0 left-0 text-[10px] font-bold text-white bg-primary px-2.5 py-1 uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-2">
                      Actualité &nbsp;·&nbsp;{" "}
                      {new Date(article.published_at ?? article.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-bold text-text-dark text-sm leading-snug mb-2.5 line-clamp-3 group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h2>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <span className="flex items-center gap-1.5 text-primary text-xs font-semibold group-hover:gap-2.5 transition-all">
                      <ArrowRight size={13} />
                      Lire la suite
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted py-24">
              Aucun article trouvé.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5 flex-wrap">
              {currentPage > 1 && (
                <Link
                  href={buildUrl(currentPage - 1, selectedCat, query)}
                  className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded bg-white hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronLeft size={14} />
                  Précédent
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={buildUrl(p, selectedCat, query)}
                  className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                    p === currentPage
                      ? "bg-primary text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {p}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={buildUrl(currentPage + 1, selectedCat, query)}
                  className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded bg-white hover:border-primary hover:text-primary transition-colors"
                >
                  Suivant
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
