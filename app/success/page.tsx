import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">
        {/* Shield icon */}
        <div className="w-20 h-20 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"
              stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <span className="text-[#00E5A0] text-xs font-semibold tracking-widest uppercase">MojxAI</span>

        <h1 className="font-bold text-3xl sm:text-4xl mt-4 mb-4 text-white leading-tight">
          ¡Pago recibido!
        </h1>

        <p className="text-[#888888] text-base leading-relaxed mb-8">
          Gracias por confiar en MojxAI. En las próximas{' '}
          <span className="text-white font-semibold">24 horas</span> recibirás un correo con tu
          cuestionario de configuración y tus accesos.{' '}
          <span className="text-white font-semibold">Tu sistema estará listo en 48h.</span>
        </p>

        <div className="bg-[#141414] border border-[#1E1E1E] rounded-2xl p-5 mb-8 text-left">
          <p className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-3">¿Qué sigue?</p>
          {[
            '📧 Revisa tu correo en las próximas 24h',
            '📋 Llena el cuestionario de configuración',
            '🔑 Comparte tus accesos a Claude o ChatGPT',
            '🚀 En 48h tienes tu sistema activo',
          ].map((step) => (
            <p key={step} className="text-[#CCCCCC] text-sm py-2 border-b border-[#1A1A1A] last:border-0">
              {step}
            </p>
          ))}
        </div>

        <a
          href={`https://wa.me/528145912034?text=${encodeURIComponent('Hola! Acabo de realizar mi pago en MojxAI. ¿Cuándo me envían el cuestionario?')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#00E5A0] text-black font-bold py-4 rounded-full text-base text-center mb-4 hover:scale-[1.02] transition-transform"
        >
          Avisar por WhatsApp →
        </a>

        <Link
          href="/diagnostico"
          className="text-[#555] text-sm hover:text-[#888] transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
