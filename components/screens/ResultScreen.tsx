'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Language, CalculationResult } from '@/lib/types'
import { formatMoney, getResultMessage } from '@/lib/calculations'
import { t } from '@/lib/translations'

interface ResultScreenProps {
  language: Language
  result: CalculationResult
  onShare: () => void
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
      if (progress < 1) {
        raf.current = requestAnimationFrame(step)
      }
    }

    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  return count
}

export function ResultScreen({ language, result, onShare }: ResultScreenProps) {
  const tr = t(language)
  const hoursCount = useCounter(result.hoursRecoverable)
  const moneyCount = useCounter(result.moneyLostPerMonth, 2500)
  const message = getResultMessage(result.hoursRecoverable, language)
  const ctaUrl = language === 'es' ? 'https://moxai.io/empezar' : 'https://moxai.io/start'

  const formattedMoney = formatMoney(moneyCount, language)

  return (
    <div className="flex flex-col min-h-screen px-6 py-16">
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase">
            {tr.resultTitle}
          </span>
        </motion.div>

        {/* Hours counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141414] border border-[#1E1E1E] rounded-3xl p-8 mb-5 text-center"
        >
          <div className="font-display font-bold text-7xl sm:text-8xl text-white mb-2">
            {hoursCount}
            <span className="text-3xl ml-2 text-[#888888]">h</span>
          </div>
          <p className="font-display font-semibold text-lg text-[#CCCCCC]">
            {tr.resultHoursTitle(result.hoursRecoverable)}
          </p>
          <p className="text-[#888888] text-sm mt-1">{tr.resultHoursSubtitle}</p>
        </motion.div>

        {/* Money counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0A1A12] border border-[#00E5A0]/20 rounded-3xl p-8 mb-5 text-center"
          style={{ boxShadow: '0 0 40px rgba(0, 229, 160, 0.08)' }}
        >
          <p className="text-[#888888] text-sm mb-2">{tr.resultMoneyTitle}</p>
          <div className="font-display font-bold text-5xl sm:text-6xl text-[#00E5A0] mb-2">
            {formattedMoney}
          </div>
          <p className="text-[#888888] text-sm">{tr.resultMoneySubtitle}</p>
        </motion.div>

        {/* Top tasks */}
        {result.topTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-6 mb-5"
          >
            <p className="text-[#888888] text-xs font-semibold uppercase tracking-wider mb-4">
              {tr.topTasksTitle}
            </p>
            <div className="flex flex-col gap-3">
              {result.topTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <span className="text-xl">{task.emoji}</span>
                  <span className="text-sm text-[#CCCCCC] flex-1">
                    {language === 'es' ? task.nameEs : task.nameEn}
                  </span>
                  <span className="text-[#00E5A0] text-xs font-semibold">
                    {task.hoursPerWeek}h/sem
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-full h-px bg-[#1E1E1E] mb-6" />
          <p className="text-[#CCCCCC] text-base font-medium leading-relaxed">{message}</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h3 className="font-display font-bold text-2xl mb-3">{tr.ctaTitle}</h3>
          <p className="text-[#888888] text-sm mb-6">{tr.ctaSubtitle}</p>

          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,160,0.4)] hover:scale-[1.02] mb-4"
          >
            {tr.ctaPrimary}
          </a>

          <button
            onClick={onShare}
            className="text-[#888888] text-sm hover:text-white transition-colors underline underline-offset-2"
          >
            {tr.ctaSecondary}
          </button>

          <p className="text-[#333333] text-xs mt-6">{tr.disclaimer}</p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-10 pb-6"
        >
          <p className="text-[#333333] text-xs">
            MojxAI ·{' '}
            <a href="https://moxai.io" target="_blank" rel="noopener noreferrer" className="hover:text-[#888888] transition-colors">
              moxai.io
            </a>
            {' '}· Founded by OIG
          </p>
        </motion.div>
      </div>
    </div>
  )
}
