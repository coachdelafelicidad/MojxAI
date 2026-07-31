'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language, CalculationResult, Profile, isHomeProfile } from '@/lib/types'
import { formatMoney, getResultMessage } from '@/lib/calculations'
import { t } from '@/lib/translations'

// ── Módulos de infraestructura — datos enriquecidos ───────────────────────
const ASSISTANT_MODULES = [
  {
    ids: ['co_emails', 'bz_comms', 'lw_oficio', 'ar_narrative', 'bz_sales', 'co_bio'],
    icon: '⚡',
    badge: { es: 'MÓDULO CORE', en: 'CORE MODULE' },
    name: {
      es: 'Sistema Autónomo de Comunicación',
      en: 'Autonomous Communication System',
    },
    desc: {
      es: 'Elimina el tiempo muerto en redacción de correos y propuestas. Tu IA captura tu tono, contexto y base de clientes para generar respuestas profesionales en segundos, no en horas.',
      en: 'Eliminates dead time drafting emails and proposals. Your AI captures your tone, context and client base to generate professional responses in seconds, not hours.',
    },
    metric: { es: 'Recuperación operativa: 3–5 hrs/sem', en: 'Operational recovery: 3–5 hrs/wk' },
  },
  {
    ids: ['lw_drafting', 'lw_diligence', 'lw_expedientes', 'dr_history', 'ac_reports', 'bz_investors', 'ar_portfolio'],
    icon: '🗂',
    badge: { es: 'MÓDULO CORE', en: 'CORE MODULE' },
    name: {
      es: 'Motor de Análisis Documental',
      en: 'Document Analysis Engine',
    },
    desc: {
      es: 'Extrae, clasifica y genera documentos directamente desde tus expedientes reales. Contratos, informes y resúmenes ejecutivos sin búsqueda manual ni reformateo.',
      en: 'Extracts, classifies and generates documents from your actual files. Contracts, reports and executive summaries without manual searching or reformatting.',
    },
    metric: { es: 'Reducción de ciclo documental: 70%', en: 'Document cycle reduction: 70%' },
  },
  {
    ids: ['bz_meetings', 'pr_agenda', 'pr_logistics', 'lw_deadlines', 'ar_permits', 'pr_travel'],
    icon: '🗓',
    badge: { es: 'MÓDULO OPS', en: 'OPS MODULE' },
    name: {
      es: 'Gestor Inteligente de Agenda',
      en: 'Intelligent Agenda Manager',
    },
    desc: {
      es: 'Genera minutas, propone agendas y gestiona recordatorios de forma autónoma. Tu tiempo de preparación para reuniones colapsa de 45 minutos a cero.',
      en: 'Generates minutes, proposes agendas and manages reminders autonomously. Your meeting preparation time collapses from 45 minutes to zero.',
    },
    metric: { es: 'Tiempo de prep de reuniones: −80%', en: 'Meeting prep time: −80%' },
  },
  {
    ids: ['lw_research', 'dr_research', 'ac_sat', 'ar_materials', 'bz_innovation', 'pr_development', 'pr_parenting', 'pr_health'],
    icon: '🔬',
    badge: { es: 'MÓDULO INTEL', en: 'INTEL MODULE' },
    name: {
      es: 'Asistente de Investigación y Síntesis',
      en: 'Research & Synthesis Assistant',
    },
    desc: {
      es: 'Investiga, compara y sintetiza información compleja en segundos. Elimina horas de búsqueda manual y te entrega análisis listos para decisión.',
      en: 'Researches, compares and synthesizes complex information in seconds. Eliminates hours of manual searching and delivers decision-ready analysis.',
    },
    metric: { es: 'Velocidad de análisis: ×8 más rápido', en: 'Analysis speed: ×8 faster' },
  },
  {
    ids: ['co_content', 'co_webinar', 'dr_content', 'co_leadmagnets', 'co_ads', 'co_workshops'],
    icon: '✦',
    badge: { es: 'MÓDULO GROWTH', en: 'GROWTH MODULE' },
    name: {
      es: 'Generador de Contenido y Materiales',
      en: 'Content & Materials Generator',
    },
    desc: {
      es: 'Produce posts, guiones y materiales de alto valor con tu voz y posicionamiento real. Sin bloqueo creativo, sin delegación costosa.',
      en: 'Produces posts, scripts and high-value materials in your actual voice and positioning. No creative block, no costly outsourcing.',
    },
    metric: { es: 'Producción de contenido: ×5 volumen', en: 'Content output: ×5 volume' },
  },
  {
    ids: ['ac_reconcile', 'ac_reports', 'bz_kpis', 'bz_profit', 'ac_cashflow', 'ac_roi', 'ac_budget', 'ac_taxes', 'ar_budget'],
    icon: '📈',
    badge: { es: 'MÓDULO CFO', en: 'CFO MODULE' },
    name: {
      es: 'Panel Financiero Autónomo',
      en: 'Autonomous Financial Panel',
    },
    desc: {
      es: 'Cruza datos contables, proyecta flujo de caja y detecta desvíos de presupuesto en tiempo real. Tu información financiera siempre lista, sin horas de procesamiento.',
      en: 'Cross-references accounting data, projects cash flow and detects budget deviations in real time. Your financial data always ready, without hours of processing.',
    },
    metric: { es: 'Cierre contable mensual: −4 hrs', en: 'Monthly accounting close: −4 hrs' },
  },
  {
    ids: ['co_followup', 'dr_followup', 'ac_collections', 'bz_crisis', 'lw_onboarding', 'co_community'],
    icon: '🤝',
    badge: { es: 'MÓDULO CRM', en: 'CRM MODULE' },
    name: {
      es: 'Sistema de Seguimiento de Clientes',
      en: 'Client Follow-up System',
    },
    desc: {
      es: 'Automatiza seguimiento, recordatorios de cobro y comunicaciones de onboarding. Ningún cliente cae en el olvido. Ninguna cobranza se pierde.',
      en: 'Automates follow-up, collection reminders and onboarding communications. No client falls through the cracks. No collection gets lost.',
    },
    metric: { es: 'Recuperación de cobros: +30%', en: 'Collection recovery: +30%' },
  },
  {
    ids: ['bz_sops', 'co_methodology', 'bz_hiring', 'bz_vendors', 'ar_safety', 'ar_logs'],
    icon: '⚙️',
    badge: { es: 'MÓDULO OPS', en: 'OPS MODULE' },
    name: {
      es: 'Constructor de Procesos y SOPs',
      en: 'Process & SOPs Builder',
    },
    desc: {
      es: 'Genera manuales de operación, checklists y protocolos para que tu equipo ejecute con precisión sin depender de ti en cada paso.',
      en: 'Generates operation manuals, checklists and protocols so your team executes precisely without depending on you at every step.',
    },
    metric: { es: 'Independencia del equipo: +60%', en: 'Team independence: +60%' },
  },
  {
    ids: ['hm_menus', 'hm_budget', 'hm_pantry', 'hm_nutrition', 'pr_nutrition'],
    icon: '🥗',
    badge: { es: 'MÓDULO HOGAR', en: 'HOME MODULE' },
    name: {
      es: 'Planificador de Menús y Nutrición',
      en: 'Menu & Nutrition Planner',
    },
    desc: {
      es: 'Genera menús semanales, listas del súper y rutinas de alimentación personalizadas según preferencias, presupuesto y necesidades de tu familia.',
      en: "Generates weekly menus, grocery lists and personalized meal routines based on your family's preferences, budget and needs.",
    },
    metric: { es: 'Tiempo en planeación de comidas: −3 hrs/sem', en: 'Meal planning time: −3 hrs/wk' },
  },
  {
    ids: ['hm_staff', 'hm_maintenance', 'hm_spaces', 'hm_documents', 'hm_vehicles', 'hm_cleaning'],
    icon: '🏠',
    badge: { es: 'MÓDULO HOGAR', en: 'HOME MODULE' },
    name: {
      es: 'Centro de Operaciones del Hogar',
      en: 'Home Operations Center',
    },
    desc: {
      es: 'Coordina personal doméstico, servicios de mantenimiento y documentos del hogar desde un solo punto. Orden total sin esfuerzo mental.',
      en: 'Coordinates domestic staff, maintenance services and home documents from a single point. Total order without mental effort.',
    },
    metric: { es: 'Carga mental del hogar: −50%', en: 'Home mental load: −50%' },
  },
  {
    ids: ['dr_notes', 'dr_consents', 'dr_insurance', 'dr_referrals', 'lw_billing', 'ac_payroll'],
    icon: '🩺',
    badge: { es: 'MÓDULO CLÍNICO', en: 'CLINICAL MODULE' },
    name: {
      es: 'Asistente de Documentación Clínica',
      en: 'Clinical Documentation Assistant',
    },
    desc: {
      es: 'Redacta notas de evolución, consentimientos informados y cartas médicas en segundos. Tu tiempo clínico de vuelta a los pacientes, no al papeleo.',
      en: 'Drafts progress notes, informed consents and medical letters in seconds. Your clinical time back to patients, not paperwork.',
    },
    metric: { es: 'Tiempo en papeleo clínico: −4 hrs/día', en: 'Clinical paperwork time: −4 hrs/day' },
  },
  {
    ids: ['ar_quotes', 'ar_zoning', 'ar_space', 'ar_approvals', 'ar_interior', 'ar_permits'],
    icon: '📐',
    badge: { es: 'MÓDULO PROYECTOS', en: 'PROJECTS MODULE' },
    name: {
      es: 'Monitor de Proyectos y Obra',
      en: 'Project & Construction Monitor',
    },
    desc: {
      es: 'Registra avances de obra, controla costos y gestiona trámites con proveedores. Visibilidad total de cada proyecto sin reuniones de seguimiento.',
      en: 'Tracks construction progress, controls costs and manages supplier procedures. Full project visibility without status meetings.',
    },
    metric: { es: 'Desviación presupuestal detectada: −40%', en: 'Budget deviation detected: −40%' },
  },
]

