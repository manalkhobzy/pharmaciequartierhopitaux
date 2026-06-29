export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string | null
  read_time: string
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>
export type ArticleUpdate = Partial<ArticleInsert>

export interface Slide {
  id: string
  title: string
  subtitle: string
  cta_label: string
  cta_href: string
  accent_color: string
  bg_gradient: string
  image_url: string | null
  image_alt: string
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}

export type SlideInsert = Omit<Slide, 'id' | 'created_at' | 'updated_at'>
export type SlideUpdate = Partial<SlideInsert>
