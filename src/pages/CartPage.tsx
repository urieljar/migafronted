import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';

export interface CartPageProps {
  onNavigateToCatalog: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigateToCatalog }) => {
  const { cart, clearCart, updateQuantity, removeFromCart, totalItems } = useCart();

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#2B1810]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10">
        
        {/* Encabezado */}
        <header className="mb-10 text-left">
          <span className="font-sans text-xs tracking-widest text-[#A06136] uppercase font-semibold">
            Bolsa de Horneado
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1810] mt-2 mb-2">
            Resumen de Pedido
          </h1>
          <p className="font-sans text-sm text-[#6B5E55]">
            Revisa tus piezas de masa madre y repostería antes de programar tu entrega.
          </p>
        </header>

        {/* ================= ESTADO VACÍO (EMPTY STATE) ================= */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D9] p-12 sm:p-20 text-center max-w-2xl mx-auto shadow-xs space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E2D9] flex items-center justify-center text-[#A06136]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1810]">
                Tu carrito está vacío de migas...
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#6B5E55] max-w-md mx-auto leading-relaxed">
                Aún no has agregado hogazas, croissants o pasteles a tu orden. Visita nuestro catálogo para elegir tus favoritos horneados en el día.
              </p>
            </div>

            <button
              onClick={onNavigateToCatalog}
              type="button"
              className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wide text-white bg-[#A06136] hover:bg-[#874F2A] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              Explorar Catálogo de Productos
            </button>
          </div>
        ) : (
          /* ================= LAYOUT 2 COLUMNAS (1440px) ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Listado de Ítems (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
                <span className="text-xs font-sans text-[#6B5E55]">
                  Tienes <strong className="text-[#2B1810] font-semibold">{totalItems}</strong> {totalItems === 1 ? 'artículo' : 'artículos'} en tu pedido
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-sans text-[#A06136] hover:underline cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={onNavigateToCatalog}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#A06136] hover:text-[#874F2A] transition-colors cursor-pointer"
                >
                  ← Seguir explorando productos
                </button>
              </div>
            </div>

            {/* Columna Derecha: Resumen Financiero y Checkout (4 cols) */}
            <div className="lg:col-span-4">
              <OrderSummaryCard />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};