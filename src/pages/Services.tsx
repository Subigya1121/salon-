import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import PageHeader from '../components/ui/PageHeader'
import ServiceList from '../components/services/ServiceList'
export default function Services() {
  useSeo('Services & Prices', `Haircuts, fades, beard grooming, women's styling and colour at ${BUSINESS.name}, ${BUSINESS.location}.`, '/services')
  return <><PageHeader eyebrow="Service Menu" title="Services & Prices" lead="Barbering, hair and styling for men and women." /><div className="wrap section"><ServiceList filters /></div></>
}
