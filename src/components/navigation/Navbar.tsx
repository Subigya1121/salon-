import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BUSINESS } from '../../data/config'
import { track } from '../../lib/utils'

const links = [['/services', 'Services'], ['/team', 'Our Team'], ['/gallery', 'Gallery'], ['/about', 'About'], ['/contact', 'Contact']] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" onClick={close} className="font-display text-xl font-bold">{BUSINESS.name}</Link>
        <button type="button" className="grid h-12 w-12 place-items-center rounded-xl border border-line md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
        <nav id="menu" aria-label="Main" className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full border-b border-line bg-bg px-5 pb-5 md:static md:block md:border-0 md:bg-transparent md:p-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:gap-7">
            {links.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} onClick={close} className={({ isActive }) => `block border-b border-line py-3 text-sm md:border-0 md:py-0 ${isActive ? 'text-brand' : 'text-muted hover:text-ink'}`}>{label}</NavLink>
              </li>
            ))}
            <li className="pt-3 md:pt-0">
              <Link to="/booking" onClick={() => { close(); track('Book Appointment Clicked') }} className="btn w-full md:w-auto">Book Appointment</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
