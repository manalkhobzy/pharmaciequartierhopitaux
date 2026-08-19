'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createMembreAction(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('equipe')
    .insert({
      nom:         formData.get('nom') as string,
      titre:       formData.get('titre') as string,
      titre_long:  formData.get('titre_long') as string,
      description: formData.get('description') as string,
      photo_url:   (formData.get('photo_url') as string) || null,
      order_index: Number(formData.get('order_index') ?? 0),
      active:      formData.get('active') === 'true',
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/notre-pharmacie')
  revalidatePath('/admin/equipe')
  redirect(`/admin/equipe/${data.id}`)
}

export async function updateMembreAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase
    .from('equipe')
    .update({
      nom:         formData.get('nom') as string,
      titre:       formData.get('titre') as string,
      titre_long:  formData.get('titre_long') as string,
      description: formData.get('description') as string,
      photo_url:   (formData.get('photo_url') as string) || null,
      order_index: Number(formData.get('order_index') ?? 0),
      active:      formData.get('active') === 'true',
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/notre-pharmacie')
  revalidatePath('/admin/equipe')
  redirect(`/admin/equipe/${id}`)
}

export async function toggleMembreActiveAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const active = formData.get('active') === 'true'

  await supabase.from('equipe').update({ active }).eq('id', id)

  revalidatePath('/notre-pharmacie')
  revalidatePath('/admin/equipe')
}

export async function moveMembreAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const direction = formData.get('direction') as 'up' | 'down'

  const { data: membres } = await supabase
    .from('equipe')
    .select('id, order_index')
    .order('order_index', { ascending: true })

  if (!membres) return

  const idx = membres.findIndex((m) => m.id === id)
  if (idx === -1) return

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= membres.length) return

  const current = membres[idx]
  const swap = membres[swapIdx]

  await Promise.all([
    supabase.from('equipe').update({ order_index: swap.order_index }).eq('id', current.id),
    supabase.from('equipe').update({ order_index: current.order_index }).eq('id', swap.id),
  ])

  revalidatePath('/notre-pharmacie')
  revalidatePath('/admin/equipe')
}

export async function deleteMembreAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('equipe').delete().eq('id', id)

  revalidatePath('/notre-pharmacie')
  revalidatePath('/admin/equipe')
}
