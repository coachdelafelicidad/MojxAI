export type Language = 'es' | 'en'

export type Profile =
  | 'homemaker'
  | 'parenting'
  | 'lawyer'
  | 'doctor'
  | 'accountant'
  | 'consultant'
  | 'architect'
  | 'business'

export interface Task {
  id: string
  emoji: string
  nameEs: string
  nameEn: string
  hoursPerWeek: number
}

export interface DiagnosticState {
  step: number
  language: Language
  profile: Profile | null
  selectedTasks: string[]
  hoursPerWeek: string
  monthlyIncome: string
}

export interface CalculationResult {
  hoursLostPerWeek: number
  hoursRecoverable: number
  incomePerHour: number
  moneyLostPerMonth: number
  topTasks: Task[]
  allTasks: Task[]
}

export type HoursOption = '20-30h' | '30-40h' | '40-50h' | '50h+'

export interface IncomeOption {
  label: string
  value: number
}
