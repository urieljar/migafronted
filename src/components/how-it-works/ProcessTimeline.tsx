import React from 'react';
import type { ProcessStep } from '../../types/howItWorks';
import { StepCard } from './StepCard';

export interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  return (
    <div className="relative w-full space-y-12 lg:space-y-16">
      {/* Línea conectora central sutil de fondo en desktop */}
      <div 
        aria-hidden="true" 
        className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D8CEBF] to-transparent pointer-events-none" 
      />

      {steps.map((step, index) => (
        <div key={step.stepNumber} className="relative z-10">
          <StepCard step={step} isEven={index % 2 !== 0} />
        </div>
      ))}
    </div>
  );
};