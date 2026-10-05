import React, { useState, useMemo } from 'react';
import type { CategoryType, DietaryTag, Product, SortOption } from '../types/catalog';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { ProductCard } from '../components/catalogo/ProductCard';
import { SidebarFilters } from '../components/catalogo/SidebarFilters';


export interface CatalogPageProps {
  onAddToCart?: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart }) => {
  const [category, setCategory] = useState<CategoryType>('todos');
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');

  const maxPriceLimit = 600;

  // Toggle de tags dietéticas
  const handleToggleDietary = (tag: DietaryTag) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Limpiar todos los filtros
  const handleResetFilters = () => {
    setCategory('todos');
    setDietary([]);
    setMaxPrice(maxPriceLimit);
    setSearchQuery('');
    setSortBy('relevancia');
  };

  const hasActiveFilters =
    category !== 'todos' ||
    dietary.length > 0 ||
    maxPrice < maxPriceLimit ||
    searchQuery.trim().length > 0;

  // Filtrado y ordenamiento reactivo
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      // 1. Categoría
      if (category !== 'todos' && prod.category !== category) {
        return false;
      }
      // 2. Presupuesto
      if (prod.price > maxPrice) {
        return false;
      }
      // 3. Etiquetas dietéticas (debe cumplir todas las seleccionadas)
      if (dietary.length > 0) {
        const hasAllTags = dietary.every((tag) => prod.dietaryTags?.includes(tag));
        if (!hasAllTags) return false;
      }
      // 4. Búsqueda por texto (nombre o descripción)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.price - b.price;
      if (sortBy === 'precio-desc') return b.price - a.price;
      if (sortBy === 'nombre-asc') return a.name.localeCompare(b.name);
      return 0; // relevancia / orden original
    });
  }, [category, dietary, maxPrice, searchQuery, sortBy]);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#2B1810]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10">
        
        {/* Encabezado Editorial */}
        <header className="mb-10 text-left">
          <span className="font-sans text-xs tracking-widest text-[#A06136] uppercase font-semibold">
            Obrador & Horneado Diario
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1810] mt-2 mb-3">
            Nuestro Catálogo Artesanal
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#6B5E55] max-w-2xl font-light">
            Panes de fermentación natural, repostería casera con mantequilla de pastoreo y cajas diseñadas para compartir.
          </p>
        </header>

        {/* Barra Superior: Búsqueda, Contador & Ordenamiento */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-xs">
          
          {/* Input Buscador */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5E55]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por hogaza, croissant, ingredientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-sans rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136]"
            />
          </div>

          {/* Contador y Selector de Orden */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-sans">
            <span className="text-[#6B5E55]">
              Mostrando <strong className="text-[#2B1810] font-semibold">{filteredProducts.length}</strong> productos
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-[#6B5E55] hidden sm:inline">
                Ordenar:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="py-2 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-[#2B1810] text-xs focus:outline-none focus:ring-1 focus:ring-[#A06136] cursor-pointer"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Menor a mayor precio</option>
                <option value="precio-desc">Mayor a menor precio</option>
                <option value="nombre-asc">Nombre (A - Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Layout Principal: 2 Columnas (Sidebar + Grid de Productos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Sidebar (3 cols en desktop) */}
          <div className="lg:col-span-3">
            <SidebarFilters
              selectedCategory={category}
              onSelectCategory={setCategory}
              maxPrice={maxPrice}
              priceLimit={maxPriceLimit}
              onPriceChange={setMaxPrice}
              selectedDietary={dietary}
              onToggleDietary={handleToggleDietary}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Columna Derecha: Grid de Productos (9 cols en desktop) */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => onAddToCart?.(p)}
                  />
                ))}
              </div>
            ) : (
              /* Estado Vacío Amigable */
              <div className="text-center py-20 px-6 bg-white rounded-2xl border border-[#E8E2D9] space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#A06136]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B1810]">
                  No encontramos panes o postres con estos filtros
                </h3>
                <p className="font-sans text-xs text-[#6B5E55] max-w-md mx-auto">
                  Prueba restableciendo los filtros o buscando con términos más generales como "hogaza", "croissant" o "chocolate".
                </p>
                <button
                  onClick={handleResetFilters}
                  type="button"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#A06136] hover:bg-[#874F2A] transition-colors"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};