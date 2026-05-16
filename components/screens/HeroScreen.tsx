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
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.35 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]/90 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3"
      >
        <span className="text-[#00E5A0] font-display font-bold text-sm tracking-widest uppercase">
          MojxAI
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 max-w-2xl"
      >
        {tr.heroTitle}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[#888888] text-base sm:text-lg mb-10"
      >
        {tr.heroSubtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <button
          onClick={onStart}
          className="relative group overflow-hidden bg-[#00E5A0] text-black font-display font-bold px-8 py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
        >
          <span className="relative z-10">{tr.heroCtaButton}</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 flex items-center gap-6 text-[#333333] text-xs"
      >
        <span>48h installation</span>
        <span>·</span>
        <span>100% guarantee</span>
        <span>·</span>
        <span>LATAM</span>
      </motion.div>
      </div>
    </div>
  )
}
