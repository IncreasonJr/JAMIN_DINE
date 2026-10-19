import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, ShoppingBag, Menu as MenuIcon, X, Bike, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { totalItemCount, openCart, isCartBumping, orderType, setOrderType } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-warm group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-charcoal font-sans group-hover:text-primary transition-colors">
                Savory<span className="text-primary">.</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-charcoal-muted -mt-1 hidden sm:block">
                Fresh & Hot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-cream-200/80 p-1.5 rounded-2xl border border-orange-100/50">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-charcoal hover:text-primary hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-warm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Delivery/Pickup Switcher Badge */}
            <div className="hidden sm:flex items-center bg-cream-200 p-1 rounded-xl border border-orange-100 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  orderType === 'delivery'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  orderType === 'pickup'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                Pickup
              </button>
            </div>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-charcoal text-white hover:bg-primary transition-all duration-200 shadow-soft font-semibold text-sm group ${
                isCartBumping ? 'animate-bump bg-primary ring-4 ring-orange-200' : ''
              }`}
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Cart</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalItemCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-primary group-hover:bg-charcoal text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                >
                  {totalItemCount}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-cream-200 text-charcoal hover:bg-cream-300 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-orange-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-warm"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-white shadow-warm'
                        : 'text-charcoal hover:bg-cream-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile order mode switch */}
            <div className="pt-2 border-t border-orange-50">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider block mb-2 px-1">
                Order Preference
              </span>
              <div className="grid grid-cols-2 gap-2 bg-cream-200 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-charcoal-muted'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                    orderType === 'pickup'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-charcoal-muted'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  Pickup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
