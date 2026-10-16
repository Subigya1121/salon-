import { useState } from 'react'
import { GALLERY } from '../../data/config'
import { track } from '../../lib/utils'
import Lightbox from './Lightbox'

export default function GalleryGrid() {
  const cats = ['All', ...Array.from(new Set(GALLERY.map((g) => g.category)))]
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState<number | null>(null)
  const items = GALLERY.filter((g) => cat === 'All' || g.category === cat)
  if (!GALLERY.length) return <div className="empty">Our gallery is coming soon.</div>
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {cats.map((c) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g, i) => (
          <button key={g.id} type="button" aria-label={`Open ${g.alt}`} onClick={() => { setOpen(i); track('Gallery Image Opened', { category: g.category }) }}
            className="aspect-[4/5] overflow-hidden rounded-xl border border-line bg-gradient-to-br from-[#2b2519] to-surface text-left text-sm text-muted">
            {g.src ? <img src={g.src} alt={g.alt} loading="lazy" width={400} height={500} className="h-full w-full object-cover" /> : <span className="flex h-full items-end p-3">{g.category}</span>}
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </div>
  )
}
