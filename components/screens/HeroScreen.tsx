'use client'

import { motion } from 'framer-motion'
import { Language } from '@/lib/types'
import { t } from '@/lib/translations'

interface HeroScreenProps {
  language: Language
  onStart: () => void
}

export function HeroScreen({ language, onStart }: HeroScreenProps) {
  const tr = t(language)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-14 text-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.35 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]/90 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-2xl">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[#00E5A0] font-display font-bold text-sm tracking-widest uppercase">
            MojxAI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
        >
          {tr.heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#AAAAAA] text-lg sm:text-xl mb-10 max-w-lg leading-relaxed"
        >
          {tr.heroSubtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-4"
        >
          <button
            onClick={onStart}
            className="relative group overflow-hidden bg-[#00E5A0] text-black font-display font-bold px-10 py-5 rounded-full text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,160,0.5)]"
          >
            <span className="relative z-10">{tr.heroCtaButton}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#555] text-sm mb-16"
        >
          {tr.heroTrust}
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full bg-[#111111]/80 backdrop-blur-sm border border-[#1E1E1E] rounded-2xl px-6 py-5 flex items-center justify-around gap-4"
        >
          {tr.heroStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#00E5A0]">
                {stat.value}
              </span>
              <span className="text-[#888] text-xs mt-1 text-center leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
