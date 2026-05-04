'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Language, Profile, DiagnosticState } from '@/lib/types'
import { calculate, getIncomeOptions } from '@/lib/calculations'
import { LanguageToggle } from './LanguageToggle'
import { ProgressBar } from './ProgressBar'
import { HeroScreen } from './screens/HeroScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { TasksScreen } from './screens/TasksScreen'
import { QuestionsScreen } from './screens/QuestionsScreen'
import { ResultScreen } from './screens/ResultScreen'

const STORAGE_KEY = 'mojxai_diagnostic'

const defaultState: DiagnosticState = {
  step: 0,
  language: 'es',
  profile: null,
  selectedTasks: [],
  hoursPerWeek: '',
  monthlyIncome: '',
}

const PROGRESS = [0, 20, 40, 60, 80, 100]

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'es'
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('en') ? 'en' : 'es'
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
    if (state.step > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  function goTo(step: number) {
    setDirection(step > state.step ? 1 : -1)
    setState(prev => ({ ...prev, step }))
  }

  function setLanguage(language: Language) {
    setState(prev => {
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

  const result =
    state.step === 5 && state.hoursPerWeek && state.monthlyIncome
      ? calculate(state.selectedTasks, state.hoursPerWeek, Number(state.monthlyIncome), state.language)
      : null

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <ProgressBar progress={PROGRESS[state.step] ?? 0} />
      <LanguageToggle language={state.language} onChange={setLanguage} />

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
          {state.step === 0 && (
            <HeroScreen language={state.language} onStart={() => goTo(1)} />
          )}
          {state.step === 1 && (
            <ProfileScreen
              language={state.language}
              selected={state.profile}
              onSelect={(p: Profile) => setState(prev => ({ ...prev, profile: p }))}
              onContinue={() => goTo(2)}
              onBack={() => goTo(0)}
            />
          )}
          {state.step === 2 && (
            <TasksScreen
              language={state.language}
              selectedTasks={state.selectedTasks}
              onToggleTask={toggleTask}
              onContinue={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {state.step === 3 && (
            <QuestionsScreen
              language={state.language}
              hoursPerWeek={state.hoursPerWeek}
              monthlyIncome={state.monthlyIncome}
              onHoursChange={(h) => setState(prev => ({ ...prev, hoursPerWeek: h }))}
              onIncomeChange={(i) => setState(prev => ({ ...prev, monthlyIncome: i }))}
              onContinue={() => goTo(5)}
              onBack={() => goTo(2)}
            />
          )}
          {state.step === 5 && result !== null && (
            <ResultScreen
              language={state.language}
              result={result}
              onShare={handleShare}
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
