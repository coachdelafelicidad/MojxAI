'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language, CalculationResult, Profile, isHomeProfile } from '@/lib/types'
import { formatMoney, getResultMessage } from '@/lib/calculations'
import { t } from '@/lib/translations'

interface ResultScreenProps {
  language: Language
  profile: Profile | null
  result: CalculationResult
  onShare: () => void
  onRestart: () => void
}

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    startTime.current = null
    setCount(0)
    function step(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])

  return count
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"
        stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12L10.5 14.5L16 9" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7" cy="7" r="7" fill="#00E5A0" fillOpacity="0.15"/>
      <path d="M4 7L6 9L10 5" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1A1A1A] last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-3"
      >
        <span className="text-sm font-medium text-[#CCCCCC]">{q}</span>
        <span className={`text-[#00E5A0] text-lg flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#888888] pb-4 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ResultScreen({ language, profile, result, onShare, onRestart }: ResultScreenProps) {
  const tr = t(language)
  const isHome = isHomeProfile(profile)
  const hoursCount = useCounter(result.hoursRecoverable)
  const moneyCount = useCounter(result.moneyLostPerMonth, 2500)
  const message = getResultMessage(result.hoursRecoverable, language)
  const formattedMoney = formatMoney(moneyCount, language)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  const waPhone = '528145912034'
  const waMessage = language === 'es'
    ? `Hola! Acabo de hacer el diagnóstico de MojxAI y puedo recuperar ${result.hoursRecoverable} horas/semana. Quiero que me instalen el sistema de IA.`
    : `Hi! I just did the MojxAI diagnostic and I can recover ${result.hoursRecoverable} hours/week. I want the AI system installed.`
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`

  // Determine which plan to highlight based on profile
  const highlightedPlan =
    profile === 'homemaker' || profile === 'parenting' ? 'hogar'
    : profile === 'business' ? 'business'
    : 'starter'

  async function handleCheckout(planId: string) {
    setCheckoutLoading(planId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, language }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      // fallback to WhatsApp if Stripe fails
      window.open(waUrl, '_blank')
    } finally {
      setCheckoutLoading(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-16">
      <div className="max-w-lg mx-auto w-full">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase">{tr.resultTitle}</span>
        </motion.div>

        {/* ── Hours counter ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="bg-[#141414] border border-[#1E1E1E] rounded-3xl p-8 mb-5 text-center"
        >
          <div className="font-display font-bold text-7xl sm:text-8xl text-white mb-2">
            {hoursCount}<span className="text-3xl ml-2 text-[#888888]">h</span>
          </div>
          <p className="font-display font-semibold text-lg text-[#CCCCCC]">{tr.resultHoursTitle(result.hoursRecoverable)}</p>
          <p className="text-[#888888] text-sm mt-1">{tr.resultHoursSubtitle}</p>
        </motion.div>

        {/* ── Money counter ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="bg-[#0A1A12] border border-[#00E5A0]/20 rounded-3xl p-8 mb-5 text-center"
          style={{ boxShadow: '0 0 40px rgba(0, 229, 160, 0.08)' }}
        >
          <p className="text-[#888888] text-sm mb-2">
            {isHome ? tr.resultMoneyTitle : tr.resultMoneyTitlePro}
          </p>
          <div className="font-display font-bold text-5xl sm:text-6xl text-[#00E5A0] mb-2">{formattedMoney}</div>
          <p className="text-[#888888] text-sm">{tr.resultMoneySubtitle}</p>
          {isHome && (
            <p className="text-[#555] text-xs mt-2">
              {language === 'es' ? '* Basado en tarifa equivalente de servicio doméstico' : '* Based on equivalent domestic service rate'}
            </p>
          )}
        </motion.div>

        {/* ── Tasks list ── */}
        {result.allTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-6 mb-5"
          >
            <p className="text-[#888888] text-xs font-semibold uppercase tracking-wider mb-4">{tr.topTasksTitle}</p>
            <div className="flex flex-col divide-y divide-[#1A1A1A]">
              {result.allTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.04 }}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-lg flex-shrink-0">{task.emoji}</span>
                  <span className="text-sm text-[#CCCCCC] flex-1">{language === 'es' ? task.nameEs : task.nameEn}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-[#00E5A0] text-xs font-bold">{task.hoursPerWeek}h</span>
                    <span className="text-[#444] text-xs">/sem</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#222]">
              <span className="text-[#888888] text-xs font-semibold uppercase tracking-wider">
                {language === 'es' ? 'Total seleccionado' : 'Total selected'}
              </span>
              <span className="text-white text-sm font-bold">{result.hoursLostPerWeek}h/sem</span>
            </div>
          </motion.div>
        )}

        {/* ── Message ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mb-8">
          <div className="w-full h-px bg-[#1E1E1E] mb-6" />
          <p className="text-[#CCCCCC] text-base font-medium leading-relaxed">{message}</p>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-center mb-10">
          <h3 className="font-display font-bold text-2xl mb-3">{tr.ctaTitle}</h3>
          <p className="text-[#888888] text-sm mb-6">{tr.ctaSubtitle}</p>

          <button
            onClick={() => handleCheckout(highlightedPlan)}
            disabled={checkoutLoading !== null}
            className="block w-full bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,160,0.4)] hover:scale-[1.02] mb-4 disabled:opacity-70 disabled:cursor-wait"
          >
            {checkoutLoading === highlightedPlan
              ? (language === 'es' ? 'Redirigiendo...' : 'Redirecting...')
              : tr.ctaPrimary}
          </button>

          <a
            href="mailto:mojxai.app@gmail.com"
            className="block w-full border border-[#2E2E2E] text-[#CCCCCC] font-display font-semibold py-3.5 rounded-full text-sm text-center transition-all duration-200 hover:border-[#00E5A0]/40 hover:text-white mb-4"
          >
            {language === 'es' ? '✉️ Enviar por correo' : '✉️ Send by email'}
          </a>

          <button onClick={onShare} className="text-[#888888] text-sm hover:text-white transition-colors underline underline-offset-2">
            {tr.ctaSecondary}
          </button>

          <p className="text-[#333333] text-xs mt-4">{tr.disclaimer}</p>
        </motion.div>

        {/* ══════════════════════════════════════ */}
        {/* ── HOW IT WORKS ── */}
        {/* ══════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mb-10">
          <div className="w-full h-px bg-[#1E1E1E] mb-8" />
          <p className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase text-center mb-6">
            {tr.howItWorksTitle}
          </p>
          <div className="flex flex-col gap-4">
            {tr.howItWorksSteps.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00E5A0] text-xs font-bold font-display">{s.step}</span>
                </div>
                <div className="pt-1">
                  <p className="text-white text-sm font-semibold mb-0.5">{s.title}</p>
                  <p className="text-[#666] text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════ */}
        {/* ── PRICING TABLE ── */}
        {/* ══════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mb-10">
          <p className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase text-center mb-2">
            {tr.pricingTitle}
          </p>
          <p className="text-[#555] text-xs text-center mb-6">{tr.pricingSubtitle}</p>

          <div className="flex flex-col gap-4">
            {tr.plans.map((plan) => {
              const isHighlighted = plan.id === highlightedPlan
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    isHighlighted
                      ? 'border-[#00E5A0] bg-[#0A1A12] shadow-[0_0_30px_rgba(0,229,160,0.1)]'
                      : 'border-[#1E1E1E] bg-[#141414]'
                  }`}
                >
                  {isHighlighted && (
                    <div className="mb-3">
                      <span className="bg-[#00E5A0] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {language === 'es' ? '✦ Tu plan recomendado' : '✦ Your recommended plan'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${isHighlighted ? 'text-[#00E5A0]' : 'text-[#555]'}`}>
                        {plan.name}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className={`font-display font-bold text-3xl ${isHighlighted ? 'text-[#00E5A0]' : 'text-white'}`}>
                          {plan.price}
                        </span>
                        <span className="text-[#888] text-sm">{plan.currency}</span>
                      </div>
                      <p className="text-[#555] text-xs mt-0.5">{plan.billing}</p>
                    </div>
                  </div>
                  <p className="text-[#888] text-xs mb-3">{plan.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-xs text-[#AAAAAA]">{f}</span>
                      </div>
                    ))}
                  </div>
                  {isHighlighted && (
                    <button
                      onClick={() => handleCheckout(plan.id)}
                      disabled={checkoutLoading !== null}
                      className="block w-full mt-4 bg-[#00E5A0] text-black font-display font-bold py-3 rounded-full text-sm text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,229,160,0.35)] disabled:opacity-70 disabled:cursor-wait"
                    >
                      {checkoutLoading === plan.id
                        ? (language === 'es' ? 'Redirigiendo...' : 'Redirecting...')
                        : (language === 'es' ? 'Pagar ahora →' : 'Pay now →')}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ── GUARANTEE 10/100 — only for professional/business profiles ── */}
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            className="mb-10 rounded-2xl bg-[#0A1A12] border border-[#00E5A0]/20 p-6 text-center"
            style={{ boxShadow: '0 0 30px rgba(0,229,160,0.06)' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center mx-auto mb-4">
              <ShieldIcon />
            </div>
            <h4 className="font-display font-bold text-2xl text-[#00E5A0] mb-3">{tr.guaranteeTitle}</h4>
            <p className="text-[#CCCCCC] text-sm leading-relaxed mb-5">{tr.guaranteeDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {tr.guaranteeBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#00E5A0" fillOpacity="0.2"/>
                    <path d="M3.5 6L5 7.5L8.5 4" stroke="#00E5A0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#888] text-xs">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* ── FAQ ── */}
        {/* ══════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mb-10">
          <p className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase text-center mb-6">
            {tr.faqTitle}
          </p>
          <div className="bg-[#141414] border border-[#1E1E1E] rounded-2xl px-5">
            {tr.faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-center pb-8">
          <button onClick={onRestart} className="text-[#444] text-xs hover:text-[#888] transition-colors">
            ← {tr.homeButton}
          </button>
          <p className="text-[#222] text-xs mt-4">MojxAI · Founded by OIG</p>
        </motion.div>

      </div>
    </div>
  )
}
