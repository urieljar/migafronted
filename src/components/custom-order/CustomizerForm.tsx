import React from 'react';
import type { CustomOrderState } from '../../types/customOrder';
import {
  SIZE_OPTIONS,
  FLAVOR_OPTIONS,
  FILLING_OPTIONS,
  TOPPING_OPTIONS,
} from '../../data/customOrderOptions';

export interface CustomizerFormProps {
  currentStep: number;
  orderState: CustomOrderState;
  onChangeField: (field: Partial<CustomOrderState>) => void;
}

export const CustomizerForm: React.FC<CustomizerFormProps> = ({
  currentStep,
  orderState,
  onChangeField,
}) => {
  // Fecha mínima: Hoy + 2 días (48 horas obligatorias)
  const getMinDeliveryDate = () => {
    const target = new Date();
    target.setDate(target.getDate() + 2);
    return target.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs text-left space-y-6">
      
      {/* ================= PASO 2: TAMAÑO, SABOR Y RELLENO ================= */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-b border-[#E8E2D9] pb-3">
            <h3 className="font-serif text-xl font-bold text-[#2B1810]">
              Paso 2: Sabores & Porciones
            </h3>
            <p className="font-sans text-xs text-[#6B5E55]">
              Personaliza el interior y las porciones exactas.
            </p>
          </div>

          {/* 1. Porciones / Tamaño */}
          <div>
            <label className="block text-xs font-semibold text-[#2B1810] mb-2 uppercase tracking-wider">
              1. Tamaño & Porciones
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {SIZE_OPTIONS.map((opt) => {
                const isSelected = orderState.sizeOrPortions === opt.name;
                return (
                  <div
                    key={opt.id}
                    onClick={() =>
                      onChangeField({
                        sizeOrPortions: opt.name,
                        sizeExtraPrice: opt.extraPrice,
                      })
                    }
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#A06136] bg-[#FAF7F2] font-semibold text-[#2B1810]'
                        : 'border-[#E8E2D9] hover:bg-[#FAF7F2]/50 text-[#6B5E55]'
                    }`}
                  >
                    <span className="text-xs">{opt.name}</span>
                    <span className="text-xs font-bold text-[#A06136]">
                      {opt.extraPrice > 0 ? `+$${opt.extraPrice} MXN` : 'Incluido'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Sabor de Masa / Bizcocho */}
          <div>
            <label className="block text-xs font-semibold text-[#2B1810] mb-2 uppercase tracking-wider">
              2. Sabor de Bizcocho o Variedad de Harina
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FLAVOR_OPTIONS.map((opt) => {
                const isSelected = orderState.flavorOrFlour === opt.name;
                return (
                  <div
                    key={opt.id}
                    onClick={() =>
                      onChangeField({
                        flavorOrFlour: opt.name,
                        flavorExtraPrice: opt.extraPrice,
                      })
                    }
                    className={`p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      isSelected
                        ? 'border-[#A06136] bg-[#FAF7F2] font-semibold text-[#2B1810]'
                        : 'border-[#E8E2D9] hover:bg-[#FAF7F2]/50 text-[#6B5E55]'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[11px] text-[#A06136] mt-0.5 font-bold">
                      {opt.extraPrice > 0 ? `+$${opt.extraPrice} MXN` : 'Incluido'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Relleno o Agregado */}
          <div>
            <label className="block text-xs font-semibold text-[#2B1810] mb-2 uppercase tracking-wider">
              3. Relleno o Ingrediente Especial
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {FILLING_OPTIONS.map((opt) => {
                const isSelected = orderState.fillingOrAddon === opt.name;
                return (
                  <div
                    key={opt.id}
                    onClick={() =>
                      onChangeField({
                        fillingOrAddon: opt.name,
                        fillingExtraPrice: opt.extraPrice,
                      })
                    }
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#A06136] bg-[#FAF7F2] font-semibold text-[#2B1810]'
                        : 'border-[#E8E2D9] hover:bg-[#FAF7F2]/50 text-[#6B5E55]'
                    }`}
                  >
                    <span className="text-xs">{opt.name}</span>
                    <span className="text-xs font-bold text-[#A06136]">
                      {opt.extraPrice > 0 ? `+$${opt.extraPrice} MXN` : 'Sin costo'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= PASO 3: TOPPINGS, DEDICATORIA Y FECHA ================= */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="border-b border-[#E8E2D9] pb-3">
            <h3 className="font-serif text-xl font-bold text-[#2B1810]">
              Paso 3: Acabados, Dedicatoria & Fecha
            </h3>
            <p className="font-sans text-xs text-[#6B5E55]">
              Detalles finales para la entrega perfecta.
            </p>
          </div>

          {/* 1. Toppings / Coberturas */}
          <div>
            <label className="block text-xs font-semibold text-[#2B1810] mb-2 uppercase tracking-wider">
              1. Cobertura o Toppings de Superficie
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPPING_OPTIONS.map((opt) => {
                const isSelected = orderState.toppingOrFrosting === opt.name;
                return (
                  <div
                    key={opt.id}
                    onClick={() =>
                      onChangeField({
                        toppingOrFrosting: opt.name,
                        toppingExtraPrice: opt.extraPrice,
                      })
                    }
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      isSelected
                        ? 'border-[#A06136] bg-[#FAF7F2] font-semibold text-[#2B1810]'
                        : 'border-[#E8E2D9] hover:bg-[#FAF7F2]/50 text-[#6B5E55]'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[11px] text-[#A06136] mt-0.5 font-bold">
                      {opt.extraPrice > 0 ? `+$${opt.extraPrice} MXN` : 'Incluido'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Mensaje o Dedicatoria */}
          <div>
            <label htmlFor="dedication" className="block text-xs font-semibold text-[#2B1810] mb-1 uppercase tracking-wider">
              2. Dedicatoria en Tarjeta o Plaqueta <span className="text-[10px] text-[#6B5E55] font-normal">(Opcional)</span>
            </label>
            <textarea
              id="dedication"
              rows={3}
              value={orderState.dedicationText}
              onChange={(e) => onChangeField({ dedicationText: e.target.value })}
              placeholder="Ej. ¡Feliz Cumpleaños Lucas! Con mucho amor de tu familia."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136] resize-none"
            />
          </div>

          {/* 3. Selector de Fecha de Entrega */}
          <div>
            <label htmlFor="deliveryDate" className="block text-xs font-semibold text-[#2B1810] mb-1 uppercase tracking-wider">
              3. Fecha de Entrega Deseada <span className="text-[#A06136]">*</span>
            </label>
            <input
              type="date"
              id="deliveryDate"
              required
              min={getMinDeliveryDate()}
              value={orderState.deliveryDate}
              onChange={(e) => onChangeField({ deliveryDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136] cursor-pointer"
            />
            <p className="text-[11px] text-[#6B5E55] mt-1.5 italic">
              * Recuerda que requerimos un mínimo de 48 horas previas para garantizar el reposo y horneado artesanal.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};