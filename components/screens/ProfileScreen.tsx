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

const profiles: Profile[] = ['professional', 'business', 'entrepreneur', 'homemaker']

const ProfileIcons: Record<Profile, React.FC<{ active: boolean }>> = {
  professional: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  business: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 21V7L12 3L19 7V21" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21V15H15V21" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10H9.01" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M15 10H15.01" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M9 14H9.01" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M15 14H15.01" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  entrepreneur: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  homemaker: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.7C12 21.7 3 16.5 3 10.5C3 8.51088 3.79018 6.60322 5.1967 5.1967C6.60322 3.79018 8.51088 3 10.5 3C11.5 3 12.46 3.21 13.34 3.59" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 10C21 12.21 19.5 14.5 18 16.5C16.78 18.14 15.35 19.58 14 20.8" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 3C18.4283 3 19.3185 3.36875 19.9749 4.02513C20.6313 4.6815 21 5.57174 21 6.5C21 8.5 18.5 11 17.5 12C16.5 11 14 8.5 14 6.5C14 5.57174 14.3687 4.6815 15.0251 4.02513C15.6815 3.36875 16.5717 3 17.5 3Z" stroke={active ? '#00E5A0' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

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

        <div className="flex flex-col gap-3 flex-1">
          {profiles.map((profile, i) => {
            const info = tr.profiles[profile]
            const isSelected = selected === profile
            const Icon = ProfileIcons[profile]

            return (
              <motion.div
                key={profile}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => onSelect(profile)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_24px_rgba(0,229,160,0.12)]'
                      : 'border-[#1E1E1E] bg-[#141414] hover:border-[#2E2E2E]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30'
                        : 'bg-[#1A1A1A] border border-[#252525]'
                    }`}>
                      <Icon active={isSelected} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`font-display font-semibold text-sm sm:text-base transition-colors duration-200 ${isSelected ? 'text-white' : 'text-[#CCCCCC]'}`}>
                        {info.title}
                      </div>
                      <div className="text-[#666666] text-xs sm:text-sm mt-0.5 truncate">
                        {info.subtitle}
                      </div>
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
