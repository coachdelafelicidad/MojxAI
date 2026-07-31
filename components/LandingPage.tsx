'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ── Brand ──────────────────────────────────────────────────────────────────
const G = '#00E5A0'

// ── Logo ───────────────────────────────────────────────────────────────────
function LogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="9" height="76" rx="2.5" fill="#C0C0C0"/>
      <rect x="10" y="12" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="10" y="79" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="45.5" y="19" width="9" height="62" rx="4.5" fill="#00E5A0"/>
      <rect x="81" y="12" width="9" height="76" rx="2.5" fill="#C0C0C0"/>
      <rect x="66" y="12" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="66" y="79" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
    </svg>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7" cy="7" r="7" fill="#00E5A0" fillOpacity="0.15" />
      <path d="M3.5 7L6 9.5L10.5 4.5" stroke="#00E5A0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1A1A1A] last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-medium text-[#CCCCCC] leading-snug">{q}</span>
        <span className={`text-[${G}] text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          style={{ color: G }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#666] pb-5 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SeatCalculator() {
  const [seats, setSeats] = useState(3)
  const MIN = 3
  const PRICE_PER_SEAT = 397
  const total = Math.max(seats, MIN) * PRICE_PER_SEAT

  return (
    <div className="rounded-2xl border border-[#1F1F1F] bg-[#121212]/80 backdrop-blur-md p-7 mt-6">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: G }}>
        Calculadora para Equipos
      </p>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setSeats(s => Math.max(1, s - 1))}
          className="w-10 h-10 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] text-white text-xl flex items-center justify-center hover:border-[#3A3A3A] transition-colors"
        >−</button>
        <div className="flex-1 text-center">
          <span className="font-display font-bold text-4xl text-white tabular-nums">{seats}</span>
          <span className="text-[#555] text-sm ml-2">seat{seats !== 1 ? 's' : ''}</span>
        </div>
        <button
          onClick={() => setSeats(s => Math.min(100, s + 1))}
          className="w-10 h-10 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] text-white text-xl flex items-center justify-center hover:border-[#3A3A3A] transition-colors"
        >+</button>
      </div>

      <input
        type="range" min={1} max={100} value={seats}
        onChange={e => setSeats(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none mb-6 cursor-pointer"
        style={{ background: `linear-gradient(to right, ${G} ${seats}%, #1F1F1F ${seats}%)` }}
      />

      <div className="flex items-baseline justify-between mb-6">
        <div>
          {seats < MIN && (
            <p className="text-amber-400 text-xs mb-1">Mínimo {MIN} seats</p>
          )}
          <p className="text-[#555] text-sm">Total (pago único)</p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-3xl text-white">
            ${(Math.max(seats, MIN) * PRICE_PER_SEAT).toLocaleString()}
          </p>
          <p className="text-[#555] text-xs">${PRICE_PER_SEAT} USD × {Math.max(seats, MIN)} seats</p>
        </div>
      </div>

      <a
        href={`mailto:hola@mojxai.com?subject=${encodeURIComponent(`MOJXAI Teams — ${Math.max(seats, MIN)} seats`)}&body=${encodeURIComponent(`Hola, quiero el Sistema Operativo MOJXAI para ${Math.max(seats, MIN)} seats. Total estimado: $${total.toLocaleString()} USD.`)}`}
        target="_blank" rel="noopener noreferrer"
        className="block text-center font-display font-bold py-4 rounded-full text-sm transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,229,160,0.3)]"
        style={{ background: G, color: 'black' }}
      >
        Quiero que me lo instalen → ({Math.max(seats, MIN)} seats)
      </a>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  const NAV_LINKS = [
    { label: 'Cómo funciona', id: 'solucion' },
    { label: 'Precios', id: 'precios' },
    { label: 'Equipo', id: 'equipo' },
    { label: 'Garantía', id: 'garantia' },
  ]

  const WHAT_IS_CARDS = [
    {
      title: 'Ya pagas por IA. La estás usando mal.',
      body: 'Pagas $20 USD al mes por ChatGPT o Claude Pro — pero la usas como un Google caro. Sigues perdiendo horas redactando correos, contratos, reportes, menús o logística diaria porque nadie la configuró con el contexto real de tu vida o tu negocio.',
    },
    {
      title: 'No te vendemos teoría. Lo instalamos por ti.',
      body: 'La competencia te vende 20 horas de videos o un PDF de "prompts mágicos" para que tú lo hagas. Nosotros entramos a tu cuenta, tomamos tus documentos, tu estilo de comunicación y tus procesos reales — y en 48 horas te dejamos asistentes de IA personalizados, listos con un clic.',
    },
    {
      title: 'No vendemos tecnología. Vendemos tiempo.',
      body: 'Automatizamos el 70% de tus tareas repetitivas. Si en 30 días tu sistema no te ahorra al menos 10 horas semanales, te devolvemos el 100% de tu dinero. Sin preguntas.',
    },
  ]

  const PROBLEM_CARDS = [
    'Te llenaste de PDFs y videos de "prompts mágicos" que nunca volviste a abrir.',
    'Sigues perdiendo 2 a 3 horas diarias en correos, propuestas, reportes o logística del hogar.',
    'Cada vez que intentas usar la IA, tardas más corrigiéndola que haciéndolo tú mismo.',
    'Pagas $20 USD/mes de suscripción para usarla solo como buscador de preguntas sencillas.',
  ]

  const STEPS = [
    { n: '01', title: 'Diagnóstico', desc: 'Mapeamos tus procesos e identificamos qué automatizar con tu perfil y tareas reales.' },
    { n: '02', title: 'ADN de negocio', desc: 'Destilamos tus documentos y vocabulario en el contexto que hace que tu IA te conozca de verdad.' },
    { n: '03', title: 'Instalación', desc: 'Entramos a tu cuenta de Claude o ChatGPT e instalamos los asistentes configurados con tu contexto.' },
    { n: '04', title: 'Entrega en 48h', desc: 'Recibes tu sistema funcionando con un manual rápido en video. Tu equipo puede usarlo desde el primer día.' },
  ]

  const FREE_FEATURES = [
    'Quiz rápido de 3 minutos',
    'Identifica tus 3 tareas con mayor potencial de automatización',
    'Sin tarjeta de crédito',
  ]

  const PRO_FEATURES = [
    'Instalación completa en tu Claude Pro en 48 horas',
    'Tus procesos, documentos y estilo de comunicación dentro',
    'Asistentes personalizados por profesión / rol',
    'Manual de uso rápido en video para ti o tu equipo',
    '30 días de soporte directo por correo',
    'Garantía 10/100: Si no ahorras al menos 10h/semana, te devolvemos el 100%',
  ]

  const HOGAR_FEATURES = [
    'Sistema ChatGPT personalizado para tu hogar',
    'Hasta 10 proyectos activos (menú, agenda, crianza…)',
    'Instalación en 48 horas',
    'Manual de uso paso a paso',
    'Garantía 10/100',
  ]

  const TEAMS_FEATURES = [
    'Todo lo del plan Individuos × cada seat',
    'ADN de empresa compartido entre todos los roles',
    'Manuales específicos por puesto',
    'Onboarding grupal en vivo',
    'Soporte prioritario',
  ]

  const TEAM = [
    {
      name: 'Ana Osorno',
      role: 'CEO & Chief AI Strategist',
      bio: 'AI Trainer Oficial en Nas.com (350K+ emprendedores). Fundadora del Osorno Impact Group. Especialista en instalar sistemas de IA en negocios reales.',
      tags: ['Nas.com AI Trainer', 'OIG Founder', 'AI Strategist'],
    },
    {
      name: 'Matías Mojica',
      role: 'CTO & Systems Architect',
      bio: 'Diseña la arquitectura técnica e instala los asistentes personalizados directamente en tu cuenta de Claude o ChatGPT.',
      tags: ['AI Systems Builder', 'Systems Architect'],
    },
  ]

  const FAQS = [
    {
      q: '¿Necesito saber programar o tener conocimientos técnicos?',
      a: 'No. Nosotros lo hacemos todo. Solo necesitas tu cuenta de Claude o ChatGPT y 30 minutos para compartirnos tu contexto. A ti te llega el sistema listo para usar.',
    },
    {
      q: '¿En cuánto tiempo recibo mi sistema?',
      a: 'La instalación completa toma 48 horas hábiles desde que nos compartes tu información. En casos simples, puede estar listo en 24 horas.',
    },
    {
      q: '¿Necesito tener Claude Pro o ChatGPT Plus?',
      a: 'Sí. La licencia de Claude Pro cuesta $20 USD/mes directamente con Anthropic. Nosotros instalamos el sistema en tu cuenta — tú mantienes el acceso directo y la propiedad total del contenido.',
    },
    {
      q: '¿Qué pasa si no me gusta el resultado?',
      a: 'Aplicamos la Garantía 10/100: si en 30 días no puedes demostrar un ahorro de al menos 10 horas semanales, te devolvemos el 100% de tu dinero. Sin preguntas, sin trámites.',
    },
    {
      q: '¿El sistema es mío para siempre?',
      a: 'Sí. Todo lo que instalamos queda dentro de tu cuenta. Es 100% tuyo y puedes operarlo sin nosotros desde el día 1. No hay licencias recurrentes ni dependencia de MOJXAI.',
    },
    {
      q: '¿Pueden instalar sistemas para todo mi equipo?',
      a: 'Sí. Ofrecemos planes para equipos desde 3 seats. Cada miembro recibe su propio contexto personalizado. El precio es $397 USD por seat (pago único).',
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">

      {/* ══ NAVBAR ══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1A1A]' : 'bg-transparent'}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <LogoIcon size={28} />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-tight">
                <span className="text-white">Mo</span><span style={{ color: '#00E5A0' }}>j</span><span className="text-white">xAI</span>
              </span>
              <span className="text-[#555] text-[9px] font-semibold tracking-[0.25em] uppercase mt-0.5">Systems</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-[#666] hover:text-white text-sm transition-colors">
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/diagnostico"
              className="hidden sm:inline-flex items-center font-bold text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ background: G, color: 'black' }}
            >
              Diagnóstico gratis
            </Link>
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden p-1.5 text-[#666] hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                {menuOpen
                  ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  : <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#080808] border-t border-[#1A1A1A] overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map(l => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="text-[#888] hover:text-white text-base text-left transition-colors">
                    {l.label}
                  </button>
                ))}
                <Link href="/diagnostico" onClick={() => setMenuOpen(false)}
                  className="text-black font-bold text-sm px-5 py-3 rounded-full text-center mt-2"
                  style={{ background: G }}>
                  Diagnóstico gratis
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══ S1: HERO ══ */}
      <section id="inicio" className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden pt-16">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover z-0" style={{ opacity: 0.2 }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Ambient glow */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,229,160,0.05) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]/95 z-10" />

        <div className="relative z-20 flex flex-col items-center w-full max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5">
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: G }}>
              MOJXAI · Sistema de IA Personalizado
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-6 tracking-tight"
          >
            ¿Ya intentaste la IA por tu cuenta y sigues usando ChatGPT o Claude como un{' '}
            <span style={{ color: G }}>Google caro?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-[#999] text-base sm:text-lg mb-10 max-w-xl leading-relaxed"
          >
            No necesitas estudiar más. Nosotros entramos a tu cuenta, la configuramos con tus propias necesidades y procesos reales, y te la dejamos lista para sacar el máximo provecho a la IA en 48 horas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
            className="flex flex-col items-center gap-3 mb-12"
          >
            <Link
              href="/diagnostico"
              className="relative inline-flex items-center gap-2 font-display font-bold px-10 py-5 rounded-full text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,160,0.4)] overflow-hidden group"
              style={{ background: G }}
            >
              <span className="relative z-10">Calcular mi ahorro de tiempo →</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>
            <p className="text-[#444] text-sm">Sin registro · Sin tarjeta · Resultado en 3 minutos</p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="w-full bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl px-6 py-5 grid grid-cols-3 gap-4"
          >
            {[
              { v: '⚡ 48h', l: 'Instalación garantizada' },
              { v: '📈 70%', l: 'Automatiza tus tareas' },
              { v: '🛡️ 100%', l: 'Garantía de reembolso' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display font-bold text-base sm:text-lg text-white">{s.v}</span>
                <span className="text-[#555] text-xs mt-1 text-center leading-tight">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ S2: ¿QUÉ ES MOJXAI EN SERIO? ══ */}
      <section className="px-6 py-24 bg-[#030303]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>¿Qué es MOJXAI, en serio?</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-2xl mx-auto">
              Ya pagas por IA.{' '}
              <span style={{ color: G }}>Nosotros hacemos que por fin te sirva.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WHAT_IS_CARDS.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-7 hover:border-[#00E5A0]/20 hover:shadow-[0_0_30px_rgba(0,229,160,0.06)] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] flex items-center justify-center mb-5 group-hover:border-[#00E5A0]/30 transition-colors">
                  <span className="font-display font-bold text-xs" style={{ color: G }}>0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{card.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-12 font-display font-bold text-xl sm:text-2xl"
            style={{ color: G }}
          >
            Ya pagas por IA. Nosotros hacemos que por fin te sirva.
          </motion.p>
        </div>
      </section>

      {/* ══ S3: EL PROBLEMA ══ */}
      <section id="problema" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>El Problema</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-2xl mx-auto">
              El problema no eres tú. Es que nadie configuró la IA para{' '}
              <span style={{ color: G }}>TU trabajo diario.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROBLEM_CARDS.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-6 hover:border-[#2A2A2A] transition-colors"
              >
                <span className="text-2xl mb-3 block">❌</span>
                <p className="text-[#CCCCCC] text-sm leading-relaxed">{card}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S4: LA SOLUCIÓN — EL PROCESO ══ */}
      <section id="solucion" className="px-6 py-24 bg-[#030303]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>El Proceso Done-For-You</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl">
              Nosotros no te vendemos teoría.{' '}
              <span style={{ color: G }}>Lo instalamos POR TI.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {STEPS.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-6 hover:border-[#00E5A0]/15 hover:shadow-[0_0_20px_rgba(0,229,160,0.04)] transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl border flex items-center justify-center mb-4 text-xs font-bold font-display"
                  style={{ borderColor: `${G}40`, background: `${G}08`, color: G }}>
                  {step.n}
                </div>
                <p className="font-display font-bold text-sm text-white mb-2 leading-snug">{step.title}</p>
                <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#0A0A0A] border border-[#1F1F1F] items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-[#444] text-sm">
            El sistema es 100% tuyo. Puedes operar sin nosotros desde el día 1.
          </motion.p>
        </div>
      </section>

      {/* ══ S5: PRECIOS ══ */}
      <section id="precios" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>Precios</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl">Simple. Sin sorpresas.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">

            {/* Card 1: Gratis */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-[#121212]/80 backdrop-blur-md rounded-2xl border border-[#1F1F1F] p-6 flex flex-col hover:border-[#2A2A2A] transition-colors"
            >
              <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest mb-2">Empieza aquí</p>
              <p className="font-display font-bold text-base text-white mb-2">Diagnóstico</p>
              <p className="font-display font-bold text-3xl mb-1" style={{ color: G }}>GRATIS</p>
              <p className="text-[#444] text-xs mb-5">Sin tarjeta · 5 min</p>
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#CCCCCC]"><CheckIcon />{f}</li>
                ))}
              </ul>
              <Link href="/diagnostico"
                className="block text-center font-bold py-3 rounded-full text-sm transition-all hover:scale-[1.02]"
                style={{ background: G, color: 'black' }}>
                Hacer Diagnóstico
              </Link>
            </motion.div>

            {/* Card 2: Hogar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="bg-[#121212]/80 backdrop-blur-md rounded-2xl border border-[#1F1F1F] p-6 flex flex-col hover:border-[#2A2A2A] transition-colors"
            >
              <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest mb-2">Hogar · Crianza</p>
              <p className="font-display font-bold text-base text-white mb-2">Sistema MOJXAI · Hogar y Crianza</p>
              <div className="mb-1">
                <span className="font-display font-bold text-3xl text-white">$197</span>
                <span className="text-sm font-normal text-[#666] ml-1">USD</span>
              </div>
              <p className="text-[#444] text-xs mb-2">Pago único</p>
              <p className="text-[#555] text-xs mb-5 leading-relaxed">Asistentes de IA instalados en tu cuenta para gestión familiar, logística escolar, menús y organización del hogar.</p>
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {HOGAR_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#CCCCCC]"><CheckIcon />{f}</li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/5kQbJ0fXAb8Bdni9zHeME03"
                className="block text-center font-bold py-3 rounded-full text-sm transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,229,160,0.2)]"
                style={{ background: G, color: 'black' }}>
                Contratar Hogar →
              </a>
            </motion.div>

            {/* Card 3: Individuos — Featured */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="relative bg-[#061410] rounded-2xl border p-6 flex flex-col"
              style={{ borderColor: G, boxShadow: `0 0 40px rgba(0,229,160,0.08)` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-black text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ background: G }}>
                  ✦ MÁS POPULAR
                </span>
              </div>
              <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest mb-2">Profesionistas</p>
              <p className="font-display font-bold text-base text-white mb-2">Sistema MOJXAI Individual</p>
              <div className="mb-1">
                <span className="font-display font-bold text-3xl text-white">$497</span>
                <span className="text-sm font-normal text-[#666] ml-1">USD</span>
              </div>
              <p className="text-[#444] text-xs mb-5">Pago único · 1 seat</p>
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {PRO_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#CCCCCC]"><CheckIcon />{f}</li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/dRm14m4eSfoRbfa6nveME04"
                className="block text-center font-display font-bold py-3 rounded-full text-sm transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,229,160,0.3)]"
                style={{ background: G, color: 'black' }}>
                Quiero que me lo instalen →
              </a>
            </motion.div>

            {/* Card 4: Equipos */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
              className="bg-[#121212]/80 backdrop-blur-md rounded-2xl border border-[#1F1F1F] p-6 flex flex-col hover:border-[#2A2A2A] transition-colors"
            >
              <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest mb-2">Empresas</p>
              <p className="font-display font-bold text-base text-white mb-2">Sistema MOJXAI Equipos</p>
              <div className="mb-1">
                <span className="font-display font-bold text-3xl text-white">$397</span>
                <span className="text-sm font-normal text-[#666] ml-1">USD/seat</span>
              </div>
              <p className="text-[#444] text-xs mb-5">Mínimo 3 seats · Pago único</p>
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {TEAMS_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#CCCCCC]"><CheckIcon />{f}</li>
                ))}
              </ul>
              <a href="mailto:hola@mojxai.com?subject=MOJXAI%20Equipos&body=Hola%2C%20quiero%20el%20sistema%20para%20mi%20equipo."
                className="block text-center font-bold py-3 rounded-full text-sm border border-[#2A2A2A] text-[#CCCCCC] transition-all hover:border-[#00E5A0] hover:text-[#00E5A0]">
                Cotizar para mi equipo →
              </a>
            </motion.div>

          </div>

          {/* Seat Calculator */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <SeatCalculator />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-[#333] text-xs mt-8 max-w-md mx-auto leading-relaxed">
            MOJXAI configura el sistema. La licencia de Claude Pro cuesta $20 USD/mes por usuario — directamente con Anthropic. Sin costos ocultos.
          </motion.p>
        </div>
      </section>

      {/* ══ S6: PRUEBA SOCIAL ══ */}
      <section className="px-6 py-20 bg-[#030303]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>Prueba Social</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">Resultados reales. Sin editarlos.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[
              {
                org: 'GO', role: 'Grupo de Operaciones Múltiples',
                text: '10 unidades de negocio distintas automatizadas en menos de 48 horas. Sistema funcionando sin intervención técnica desde el día 1.',
                tags: ['10 unidades', '< 48 horas'],
              },
              {
                org: 'CF', role: 'Consorcio Financiero y Corporativo',
                text: 'Departamento financiero con asistentes personalizados para contratos, reportes y comunicaciones. Reducción del 65% en tiempo operativo.',
                tags: ['Finanzas', '65% menos tiempo'],
              },
            ].map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-6 hover:border-[#2A2A2A] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                    style={{ borderColor: `${G}40`, background: `${G}08`, color: G }}>
                    {c.org}
                  </div>
                  <p className="text-[#888] text-xs">{c.role}</p>
                </div>
                <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">{c.text}</p>
                <div className="flex gap-2">
                  {c.tags.map(t => (
                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5"
                      style={{ color: G, borderColor: `${G}33` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nas.com validation */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#121212]/80 backdrop-blur-md border rounded-2xl p-7"
            style={{ borderColor: `${G}30` }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border mb-3 inline-block"
                  style={{ color: G, borderColor: `${G}40` }}>
                  Validación Nas.com
                </span>
                <p className="text-[#666] text-sm leading-relaxed max-w-xs">
                  No aprendimos IA en YouTube. La instalamos profesionalmente — y la comunidad más grande de emprendedores de Latinoamérica lo avala.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 flex-shrink-0">
                {[{ v: '350K+', l: 'emprendedores' }, { v: '259K', l: 'negocios digitales' }, { v: '150+', l: 'países' }].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-display font-bold text-xl" style={{ color: G }}>{s.v}</p>
                    <p className="text-[#444] text-[10px] mt-1 leading-tight">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ S7: EQUIPO ══ */}
      <section id="equipo" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: G }}>Quiénes Somos</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-3">
              Gente real resolviendo problemas reales
            </h2>
            <p className="text-[#555] text-sm max-w-lg mx-auto">
              Probamos el sistema en nuestro propio ecosistema antes de ofrecértelo a ti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {TEAM.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-7 hover:border-[#2A2A2A] transition-colors"
              >
                <div className="w-14 h-14 rounded-full border flex items-center justify-center mb-5 font-display font-bold text-xl"
                  style={{ borderColor: `${G}33`, background: `${G}08`, color: G }}>
                  {m.name.charAt(0)}
                </div>
                <p className="font-display font-bold text-white text-base mb-0.5">{m.name}</p>
                <p className="text-xs font-semibold mb-3" style={{ color: G }}>{m.role}</p>
                <p className="text-[#666] text-sm leading-relaxed mb-4">{m.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5"
                      style={{ color: G, borderColor: `${G}33` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S8: GARANTÍA ══ */}
      <section id="garantia" className="px-6 py-24 bg-[#030303]">
        <div className="max-w-2xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border p-8 text-center mb-16"
            style={{ borderColor: G, background: `rgba(0,229,160,0.03)`, boxShadow: `0 0 50px rgba(0,229,160,0.06)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#00E5A0]/40 to-transparent" />
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: G }}>
              Garantía Iron-Clad 10/100
            </p>
            <p className="font-display font-bold text-xl sm:text-2xl text-white mb-5">
              Garantía de Resultado — 100% o nada
            </p>
            <p className="text-[#666] text-sm leading-relaxed mb-7 max-w-md mx-auto">
              Si en 30 días tu equipo o tú no pueden demostrar un ahorro de al menos 10 horas semanales, te devolvemos el 100% de tu dinero. Sin preguntas, sin trámites, sin letras pequeñas.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Sin burocracia', 'Sin letras pequeñas', 'Reembolso en 48 horas'].map(b => (
                <span key={b} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ color: G, borderColor: `${G}40` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-8 text-center" style={{ color: G }}>
              Preguntas Frecuentes
            </p>
            <div className="bg-[#121212]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl px-6">
              {FAQS.map(faq => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4">
              ¿Cuánto te está costando cada semana no tener esto?
            </h2>
            <p className="text-[#666] text-base mb-10">
              Empieza con el diagnóstico gratuito — 3 minutos, sin tarjeta, resultado inmediato.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/diagnostico"
                className="inline-flex items-center gap-2 font-display font-bold px-8 py-4 rounded-full text-black text-base transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(0,229,160,0.35)]"
                style={{ background: G }}>
                Hacer mi diagnóstico gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
              <a href="mailto:hola@mojxai.com"
                className="inline-flex items-center gap-2 font-display font-bold px-8 py-4 rounded-full text-white text-base border border-[#2A2A2A] transition-all hover:border-[#3A3A3A] hover:scale-105">
                Escribir al equipo
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-[#111] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-2.5">
              <LogoIcon size={24} />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base tracking-tight">
                  <span className="text-white">Mo</span><span style={{ color: '#00E5A0' }}>j</span><span className="text-white">xAI</span>
                </span>
                <span className="text-[#333] text-[9px] font-semibold tracking-[0.25em] uppercase mt-0.5">Systems · mojxai.com · 2026</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/diagnostico" className="text-[#444] text-sm hover:text-white transition-colors">Diagnóstico</Link>
              <Link href="/calculadora" className="text-[#444] text-sm hover:text-white transition-colors">Calculadora</Link>
              <button onClick={() => scrollTo('precios')} className="text-[#444] text-sm hover:text-white transition-colors">Precios</button>
              <a href="mailto:hola@mojxai.com" className="text-[#444] text-sm hover:text-white transition-colors">Contacto</a>
            </div>
            <a href="mailto:hola@mojxai.com"
              className="w-9 h-9 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#444] hover:border-[#2A2A2A] hover:text-white transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
            </a>
          </div>
          <div className="border-t border-[#0D0D0D] pt-6 text-center">
            <p className="text-[#222] text-xs">© 2026 MOJXAI · Osorno Impact Group · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
