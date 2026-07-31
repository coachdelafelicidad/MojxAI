import Stripe from 'stripe'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { buildOnboardingEmail, buildAdminNotificationEmail } from '@/lib/email-templates'
import type { EmailPlan, EmailLang, EmailProfile } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

const ADMIN_EMAIL = 'mojxai.app@gmail.com'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  })
  const resend = new Resend(process.env.RESEND_API_KEY!)

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  // Verify webhook signature if secret is configured
  let event: Stripe.Event
  if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } else {
    // In development / testing without webhook secret — parse directly
    try {
      event = JSON.parse(body) as Stripe.Event
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email ?? ''
    const customerName  = session.customer_details?.name  ?? ''
    const plan     = (session.metadata?.plan     ?? 'starter') as EmailPlan
    const language = (session.metadata?.language ?? 'es')      as EmailLang
    const profile  = (session.metadata?.profile  ?? undefined) as EmailProfile | undefined
    const amountTotal = session.amount_total ?? 0

    if (!customerEmail) {
      console.warn('No customer email in session:', session.id)
      return NextResponse.json({ received: true })
    }

    try {
      // Sender address — set RESEND_FROM_EMAIL in Vercel env vars when you have a domain.
      // Default uses Resend's shared domain (works immediately, no DNS setup needed).
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
      const fromName  = 'MojxAI'

      // 1. Send onboarding questionnaire to the customer
      const onboarding = buildOnboardingEmail({ customerName, plan, language, profile })
      await resend.emails.send({
        from:     `${fromName} <${fromEmail}>`,
        to:       customerEmail,
        replyTo:  ADMIN_EMAIL, // replies go to your gmail
        subject:  onboarding.subject,
        html:     onboarding.html,
      })

      // 2. Send admin notification
      const admin = buildAdminNotificationEmail({
        customerName,
        customerEmail,
        plan,
        language,
        profile,
        amountUsd: amountTotal,
      })
      await resend.emails.send({
        from:    `${fromName} <${fromEmail}>`,
        to:      ADMIN_EMAIL,
        subject: admin.subject,
        html:    admin.html,
      })

      console.log(`Onboarding emails sent for session ${session.id}`)
    } catch (err) {
      console.error('Failed to send onboarding emails:', err)
      // Don't return 500 — Stripe will retry; instead log and move on
    }
  }

  return NextResponse.json({ received: true })
}
