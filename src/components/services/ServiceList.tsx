import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listServices } from '../../services/serviceService'
import { track } from '../../lib/utils'

const FILTERS: [string, string][] = [['all', 'All'], ['men', 'Men'], ['women', 'Women'], ['unisex', 'Unisex'], ['hair', 'Hair'], ['beard', 'Beard'], ['beauty', 'Beauty'], ['package', 'Packages']]

export default function ServiceList({ limit, filters = false }: { limit?: number; filters?: boolean }) {
  const all = listServices()
  const [f, setF] = useState('all')
  const available = FILTERS.filter(([k]) => k === 'all' || all.some((s) => s.group === k || s.tags.includes(k as never)))
  const items = useMemo(() => {
    const l = all.filter((s) => f === 'all' || s.group === f || s.tags.includes(f as never))
    return limit ? l.slice(0, limit) : l
  }, [all, f, limit])

  if (!all.length) return <div className="empty">Services are currently being updated.</div>
  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter services">
          {available.map(([k, label]) => <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{label}</button>)}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <article key={s.id} className="card">
            <h3 className="font-display text-xl font-bold">{s.name}</h3>
            <p className="text-muted">{s.description}</p>
            <p className="font-bold text-brand">{s.duration} · {s.price}</p>
            <Link to={`/booking?service=${encodeURIComponent(s.name)}`} className="btn mt-auto self-start" onClick={() => track('Service Viewed', { service: s.name })}>Book Now</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
