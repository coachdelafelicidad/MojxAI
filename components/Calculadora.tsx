'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ── Brand ──────────────────────────────────────────────────────────────────
const G = '#00FF85'

// ── Data ───────────────────────────────────────────────────────────────────
const PROFESIONES = [
  { id: 'abogado',    emoji: '⚖️',  name: 'Abogado / Legal' },
  { id: 'medico',     emoji: '🏥',  name: 'Médico / Salud' },
  { id: 'contador',   emoji: '💼',  name: 'Contador / Finanzas' },
  { id: 'coach',      emoji: '🎯',  name: 'Coach / Consultor' },
  { id: 'arquitecto', emoji: '🏗️', name: 'Arquitecto / Diseño' },
  { id: 'dueno',      emoji: '🏢',  name: 'Dueño de empresa' },
  { id: 'hogar',      emoji: '🏠',  name: 'Ama de casa / Hogar' },
]

const TAREAS: Record<string, string[]> = {
  abogado:    ['Redactar contratos y escritos', 'Responder correos de clientes', 'Investigar jurisprudencia y casos', 'Preparar demandas y recursos', 'Revisar documentos y expedientes', 'Cobros, facturación y propuestas'],
  medico:     ['Escribir notas clínicas y expedientes', 'Responder mensajes de pacientes', 'Redactar recetas e indicaciones', 'Reportes para aseguradoras', 'Elaborar consentimientos informados', 'Gestión de citas y agenda'],
  contador:   ['Preparar declaraciones fiscales', 'Comunicación y seguimiento con clientes', 'Estados financieros y reportes', 'Gestión de nómina', 'Análisis de costos y proyecciones', 'Cobros y cartera vencida'],
  coach:      ['Preparar materiales de sesión', 'Crear contenido para redes sociales', 'Escribir propuestas y cotizaciones', 'Seguimiento y onboarding de clientes', 'Redactar correos y newsletters', 'Administración y agenda'],
  arquitecto: ['Redactar propuestas de proyecto', 'Minutas de reunión con clientes', 'Especificaciones técnicas', 'Presupuestos y cotizaciones', 'Comunicación con clientes y proveedores', 'Gestión de trámites y permisos'],
  dueno:      ['Responder correos y mensajes urgentes', 'Reportes, métricas y análisis', 'Comunicación interna y delegación', 'Seguimiento de ventas y CRM', 'Operaciones y procesos diarios', 'Recursos humanos y contratación'],
  hogar:      ['Gestión de agenda familiar', 'Comunicación con escuela y proveedores', 'Finanzas personales y presupuesto', 'Organización del hogar y compras', 'Planificación de comidas y logística', 'Trámites, documentos y gestiones'],
}

const HORAS_OPTIONS = [
  { label: '5 – 10 horas',    mid: 7.5 },
  { label: '10 – 20 horas',   mid: 15 },
  { label: '20 – 30 horas',   mid: 25 },
  { label: '30 horas o más',  mid: 35 },
]

const INCOME_OPTIONS = [
  { label: 'Menos de $1,000 USD / mes',    value: 750 },
  { label: '$1,000 – $2,500 USD / mes',    value: 1750 },
  { label: '$2,500 – $5,000 USD / mes',    value: 3750 },
  { label: '$5,000 – $10,000 USD / mes',   value: 7500 },
  { label: 'Más de $10,000 USD / mes',     value: 12000 },
  { label: '🔒 Prefiero no decir',         value: 2750 },
]

// ── Calculation ────────────────────────────────────────────────────────────
function calcular(horasMid: number, income: number) {
  const horasLost = parseFloat((horasMid * 0.72).toFixed(1))
  const hourlyRate = income / 173
  const moneyWeek  = Math.round(horasLost * hourlyRate)
  const moneyMonth = moneyWeek * 4
  const moneyYear  = moneyWeek * 52
  return { horasLost, moneyWeek, moneyMonth, moneyYear }
}

// ── Step progress ──────────────────────────────────────────────────────────
const TOTAL_STEPS = 5

