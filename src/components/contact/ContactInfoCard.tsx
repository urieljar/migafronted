import React from 'react';
import { CONTACT_DETAILS, WORKSHOP_SCHEDULE } from '../../data/contactInfo';

export const ContactInfoCard: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* 1. Canales de Comunicación Inmediata */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-4">
        <h4 className="font-serif text-xl font-bold text-[#2B1810]">
          Canales Directos
        </h4>
        
        <div className="space-y-3 font-sans text-xs">
          {/* Teléfono */}
          <a
            href={`tel:${CONTACT_DETAILS.phone}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9]/70 hover:border-[#A06136] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center text-[#A06136] group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-[#6B5E55] block">Teléfono de Atención</span>
              <strong className="text-[#2B1810] font-semibold">{CONTACT_DETAILS.phoneDisplay}</strong>
            </div>
          </a>

          {/* WhatsApp Directo */}
          <a
            href={`https://wa.me/${CONTACT_DETAILS.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9]/70 hover:border-[#A06136] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.026.565 1.777.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.97 9.98-1.748 0-3.385-.453-4.819-1.242l-5.211 1.366 1.393-5.086c-.889-1.488-1.393-3.228-1.393-5.088 0-5.503 4.477-9.98 9.97-9.98 5.493 0 9.97 4.477 9.97 9.98z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-[#6B5E55] block">Chat Rápido WhatsApp</span>
              <strong className="text-[#2B1810] font-semibold">{CONTACT_DETAILS.whatsappDisplay}</strong>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT_DETAILS.email}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9]/70 hover:border-[#A06136] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center text-[#A06136] group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-[#6B5E55] block">Correo para Eventos</span>
              <strong className="text-[#2B1810] font-semibold">{CONTACT_DETAILS.email}</strong>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Horarios de Taller */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#A06136]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="font-serif text-lg font-bold text-[#2B1810]">
            Horarios del Obrador
          </h4>
        </div>

        <div className="space-y-3 font-sans text-xs">
          {WORKSHOP_SCHEDULE.map((item, idx) => (
            <div key={idx} className="pb-2.5 border-b border-[#E8E2D9]/60 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#2B1810]">{item.days}</span>
                <span className="text-[#A06136] font-medium">{item.hours}</span>
              </div>
              <p className="text-[11px] text-[#6B5E55] mt-0.5">{item.status}</p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <p className="text-[11px] text-[#6B5E55] italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D9]/60">
            * Recuerda programar con 24h a 48h de anticipación para respetar los tiempos biológicos de fermentación.
          </p>
        </div>
      </div>

    </div>
  );
};