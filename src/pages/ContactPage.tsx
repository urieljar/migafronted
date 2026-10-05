import React from 'react';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfoCard } from '../components/contact/ContactInfoCard';
import { MapEmbed } from '../components/contact/MapEmbed';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#2B1810]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12">
        
        {/* Encabezado Editorial */}
        <header className="max-w-2xl mb-12 text-left">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#A06136]/15 text-[#A06136] border border-[#A06136]/30 mb-4">
            Estamos para servirte
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1810] tracking-tight leading-tight mb-4">
            Contáctanos & <br />
            <span className="italic font-normal text-[#A06136]">Ubica Nuestro Taller.</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#6B5E55] leading-relaxed font-light">
            ¿Tienes dudas sobre fermentaciones, necesitas cotizar panadería para un evento o deseas coordinar la recogida de tu pedido? Escríbenos y con gusto te atenderemos.
          </p>
        </header>

        {/* Layout en 3 Bloques (12 Columnas en Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bloque 1: Formulario a WhatsApp (5 columnas) */}
          <div className="lg:col-span-5">
            <ContactForm />
          </div>

          {/* Bloque 2: Información Directa & Horarios (4 columnas) */}
          <div className="lg:col-span-4">
            <ContactInfoCard />
          </div>

          {/* Bloque 3: Ubicación & Mapa (3 columnas) */}
          <div className="lg:col-span-3">
            <MapEmbed />
          </div>

        </div>

      </div>
    </div>
  );
};