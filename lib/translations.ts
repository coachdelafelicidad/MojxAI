import { Language } from './types'

export const translations = {
  es: {
    // Progress
    stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,

    // Hero
    heroTitle: 'Descubre cuánto te está costando no usar IA',
    heroSubtitle: 'Diagnóstico gratuito · 5 minutos · Sin registro',
    heroCtaButton: 'Comenzar diagnóstico →',

    // Profile
    profileQuestion: '¿Cuál describe mejor tu situación?',
    profiles: {
      professional: {
        emoji: '👤',
        title: 'Profesionista independiente',
        subtitle: 'Abogado, médico, contador, coach, arquitecto...',
      },
      business: {
        emoji: '🏢',
        title: 'Dueño de empresa con equipo',
        subtitle: '2-50 personas',
      },
      entrepreneur: {
        emoji: '🚀',
        title: 'Emprendedor',
        subtitle: 'Negocio en crecimiento, equipo pequeño o solo',
      },
    },
    continueButton: 'Continuar',
    backButton: 'Atrás',

    // Tasks
    tasksTitle: 'Marca todo lo que haces en tu trabajo diario',
    tasksSubtitle: 'Cada tarea que marcas es tiempo que IA puede hacer',
    tasksMinimum: 'Selecciona al menos 3 tareas para continuar',

    // Questions
    hoursQuestion: '¿Cuántas horas trabajas por semana?',
    incomeQuestion: '¿Cuánto facturas o ganas al mes aproximadamente?',

    // Result
    resultTitle: 'Tu diagnóstico MojxAI',
    resultHoursTitle: (hours: number) => `Estás perdiendo ${hours} horas a la semana`,
    resultHoursSubtitle: 'en tareas que la IA puede hacer por ti',
    resultMoneyTitle: 'Eso equivale a',
    resultMoneySubtitle: 'en tiempo productivo que podrías recuperar',
    resultMonthly: 'al mes',
    topTasksTitle: 'Tus tareas con mayor impacto:',

    // CTA
    ctaTitle: '¿Quieres recuperar ese tiempo?',
    ctaSubtitle: 'MojxAI instala tu sistema de IA en 48 horas. Garantía total o te devolvemos el 100%.',
    ctaPrimary: 'Quiero que me lo instalen →',
    ctaSecondary: 'Compartir mi diagnóstico',
    disclaimer: '* Cálculo basado en tus respuestas. Resultados reales pueden variar.',
  },

  en: {
    // Progress
    stepOf: (current: number, total: number) => `Step ${current} of ${total}`,

    // Hero
    heroTitle: 'Find out how much not using AI is costing you',
    heroSubtitle: 'Free diagnostic · 5 minutes · No registration',
    heroCtaButton: 'Start diagnostic →',

    // Profile
    profileQuestion: 'Which best describes your situation?',
    profiles: {
      professional: {
        emoji: '👤',
        title: 'Independent professional',
        subtitle: 'Lawyer, doctor, accountant, coach, architect...',
      },
      business: {
        emoji: '🏢',
        title: 'Business owner with a team',
        subtitle: '2-50 people',
      },
      entrepreneur: {
        emoji: '🚀',
        title: 'Entrepreneur',
        subtitle: 'Growing business, small team or solo',
      },
    },
    continueButton: 'Continue',
    backButton: 'Back',

    // Tasks
    tasksTitle: 'Check everything you do in your daily work',
    tasksSubtitle: 'Every task you check is time AI can handle',
    tasksMinimum: 'Select at least 3 tasks to continue',

    // Questions
    hoursQuestion: 'How many hours do you work per week?',
    incomeQuestion: 'How much do you bill or earn per month approximately?',

    // Result
    resultTitle: 'Your MojxAI Diagnostic',
    resultHoursTitle: (hours: number) => `You're losing ${hours} hours per week`,
    resultHoursSubtitle: 'on tasks AI can handle for you',
    resultMoneyTitle: "That's",
    resultMoneySubtitle: 'in productive time you could recover',
    resultMonthly: 'per month',
    topTasksTitle: 'Your highest-impact tasks:',

    // CTA
    ctaTitle: 'Want to get that time back?',
    ctaSubtitle: 'MojxAI installs your AI system in 48 hours. Full guarantee or 100% refund.',
    ctaPrimary: 'I want it installed →',
    ctaSecondary: 'Share my diagnostic',
    disclaimer: '* Calculation based on your answers. Actual results may vary.',
  },
} as const

export type Translations = typeof translations['es']

export function t(language: Language): Translations {
  return translations[language] as Translations
}
