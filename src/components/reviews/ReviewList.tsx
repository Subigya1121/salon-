import { listReviews } from '../../services/reviewService'
export default function ReviewList() {
  const reviews = listReviews()
  if (!reviews.length) return <div className="empty">Customer reviews will appear here.</div>
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {reviews.map((r) => (
        <figure key={r.id} className="card">
          <p className="text-brand" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
          <blockquote className="text-ink">{r.text}</blockquote>
          <figcaption className="text-sm text-muted">{r.name}{r.platform ? ` · ${r.platform}` : ''}{r.date ? ` · ${r.date}` : ''}</figcaption>
        </figure>
      ))}
    </div>
  )
}
