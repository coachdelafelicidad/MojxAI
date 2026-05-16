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

const profiles: Profile[] = [
  'homemaker', 'parenting',
  'lawyer', 'doctor',
  'accountant', 'consultant',
  'architect', 'business',
]

const ProfileIcons: Record<Profile, React.FC<{ active: boolean }>> = {
  homemaker: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  parenting: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.5" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2"/>
      <path d="M8 10.5C8 10.5 9 9 12 9C15 9 16 10.5 16 10.5V14H14L13 21H11L10 14H8V10.5Z"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="8" r="1.5" stroke={active ? '#00E5A0' : '#555'} strokeWidth="1.5"/>
      <path d="M18 10V13.5" stroke={active ? '#00E5A0' : '#555'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  lawyer: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 7V13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13V7L12 3Z"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 11L11 14L16 9" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  doctor: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12H15M12 9V15" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  accountant: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2"/>
      <path d="M3 9H21" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2"/>
      <path d="M9 3V9" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2"/>
      <path d="M7 13H10M14 13H17M7 17H10M14 17H17" stroke={active ? '#00E5A0' : '#555'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  consultant: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2"/>
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  architect: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 20L12 4L22 20H2Z" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 4V20" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 12H17" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  business: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

export function ProfileScreen({ language, selected, onSelect, onContinue, onBack }: ProfileScreenProps) {
  const tr = t(language)

  return (
    <div className="flex flex-col min-h-screen px-4 py-16">
      <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="text-[#888888] text-sm mb-6 self-start hover:text-white transition-colors"
        >
          ← {tr.backButton}
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-2xl sm:text-3xl mb-6"
        >
          {tr.profileQuestion}
        </motion.h2>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {profiles.map((profile, i) => {
            const info = tr.profiles[profile]
            const isSelected = selected === profile
            const Icon = ProfileIcons[profile]

            return (
              <motion.div
                key={profile}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => onSelect(profile)}
                  className={`w-full h-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-3 ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_24px_rgba(0,229,160,0.12)]'
                      : 'border-[#1E1E1E] bg-[#141414] hover:border-[#2E2E2E]'
                  }`}
                >
                  {/* Icon + check row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30'
                        : 'bg-[#1A1A1A] border border-[#252525]'
                    }`}>
                      <Icon active={isSelected} />
                    </div>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="w-5 h-5 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0"
                        >
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Text */}
                  <div>
                    <div className={`font-display font-semibold text-sm leading-tight transition-colors duration-200 ${isSelected ? 'text-white' : 'text-[#CCCCCC]'}`}>
                      {info.title}
                    </div>
                    <div className="text-[#555] text-xs mt-1 leading-snug">
                      {info.subtitle}
                    </div>
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
              className="mt-6"
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
