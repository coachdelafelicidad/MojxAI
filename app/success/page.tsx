'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { TASKS_BY_PROFILE } from '@/lib/tasks'
import type { Profile } from '@/lib/types'

const PROFILE_NAMES: Record<string, string> = {
  homemaker:  'Ama de Casa / Hogar',
  parenting:  'Crianza / Mamá · Papá',
  lawyer:     'Abogado / Jurídico',
  doctor:     'Médico / Profesional de Salud',
  accountant: 'Contador / Financiero',
  consultant: 'Consultor / Coach',
  architect:  'Arquitecto / Diseñador',
  business:   'Dueño de Negocio / Emprendedor',
}

const PLAN_NAMES: Record<string, string> = {
  hogar:    'MojxAI HOGAR — $180 USD',
  starter:  'MojxAI STARTER — $497 USD',
  business: 'MojxAI FULL BUSINESS — $397/seat',
}

function SuccessContent() {
  const params = useSearchParams()
  const plan     = params.get('plan')     ?? 'starter'
  const lang     = params.get('lang')     ?? 'es'

  const [profile, setProfile]       = useState<string>('')
  const [tasks, setTasks]           = useState<{ emoji: string; name: string }[]>([])
  const [emailReady, setEmailReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mojxai_diagnostic')
      if (saved) {
        const state = JSON.parse(saved)
        const prof = state.profile as Profile | null
        if (prof) setProfile(prof)
        if (state.selectedTasks?.length && prof) {
          const allTasks = TASKS_BY_PROFILE[prof] ?? []
          const taskList = (state.selectedTasks as string[])
            .map((id: string) => {
              const found = allTasks.find(t => t.id === id)
              return found ? { emoji: found.emoji, name: found.nameEs } : null
            })
            .filter(Boolean) as { emoji: string; name: string }[]
          setTasks(taskList)
        }
      }
    } catch {
      // ignore
    }
    setEmailReady(true)
  }, [])

  const profileName = PROFILE_NAMES[profile] ?? profile
  const planName    = PLAN_NAMES[plan]        ?? plan

  // Build mailto body
  const subject = `Solicitud de configuración MojxAI — ${profileName}`
  const body = [
    'Hola, acabo de realizar mi pago en MojxAI y estoy listo/a para comenzar.',
    '',
    `PLAN ADQUIRIDO: ${planName}`,
    `PERFIL SELECCIONADO: ${profileName}`,
    '',
    tasks.length > 0
      ? `TAREAS QUE QUIERO AUTOMATIZAR:\n${tasks.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}`
      : 'TAREAS QUE QUIERO AUTOMATIZAR: [describe aquí las tareas más importantes]',
    '',
    'INSTRUCCIÓN: Por favor configuren mi sistema de IA personalizado según mi perfil.',
    '',
    '¿Cuáles son los siguientes pasos?',
  ].join('\n')

  const mailtoHref = `mailto:mojxai.app@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">

        {/* Shield icon */}
        <div className="w-20 h-20 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"
              stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <span className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase">MojxAI</span>

        <h1 className="font-bold text-3xl sm:text-4xl mt-4 mb-4 text-white leading-tight">
          {lang === 'es' ? '¡Pago recibido!' : 'Payment received!'}
        </h1>

        <p className="text-[#888888] text-base leading-relaxed mb-8">
          {lang === 'es'
            ? <>Gracias por confiar en MojxAI. Haz clic abajo para enviarnos tu solicitud de configuración — tu sistema estará listo en <span className="text-white font-semibold">48h</span>.</>
            : <>Thank you for trusting MojxAI. Click below to send us your setup request — your system will be ready in <span className="text-white font-semibold">48h</span>.</>
          }
        </p>

        {/* Next steps */}
        <div className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-5 mb-8 text-left">
          <p className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-3">
            {lang === 'es' ? '¿Qué sigue?' : 'What\'s next?'}
          </p>
          {(lang === 'es' ? [
            '📧 Envía tu solicitud de configuración con el botón de abajo',
            '📋 Nosotros preparamos tu sistema personalizado',
            '🔑 Te pedimos acceso a Claude o ChatGPT si aplica',
            '🚀 En 48h tienes tu sistema activo',
          ] : [
            '📧 Send your setup request using the button below',
            '📋 We prepare your personalized AI system',
            '🔑 We\'ll request access to Claude or ChatGPT if needed',
            '🚀 Your system is live in 48h',
          ]).map((step) => (
            <p key={step} className="text-[#CCCCCC] text-sm py-2 border-b border-[#1A1A1A] last:border-0">
              {step}
            </p>
          ))}
        </div>

        {/* Plan + profile badge */}
        {(profile || plan) && (
          <div className="bg-[#0A1A12] border border-[#00E5A0]/20 rounded-2xl p-4 mb-6 text-left">
            <p className="text-[#00E5A0] text-xs font-semibold uppercase tracking-wider mb-2">Tu compra</p>
            <p className="text-white text-sm font-semibold">{planName}</p>
            {profileName && <p className="text-[#888] text-xs mt-1">Perfil: {profileName}</p>}
          </div>
        )}

        {/* CTA — opens pre-filled email */}
        {emailReady && (
          <a
            href={mailtoHref}
            className="block w-full bg-[#00E5A0] text-black font-bold py-4 rounded-full text-base text-center mb-4 hover:scale-[1.02] transition-transform"
          >
            {lang === 'es' ? '📧 Enviar solicitud de configuración →' : '📧 Send setup request →'}
          </a>
        )}

        <Link
          href="/diagnostico"
          className="text-[#555] text-sm hover:text-[#888] transition-colors"
        >
          ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>

      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-[#888]">Cargando...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
