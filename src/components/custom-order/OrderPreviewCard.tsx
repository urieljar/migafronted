import React from 'react';
import type { CustomOrderState } from '../../types/customOrder';

export interface OrderPreviewCardProps {
  orderState: CustomOrderState;
  onConfirmOrder: () => void;
  isValid: boolean;
}

export const OrderPreviewCard: React.FC<OrderPreviewCardProps> = ({
  orderState,
  onConfirmOrder,
  isValid,
}) => {
  const {
    selectedBase,
    sizeOrPortions,
    sizeExtraPrice,
    flavorOrFlour,
    flavorExtraPrice,
    fillingOrAddon,
    fillingExtraPrice,
    toppingOrFrosting,
    toppingExtraPrice,
    deliveryDate,
    totalPrice,
  } = orderState;

  return (
    <aside className="w-full bg-white rounded-3xl border border-[#E8E2D9] p-6 shadow-xs sticky top-28 space-y-6 text-left">
      <div>
        <span className="text-xs font-sans tracking-widest text-[#A06136] uppercase font-semibold">
          Resumen en Vivo
        </span>
        <h3 className="font-serif text-xl font-bold text-[#2B1810] mt-1">
          Tu Creación Artesanal
        </h3>
      </div>

      {/* Miniatura Dinámica */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8E2D9]">
        {selectedBase ? (
          <img
            src={selectedBase.image}
            alt={selectedBase.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#6B5E55] p-4 text-center">
            <span className="font-serif text-3xl font-bold text-[#2B1810]/20 mb-1">M</span>
            <span className="text-xs">Selecciona una base para comenzar</span>
          </div>
        )}
      </div>

      {/* Desglose de Selección */}
      <div className="space-y-2.5 text-xs font-sans border-b border-[#E8E2D9] pb-5">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[#6B5E55]">Base:</span>
          <span className="font-semibold text-[#2B1810] text-right">
            {selectedBase ? selectedBase.name : 'No seleccionada'}
          </span>
        </div>

        {selectedBase && (
          <>
            <div className="flex justify-between items-start gap-2">
              <span className="text-[#6B5E55]">Tamaño:</span>
              <span className="text-[#2B1810] text-right">
                {sizeOrPortions} {sizeExtraPrice > 0 && `(+$${sizeExtraPrice})`}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-[#6B5E55]">Sabor:</span>
              <span className="text-[#2B1810] text-right">
                {flavorOrFlour} {flavorExtraPrice > 0 && `(+$${flavorExtraPrice})`}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-[#6B5E55]">Relleno:</span>
              <span className="text-[#2B1810] text-right">
                {fillingOrAddon} {fillingExtraPrice > 0 && `(+$${fillingExtraPrice})`}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-[#6B5E55]">Acabado:</span>
              <span className="text-[#2B1810] text-right">
                {toppingOrFrosting} {toppingExtraPrice > 0 && `(+$${toppingExtraPrice})`}
              </span>
            </div>

            {deliveryDate && (
              <div className="flex justify-between items-start gap-2 pt-1 border-t border-[#E8E2D9]/60">
                <span className="text-[#6B5E55]">Fecha deseada:</span>
                <span className="font-bold text-[#A06136] text-right">
                  {deliveryDate}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Total Calculado */}
      <div className="flex items-baseline justify-between pt-1">
        <span className="font-serif text-sm font-semibold text-[#2B1810]">
          Total Estimado:
        </span>
        <span className="font-serif text-2xl font-bold text-[#A06136]">
          ${totalPrice} <span className="text-xs font-sans font-normal text-[#6B5E55]">MXN</span>
        </span>
      </div>

      {/* Botón de Confirmación */}
      <button
        onClick={onConfirmOrder}
        disabled={!isValid}
        type="button"
        className={`w-full py-3.5 px-5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
          isValid
            ? 'bg-[#A06136] text-white hover:bg-[#874F2A] active:scale-[0.98] cursor-pointer'
            : 'bg-[#E8E2D9] text-[#6B5E55] cursor-not-allowed'
        }`}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.026.565 1.777.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.97 9.98-1.748 0-3.385-.453-4.819-1.242l-5.211 1.366 1.393-5.086c-.889-1.488-1.393-3.228-1.393-5.088 0-5.503 4.477-9.98 9.97-9.98 5.493 0 9.97 4.477 9.97 9.98z" />
        </svg>
        <span>Solicitar por WhatsApp</span>
      </button>
    </aside>
  );
};