import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import PageHeader from '../components/ui/PageHeader'
export default function Privacy() {
  useSeo('Privacy Policy', 'How we collect and use your information.', '/privacy')
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <div className="wrap section grid max-w-3xl gap-4 text-muted">
        <p>Template text: have a legal professional review it before using it for a real business.</p>
        <p>We collect only the details you give us (name, email, phone and appointment preferences) to manage your booking and reply to your messages. We do not sell your data.</p>
        <p>We use privacy-friendly analytics to count page views and button clicks, without collecting personal information.</p>
        <p>To ask about or delete your data, email {BUSINESS.email}.</p>
      </div>
    </>
  )
}
