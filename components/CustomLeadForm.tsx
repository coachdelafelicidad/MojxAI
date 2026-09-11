'use client'

import { useState } from 'react'
import { Language } from '@/lib/types'
import { t } from '@/lib/translations'

export interface CustomLeadPayload {
  profession: string
  tasksNote: string
  lostHours: string
  hoursRecoverable: number
  moneyLostPerMonth: number
}

interface CustomLeadFormProps {
  language: Language
  payload: CustomLeadPayload
}

export function CustomLeadForm({ language, payload }: CustomLeadFormProps) {
  const tr = t(language)
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !whatsapp.trim() || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim(),
          language,
          ...payload,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full bg-transparent text-sm font-medium text-white placeholder:text-[#555] outline-none'

  const box = (active: boolean) =>
    `flex flex-col gap-2 p-4 rounded-2xl border transition-all duration-300 ${
      active
        ? 'border-[#00E5A0] bg-[#00E5A0]/5'
        : 'border-[#1A1A1A] bg-[#111]'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-5 mb-6"
      style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}
    >
      <p className="font-display font-bold text-white text-base mb-1">{tr.contactTitle}</p>
      <p className="text-[#555] text-sm mb-4 leading-snug">{tr.contactSubtitle}</p>

      <div className="flex flex-col gap-3">
        <label className={box(name.trim().length > 0)}>
          <span className="font-display font-semibold text-sm text-[#CCCCCC]">{tr.contactNameLabel}</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tr.contactNamePlaceholder}
            className={fieldClass}
          />
        </label>

        <label className={box(whatsapp.trim().length > 0)}>
          <span className="font-display font-semibold text-sm text-[#CCCCCC]">{tr.contactWhatsappLabel}</span>
          <input
            required
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder={tr.contactWhatsappPlaceholder}
            className={fieldClass}
          />
        </label>

        <label className={box(email.trim().length > 0)}>
          <span className="font-display font-semibold text-sm text-[#CCCCCC]">{tr.contactEmailLabel}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tr.contactEmailPlaceholder}
            className={fieldClass}
          />
        </label>
      </div>

      {status === 'success' ? (
        <p className="text-[#00E5A0] text-sm text-center mt-4">{tr.contactSuccess}</p>
      ) : (
        <>
          <button
            type="submit"
            disabled={status === 'sending' || !name.trim() || !whatsapp.trim()}
            className="w-full mt-4 bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,160,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? tr.contactSending : tr.contactSubmit}
          </button>
          {status === 'error' && (
            <p className="text-red-400/80 text-xs text-center mt-3">{tr.contactError}</p>
          )}
        </>
      )}
    </form>
  )
}
