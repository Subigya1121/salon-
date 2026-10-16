import { useSeo } from '../hooks/useSeo'
import PageHeader from '../components/ui/PageHeader'
import BookingWizard from '../components/booking/BookingWizard'
export default function Booking() {
  useSeo('Book an Appointment', 'Book your haircut, beard trim, styling or colour appointment online.', '/booking')
  return <><PageHeader eyebrow="Booking" title="Book an Appointment" lead="Four quick steps." /><div className="wrap section max-w-2xl"><BookingWizard /></div></>
}
