'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleMaintenanceAction(formData: FormData) {
  const value = formData.get('value') as string
  const supabase = await createClient()

  await supabase
    .from('settings')
    .upsert({ key: 'maintenance_mode', value }, { onConflict: 'key' })

  revalidatePath('/admin')
}
