import React from 'react';
import type { ProductBase } from '../../types/customOrder';
import { BASES_LIST } from '../../data/customOrderOptions';

export interface BaseSelectorProps {
  selectedBase: ProductBase | null;
  onSelectBase: (base: ProductBase) => void;
}

export const BaseSelector: React.FC<BaseSelectorProps> = ({
  selectedBase,
  onSelectBase,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-left mb-2">
        <h3 className="font-serif text-xl font-bold text-[#2B1810]">
          Paso 1: Elige la Base de tu Pedido
        </h3>
        <p className="font-sans text-xs text-[#6B5E55]">
          Selecciona sobre qué receta artesanal prepararemos tu encargo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {BASES_LIST.map((base) => {
          const isSelected = selectedBase?.id === base.id;

          return (
            <div
              key={base.id}
              onClick={() => onSelectBase(base)}
              className={`group flex flex-col bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 text-left ${
                isSelected
                  ? 'border-[#A06136] shadow-md ring-2 ring-[#A06136]/20'
                  : 'border-[#E8E2D9] hover:border-[#A06136]/60 shadow-xs'
              }`}
            >
              {/* Imagen 16:9 con badge de tiempo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={base.image}
                  alt={base.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FAF7F2]/95 text-[#2B1810] border border-[#E8E2D9] shadow-xs">
                  {base.prepTime}
                </span>
                {isSelected && (
                  <span className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#A06136] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              {/* Contenido Card */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1810] group-hover:text-[#A06136] transition-colors">
                    {base.name}
                  </h4>
                  <p className="font-sans text-xs text-[#6B5E55] mt-1 line-clamp-2">
                    {base.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D9]/70">
                  <span className="text-[11px] text-[#6B5E55]">Precio base:</span>
                  <span className="font-serif text-sm font-bold text-[#A06136]">
                    ${base.basePrice} MXN
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};