import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import PageHeader from '../components/ui/PageHeader'
export default function Terms() {
  useSeo('Terms & Conditions', 'Booking and website terms.', '/terms')
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <div className="wrap section grid max-w-3xl gap-4 text-muted">
        <p>Template text: have a legal professional review it before using it for a real business.</p>
        <p>Appointments are subject to availability. Please arrive on time; late arrivals may need to be rescheduled.</p>
        <p>Please give notice if you need to cancel or change your appointment. Prices may vary with hair length and the work required.</p>
        <p>Questions? Contact {BUSINESS.name} at {BUSINESS.email}.</p>
      </div>
    </>
  )
}
