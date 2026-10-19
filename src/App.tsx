import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';

// Helper to scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-cream text-charcoal">
          {/* Main App Navigation Header */}
          <Header />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Global Cart Slide-out Drawer */}
          <CartDrawer />

          {/* Global Toast Notification System */}
          <Toast />

          {/* Footer */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
