import { BUSINESS, HOURS } from '../../data/config'
import { directionsHref, mailHref, telHref, track } from '../../lib/utils'

export default function LocationInfo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p><strong>Address:</strong> {BUSINESS.address}</p>
        <div><strong>Opening hours:</strong>{HOURS.map((h) => <p key={h.days} className="text-muted">{h.days}: {h.time}</p>)}</div>
        <p><strong>Phone:</strong> <a className="underline" href={telHref}>{BUSINESS.phone}</a></p>
        <p><strong>Email:</strong> <a className="underline" href={mailHref}>{BUSINESS.email}</a></p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a className="btn" href={directionsHref} target="_blank" rel="noopener noreferrer" onClick={() => track('Directions Clicked')}>Get Directions</a>
          <a className="btn-ghost" href={telHref} onClick={() => track('Phone Clicked')}>Call Now</a>
        </div>
      </div>
      {BUSINESS.mapsEmbedUrl
        ? <iframe title={`Map to ${BUSINESS.name}`} src={BUSINESS.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-2xl border border-line" />
        : <div className="empty grid place-items-center">Set VITE_GOOGLE_MAPS_EMBED_URL to show the map here.</div>}
    </div>
  )
}
