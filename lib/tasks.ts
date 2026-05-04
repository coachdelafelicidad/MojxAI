import { Task } from './types'

export const TASKS: Task[] = [
  { id: 'emails', emoji: '📧', nameEs: 'Redactar emails y seguimientos', nameEn: 'Write emails and follow-ups', hoursPerWeek: 3 },
  { id: 'proposals', emoji: '📄', nameEs: 'Crear propuestas y cotizaciones', nameEn: 'Create proposals and quotes', hoursPerWeek: 4 },
  { id: 'reports', emoji: '📊', nameEs: 'Hacer reportes y presentaciones', nameEn: 'Make reports and presentations', hoursPerWeek: 3 },
  { id: 'research', emoji: '🔍', nameEs: 'Investigar información para clientes', nameEn: 'Research info for clients', hoursPerWeek: 4 },
  { id: 'scheduling', emoji: '📅', nameEs: 'Agendar y coordinar reuniones', nameEn: 'Schedule and coordinate meetings', hoursPerWeek: 2 },
  { id: 'faq', emoji: '💬', nameEs: 'Responder preguntas frecuentes', nameEn: 'Answer frequently asked questions', hoursPerWeek: 2 },
  { id: 'social', emoji: '📱', nameEs: 'Crear contenido para redes sociales', nameEn: 'Create social media content', hoursPerWeek: 3 },
  { id: 'contracts', emoji: '📝', nameEs: 'Redactar contratos o documentos', nameEn: 'Draft contracts or documents', hoursPerWeek: 4 },
  { id: 'payments', emoji: '🧾', nameEs: 'Hacer seguimiento de cobros', nameEn: 'Follow up on payments', hoursPerWeek: 2 },
  { id: 'sales', emoji: '🎯', nameEs: 'Preparar materiales de ventas', nameEn: 'Prepare sales materials', hoursPerWeek: 3 },
  { id: 'calls', emoji: '📞', nameEs: 'Preparar llamadas con clientes', nameEn: 'Prepare client calls', hoursPerWeek: 2 },
  { id: 'admin', emoji: '🔄', nameEs: 'Tareas administrativas repetitivas', nameEn: 'Repetitive admin tasks', hoursPerWeek: 3 },
  { id: 'analytics', emoji: '📈', nameEs: 'Analizar datos y métricas', nameEn: 'Analyze data and metrics', hoursPerWeek: 3 },
  { id: 'content', emoji: '✍️', nameEs: 'Redactar contenido o artículos', nameEn: 'Write content or articles', hoursPerWeek: 4 },
  { id: 'onboarding', emoji: '🤝', nameEs: 'Onboarding de nuevos clientes', nameEn: 'Onboard new clients', hoursPerWeek: 3 },
]

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
