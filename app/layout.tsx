import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MojxAI — Diagnóstico de IA',
  description: 'Descubre cuánto tiempo y dinero estás perdiendo por no tener IA bien configurada. Diagnóstico gratuito en 5 minutos.',
  openGraph: {
    title: 'MojxAI — Diagnóstico de IA',
    description: 'Descubre cuánto estás perdiendo sin IA. Diagnóstico gratis en 5 minutos.',
    siteName: 'MojxAI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
