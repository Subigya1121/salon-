import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import PageHeader from '../components/ui/PageHeader'
import LocationInfo from '../components/location/LocationInfo'
export default function Location() {
  useSeo(`Barber & Salon in ${BUSINESS.location}`, `Find ${BUSINESS.name}: address, opening hours, phone and directions.`, '/location')
  return <><PageHeader eyebrow="Visit Us" title="Location & Hours" /><div className="wrap section"><LocationInfo /></div></>
}
