import React, { useState } from 'react';

export type NavPage = 'inicio' | 'catalogo' | 'personalizar' | 'proceso' | 'contacto';

export interface NavbarProps {
  cartCount?: number;
  activePage?: NavPage;
  onNavigate?: (page: NavPage) => void;
  onCartClick?: () => void;
  onWhatsAppClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  activePage = 'inicio',
  onNavigate,
  onCartClick,
  onWhatsAppClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; id: NavPage }[] = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Catálogo', id: 'catalogo' },
    { label: 'Personaliza tu pedido', id: 'personalizar' },
    { label: 'Cómo trabajamos', id: 'proceso' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleNavClick = (pageId: NavPage, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate?.(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    if (onWhatsAppClick) {
      onWhatsAppClick();
    } else {
      window.open('https://wa.me/5210000000000?text=Hola%20Miga,%20quisiera%20hacer%20un%20pedido', '_blank');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#E8E2D9] transition-all">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Monograma & Marca (Click para ir a Inicio) */}
        <button
          onClick={(e) => handleNavClick('inicio', e)}
          type="button"
          className="flex flex-col items-center group select-none cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-3xl font-bold tracking-tight text-[#2B1810] leading-none group-hover:text-[#A06136] transition-colors">
            M
          </span>
          <span className="font-serif text-xs font-medium tracking-widest text-[#2B1810] lowercase -mt-1 group-hover:text-[#A06136] transition-colors">
            miga
          </span>
        </button>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#2B1810] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#A06136]'
                    : 'text-[#2B1810]/70 hover:text-[#2B1810]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Acciones (Carrito + Botón WhatsApp) */}
        <div className="flex items-center gap-4">
          {/* Botón Carrito */}
          <button
            onClick={onCartClick}
            type="button"
            aria-label="Ver carrito de compras"
            className="relative p-2.5 rounded-full text-[#2B1810] hover:bg-[#E8E2D9]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#A06136] cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-[#A06136] rounded-full shadow-xs">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* Botón Pill WhatsApp */}
          <button
            onClick={handleWhatsApp}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide text-white bg-[#2B1810] hover:bg-[#3D2317] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current text-[#FAF7F2]"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.026.565 1.777.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.97 9.98-1.748 0-3.385-.453-4.819-1.242l-5.211 1.366 1.393-5.086c-.889-1.488-1.393-3.228-1.393-5.088 0-5.503 4.477-9.98 9.97-9.98 5.493 0 9.97 4.477 9.97 9.98z" />
            </svg>
            Pedir por WhatsApp
          </button>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-lg text-[#2B1810] hover:bg-[#E8E2D9]/50 focus:outline-none cursor-pointer"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] bg-[#FAF7F2] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(link.id, e)}
              className={`block py-2 text-sm font-medium ${
                activePage === link.id ? 'text-[#A06136] font-semibold' : 'text-[#2B1810]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleWhatsApp}
            type="button"
            className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-full text-xs font-medium text-white bg-[#2B1810]"
          >
            Pedir por WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};