'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Language, Profile } from '@/lib/types'
import { t } from '@/lib/translations'
import { ProfileLucideIcon } from '@/lib/icons'

interface ProfileScreenProps {
  language: Language
  selected: Profile | null
  onSelect: (profile: Profile) => void
  onContinue: () => void
  onBack: () => void
}

const profiles: Profile[] = [
  'business',
  'lawyer',
  'doctor',
  'accountant',
  'consultant',
  'architect',
  'parenting',
  'homemaker',
]

export function ProfileScreen({ language, selected, onSelect, onContinue, onBack }: ProfileScreenProps) {
  const router = useRouter()
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
          <span className="text-[#00E5A0] text-[10px] font-bold tracking-[0.25em] uppercase">
            {language === 'es' ? 'PASO 1 DE 3' : 'STEP 1 OF 3'}
          </span>
          <div className="h-px flex-1 bg-[#1A1A1A]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-2xl sm:text-3xl mb-6"
        >
          {tr.profileQuestion}
        </motion.h2>

        <div className="grid grid-cols-2 gap-3">
          {profiles.map((profile, i) => {
            const info = tr.profiles[profile]
            const isSelected = selected === profile

            return (
              <motion.div
                key={profile}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => onSelect(profile)}
                  className={`group w-full h-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-3 ${
                    isSelected
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                      : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30'
                        : 'bg-[#1A1A1A] border border-[#252525]'
                    }`}>
                      <ProfileLucideIcon profile={profile} active={isSelected} />
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 flex flex-col gap-3"
        >
          <button
            type="button"
            onClick={() => router.push('/diagnostico/otro-perfil')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-dashed border-[#2A2A2A] bg-[#111] hover:border-[#00E5A0]/30 hover:bg-[#0A1A12]/50 transition-all duration-200 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#252525] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E5A0]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#555" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#888] text-sm font-medium group-hover:text-[#CCCCCC] transition-colors">
                {language === 'es' ? 'Mi perfil no está aquí' : 'My profile is not listed'}
              </p>
              <p className="text-[#444] text-xs">
                {language === 'es' ? 'Cuéntanos qué haces y calculamos tu diagnóstico' : 'Tell us what you do and we’ll calculate your diagnostic'}
              </p>
            </div>
            <span className="text-[#444] text-xs group-hover:text-[#00E5A0] transition-colors">→</span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/diagnostico/empresa')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-dashed border-[#2A2A2A] bg-[#111] hover:border-[#00E5A0]/30 hover:bg-[#0A1A12]/50 transition-all duration-200 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#252525] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E5A0]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="#555" strokeWidth="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#555" strokeWidth="2"/>
                <path d="M12 12v4M10 14h4" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#888] text-sm font-medium group-hover:text-[#CCCCCC] transition-colors">
                {language === 'es' ? 'Empresa con múltiples áreas' : 'Company with multiple departments'}
              </p>
              <p className="text-[#444] text-xs group-hover:text-[#555] transition-colors">
                {language === 'es' ? 'Solución enterprise a medida — contáctanos' : 'Enterprise custom solution — contact us'}
              </p>
            </div>
            <span className="text-[#444] text-xs group-hover:text-[#00E5A0] transition-colors">→</span>
          </button>
        </motion.div>

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
