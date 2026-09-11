'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HoursOption, Language } from '@/lib/types'
import { t } from '@/lib/translations'
import { HoursRangePicker, HOURS_OPTIONS_PRO } from '@/components/HoursRangePicker'
import { DiagnosticChrome } from '@/components/DiagnosticChrome'
import {
  loadDiagnosticState,
  patchDiagnosticState,
  saveDiagnosticState,
} from '@/lib/diagnostic-storage'

const CUSTOM_TASKS_MAX = 500

export function OtroPerfilPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('es')
  const [profession, setProfession] = useState('')
  const [tasksNote, setTasksNote] = useState('')
  const [lostHours, setLostHours] = useState<HoursOption | ''>('')
  const [professionFocused, setProfessionFocused] = useState(false)
  const [tasksFocused, setTasksFocused] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = loadDiagnosticState()
    setLanguage(saved.language)
    setProfession(saved.customProfession)
    setTasksNote(saved.customTasksNote)
    setLostHours(saved.customLostHours)
    setReady(true)
  }, [])

  function persistLanguage(next: Language) {
    setLanguage(next)
    patchDiagnosticState({ language: next })
  }

  function persist(patch: {
    customProfession?: string
    customTasksNote?: string
    customLostHours?: HoursOption | ''
  }) {
    if (patch.customProfession !== undefined) setProfession(patch.customProfession)
    if (patch.customTasksNote !== undefined) setTasksNote(patch.customTasksNote)
    if (patch.customLostHours !== undefined) setLostHours(patch.customLostHours)
    patchDiagnosticState(patch)
  }

  const labels = t(language)
  const canContinue = profession.trim().length > 0 && lostHours !== ''

  function handleContinue() {
    if (!canContinue) return
    const current = loadDiagnosticState()
    saveDiagnosticState({
      ...current,
      profile: null,
      selectedTasks: [],
      customProfession: profession.trim(),
      customTasksNote: tasksNote.trim(),
      customLostHours: lostHours,
      step: 3,
    })
    router.push('/diagnostico')
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
            onClick={() => {
              patchDiagnosticState({ step: 1 })
              router.push('/diagnostico')
            }}
            className="text-[#888888] text-sm mb-6 self-start hover:text-white transition-colors"
          >
            ← {labels.backButton}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
            <span className="text-[#00E5A0] text-[10px] font-bold tracking-[0.25em] uppercase">
              {language === 'es' ? 'PASO 1 DE 3' : 'STEP 1 OF 3'}
            </span>
            <div className="h-px flex-1 bg-[#1A1A1A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-2xl sm:text-3xl mb-6"
          >
            {language === 'es' ? 'Mi perfil no está aquí' : 'My profile is not listed'}
          </motion.h2>

          <div className="flex flex-col gap-3">
            <label
              className={`flex flex-col gap-2 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
                professionFocused || profession.trim()
                  ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                  : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
              }`}
            >
              <span className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug">
                {labels.customProfessionLabel}
              </span>
              <input
                type="text"
                value={profession}
                onChange={(e) => persist({ customProfession: e.target.value })}
                onFocus={() => setProfessionFocused(true)}
                onBlur={() => setProfessionFocused(false)}
                placeholder={labels.customProfessionPlaceholder}
                className="w-full bg-transparent text-sm font-display font-semibold text-white placeholder:text-[#555] outline-none"
              />
            </label>

            <label
              className={`flex flex-col gap-2 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
                tasksFocused || tasksNote.trim()
                  ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                  : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
              }`}
            >
              <span className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug">
                {labels.customTasksLabel}
              </span>
              <textarea
                value={tasksNote}
                onChange={(e) => persist({ customTasksNote: e.target.value.slice(0, CUSTOM_TASKS_MAX) })}
                onFocus={() => setTasksFocused(true)}
                onBlur={() => setTasksFocused(false)}
                placeholder={labels.customTasksPlaceholder}
                rows={5}
                maxLength={CUSTOM_TASKS_MAX}
                className="w-full resize-none bg-transparent text-sm text-white placeholder:text-[#555] outline-none leading-snug min-h-[7.5rem]"
              />
              <span className="text-[10px] text-[#444] self-end tabular-nums">
                {tasksNote.length}/{CUSTOM_TASKS_MAX}
              </span>
            </label>

            <div className="p-4 rounded-2xl border border-[#1A1A1A] bg-[#111]">
              <p className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug mb-4">
                {labels.customLostHoursLabel}
              </p>
              <HoursRangePicker
                options={HOURS_OPTIONS_PRO}
                value={lostHours}
                onChange={(opt) => persist({ customLostHours: opt as HoursOption })}
              />
            </div>
          </div>

          {canContinue && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <button
                onClick={handleContinue}
                className="w-full bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,160,0.35)] hover:scale-[1.02]"
              >
                {labels.continueButton} →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </DiagnosticChrome>
  )
}
