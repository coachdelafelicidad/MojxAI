'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Language, Profile } from '@/lib/types'
import { t } from '@/lib/translations'

interface ProfileScreenProps {
  language: Language
  selected: Profile | null
  onSelect: (profile: Profile) => void
  onContinue: () => void
  onBack: () => void
}

const profiles: Profile[] = ['professional', 'business', 'entrepreneur']

export function ProfileScreen({ language, selected, onSelect, onContinue, onBack }: ProfileScreenProps) {
  const tr = t(language)

  return (
    <div className="flex flex-col min-h-screen px-6 py-20">
      <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="text-[#888888] text-sm mb-8 self-start hover:text-white transition-colors"
        >
          ← {tr.backButton}
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-2xl sm:text-3xl mb-8"
        >
          {tr.profileQuestion}
        </motion.h2>

        <div className="flex flex-col gap-4 flex-1">
          {profiles.map((profile, i) => {
            const info = tr.profiles[profile]
            const isSelected = selected === profile

            return (
              <motion.div
                key={profile}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => onSelect(profile)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 card-hover ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_20px_rgba(0,229,160,0.12)]'
                      : 'border-[#1E1E1E] bg-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{info.emoji}</span>
                    <div className="flex-1">
                      <div className="font-display font-semibold text-base">{info.title}</div>
                      <div className="text-[#888888] text-sm mt-0.5">{info.subtitle}</div>
                    </div>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-6 h-6 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-black text-xs font-bold">✓</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8"
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
