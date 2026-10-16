import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
/** null when env vars are missing; callers must handle that. Only the public anon key is ever used here. */
export const supabase = url && key ? createClient(url, key) : null
