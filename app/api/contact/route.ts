import { NextRequest, NextResponse } from 'next/server'
import { buildCustomLeadEmail, buildEnterpriseLeadEmail } from '@/lib/email-templates'
import type { EmailLang } from '@/lib/email-templates'
import { sendAdminEmail } from '@/lib/mail'

export const dynamic = 'force-dynamic'

function asString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>
    const language = (body.language === 'en' ? 'en' : 'es') as EmailLang

    if (body.kind === 'enterprise') {
      const name = asString(body.name, 120)
      const company = asString(body.company, 160)
      const email = asString(body.email, 120)
      const whatsapp = asString(body.whatsapp, 40)
      const teamSize = asString(body.teamSize, 20)
      const areas = asString(body.areas, 400)
      const goal = asString(body.goal, 400)

      if (name.length < 2 || company.length < 2 || whatsapp.replace(/\D/g, '').length < 8 || !teamSize || !areas || !goal) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
      }

      const message = buildEnterpriseLeadEmail({
        name, company, email, whatsapp, teamSize, areas, goal, language,
      })
      const error = await sendAdminEmail({
        subject: message.subject,
        html: message.html,
        replyTo: email,
      })
      if (error) {
        console.error('Resend enterprise error:', error)
        return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    }

    const name = asString(body.name, 120)
    const whatsapp = asString(body.whatsapp, 40)
    const email = asString(body.email, 120)
    const profession = asString(body.profession, 160)
    const tasksNote = asString(body.tasksNote, 500)
    const lostHours = asString(body.lostHours, 20)
    const hoursRecoverable = Number(body.hoursRecoverable) || 0
    const moneyLostPerMonth = Number(body.moneyLostPerMonth) || 0

    if (name.length < 2 || whatsapp.replace(/\D/g, '').length < 8) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

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
    const error = await sendAdminEmail({
      subject: message.subject,
      html: message.html,
      replyTo: email || undefined,
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
