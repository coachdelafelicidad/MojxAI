/**
 * MojxAI — Onboarding email templates
 * Sends a personalized questionnaire to customers after payment,
 * with 4 universal questions + profile-specific questions.
 */

export type EmailPlan = 'hogar' | 'starter' | 'business'
export type EmailLang = 'es' | 'en'
export type EmailProfile =
  | 'homemaker'
  | 'parenting'
  | 'lawyer'
  | 'doctor'
  | 'accountant'
  | 'consultant'
  | 'architect'
  | 'business'

interface Question {
  num: number
  q: string
}

// ─── Universal questions (all profiles) ───────────────────────────────────────

const UNIVERSAL_ES: Question[] = [
  { num: 1, q: '¿Cuál es tu nombre completo y a qué correo quieres que enviemos tus accesos?' },
  { num: 2, q: '¿Tienes cuenta activa de Claude (claude.ai) o de ChatGPT (chat.openai.com)? Si no, te ayudamos a crearla.' },
  { num: 3, q: '¿Cuáles son las 3 tareas que más tiempo te consumen actualmente y que haces de forma manual?' },
  { num: 4, q: '¿Hay alguna forma de trabajar, estilo o tono de comunicación que debamos replicar en tu IA? (ej. formal, directo, con ejemplos, etc.)' },
]

const UNIVERSAL_EN: Question[] = [
  { num: 1, q: 'What is your full name and which email should we send your access to?' },
  { num: 2, q: 'Do you have an active Claude (claude.ai) or ChatGPT (chat.openai.com) account? If not, we\'ll help you create one.' },
  { num: 3, q: 'What are the 3 tasks that currently take up the most of your time and that you do manually?' },
  { num: 4, q: 'Is there a work style or communication tone we should replicate in your AI? (e.g. formal, direct, with examples, etc.)' },
]

// ─── Profile-specific questions ───────────────────────────────────────────────

