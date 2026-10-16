import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactValues } from '../../lib/validations'
import { sendContact } from '../../services/contactService'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'demo' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { name: '', email: '', phone: '', message: '', website: '' } })
  const onSubmit = handleSubmit(async (v) => {
    if (status === 'sending' || v.website) return
    setStatus('sending')
    const r = await sendContact(v)
    setStatus(r)
    if (r !== 'error') reset()
  })
  const fields = [['name', 'Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone (optional)', 'tel']] as const
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-label="Contact form">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />
      {fields.map(([k, label, type]) => (
        <label key={k} className="grid gap-1 font-bold">{label}
          <input type={type} className="input" aria-invalid={!!errors[k]} {...register(k)} />
          {errors[k] && <span className="err font-normal" role="alert">{errors[k]?.message}</span>}
        </label>
      ))}
      <label className="grid gap-1 font-bold">Message
        <textarea rows={4} className="input" aria-invalid={!!errors.message} {...register('message')} />
        {errors.message && <span className="err font-normal" role="alert">{errors.message.message}</span>}
      </label>
      <button className="btn self-start" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Message'}</button>
      <div role="status" aria-live="polite">
        {status === 'ok' && <p className="text-brand">Thank you. We have received your message and will reply soon.</p>}
        {status === 'demo' && <p className="text-brand">Demo mode: message not saved. Connect Supabase to receive real messages.</p>}
        {status === 'error' && <p className="err">Please check your internet connection and try again, or call us directly.</p>}
      </div>
    </form>
  )
}
