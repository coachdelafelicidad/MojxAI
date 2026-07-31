import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MOJXAI — Sistema de IA personalizado en 48 horas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient green glow */}
        <div style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
        }} />

        {/* Top glow line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,229,160,0.4), transparent)',
          display: 'flex',
        }} />

        {/* Logo icon [|] + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
          {/* [|] icon */}
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="19" width="7" height="62" rx="2" fill="#C8C8C8"/>
            <rect x="11" y="19" width="19" height="7" rx="2" fill="#C8C8C8"/>
            <rect x="11" y="74" width="19" height="7" rx="2" fill="#C8C8C8"/>
            <rect x="46.5" y="25" width="7" height="50" rx="3.5" fill="#00E5A0"/>
            <rect x="82" y="19" width="7" height="62" rx="2" fill="#C8C8C8"/>
            <rect x="70" y="19" width="19" height="7" rx="2" fill="#C8C8C8"/>
            <rect x="70" y="74" width="19" height="7" rx="2" fill="#C8C8C8"/>
          </svg>
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ color: '#FFFFFF', fontSize: '38px', fontWeight: '800', letterSpacing: '-0.02em' }}>
              MojxAI
            </span>
            <span style={{ color: '#555555', fontSize: '13px', fontWeight: '600', letterSpacing: '0.3em', marginTop: '4px' }}>
              SYSTEMS
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '48px',
          height: '2px',
          background: '#00E5A0',
          borderRadius: '2px',
          marginBottom: '36px',
          display: 'flex',
        }} />

        {/* Headline */}
        <div style={{
          color: '#FFFFFF',
          fontSize: '52px',
          fontWeight: '800',
          textAlign: 'center',
          lineHeight: '1.15',
          maxWidth: '860px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0px',
        }}>
          <span>Tu sistema de IA personalizado</span>
          <span style={{ color: '#00E5A0', marginLeft: '14px' }}>en 48 horas</span>
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#666666',
          fontSize: '22px',
          textAlign: 'center',
          maxWidth: '680px',
          marginBottom: '52px',
          display: 'flex',
        }}>
          Done-For-You · Sin código · Garantía 100%
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { value: '48h', label: 'Instalación garantizada' },
            { value: '70%', label: 'Tareas automatizadas' },
            { value: '100%', label: 'Garantía de reembolso' },
          ].map((stat) => (
            <div key={stat.label} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#121212',
              border: '1px solid #1F1F1F',
              borderRadius: '16px',
              padding: '18px 30px',
            }}>
              <span style={{ color: '#00E5A0', fontSize: '32px', fontWeight: '800' }}>{stat.value}</span>
              <span style={{ color: '#555555', fontSize: '13px', marginTop: '6px' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* URL badge */}
        <div style={{
          position: 'absolute',
          bottom: '28px',
          color: '#2A2A2A',
          fontSize: '15px',
          display: 'flex',
          letterSpacing: '0.05em',
        }}>
          mojxai.com
        </div>
      </div>
    ),
    { ...size }
  )
}
