'use client'

import { motion } from 'framer-motion'
import { Language } from '@/lib/types'

interface LanguageToggleProps {
  language: Language
  onChange: (lang: Language) => void
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="relative flex items-center bg-[#141414] border border-[#1E1E1E] rounded-full p-1 gap-1">
      <motion.div
        className="absolute top-1 bottom-1 bg-[#00E5A0] rounded-full"
        style={{ width: 'calc(50% - 4px)' }}
        animate={{ left: language === 'es' ? '4px' : 'calc(50%)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {(['es', 'en'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
            language === lang ? 'text-black' : 'text-[#888888]'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
