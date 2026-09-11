'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Language, Profile, DiagnosticState, isHomeProfile } from '@/lib/types'
import { calculate, getIncomeOptions, midpointHours } from '@/lib/calculations'
import { DiagnosticChrome } from './DiagnosticChrome'
import { ProfileScreen } from './screens/ProfileScreen'
import { TasksScreen } from './screens/TasksScreen'
import { QuestionsScreen } from './screens/QuestionsScreen'
import { ResultScreen } from './screens/ResultScreen'
import {
  DIAGNOSTIC_STORAGE_KEY,
  defaultDiagnosticState,
  loadDiagnosticState,
  saveDiagnosticState,
} from '@/lib/diagnostic-storage'

const PROGRESS_MAP: Record<number, number> = { 0: 0, 1: 25, 2: 50, 3: 75, 5: 100 }

export function DiagnosticTool() {
  const router = useRouter()
  const [state, setState] = useState<DiagnosticState>(defaultDiagnosticState)
  const [direction, setDirection] = useState(1)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadDiagnosticState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveDiagnosticState(state)
  }, [state, hydrated])

  function goTo(step: number) {
    setDirection(step > state.step ? 1 : -1)
    setState(prev => ({ ...prev, step }))
  }

  function setLanguage(language: Language) {
    setState(prev => {
      if (prev.monthlyIncome === 'prefer_not') return { ...prev, language }
      const currentIncome = parseInt(prev.monthlyIncome || '0')
      const esOptions = getIncomeOptions('es')
      const enOptions = getIncomeOptions('en')
      const allOptions = [...esOptions, ...enOptions]
      const idx = allOptions.findIndex(o => o.value === currentIncome)
      const newIncomeValue =
        idx !== -1 && idx < 4
          ? getIncomeOptions(language)[idx % 4]?.value
          : getIncomeOptions(language).find(o => o.value === currentIncome)?.value

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

  const resolvedIncome = state.monthlyIncome === 'prefer_not'
    ? (state.language === 'es' ? 35000 : 2750)
    : Number(state.monthlyIncome)

  const hoursLostOverride = state.customLostHours
    ? midpointHours(state.customLostHours)
    : undefined

  const result =
    state.step === 5 && state.hoursPerWeek
      ? calculate(
          state.selectedTasks,
          state.hoursPerWeek,
          resolvedIncome,
          state.language,
          state.profile,
          hoursLostOverride,
        )
      : null

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <DiagnosticChrome
      language={state.language}
      onLanguageChange={setLanguage}
      progress={PROGRESS_MAP[state.step] ?? 0}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={hydrated ? state.step : 'boot'}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen"
        >
          {!hydrated ? null : state.step === 1 && (
            <ProfileScreen
              language={state.language}
              selected={state.profile}
              onSelect={(p: Profile) => setState(prev => ({
                ...prev,
                profile: p,
                selectedTasks: prev.profile !== p ? [] : prev.selectedTasks,
                customProfession: '',
                customTasksNote: '',
                customLostHours: '',
              }))}
              onContinue={() => goTo(2)}
              onBack={() => { window.location.href = '/' }}
            />
          )}
          {hydrated && state.step === 2 && (
            <TasksScreen
              language={state.language}
              profile={state.profile}
              selectedTasks={state.selectedTasks}
              onToggleTask={toggleTask}
              onContinue={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {hydrated && state.step === 3 && (
            <QuestionsScreen
              language={state.language}
              profile={state.profile}
              hoursPerWeek={state.hoursPerWeek}
              monthlyIncome={state.monthlyIncome}
              onHoursChange={(h) => setState(prev => ({ ...prev, hoursPerWeek: h }))}
              onIncomeChange={(i) => setState(prev => ({ ...prev, monthlyIncome: i }))}
              onContinue={() => {
                if (isHomeProfile(state.profile) && !state.monthlyIncome) {
                  setState(prev => ({ ...prev, monthlyIncome: '1', step: 5 }))
                  setDirection(1)
                } else {
                  goTo(5)
                }
              }}
              onBack={() => {
                if (state.customLostHours) router.push('/diagnostico/otro-perfil')
                else goTo(2)
              }}
            />
          )}
          {hydrated && state.step === 5 && result !== null && (
            <ResultScreen
              language={state.language}
              profile={state.profile}
              result={result}
              customLead={
                state.customLostHours
                  ? {
                      profession: state.customProfession,
                      tasksNote: state.customTasksNote,
                      lostHours: state.customLostHours,
                      hoursRecoverable: result.hoursRecoverable,
                      moneyLostPerMonth: result.moneyLostPerMonth,
                    }
                  : null
              }
              onShare={handleShare}
              onBack={() => goTo(3)}
              onRestart={() => {
                localStorage.removeItem(DIAGNOSTIC_STORAGE_KEY)
                setState({ ...defaultDiagnosticState, language: state.language })
              }}
            />
          )}
          {hydrated && state.step === 5 && result === null && (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-[#888888]">Loading results...</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </DiagnosticChrome>
  )
}