const PROFILE_QUESTIONS: Record<EmailProfile, { es: Question[]; en: Question[] }> = {

  // ── 🏠 Ama de Casa ──────────────────────────────────────────────────────────
  homemaker: {
    es: [
      { num: 5,  q: '¿Cuántas personas viven en tu hogar y cuáles son sus edades?' },
      { num: 6,  q: '¿Cuál es tu mayor desafío en la organización del hogar? (compras, limpieza, agenda familiar, etc.)' },
      { num: 7,  q: '¿Llevas actualmente algún presupuesto familiar? ¿En papel, Excel, app?' },
      { num: 8,  q: '¿Qué tipo de comidas preparan en casa? ¿Hay restricciones alimenticias o preferencias?' },
      { num: 9,  q: '¿Tienes proveedores o servicios del hogar recurrentes (plomero, jardinero, limpieza) que quieras centralizar?' },
      { num: 10, q: '¿Cómo gestionas actualmente las citas médicas, escolares y actividades de la familia?' },
      { num: 11, q: '¿Usas alguna red social o plataforma para inspiración del hogar (Pinterest, Instagram)?' },
      { num: 12, q: '¿Hay proyectos del hogar pendientes que quieras planear con ayuda de IA? (remodelación, organización de espacios, etc.)' },
      { num: 13, q: '¿Qué dispositivos usas más: teléfono, tablet o computadora?' },
      { num: 14, q: '¿Hay algún tema del hogar en el que sientas que necesitas más apoyo o información?' },
      // Nuevos
      { num: 15, q: '🛒 ¿Investigas y comparas productos antes de comprar (electrodomésticos, muebles, tecnología)? ¿Cuánto tiempo te lleva ese proceso?' },
      { num: 16, q: '📝 ¿Tienes personal en el hogar (empleada doméstica, jardinero, niñera)? ¿Necesitas apoyo para redactar comunicados, contratos o llamadas de atención?' },
      { num: 17, q: '🎁 ¿Cómo organizas actualmente fechas especiales, regalos y celebraciones familiares? ¿Te gustaría tener un sistema para esto?' },
      { num: 18, q: '🏗️ ¿Tienes o planeas tener proyectos de remodelación o mejoras del hogar? ¿Cómo los das seguimiento actualmente?' },
      { num: 19, q: '📲 ¿Participas en grupos de WhatsApp familiares o de vecinos con mucha información? ¿Te gustaría que tu IA te ayude a filtrar y resumir lo importante?' },
    ],
    en: [
      { num: 5,  q: 'How many people live in your home and what are their ages?' },
      { num: 6,  q: 'What is your biggest challenge in managing the household? (shopping, cleaning, family schedule, etc.)' },
      { num: 7,  q: 'Do you currently keep a family budget? On paper, Excel, or an app?' },
      { num: 8,  q: 'What kind of meals do you prepare at home? Are there dietary restrictions or preferences?' },
      { num: 9,  q: 'Do you have recurring home service providers (plumber, gardener, cleaning) you want to centralize?' },
      { num: 10, q: 'How do you currently manage medical, school, and family activity appointments?' },
      { num: 11, q: 'Do you use any social platform for home inspiration (Pinterest, Instagram)?' },
      { num: 12, q: 'Are there pending home projects you want to plan with AI? (remodeling, space organization, etc.)' },
      { num: 13, q: 'Which devices do you use most: phone, tablet, or computer?' },
      { num: 14, q: 'Is there any household topic where you feel you need more support or information?' },
      // New
      { num: 15, q: '🛒 Do you research and compare products before buying (appliances, furniture, tech)? How long does that process take you?' },
      { num: 16, q: '📝 Do you have household staff (housekeeper, gardener, nanny)? Do you need help drafting communications, contracts, or formal notices?' },
      { num: 17, q: '🎁 How do you currently organize special dates, gifts, and family celebrations? Would you like a system for this?' },
      { num: 18, q: '🏗️ Do you have or plan to have home renovation or improvement projects? How do you track them today?' },
      { num: 19, q: '📲 Are you in family or neighborhood WhatsApp groups with lots of messages? Would you like your AI to help filter and summarize what matters?' },
    ],
  },

  // ── 👶 Crianza ──────────────────────────────────────────────────────────────
  parenting: {
    es: [
      { num: 5,  q: '¿Cuántos hijos tienes y cuáles son sus edades y nivel escolar?' },
      { num: 6,  q: '¿Cuáles son las actividades extracurriculares de tus hijos? ¿Cómo las organizas actualmente?' },
      { num: 7,  q: '¿Tienes pareja o co-parent? ¿Cómo coordinan las responsabilidades entre los dos?' },
      { num: 8,  q: '¿Qué aspectos del desarrollo de tus hijos te generan más preguntas o dudas? (alimentación, sueño, conducta, rendimiento escolar)' },
      { num: 9,  q: '¿Buscas recetas, actividades o ideas para niños en internet frecuentemente? ¿Cuánto tiempo te lleva?' },
      { num: 10, q: '¿Cómo preparas o apoyas a tus hijos con tareas escolares? ¿Te gustaría un sistema para esto?' },
      { num: 11, q: '¿Tienes rituales o rutinas familiares que quieras optimizar? (rutina de mañana, hora de dormir, comidas)' },
      { num: 12, q: '¿Llevas un registro de vacunas, visitas al médico y medicamentos de tus hijos?' },
      { num: 13, q: '¿Hay algún tema de crianza o educación en el que quieras que tu IA sea experta? (Montessori, inteligencia emocional, etc.)' },
      { num: 14, q: '¿Qué dispositivos usas más: teléfono, tablet o computadora? ¿Tus hijos también los usan?' },
      // Nuevos
      { num: 15, q: '🎓 ¿Has investigado o necesitas comparar escuelas, campamentos, cursos o programas educativos para tus hijos? ¿Cómo tomas esa decisión actualmente?' },
      { num: 16, q: '💬 ¿Has tenido que preparar conversaciones difíciles con tus hijos? (separación, pérdidas, sexualidad, bullying) ¿Te gustaría apoyo para estructurarlas?' },
      { num: 17, q: '📩 ¿Redactas comunicados formales a maestros, coordinadores o dirección escolar? ¿Con qué frecuencia y para qué temas?' },
      { num: 18, q: '📖 ¿Te gustaría que tu IA cree cuentos personalizados, ejercicios o material educativo adaptado a la edad de tus hijos?' },
      { num: 19, q: '🩻 Cuando tienes citas con el pediatra o especialistas, ¿preparas tus preguntas con anticipación? ¿Te gustaría apoyo para ir mejor preparado/a?' },
    ],
    en: [
      { num: 5,  q: 'How many children do you have and what are their ages and school level?' },
      { num: 6,  q: 'What extracurricular activities do your children have? How do you currently organize them?' },
      { num: 7,  q: 'Do you have a partner or co-parent? How do you coordinate responsibilities between you?' },
      { num: 8,  q: 'Which aspects of your children\'s development raise the most questions for you? (nutrition, sleep, behavior, school performance)' },
      { num: 9,  q: 'Do you frequently search online for recipes, activities, or ideas for kids? How much time does it take?' },
      { num: 10, q: 'How do you help your children with school homework? Would you like a system for this?' },
      { num: 11, q: 'Do you have family rituals or routines you want to optimize? (morning routine, bedtime, meals)' },
      { num: 12, q: 'Do you keep a record of vaccines, doctor visits, and medications for your children?' },
      { num: 13, q: 'Is there a parenting or education topic where you want your AI to be an expert? (Montessori, emotional intelligence, etc.)' },
      { num: 14, q: 'Which devices do you use most: phone, tablet, or computer? Do your children use them too?' },
      // New
      { num: 15, q: '🎓 Have you researched or do you need to compare schools, camps, courses, or educational programs for your children? How do you currently make that decision?' },
      { num: 16, q: '💬 Have you had to prepare difficult conversations with your children? (separation, loss, sexuality, bullying) Would you like support structuring them?' },
      { num: 17, q: '📩 Do you write formal communications to teachers, coordinators, or school administration? How often and for what topics?' },
      { num: 18, q: '📖 Would you like your AI to create personalized stories, exercises, or educational material adapted to your children\'s age?' },
      { num: 19, q: '🩻 When you have appointments with the pediatrician or specialists, do you prepare your questions in advance? Would you like help going in better prepared?' },
    ],
  },

  // ── ⚖️ Abogado ──────────────────────────────────────────────────────────────
  lawyer: {
    es: [
      { num: 5,  q: '¿Cuál es tu especialidad jurídica principal? (civil, penal, mercantil, corporativo, fiscal, laboral, etc.)' },
      { num: 6,  q: '¿Ejerces de forma independiente o en un despacho? ¿Cuántos asuntos manejas actualmente?' },
      { num: 7,  q: '¿Qué tipo de documentos redactas con mayor frecuencia? (contratos, demandas, dictámenes, amparos, etc.)' },
      { num: 8,  q: '¿Cuentas con un sistema de gestión de expedientes? ¿Cuál? ¿O lo llevas manualmente?' },
      { num: 9,  q: '¿En qué jurisdicción o jurisdicciones ejerces principalmente? (estado, tipo de tribunal)' },
      { num: 10, q: '¿Cuánto tiempo destinas a la semana a investigación jurídica y actualización de criterios?' },
      { num: 11, q: '¿Tienes clientes corporativos recurrentes o trabajas principalmente con personas físicas?' },
      { num: 12, q: '¿Qué procesos internos (cobro, seguimiento de expedientes, agenda de audiencias) quieres automatizar primero?' },
      { num: 13, q: '¿Usas algún software especializado de derecho? (Vlex, Kroll, IUS, etc.)' },
      { num: 14, q: '¿Tienes colaboradores o pasantes a quienes también beneficiaría el sistema de IA?' },
      // Nuevos
      { num: 15, q: '🎙️ ¿Preparas alegatos, argumentaciones o guiones para audiencias y juicios? ¿Cuánto tiempo te lleva actualmente?' },
      { num: 16, q: '💼 ¿Redactas propuestas de honorarios y contratos de servicios profesionales para nuevos clientes? ¿Los tienes estandarizados o los haces desde cero?' },
      { num: 17, q: '📬 ¿Cómo mantienes informados a tus clientes sobre el avance de sus casos? ¿Usas respuestas tipo o redactas cada actualización manualmente?' },
      { num: 18, q: '🔎 ¿Analizas contratos de la contraparte para identificar cláusulas de riesgo? ¿Con qué frecuencia y en qué tipo de asuntos?' },
      { num: 19, q: '📋 ¿Redactas minutas de reuniones con clientes o internas del despacho? ¿Te gustaría que tu IA lo haga automáticamente?' },
      { num: 20, q: '📱 ¿Tienes o te gustaría tener presencia en LinkedIn u otras redes sociales para posicionarte como experto en tu especialidad jurídica?' },
    ],
    en: [
      { num: 5,  q: 'What is your main legal specialty? (civil, criminal, corporate, tax, labor, etc.)' },
      { num: 6,  q: 'Do you practice independently or at a law firm? How many cases do you currently handle?' },
      { num: 7,  q: 'What types of documents do you draft most frequently? (contracts, pleadings, briefs, opinions, etc.)' },
      { num: 8,  q: 'Do you have a case management system? Which one? Or do you manage cases manually?' },
      { num: 9,  q: 'In which jurisdiction(s) do you primarily practice? (state, court type)' },
      { num: 10, q: 'How many hours per week do you spend on legal research and case law updates?' },
      { num: 11, q: 'Do you have recurring corporate clients or do you mainly work with individuals?' },
      { num: 12, q: 'Which internal processes (billing, case tracking, hearing schedule) do you want to automate first?' },
      { num: 13, q: 'Do you use any specialized legal software? (Westlaw, LexisNexis, Clio, etc.)' },
      { num: 14, q: 'Do you have associates or interns who would also benefit from the AI system?' },
      // New
      { num: 15, q: '🎙️ Do you prepare oral arguments, talking points, or scripts for hearings and trials? How long does that currently take?' },
      { num: 16, q: '💼 Do you draft fee proposals and professional services contracts for new clients? Do you have templates or start from scratch each time?' },
      { num: 17, q: '📬 How do you keep clients informed about case progress? Do you use template responses or draft each update manually?' },
      { num: 18, q: '🔎 Do you analyze opposing party contracts to identify risk clauses? How often and in what type of matters?' },
      { num: 19, q: '📋 Do you draft meeting minutes from client or internal firm meetings? Would you like your AI to do this automatically?' },
      { num: 20, q: '📱 Do you have or would you like a LinkedIn or social media presence to position yourself as an expert in your legal specialty?' },
    ],
  },

  // ── 🩺 Médico ───────────────────────────────────────────────────────────────
  doctor: {
    es: [
      { num: 5,  q: '¿Cuál es tu especialidad médica o área de práctica?' },
      { num: 6,  q: '¿Ejerces en consultorio privado, hospital, clínica o combinación? ¿Cuántos pacientes ves por semana?' },
      { num: 7,  q: '¿Cómo documentas actualmente tus consultas y expedientes clínicos? (papel, sistema electrónico, cuál)' },
      { num: 8,  q: '¿Tienes asistente o personal administrativo de apoyo? ¿O manejas solo la agenda y administración?' },
      { num: 9,  q: '¿Qué tipo de comunicación tienes con tus pacientes? (WhatsApp, correo, portal, call center)' },
      { num: 10, q: '¿Redactas notas de evolución, historias clínicas, recetas o informes con frecuencia? ¿Cuánto tiempo te llevan?' },
      { num: 11, q: '¿Tienes interés en investigación clínica o publicaciones? ¿Necesitas ayuda con literatura médica?' },
      { num: 12, q: '¿Manejas consentimientos informados, formatos o protocolos que se repiten regularmente?' },
      { num: 13, q: '¿Qué plataformas usas para mantenerte actualizado? (PubMed, UpToDate, Medscape, etc.)' },
      { num: 14, q: '¿Tienes objetivos de crecimiento de consulta o clínica en los próximos 12 meses?' },
      // Nuevos
      { num: 15, q: '💊 ¿Cuánto tiempo te lleva redactar recetas e indicaciones por escrito para tus pacientes? ¿Te gustaría plantillas personalizadas en lenguaje claro?' },
      { num: 16, q: '📲 ¿Recibes dudas frecuentes de pacientes por WhatsApp o correo? ¿Te gustaría tener respuestas tipo que puedas adaptar rápidamente?' },
      { num: 17, q: '🎤 ¿Participas en congresos, sesiones clínicas o webinars como ponente? ¿Con qué frecuencia y sobre qué temas?' },
      { num: 18, q: '✏️ ¿Tienes o quisieras tener artículos, casos clínicos o contenido publicado para posicionarte académica o profesionalmente?' },
      { num: 19, q: '👩‍⚕️ ¿Tienes enfermeras, médicos residentes o personal clínico a quien capacitas regularmente? ¿Cómo preparas ese material de capacitación?' },
      { num: 20, q: '📱 ¿Tienes o te gustaría tener presencia en redes sociales (Instagram, LinkedIn, TikTok) para difundir salud o posicionarte como referente en tu especialidad?' },
    ],
    en: [
      { num: 5,  q: 'What is your medical specialty or area of practice?' },
      { num: 6,  q: 'Do you practice at a private office, hospital, clinic, or a combination? How many patients do you see per week?' },
      { num: 7,  q: 'How do you currently document consultations and clinical records? (paper, electronic system, which one)' },
      { num: 8,  q: 'Do you have an assistant or administrative support staff? Or do you manage scheduling and admin alone?' },
      { num: 9,  q: 'How do you communicate with your patients? (WhatsApp, email, portal, call center)' },
      { num: 10, q: 'Do you frequently write clinical notes, medical histories, prescriptions, or reports? How long do they take?' },
      { num: 11, q: 'Are you interested in clinical research or publications? Do you need help with medical literature?' },
      { num: 12, q: 'Do you handle informed consents, forms, or protocols that repeat regularly?' },
      { num: 13, q: 'What platforms do you use to stay updated? (PubMed, UpToDate, Medscape, etc.)' },
      { num: 14, q: 'Do you have practice or clinic growth goals for the next 12 months?' },
      // New
      { num: 15, q: '💊 How long does it take you to write prescriptions and instructions for patients? Would you like personalized templates in plain language?' },
      { num: 16, q: '📲 Do you receive frequent questions from patients via WhatsApp or email? Would you like template responses you can quickly adapt?' },
      { num: 17, q: '🎤 Do you participate in conferences, clinical sessions, or webinars as a speaker? How often and on what topics?' },
      { num: 18, q: '✏️ Do you have or would you like to publish articles, clinical cases, or content to build your academic or professional profile?' },
      { num: 19, q: '👩‍⚕️ Do you have nurses, residents, or clinical staff you train regularly? How do you currently prepare training materials?' },
      { num: 20, q: '📱 Do you have or would you like a social media presence (Instagram, LinkedIn, TikTok) to share health content or position yourself as a specialist?' },
    ],
  },

  // ── 📊 Contador ─────────────────────────────────────────────────────────────
  accountant: {
    es: [
      { num: 5,  q: '¿Trabajas de forma independiente o en un despacho contable? ¿Cuántos clientes tienes actualmente?' },
      { num: 6,  q: '¿Cuáles son los servicios que ofreces con mayor frecuencia? (contabilidad, fiscal, nómina, IMSS, auditoría, etc.)' },
      { num: 7,  q: '¿Qué software o sistemas usas actualmente? (CONTPAQi, SAP, QuickBooks, Excel, DIOT, etc.)' },
      { num: 8,  q: '¿Cuánto tiempo al mes dedicas a declaraciones fiscales y cumplimiento de obligaciones?' },
      { num: 9,  q: '¿Tienes colaboradores o trabajas solo? ¿Cómo distribuyes el trabajo actualmente?' },
      { num: 10, q: '¿Qué tipo de comunicación tienes con tus clientes? ¿Cada cuánto los contactas?' },
      { num: 11, q: '¿Cuáles son los cuellos de botella más frecuentes en tu operación? (cierre contable, conciliaciones, carga masiva, etc.)' },
      { num: 12, q: '¿Preparas presentaciones, reportes financieros o análisis para tus clientes? ¿Con qué frecuencia?' },
      { num: 13, q: '¿Tienes clientes en sectores específicos que requieren conocimiento especializado? (restaurantes, inmobiliarias, manufactura, etc.)' },
      { num: 14, q: '¿Hay alguna tarea contable repetitiva que ya intentaste automatizar sin éxito?' },
      // Nuevos
      { num: 15, q: '📬 ¿Envías comunicados periódicos a tus clientes? (recordatorios de obligaciones, actualizaciones fiscales, cambios de ley) ¿Los redactas manualmente cada vez?' },
      { num: 16, q: '🤝 ¿Tienes un proceso de onboarding para clientes nuevos? (carta de bienvenida, checklist de documentos, reunión inicial) ¿O lo improvisar cada vez?' },
      { num: 17, q: '📄 ¿Preparas propuestas formales de servicios para prospectos? ¿Las tienes estandarizadas o las haces desde cero?' },
      { num: 18, q: '🏛️ ¿Has tenido que gestionar aclaraciones, revisiones o respuestas ante el SAT o autoridades fiscales? ¿Con qué frecuencia?' },
      { num: 19, q: '📊 ¿Preparas presentaciones ejecutivas de resultados financieros para los directivos de tus clientes? ¿En qué formato y periodicidad?' },
      { num: 20, q: '📱 ¿Tienes o te gustaría tener presencia en LinkedIn u otras redes para posicionarte como experto fiscal/contable y atraer nuevos clientes?' },
    ],
    en: [
      { num: 5,  q: 'Do you work independently or at an accounting firm? How many clients do you currently have?' },
      { num: 6,  q: 'What services do you offer most frequently? (bookkeeping, tax, payroll, audit, etc.)' },
      { num: 7,  q: 'What software or systems do you currently use? (QuickBooks, Xero, SAP, Excel, etc.)' },
      { num: 8,  q: 'How much time per month do you spend on tax filings and compliance obligations?' },
      { num: 9,  q: 'Do you have collaborators or do you work alone? How do you distribute workload?' },
      { num: 10, q: 'How do you communicate with your clients? How often do you contact them?' },
      { num: 11, q: 'What are the most frequent bottlenecks in your operation? (month-end close, reconciliations, data entry, etc.)' },
      { num: 12, q: 'Do you prepare presentations, financial reports, or analyses for clients? How often?' },
      { num: 13, q: 'Do you have clients in specific industries that require specialized knowledge? (restaurants, real estate, manufacturing, etc.)' },
      { num: 14, q: 'Is there a repetitive accounting task you\'ve already tried to automate without success?' },
      // New
      { num: 15, q: '📬 Do you send periodic communications to clients? (compliance reminders, tax updates, law changes) Do you draft each one manually?' },
      { num: 16, q: '🤝 Do you have an onboarding process for new clients? (welcome letter, document checklist, kick-off meeting) Or do you improvise each time?' },
      { num: 17, q: '📄 Do you prepare formal service proposals for prospects? Do you have templates or start from scratch each time?' },
      { num: 18, q: '🏛️ Have you had to manage clarifications, audits, or responses with tax authorities? How often?' },
      { num: 19, q: '📊 Do you prepare executive financial results presentations for your clients\' leadership? In what format and how often?' },
      { num: 20, q: '📱 Do you have or would you like a LinkedIn or social media presence to position yourself as a tax/accounting expert and attract new clients?' },
    ],
  },

  // ── 🎯 Consultor / Coach ─────────────────────────────────────────────────────
  consultant: {
    es: [
      { num: 5,  q: '¿Cuál es tu nicho o especialidad de consultoría/coaching? ¿A quién ayudas exactamente?' },
      { num: 6,  q: '¿Cómo entregas actualmente tu servicio? (sesiones 1:1, grupo, curso grabado, membresía, retainer, etc.)' },
      { num: 7,  q: '¿Tienes programas, módulos o metodologías propias? Descríbelos brevemente.' },
      { num: 8,  q: '¿Cómo consigues nuevos clientes actualmente? ¿Cuál es tu principal canal de ventas?' },
      { num: 9,  q: '¿Tienes contenido publicado (blog, redes, newsletter, podcast)? ¿Con qué frecuencia publicas?' },
      { num: 10, q: '¿Cuánto tiempo pasas en tareas administrativas vs. entregando valor a tus clientes?' },
      { num: 11, q: '¿Usas algún CRM o sistema para seguimiento de prospectos y clientes?' },
      { num: 12, q: '¿Tienes materiales de onboarding, bienvenida o seguimiento para nuevos clientes?' },
      { num: 13, q: '¿Qué métricas o KPIs sigues en tu negocio? ¿Cómo las mides actualmente?' },
      { num: 14, q: '¿Tienes planes de escalar o lanzar algo nuevo en los próximos 6-12 meses?' },
      // Nuevos
      { num: 15, q: '💼 ¿Preparas propuestas comerciales para clientes B2B o empresas? ¿Las tienes estandarizadas o las creas desde cero cada vez?' },
      { num: 16, q: '🤝 ¿Tienes un proceso de onboarding estructurado para nuevos clientes o alumnos? (bienvenida, materiales, primeros pasos) ¿O lo improvisar?' },
      { num: 17, q: '📄 ¿Tienes contratos de coaching o consultoría estandarizados? ¿Los redactas tú mismo o los tienes listos?' },
      { num: 18, q: '📊 ¿Analizas métricas de tus cursos, comunidad o programas para tomar decisiones de mejora? ¿Cómo lo haces actualmente?' },
      { num: 19, q: '💬 ¿Tienes respuestas tipo preparadas para las objeciones de ventas más frecuentes? (precio, tiempo, resultados, etc.)' },
    ],
    en: [
      { num: 5,  q: 'What is your consulting/coaching niche or specialty? Who exactly do you help?' },
      { num: 6,  q: 'How do you currently deliver your service? (1:1 sessions, group, recorded course, membership, retainer, etc.)' },
      { num: 7,  q: 'Do you have proprietary programs, modules, or methodologies? Describe them briefly.' },
      { num: 8,  q: 'How do you currently acquire new clients? What is your main sales channel?' },
      { num: 9,  q: 'Do you have published content (blog, social media, newsletter, podcast)? How often do you publish?' },
      { num: 10, q: 'How much time do you spend on administrative tasks vs. delivering value to clients?' },
      { num: 11, q: 'Do you use a CRM or system for tracking prospects and clients?' },
      { num: 12, q: 'Do you have onboarding, welcome, or follow-up materials for new clients?' },
      { num: 13, q: 'What metrics or KPIs do you track in your business? How do you currently measure them?' },
      { num: 14, q: 'Do you have plans to scale or launch something new in the next 6-12 months?' },
      // New
      { num: 15, q: '💼 Do you prepare commercial proposals for B2B or corporate clients? Do you have templates or create them from scratch each time?' },
      { num: 16, q: '🤝 Do you have a structured onboarding process for new clients or students? (welcome, materials, first steps) Or do you improvise?' },
      { num: 17, q: '📄 Do you have standardized coaching or consulting contracts? Do you draft them yourself or have them ready to go?' },
      { num: 18, q: '📊 Do you analyze metrics from your courses, community, or programs to make improvement decisions? How do you currently do this?' },
      { num: 19, q: '💬 Do you have prepared responses for the most common sales objections? (price, time, results, etc.)' },
    ],
  },

  // ── 📐 Arquitecto ───────────────────────────────────────────────────────────
  architect: {
    es: [
      { num: 5,  q: '¿Cuál es tu especialidad? (residencial, comercial, interiorismo, diseño urbano, BIM, obra, etc.)' },
      { num: 6,  q: '¿Trabajas de forma independiente, en despacho propio o como freelance para otros?' },
      { num: 7,  q: '¿Qué software usas en tu práctica? (AutoCAD, Revit, SketchUp, ArchiCAD, Rhino, Adobe, etc.)' },
      { num: 8,  q: '¿Cuántos proyectos manejas simultáneamente en promedio? ¿En qué etapa están?' },
      { num: 9,  q: '¿Cómo presentas tus propuestas y proyectos a clientes? (PDF, presentaciones, renders, etc.)' },
      { num: 10, q: '¿Tienes proceso de cotización, presupuesto y contratos estandarizados o cada proyecto es diferente?' },
      { num: 11, q: '¿Cómo gestionas la comunicación con clientes, contratistas y proveedores durante obra?' },
      { num: 12, q: '¿Redactas memorias descriptivas, especificaciones técnicas o bitácoras de obra con frecuencia?' },
      { num: 13, q: '¿Generas contenido para redes sociales o portfolio digital? ¿Cuánto tiempo te lleva?' },
      { num: 14, q: '¿Hay algún aspecto del negocio del diseño (finanzas, contratos, marketing) donde sientas que necesitas más apoyo?' },
      // Nuevos
      { num: 15, q: '💼 ¿Redactas propuestas de honorarios y contratos de servicios para cada proyecto? ¿Los tienes estandarizados o los haces desde cero?' },
      { num: 16, q: '📬 ¿Envías minutas de reuniones, actualizaciones de avance o reportes de obra a tus clientes? ¿Con qué frecuencia y en qué formato?' },
      { num: 17, q: '📸 ¿Publicas o te gustaría publicar contenido de tus proyectos en Instagram, LinkedIn o Houzz para atraer clientes? ¿Qué te impide hacerlo con más frecuencia?' },
      { num: 18, q: '📄 ¿Redactas especificaciones técnicas, memorias de materiales o catálogos de acabados para tus proyectos? ¿Cuánto tiempo te lleva?' },
      { num: 19, q: '👷 ¿Tienes subcontratistas o proveedores de obra a quienes das seguimiento? ¿Cómo manejas esa comunicación y documentación actualmente?' },
    ],
    en: [
      { num: 5,  q: 'What is your specialty? (residential, commercial, interior design, urban, BIM, construction, etc.)' },
      { num: 6,  q: 'Do you work independently, at your own firm, or as a freelancer for others?' },
      { num: 7,  q: 'What software do you use in your practice? (AutoCAD, Revit, SketchUp, ArchiCAD, Rhino, Adobe, etc.)' },
      { num: 8,  q: 'How many projects do you manage simultaneously on average? What stage are they at?' },
      { num: 9,  q: 'How do you present proposals and projects to clients? (PDF, presentations, renders, etc.)' },
      { num: 10, q: 'Do you have standardized quoting, budgeting, and contract processes, or does each project differ?' },
      { num: 11, q: 'How do you manage communication with clients, contractors, and suppliers during construction?' },
      { num: 12, q: 'Do you frequently write design specs, technical docs, or construction logs?' },
      { num: 13, q: 'Do you create social media content or a digital portfolio? How long does it take?' },
      { num: 14, q: 'Is there any business aspect of design (finances, contracts, marketing) where you feel you need more support?' },
      // New
      { num: 15, q: '💼 Do you draft fee proposals and service contracts for each project? Do you have templates or start from scratch each time?' },
      { num: 16, q: '📬 Do you send meeting minutes, progress updates, or construction reports to clients? How often and in what format?' },
      { num: 17, q: '📸 Do you publish or would you like to publish your project content on Instagram, LinkedIn, or Houzz to attract clients? What stops you from doing it more often?' },
      { num: 18, q: '📄 Do you write technical specifications, materials specs, or finish schedules for your projects? How long does it take?' },
      { num: 19, q: '👷 Do you have subcontractors or construction suppliers you track? How do you currently manage that communication and documentation?' },
    ],
  },

  // ── 🚀 Dueño de Negocio ─────────────────────────────────────────────────────
  business: {
    es: [
      { num: 5,  q: '¿Cuál es el giro de tu empresa y cuántas personas tiene tu equipo actualmente?' },
      { num: 6,  q: '¿Cuáles son tus 3 principales áreas de operación? (ventas, operaciones, RRHH, finanzas, marketing, etc.)' },
      { num: 7,  q: '¿Qué herramientas o software utilizan hoy en día? (CRM, ERP, Slack, Notion, G Suite, etc.)' },
      { num: 8,  q: '¿Cuáles son los roles del equipo que implementarán el sistema de IA? ¿Cuántos seats necesitas?' },
      { num: 9,  q: '¿Cuál es el mayor cuello de botella en tu operación que quieres resolver con IA?' },
      { num: 10, q: '¿Tienes procesos documentados (SOPs, manuales, flujos)? ¿En qué formato?' },
      { num: 11, q: '¿Cómo es actualmente tu proceso de ventas? ¿Dónde pierden más tiempo? (prospección, propuestas, seguimiento)' },
      { num: 12, q: '¿Qué métricas de negocio son más importantes para ti? ¿Cómo las mides actualmente?' },
      { num: 13, q: '¿Tu equipo tiene experiencia usando herramientas de IA? ¿O es el primer contacto?' },
      { num: 14, q: '¿Hay alguna iniciativa de crecimiento en los próximos 6 meses que el sistema de IA debe soportar?' },
      // Nuevos
      { num: 15, q: '📬 ¿Cómo gestionas actualmente la comunicación con clientes clave? (propuestas, seguimientos, renovaciones) ¿Tienes respuestas tipo o todo es manual?' },
      { num: 16, q: '📱 ¿Tienen presencia activa en redes sociales o marketing de contenidos? ¿Quién crea ese contenido actualmente y cuánto tiempo les lleva?' },
      { num: 17, q: '📄 ¿Redactan contratos, NDAs o acuerdos comerciales con frecuencia? ¿Los tienen estandarizados o los hacen desde cero cada vez?' },
      { num: 18, q: '📊 ¿Evalúan y comparan propuestas de proveedores o servicios regularmente? ¿Cómo toman esa decisión actualmente?' },
      { num: 19, q: '🗂️ ¿Cómo planean y dan seguimiento a proyectos internos del equipo? ¿Usan alguna herramienta de gestión o es informal?' },
    ],
    en: [
      { num: 5,  q: 'What is your company\'s industry and how many team members do you currently have?' },
      { num: 6,  q: 'What are your 3 main operational areas? (sales, operations, HR, finance, marketing, etc.)' },
      { num: 7,  q: 'What tools or software do you use today? (CRM, ERP, Slack, Notion, G Suite, etc.)' },
      { num: 8,  q: 'What team roles will be implementing the AI system? How many seats do you need?' },
      { num: 9,  q: 'What is the biggest operational bottleneck you want to solve with AI?' },
      { num: 10, q: 'Do you have documented processes (SOPs, manuals, workflows)? In what format?' },
      { num: 11, q: 'What does your current sales process look like? Where do you lose the most time? (prospecting, proposals, follow-up)' },
      { num: 12, q: 'What business metrics matter most to you? How do you currently measure them?' },
      { num: 13, q: 'Does your team have experience using AI tools? Or is this their first exposure?' },
      { num: 14, q: 'Are there any growth initiatives in the next 6 months that the AI system should support?' },
      // New
      { num: 15, q: '📬 How do you currently manage communication with key clients? (proposals, follow-ups, renewals) Do you have templates or do everything manually?' },
      { num: 16, q: '📱 Do you have an active social media or content marketing presence? Who currently creates that content and how long does it take?' },
      { num: 17, q: '📄 Do you frequently draft contracts, NDAs, or commercial agreements? Do you have templates or start from scratch each time?' },
      { num: 18, q: '📊 Do you regularly evaluate and compare vendor or service proposals? How do you currently make those decisions?' },
      { num: 19, q: '🗂️ How do you plan and track internal team projects? Do you use a management tool or is it informal?' },
    ],
  },
}

