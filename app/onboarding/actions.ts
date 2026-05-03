'use server'

import { createServerSupabase } from '@/lib/supabase-server'
import { getCurrentUser } from '@/lib/auth/helpers'

export async function saveHouseholdName(
  name: string,
  existingId: string | null,
): Promise<{ id: string } | { error: string }> {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not authenticated' }

  const supabase = createServerSupabase()

  // If we already have the household ID, just update the name
  if (existingId) {
    const { data, error } = await supabase
      .from('households')
      .update({ name })
      .eq('id', existingId)
      .select('id')
      .single()
    if (error || !data) return { error: error?.message ?? 'Update failed' }
    return { id: data.id as string }
  }

  // Check if a household already exists for this user (e.g. from a previous attempt)
  const { data: existing } = await supabase
    .from('households')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    const { data, error } = await supabase
      .from('households')
      .update({ name })
      .eq('id', existing.id)
      .select('id')
      .single()
    if (error || !data) return { error: error?.message ?? 'Update failed' }
    return { id: data.id as string }
  }

  // Fresh insert
  const { data, error } = await supabase
    .from('households')
    .insert({ user_id: user.id, name })
    .select('id')
    .single()
  if (error || !data) return { error: error?.message ?? 'Insert failed' }
  return { id: data.id as string }
}
