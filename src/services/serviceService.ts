import { SERVICES } from '../data/config'
import type { Service } from '../types'
/** Swap this for a Supabase query if you want services managed in the database. */
export const listServices = (): Service[] => SERVICES
