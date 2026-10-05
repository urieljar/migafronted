import { useState } from 'react';
import { Navbar, type NavPage } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { CatalogPage } from './pages/CatalogPage';
import { Footer } from './components/layout/Footer';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { CartPage } from './pages/CartPage';
import { CartProvider, useCart } from './context/CartContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavPage>('inicio');
  const { totalItems, addToCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Navbar con control de página activa y badge en tiempo real */}
      <Navbar
        cartCount={totalItems}
        activePage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onCartClick={() => setCurrentPage('carrito')}
      />

      {/* 2. Renderizado dinámico de la página */}
      <main className="flex-1">
        {currentPage === 'inicio' && (
          <Home
            onExploreCatalog={() => setCurrentPage('catalogo')}
            onSelectProduct={(item) =>
              addToCart({
                id: item.id,
                productId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                details: ['Masa Madre'],
              })
            }
          />
        )}

        {currentPage === 'catalogo' && (
          <CatalogPage
            onAddToCart={(product) =>
              addToCart({
                id: product.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                details: product.dietaryTags,
              })
            }
          />
        )}

        {currentPage === 'personalizar' && <CustomOrderPage />}

        {currentPage === 'proceso' && (
          <HowItWorksPage
            onNavigateToCatalog={() => setCurrentPage('catalogo')}
          />
        )}

        {currentPage === 'contacto' && <ContactPage />}

        {currentPage === 'carrito' && (
          <CartPage onNavigateToCatalog={() => setCurrentPage('catalogo')} />
        )}
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;