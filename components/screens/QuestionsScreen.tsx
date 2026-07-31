'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Language, HoursOption, Profile, isHomeProfile } from '@/lib/types'
import { getIncomeOptions } from '@/lib/calculations'
import { t } from '@/lib/translations'

const HOURS_OPTIONS_PRO: HoursOption[] = ['20-30h', '30-40h', '40-50h', '50h+']
const HOURS_OPTIONS_HOME: HoursOption[] = ['10-20h', '20-30h', '30-40h', '40h+' as HoursOption]

interface QuestionsScreenProps {
  language: Language
  profile: Profile | null
  hoursPerWeek: string
  monthlyIncome: string
  onHoursChange: (h: string) => void
  onIncomeChange: (i: string) => void
  onContinue: () => void
  onBack: () => void
}

export function QuestionsScreen({
  language,
  profile,
  hoursPerWeek,
  monthlyIncome,
  onHoursChange,
  onIncomeChange,
  onContinue,
  onBack,
}: QuestionsScreenProps) {
  const tr = t(language)
  const isHome = isHomeProfile(profile)
  const incomeOptions = getIncomeOptions(language)
  const hoursOptions = isHome ? HOURS_OPTIONS_HOME : HOURS_OPTIONS_PRO

  // Home profiles only need hours selected; "prefer_not" counts as a valid income answer
  const canContinue = isHome
    ? hoursPerWeek !== ''
    : hoursPerWeek !== '' && monthlyIncome !== ''

  return (
    <div className="flex flex-col min-h-screen px-6 py-20">
      <div className="max-w-lg mx-auto w-full">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="text-[#888888] text-sm mb-6 block hover:text-white transition-colors"
        >
          ← {tr.backButton}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
          <span className="text-[#00E5A0] text-[10px] font-bold tracking-[0.25em] uppercase">
            {language === 'es' ? 'PASO 3 DE 3' : 'STEP 3 OF 3'}
          </span>
          <div className="h-px flex-1 bg-[#1A1A1A]" />
        </motion.div>

        {/* Hours question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-6">
            {isHome ? tr.hoursQuestionHome : tr.hoursQuestion}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {hoursOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onHoursChange(opt)}
                className={`py-4 rounded-2xl text-sm font-bold border transition-all duration-200 ${
                  hoursPerWeek === opt
                    ? 'bg-[#00E5A0] text-black border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.25)]'
                    : 'border-[#1A1A1A] bg-[#111] text-[#CCCCCC] hover:border-[#2A2A2A] hover:bg-[#141414]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Income question — only for professional profiles */}
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-6">
              {tr.incomeQuestion}
            </h2>
            <div className="flex flex-col gap-2">
              {incomeOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => onIncomeChange(String(opt.value))}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    monthlyIncome === String(opt.value)
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 text-white shadow-[0_0_15px_rgba(0,229,160,0.08)]'
                      : 'border-[#1A1A1A] bg-[#111] text-[#CCCCCC] hover:border-[#2A2A2A] hover:bg-[#141414]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {monthlyIncome === String(opt.value) && (
                    <div className="w-4 h-4 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
              {/* Prefer not to say */}
              <button
                onClick={() => onIncomeChange('prefer_not')}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  monthlyIncome === 'prefer_not'
                    ? 'border-[#00E5A0] bg-[#00E5A0]/5 text-white shadow-[0_0_15px_rgba(0,229,160,0.08)]'
                    : 'border-[#1A1A1A] bg-[#111] text-[#555] hover:border-[#2A2A2A] italic'
                }`}
              >
                <span>{language === 'es' ? '🔒 Prefiero no decir' : '🔒 Prefer not to say'}</span>
                {monthlyIncome === 'prefer_not' && (
                  <div className="w-4 h-4 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Info note for home profiles */}
        {isHome && hoursPerWeek && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-[#0A1A12] border border-[#00E5A0]/15"
          >
            <p className="text-[#888888] text-sm leading-relaxed">
              {language === 'es'
                ? '💡 El cálculo usa la tarifa equivalente de servicio doméstico para estimar el valor de tu tiempo recuperado.'
                : '💡 The calculation uses an equivalent domestic service rate to estimate the value of your recovered time.'}
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {canContinue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={onContinue}
                className="w-full bg-[#00E5A0] text-black font-display font-bold py-4 rounded-full text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,160,0.35)] hover:scale-[1.02]"
              >
                {tr.continueButton} →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
