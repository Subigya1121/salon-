import { useSeo } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import GalleryGrid from '../components/gallery/GalleryGrid'
export default function Gallery() {
  useSeo('Gallery', 'Haircuts, fades, beards, colour and styling from our salon and barbershop.', '/gallery')
  return <><PageHeader eyebrow="Gallery" title="Our Work" /><div className="wrap section"><GalleryGrid /></div></>
}
