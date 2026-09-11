import type { LucideIcon } from 'lucide-react'
import {
  Apple,
  Armchair,
  Baby,
  BarChart3,
  BookOpen,
  Brain,
  BrickWall,
  Briefcase,
  Cake,
  Calculator,
  Calendar,
  CalendarDays,
  Car,
  CircleCheck,
  CircleDollarSign,
  CircleHelp,
  Clapperboard,
  ClipboardCheck,
  ClipboardList,
  Compass,
  DollarSign,
  Factory,
  FileCheck,
  FilePen,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Folder,
  FolderOpen,
  Folders,
  FolderTree,
  Handshake,
  HardHat,
  Home,
  Inbox,
  Landmark,
  Layers,
  Lightbulb,
  Link,
  ListChecks,
  Magnet,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Mic,
  Microscope,
  Monitor,
  Moon,
  Move,
  Package,
  Palette,
  PawPrint,
  PenLine,
  Pill,
  Plane,
  Presentation,
  Radio,
  Ruler,
  Salad,
  Scale,
  Search,
  ShieldCheck,
  Siren,
  Smartphone,
  Sparkles,
  Sprout,
  Stethoscope,
  Target,
  Telescope,
  Timer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Trophy,
  UserRound,
  Users,
  Utensils,
  Wallet,
  Wrench,
} from 'lucide-react'
import type { Profile } from './types'

/** MojxAI mint accent — Tailwind `accent` token (same hex used across the diagnostic UI). */
export const ACCENT = '#00E5A0'
export const ICON_BASE = '#555555'
export const ICON_SIZE = 20
export const ICON_STROKE = 1.75

export function TaskIcon({
  id,
  active = false,
  className,
}: {
  id: string
  active?: boolean
  className?: string
}) {
  const Icon = TASK_ICONS[id] ?? FileText
  return (
    <Icon
      size={ICON_SIZE}
      strokeWidth={ICON_STROKE}
      className={
        className ??
        `transition-colors ${active ? 'text-[#00E5A0]' : 'text-[#555]'}`
      }
      aria-hidden
    />
  )
}

export function ProfileLucideIcon({
  profile,
  active = false,
}: {
  profile: Profile
  active?: boolean
}) {
  const Icon = PROFILE_ICONS[profile]
  return (
    <Icon
      size={ICON_SIZE}
      strokeWidth={ICON_STROKE}
      className={`transition-colors ${
        active ? 'text-[#00E5A0]' : 'text-[#555] group-hover:text-[#00E5A0]'
      }`}
      aria-hidden
    />
  )
}

const PROFILE_ICONS: Record<Profile, LucideIcon> = {
  homemaker: Home,
  parenting: Baby,
  lawyer: Scale,
  doctor: Stethoscope,
  accountant: Calculator,
  consultant: Target,
  architect: Compass,
  business: Briefcase,
}

const TASK_ICONS: Record<string, LucideIcon> = {
  hm_menus: Utensils,
  hm_staff: Users,
  hm_budget: Wallet,
  hm_pantry: Package,
  hm_maintenance: Wrench,
  hm_spaces: Home,
  hm_utilities: Lightbulb,
  hm_documents: Folder,
  hm_pets: PawPrint,
  hm_vehicles: Car,
  hm_cleaning: ListChecks,
  hm_nutrition: Salad,

  pr_logistics: Calendar,
  pr_health: Stethoscope,
  pr_circulares: ClipboardList,
  pr_parenting: Brain,
  pr_activities: Palette,
  pr_agenda: CalendarDays,
  pr_travel: Plane,
  pr_parties: Cake,
  pr_homework: BookOpen,
  pr_development: Sprout,
  pr_sleep: Moon,
  pr_nutrition: Apple,

  lw_expedientes: FolderOpen,
  lw_drafting: FilePen,
  lw_research: Search,
  lw_deadlines: Calendar,
  lw_onboarding: Handshake,
  lw_oficio: Landmark,
  lw_diligence: Folders,
  lw_billing: Timer,
  lw_regulatory: Radio,
  lw_notary: PenLine,
  lw_evidence: ClipboardList,
  lw_transcripts: Mic,

  dr_history: ClipboardList,
  dr_research: Microscope,
  dr_notes: Mic,
  dr_explain: MessageCircle,
  dr_interactions: Pill,
  dr_consents: FileText,
  dr_followup: TrendingUp,
  dr_insurance: FileSpreadsheet,
  dr_content: Smartphone,
  dr_referrals: Link,
  dr_labs: FlaskConical,
  dr_differential: Telescope,

  ac_reconcile: Search,
  ac_payroll: Users,
  ac_cashflow: BarChart3,
  ac_reports: ClipboardList,
  ac_sat: Radio,
  ac_assets: Factory,
  ac_budget: TrendingDown,
  ac_collections: Inbox,
  ac_roi: TrendingUp,
  ac_expenses: FolderTree,
  ac_taxes: Scale,
  ac_audit: FileCheck,

  co_content: Clapperboard,
  co_emails: Mail,
  co_workshops: Target,
  co_followup: CircleCheck,
  co_leadmagnets: Magnet,
  co_webinar: Monitor,
  co_community: Users,
  co_ads: Megaphone,
  co_coaching: CircleHelp,
  co_methodology: Layers,
  co_bio: Sparkles,
  co_pricing: CircleDollarSign,

  ar_zoning: Ruler,
  ar_materials: BrickWall,
  ar_logs: HardHat,
  ar_budget: CircleDollarSign,
  ar_narrative: BookOpen,
  ar_permits: ClipboardCheck,
  ar_quotes: Inbox,
  ar_safety: ShieldCheck,
  ar_approvals: CircleCheck,
  ar_portfolio: Trophy,
  ar_interior: Armchair,
  ar_space: Move,

  bz_sops: ClipboardList,
  bz_hiring: UserRound,
  bz_meetings: Calendar,
  bz_comms: PenLine,
  bz_kpis: BarChart3,
  bz_crisis: Siren,
  bz_investors: Presentation,
  bz_vendors: Handshake,
  bz_risk: TriangleAlert,
  bz_profit: DollarSign,
  bz_sales: MessageSquare,
  bz_innovation: Lightbulb,
}
