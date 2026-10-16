import type { GalleryItem, HoursRow, Member, Review, Service } from '../types'

/* ====== EDIT THIS FILE: every [PLACEHOLDER] must be replaced with real business info. ====== */
export const BUSINESS = {
  /** Set to false for a real client. Hides the demo banner and disables simulated bookings. */
  demo: true,
  name: 'LUXE & FADE',
  tagline: 'Unisex Salon & Barbershop',
  location: 'Kathmandu, Nepal',
  phone: '+977 9800 000 000',
  email: 'hello@luxeandfade.example',
  address: 'Demo Address, Thamel, Kathmandu 44600, Nepal',
  mapsUrl: (import.meta.env.VITE_GOOGLE_MAPS_URL as string | undefined) ?? '',
  mapsEmbedUrl: (import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL as string | undefined) ?? '',
  siteUrl: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://luxeandfade.example').replace(/\/$/, ''),
  social: [] as { label: string; url: string }[],
  about: [
    'LUXE & FADE is built around one idea: great grooming should feel effortless, whoever you are. Sharp fades, soft layers, bold colour and a perfectly shaped beard all live under one roof.',
    'We take time to listen before we cut. Every visit starts with a short consultation so you leave with a look that fits your hair, your routine and your style.'
  ]
}

export const HOURS: HoursRow[] = [{ days: 'Sunday – Friday', time: '9:00 AM – 7:00 PM' }, { days: 'Saturday', time: 'Closed' }]

/** Bookable time slots (24h "HH:MM"). Match these to your real opening hours. */
export const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export const SERVICES: Service[] = [
  { id: 's1', name: 'Classic Haircut', description: 'A clean, classic cut finished with care.', group: 'men', tags: ['hair'], duration: '30 min', price: 'Rs. 600' },
  { id: 's2', name: 'Skin Fade', description: 'Detailed fade with clean edges and a professional finish.', group: 'men', tags: ['hair'], duration: '45 min', price: 'Rs. 800' },
  { id: 's3', name: 'Beard Trim & Shape', description: 'Defined lines and a tidy, comfortable finish.', group: 'men', tags: ['beard'], duration: '20 min', price: 'Rs. 400' },
  { id: 's4', name: 'Haircut + Beard', description: 'Our most popular pairing: cut and beard in one visit.', group: 'men', tags: ['hair', 'beard', 'package'], duration: '60 min', price: 'Rs. 1,000' },
  { id: 's5', name: "Women's Haircut & Styling", description: 'A cut and finish tailored to your hair and lifestyle.', group: 'women', tags: ['hair'], duration: '60 min', price: 'Rs. 1,200' },
  { id: 's6', name: 'Blow Dry', description: 'Smooth, polished styling for any occasion.', group: 'women', tags: ['hair'], duration: '40 min', price: 'Rs. 800' },
  { id: 's7', name: 'Hair Color', description: 'Colour consultation and application. Final price depends on length and shade.', group: 'unisex', tags: ['hair'], duration: '2 hr+', price: 'Rs. 2,500+' },
  { id: 's8', name: 'Hair Wash & Styling', description: 'A relaxing wash with a finishing style.', group: 'unisex', tags: ['hair'], duration: '30 min', price: 'Rs. 700' }
]

/** Fictional demo staff. Replace with the real team for a client. */
export const TEAM: Member[] = [
  { id: 't1', name: 'Aarav', role: 'Senior Barber', specialty: 'Fades & classic cuts', bio: 'Demo profile. Precise, calm and detail-obsessed.', services: ['Classic Haircut', 'Skin Fade', 'Haircut + Beard'] },
  { id: 't2', name: 'Sita', role: 'Hair Stylist & Colorist', specialty: 'Colour & styling', bio: 'Demo profile. Loves a bold colour change.', services: ["Women's Haircut & Styling", 'Blow Dry', 'Hair Color'] },
  { id: 't3', name: 'Nirmal', role: 'Barber & Groomer', specialty: 'Beards & grooming', bio: 'Demo profile. The go-to for a sharp beard line.', services: ['Beard Trim & Shape', 'Hair Wash & Styling'] }
]

/** Add a real photo with `src` (a /public path or Cloudinary URL). Without src a placeholder tile shows. */
export const GALLERY: GalleryItem[] = ['Haircuts', 'Fades', 'Beards', "Women's Hair", 'Color', 'Styling', 'Interior', 'Team'].map((c, i) => ({
  id: `g${i}`, category: c, alt: `${c} at ${BUSINESS.name}`
}))

/** Real customer reviews only. Never add made-up testimonials. */
export const REVIEWS: Review[] = []
