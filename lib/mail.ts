import { Resend } from 'resend'

const ADMIN_EMAIL = 'hola@mojxai.com'

export async function sendAdminEmail(opts: {
  subject: string
  html: string
  replyTo?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `MojxAI <${fromEmail}>`,
    to: ADMIN_EMAIL,
    replyTo: opts.replyTo || undefined,
    subject: opts.subject,
    html: opts.html,
  })

  return error
}
