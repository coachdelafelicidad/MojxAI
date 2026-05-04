'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-0.5 bg-[#1E1E1E]">
      <motion.div
        className="h-full bg-[#00E5A0]"
        style={{ boxShadow: '0 0 8px rgba(0, 229, 160, 0.6)' }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
