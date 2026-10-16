import { Link } from 'react-router-dom'
import { BUSINESS, HOURS } from '../../data/config'
import { mailHref, telHref } from '../../lib/utils'

export default function Footer() {
  const l = 'text-muted hover:text-ink'
  return (
    <footer className="border-t border-line py-12 text-sm text-muted">
      <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div><Link to="/" className="font-display text-xl font-bold text-ink">{BUSINESS.name}</Link><p className="mt-2">Premium unisex barber &amp; salon in {BUSINESS.location}.</p></div>
        <div><h2 className="mb-2 font-bold text-ink">Explore</h2><ul className="grid gap-1">
          {[['/services', 'Services'], ['/team', 'Our Team'], ['/gallery', 'Gallery'], ['/reviews', 'Reviews'], ['/booking', 'Book Appointment']].map(([to, t]) => <li key={to}><Link className={l} to={to}>{t}</Link></li>)}
        </ul></div>
        <div><h2 className="mb-2 font-bold text-ink">Hours</h2>{HOURS.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}</div>
        <div><h2 className="mb-2 font-bold text-ink">Contact</h2>
          <p>{BUSINESS.address}</p><p><a className={l} href={telHref}>{BUSINESS.phone}</a></p><p><a className={l} href={mailHref}>{BUSINESS.email}</a></p>
          <p className="mt-2 flex flex-wrap gap-3">{BUSINESS.social.map((s) => <a key={s.url} className={l} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</p>
        </div>
      </div>
      <div className="wrap mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
        <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <p className="flex gap-4"><Link className={l} to="/location">Location</Link><Link className={l} to="/privacy">Privacy Policy</Link><Link className={l} to="/terms">Terms &amp; Conditions</Link></p>
      </div>
    </footer>
  )
}
