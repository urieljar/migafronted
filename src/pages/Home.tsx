import React from 'react';

export interface ProductItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
}

export interface HomeProps {
  onSelectProduct?: (product: ProductItem) => void;
  onExploreCatalog?: () => void;
  onCustomizeCake?: () => void;
}

const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'hogaza-campesina',
    name: 'Hogaza Campesina',
    desc: 'Fermentación en frío de 36h con mezcla de harina orgánica y centeno.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'croissant-mantequilla',
    name: 'Croissant Tradicional',
    desc: 'Hojaldre laminado a mano con mantequilla pura 100% de pastoreo.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'focaccia-romero-oliva',
    name: 'Focaccia Romero & Oliva',
    desc: 'Aceite de oliva virgen extra, sal marina en escamas y romero fresco.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'tarta-frutos-rojos',
    name: 'Tarta Frutos del Bosque',
    desc: 'Base sableé de almendra con crema pastelera suave de vainilla natural.',
    price: 185,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=900&auto=format&fit=crop',
  },
];

export const Home: React.FC<HomeProps> = ({
  onSelectProduct,
  onExploreCatalog,
  onCustomizeCake,
}) => {
  return (
    <div className="w-full bg-[#FAF7F2] text-[#2B1810]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[560px] lg:min-h-[640px] flex items-center bg-[#2B1810] overflow-hidden">
        {/* Imagen de Fondo con degradado hacia la izquierda */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1920&auto=format&fit=crop"
            alt="Masa madre y panes artesanales horneándose"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B1810] via-[#2B1810]/85 to-transparent" />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl text-left">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-[#A06136]/30 text-[#F2ECE4] border border-[#A06136]/50 mb-6">
              Masa Madre & Repostería de Casa
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6">
              Bienvenido a Miga: <br />
              <span className="italic font-normal text-[#F2ECE4]">Pan Artesanal y Masa Madre.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#F2ECE4]/90 font-light leading-relaxed mb-8 max-w-xl">
              Respetamos los tiempos de la fermentación natural. Horneamos en pequeños lotes con ingredientes limpios para llevar a tu mesa el pan que nutre y reconforta.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                type="button"
                className="px-7 py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-[#A06136] hover:bg-[#874F2A] active:scale-[0.98] transition-all shadow-md"
              >
                Explorar Catálogo
              </button>
              <button
                onClick={onCustomizeCake}
                type="button"
                className="px-7 py-3.5 rounded-full text-sm font-medium tracking-wide text-white border border-white/70 hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                Personalizar Pastel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILARES DE CONFIANZA */}
      <section className="py-20 border-b border-[#E8E2D9]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Pilar 1 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] flex items-center justify-center text-[#A06136]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#2B1810] mb-3">
                Ingredientes Naturales
              </h3>
              <p className="font-sans text-sm text-[#2B1810]/75 leading-relaxed">
                Seleccionamos harinas limpias no blanqueadas, mantequilla pura de vaca y sal de mar. Sin conservadores, aditivos ni atajos industriales.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] flex items-center justify-center text-[#A06136]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#2B1810] mb-3">
                Masa Madre Viva
              </h3>
              <p className="font-sans text-sm text-[#2B1810]/75 leading-relaxed">
                Nuestros panes nacen de un cultivo biológico propio. Fermentaciones lentas de 24 a 48 horas que aportan digestibilidad, sabor y aroma único.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] flex items-center justify-center text-[#A06136]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#2B1810] mb-3">
                Proceso Artesanal
              </h3>
              <p className="font-sans text-sm text-[#2B1810]/75 leading-relaxed">
                Moldeado a mano y horneado exclusivamente bajo demanda en tandas reducidas. Cuidamos cada corte y costra como si fuera para nuestra propia familia.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECCIÓN FAVORITOS / DESTACADOS */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-sans text-xs tracking-widest text-[#A06136] uppercase font-semibold">
                Nuestros Favoritos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810] mt-1">
                Descubre Nuestra Selección
              </h2>
            </div>
            <a
              href="#catalogo"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A06136] hover:text-[#874F2A] transition-colors group"
            >
              Ver todo el menú
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Grid 4 Columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Imagen 4/3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2]/95 text-[#2B1810] shadow-sm backdrop-blur-xs">
                    ${product.price} MXN
                  </div>
                </div>

                {/* Contenido Card */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2B1810] group-hover:text-[#A06136] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-[#2B1810]/70 leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectProduct?.(product)}
                    type="button"
                    className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-medium tracking-wide text-[#2B1810] bg-[#FAF7F2] border border-[#E8E2D9] hover:bg-[#A06136] hover:text-white hover:border-[#A06136] active:scale-[0.98] transition-all text-center"
                  >
                    Agregar al pedido
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};