import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://mojxai.com'

export const metadata: Metadata = {
  title: 'MOJXAI — Tu sistema de IA personalizado en 48 horas',
  description: 'No necesitas estudiar más. Nosotros entramos a tu cuenta, la configuramos con tus documentos y procesos reales, y te la dejamos lista en 48 horas. Diagnóstico gratuito.',
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'MOJXAI — Tu sistema de IA personalizado en 48 horas',
    description: 'No estudias nada. Nosotros instalamos la IA con tus documentos y procesos reales. Listo en 48h. Garantía 100%.',
    url: BASE_URL,
    siteName: 'MOJXAI',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'MOJXAI — Sistema de IA personalizado en 48 horas',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOJXAI — Tu sistema de IA en 48 horas',
    description: 'No estudias nada. Instalamos la IA con tus procesos reales. Listo en 48h.',
    images: [`${BASE_URL}/opengraph-image`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