// ─── Plan display config ───────────────────────────────────────────────────────

const PLAN_LABELS: Record<EmailPlan, { es: string; en: string }> = {
  hogar:    { es: 'MojxAI HOGAR — $180 USD',          en: 'MojxAI HOME — $180 USD' },
  starter:  { es: 'MojxAI STARTER — $497 USD',        en: 'MojxAI STARTER — $497 USD' },
  business: { es: 'MojxAI FULL BUSINESS — $397/seat', en: 'MojxAI FULL BUSINESS — $397/seat' },
}

// ─── HTML template builder ────────────────────────────────────────────────────

function renderQuestions(questions: Question[]): string {
  return questions
    .map(
      ({ num, q }) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #1E1E1E;vertical-align:top;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="36" style="vertical-align:top;padding-right:12px;">
                <div style="
                  width:28px;height:28px;border-radius:8px;
                  background:#0A1A12;border:1px solid rgba(0,229,160,0.25);
                  font-family:Arial,sans-serif;font-weight:700;
                  font-size:11px;color:#00E5A0;text-align:center;
                  line-height:28px;
                ">${num}</div>
              </td>
              <td style="vertical-align:top;">
                <p style="margin:0;font-size:14px;color:#CCCCCC;line-height:1.6;">${q}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`,
    )
    .join('')
}

export function buildOnboardingEmail(opts: {
  customerName: string
  plan: EmailPlan
  language: EmailLang
  profile?: EmailProfile
}): { subject: string; html: string } {
  const { customerName, plan, language, profile } = opts
  const lang = language ?? 'es'
  const isEs = lang === 'es'

  const universal = isEs ? UNIVERSAL_ES : UNIVERSAL_EN
  const specific = profile ? (isEs ? PROFILE_QUESTIONS[profile].es : PROFILE_QUESTIONS[profile].en) : []
  const allQuestions = [...universal, ...specific]

  const planLabel = PLAN_LABELS[plan][lang]

  const subject = isEs
    ? `¡Bienvenido/a a MojxAI! 🚀 Tu cuestionario de instalación está listo`
    : `Welcome to MojxAI! 🚀 Your setup questionnaire is ready`

  const greeting = isEs
    ? `¡Hola${customerName ? `, ${customerName.split(' ')[0]}` : ''}!`
    : `Hey${customerName ? `, ${customerName.split(' ')[0]}` : ''}!`

  const intro1 = isEs
    ? `Recibimos tu pago de <strong style="color:#00E5A0">${planLabel}</strong>. Gracias por confiar en MojxAI.`
    : `We received your payment for <strong style="color:#00E5A0">${planLabel}</strong>. Thank you for trusting MojxAI.`

  const intro2 = isEs
    ? `Para instalar tu Sistema de IA en las próximas <strong>48 horas</strong>, necesitamos que respondas este cuestionario. <strong>Solo te tomará 10-15 minutos</strong> y es lo que nos permite configurar tu sistema de forma 100% personalizada.`
    : `To install your AI System in the next <strong>48 hours</strong>, we need you to answer this questionnaire. <strong>It will only take 10-15 minutes</strong> and it's what allows us to configure your system 100% to your needs.`

  const sectionTitle = isEs
    ? `Tu cuestionario de instalación`
    : `Your setup questionnaire`

  const sectionSub = isEs
    ? `Responde directamente a este correo con tus respuestas numeradas.`
    : `Reply directly to this email with your numbered answers.`

  const footerNote = isEs
    ? `¿Tienes dudas? Escríbenos por WhatsApp al <a href="https://wa.me/528145912034" style="color:#00E5A0;text-decoration:none;">+52 81 4591 2034</a> o responde a este correo.`
    : `Questions? WhatsApp us at <a href="https://wa.me/528145912034" style="color:#00E5A0;text-decoration:none;">+52 81 4591 2034</a> or reply to this email.`

  const closing = isEs
    ? `Tu sistema de IA estará listo en <strong style="color:#00E5A0">48 horas</strong> una vez que recibamos tus respuestas.`
    : `Your AI system will be ready within <strong style="color:#00E5A0">48 hours</strong> once we receive your answers.`

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#00E5A0;">
                MojxAI
              </p>
            </td>
          </tr>

          <!-- HERO CARD -->
          <tr>
            <td style="background:#141414;border:1px solid #1E1E1E;border-radius:20px;padding:36px 32px 32px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#00E5A0;">
                MojxAI
              </p>
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#FFFFFF;line-height:1.3;">
                ${greeting}
              </h1>
              <p style="margin:0 0 12px;font-size:15px;color:#CCCCCC;line-height:1.6;">
                ${intro1}
              </p>
              <p style="margin:0;font-size:14px;color:#888888;line-height:1.6;">
                ${intro2}
              </p>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- QUESTIONNAIRE CARD -->
          <tr>
            <td style="background:#141414;border:1px solid #1E1E1E;border-radius:20px;padding:32px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#00E5A0;">
                ${sectionTitle}
              </p>
              <p style="margin:0 0 24px;font-size:13px;color:#555555;">
                ${sectionSub}
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${renderQuestions(allQuestions)}
              </table>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- CLOSING CARD -->
          <tr>
            <td style="background:#0A1A12;border:1px solid rgba(0,229,160,0.2);border-radius:20px;padding:28px 32px;text-align:center;">
              <p style="margin:0 0 12px;font-size:14px;color:#CCCCCC;line-height:1.6;">
                ${closing}
              </p>
              <p style="margin:0;font-size:13px;color:#555555;line-height:1.6;">
                ${footerNote}
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#333333;">
                MojxAI · <a href="https://mojxai.vercel.app" style="color:#444;text-decoration:none;">mojxai.vercel.app</a>
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#222222;">Founded by OIG</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html }
}

export function buildAdminNotificationEmail(opts: {
  customerName: string
  customerEmail: string
  plan: EmailPlan
  language: EmailLang
  profile?: EmailProfile
  amountUsd: number
}): { subject: string; html: string } {
  const { customerName, customerEmail, plan, language, profile, amountUsd } = opts
  const planLabel = PLAN_LABELS[plan][language ?? 'es']

  const subject = `💰 Nuevo pago MojxAI — ${planLabel}`

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:32px 16px;background:#0A0A0A;font-family:Arial,sans-serif;">
  <table width="100%" style="max-width:500px;margin:0 auto;" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding-bottom:24px;">
        <p style="margin:0;font-weight:700;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#00E5A0;">MojxAI · Admin</p>
      </td>
    </tr>
    <tr>
      <td style="background:#141414;border:1px solid #1E1E1E;border-radius:16px;padding:28px;">
        <h2 style="margin:0 0 20px;font-size:20px;color:#FFFFFF;">Nuevo pago recibido 🎉</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1E1E1E;">
              <span style="color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Cliente</span><br/>
              <span style="color:#CCC;font-size:14px;">${customerName || 'N/A'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1E1E1E;">
              <span style="color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</span><br/>
              <a href="mailto:${customerEmail}" style="color:#00E5A0;font-size:14px;text-decoration:none;">${customerEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1E1E1E;">
              <span style="color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Plan</span><br/>
              <span style="color:#CCC;font-size:14px;">${planLabel}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1E1E1E;">
              <span style="color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Perfil</span><br/>
              <span style="color:#CCC;font-size:14px;">${profile ?? '—'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;">
              <span style="color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Monto</span><br/>
              <span style="color:#00E5A0;font-size:18px;font-weight:700;">$${(amountUsd / 100).toFixed(2)} USD</span>
            </td>
          </tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#0A1A12;border-radius:10px;border:1px solid rgba(0,229,160,0.2);">
          <p style="margin:0;font-size:13px;color:#888;">
            El cuestionario de onboarding ya fue enviado automáticamente al cliente.
            Revisa tu correo para el cuestionario respondido y procede con la instalación en &lt;48h.
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html }
}
