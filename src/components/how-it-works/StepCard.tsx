import React from 'react';
import type { ProcessStep } from '../../types/howItWorks';

export interface StepCardProps {
  step: ProcessStep;
  isEven: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({ step, isEven }) => {
  return (
    <article className="relative bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-10 shadow-xs hover:shadow-md transition-all duration-300">
      <div
        className={`flex flex-col gap-8 lg:gap-12 items-center ${
          isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* 1. Columna de Imagen (4:3) */}
        <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl bg-[#FAF7F2] aspect-[4/3] relative group shadow-inner">
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Badge del Paso */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF7F2]/95 text-[#2B1810] border border-[#E8E2D9] shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#A06136]" />
            {step.badge}
          </div>
        </div>

        {/* 2. Columna de Contenido */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          
          {/* Encabezado con Número Circular */}
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-12 rounded-full bg-[#2B1810] text-[#FAF7F2] font-serif text-xl font-bold flex items-center justify-center shrink-0 shadow-xs">
              0{step.stepNumber}
            </span>
            <span className="text-xs font-sans tracking-widest text-[#A06136] uppercase font-semibold">
              Paso del Obrador
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1810] mb-3 leading-snug">
            {step.title}
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#6B5E55] leading-relaxed mb-6 font-light">
            {step.description}
          </p>

          {/* Lista de Detalles Técnicos */}
          <ul className="space-y-3 pt-4 border-t border-[#E8E2D9]/70">
            {step.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#2B1810]">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#A06136] flex items-center justify-center shrink-0 text-[#A06136]">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </span>
                <span className="font-sans font-medium">{detail}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </article>
  );
};