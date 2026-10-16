import { useEffect, useRef } from 'react'
import type { GalleryItem } from '../../types'

interface Props { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const prev = () => onIndex((index - 1 + items.length) % items.length)
  const next = () => onIndex((index + 1) % items.length)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => opener?.focus()
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') { // keep focus inside the dialog
        const els = Array.from(document.querySelectorAll<HTMLElement>('[data-lb] button'))
        const i = els.indexOf(document.activeElement as HTMLElement)
        e.preventDefault()
        els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length]?.focus()
      }
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  })

  const b = 'absolute grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-xl'
  return (
    <div data-lb role="dialog" aria-modal="true" aria-label={`${item.category} gallery`} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button ref={closeRef} type="button" className={`${b} right-4 top-4`} aria-label="Close" onClick={onClose}>✕</button>
      <button type="button" className={`${b} left-3`} aria-label="Previous image" onClick={prev}>‹</button>
      {item.src ? <img src={item.src} alt={item.alt} className="max-h-[80vh] max-w-full rounded-xl" />
        : <div role="img" aria-label={item.alt} className="flex aspect-[4/5] max-h-[80vh] w-full max-w-md items-end rounded-xl border border-line bg-gradient-to-br from-[#2b2519] to-surface p-5 text-muted">{item.category} · add a photo</div>}
      <button type="button" className={`${b} right-3`} aria-label="Next image" onClick={next}>›</button>
    </div>
  )
}
