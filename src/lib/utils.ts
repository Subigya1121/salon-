import { track as vaTrack } from '@vercel/analytics'
import { BUSINESS } from '../data/config'

export const telHref = 'tel:' + BUSINESS.phone.replace(/[^\d+]/g, '')
export const mailHref = `mailto:${BUSINESS.email}`
export const directionsHref =
  BUSINESS.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS.address} ${BUSINESS.location}`)}`

export function track(name: string, data?: Record<string, string>) {
  try { vaTrack(name, data) } catch { /* analytics must never break the app */ }
}
