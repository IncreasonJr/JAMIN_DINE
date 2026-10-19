import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const StickyOrderButton: React.FC = () => {
  const { totalItemCount, total, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 150px
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        // On home page hide if near top, on menu page or if cart has items always keep visible or after scroll
        setIsVisible(window.scrollY > 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show on checkout or confirmation pages
  if (location.pathname === '/checkout' || location.pathname === '/confirmation') {
    return null;
  }

  const handleClick = () => {
    if (totalItemCount > 0) {
      openCart();
    } else {
      navigate('/menu');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-5 inset-x-0 z-30 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-md w-full">
            <button
              onClick={handleClick}
              className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span>
                  {totalItemCount > 0 ? `View Cart (${totalItemCount} items)` : 'Order Now'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {totalItemCount > 0 && (
                  <span className="font-black">${total.toFixed(2)}</span>
                )}
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
