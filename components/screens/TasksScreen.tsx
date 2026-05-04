'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language } from '@/lib/types'
import { TASKS } from '@/lib/tasks'
import { t } from '@/lib/translations'

interface TasksScreenProps {
  language: Language
  selectedTasks: string[]
  onToggleTask: (id: string) => void
  onContinue: () => void
  onBack: () => void
}

export function TasksScreen({ language, selectedTasks, onToggleTask, onContinue, onBack }: TasksScreenProps) {
  const tr = t(language)
  const [showMinWarning, setShowMinWarning] = useState(false)

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">
            {tr.tasksTitle}
          </h2>
          <p className="text-[#888888] text-sm">{tr.tasksSubtitle}</p>
        </motion.div>

        <div className="flex flex-col gap-3 mb-8">
          {TASKS.map((task, i) => {
            const isSelected = selectedTasks.includes(task.id)
            const label = language === 'es' ? task.nameEs : task.nameEn

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 card-hover flex items-center gap-3 ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5'
                      : 'border-[#1E1E1E] bg-[#141414]'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{task.emoji}</span>
                  <span className={`text-sm font-medium flex-1 ${isSelected ? 'text-white' : 'text-[#CCCCCC]'}`}>
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
                        <span className="text-black text-[10px] font-bold">✓</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>

        <div className="sticky bottom-6">
          <AnimatePresence>
            {showMinWarning && (
              <motion.p
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
