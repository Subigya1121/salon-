import { Link } from 'react-router-dom'
import { listTeam } from '../../services/barberService'
import { track } from '../../lib/utils'

export default function TeamGrid() {
  const team = listTeam()
  if (!team.length) return <div className="empty">Our team profiles are coming soon.</div>
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m) => (
        <article key={m.id} className="card">
          {m.photo ? <img src={m.photo} alt={m.name} width={96} height={96} loading="lazy" className="h-24 w-24 rounded-full object-cover" />
            : <div aria-hidden="true" className="grid h-24 w-24 place-items-center rounded-full border border-line bg-gradient-to-br from-[#3a3224] to-surface font-display text-3xl text-brand">✂</div>}
          <h3 className="mt-2 font-display text-xl font-bold">{m.name}</h3>
          <p className="font-bold text-brand">{m.role}</p>
          <p className="text-muted">Specialty: {m.specialty}</p>
          <p className="text-muted">{m.bio}</p>
          <p className="text-sm text-muted">Services: {m.services.join(', ')}</p>
          <Link to={`/booking?staff=${encodeURIComponent(m.name)}`} className="btn mt-auto self-start" onClick={() => track('Team Member Viewed', { member: m.name })}>Book with {m.name.split(' ')[0]}</Link>
        </article>
      ))}
    </div>
  )
}
