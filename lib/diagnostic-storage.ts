import { DiagnosticState, Language } from './types'

export const DIAGNOSTIC_STORAGE_KEY = 'mojxai_diagnostic'
export const ENTERPRISE_STORAGE_KEY = 'mojxai_enterprise'

export const defaultDiagnosticState: DiagnosticState = {
  step: 1,
  language: 'es',
  profile: null,
  selectedTasks: [],
  hoursPerWeek: '',
  monthlyIncome: '',
  customProfession: '',
  customTasksNote: '',
  customLostHours: '',
}

export interface EnterpriseLeadState {
  name: string
  company: string
  email: string
  whatsapp: string
  teamSize: string
  areas: string
  goal: string
}

export const defaultEnterpriseState: EnterpriseLeadState = {
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  teamSize: '',
  areas: '',
  goal: '',
}

export function loadDiagnosticState(): DiagnosticState {
  if (typeof window === 'undefined') return defaultDiagnosticState
  try {
    const raw = localStorage.getItem(DIAGNOSTIC_STORAGE_KEY)
    if (!raw) return defaultDiagnosticState
    const parsed = JSON.parse(raw) as Partial<DiagnosticState>
    return { ...defaultDiagnosticState, ...parsed }
  } catch {
    return defaultDiagnosticState
  }
}

export function saveDiagnosticState(state: DiagnosticState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(DIAGNOSTIC_STORAGE_KEY, JSON.stringify(state))
}

export function patchDiagnosticState(patch: Partial<DiagnosticState>): DiagnosticState {
  const next = { ...loadDiagnosticState(), ...patch }
  saveDiagnosticState(next)
  return next
}

export function loadEnterpriseState(): EnterpriseLeadState {
  if (typeof window === 'undefined') return defaultEnterpriseState
  try {
    const raw = localStorage.getItem(ENTERPRISE_STORAGE_KEY)
    if (!raw) return defaultEnterpriseState
    const parsed = JSON.parse(raw) as Partial<EnterpriseLeadState>
    return { ...defaultEnterpriseState, ...parsed }
  } catch {
    return defaultEnterpriseState
  }
}

export function saveEnterpriseState(state: EnterpriseLeadState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ENTERPRISE_STORAGE_KEY, JSON.stringify(state))
}

export function readStoredLanguage(): Language {
  return loadDiagnosticState().language || 'es'
}
