'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createSlideAction(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('slides')
    .insert({
      title:        formData.get('title') as string,
      subtitle:     formData.get('subtitle') as string,
      cta_label:    formData.get('cta_label') as string,
      cta_href:     formData.get('cta_href') as string,
      accent_color: formData.get('accent_color') as string,
      bg_gradient:  formData.get('bg_gradient') as string,
      image_url:    (formData.get('image_url') as string) || null,
      image_alt:    formData.get('image_alt') as string,
      order_index:  Number(formData.get('order_index') ?? 0),
      active:       formData.get('active') === 'true',
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin/slides')
  redirect(`/admin/slides/${data.id}`)
}

export async function updateSlideAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase
    .from('slides')
    .update({
      title:        formData.get('title') as string,
      subtitle:     formData.get('subtitle') as string,
      cta_label:    formData.get('cta_label') as string,
      cta_href:     formData.get('cta_href') as string,
      accent_color: formData.get('accent_color') as string,
      bg_gradient:  formData.get('bg_gradient') as string,
      image_url:    (formData.get('image_url') as string) || null,
      image_alt:    formData.get('image_alt') as string,
      order_index:  Number(formData.get('order_index') ?? 0),
      active:       formData.get('active') === 'true',
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin/slides')
  redirect(`/admin/slides/${id}`)
}

export async function toggleSlideActiveAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const active = formData.get('active') === 'true'

  await supabase.from('slides').update({ active }).eq('id', id)

  revalidatePath('/')
  revalidatePath('/admin/slides')
}

export async function moveSlideAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const direction = formData.get('direction') as 'up' | 'down'

  const { data: slides } = await supabase
    .from('slides')
    .select('id, order_index')
    .order('order_index', { ascending: true })

  if (!slides) return

  const idx = slides.findIndex((s) => s.id === id)
  if (idx === -1) return

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= slides.length) return

  const current = slides[idx]
  const swap = slides[swapIdx]

  await Promise.all([
    supabase.from('slides').update({ order_index: swap.order_index }).eq('id', current.id),
    supabase.from('slides').update({ order_index: current.order_index }).eq('id', swap.id),
  ])

  revalidatePath('/')
  revalidatePath('/admin/slides')
}

export async function deleteSlideAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('slides').delete().eq('id', id)

  revalidatePath('/')
  revalidatePath('/admin/slides')
}
