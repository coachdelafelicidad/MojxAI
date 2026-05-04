import { CalculationResult, HoursOption, Language } from './types'
import { TASKS, getTopTasks } from './tasks'

export const HOURS_MAP: Record<HoursOption, number> = {
  '20-30h': 25,
  '30-40h': 35,
  '40-50h': 45,
  '50h+': 55,
}

export const INCOME_OPTIONS_ES = [
  { label: 'Menos de $20,000 MXN', value: 15000 },
  { label: '$20,000 - $50,000 MXN', value: 35000 },
  { label: '$50,000 - $100,000 MXN', value: 75000 },
  { label: 'Más de $100,000 MXN', value: 120000 },
]

export const INCOME_OPTIONS_EN = [
  { label: 'Less than $1,500 USD', value: 1200 },
  { label: '$1,500 - $4,000 USD', value: 2750 },
  { label: '$4,000 - $8,000 USD', value: 6000 },
  { label: 'More than $8,000 USD', value: 10000 },
]

export function getIncomeOptions(language: Language) {
  return language === 'es' ? INCOME_OPTIONS_ES : INCOME_OPTIONS_EN
}

export function getCurrencySymbol(language: Language): string {
  return language === 'es' ? 'MXN' : 'USD'
}

export function calculate(
  selectedTaskIds: string[],
  hoursPerWeek: string,
  monthlyIncomeValue: number,
  _language: Language
): CalculationResult {
  const selectedTasks = selectedTaskIds
    .map(id => TASKS.find(t => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  const hoursLostPerWeek = selectedTasks.reduce((sum, t) => sum + t.hoursPerWeek, 0)
  const hoursRecoverable = Math.round(hoursLostPerWeek * 0.7)
  const weeklyHours = HOURS_MAP[hoursPerWeek as HoursOption] ?? 40
  const incomePerHour = monthlyIncomeValue / (weeklyHours * 4)
  const moneyLostPerMonth = Math.round(hoursRecoverable * 4 * incomePerHour)
  const topTasks = getTopTasks(selectedTaskIds, 3)

  return {
    hoursLostPerWeek,
    hoursRecoverable,
    incomePerHour,
    moneyLostPerMonth,
    topTasks,
  }
}

export function formatMoney(amount: number, language: Language): string {
  const locale = language === 'es' ? 'es-MX' : 'en-US'
  const currency = language === 'es' ? 'MXN' : 'USD'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getResultMessage(hoursRecoverable: number, language: Language): string {
  if (language === 'es') {
    if (hoursRecoverable < 5) return 'Tienes un buen punto de partida. IA puede optimizar tu flujo de trabajo.'
    if (hoursRecoverable <= 10) return 'Hay una oportunidad real aquí. Ese tiempo vale dinero.'
    return 'Este es exactamente el problema que MojxAI resuelve.'
  } else {
    if (hoursRecoverable < 5) return 'Good starting point. AI can optimize your workflow.'
    if (hoursRecoverable <= 10) return "There's a real opportunity here. That time is worth money."
    return 'This is exactly the problem MojxAI solves.'
  }
}
