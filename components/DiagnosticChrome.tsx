'use client'

import Link from 'next/link'
import { Language } from '@/lib/types'
import { LanguageToggle } from './LanguageToggle'
import { ProgressBar } from './ProgressBar'

function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="9" height="76" rx="2.5" fill="#C0C0C0"/>
      <rect x="10" y="12" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="10" y="79" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="45.5" y="19" width="9" height="62" rx="4.5" fill="#00E5A0"/>
      <rect x="81" y="12" width="9" height="76" rx="2.5" fill="#C0C0C0"/>
      <rect x="66" y="12" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
      <rect x="66" y="79" width="24" height="9" rx="2.5" fill="#C0C0C0"/>
    </svg>
  )
}

interface DiagnosticChromeProps {
  language: Language
  onLanguageChange: (language: Language) => void
  progress: number
  children: React.ReactNode
}

export function DiagnosticChrome({ language, onLanguageChange, progress, children }: DiagnosticChromeProps) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 h-12"
        style={{
          background: 'rgba(5,5,5,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200"
        >
          <LogoIcon size={18} />
          <span className="font-display font-black" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            <span className="text-white">Mo</span><span style={{ color: '#00E5A0' }}>j</span><span className="text-white">xAI</span>
          </span>
        </Link>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </header>

      <div className="fixed top-12 left-0 right-0 z-[99]">
        <ProgressBar progress={progress} />
      </div>

      {children}
    </div>
  )
}
