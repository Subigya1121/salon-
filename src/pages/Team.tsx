import { useSeo } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import TeamGrid from '../components/team/TeamGrid'
export default function Team() {
  useSeo('Meet the Team', 'Meet our barbers and stylists and book with your favourite professional.', '/team')
  return <><PageHeader eyebrow="Our Team" title="Meet the Team" lead="Choose the professional who is right for you." /><div className="wrap section"><TeamGrid /></div></>
}
