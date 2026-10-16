import { BUSINESS } from '../data/config'
import { supabase } from '../lib/supabase'
import type { BookingValues } from '../lib/validations'

export type BookingResult = { ok: true; ref: string; demo: boolean } | { ok: false; reason: 'unavailable' | 'error' }

export async function getBookedSlots(staff: string, date: string): Promise<string[]> {
  if (!supabase) return []
  const { data, error } = await supabase.rpc('get_booked_slots', { p_staff: staff, p_date: date })
  if (error || !data) return []
  return (data as { slot: string }[]).map((r) => r.slot)
}

/** ok:true with demo:false only when the database actually stored the appointment. */
export async function createAppointment(v: BookingValues): Promise<BookingResult> {
  if (!supabase) {
    // Demo mode: simulate so the flow can be shown to clients. Clearly labelled in the UI, never saved.
    if (!BUSINESS.demo) return { ok: false, reason: 'error' }
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, ref: 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase(), demo: true }
  }
  try {
    const { data, error } = await supabase.rpc('create_appointment', {
      p_name: v.name, p_email: v.email, p_phone: v.phone, p_service: v.service,
      p_staff: v.staff, p_date: v.date, p_time: v.time, p_note: v.note ?? ''
    })
    if (error) return { ok: false, reason: error.code === '23505' ? 'unavailable' : 'error' }
    return { ok: true, ref: String(data), demo: false }
  } catch {
    return { ok: false, reason: 'error' }
  }
}
