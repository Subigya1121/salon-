import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/config'
import { useSeo } from '../hooks/useSeo'
import { localBusiness } from '../lib/schema'
import { telHref, track } from '../lib/utils'
import ServiceList from '../components/services/ServiceList'
import TeamGrid from '../components/team/TeamGrid'
import Cta from '../components/ui/Cta'

const why = [['Skilled Professionals', 'Professional attention to detail.'], ['Complete Grooming', 'Hair, barbering and styling in one place.'], ['Premium Experience', 'A comfortable space designed around you.'], ['Convenient Location', `Easy to reach in ${BUSINESS.location}.`]]

export default function Home() {
  useSeo(`Premium Unisex Barber & Salon in ${BUSINESS.location}`, `${BUSINESS.name}: premium barbering, hairstyling and grooming for men and women in ${BUSINESS.location}. Book online.`, '/', localBusiness)
  return (
    <>
      <section className="bg-[radial-gradient(900px_450px_at_80%_-10%,#2a2318,transparent)]">
        <div className="wrap py-20 md:py-28">
          <p className="eyebrow">Barber · Salon · Grooming</p>
          <h1 className="h1 mt-4">Your Style. Your Space.<br />Your Signature.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">Premium barbering, hairstyling, beauty and grooming services for everyone in {BUSINESS.location}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/booking" className="btn" onClick={() => track('Book Appointment Clicked')}>Book an Appointment</Link>
            <Link to="/services" className="btn-ghost">Explore Services</Link>
            <a href={telHref} className="btn-ghost" onClick={() => track('Phone Clicked')}>Call Now</a>
          </div>
        </div>
      </section>
      <section className="wrap grid gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {why.map(([t, d]) => <div key={t} className="card"><h2 className="font-display text-lg font-bold">{t}</h2><p className="text-muted">{d}</p></div>)}
      </section>
      <section className="wrap section">
        <p className="eyebrow">Services</p><h2 className="h2 mb-8 mt-2">Crafted for Everyone</h2>
        <ServiceList limit={4} />
        <Link to="/services" className="btn-ghost mt-8">View all services</Link>
      </section>
      <section className="wrap section">
        <p className="eyebrow">Meet the Team</p><h2 className="h2 mb-8 mt-2">The People Behind the Chair</h2>
        <TeamGrid />
      </section>
      <Cta />
    </>
  )
}
