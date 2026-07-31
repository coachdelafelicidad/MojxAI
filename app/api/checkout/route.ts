import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PLANS: Record<string, { name_es: string; name_en: string; amount: number }> = {
  hogar: {
    name_es: 'MojxAI HOGAR — IA para tu hogar y familia',
    name_en: 'MojxAI HOME — AI for your home & family',
    amount: 18000, // $180 USD in cents
  },
  starter: {
    name_es: 'MojxAI STARTER — Sistema de IA para profesionistas',
    name_en: 'MojxAI STARTER — AI system for professionals',
    amount: 49700, // $497 USD in cents
  },
  business: {
    name_es: 'MojxAI FULL BUSINESS — IA para tu empresa (por seat)',
    name_en: 'MojxAI FULL BUSINESS — AI for your company (per seat)',
    amount: 39700, // $397 USD per seat in cents
  },
}

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia',
    })
    const { plan, language, profile } = await req.json() as { plan: string; language: string; profile?: string }
    const planData = PLANS[plan] ?? PLANS.starter
    const origin = req.headers.get('origin') ?? 'https://mojxai.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: language === 'es' ? planData.name_es : planData.name_en,
              description: language === 'es'
                ? 'Pago único · Instalación en 48h · Sin mensualidades'
                : 'One-time payment · 48h setup · No subscriptions',
            },
            unit_amount: planData.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?plan=${plan}&lang=${language}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/diagnostico`,
      locale: language === 'es' ? 'es' : 'en',
      allow_promotion_codes: true, // enables coupon/promo code field on checkout page
      // Pass plan + profile so the webhook can send the right questionnaire
      metadata: { plan, language, ...(profile ? { profile } : {}) },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Stripe error:', message)
    return NextResponse.json({ error: 'Failed to create checkout session', detail: message }, { status: 500 })
  }
}
