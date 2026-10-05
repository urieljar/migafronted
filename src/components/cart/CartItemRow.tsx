import React from 'react';
import type { CartItem } from '../../types/cart';

export interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-[#E8E2D9] gap-4 transition-shadow hover:shadow-xs">
      
      {/* 1. Imagen y Datos del Producto */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F2] shrink-0 border border-[#E8E2D9]"
        />

        <div className="flex-1 text-left">
          <h4 className="font-serif text-base font-bold text-[#2B1810]">
            {item.name}
          </h4>
          <p className="font-serif text-xs font-semibold text-[#A06136] mt-0.5">
            ${item.price} <span className="text-[10px] font-sans font-normal text-[#6B5E55]">MXN c/u</span>
          </p>

          {/* Tags o especificaciones */}
          {item.details && item.details.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {item.details.map((detail, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-full text-[10px] font-sans bg-[#FAF7F2] text-[#6B5E55] border border-[#E8E2D9]"
                >
                  {detail}
                </span>
              ))}
            </div>
          )}

          {/* Notas personalizadas */}
          {item.customNotes && (
            <p className="text-[11px] font-sans text-[#A06136] italic mt-1">
              Nota: "{item.customNotes}"
            </p>
          )}
        </div>
      </div>

      {/* 2. Controles de Cantidad, Subtotal y Acción Eliminar */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D9]">
        
        {/* Selector [-] Qty [+] */}
        <div className="flex items-center bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] p-0.5">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            aria-label="Restar una unidad"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#2B1810] hover:bg-white transition-colors cursor-pointer text-sm font-bold"
          >
            −
          </button>
          <span className="w-8 text-center text-xs font-bold text-[#2B1810]">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, 1)}
            aria-label="Sumar una unidad"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#2B1810] hover:bg-white transition-colors cursor-pointer text-sm font-bold"
          >
            +
          </button>
        </div>

        {/* Subtotal del ítem */}
        <div className="text-right min-w-[70px]">
          <span className="text-[10px] text-[#6B5E55] block sm:hidden">Subtotal:</span>
          <span className="font-serif text-sm font-bold text-[#2B1810]">
            ${item.price * item.quantity} MXN
          </span>
        </div>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Eliminar ${item.name} del carrito`}
          className="p-1.5 rounded-lg text-[#6B5E55] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

      </div>

    </div>
  );
};