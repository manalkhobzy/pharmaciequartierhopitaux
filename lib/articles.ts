import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'

export type { Article }

export type ArticleMeta = Omit<Article, 'content'>

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,category,image_url,read_time,published,published_at,created_at,updated_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
  return (data ?? []) as ArticleMeta[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data ?? null
}

export async function getCategories(): Promise<string[]> {
  const articles = await getAllArticles()
  return [...new Set(articles.map((a) => a.category).filter(Boolean))]
}

export async function getConseilDuMois(): Promise<Article | null> {
  const supabase = await createClient()
  const { data: setting } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'conseil_du_mois_id')
    .single()

  if (!setting?.value) return null

  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('id', setting.value)
    .eq('published', true)
    .single()

  return data ?? null
}
