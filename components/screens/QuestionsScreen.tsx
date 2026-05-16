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

  // Home profiles only need hours selected
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
          className="text-[#888888] text-sm mb-8 block hover:text-white transition-colors"
        >
          ← {tr.backButton}
        </motion.button>

        {/* Hours question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-6">
            {isHome ? tr.hoursQuestionHome : tr.hoursQuestion}
          </h2>
          <div className="flex flex-wrap gap-3">
            {hoursOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onHoursChange(opt)}
                className={`px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  hoursPerWeek === opt
                    ? 'bg-[#00E5A0] text-black border-[#00E5A0]'
                    : 'border-[#1E1E1E] bg-[#141414] text-[#CCCCCC] hover:border-[#00E5A0]/40'
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
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-6">
              {tr.incomeQuestion}
            </h2>
            <div className="flex flex-col gap-3">
              {incomeOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => onIncomeChange(String(opt.value))}
                  className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    monthlyIncome === String(opt.value)
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 text-white'
                      : 'border-[#1E1E1E] bg-[#141414] text-[#CCCCCC] hover:border-[#00E5A0]/40'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
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
