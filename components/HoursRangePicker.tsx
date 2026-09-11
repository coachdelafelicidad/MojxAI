'use client'

import { HoursOption } from '@/lib/types'

export const HOURS_OPTIONS_PRO: HoursOption[] = ['20-30h', '30-40h', '40-50h', '50h+']
export const HOURS_OPTIONS_HOME: HoursOption[] = ['10-20h', '20-30h', '30-40h', '40h+' as HoursOption]

interface HoursRangePickerProps {
  options: HoursOption[]
  value: string
  onChange: (value: string) => void
}

export function HoursRangePicker({ options, value, onChange }: HoursRangePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`py-4 rounded-2xl text-sm font-bold border transition-all duration-200 ${
            value === opt
              ? 'bg-[#00E5A0] text-black border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.25)]'
              : 'border-[#1A1A1A] bg-[#111] text-[#CCCCCC] hover:border-[#2A2A2A] hover:bg-[#141414]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
