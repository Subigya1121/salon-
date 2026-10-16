import { Link } from 'react-router-dom'
import { telHref, track } from '../../lib/utils'
export default function Cta() {
  return (
    <section className="wrap section">
      <div className="rounded-3xl border border-line bg-gradient-to-br from-[#2a2318] to-surface px-6 py-14 text-center">
        <h2 className="h2">Ready for Your Next Look?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Book your next appointment and let our team take care of the rest.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/booking" className="btn" onClick={() => track('Book Appointment Clicked')}>Book Appointment</Link>
          <a href={telHref} className="btn-ghost" onClick={() => track('Phone Clicked')}>Call Now</a>
        </div>
      </div>
    </section>
  )
}
