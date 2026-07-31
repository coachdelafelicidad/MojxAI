'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="19" width="7" height="62" rx="2" fill="#C8C8C8"/>
      <rect x="11" y="19" width="19" height="7" rx="2" fill="#C8C8C8"/>
      <rect x="11" y="74" width="19" height="7" rx="2" fill="#C8C8C8"/>
      <rect x="46.5" y="25" width="7" height="50" rx="3.5" fill="#00E5A0"/>
      <rect x="82" y="19" width="7" height="62" rx="2" fill="#C8C8C8"/>
      <rect x="70" y="19" width="19" height="7" rx="2" fill="#C8C8C8"/>
      <rect x="70" y="74" width="19" height="7" rx="2" fill="#C8C8C8"/>
    </svg>
  )
}
import { Language, Profile, DiagnosticState, isHomeProfile } from '@/lib/types'
import { calculate, getIncomeOptions } from '@/lib/calculations'
import { LanguageToggle } from './LanguageToggle'
import { ProgressBar } from './ProgressBar'
import { ProfileScreen } from './screens/ProfileScreen'
import { TasksScreen } from './screens/TasksScreen'
import { QuestionsScreen } from './screens/QuestionsScreen'
import { ResultScreen } from './screens/ResultScreen'

const STORAGE_KEY = 'mojxai_diagnostic'

const defaultState: DiagnosticState = {
  step: 1,
  language: 'es',
  profile: null,
  selectedTasks: [],
  hoursPerWeek: '',
  monthlyIncome: '',
}

const PROGRESS_MAP: Record<number, number> = { 0: 0, 1: 25, 2: 50, 3: 75, 5: 100 }

function detectLanguage(): Language {
  return 'es'
}

export function DiagnosticTool() {
  const [state, setState] = useState<DiagnosticState>(defaultState)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<DiagnosticState>
        if (parsed.step === 5) {
          setState({ ...defaultState, ...parsed, language: detectLanguage() })
          return
        }
      } catch {
        // ignore parse errors
      }
    }
    setState(prev => ({ ...prev, language: detectLanguage() }))
  }, [])

  useEffect(() => {
    if (state.step >= 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  function goTo(step: number) {
    setDirection(step > state.step ? 1 : -1)
    setState(prev => ({ ...prev, step }))
  }

  function setLanguage(language: Language) {
    setState(prev => {
      // If user chose "prefer not to say", keep that choice across language switches
      if (prev.monthlyIncome === 'prefer_not') return { ...prev, language }
      const incomeOptions = getIncomeOptions(language)
      const currentIncome = parseInt(prev.monthlyIncome || '0')
      const esOptions = getIncomeOptions('es')
      const enOptions = getIncomeOptions('en')
      const allOptions = [...esOptions, ...enOptions]
      const idx = allOptions.findIndex(o => o.value === currentIncome)
      const newIncomeValue =
        idx !== -1 && idx < 4
          ? getIncomeOptions(language)[idx % 4]?.value
          : incomeOptions.find(o => o.value === currentIncome)?.value

      return {
        ...prev,
        language,
        monthlyIncome: newIncomeValue ? String(newIncomeValue) : prev.monthlyIncome,
      }
    })
  }

  function toggleTask(id: string) {
    setState(prev => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(id)
        ? prev.selectedTasks.filter(t => t !== id)
        : [...prev.selectedTasks, id],
    }))
  }

  function handleShare() {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', state.language)
    url.searchParams.set('result', String(result?.hoursRecoverable ?? 0))
    url.searchParams.set('money', String(result?.moneyLostPerMonth ?? 0))
    if (navigator.share) {
      navigator.share({ title: 'Mi diagnóstico MojxAI', url: url.toString() }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url.toString()).catch(() => {})
    }
  }

  // "prefer_not" → use mid-range income so calculation still works
  const resolvedIncome = state.monthlyIncome === 'prefer_not'
    ? (state.language === 'es' ? 35000 : 2750)
    : Number(state.monthlyIncome)

  const result =
    state.step === 5 && state.hoursPerWeek
      ? calculate(state.selectedTasks, state.hoursPerWeek, resolvedIncome, state.language, state.profile)
      : null

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">

      {/* ── Header fijo unificado — visible en TODAS las pantallas ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 h-12"
        style={{
          background: 'rgba(5,5,5,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo — enlace directo a la página principal */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200"
        >
          <LogoIcon size={18} />
          <span
            className="font-display font-black text-white"
            style={{ fontSize: '11px', letterSpacing: '0.2em' }}
          >
            MOJXAI
          </span>
        </Link>

        {/* Toggle de idioma */}
        <LanguageToggle language={state.language} onChange={setLanguage} />
      </header>

      {/* Barra de progreso justo bajo el header */}
      <div className="fixed top-12 left-0 right-0 z-[99]">
        <ProgressBar progress={PROGRESS_MAP[state.step] ?? 0} />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={state.step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen"
        >
          {state.step === 1 && (
            <ProfileScreen
              language={state.language}
              selected={state.profile}
              onSelect={(p: Profile) => setState(prev => ({
                ...prev,
                profile: p,
                selectedTasks: prev.profile !== p ? [] : prev.selectedTasks,
              }))}
              onContinue={() => goTo(2)}
              onBack={() => { window.location.href = '/' }}
            />
          )}
          {state.step === 2 && (
            <TasksScreen
              language={state.language}
              profile={state.profile}
              selectedTasks={state.selectedTasks}
              onToggleTask={toggleTask}
              onContinue={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {state.step === 3 && (
            <QuestionsScreen
              language={state.language}
              profile={state.profile}
              hoursPerWeek={state.hoursPerWeek}
              monthlyIncome={state.monthlyIncome}
              onHoursChange={(h) => setState(prev => ({ ...prev, hoursPerWeek: h }))}
              onIncomeChange={(i) => setState(prev => ({ ...prev, monthlyIncome: i }))}
              onContinue={() => {
                // For home profiles, auto-set a placeholder income (unused in calc)
                if (isHomeProfile(state.profile) && !state.monthlyIncome) {
                  setState(prev => ({ ...prev, monthlyIncome: '1', step: 5 }))
                  setDirection(1)
                } else {
                  goTo(5)
                }
              }}
              onBack={() => goTo(2)}
            />
          )}
          {state.step === 5 && result !== null && (
            <ResultScreen
              language={state.language}
              profile={state.profile}
              result={result}
              onShare={handleShare}
              onBack={() => goTo(3)}
              onRestart={() => {
                localStorage.removeItem(STORAGE_KEY)
                setState({ ...defaultState, language: state.language })
              }}
            />
          )}
          {state.step === 5 && result === null && (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-[#888888]">Loading results...</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
