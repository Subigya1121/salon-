import { useEffect } from 'react'
import { BUSINESS } from '../data/config'

function meta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = content
}

export function useSeo(title: string, description: string, path: string, schema?: object) {
  useEffect(() => {
    const full = `${title} | ${BUSINESS.name}`
    const url = `${BUSINESS.siteUrl}${path}`
    document.title = full
    meta('name', 'description', description)
    meta('property', 'og:title', full)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:type', 'website')
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', full)
    meta('name', 'twitter:description', description)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = url
    document.getElementById('ld-json')?.remove()
    if (schema) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'; s.id = 'ld-json'; s.textContent = JSON.stringify(schema)
      document.head.appendChild(s)
    }
  }, [title, description, path, schema])
}
