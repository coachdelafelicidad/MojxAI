import { Task, Profile } from './types'

export const TASKS_BY_PROFILE: Record<Profile, Task[]> = {
  homemaker: [
    { id: 'hm_menus', emoji: '🍳', nameEs: 'Planificar menús y lista del súper', nameEn: 'Plan menus & grocery list', hoursPerWeek: 3 },
    { id: 'hm_staff', emoji: '🧹', nameEs: 'Coordinar y supervisar al personal del hogar', nameEn: 'Coordinate & supervise household staff', hoursPerWeek: 2 },
    { id: 'hm_budget', emoji: '💰', nameEs: 'Gestionar presupuesto y gastos del hogar', nameEn: 'Manage home budget & expenses', hoursPerWeek: 3 },
    { id: 'hm_pantry', emoji: '📦', nameEs: 'Organizar despensa y evitar compras dobles', nameEn: 'Organize pantry & avoid double-buying', hoursPerWeek: 2 },
    { id: 'hm_maintenance', emoji: '🔧', nameEs: 'Dar seguimiento a servicios y mantenimiento', nameEn: 'Track maintenance & home services', hoursPerWeek: 2 },
    { id: 'hm_spaces', emoji: '🏠', nameEs: 'Organizar espacios y sistemas del hogar', nameEn: 'Organize home spaces & systems', hoursPerWeek: 3 },
    { id: 'hm_utilities', emoji: '💡', nameEs: 'Analizar recibos de luz, agua y gas', nameEn: 'Analyze utility bills', hoursPerWeek: 1 },
    { id: 'hm_documents', emoji: '📁', nameEs: 'Organizar documentos importantes del hogar', nameEn: 'Organize important home documents', hoursPerWeek: 2 },
    { id: 'hm_pets', emoji: '🐾', nameEs: 'Llevar registros de mascotas y plantas', nameEn: 'Track pet care & plants', hoursPerWeek: 1 },
    { id: 'hm_vehicles', emoji: '🚗', nameEs: 'Controlar vehículos, tenencias y servicios', nameEn: 'Track vehicles, registrations & services', hoursPerWeek: 1 },
    { id: 'hm_cleaning', emoji: '🧺', nameEs: 'Crear rutinas y checklists de limpieza', nameEn: 'Create cleaning routines & checklists', hoursPerWeek: 2 },
    { id: 'hm_nutrition', emoji: '🥗', nameEs: 'Revisar etiquetas y opciones saludables', nameEn: 'Review labels & healthy options', hoursPerWeek: 2 },
  ],

  parenting: [
    { id: 'pr_logistics', emoji: '🗓️', nameEs: 'Coordinar logística escolar y actividades', nameEn: 'Coordinate school logistics & activities', hoursPerWeek: 3 },
    { id: 'pr_health', emoji: '🩺', nameEs: 'Investigar síntomas y calcular dosis de medicamentos', nameEn: 'Research symptoms & calculate medication doses', hoursPerWeek: 2 },
    { id: 'pr_circulares', emoji: '📋', nameEs: 'Leer circulares y filtrar chats de padres', nameEn: 'Read school circulars & filter parent group chats', hoursPerWeek: 2 },
    { id: 'pr_parenting', emoji: '🧠', nameEs: 'Buscar estrategias de crianza respetuosa', nameEn: 'Research conscious parenting strategies', hoursPerWeek: 3 },
    { id: 'pr_activities', emoji: '🎨', nameEs: 'Planear actividades educativas sin pantallas', nameEn: 'Plan screen-free educational activities', hoursPerWeek: 2 },
    { id: 'pr_agenda', emoji: '📅', nameEs: 'Gestionar agenda y compromisos familiares', nameEn: 'Manage family schedule & commitments', hoursPerWeek: 2 },
    { id: 'pr_travel', emoji: '✈️', nameEs: 'Planear viajes y vacaciones familiares', nameEn: 'Plan family trips & vacations', hoursPerWeek: 2 },
    { id: 'pr_parties', emoji: '🎂', nameEs: 'Organizar fiestas y eventos infantiles', nameEn: 'Organize kids\' parties & events', hoursPerWeek: 2 },
    { id: 'pr_homework', emoji: '📚', nameEs: 'Apoyar con tareas y materias escolares', nameEn: 'Help with homework & school subjects', hoursPerWeek: 3 },
    { id: 'pr_development', emoji: '🌱', nameEs: 'Buscar recursos sobre desarrollo infantil', nameEn: 'Research child development resources', hoursPerWeek: 2 },
    { id: 'pr_sleep', emoji: '💤', nameEs: 'Gestionar rutinas de sueño y horarios', nameEn: 'Manage sleep routines & schedules', hoursPerWeek: 1 },
    { id: 'pr_nutrition', emoji: '🥦', nameEs: 'Crear menús para niños comensales selectivos', nameEn: 'Create menus for picky eaters', hoursPerWeek: 2 },
  ],

  lawyer: [
    { id: 'lw_expedientes', emoji: '📁', nameEs: 'Revisar y resumir expedientes legales', nameEn: 'Review & summarize legal files', hoursPerWeek: 5 },
    { id: 'lw_drafting', emoji: '📝', nameEs: 'Redactar demandas, contratos y documentos', nameEn: 'Draft lawsuits, contracts & legal documents', hoursPerWeek: 4 },
    { id: 'lw_research', emoji: '🔍', nameEs: 'Buscar jurisprudencia y precedentes', nameEn: 'Research case law & precedents', hoursPerWeek: 3 },
    { id: 'lw_deadlines', emoji: '📅', nameEs: 'Calcular términos y fechas procesales', nameEn: 'Calculate procedural deadlines', hoursPerWeek: 2 },
    { id: 'lw_onboarding', emoji: '🤝', nameEs: 'Onboarding y cuestionarios de clientes nuevos', nameEn: 'Client onboarding & intake questionnaires', hoursPerWeek: 2 },
    { id: 'lw_oficio', emoji: '🏛️', nameEs: 'Redactar oficios y comunicaciones con autoridades', nameEn: 'Draft communications with authorities', hoursPerWeek: 3 },
    { id: 'lw_diligence', emoji: '🗂️', nameEs: 'Hacer due diligence de documentos', nameEn: 'Document due diligence', hoursPerWeek: 4 },
    { id: 'lw_billing', emoji: '⏱️', nameEs: 'Registrar horas facturables por cliente', nameEn: 'Track billable hours per client', hoursPerWeek: 2 },
    { id: 'lw_regulatory', emoji: '📡', nameEs: 'Seguimiento a cambios normativos (DOF)', nameEn: 'Track regulatory changes', hoursPerWeek: 2 },
    { id: 'lw_notary', emoji: '🖊️', nameEs: 'Preparar documentos para escrituración', nameEn: 'Prepare documents for notarization', hoursPerWeek: 3 },
    { id: 'lw_evidence', emoji: '📋', nameEs: 'Clasificar y organizar pruebas y anexos', nameEn: 'Classify & organize evidence & attachments', hoursPerWeek: 3 },
    { id: 'lw_transcripts', emoji: '🎙️', nameEs: 'Resumir audiencias y extraer puntos clave', nameEn: 'Summarize hearings & extract key points', hoursPerWeek: 3 },
  ],

  doctor: [
    { id: 'dr_history', emoji: '📋', nameEs: 'Resumir historias clínicas extensas', nameEn: 'Summarize lengthy medical records', hoursPerWeek: 4 },
    { id: 'dr_research', emoji: '🔬', nameEs: 'Buscar y resumir guías clínicas y papers', nameEn: 'Research & summarize clinical guidelines & papers', hoursPerWeek: 3 },
    { id: 'dr_notes', emoji: '🎤', nameEs: 'Redactar notas clínicas estructuradas', nameEn: 'Write structured clinical notes', hoursPerWeek: 3 },
    { id: 'dr_explain', emoji: '💬', nameEs: 'Explicar diagnósticos en lenguaje simple al paciente', nameEn: 'Explain diagnoses in simple language to patients', hoursPerWeek: 2 },
    { id: 'dr_interactions', emoji: '💊', nameEs: 'Verificar interacciones entre medicamentos', nameEn: 'Check drug interactions', hoursPerWeek: 2 },
    { id: 'dr_consents', emoji: '📄', nameEs: 'Generar consentimientos informados', nameEn: 'Generate informed consent forms', hoursPerWeek: 2 },
    { id: 'dr_followup', emoji: '📈', nameEs: 'Dar seguimiento a pacientes crónicos', nameEn: 'Follow up with chronic patients', hoursPerWeek: 3 },
    { id: 'dr_insurance', emoji: '📑', nameEs: 'Redactar cartas para seguros médicos', nameEn: 'Write letters for medical insurance', hoursPerWeek: 2 },
    { id: 'dr_content', emoji: '📱', nameEs: 'Crear contenido educativo en salud para redes', nameEn: 'Create educational health content for social media', hoursPerWeek: 3 },
    { id: 'dr_referrals', emoji: '🔗', nameEs: 'Gestionar interconsultas con especialistas', nameEn: 'Manage specialist referrals', hoursPerWeek: 2 },
    { id: 'dr_labs', emoji: '🧪', nameEs: 'Interpretar tendencias en laboratorios', nameEn: 'Interpret lab result trends', hoursPerWeek: 3 },
    { id: 'dr_differential', emoji: '🔭', nameEs: 'Preparar diagnósticos diferenciales', nameEn: 'Prepare differential diagnoses', hoursPerWeek: 2 },
  ],

  accountant: [
    { id: 'ac_reconcile', emoji: '🔍', nameEs: 'Cruzar facturas vs estados de cuenta', nameEn: 'Reconcile invoices vs bank statements', hoursPerWeek: 4 },
    { id: 'ac_payroll', emoji: '👥', nameEs: 'Calcular nóminas, IMSS y retenciones', nameEn: 'Calculate payroll, taxes & withholdings', hoursPerWeek: 3 },
    { id: 'ac_cashflow', emoji: '📊', nameEs: 'Hacer proyecciones de flujo de caja', nameEn: 'Create cash flow projections', hoursPerWeek: 3 },
    { id: 'ac_reports', emoji: '📋', nameEs: 'Preparar reportes financieros ejecutivos', nameEn: 'Prepare executive financial reports', hoursPerWeek: 3 },
    { id: 'ac_sat', emoji: '📡', nameEs: 'Revisar cambios en SAT y miscelánea fiscal', nameEn: 'Track SAT & tax regulation changes', hoursPerWeek: 2 },
    { id: 'ac_assets', emoji: '🏭', nameEs: 'Calcular depreciaciones de activos fijos', nameEn: 'Calculate fixed asset depreciation', hoursPerWeek: 2 },
    { id: 'ac_budget', emoji: '📉', nameEs: 'Analizar desviaciones presupuestales', nameEn: 'Analyze budget vs actual deviations', hoursPerWeek: 2 },
    { id: 'ac_collections', emoji: '📨', nameEs: 'Gestionar cobranza y cuentas por cobrar', nameEn: 'Manage collections & accounts receivable', hoursPerWeek: 3 },
    { id: 'ac_roi', emoji: '📈', nameEs: 'Analizar ROI y viabilidad de proyectos', nameEn: 'Analyze ROI & project viability', hoursPerWeek: 3 },
    { id: 'ac_expenses', emoji: '🗂️', nameEs: 'Categorizar gastos por centro de costos', nameEn: 'Categorize expenses by cost center', hoursPerWeek: 2 },
    { id: 'ac_taxes', emoji: '♟️', nameEs: 'Simular escenarios de optimización fiscal', nameEn: 'Simulate tax optimization scenarios', hoursPerWeek: 3 },
    { id: 'ac_audit', emoji: '📝', nameEs: 'Preparar evidencia para auditorías', nameEn: 'Prepare audit evidence & documentation', hoursPerWeek: 3 },
  ],

  consultant: [
    { id: 'co_content', emoji: '🎬', nameEs: 'Crear contenido para redes, programas y comunidades', nameEn: 'Create content for social, programs & communities', hoursPerWeek: 4 },
    { id: 'co_emails', emoji: '📧', nameEs: 'Redactar secuencias de email marketing', nameEn: 'Write email marketing sequences', hoursPerWeek: 3 },
    { id: 'co_workshops', emoji: '🎯', nameEs: 'Diseñar materiales y dinámicas para sesiones grupales', nameEn: 'Design materials & dynamics for group sessions', hoursPerWeek: 3 },
    { id: 'co_followup', emoji: '✅', nameEs: 'Dar seguimiento a clientes y miembros activos', nameEn: 'Follow up with clients & active members', hoursPerWeek: 2 },
    { id: 'co_leadmagnets', emoji: '🧲', nameEs: 'Crear recursos gratuitos y lead magnets', nameEn: 'Create lead magnets & free resources', hoursPerWeek: 3 },
    { id: 'co_webinar', emoji: '💻', nameEs: 'Escribir guiones para webinars y videos', nameEn: 'Write webinar & video scripts', hoursPerWeek: 3 },
    { id: 'co_community', emoji: '👥', nameEs: 'Gestionar comunidad y miembros activos', nameEn: 'Manage active community & members', hoursPerWeek: 2 },
    { id: 'co_ads', emoji: '📣', nameEs: 'Redactar anuncios de alta conversión (FB/IG)', nameEn: 'Write high-conversion ads (FB/IG)', hoursPerWeek: 3 },
    { id: 'co_coaching', emoji: '❓', nameEs: 'Preparar preguntas poderosas por sesión 1:1', nameEn: 'Prepare powerful questions per 1:1 session', hoursPerWeek: 2 },
    { id: 'co_methodology', emoji: '🏗️', nameEs: 'Estructurar metodología en pasos vendibles', nameEn: 'Structure methodology into sellable steps', hoursPerWeek: 3 },
    { id: 'co_bio', emoji: '✨', nameEs: 'Redactar bio y kit de speaker profesional', nameEn: 'Write professional bio & speaker kit', hoursPerWeek: 2 },
    { id: 'co_pricing', emoji: '💰', nameEs: 'Analizar estrategia de precios y productos', nameEn: 'Analyze pricing strategy & products', hoursPerWeek: 2 },
  ],

  architect: [
    { id: 'ar_zoning', emoji: '📐', nameEs: 'Revisar reglamentos de uso de suelo', nameEn: 'Review zoning & land use regulations', hoursPerWeek: 3 },
    { id: 'ar_materials', emoji: '🧱', nameEs: 'Comparar materiales, proveedores y costos', nameEn: 'Compare materials, suppliers & costs', hoursPerWeek: 3 },
    { id: 'ar_logs', emoji: '👷', nameEs: 'Hacer bitácoras y reportes de avance de obra', nameEn: 'Write construction logs & progress reports', hoursPerWeek: 3 },
    { id: 'ar_budget', emoji: '💰', nameEs: 'Monitorear presupuesto y excedentes de obra', nameEn: 'Monitor construction budget & overruns', hoursPerWeek: 2 },
    { id: 'ar_narrative', emoji: '📖', nameEs: 'Redactar narrativa de proyectos para clientes', nameEn: 'Write project narrative for clients', hoursPerWeek: 2 },
    { id: 'ar_permits', emoji: '📋', nameEs: 'Gestionar trámites y licencias municipales', nameEn: 'Manage permits & municipal licenses', hoursPerWeek: 3 },
    { id: 'ar_quotes', emoji: '📨', nameEs: 'Solicitar y comparar cotizaciones de obra', nameEn: 'Request & compare construction quotes', hoursPerWeek: 3 },
    { id: 'ar_safety', emoji: '🦺', nameEs: 'Checklists de seguridad e higiene en obra', nameEn: 'Safety & hygiene checklists on site', hoursPerWeek: 2 },
    { id: 'ar_approvals', emoji: '✔️', nameEs: 'Gestionar cambios y aprobaciones de diseño', nameEn: 'Manage design changes & client approvals', hoursPerWeek: 2 },
    { id: 'ar_portfolio', emoji: '🏆', nameEs: 'Redactar proyectos para portfolio y revistas', nameEn: 'Write projects for portfolio & publications', hoursPerWeek: 3 },
    { id: 'ar_interior', emoji: '🛋️', nameEs: 'Curar mobiliario por estilo y presupuesto', nameEn: 'Curate furniture by style & budget', hoursPerWeek: 2 },
    { id: 'ar_space', emoji: '📏', nameEs: 'Analizar flujos y eficiencia de espacios en planta', nameEn: 'Analyze floor plan flows & space efficiency', hoursPerWeek: 3 },
  ],

  business: [
    { id: 'bz_sops', emoji: '📋', nameEs: 'Crear manuales de operación (SOPs) para el equipo', nameEn: 'Create standard operating procedures (SOPs)', hoursPerWeek: 4 },
    { id: 'bz_hiring', emoji: '👤', nameEs: 'Filtrar CVs y gestionar reclutamiento', nameEn: 'Screen CVs & manage recruitment', hoursPerWeek: 3 },
    { id: 'bz_meetings', emoji: '📅', nameEs: 'Preparar agendas y minutas de reuniones', nameEn: 'Prepare meeting agendas & minutes', hoursPerWeek: 2 },
    { id: 'bz_comms', emoji: '✍️', nameEs: 'Redactar comunicados internos y externos', nameEn: 'Write internal & external communications', hoursPerWeek: 2 },
    { id: 'bz_kpis', emoji: '📊', nameEs: 'Dar seguimiento a KPIs y métricas del negocio', nameEn: 'Track business KPIs & metrics', hoursPerWeek: 3 },
    { id: 'bz_crisis', emoji: '🚨', nameEs: 'Atender quejas y crisis de clientes', nameEn: 'Handle client complaints & crises', hoursPerWeek: 2 },
    { id: 'bz_investors', emoji: '📈', nameEs: 'Preparar presentaciones para inversores o socios', nameEn: 'Prepare investor & partner presentations', hoursPerWeek: 3 },
    { id: 'bz_vendors', emoji: '🤝', nameEs: 'Negociar con proveedores y reducir costos', nameEn: 'Negotiate with vendors & reduce costs', hoursPerWeek: 2 },
    { id: 'bz_risk', emoji: '⚠️', nameEs: 'Identificar y mitigar riesgos del negocio', nameEn: 'Identify & mitigate business risks', hoursPerWeek: 2 },
    { id: 'bz_profit', emoji: '💰', nameEs: 'Analizar dónde se pierde utilidad y cómo recuperarla', nameEn: 'Analyze where profit is lost & how to recover it', hoursPerWeek: 3 },
    { id: 'bz_sales', emoji: '💬', nameEs: 'Crear guiones de cierre de ventas para el equipo', nameEn: 'Create sales closing scripts for the team', hoursPerWeek: 3 },
    { id: 'bz_innovation', emoji: '💡', nameEs: 'Investigar nuevos productos y servicios', nameEn: 'Research new products & services', hoursPerWeek: 3 },
  ],
}

// All tasks combined (for backward compat)
export const TASKS = Object.values(TASKS_BY_PROFILE).flat()

export function getTasksForProfile(profile: Profile | null): Task[] {
  if (!profile) return TASKS_BY_PROFILE.business
  return TASKS_BY_PROFILE[profile] ?? TASKS_BY_PROFILE.business
}

export function getTaskById(id: string): Task | undefined {
  return TASKS.find(t => t.id === id)
}

export function getTopTasks(selectedIds: string[], count: number = 3): Task[] {
  return selectedIds
    .map(id => TASKS.find(t => t.id === id))
    .filter((t): t is Task => t !== undefined)
    .sort((a, b) => b.hoursPerWeek - a.hoursPerWeek)
    .slice(0, count)
}
