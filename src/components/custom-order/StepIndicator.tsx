import React from 'react';

export interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const STEPS = [
  { number: 1, title: 'Base del Obrador', desc: 'Selecciona la masa principal' },
  { number: 2, title: 'Detalles & Sabores', desc: 'Porciones, bizcochos y rellenos' },
  { number: 3, title: 'Acabados & Fecha', desc: 'Toppings, dedicatoria y entrega' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
  canNavigateToStep,
}) => {
  return (
    <div className="w-full bg-white p-5 lg:p-6 rounded-3xl border border-[#E8E2D9] shadow-xs">
      <h3 className="hidden lg:block font-serif text-lg font-bold text-[#2B1810] mb-6">
        Configurador
      </h3>

      <div className="flex lg:flex-col justify-between gap-3 lg:gap-6">
        {STEPS.map((step) => {
          const isCurrent = currentStep === step.number;
          const isDone = currentStep > step.number;
          const isClickable = canNavigateToStep(step.number);

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.number)}
              className={`flex items-start gap-3.5 text-left transition-all ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              {/* Número o Check */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-bold shrink-0 transition-colors ${
                  isCurrent
                    ? 'bg-[#A06136] text-white shadow-xs'
                    : isDone
                    ? 'bg-[#2B1810] text-[#FAF7F2]'
                    : 'bg-[#FAF7F2] text-[#6B5E55] border border-[#E8E2D9]'
                }`}
              >
                {isDone ? '✓' : `0${step.number}`}
              </div>

              {/* Textos solo visibles en desktop o pantallas medianas */}
              <div className="hidden sm:block">
                <p
                  className={`text-xs font-semibold ${
                    isCurrent ? 'text-[#A06136]' : 'text-[#2B1810]'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-[#6B5E55] hidden lg:block">
                  {step.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};