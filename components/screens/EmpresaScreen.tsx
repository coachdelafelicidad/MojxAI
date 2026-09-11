'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Language } from '@/lib/types'
import { t } from '@/lib/translations'
import { DiagnosticChrome } from '@/components/DiagnosticChrome'
import { HoursRangePicker } from '@/components/HoursRangePicker'
import {
  EnterpriseLeadState,
  defaultEnterpriseState,
  loadDiagnosticState,
  loadEnterpriseState,
  patchDiagnosticState,
  saveEnterpriseState,
} from '@/lib/diagnostic-storage'

const TEAM_SIZE_OPTIONS = ['1–10', '11–30', '31–100', '100+']
const SHORT_MAX = 400

export function EmpresaPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('es')
  const [form, setForm] = useState<EnterpriseLeadState>(defaultEnterpriseState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLanguage(loadDiagnosticState().language)
    setForm(loadEnterpriseState())
    setReady(true)
  }, [])

  const labels = t(language)

  function persistLanguage(next: Language) {
    setLanguage(next)
    patchDiagnosticState({ language: next })
  }

  function persist(patch: Partial<EnterpriseLeadState>) {
    setForm(prev => {
      const next = { ...prev, ...patch }
      saveEnterpriseState(next)
      return next
    })
  }

  function goBackToProfiles() {
    patchDiagnosticState({ step: 1 })
    router.push('/diagnostico')
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const canSubmit =
    form.name.trim().length > 1 &&
    form.company.trim().length > 1 &&
    emailOk &&
    form.whatsapp.replace(/\D/g, '').length >= 8 &&
    form.teamSize !== '' &&
    form.areas.trim().length > 0 &&
    form.goal.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'enterprise', language, ...form }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  function box(active: boolean) {
    return `flex flex-col gap-2 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
      active
        ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
        : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
    }`
  }

  if (!ready) {
    return (
      <DiagnosticChrome language={language} onLanguageChange={persistLanguage} progress={25}>
        <div className="min-h-screen" />
      </DiagnosticChrome>
    )
  }

  return (
    <DiagnosticChrome language={language} onLanguageChange={persistLanguage} progress={25}>
      <div className="flex flex-col min-h-screen px-4 py-16">
        <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={goBackToProfiles}
            className="text-[#888888] text-sm mb-6 self-start hover:text-white transition-colors"
          >
            ← {labels.backButton}
          </motion.button>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-2xl sm:text-3xl mb-2"
          >
            {language === 'es' ? 'Empresa con múltiples áreas' : 'Company with multiple departments'}
          </motion.h2>
          <p className="text-[#555] text-sm mb-6">
            {language === 'es'
              ? 'Cuéntanos de tu equipo y te armamos una cotización a medida.'
              : 'Tell us about your team and we’ll put together a custom quote.'}
          </p>

          {status === 'success' ? (
            <div className="p-5 rounded-2xl border border-[#00E5A0]/30 bg-[#00E5A0]/5">
              <p className="text-[#00E5A0] font-display font-semibold mb-2">{labels.enterpriseSuccess}</p>
              <button
                onClick={goBackToProfiles}
                className="text-[#888] text-sm hover:text-white transition-colors"
              >
                ← {labels.backButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className={box(form.name.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.contactNameLabel}</span>
                <input
                  required
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => persist({ name: e.target.value })}
                  placeholder={labels.contactNamePlaceholder}
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-[#555] outline-none"
                />
              </label>

              <label className={box(form.company.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.enterpriseCompanyLabel}</span>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={(e) => persist({ company: e.target.value })}
                  placeholder={labels.enterpriseCompanyPlaceholder}
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-[#555] outline-none"
                />
              </label>

              <div className="p-4 rounded-2xl border border-[#1A1A1A] bg-[#111]">
                <p className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug mb-4">
                  {labels.enterpriseTeamLabel}
                </p>
                <HoursRangePicker
                  options={TEAM_SIZE_OPTIONS}
                  value={form.teamSize}
                  onChange={(opt) => persist({ teamSize: opt })}
                />
              </div>

              <label className={box(form.whatsapp.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.contactWhatsappLabel}</span>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={(e) => persist({ whatsapp: e.target.value })}
                  placeholder={labels.contactWhatsappPlaceholder}
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-[#555] outline-none"
                />
              </label>

              <label className={box(form.email.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.enterpriseEmailLabel}</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => persist({ email: e.target.value })}
                  placeholder={labels.enterpriseEmailPlaceholder}
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-[#555] outline-none"
                />
              </label>

              <label className={box(form.areas.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.enterpriseAreasLabel}</span>
                <textarea
                  required
                  value={form.areas}
                  onChange={(e) => persist({ areas: e.target.value.slice(0, SHORT_MAX) })}
                  placeholder={labels.enterpriseAreasPlaceholder}
                  rows={3}
                  maxLength={SHORT_MAX}
                  className="w-full resize-none bg-transparent text-sm text-white placeholder:text-[#555] outline-none leading-snug"
                />
              </label>

              <label className={box(form.goal.trim().length > 0)}>
                <span className="font-display font-semibold text-sm text-[#CCCCCC]">{labels.enterpriseGoalLabel}</span>
                <textarea
                  required
                  value={form.goal}
                  onChange={(e) => persist({ goal: e.target.value.slice(0, SHORT_MAX) })}
                  placeholder={labels.enterpriseGoalPlaceholder}
                  rows={3}
                  maxLength={SHORT_MAX}
                  className="w-full resize-none bg-transparent text-sm text-white placeholder:text-[#555] outline-none leading-snug"
                />
              </label>

              <button
                type="submit"
                disabled={!canSubmit || status === 'sending'}
                className="mt-3 w-full bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,160,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? labels.contactSending : labels.enterpriseSubmit}
              </button>
              {status === 'error' && (
                <p className="text-red-400/80 text-xs text-center">{labels.contactError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </DiagnosticChrome>
  )
}
