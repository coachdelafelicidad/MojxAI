'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language, Profile } from '@/lib/types'
import { getTasksForProfile } from '@/lib/tasks'
import { t } from '@/lib/translations'

interface TasksScreenProps {
  language: Language
  profile: Profile | null
  selectedTasks: string[]
  onToggleTask: (id: string) => void
  onContinue: () => void
  onBack: () => void
}

const MAX_TASKS = 10

export function TasksScreen({ language, profile, selectedTasks, onToggleTask, onContinue, onBack }: TasksScreenProps) {
  const tr = t(language)
  const tasks = getTasksForProfile(profile)
  const [showMinWarning, setShowMinWarning] = useState(false)
  const [showMaxWarning, setShowMaxWarning] = useState(false)

  const atMax = selectedTasks.length >= MAX_TASKS

  function handleToggle(id: string) {
    const isSelected = selectedTasks.includes(id)
    if (!isSelected && atMax) {
      setShowMaxWarning(true)
      setTimeout(() => setShowMaxWarning(false), 3000)
      return
    }
    setShowMaxWarning(false)
    onToggleTask(id)
  }

  function handleContinue() {
    if (selectedTasks.length < 3) {
      setShowMinWarning(true)
      setTimeout(() => setShowMinWarning(false), 3000)
      return
    }
    onContinue()
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-20">
      <div className="max-w-lg mx-auto w-full">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="text-[#888888] text-sm mb-8 self-start hover:text-white transition-colors block"
        >
          ← {tr.backButton}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
          <span className="text-[#00E5A0] text-[10px] font-bold tracking-[0.25em] uppercase">
            {language === 'es' ? 'PASO 2 DE 3' : 'STEP 2 OF 3'}
          </span>
          <div className="h-px flex-1 bg-[#1A1A1A]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">
            {tr.tasksTitle}
          </h2>
          <p className="text-[#555] text-sm">{tr.tasksSubtitle}</p>
        </motion.div>

        {/* Counter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="text-xs text-[#555]">
            {language === 'es' ? 'Seleccionadas' : 'Selected'}
          </span>
          <span className={`text-xs font-semibold tabular-nums ${atMax ? 'text-[#00E5A0]' : 'text-[#888]'}`}>
            {selectedTasks.length} / {MAX_TASKS}
          </span>
        </motion.div>

        <div className="flex flex-col gap-3 mb-8">
          {tasks.map((task, i) => {
            const isSelected = selectedTasks.includes(task.id)
            const isDisabled = !isSelected && atMax
            const label = language === 'es' ? task.nameEs : task.nameEn

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  onClick={() => handleToggle(task.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_20px_rgba(0,229,160,0.08)]'
                      : isDisabled
                        ? 'border-[#161616] bg-[#0A0A0A] opacity-30 cursor-not-allowed'
                        : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{task.emoji}</span>
                  <span className={`text-sm font-medium flex-1 leading-snug ${isSelected ? 'text-white' : 'text-[#CCCCCC]'}`}>
                    {label}
                  </span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        className="w-5 h-5 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0"
                      >
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>

        <div className="sticky bottom-6">
          <AnimatePresence mode="wait">
            {showMaxWarning && (
              <motion.div
                key="max"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mb-3"
              >
                <span className="text-amber-400 text-sm">
                  {language === 'es'
                    ? '⚠️ Máximo 10 tareas incluidas en el plan. Deselecciona una para cambiar.'
                    : '⚠️ Max 10 tasks included in the plan. Deselect one to swap.'}
                </span>
              </motion.div>
            )}
            {showMinWarning && !showMaxWarning && (
              <motion.p
                key="min"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-[#00E5A0]/80 text-sm mb-3"
              >
                {tr.tasksMinimum}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={handleContinue}
            className={`w-full font-display font-bold py-4 rounded-full text-base transition-all duration-300 ${
              selectedTasks.length >= 3
                ? 'bg-[#00E5A0] text-black hover:shadow-[0_0_25px_rgba(0,229,160,0.35)] hover:scale-[1.02]'
                : 'bg-[#1E1E1E] text-[#888888]'
            }`}
          >
            {tr.continueButton} →{' '}
            {selectedTasks.length > 0 && (
              <span className="text-sm opacity-60">({selectedTasks.length})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
