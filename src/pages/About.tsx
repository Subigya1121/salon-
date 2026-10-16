import { useSeo } from '../hooks/useSeo'
import { BUSINESS } from '../data/config'
import PageHeader from '../components/ui/PageHeader'
import Cta from '../components/ui/Cta'
export default function About() {
  useSeo('About Us', `About ${BUSINESS.name}, a premium unisex salon and barbershop in ${BUSINESS.location}.`, '/about')
  return (
    <>
      <PageHeader eyebrow="About" title="More Than a Haircut." />
      <div className="wrap section grid max-w-3xl gap-5 text-lg text-muted">{BUSINESS.about.map((p) => <p key={p}>{p}</p>)}</div>
      <Cta />
    </>
  )
}
