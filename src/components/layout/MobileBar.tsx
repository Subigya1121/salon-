import { Link } from 'react-router-dom'
import { directionsHref, telHref, track } from '../../lib/utils'
export default function MobileBar() {
  const base = 'flex min-h-[56px] items-center justify-center text-sm font-bold'
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={telHref} className={base} onClick={() => track('Phone Clicked')}>☎ Call</a>
      <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={base} onClick={() => track('Directions Clicked')}>📍 Directions</a>
      <Link to="/booking" className={`${base} bg-brand text-[color:var(--brand-ink)]`} onClick={() => track('Book Appointment Clicked')}>✂ Book</Link>
    </div>
  )
}
