import { BUSINESS } from '../data/config'
import { supabase } from '../lib/supabase'
import type { ContactValues } from '../lib/validations'

export async function sendContact(v: ContactValues): Promise<'ok' | 'demo' | 'error'> {
  if (!supabase) return BUSINESS.demo ? 'demo' : 'error'
  try {
    const { error } = await supabase.from('contact_messages').insert({ name: v.name, email: v.email, phone: v.phone ?? null, message: v.message })
    return error ? 'error' : 'ok'
  } catch {
    return 'error'
  }
}
