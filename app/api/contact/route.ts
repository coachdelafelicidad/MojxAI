import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildCustomLeadEmail } from '@/lib/email-templates'
import type { EmailLang } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

const ADMIN_EMAIL = 'hola@mojxai.com'

function asString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>
    const name = asString(body.name, 120)
    const whatsapp = asString(body.whatsapp, 40)
    const email = asString(body.email, 120)
    const profession = asString(body.profession, 160)
    const tasksNote = asString(body.tasksNote, 500)
    const lostHours = asString(body.lostHours, 20)
    const language = (body.language === 'en' ? 'en' : 'es') as EmailLang
    const hoursRecoverable = Number(body.hoursRecoverable) || 0
    const moneyLostPerMonth = Number(body.moneyLostPerMonth) || 0

    if (name.length < 2 || whatsapp.replace(/\D/g, '').length < 8) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY!)
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
    const message = buildCustomLeadEmail({
      name,
      whatsapp,
      email,
      profession,
      tasksNote,
      lostHours,
      hoursRecoverable,
      moneyLostPerMonth,
      language,
    })

    const { error } = await resend.emails.send({
      from: `MojxAI <${fromEmail}>`,
      to: ADMIN_EMAIL,
      replyTo: email || undefined,
      subject: message.subject,
      html: message.html,
    })

    if (error) {
      console.error('Resend contact error:', error)
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact endpoint error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
