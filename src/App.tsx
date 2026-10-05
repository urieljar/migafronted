import { useState } from 'react';
import { Navbar, type NavPage } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { CatalogPage } from './pages/CatalogPage';
import { Footer } from './components/layout/Footer';
import type { Product } from './types/catalog';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { CustomOrderPage } from './pages/CustomOrderPage';

function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('inicio');
  const [cart, setCart] = useState<Product[]>([]);

  // Agregar al carrito desde el catálogo o desde favoritos
  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Navbar con control de página activa */}
      <Navbar
        cartCount={cart.length}
        activePage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />

      {/* 2. Renderizado dinámico de la página */}
      <main className="flex-1">
        {currentPage === 'inicio' && (
          <Home
            onExploreCatalog={() => setCurrentPage('catalogo')}
            onSelectProduct={(item) =>
              handleAddToCart({
                id: item.id,
                name: item.name,
                category: 'panaderia',
                price: item.price,
                prepTime: '24h',
                description: item.desc,
                image: item.image,
              })
            }
          />
        )}

        {currentPage === 'catalogo' && (
          <CatalogPage onAddToCart={handleAddToCart} />
        )}

        {/* Placeholders amigables para las otras secciones mientras se crean */}
        {currentPage !== 'inicio' && currentPage !== 'catalogo' && currentPage !== 'proceso' && currentPage !== 'contacto' && currentPage !== 'personalizar' &&(
          <div className="py-24 text-center px-6">
            <h2 className="font-serif text-3xl font-bold text-[#2B1810]">
              Sección en preparación
            </h2>
            <p className="font-sans text-sm text-[#6B5E55] mt-2 mb-6">
              Pronto podrás disfrutar de esta sección.
            </p>
            <button
              onClick={() => setCurrentPage('inicio')}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#A06136] hover:bg-[#874F2A]"
            >
              Volver al inicio
            </button>
          </div>
        )}
       
        {currentPage === 'proceso' && (
          <HowItWorksPage
            onNavigateToCatalog={() => setCurrentPage('catalogo')}
          />
        )}

        {currentPage === 'contacto' && <ContactPage />}

        {currentPage === 'personalizar' && <CustomOrderPage />}
        
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default App;