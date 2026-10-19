import React from 'react';
import { motion } from 'framer-motion';
import { MenuGrid } from '../components/MenuGrid';
import { StickyOrderButton } from '../components/StickyOrderButton';
import { Sparkles, Bike, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Menu: React.FC = () => {
  const { orderType, setOrderType } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-10 lg:py-14 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Banner Header */}
        <div className="relative rounded-3xl bg-charcoal text-white p-8 sm:p-12 overflow-hidden shadow-warm">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Smashed Fresh Daily • 100% Angus Beef</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Our Fresh & Savory Menu
            </h1>

            <p className="text-sm sm:text-base text-cream-400">
              Pick your favorites, customize with premium toppings and cheeses, and we’ll smash it on the griddle right away.
            </p>

            {/* Order Preference Switcher */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-cream-300">Ordering for:</span>
              <div className="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-cream-300 hover:text-white'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  Delivery (30 min)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'pickup'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-cream-300 hover:text-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  Pickup (15 min)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid with Categories & Search */}
        <MenuGrid />
      </div>

      {/* Sticky Order Button on Mobile/Desktop */}
      <StickyOrderButton />
    </motion.div>
  );
};
