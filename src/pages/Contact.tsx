import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import { mailHref, telHref } from '../lib/utils'
import PageHeader from '../components/ui/PageHeader'
import ContactForm from '../components/contact/ContactForm'
import { Link } from 'react-router-dom'
export default function Contact() {
  useSeo('Contact Us', `Contact ${BUSINESS.name} in ${BUSINESS.location}. Call, email or send a message.`, '/contact')
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in Touch" />
      <div className="wrap section grid gap-10 md:grid-cols-2">
        <div className="space-y-3">
          <p><strong>Phone:</strong> <a className="underline" href={telHref}>{BUSINESS.phone}</a></p>
          <p><strong>Email:</strong> <a className="underline" href={mailHref}>{BUSINESS.email}</a></p>
          <p><strong>Address:</strong> {BUSINESS.address}</p>
          {BUSINESS.social.length > 0 && <p className="flex gap-3">{BUSINESS.social.map((s) => <a key={s.url} className="underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</p>}
          <div className="flex gap-3 pt-2"><a className="btn-ghost" href={telHref}>Call Us</a><Link className="btn" to="/booking">Book Appointment</Link></div>
        </div>
        <ContactForm />
      </div>
    </>
  )
}
