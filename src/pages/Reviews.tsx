import { useSeo } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import ReviewList from '../components/reviews/ReviewList'
export default function Reviews() {
  useSeo('Customer Reviews', 'What our customers say about their visit.', '/reviews')
  return <><PageHeader eyebrow="Reviews" title="Customer Reviews" /><div className="wrap section"><ReviewList /></div></>
}
