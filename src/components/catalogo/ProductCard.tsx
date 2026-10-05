import React, { useState } from 'react';
import type { Product } from '../../types/catalog';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Contenedor de Imagen 4:3 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badge Temporada / Edición Especial */}
        {product.isSeasonal && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#A06136] text-white shadow-xs">
            Edición Especial
          </span>
        )}

        {/* Badge Tiempo de Preparación */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF7F2]/95 text-[#2B1810] border border-[#E8E2D9]/80 shadow-xs backdrop-blur-xs">
          {product.prepTime}
        </span>

        {/* Badge Pack / Porciones */}
        {product.packInfo && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-sans font-medium bg-[#2B1810]/80 text-[#FAF7F2] backdrop-blur-xs">
            {product.packInfo}
          </span>
        )}
      </div>

      {/* Contenido Card */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Etiquetas Dietéticas */}
          {product.dietaryTags && product.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FAF7F2] text-[#6B5E55] border border-[#E8E2D9]"
                >
                  {tag.replace('-', ' ')}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-start justify-between gap-2 pt-1">
            <h3 className="font-serif text-lg font-bold text-[#2B1810] group-hover:text-[#A06136] transition-colors leading-snug">
              {product.name}
            </h3>
            <span className="font-serif text-base font-bold text-[#A06136] shrink-0">
              ${product.price} <span className="text-[10px] font-sans font-normal text-[#6B5E55]">MXN</span>
            </span>
          </div>

          <p className="font-sans text-xs text-[#6B5E55] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Botón Acción con Feedback Visual */}
        <button
          onClick={handleAdd}
          type="button"
          disabled={added}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-[0.98] ${
            added
              ? 'bg-[#2B1810] text-[#FAF7F2]'
              : 'bg-[#A06136] text-white hover:bg-[#874F2A] shadow-xs'
          }`}
        >
          {added ? '✓ Agregado al Pedido' : 'Agregar al Pedido'}
        </button>
      </div>
    </article>
  );
};