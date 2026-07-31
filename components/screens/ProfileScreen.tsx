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

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-3">
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
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                      : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
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

        {/* ── Contact options ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 flex flex-col gap-3"
        >
          {/* Custom profile */}
          <a
            href={`mailto:mojxai.app@gmail.com?subject=${encodeURIComponent(
              language === 'es' ? 'Consulta MojxAI — Mi perfil no está en la lista' : 'MojxAI Inquiry — My profile is not listed'
            )}&body=${encodeURIComponent(
              language === 'es'
                ? 'Hola, me interesa MojxAI pero mi perfil no está entre las opciones.\n\nMi nombre:\nMi profesión / actividad:\nLo que necesito automatizar:\n\n¿Pueden ayudarme?'
                : 'Hi, I\'m interested in MojxAI but my profile is not listed.\n\nMy name:\nMy profession / activity:\nWhat I want to automate:\n\nCan you help me?'
            )}`}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-dashed border-[#2A2A2A] bg-[#111] hover:border-[#00E5A0]/30 hover:bg-[#0A1A12]/50 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#252525] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E5A0]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#555" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#888] text-sm font-medium group-hover:text-[#CCCCCC] transition-colors">
                {language === 'es' ? 'Mi perfil no está aquí' : 'My profile is not listed'}
              </p>
              <p className="text-[#444] text-xs group-hover:text-[#555] transition-colors">
                {language === 'es' ? 'Escríbenos y creamos tu plan personalizado' : 'Contact us and we\'ll build your custom plan'}
              </p>
            </div>
            <span className="text-[#444] text-xs group-hover:text-[#00E5A0] transition-colors">✉</span>
          </a>

          {/* Enterprise / multi-area */}
          <a
            href={`mailto:mojxai.app@gmail.com?subject=${encodeURIComponent(
              language === 'es' ? 'Consulta MojxAI — Empresa con múltiples áreas' : 'MojxAI Inquiry — Company with multiple departments'
            )}&body=${encodeURIComponent(
              language === 'es'
                ? 'Hola, tengo una empresa con múltiples áreas y me interesa implementar IA en varios departamentos.\n\nEmpresa:\nÁreas que necesitan IA:\nTamaño del equipo:\nPrincipal objetivo:\n\n¿Pueden cotizarnos una solución personalizada?'
                : 'Hi, I have a company with multiple departments and I\'m interested in implementing AI across several teams.\n\nCompany:\nDepartments that need AI:\nTeam size:\nMain goal:\n\nCan you provide a custom quote?'
            )}`}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-dashed border-[#2A2A2A] bg-[#111] hover:border-[#00E5A0]/30 hover:bg-[#0A1A12]/50 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#252525] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E5A0]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="#555" strokeWidth="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#555" strokeWidth="2"/>
                <path d="M12 12v4M10 14h4" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#888] text-sm font-medium group-hover:text-[#CCCCCC] transition-colors">
                {language === 'es' ? 'Empresa con múltiples áreas' : 'Company with multiple departments'}
              </p>
              <p className="text-[#444] text-xs group-hover:text-[#555] transition-colors">
                {language === 'es' ? 'Solución enterprise a medida — contáctanos' : 'Enterprise custom solution — contact us'}
              </p>
            </div>
            <span className="text-[#444] text-xs group-hover:text-[#00E5A0] transition-colors">✉</span>
          </a>
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
