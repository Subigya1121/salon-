import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { BUSINESS, SERVICES, SLOTS, TEAM } from '../../data/config'
import { bookingSchema, todayISO, type BookingValues } from '../../lib/validations'
import { createAppointment, getBookedSlots } from '../../services/appointmentService'
import { telHref, track } from '../../lib/utils'

type Status = 'idle' | 'submitting' | 'confirmed' | 'failed'
const STEPS = ['Service', 'Stylist', 'Date & time', 'Your details']
const FIELDS: (keyof BookingValues)[][] = [['service'], ['staff'], ['date', 'time'], ['name', 'email', 'phone']]
const fmt = (t: string) => { const h = +t.slice(0, 2); return `${h % 12 || 12}:${t.slice(3)} ${h >= 12 ? 'PM' : 'AM'}` }

function icsHref(v: BookingValues, ref: string) {
  const d = v.date.replace(/-/g, '') + 'T' + v.time.replace(':', '') + '00'
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `UID:${ref}@appointment`, `DTSTART:${d}`, 'DURATION:PT1H', `SUMMARY:${v.service} at ${BUSINESS.name}`, `DESCRIPTION:With ${v.staff}. Ref ${ref}`, `LOCATION:${BUSINESS.address}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body)
}

export default function BookingWizard() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<{ ref: string; demo: boolean } | null>(null)
  const [msg, setMsg] = useState('')
  const [booked, setBooked] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const initialService = SERVICES.some((s) => s.name === params.get('service')) ? params.get('service')! : ''
  const initialStaff = TEAM.some((t) => t.name === params.get('staff')) ? params.get('staff')! : ''
  const { register, handleSubmit, trigger, watch, getValues, setValue, formState: { errors } } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema), mode: 'onTouched',
    defaultValues: { service: initialService, staff: initialStaff, date: '', time: '', name: '', email: '', phone: '', note: '', website: '' }
  })
  const date = watch('date'), staff = watch('staff'), time = watch('time')

  useEffect(() => { track('Booking Started') }, [])
  useEffect(() => {
    if (!date || !staff) return
    let off = false
    setLoadingSlots(true)
    getBookedSlots(staff, date).then((s) => { if (!off) { setBooked(s); setLoadingSlots(false); if (s.includes(getValues('time'))) setValue('time', '') } })
    return () => { off = true }
  }, [date, staff, getValues, setValue])

  const next = async () => { if (await trigger(FIELDS[step])) setStep(step + 1) }
  const onSubmit = handleSubmit(async (v) => {
    if (status === 'submitting' || v.website) return
    setStatus('submitting'); setMsg('')
    track('Booking Submitted')
    const r = await createAppointment(v)
    if (r.ok) { setResult({ ref: r.ref, demo: r.demo }); setStatus('confirmed'); track('Appointment Confirmed'); return }
    if (r.reason === 'unavailable') { setMsg('That time was just taken. Please choose another time or professional.'); setStep(2); setStatus('idle'); return }
    setMsg('Something went wrong while confirming your appointment. Please try again or call us directly.'); setStatus('failed')
  })

  if (status === 'confirmed' && result) {
    const v = getValues()
    return (
      <div className="card" role="status">
        <h2 className="h2">{result.demo ? 'Demo Booking Preview' : 'Your Appointment Is Confirmed'}</h2>
        {result.demo && <p className="text-brand">This is a demo. The appointment was not saved. Connect Supabase to take real bookings.</p>}
        <dl className="mt-3 grid gap-1 text-muted">
          <div><dt className="inline font-bold text-ink">Name: </dt><dd className="inline">{v.name}</dd></div>
          <div><dt className="inline font-bold text-ink">Service: </dt><dd className="inline">{v.service}</dd></div>
          <div><dt className="inline font-bold text-ink">With: </dt><dd className="inline">{v.staff}</dd></div>
          <div><dt className="inline font-bold text-ink">When: </dt><dd className="inline">{v.date} at {fmt(v.time)}</dd></div>
          <div><dt className="inline font-bold text-ink">Reference: </dt><dd className="inline">{result.ref}</dd></div>
        </dl>
        <a className="btn mt-4 self-start" href={icsHref(v, result.ref)} download="appointment.ics">Add to Calendar</a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-label="Book an appointment">
      <ol className="flex flex-wrap gap-2 text-xs" aria-label="Progress">
        {STEPS.map((s, i) => <li key={s} aria-current={i === step ? 'step' : undefined} className={`rounded-full border px-3 py-1 ${i === step ? 'border-brand text-brand' : 'border-line text-muted'}`}>{i + 1}. {s}</li>)}
      </ol>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />

      {step === 0 && (
        <fieldset className="grid gap-2"><legend className="mb-2 font-bold">Choose a service</legend>
          {SERVICES.map((s) => (
            <label key={s.id} className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 has-[:checked]:border-brand">
              <span className="flex items-center gap-3"><input type="radio" value={s.name} {...register('service')} />{s.name}</span>
              <span className="text-sm text-muted">{s.duration} · {s.price}</span>
            </label>
          ))}
          {errors.service && <p className="err" role="alert">{errors.service.message}</p>}
        </fieldset>
      )}
      {step === 1 && (
        <fieldset className="grid gap-2"><legend className="mb-2 font-bold">Choose your barber or stylist</legend>
          {TEAM.map((t) => (
            <label key={t.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 has-[:checked]:border-brand">
              <input type="radio" value={t.name} {...register('staff')} />{t.name}<span className="text-sm text-muted">{t.role}</span>
            </label>
          ))}
          {errors.staff && <p className="err" role="alert">{errors.staff.message}</p>}
        </fieldset>
      )}
      {step === 2 && (
        <div className="grid gap-4">
          <label className="grid gap-1 font-bold">Date
            <input type="date" min={todayISO()} className="input" aria-invalid={!!errors.date} {...register('date')} />
            {errors.date && <span className="err font-normal" role="alert">{errors.date.message}</span>}
          </label>
          <fieldset><legend className="mb-2 font-bold">Available times</legend>
            {!date ? <p className="text-muted">Choose a date first.</p> : loadingSlots ? <div className="skeleton h-12" /> : SLOTS.every((s) => booked.includes(s)) ? <p className="empty">No appointments are available for this time. Please choose another date or professional.</p> : (
              <div className="flex flex-wrap gap-2">
                {SLOTS.map((s) => {
                  const taken = booked.includes(s)
                  return <button key={s} type="button" className="chip" disabled={taken} aria-pressed={time === s} onClick={() => setValue('time', s, { shouldValidate: true })}>{fmt(s)}{taken ? ' (booked)' : ''}</button>
                })}
              </div>
            )}
            {errors.time && <p className="err mt-2" role="alert">{errors.time.message}</p>}
          </fieldset>
        </div>
      )}
      {step === 3 && (
        <div className="grid gap-4">
          {([['name', 'Full name', 'text', 'name'], ['email', 'Email', 'email', 'email'], ['phone', 'Phone', 'tel', 'tel']] as const).map(([k, label, type, ac]) => (
            <label key={k} className="grid gap-1 font-bold">{label}
              <input type={type} autoComplete={ac} className="input" aria-invalid={!!errors[k]} {...register(k)} />
              {errors[k] && <span className="err font-normal" role="alert">{errors[k]?.message}</span>}
            </label>
          ))}
          <label className="grid gap-1 font-bold">Special request (optional)<textarea rows={3} className="input" {...register('note')} /></label>
        </div>
      )}

      {msg && <p className="err" role="alert">{msg} {status === 'failed' && <a className="underline" href={telHref}>Call us</a>}</p>}
      <div className="flex gap-3">
        {step > 0 && <button type="button" className="btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
        {step < 3 ? <button type="button" className="btn" onClick={next}>Continue</button>
          : <button type="submit" className="btn" disabled={status === 'submitting'}>{status === 'submitting' ? 'Booking…' : 'Confirm Appointment'}</button>}
      </div>
    </form>
  )
}
