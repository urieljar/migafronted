import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { CustomerCheckoutData } from '../../types/cart';

export const OrderSummaryCard: React.FC = () => {
  const {
    cart,
    totalItems,
    subtotal,
    shippingCost,
    discount,
    totalAmount,
    deliveryMethod,
    setDeliveryMethod,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  // Fecha mínima: Mañana (24h de anticipación)
  const minDeliveryDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  const [checkoutData, setCheckoutData] = useState<CustomerCheckoutData>({
    name: '',
    phone: '',
    deliveryDate: minDeliveryDate,
    deliveryMethod: 'pickup',
    address: '',
    notes: '',
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (!ok) {
      setCouponError(true);
    } else {
      setCouponError(false);
      setCouponInput('');
    }
  };

  const handleProceedWhatsApp = () => {
    // Validar nombre y teléfono
    if (!checkoutData.name.trim() || !checkoutData.phone.trim()) {
      setValidationError('Por favor ingresa tu nombre y teléfono para el pedido.');
      return;
    }

    if (deliveryMethod === 'delivery' && !checkoutData.address?.trim()) {
      setValidationError('Ingresa la dirección completa para el envío a domicilio.');
      return;
    }

    setValidationError(null);

    // Armar mensaje formateado para WhatsApp
    const lines = [
      `🛒 *¡Hola Miga! Quiero confirmar el siguiente pedido:*`,
      `*Cliente:* ${checkoutData.name.trim()}`,
      `*Teléfono:* ${checkoutData.phone.trim()}`,
      `*Modalidad:* ${
        deliveryMethod === 'delivery'
          ? `Envío a Domicilio (${checkoutData.address})`
          : 'Punto de Recogida en Taller (Gratis)'
      }`,
      `*Fecha Deseada:* ${checkoutData.deliveryDate}`,
      checkoutData.notes ? `*Instrucciones:* ${checkoutData.notes}` : null,
      `\n*Productos (${totalItems} piezas):*`,
      ...cart.map(
        (item) => `• ${item.quantity}x ${item.name} - $${item.price * item.quantity} MXN`
      ),
      `\n*Subtotal:* $${subtotal} MXN`,
      shippingCost > 0 ? `*Envío Local:* $${shippingCost} MXN` : null,
      discount > 0 ? `*Descuento Cupón (${couponCode}):* -$${discount} MXN` : null,
      `*TOTAL:* $${totalAmount} MXN`,
      `\n¿Podrían indicarme los datos para el anticipo y horario?`,
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/5215512345678?text=${encoded}`, '_blank');
  };

  return (
    <aside className="w-full bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-7 shadow-xs sticky top-28 space-y-6 text-left">
      <div>
        <span className="text-xs font-sans tracking-widest text-[#A06136] uppercase font-semibold">
          Finalizar Compra
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#2B1810] mt-1">
          Resumen de Pedido
        </h3>
      </div>

      {validationError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
          {validationError}
        </div>
      )}

      {/* 1. Modalidad de Entrega (Tabs) */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#2B1810]">
          Modalidad de Entrega:
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setDeliveryMethod('pickup');
              setCheckoutData((prev) => ({ ...prev, deliveryMethod: 'pickup' }));
            }}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              deliveryMethod === 'pickup'
                ? 'bg-[#A06136] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#6B5E55] border border-[#E8E2D9] hover:bg-[#E8E2D9]'
            }`}
          >
            Recoger en Taller (Gratis)
          </button>

          <button
            type="button"
            onClick={() => {
              setDeliveryMethod('delivery');
              setCheckoutData((prev) => ({ ...prev, deliveryMethod: 'delivery' }));
            }}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              deliveryMethod === 'delivery'
                ? 'bg-[#A06136] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#6B5E55] border border-[#E8E2D9] hover:bg-[#E8E2D9]'
            }`}
          >
            Envío Local (+$30)
          </button>
        </div>
      </div>

      {/* 2. Datos del Cliente */}
      <div className="space-y-3 font-sans text-xs">
        <div>
          <label className="block font-medium text-[#2B1810] mb-1">
            Tu Nombre Completo *
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Carlos Mendoza"
            value={checkoutData.name}
            onChange={(e) =>
              setCheckoutData({ ...checkoutData, name: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136]"
          />
        </div>

        <div>
          <label className="block font-medium text-[#2B1810] mb-1">
            WhatsApp / Teléfono *
          </label>
          <input
            type="tel"
            required
            placeholder="55 1234 5678"
            value={checkoutData.phone}
            onChange={(e) =>
              setCheckoutData({ ...checkoutData, phone: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136]"
          />
        </div>

        <div>
          <label className="block font-medium text-[#2B1810] mb-1">
            Fecha de Horneado / Entrega *
          </label>
          <input
            type="date"
            required
            min={minDeliveryDate}
            value={checkoutData.deliveryDate}
            onChange={(e) =>
              setCheckoutData({ ...checkoutData, deliveryDate: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136] cursor-pointer"
          />
        </div>

        {deliveryMethod === 'delivery' && (
          <div>
            <label className="block font-medium text-[#2B1810] mb-1">
              Dirección de Entrega *
            </label>
            <input
              type="text"
              required
              placeholder="Calle, número, colonia..."
              value={checkoutData.address}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, address: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136]"
            />
          </div>
        )}
      </div>

      {/* 3. Cupón de Descuento */}
      <div className="pt-2 border-t border-[#E8E2D9]">
        <label className="block text-xs font-semibold text-[#2B1810] mb-1.5">
          ¿Tienes un cupón?
        </label>
        {couponCode ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] border border-[#A06136]/40 text-xs">
            <span className="font-semibold text-[#A06136]">
              Cupón: {couponCode} aplicado (-${discount} MXN)
            </span>
            <button
              onClick={removeCoupon}
              className="text-[#6B5E55] hover:text-red-700 text-xs cursor-pointer"
            >
              Quitar
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. MIGA10"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs uppercase text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136]"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#2B1810] bg-[#FAF7F2] border border-[#E8E2D9] hover:bg-[#E8E2D9] cursor-pointer"
            >
              Aplicar
            </button>
          </form>
        )}
        {couponError && (
          <p className="text-[11px] text-red-600 mt-1">
            Cupón no válido. Prueba con 'MIGA10' o 'BIENVENIDO'.
          </p>
        )}
      </div>

      {/* 4. Desglose Financiero */}
      <div className="space-y-2 text-xs font-sans border-t border-[#E8E2D9] pt-4">
        <div className="flex justify-between text-[#6B5E55]">
          <span>Subtotal ({totalItems} {totalItems === 1 ? 'pieza' : 'piezas'})</span>
          <span className="text-[#2B1810] font-semibold">${subtotal} MXN</span>
        </div>

        <div className="flex justify-between text-[#6B5E55]">
          <span>Costo de Envío</span>
          <span className="text-[#2B1810] font-semibold">
            {shippingCost > 0 ? `+$${shippingCost} MXN` : 'Gratis'}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#A06136] font-semibold">
            <span>Descuento aplicado</span>
            <span>-${discount} MXN</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-3 border-t border-[#E8E2D9]/70 text-[#2B1810]">
          <span className="font-serif text-sm font-bold">Total a pagar:</span>
          <span className="font-serif text-2xl font-bold text-[#A06136]">
            ${totalAmount} <span className="text-xs font-sans font-normal text-[#6B5E55]">MXN</span>
          </span>
        </div>
      </div>

      {/* 5. Botón de Confirmación a WhatsApp */}
      <button
        type="button"
        disabled={cart.length === 0}
        onClick={handleProceedWhatsApp}
        className="w-full py-3.5 px-5 rounded-2xl text-xs font-semibold tracking-wide text-white bg-[#2B1810] hover:bg-[#3D2317] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4 fill-current text-[#FAF7F2]" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.026.565 1.777.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.97 9.98-1.748 0-3.385-.453-4.819-1.242l-5.211 1.366 1.393-5.086c-.889-1.488-1.393-3.228-1.393-5.088 0-5.503 4.477-9.98 9.97-9.98 5.493 0 9.97 4.477 9.97 9.98z" />
        </svg>
        <span>Confirmar Pedido por WhatsApp</span>
      </button>

      <p className="text-[11px] text-[#6B5E55] text-center italic">
        * Se abrirá WhatsApp con el resumen listo para acordar la hora y método de pago (transferencia o efectivo al recibir).
      </p>
    </aside>
  );
};