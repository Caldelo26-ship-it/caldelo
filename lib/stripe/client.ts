import { createClient } from '@/lib/supabase/server'

export async function isPremium(householdId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('households')
    .select('subscription_status')
    .eq('id', householdId)
    .maybeSingle()
  return (data as { subscription_status?: string } | null)?.subscription_status === 'active'
}
