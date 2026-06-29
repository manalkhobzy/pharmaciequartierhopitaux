import { createClient } from '@/lib/supabase/server'
import type { Slide } from '@/lib/supabase/types'

export type { Slide }

export async function getActiveSlides(): Promise<Slide[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('slides')
    .select('*')
    .eq('active', true)
    .order('order_index', { ascending: true })
  return (data ?? []) as Slide[]
}

export async function getAllSlides(): Promise<Slide[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('slides')
    .select('*')
    .order('order_index', { ascending: true })
  return (data ?? []) as Slide[]
}
