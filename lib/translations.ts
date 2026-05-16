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
      homemaker: {
        emoji: '🏠',
        title: 'Ama de casa',
        subtitle: 'Operación, mantenimiento y orden del hogar',
      },
      parenting: {
        emoji: '👶',
        title: 'Crianza / Mamá · Papá',
        subtitle: 'Desarrollo infantil, escuela y familia',
      },
      lawyer: {
        emoji: '⚖️',
        title: 'Abogado / Jurídico',
        subtitle: 'Litigio, contratos y asesoría legal',
      },
      doctor: {
        emoji: '🩺',
        title: 'Médico / Profesional de salud',
        subtitle: 'Consulta, investigación y pacientes',
      },
      accountant: {
        emoji: '📊',
        title: 'Contador / Financiero',
        subtitle: 'Contabilidad, fiscal y finanzas empresariales',
      },
      consultant: {
        emoji: '🎯',
        title: 'Consultor / Coach',
        subtitle: 'Programas, cursos y mentoría',
      },
      architect: {
        emoji: '📐',
        title: 'Arquitecto / Diseñador',
        subtitle: 'Obra, diseño de interiores y proyectos',
      },
      business: {
        emoji: '🚀',
        title: 'Dueño de negocio / Emprendedor',
        subtitle: 'Empresa con equipo, operaciones y ventas',
      },
    },
    continueButton: 'Continuar',
    backButton: 'Atrás',
    homeButton: 'Volver al inicio',

    // Tasks
    tasksTitle: 'Marca todo lo que haces actualmente de forma manual',
    tasksSubtitle: 'Cada tarea que marcas es tiempo que la IA puede hacer por ti',
    tasksMinimum: 'Selecciona al menos 3 tareas para continuar',

    // Questions
    hoursQuestion: '¿Cuántas horas trabajas por semana?',
    incomeQuestion: '¿Cuánto facturas o ganas al mes aproximadamente?',

    // Result
    resultTitle: 'Tu diagnóstico MojxAI',
    resultHoursTitle: (hours: number) => `Estás perdiendo ${hours} horas a la semana`,
    resultHoursSubtitle: 'en tareas que la IA puede hacer por ti',
    resultMoneyTitle: 'Eso equivale a',
    resultMoneySubtitle: 'en tiempo productivo que podrías recuperar cada mes',
    resultMonthly: 'al mes',
    topTasksTitle: 'Tus tareas seleccionadas:',

    // CTA
    ctaTitle: '¿Quieres recuperar ese tiempo?',
    ctaSubtitle: 'MojxAI instala tu sistema de IA en 48 horas. Garantía 10/100: si no ahorras 10h/semana, te devolvemos el 100%.',
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
      homemaker: {
        emoji: '🏠',
        title: 'Stay-at-home mom / Homemaker',
        subtitle: 'Home operations, maintenance & organization',
      },
      parenting: {
        emoji: '👶',
        title: 'Parenting / Mom · Dad',
        subtitle: 'Child development, school & family',
      },
      lawyer: {
        emoji: '⚖️',
        title: 'Lawyer / Legal professional',
        subtitle: 'Litigation, contracts & legal advisory',
      },
      doctor: {
        emoji: '🩺',
        title: 'Doctor / Health professional',
        subtitle: 'Practice, research & patient care',
      },
      accountant: {
        emoji: '📊',
        title: 'Accountant / Financial advisor',
        subtitle: 'Accounting, taxes & business finance',
      },
      consultant: {
        emoji: '🎯',
        title: 'Consultant / Coach',
        subtitle: 'Programs, courses & mentoring',
      },
      architect: {
        emoji: '📐',
        title: 'Architect / Designer',
        subtitle: 'Construction, interior design & projects',
      },
      business: {
        emoji: '🚀',
        title: 'Business owner / Entrepreneur',
        subtitle: 'Company with team, operations & sales',
      },
    },
    continueButton: 'Continue',
    backButton: 'Back',
    homeButton: 'Back to home',

    // Tasks
    tasksTitle: 'Check everything you currently do manually',
    tasksSubtitle: 'Every task you check is time AI can handle for you',
    tasksMinimum: 'Select at least 3 tasks to continue',

    // Questions
    hoursQuestion: 'How many hours do you work per week?',
    incomeQuestion: 'How much do you bill or earn per month approximately?',

    // Result
    resultTitle: 'Your MojxAI Diagnostic',
    resultHoursTitle: (hours: number) => `You're losing ${hours} hours per week`,
    resultHoursSubtitle: 'on tasks AI can handle for you',
    resultMoneyTitle: "That's",
    resultMoneySubtitle: 'in productive time you could recover each month',
    resultMonthly: 'per month',
    topTasksTitle: 'Your selected tasks:',

    // CTA
    ctaTitle: 'Want to get that time back?',
    ctaSubtitle: 'MojxAI installs your AI system in 48 hours. 10/100 Guarantee: if you don\'t save 10h/week, we refund 100%.',
    ctaPrimary: 'I want it installed →',
    ctaSecondary: 'Share my diagnostic',
    disclaimer: '* Calculation based on your answers. Actual results may vary.',
  },
} as const

export type Translations = typeof translations['es']

export function t(language: Language): Translations {
  return translations[language] as Translations
}
