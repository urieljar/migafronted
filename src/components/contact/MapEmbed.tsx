import React from 'react';
import { CONTACT_DETAILS } from '../../data/contactInfo';

export const MapEmbed: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[#A06136]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h4 className="font-serif text-lg font-bold text-[#2B1810]">
            Punto de Recogida & Taller
          </h4>
        </div>

        {/* Mapa Visual con Monograma "M" */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E8E2D9] bg-[#FAF7F2]">
          {/* Iframe interactivo centrado en Roma Norte */}
          <iframe
            title="Mapa de Ubicación Taller Miga"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15052.128886361254!2d-99.16858114999999!3d19.41804245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3997db707b%3A0x6b77242a49b6b7a9!2sColima%2C%20Roma%20Nte.%2C%20Cuauht%C3%A9moc%2C%20CDMX!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
            className="w-full h-full border-0 filter saturate-75 opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Pin flotante de Miga */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#2B1810] border-2 border-[#FAF7F2] flex items-center justify-center text-white shadow-md">
              <span className="font-serif font-bold text-sm">M</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#2B1810] rotate-45 mx-auto -mt-1.5" />
          </div>
        </div>

        {/* Dirección exacta */}
        <div className="mt-4 space-y-1 text-left font-sans text-xs">
          <p className="font-semibold text-[#2B1810]">
            {CONTACT_DETAILS.address}
          </p>
          <p className="text-[#6B5E55]">
            {CONTACT_DETAILS.neighborhood}, {CONTACT_DETAILS.city}
          </p>
          <p className="text-[11px] text-[#A06136] pt-1">
            📍 {CONTACT_DETAILS.pickupNotes}
          </p>
        </div>
      </div>

      {/* Botón para abrir ruta */}
      <a
        href={CONTACT_DETAILS.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-[#2B1810] bg-[#FAF7F2] border border-[#E8E2D9] hover:bg-[#A06136] hover:text-white hover:border-[#A06136] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Abrir ruta en Google Maps</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};