function getSuggestedAssistants(taskIds: string[]) {
  return ASSISTANT_MODULES
    .map(m => ({ ...m, score: m.ids.filter(id => taskIds.includes(id)).length }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

interface ResultScreenProps {
  language: Language
  profile: Profile | null
  result: CalculationResult
  onShare: () => void
  onBack: () => void
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

export function ResultScreen({ language, profile, result, onShare, onBack, onRestart }: ResultScreenProps) {
  const tr = t(language)
  const isHome = isHomeProfile(profile)
  const hoursCount = useCounter(result.hoursRecoverable)
  const moneyCount = useCounter(result.moneyLostPerMonth, 2500)
  const message = getResultMessage(result.hoursRecoverable, language)
  const formattedMoney = formatMoney(moneyCount, language)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState(false)

  const suggestedAssistants = getSuggestedAssistants(result.allTasks.map(t => t.id))

  const highlightedPlan =
    profile === 'homemaker' || profile === 'parenting' ? 'hogar'
    : profile === 'business' ? 'business'
    : 'starter'

  const STRIPE_LINKS: Record<string, string> = {
    starter:  'https://buy.stripe.com/dRm14m4eSfoRbfa6nveME04', // $497 Sistema Completo
    business: 'https://buy.stripe.com/6oU9AS26K5Oh3MI9zHeME01', // $397 Sistema para Equipos
    hogar:    'https://buy.stripe.com/5kQbJ0fXAb8Bdni9zHeME03', // $197 Taller en Vivo
  }

  function handleCheckout(planId: string) {
    const url = STRIPE_LINKS[planId]
    if (url) {
      setCheckoutLoading(planId)
      window.location.href = url
    } else {
      setCheckoutError(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-5 py-16">
      <div className="max-w-lg mx-auto w-full">

        {/* ── Back + Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <button
            onClick={onBack}
            className="text-[#555] text-sm mb-8 block hover:text-white transition-colors"
          >
            ← {language === 'es' ? 'Editar mis respuestas' : 'Edit my answers'}
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
              <span className="text-[#00E5A0] text-[10px] font-bold tracking-[0.3em] uppercase">{tr.resultTitle}</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-white leading-tight">
              {language === 'es' ? 'Aquí está tu diagnóstico' : 'Here is your diagnosis'}
            </h2>
            <p className="text-[#444] text-xs mt-2">
              {language === 'es' ? 'Basado en tus respuestas · Generado en tiempo real' : 'Based on your answers · Generated in real time'}
            </p>
          </div>
        </motion.div>

        {/* ── Hours counter — impacto visual masivo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="relative rounded-3xl p-8 mb-4 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #111 0%, #0D0D0D 100%)',
            border: '1px solid #1E1E1E',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#444] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              {language === 'es' ? 'TIEMPO RECUPERABLE / SEMANA' : 'RECOVERABLE TIME / WEEK'}
            </p>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span
                className="font-display font-black leading-none text-white tabular-nums"
                style={{ fontSize: 'clamp(5rem, 22vw, 7rem)', textShadow: '0 0 40px rgba(255,255,255,0.08)' }}
              >
                {hoursCount}
              </span>
              <span className="font-display font-bold text-3xl text-[#333] mb-3">h</span>
            </div>
            <p className="font-display font-semibold text-sm text-[#888]">{tr.resultHoursSubtitle}</p>
          </div>
        </motion.div>

        {/* ── Money counter — green luxury ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
          className="relative rounded-3xl p-8 mb-6 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #061A10 0%, #040F0A 100%)',
            border: '1px solid rgba(0,229,160,0.2)',
            boxShadow: '0 0 60px rgba(0,229,160,0.08), inset 0 1px 0 rgba(0,229,160,0.1)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#00E5A0]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5A0]/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#00E5A0]/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              {isHome ? tr.resultMoneyTitle : tr.resultMoneyTitlePro}
            </p>
            <div
              className="font-display font-black text-[#00E5A0] mb-2 tabular-nums leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 12vw, 3.75rem)',
                textShadow: '0 0 40px rgba(0,229,160,0.3), 0 0 80px rgba(0,229,160,0.15)',
              }}
            >
              {formattedMoney}
            </div>
            <p className="text-[#2A6B4A] text-sm font-medium">{tr.resultMoneySubtitle}</p>
            {isHome && (
              <p className="text-[#1A3D2A] text-xs mt-2">
                {language === 'es' ? '* Tarifa equivalente de servicio doméstico' : '* Equivalent domestic service rate'}
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Tasks list compacto ── */}
        {result.allTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-2xl p-5 mb-6"
            style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}
          >
            <p className="text-[#444] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">{tr.topTasksTitle}</p>
            <div className="flex flex-col divide-y divide-[#161616]">
              {result.allTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.03 }}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span className="text-base flex-shrink-0">{task.emoji}</span>
                  <span className="text-xs text-[#999] flex-1 leading-snug">{language === 'es' ? task.nameEs : task.nameEn}</span>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <span className="text-[#00E5A0] text-xs font-bold font-display">{task.hoursPerWeek}h</span>
                    <span className="text-[#333] text-[10px]">/sem</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1A1A1A]">
              <span className="text-[#333] text-[10px] font-bold tracking-wider uppercase">
                {language === 'es' ? 'Total' : 'Total'}
              </span>
              <span className="text-white text-sm font-bold font-display">{result.hoursLostPerWeek}h/sem</span>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── MÓDULOS — Diseño luxury definitivo ── */}
        {/* ══════════════════════════════════════════════════════ */}
        {suggestedAssistants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="mb-6"
          >
            {/* Section header */}
            <div className="mb-6">
              <p className="text-[#00E5A0] text-[10px] font-black tracking-[0.4em] uppercase mb-1">
                {language === 'es' ? 'Infraestructura que instalaremos' : 'Infrastructure we will install'}
              </p>
              <p className="text-[#333] text-xs">
                {language === 'es'
                  ? 'Módulos IA personalizados con tus documentos reales · Entrega en 48h'
                  : 'AI modules personalized with your real documents · Delivered in 48h'}
              </p>
            </div>

            <div className="flex flex-col gap-px" style={{ border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'hidden' }}>
              {suggestedAssistants.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.07 }}
                  className="relative flex items-stretch"
                  style={{
                    background: i % 2 === 0 ? '#0A0A0A' : '#080808',
                    borderBottom: i < suggestedAssistants.length - 1 ? '1px solid #141414' : 'none',
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="w-[3px] flex-shrink-0"
                    style={{
                      background: `linear-gradient(180deg, #00E5A0 0%, rgba(0,229,160,0.1) 100%)`,
                      opacity: 1 - i * 0.15,
                    }}
                  />

                  <div className="flex-1 p-5">
                    {/* Top row: badge + number */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[9px] font-black tracking-[0.25em] uppercase"
                        style={{ color: 'rgba(0,229,160,0.6)' }}
                      >
                        {mod.badge[language]}
                      </span>
                      <span
                        className="font-display font-black"
                        style={{ fontSize: '2.5rem', lineHeight: 1, color: 'rgba(255,255,255,0.03)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title row */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-xl leading-none">{mod.icon}</span>
                      <h4 className="font-display font-bold text-white leading-tight" style={{ fontSize: '15px' }}>
                        {mod.name[language]}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-[#555] leading-relaxed mb-4" style={{ fontSize: '12px' }}>
                      {mod.desc[language]}
                    </p>

                    {/* Metric — el diferenciador visual */}
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ background: '#00E5A0', opacity: 0.7 }} />
                      <span className="font-display font-bold text-[#00E5A0]" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                        {mod.metric[language]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        )}

        {/* ── Message ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="text-center mb-6">
          <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #1E1E1E, transparent)' }} />
          <p className="text-[#888] text-sm font-medium leading-relaxed">{message}</p>
        </motion.div>

        {/* ── CTA — Done-For-You $497 ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mb-10">
          <div
            className="relative rounded-2xl p-6 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #061A10 0%, #040E08 100%)',
              border: '1px solid rgba(0,229,160,0.22)',
              boxShadow: '0 0 60px rgba(0,229,160,0.07)',
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#00E5A0]/35 to-transparent" />

            <div className="text-center">
              <p className="text-[#00E5A0]/60 text-[10px] font-black tracking-[0.35em] uppercase mb-3">
                {language === 'es' ? 'Done-For-You · Sin llamadas de ventas' : 'Done-For-You · No sales calls'}
              </p>
              <h3 className="font-display font-bold text-xl text-white mb-1">{tr.ctaTitle}</h3>
              <p className="text-[#2A5A3A] text-sm mb-5">{tr.ctaSubtitle}</p>

              <div className="flex items-baseline justify-center gap-2 mb-5">
                <span
                  className="font-display font-black text-5xl text-white"
                  style={{ textShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                >
                  $497
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-[#555] text-sm leading-none">USD</span>
                  <span className="text-[#333] text-xs leading-none mt-0.5">
                    {language === 'es' ? 'pago único' : 'one-time'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(highlightedPlan)}
                disabled={checkoutLoading !== null}
                className="w-full font-display font-black py-4 rounded-2xl text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
                style={{
                  background: '#00E5A0',
                  color: '#000',
                  boxShadow: '0 0 0 rgba(0,229,160,0)',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.boxShadow = '0 0 40px rgba(0,229,160,0.45)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.boxShadow = '0 0 0 rgba(0,229,160,0)' }}
              >
                {checkoutLoading === highlightedPlan
                  ? (language === 'es' ? 'Redirigiendo a Stripe...' : 'Redirecting to Stripe...')
                  : (language === 'es' ? 'Instalar mi sistema ahora →' : 'Install my system now →')}
              </button>

              <p className="text-[#1E4A30] text-xs mt-3">
                {language === 'es' ? 'Para equipos: $397 USD/seat · mínimo 3 · ' : 'For teams: $397 USD/seat · min 3 · '}
                <a href="mailto:hola@mojxai.com" className="text-[#00E5A0]/50 hover:text-[#00E5A0] transition-colors">
                  hola@mojxai.com
                </a>
              </p>
            </div>
          </div>

          {checkoutError && (
            <p className="text-red-400/80 text-xs text-center mt-3">
              {language === 'es'
                ? 'Hubo un problema al abrir el pago. Intenta de nuevo o escríbenos a hola@mojxai.com'
                : 'There was a problem opening payment. Try again or email us at hola@mojxai.com'}
            </p>
          )}

          <div className="flex items-center justify-center mt-4">
            <button onClick={onShare} className="text-[#333] text-xs hover:text-[#888] transition-colors underline underline-offset-2">
              {tr.ctaSecondary}
            </button>
          </div>
          <p className="text-[#1E1E1E] text-xs mt-2 text-center">{tr.disclaimer}</p>
        </motion.div>

        {/* ── HOW IT WORKS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mb-10">
          <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #1E1E1E, transparent)' }} />
          <p className="text-[#444] text-[10px] font-black tracking-[0.3em] uppercase text-center mb-6">
            {tr.howItWorksTitle}
          </p>
          <div className="flex flex-col gap-4">
            {tr.howItWorksSteps.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}
                >
                  <span className="text-[#00E5A0] text-xs font-black font-display">{s.step}</span>
                </div>
                <div className="pt-1">
                  <p className="text-white text-sm font-semibold mb-0.5">{s.title}</p>
                  <p className="text-[#555] text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── PRICING TABLE ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mb-10">
          <p className="text-[#444] text-[10px] font-black tracking-[0.3em] uppercase text-center mb-2">
            {tr.pricingTitle}
          </p>
          <p className="text-[#333] text-xs text-center mb-6">{tr.pricingSubtitle}</p>

          <div className="flex flex-col gap-4">
            {tr.plans.map((plan) => {
              const isHighlighted = plan.id === highlightedPlan
              return (
                <div
                  key={plan.id}
                  className="rounded-2xl p-5"
                  style={{
                    background: isHighlighted ? 'linear-gradient(145deg, #061A10 0%, #040E08 100%)' : '#0F0F0F',
                    border: isHighlighted ? '1px solid rgba(0,229,160,0.25)' : '1px solid #1A1A1A',
                    boxShadow: isHighlighted ? '0 0 30px rgba(0,229,160,0.07)' : 'none',
                  }}
                >
                  {isHighlighted && (
                    <div className="mb-3">
                      <span
                        className="text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider uppercase"
                        style={{ background: '#00E5A0' }}
                      >
                        {language === 'es' ? '✦ Tu plan recomendado' : '✦ Your recommended plan'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-1 ${isHighlighted ? 'text-[#00E5A0]' : 'text-[#333]'}`}>
                        {plan.name}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className={`font-display font-black text-3xl ${isHighlighted ? 'text-[#00E5A0]' : 'text-white'}`}>
                          {plan.price}
                        </span>
                        <span className="text-[#555] text-sm">{plan.currency}</span>
                      </div>
                      <p className="text-[#333] text-xs mt-0.5">{plan.billing}</p>
                    </div>
                  </div>
                  <p className="text-[#555] text-xs mb-3">{plan.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-xs text-[#777]">{f}</span>
                      </div>
                    ))}
                  </div>
                  {isHighlighted && (
                    <button
                      onClick={() => handleCheckout(plan.id)}
                      disabled={checkoutLoading !== null}
                      className="w-full mt-4 font-display font-black py-3 rounded-xl text-sm text-center transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
                      style={{ background: '#00E5A0', color: '#000' }}
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

        {/* ── GUARANTEE 10/100 ── */}
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            className="mb-10 rounded-2xl p-6 text-center"
            style={{
              background: 'linear-gradient(145deg, #061A10 0%, #040E08 100%)',
              border: '1px solid rgba(0,229,160,0.15)',
              boxShadow: '0 0 30px rgba(0,229,160,0.05)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)' }}
            >
              <ShieldIcon />
            </div>
            <h4 className="font-display font-bold text-2xl text-[#00E5A0] mb-3">{tr.guaranteeTitle}</h4>
            <p className="text-[#555] text-sm leading-relaxed mb-5">{tr.guaranteeDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {tr.guaranteeBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#00E5A0" fillOpacity="0.15"/>
                    <path d="M3.5 6L5 7.5L8.5 4" stroke="#00E5A0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#555] text-xs">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── FAQ ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mb-10">
          <p className="text-[#444] text-[10px] font-black tracking-[0.3em] uppercase text-center mb-6">
            {tr.faqTitle}
          </p>
          <div className="rounded-2xl px-5" style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}>
            {tr.faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-center pb-10">
          <button onClick={onRestart} className="text-[#333] text-xs hover:text-[#666] transition-colors">
            ← {tr.homeButton}
          </button>
          <p className="text-[#1A1A1A] text-xs mt-4">MOJXAI · Systems · mojxai.com</p>
        </motion.div>

      </div>
    </div>
  )
}