// ── Variants ──────────────────────────────────────────────────────────────
const slide = {
  enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0 }),
}

// ── Sub-components ─────────────────────────────────────────────────────────
function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <circle cx="7" cy="7" r="7" fill="#00FF85" fillOpacity="0.15" />
      <path d="M3.5 7L6 9.5L10.5 4.5" stroke="#00FF85" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all duration-400"
          style={{
            width: i < step ? '24px' : '8px',
            background: i < step ? G : i === step - 1 ? G : '#222',
            opacity: i === step - 1 ? 1 : i < step ? 0.5 : 0.3,
          }}
        />
      ))}
      <span className="text-[#444] text-xs ml-2">{step}/{TOTAL_STEPS}</span>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function Calculadora() {
  const [step, setStep]         = useState(0) // 0=intro, 1-5=questions, 6=result
  const [dir, setDir]           = useState(1)
  const [nombre, setNombre]     = useState('')
  const [profesion, setProfesion] = useState('')
  const [tareas, setTareas]     = useState<string[]>([])
  const [horas, setHoras]       = useState<number | null>(null)
  const [income, setIncome]     = useState<number | null>(null)

  function goTo(next: number) {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  function toggleTarea(t: string) {
    setTareas(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : prev.length < 3 ? [...prev, t] : prev
    )
  }

  const result = horas !== null && income !== null
    ? calcular(horas, income)
    : null

  const tareasDisponibles = profesion ? (TAREAS[profesion] ?? []) : []

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b border-[#141414] bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="font-display font-bold text-sm tracking-widest uppercase" style={{ color: G }}>
          MOJXAI
        </Link>
        {step > 0 && step < 6 && (
          <span className="text-[#555] text-xs">Calculadora de Horas Perdidas</span>
        )}
        <Link href="/#precios" className="text-[#555] text-xs hover:text-white transition-colors">
          Ver planes →
        </Link>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-14">
        <div className="w-full max-w-lg">

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >

              {/* ── STEP 0: INTRO ── */}
              {step === 0 && (
                <div className="text-center py-16">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: G }}>
                      MOJXAI · Calculadora Gratuita
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
                    className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] mt-5 mb-5 tracking-tight"
                  >
                    Descubre exactamente cuánto{' '}
                    <span style={{ color: G }}>tiempo y dinero</span>{' '}
                    estás perdiendo cada semana
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-[#888] text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto"
                  >
                    Responde 5 preguntas sobre tu trabajo y recibe tu número personalizado — con tu nombre, tu profesión y tu tarifa.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <button
                      onClick={() => goTo(1)}
                      className="inline-flex items-center gap-2 font-display font-bold px-10 py-5 rounded-full text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,133,0.4)]"
                      style={{ background: G }}
                    >
                      Calcular mis horas perdidas
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                    <p className="text-[#444] text-xs">100% gratuito · Sin registro · Resultado en 2 minutos</p>
                  </motion.div>

                  {/* Trust pills */}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                  >
                    {['Para abogados, médicos, contadores, coaches y más', 'Calculado con tu tarifa real', 'Sin tecnicismos — solo tu número'].map(t => (
                      <span key={t} className="flex items-center gap-1.5 text-xs text-[#555] border border-[#1A1A1A] rounded-full px-3 py-1.5">
                        <CheckIcon size={11} /> {t}
                      </span>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── STEP 1: NOMBRE ── */}
              {step === 1 && (
                <div className="py-10">
                  <ProgressDots step={1} />
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2 leading-tight">
                    ¿Cómo te llamas?
                  </h2>
                  <p className="text-[#666] text-sm mb-8">Tu resultado será personalizado con tu nombre.</p>

                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && nombre.trim() && goTo(2)}
                    placeholder="Escribe tu nombre..."
                    autoFocus
                    className="w-full bg-[#111] border border-[#222] rounded-xl px-5 py-4 text-white text-base placeholder-[#444] focus:outline-none focus:border-[#00FF85] transition-colors mb-8"
                    style={{ caretColor: G }}
                  />

                  <button
                    onClick={() => goTo(2)}
                    disabled={!nombre.trim()}
                    className="w-full font-display font-bold py-4 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,255,133,0.25)] hover:scale-[1.01]"
                    style={{ background: nombre.trim() ? G : '#1A1A1A', color: nombre.trim() ? 'black' : '#555' }}
                  >
                    Continuar →
                  </button>
                </div>
              )}

              {/* ── STEP 2: PROFESIÓN ── */}
              {step === 2 && (
                <div className="py-10">
                  <ProgressDots step={2} />
                  <button onClick={() => goTo(1)} className="text-[#555] text-xs mb-6 block hover:text-white transition-colors">← Atrás</button>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2 leading-tight">
                    ¿Cuál es tu profesión, {nombre.split(' ')[0]}?
                  </h2>
                  <p className="text-[#666] text-sm mb-8">Elige la que mejor te describe.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {PROFESIONES.map(p => {
                      const active = profesion === p.id
                      return (
                        <button
                          key={p.id}
                          onClick={() => { setProfesion(p.id); setTareas([]) }}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-200"
                          style={{
                            borderColor: active ? G : '#1E1E1E',
                            background: active ? `rgba(0,255,133,0.06)` : '#111',
                            boxShadow: active ? `0 0 20px rgba(0,255,133,0.1)` : 'none',
                          }}
                        >
                          <span className="text-2xl">{p.emoji}</span>
                          <span className="text-xs font-semibold leading-tight" style={{ color: active ? '#fff' : '#888' }}>{p.name}</span>
                          {active && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: G }}>
                              <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => goTo(3)}
                    disabled={!profesion}
                    className="w-full font-display font-bold py-4 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01]"
                    style={{ background: profesion ? G : '#1A1A1A', color: profesion ? 'black' : '#555' }}
                  >
                    Continuar →
                  </button>
                </div>
              )}

              {/* ── STEP 3: TAREAS ── */}
              {step === 3 && (
                <div className="py-10">
                  <ProgressDots step={3} />
                  <button onClick={() => goTo(2)} className="text-[#555] text-xs mb-6 block hover:text-white transition-colors">← Atrás</button>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2 leading-tight">
                    ¿Cuáles son tus tareas más repetitivas?
                  </h2>
                  <p className="text-[#666] text-sm mb-8">
                    Elige hasta <strong className="text-white">3 tareas</strong> que haces de forma regular.
                    {tareas.length > 0 && <span style={{ color: G }}> ({tareas.length}/3 seleccionadas)</span>}
                  </p>

                  <div className="flex flex-col gap-2 mb-8">
                    {tareasDisponibles.map(t => {
                      const checked = tareas.includes(t)
                      const maxed = !checked && tareas.length >= 3
                      return (
                        <button
                          key={t}
                          onClick={() => toggleTarea(t)}
                          disabled={maxed}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200"
                          style={{
                            borderColor: checked ? G : '#1E1E1E',
                            background: checked ? 'rgba(0,255,133,0.05)' : '#111',
                            opacity: maxed ? 0.3 : 1,
                            cursor: maxed ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ borderColor: checked ? G : '#333', background: checked ? G : 'transparent' }}
                          >
                            {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                          </div>
                          <span className="text-sm font-medium" style={{ color: checked ? '#fff' : '#999' }}>{t}</span>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => goTo(4)}
                    disabled={tareas.length === 0}
                    className="w-full font-display font-bold py-4 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01]"
                    style={{ background: tareas.length > 0 ? G : '#1A1A1A', color: tareas.length > 0 ? 'black' : '#555' }}
                  >
                    Continuar →
                  </button>
                </div>
              )}

              {/* ── STEP 4: HORAS ── */}
              {step === 4 && (
                <div className="py-10">
                  <ProgressDots step={4} />
                  <button onClick={() => goTo(3)} className="text-[#555] text-xs mb-6 block hover:text-white transition-colors">← Atrás</button>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2 leading-tight">
                    ¿Cuántas horas por semana dedicas a esas tareas?
                  </h2>
                  <p className="text-[#666] text-sm mb-8">Suma todas las horas que pasas haciendo las tareas que elegiste.</p>

                  <div className="flex flex-col gap-3 mb-8">
                    {HORAS_OPTIONS.map(opt => {
                      const active = horas === opt.mid
                      return (
                        <button
                          key={opt.label}
                          onClick={() => setHoras(opt.mid)}
                          className="w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200"
                          style={{
                            borderColor: active ? G : '#1E1E1E',
                            background: active ? 'rgba(0,255,133,0.06)' : '#111',
                            color: active ? '#fff' : '#999',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.label}</span>
                            {active && <CheckIcon size={16} />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => goTo(5)}
                    disabled={horas === null}
                    className="w-full font-display font-bold py-4 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01]"
                    style={{ background: horas !== null ? G : '#1A1A1A', color: horas !== null ? 'black' : '#555' }}
                  >
                    Continuar →
                  </button>
                </div>
              )}

              {/* ── STEP 5: INGRESO ── */}
              {step === 5 && (
                <div className="py-10">
                  <ProgressDots step={5} />
                  <button onClick={() => goTo(4)} className="text-[#555] text-xs mb-6 block hover:text-white transition-colors">← Atrás</button>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2 leading-tight">
                    ¿Cuánto ganas al mes, aproximadamente?
                  </h2>
                  <p className="text-[#666] text-sm mb-8">Esto permite calcular el valor real de tu hora. Nadie más verá este dato.</p>

                  <div className="flex flex-col gap-3 mb-8">
                    {INCOME_OPTIONS.map(opt => {
                      const active = income === opt.value
                      const isPref = opt.label.startsWith('🔒')
                      return (
                        <button
                          key={opt.label}
                          onClick={() => setIncome(opt.value)}
                          className="w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200"
                          style={{
                            borderColor: active ? G : '#1E1E1E',
                            background: active ? 'rgba(0,255,133,0.06)' : '#111',
                            color: active ? '#fff' : isPref ? '#555' : '#999',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className={isPref ? 'italic' : ''}>{opt.label}</span>
                            {active && <CheckIcon size={16} />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => goTo(6)}
                    disabled={income === null}
                    className="w-full font-display font-bold py-4 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_24px_rgba(0,255,133,0.3)] hover:scale-[1.01]"
                    style={{ background: income !== null ? G : '#1A1A1A', color: income !== null ? 'black' : '#555' }}
                  >
                    Ver mi resultado →
                  </button>
                </div>
              )}

              {/* ── STEP 6: RESULTADO ── */}
              {step === 6 && result && (
                <ResultScreen
                  nombre={nombre}
                  profesion={PROFESIONES.find(p => p.id === profesion)?.name ?? profesion}
                  tareas={tareas}
                  result={result}
                  onRestart={() => {
                    setStep(0); setDir(-1); setNombre(''); setProfesion(''); setTareas([]); setHoras(null); setIncome(null)
                  }}
                />
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}

// ── Result Screen ──────────────────────────────────────────────────────────
function ResultScreen({
  nombre,
  profesion,
  tareas,
  result,
  onRestart,
}: {
  nombre: string
  profesion: string
  tareas: string[]
  result: { horasLost: number; moneyWeek: number; moneyMonth: number; moneyYear: number }
  onRestart: () => void
}) {
  return (
    <div className="py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: G }}>Tu resultado personal</span>
      </motion.div>

      {/* Main result card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border p-7 mb-6"
        style={{ borderColor: G, background: 'rgba(0,255,133,0.03)' }}
      >
        {/* Quote-style headline */}
        <p className="text-[#888] text-sm mb-4 leading-relaxed">
          <span className="text-white font-semibold">{nombre}</span>, como {profesion}:
        </p>

        <div className="mb-6">
          <p className="text-[#888] text-sm leading-snug mb-1">Estás perdiendo</p>
          <p className="font-display font-bold leading-none mb-1" style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', color: G }}>
            {result.horasLost}h
          </p>
          <p className="text-[#CCCCCC] text-base leading-snug">
            esta semana en tareas que Claude haría en minutos.
          </p>
        </div>

        <div className="border-t border-[#1A1A1A] pt-5">
          <p className="text-[#888] text-sm mb-1">Eso equivale a</p>
          <p className="font-display font-bold text-4xl sm:text-5xl mb-1" style={{ color: '#FFFFFF' }}>
            ${result.moneyWeek.toLocaleString()} USD
          </p>
          <p className="text-[#888] text-sm">de tu tiempo — <strong className="text-white">esta semana</strong>.</p>
        </div>
      </motion.div>

      {/* Extrapolation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {[
          { period: 'Al mes', value: `$${result.moneyMonth.toLocaleString()} USD` },
          { period: 'Al año', value: `$${result.moneyYear.toLocaleString()} USD`, highlight: true },
        ].map(item => (
          <div
            key={item.period}
            className="rounded-xl border p-4 text-center"
            style={{ borderColor: item.highlight ? `${G}55` : '#1E1E1E', background: item.highlight ? `rgba(0,255,133,0.04)` : '#111' }}
          >
            <p className="text-[#555] text-xs mb-1">{item.period}</p>
            <p className="font-display font-bold text-lg sm:text-xl" style={{ color: item.highlight ? G : '#CCC' }}>{item.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Tasks summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
        className="rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] p-5 mb-8"
      >
        <p className="text-[#555] text-xs font-bold uppercase tracking-wider mb-3">Tareas donde pierdes más tiempo</p>
        <div className="flex flex-col gap-2">
          {tareas.map(t => (
            <div key={t} className="flex items-center gap-2 text-sm text-[#888]">
              <CheckIcon size={13} />
              <span>{t}</span>
            </div>
          ))}
        </div>
        <p className="text-[#444] text-xs mt-3 leading-relaxed">
          Cada una de estas tareas puede ser configurada como un Claude Project con tu ADN de negocio — y ejecutada en segundos en lugar de horas.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
        className="flex flex-col gap-3"
      >
        <Link
          href="/#precios"
          className="block text-center font-display font-bold px-8 py-5 rounded-full text-black text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,255,133,0.4)]"
          style={{ background: G }}
        >
          Ver cómo recuperar mis {result.horasLost} horas →
        </Link>
        <p className="text-center text-[#444] text-xs">
          Sin presión. Solo tu número y el primer paso concreto.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-[#141414] my-10" />

      {/* Mini pricing teaser */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <p className="text-[#555] text-xs font-bold uppercase tracking-wider mb-5 text-center">El primer paso es gratis</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { level: 'Nivel 1', label: 'Diagnóstico completo', price: 'GRATIS', href: '/diagnostico', featured: true },
            { level: 'Nivel 3', label: 'Kit ADN de negocio', price: 'USD 27', href: '/#precios', featured: false },
            { level: 'Nivel 5', label: 'Sistema MOJXAI completo', price: 'USD 497', href: '/#precios', featured: false },
          ].map(card => (
            <Link
              key={card.label}
              href={card.href}
              className="block rounded-xl border p-4 text-center transition-all hover:scale-[1.02]"
              style={{
                borderColor: card.featured ? G : '#1E1E1E',
                background: card.featured ? 'rgba(0,255,133,0.05)' : '#111',
              }}
            >
              <p className="text-[#555] text-[10px] uppercase tracking-widest mb-1">{card.level}</p>
              <p className="text-white text-xs font-semibold mb-2 leading-tight">{card.label}</p>
              <p className="font-display font-bold text-sm" style={{ color: card.featured ? G : '#CCC' }}>{card.price}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/#precios"
          className="block text-center text-sm font-semibold border border-[#222] rounded-full py-3 text-[#888] hover:text-white hover:border-[#333] transition-all"
        >
          Ver todos los planes →
        </Link>
      </motion.div>

      {/* Restart */}
      <div className="text-center mt-8">
        <button onClick={onRestart} className="text-[#333] text-xs hover:text-[#555] transition-colors">
          Recalcular con otros datos
        </button>
      </div>
    </div>
  )
}
