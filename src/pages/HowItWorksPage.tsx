import React from 'react';
import { PROCESS_STEPS, POLICIES_DATA } from '../data/howItWorksData';
import { ProcessTimeline } from '../components/how-it-works/ProcessTimeline';
import type { PolicyIconType } from '../types/howItWorks';

export interface HowItWorksPageProps {
  onNavigateToCatalog?: () => void;
  onContactWhatsApp?: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigateToCatalog,
  onContactWhatsApp,
}) => {
  const handleWhatsApp = () => {
    if (onContactWhatsApp) {
      onContactWhatsApp();
    } else {
      window.open(
        'https://wa.me/5210000000000?text=Hola%20Miga,%20quisiera%20consultar%20sobre%20un%20pedido%20programado',
        '_blank'
      );
    }
  };

  const renderPolicyIcon = (type: PolicyIconType) => {
    switch (type) {
      case 'clock':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'bread':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#2B1810]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12">
        
        {/* 1. ENCABEZADO EDITORIAL */}
        <header className="max-w-3xl mb-16 text-left">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#A06136]/15 text-[#A06136] border border-[#A06136]/30 mb-4">
            El oficio detrás de cada horneada
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2B1810] tracking-tight leading-[1.15] mb-6">
            Nuestra Pasión Artesanal: <br />
            <span className="italic font-normal text-[#A06136]">Cómo Trabajamos.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#6B5E55] leading-relaxed font-light">
            En un mundo donde todo busca ser instantáneo, en <strong className="text-[#2B1810] font-semibold">miga</strong> elegimos respetar el reloj de la naturaleza. No forzamos el pan con químicos: dejamos que el tiempo, el agua, la harina y la masa madre viva hagan su magia.
          </p>
        </header>

        {/* 2. TIMELINE DE 5 PASOS */}
        <section className="mb-24">
          <ProcessTimeline steps={PROCESS_STEPS} />
        </section>

        {/* 3. POLÍTICAS RÁPIDAS & CONSEJOS (3 Columnas) */}
        <section className="mb-24">
          <div className="mb-10 text-left">
            <span className="font-sans text-xs tracking-widest text-[#A06136] uppercase font-semibold">
              Logística & Cuidado
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2B1810] mt-1">
              Políticas de Pedido y Entrega
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POLICIES_DATA.map((policy, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] flex items-center justify-center text-[#A06136] mb-6">
                    {renderPolicyIcon(policy.icon)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2B1810] mb-3">
                    {policy.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6B5E55] leading-relaxed mb-6 font-light">
                    {policy.text}
                  </p>
                </div>

                {policy.highlight && (
                  <div className="pt-4 border-t border-[#E8E2D9] text-xs font-sans font-semibold text-[#A06136]">
                    {policy.highlight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. BANNER DE CONVERSIÓN */}
        <section className="rounded-3xl bg-[#2B1810] text-[#FAF7F2] p-8 sm:p-14 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl text-left space-y-6">
            <span className="text-xs font-sans tracking-widest uppercase text-[#FAF7F2]/70 font-semibold">
              Horneado bajo demanda
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              ¿Listo para disfrutar de pan de verdad en tu mesa?
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 font-light leading-relaxed">
              Explora nuestra selección semanal de hogazas, croissants y repostería o contáctanos por WhatsApp para programar tu pedido.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onNavigateToCatalog}
                type="button"
                className="px-7 py-3.5 rounded-full text-xs font-semibold tracking-wide text-white bg-[#A06136] hover:bg-[#874F2A] active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                Ver Catálogo de Productos
              </button>
              <button
                onClick={handleWhatsApp}
                type="button"
                className="px-7 py-3.5 rounded-full text-xs font-semibold tracking-wide text-[#FAF7F2] border border-[#FAF7F2]/60 hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                Preguntar por WhatsApp
              </button>
            </div>
          </div>

          {/* Sello decorativo de fondo */}
          <div
            aria-hidden="true"
            className="absolute -right-8 -bottom-10 font-serif text-[180px] font-bold text-white/5 select-none pointer-events-none"
          >
            M
          </div>
        </section>

      </div>
    </div>
  );
};