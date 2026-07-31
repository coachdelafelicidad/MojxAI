import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://mojxai.com'

export const metadata: Metadata = {
  title: 'MOJXAI — Arquitecto de Sistema de IA Personalizado en 48 horas',
  description: 'No necesitas estudiar más. Nosotros entramos a tu cuenta, la configuramos con tus propias necesidades y procesos reales, y te la dejamos lista para sacar el máximo provecho a la IA en 48 horas.',
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'MOJXAI — Arquitecto de Sistema de IA Personalizado en 48 horas',
    description: 'No necesitas estudiar más. Instalamos la IA con tus procesos reales. Listo en 48h. Garantía 100%.',
    url: BASE_URL,
    siteName: 'MOJXAI',
    images: [
      {
        url: `${BASE_URL}/opengraph-image?v=2`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'MOJXAI — Arquitecto de Sistema de IA Personalizado en 48 horas',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOJXAI — Arquitecto de Sistema de IA Personalizado',
    description: 'No necesitas estudiar más. Instalamos la IA con tus procesos reales. Listo en 48h.',
    images: [`${BASE_URL}/opengraph-image?v=2`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
