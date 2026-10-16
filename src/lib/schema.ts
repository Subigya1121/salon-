import { BUSINESS } from '../data/config'
export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  name: BUSINESS.name,
  url: BUSINESS.siteUrl,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: { '@type': 'PostalAddress', streetAddress: BUSINESS.address, addressLocality: BUSINESS.location },
  sameAs: BUSINESS.social.map((s) => s.url)
}
