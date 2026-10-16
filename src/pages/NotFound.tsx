import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
export default function NotFound() {
  useSeo('Page Not Found', 'The page you are looking for does not exist.', '/404')
  return (
    <div className="wrap section text-center">
      <p className="eyebrow">404</p><h1 className="h1 mt-3">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3"><Link className="btn" to="/">Back to Home</Link><Link className="btn-ghost" to="/booking">Book Appointment</Link></div>
    </div>
  )
}
