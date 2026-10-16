import { z } from 'zod'
import { SERVICES, SLOTS, TEAM } from '../data/config'

export const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

export const bookingSchema = z.object({
  service: z.string().refine((v) => SERVICES.some((s) => s.name === v), 'Please choose a service.'),
  staff: z.string().refine((v) => TEAM.some((t) => t.name === v), 'Please choose a barber or stylist.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a date.').refine((v) => v >= todayISO(), 'Please choose today or a future date.'),
  time: z.string().refine((v) => SLOTS.includes(v), 'Please choose a time.'),
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.string().trim().email('Please enter a valid email.').max(200),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, 'Please enter a valid phone number.'),
  note: z.string().trim().max(500).optional(),
  website: z.string().max(0).optional() // honeypot
})
export type BookingValues = z.infer<typeof bookingSchema>

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email.').max(200),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(5, 'Please enter a message.').max(2000),
  website: z.string().max(0).optional()
})
export type ContactValues = z.infer<typeof contactSchema>
