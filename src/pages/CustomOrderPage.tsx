import React, { useState, useMemo } from 'react';
import type { CustomOrderState, ProductBase } from '../types/customOrder';
import { StepIndicator } from '../components/custom-order/StepIndicator';
import { BaseSelector } from '../components/custom-order/BaseSelector';
import { CustomizerForm } from '../components/custom-order/CustomizerForm';
import { OrderPreviewCard } from '../components/custom-order/OrderPreviewCard';
import {
  BASES_LIST,
  SIZE_OPTIONS,
  FLAVOR_OPTIONS,
  FILLING_OPTIONS,
  TOPPING_OPTIONS,
} from '../data/customOrderOptions';

export const CustomOrderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Fecha predeterminada: 48h en el futuro
  const defaultDate = useMemo(() => {
    const target = new Date();
    target.setDate(target.getDate() + 2);
    return target.toISOString().split('T')[0];
  }, []);

  const [orderState, setOrderState] = useState<CustomOrderState>({
    selectedBase: BASES_LIST[0],
    sizeOrPortions: SIZE_OPTIONS[0].name,
    sizeExtraPrice: SIZE_OPTIONS[0].extraPrice,
    flavorOrFlour: FLAVOR_OPTIONS[0].name,
    flavorExtraPrice: FLAVOR_OPTIONS[0].extraPrice,
    fillingOrAddon: FILLING_OPTIONS[0].name,
    fillingExtraPrice: FILLING_OPTIONS[0].extraPrice,
    toppingOrFrosting: TOPPING_OPTIONS[0].name,
    toppingExtraPrice: TOPPING_OPTIONS[0].extraPrice,
    dedicationText: '',
    deliveryDate: defaultDate,
    totalPrice: BASES_LIST[0].basePrice,
  });

  // Cálculo de precio reactivo
  const computedTotal = useMemo(() => {
    const base = orderState.selectedBase ? orderState.selectedBase.basePrice : 0;
    return (
      base +
      orderState.sizeExtraPrice +
      orderState.flavorExtraPrice +
      orderState.fillingExtraPrice +
      orderState.toppingExtraPrice
    );
  }, [
    orderState.selectedBase,
    orderState.sizeExtraPrice,
    orderState.flavorExtraPrice,
    orderState.fillingExtraPrice,
    orderState.toppingExtraPrice,
  ]);

  // Actualizar campos manteniendo consistencia
  const handleUpdateField = (fields: Partial<CustomOrderState>) => {
    setOrderState((prev) => {
      const next = { ...prev, ...fields };
      const base = next.selectedBase ? next.selectedBase.basePrice : 0;
      next.totalPrice =
        base +
        next.sizeExtraPrice +
        next.flavorExtraPrice +
        next.fillingExtraPrice +
        next.toppingExtraPrice;
      return next;
    });
  };

  const handleSelectBase = (base: ProductBase) => {
    handleUpdateField({ selectedBase: base });
  };

  // Validación de paso actual
  const canNavigateToStep = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return orderState.selectedBase !== null;
    if (step === 3) return orderState.selectedBase !== null && orderState.sizeOrPortions !== '';
    return false;
  };

  const isFormValid =
    orderState.selectedBase !== null &&
    orderState.deliveryDate.trim().length > 0;

  // Confirmar y generar enlace a WhatsApp
  const handleConfirmOrder = () => {
    const lines = [
      `🎂 *¡Hola Miga! Quiero confirmar un Pedido Personalizado:*`,
      `*Base:* ${orderState.selectedBase?.name}`,
      `*Tamaño:* ${orderState.sizeOrPortions}`,
      `*Sabor:* ${orderState.flavorOrFlour}`,
      `*Relleno:* ${orderState.fillingOrAddon}`,
      `*Acabado / Toppings:* ${orderState.toppingOrFrosting}`,
      orderState.dedicationText ? `*Dedicatoria:* "${orderState.dedicationText}"` : null,
      `*Fecha de Entrega Deseada:* ${orderState.deliveryDate}`,
      `*Total Estimado:* $${computedTotal} MXN`,
      `\n¿Podrían confirmarme disponibilidad de horario?`,
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/5215512345678?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#2B1810]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10">
        
        {/* Encabezado Editorial */}
        <header className="max-w-2xl mb-10 text-left">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#A06136]/15 text-[#A06136] border border-[#A06136]/30 mb-3">
            Obrador a tu medida
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1810] tracking-tight leading-tight mb-3">
            Personaliza Tu Pedido Especial
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#6B5E55] leading-relaxed font-light">
            Crea tu pastel festivo, hogaza especial o focaccia con tus sabores y decoraciones favoritas. Horneamos bajo reserva con 48h de anticipación.
          </p>
        </header>

        {/* Layout en 3 Columnas (Desktop 1440px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Stepper (3 cols) */}
          <div className="lg:col-span-3">
            <StepIndicator
              currentStep={currentStep}
              onStepClick={setCurrentStep}
              canNavigateToStep={canNavigateToStep}
            />
          </div>

          {/* Columna Central: Área del Configurador (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {currentStep === 1 && (
              <BaseSelector
                selectedBase={orderState.selectedBase}
                onSelectBase={handleSelectBase}
              />
            )}

            {(currentStep === 2 || currentStep === 3) && (
              <CustomizerForm
                currentStep={currentStep}
                orderState={orderState}
                onChangeField={handleUpdateField}
              />
            )}

            {/* Botones de Navegación de Pasos */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D9]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#2B1810] bg-white border border-[#E8E2D9] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  ← Paso Anterior
                </button>
              ) : <div />}

              {currentStep < 3 ? (
                <button
                  type="button"
                  disabled={!canNavigateToStep(currentStep + 1)}
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#A06136] hover:bg-[#874F2A] disabled:bg-[#E8E2D9] disabled:text-[#6B5E55] cursor-pointer shadow-xs"
                >
                  Continuar al Paso {currentStep + 1} →
                </button>
              ) : null}
            </div>
          </div>

          {/* Columna Derecha: Resumen en Vivo Sticky (4 cols) */}
          <div className="lg:col-span-4">
            <OrderPreviewCard
              orderState={{ ...orderState, totalPrice: computedTotal }}
              onConfirmOrder={handleConfirmOrder}
              isValid={isFormValid}
            />
          </div>

        </div>

      </div>
    </div>
  );
};