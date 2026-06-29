'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function togglePublishedAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const published = formData.get('published') === 'true'

  await supabase
    .from('articles')
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq('id', id)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')
}

export async function setConseilDuMoisAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase
    .from('settings')
    .update({ value: id || null })
    .eq('key', 'conseil_du_mois_id')

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteArticleAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('articles').delete().eq('id', id)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')
}

export async function createArticleAction(formData: FormData) {
  const supabase = await createClient()

  const published = formData.get('published') === 'true'

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      image_url: (formData.get('image_url') as string) || null,
      read_time: (formData.get('read_time') as string) || '5 min',
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')

  redirect(`/admin/articles/${data.id}`)
}

export async function updateArticleAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const published = formData.get('published') === 'true'

  const { error } = await supabase
    .from('articles')
    .update({
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      image_url: (formData.get('image_url') as string) || null,
      read_time: (formData.get('read_time') as string) || '5 min',
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/articles')
  revalidatePath(`/actualites/${formData.get('slug')}`)
  revalidatePath('/actualites')
  revalidatePath('/')

  redirect(`/admin/articles/${id}`)
}
