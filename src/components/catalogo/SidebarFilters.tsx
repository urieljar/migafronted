import React from 'react';
import type { CategoryType, DietaryTag } from '../../types/catalog';

export interface SidebarFiltersProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  maxPrice: number;
  priceLimit: number;
  onPriceChange: (val: number) => void;
  selectedDietary: DietaryTag[];
  onToggleDietary: (tag: DietaryTag) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'todos', label: 'Ver Todo' },
  { id: 'panaderia', label: 'Panadería & Masa Madre' },
  { id: 'pasteles', label: 'Pasteles & Tartas' },
  { id: 'galletas', label: 'Galletas Artesanales' },
  { id: 'postres', label: 'Postres & Bizcochos' },
  { id: 'boxes', label: 'Boxes & Regalos' },
  { id: 'temporada', label: 'Ediciones Especiales' },
];

const DIETARY_TAGS: { id: DietaryTag; label: string }[] = [
  { id: 'masa-madre', label: '100% Masa Madre' },
  { id: 'vegano', label: 'Opciones Veganas' },
  { id: 'sin-gluten', label: 'Sin Gluten' },
  { id: 'sin-azucar', label: 'Sin Azúcar Refinada' },
];

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  priceLimit,
  onPriceChange,
  selectedDietary,
  onToggleDietary,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <aside className="w-full bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-8">
      {/* Encabezado del filtro */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
        <h3 className="font-serif text-lg font-bold text-[#2B1810]">
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="text-xs font-sans text-[#A06136] hover:text-[#874F2A] hover:underline transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* 1. Categorías */}
      <div className="space-y-3">
        <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">
          Categorías
        </h4>
        <nav className="flex flex-col space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                type="button"
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#A06136] text-white shadow-xs'
                    : 'text-[#2B1810] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white ml-2" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Rango de Presupuesto */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">
            Presupuesto Máximo
          </h4>
          <span className="font-serif text-sm font-bold text-[#2B1810]">
            ${maxPrice} MXN
          </span>
        </div>
        <input
          type="range"
          min="50"
          max={priceLimit}
          step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-1.5 bg-[#E8E2D9] rounded-lg appearance-none cursor-pointer accent-[#A06136]"
        />
        <div className="flex justify-between text-[11px] text-[#6B5E55]">
          <span>$50</span>
          <span>Hasta ${priceLimit}</span>
        </div>
      </div>

      {/* 3. Etiquetas Dietéticas */}
      <div className="space-y-3">
        <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">
          Preferencias & Dietas
        </h4>
        <div className="space-y-2.5">
          {DIETARY_TAGS.map((tag) => {
            const isChecked = selectedDietary.includes(tag.id);
            return (
              <label
                key={tag.id}
                className="flex items-center gap-3 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleDietary(tag.id)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#A06136] border-[#A06136] text-white'
                      : 'border-[#E8E2D9] bg-white group-hover:border-[#A06136]'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-sans text-[#2B1810] group-hover:text-[#A06136] transition-colors">
                  {tag.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};