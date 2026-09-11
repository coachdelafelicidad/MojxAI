'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { Language, Profile } from '@/lib/types'
import { t } from '@/lib/translations'
import { ICON_SIZE, ICON_STROKE, ProfileLucideIcon } from '@/lib/icons'

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

const PROFILE_ALIASES: Record<Profile, string[]> = {
  homemaker: ['ama de casa', 'hogar', 'housewife', 'homemaker', 'domestica', 'stay at home', 'stay-at-home'],
  parenting: ['crianza', 'mama', 'papa', 'padre', 'madre', 'parent', 'parenting', 'mom', 'dad', 'familia', 'family'],
  lawyer: ['abogado', 'abogada', 'juridico', 'legal', 'lawyer', 'attorney', 'litigio', 'derecho', 'notario'],
  doctor: ['medico', 'medica', 'doctor', 'doctora', 'salud', 'health', 'enfermero', 'enfermera', 'clinica'],
  accountant: ['contador', 'contadora', 'financiero', 'accountant', 'finance', 'fiscal', 'cpa'],
  consultant: ['consultor', 'consultora', 'coach', 'mentor', 'mentora', 'asesor', 'asesora'],
  architect: ['arquitecto', 'arquitecta', 'disenador', 'disenadora', 'designer', 'interiorista'],
  business: ['dueno', 'duena', 'negocio', 'emprendedor', 'emprendedora', 'entrepreneur', 'empresa', 'founder', 'ceo'],
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchCuratedProfile(input: string, language: Language): Profile | null {
  const query = normalize(input)
  if (query.length < 3) return null

  const tr = t(language)
  let best: { profile: Profile; score: number } | null = null

  for (const profile of profiles) {
    const info = tr.profiles[profile]
    const candidates = [
      info.title,
      info.subtitle,
      ...PROFILE_ALIASES[profile],
    ].map(normalize)

    for (const candidate of candidates) {
      if (!candidate) continue
      let score = 0
      if (candidate === query) score = 4
      else if (query.includes(candidate) && candidate.length >= 3) score = 3
      else if (query.length >= 4 && candidate.includes(query)) score = 2
      else if (query.length >= 3 && candidate.startsWith(query)) score = 1

      if (score > 0 && (!best || score > best.score)) {
        best = { profile, score }
      }
    }
  }

  return best?.profile ?? null
}

const FALLBACK_TASKS_MAX = 500

function buildUnlistedMailto(
  language: Language,
  profession: string,
  timeConsumingTasks: string,
  weeklyHours: string,
): string {
  const subject = language === 'es'
    ? 'Consulta MojxAI — Mi perfil no está en la lista'
    : 'MojxAI Inquiry — My profile is not listed'
  const tasksLine = language === 'es'
    ? `Tareas que más tiempo le quitan: ${timeConsumingTasks}`
    : `Tasks that take the most time: ${timeConsumingTasks}`
  const hoursLine = language === 'es'
    ? `Horas aprox. por semana: ${weeklyHours}`
    : `Approx. hours per week: ${weeklyHours}`
  const body = language === 'es'
    ? `Hola, me interesa MojxAI pero mi perfil no está entre las opciones.\n\nMi nombre:\nMi profesión / actividad: ${profession}\nLo que necesito automatizar:\n${tasksLine}\n${hoursLine}\n\n¿Pueden ayudarme?`
    : `Hi, I'm interested in MojxAI but my profile is not listed.\n\nMy name:\nMy profession / activity: ${profession}\nWhat I want to automate:\n${tasksLine}\n${hoursLine}\n\nCan you help me?`

  return `mailto:hola@mojxai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ProfileScreen({ language, selected, onSelect, onContinue, onBack }: ProfileScreenProps) {
  const tr = t(language)
  const [customProfession, setCustomProfession] = useState('')
  const [customFocused, setCustomFocused] = useState(false)
  const [fallbackTasks, setFallbackTasks] = useState('')
  const [fallbackHours, setFallbackHours] = useState('')
  const [fallbackTasksFocused, setFallbackTasksFocused] = useState(false)
  const [fallbackHoursFocused, setFallbackHoursFocused] = useState(false)

  const suggested = useMemo(
    () => matchCuratedProfile(customProfession, language),
    [customProfession, language],
  )

  const isFallbackFlow = selected === null
  const canContinue = Boolean(selected) || customProfession.trim().length > 0
  const customActive = customFocused || customProfession.trim().length > 0
  const unlistedMailto = buildUnlistedMailto(
    language,
    customProfession.trim(),
    fallbackTasks.trim(),
    fallbackHours.trim(),
  )

  function handleContinue() {
    const trimmed = customProfession.trim()

    if (trimmed) {
      const match = matchCuratedProfile(trimmed, language)
      if (match) {
        onSelect(match)
        onContinue()
        return
      }
      window.location.href = unlistedMailto
      return
    }

    if (selected) onContinue()
  }

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
            const isSuggested = !isSelected && suggested === profile

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
                      : isSuggested
                        ? 'border-[#00E5A0]/50 bg-[#00E5A0]/5'
                        : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                  }`}
                >
                  {/* Icon + check row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isSelected || isSuggested
                        ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30'
                        : 'bg-[#1A1A1A] border border-[#252525]'
                    }`}>
                      <ProfileLucideIcon profile={profile} active={isSelected || isSuggested} />
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
                    <div className={`font-display font-semibold text-sm leading-tight transition-colors duration-200 ${isSelected || isSuggested ? 'text-white' : 'text-[#CCCCCC]'}`}>
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

        {/* Free-text profession + fallback details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex flex-col gap-3"
        >
          <label
            className={`flex items-start gap-3 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
              customActive
                ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              customActive
                ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30'
                : 'bg-[#1A1A1A] border border-[#252525]'
            }`}>
              <PenLine
                size={ICON_SIZE}
                strokeWidth={ICON_STROKE}
                className={`transition-colors ${customActive ? 'text-[#00E5A0]' : 'text-[#555]'}`}
                aria-hidden
              />
            </div>
            <div className="flex-1 min-w-0 pt-1.5">
              <input
                type="text"
                value={customProfession}
                onChange={(e) => setCustomProfession(e.target.value)}
                onFocus={() => setCustomFocused(true)}
                onBlur={() => setCustomFocused(false)}
                placeholder={tr.customProfessionPlaceholder}
                className="w-full bg-transparent text-sm font-display font-semibold text-white placeholder:text-[#555] outline-none"
              />
              {suggested && (
                <p className="text-[#00E5A0] text-xs mt-1.5 leading-snug">
                  {tr.customProfessionMatch(tr.profiles[suggested].title)}
                </p>
              )}
            </div>
          </label>

          <AnimatePresence>
            {isFallbackFlow && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                <label
                  className={`flex flex-col gap-2 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
                    fallbackTasksFocused || fallbackTasks.trim()
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                      : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
                  }`}
                >
                  <span className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug">
                    {tr.fallbackTasksLabel}
                  </span>
                  <textarea
                    value={fallbackTasks}
                    onChange={(e) => setFallbackTasks(e.target.value.slice(0, FALLBACK_TASKS_MAX))}
                    onFocus={() => setFallbackTasksFocused(true)}
                    onBlur={() => setFallbackTasksFocused(false)}
                    placeholder={tr.fallbackTasksPlaceholder}
                    rows={3}
                    maxLength={FALLBACK_TASKS_MAX}
                    className="w-full resize-none bg-transparent text-sm text-white placeholder:text-[#555] outline-none leading-snug"
                  />
                  <span className="text-[10px] text-[#444] self-end tabular-nums">
                    {fallbackTasks.length}/{FALLBACK_TASKS_MAX}
                  </span>
                </label>

                <label
                  className={`flex flex-col gap-2 p-4 rounded-2xl border cursor-text transition-all duration-300 ${
                    fallbackHoursFocused || fallbackHours.trim()
                      ? 'border-[#00E5A0] bg-[#00E5A0]/5 shadow-[0_0_30px_rgba(0,229,160,0.15)]'
                      : 'border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A] hover:bg-[#141414]'
                  }`}
                >
                  <span className="font-display font-semibold text-sm text-[#CCCCCC] leading-snug">
                    {tr.fallbackHoursLabel}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={fallbackHours}
                    onChange={(e) => setFallbackHours(e.target.value)}
                    onFocus={() => setFallbackHoursFocused(true)}
                    onBlur={() => setFallbackHoursFocused(false)}
                    placeholder={tr.fallbackHoursPlaceholder}
                    className="w-full bg-transparent text-sm font-display font-semibold text-white placeholder:text-[#555] outline-none"
                  />
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Contact options ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 flex flex-col gap-3"
        >
          {/* Custom profile */}
          <a
            href={unlistedMailto}
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
            href={`mailto:hola@mojxai.com?subject=${encodeURIComponent(
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
          {canContinue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6"
            >
              <button
                onClick={handleContinue}
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
