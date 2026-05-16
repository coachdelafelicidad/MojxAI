import { Language } from './types'

export const translations = {
  es: {
    // Progress
    stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,

    // Hero
    heroTitle: 'Tu tiempo vale demasiado para perderlo en tareas que la IA ya domina',
    heroSubtitle: 'Instalamos tu Sistema Operativo de IA en 48 horas. Sin código. Garantizado.',
    heroCtaButton: 'Calcular mi ahorro de tiempo',
    heroTrust: 'Sin registro · Sin tarjeta · Resultado en 5 min',
    heroStats: [
      { value: '48h', label: 'Instalación garantizada' },
      { value: '70%', label: 'Tareas automatizadas' },
      { value: '100%', label: 'Garantía de reembolso' },
    ],

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

    // Questions – professional
    hoursQuestion: '¿Cuántas horas trabajas por semana?',
    incomeQuestion: '¿Cuánto facturas o ganas al mes aproximadamente?',

    // Questions – home profiles
    hoursQuestionHome: '¿Cuántas horas dedicas al hogar y la familia por semana?',

    // Result
    resultTitle: 'Tu diagnóstico MojxAI',
    resultHoursTitle: (hours: number) => `Puedes recuperar ${hours} horas a la semana`,
    resultHoursSubtitle: 'en tareas que la IA puede hacer por ti',
    resultMoneyTitle: 'Equivalente en servicios externos a',
    resultMoneyTitlePro: 'Eso equivale a',
    resultMoneySubtitle: 'al mes en tiempo que podrías recuperar',
    resultMonthly: 'al mes',
    topTasksTitle: 'Tus tareas seleccionadas:',

    // CTA
    ctaTitle: '¿Quieres recuperar ese tiempo?',
    ctaSubtitle: 'MojxAI instala tu sistema de IA personalizado en 48 horas.',
    ctaPrimary: 'Quiero que me lo instalen →',
    ctaSecondary: 'Compartir mi diagnóstico',
    disclaimer: '* Cálculo basado en tus respuestas. Resultados reales pueden variar.',

    // How it works
    howItWorksTitle: '¿Cómo funciona?',
    howItWorksSteps: [
      { step: '01', title: 'Haces el diagnóstico', desc: 'Seleccionas tu perfil y las tareas que haces manualmente.' },
      { step: '02', title: 'Mandas tu solicitud', desc: 'Nos envías tu nombre y correo. En menos de 24h recibes tu liga de pago.' },
      { step: '03', title: 'Realizas el pago', desc: 'Pago único. Sin mensualidades ni sorpresas.' },
      { step: '04', title: 'Llenas el cuestionario', desc: 'Te enviamos un formulario con tus datos y acceso a Claude (negocios) o ChatGPT (hogar).' },
      { step: '05', title: 'En 48h tienes tu sistema', desc: 'Tu IA personalizada lista para trabajar contigo.' },
    ],

    // Pricing
    pricingTitle: 'Elige tu plan',
    pricingSubtitle: 'Pago único · Sin mensualidades · Implementación en 48h',
    plans: [
      {
        id: 'hogar',
        name: 'HOGAR',
        price: '$180',
        currency: 'USD',
        billing: 'pago único',
        desc: 'IA para tu hogar y familia',
        features: ['Sistema ChatGPT personalizado', 'Hasta 10 proyectos activos', 'Instalación en 48h', 'Manual de uso'],
        profiles: ['homemaker', 'parenting'],
      },
      {
        id: 'starter',
        name: 'STARTER',
        price: '$497',
        currency: 'USD',
        billing: 'pago único · 1 seat',
        desc: 'El estándar para profesionistas independientes',
        features: ['Claude Project personalizado', 'Instalación completa en 48h', 'Flujos de trabajo automatizados', 'Manual de uso personalizado', '30 días de soporte', 'Garantía 10/100'],
        profiles: ['lawyer', 'doctor', 'accountant', 'consultant', 'architect'],
        popular: true,
      },
      {
        id: 'business',
        name: 'FULL BUSINESS',
        price: '$397',
        currency: 'USD',
        billing: '/ seat · mínimo 3 seats',
        desc: 'Para empresas que escalan con IA',
        features: ['Todo en Starter', 'ADN compartido entre roles', 'Manuales por rol', 'Onboarding de equipo', 'Soporte prioritario', 'Dashboard de productividad'],
        profiles: ['business'],
      },
    ],

    // Guarantee
    guaranteeTitle: 'Garantía 10/100',
    guaranteeDesc: 'Si en 30 días no ahorras al menos 10 horas semanales, te devolvemos el 100%. Sin preguntas.',
    guaranteeBadges: ['Sin burocracia', 'Sin letras pequeñas', 'Reembolso en 48h'],

    // FAQ
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Necesito saber de tecnología o programación?',
        a: 'No. MojxAI se encarga de toda la configuración técnica. Tú solo necesitas tener una cuenta de Claude (negocios) o ChatGPT (hogar). Nosotros la dejamos lista para ti.',
      },
      {
        q: '¿Qué plataforma usan?',
        a: 'Para perfiles de negocios, profesionistas y emprendedores usamos Claude (Anthropic). Para hogar y crianza usamos ChatGPT (OpenAI). Ambas son las mejores en su categoría.',
      },
      {
        q: '¿Cuánto tiempo tarda la instalación?',
        a: 'Una vez que recibimos tu cuestionario completo con tus accesos, tu sistema estará listo en menos de 48 horas.',
      },
      {
        q: '¿Puedo elegir mis 10 proyectos después del pago?',
        a: 'Sí. En el cuestionario post-pago seleccionas exactamente cuáles de los proyectos de tu perfil quieres activar. Puedes cambiarlos más adelante por un costo adicional.',
      },
      {
        q: '¿Qué pasa si quiero más de 10 proyectos?',
        a: 'El plan incluye hasta 10 proyectos activos. Si quieres agregar más, puedes adquirir proyectos adicionales a precio especial.',
      },
    ],
  },

  en: {
    // Progress
    stepOf: (current: number, total: number) => `Step ${current} of ${total}`,

    // Hero
    heroTitle: 'Your time is too valuable to waste on tasks AI already dominates',
    heroSubtitle: 'We install your AI Operating System in 48 hours. No code. Guaranteed.',
    heroCtaButton: 'Calculate my time savings',
    heroTrust: 'No registration · No credit card · Result in 5 min',
    heroStats: [
      { value: '48h', label: 'Guaranteed installation' },
      { value: '70%', label: 'Tasks automated' },
      { value: '100%', label: 'Refund guarantee' },
    ],

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

    // Questions – professional
    hoursQuestion: 'How many hours do you work per week?',
    incomeQuestion: 'How much do you bill or earn per month approximately?',

    // Questions – home profiles
    hoursQuestionHome: 'How many hours per week do you dedicate to home & family tasks?',

    // Result
    resultTitle: 'Your MojxAI Diagnostic',
    resultHoursTitle: (hours: number) => `You can recover ${hours} hours per week`,
    resultHoursSubtitle: 'on tasks AI can handle for you',
    resultMoneyTitle: 'Equivalent in external services to',
    resultMoneyTitlePro: "That's",
    resultMoneySubtitle: 'per month in time you could recover',
    resultMonthly: 'per month',
    topTasksTitle: 'Your selected tasks:',

    // CTA
    ctaTitle: 'Want to get that time back?',
    ctaSubtitle: 'MojxAI installs your personalized AI system in 48 hours.',
    ctaPrimary: 'I want it installed →',
    ctaSecondary: 'Share my diagnostic',
    disclaimer: '* Calculation based on your answers. Actual results may vary.',

    // How it works
    howItWorksTitle: 'How does it work?',
    howItWorksSteps: [
      { step: '01', title: 'Take the diagnostic', desc: 'Select your profile and the tasks you currently do manually.' },
      { step: '02', title: 'Send your request', desc: 'Send us your name and email. Within 24h you receive your payment link.' },
      { step: '03', title: 'Make the payment', desc: 'One-time payment. No monthly fees or surprises.' },
      { step: '04', title: 'Fill the questionnaire', desc: 'We send you a form for your info and access to Claude (business) or ChatGPT (home).' },
      { step: '05', title: 'Your system in 48h', desc: 'Your personalized AI ready to work with you.' },
    ],

    // Pricing
    pricingTitle: 'Choose your plan',
    pricingSubtitle: 'One-time payment · No subscriptions · Setup in 48h',
    plans: [
      {
        id: 'hogar',
        name: 'HOME',
        price: '$180',
        currency: 'USD',
        billing: 'one-time payment',
        desc: 'AI for your home & family',
        features: ['Personalized ChatGPT system', 'Up to 10 active projects', '48h installation', 'Usage manual'],
        profiles: ['homemaker', 'parenting'],
      },
      {
        id: 'starter',
        name: 'STARTER',
        price: '$497',
        currency: 'USD',
        billing: 'one-time · 1 seat',
        desc: 'The standard for independent professionals',
        features: ['Personalized Claude Project', 'Full installation in 48h', 'Automated workflows', 'Custom usage manual', '30 days of support', '10/100 Guarantee'],
        profiles: ['lawyer', 'doctor', 'accountant', 'consultant', 'architect'],
        popular: true,
      },
      {
        id: 'business',
        name: 'FULL BUSINESS',
        price: '$397',
        currency: 'USD',
        billing: '/ seat · min 3 seats',
        desc: 'For companies scaling with AI',
        features: ['Everything in Starter', 'Shared DNA across roles', 'Role-specific manuals', 'Full team onboarding', 'Priority support', 'Productivity dashboard'],
        profiles: ['business'],
      },
    ],

    // Guarantee
    guaranteeTitle: '10/100 Guarantee',
    guaranteeDesc: 'If in 30 days you don\'t save at least 10 hours per week, we refund 100%. No questions asked.',
    guaranteeBadges: ['No bureaucracy', 'No fine print', 'Refund in 48h'],

    // FAQ
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do I need to know about technology or coding?',
        a: 'No. MojxAI handles all the technical setup. You just need a Claude (business) or ChatGPT (home) account. We\'ll have it ready for you.',
      },
      {
        q: 'What platform do you use?',
        a: 'For business, professional, and entrepreneur profiles we use Claude (Anthropic). For home and parenting we use ChatGPT (OpenAI). Both are best-in-class.',
      },
      {
        q: 'How long does installation take?',
        a: 'Once we receive your completed questionnaire with your access, your system will be ready in less than 48 hours.',
      },
      {
        q: 'Can I choose my 10 projects after payment?',
        a: 'Yes. In the post-payment questionnaire you select exactly which projects from your profile you want to activate. You can change them later for an additional cost.',
      },
      {
        q: 'What if I want more than 10 projects?',
        a: 'The plan includes up to 10 active projects. If you want more, you can purchase additional projects at a special price.',
      },
    ],
  },
} as const

export type Translations = typeof translations['es']

export function t(language: Language): Translations {
  return translations[language] as Translations
}
