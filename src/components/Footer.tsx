import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Clock, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream-200 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-warm">
                <ChefHat className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Savory<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-cream-400 max-w-sm leading-relaxed">
              Smash burgers, crispy seasoned sides, and thick hand-spun shakes. Made to order using 100% Angus beef and local dairy. Delivered hot and fresh in 30 minutes.
            </p>
            <div className="space-y-2 pt-2 text-xs text-cream-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>452 Gourmet Way, Downtown Food District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>(555) 728-6799</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>orders@savoryeats.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-cream-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-primary transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <a href="#fan-favorites" className="hover:text-primary transition-colors">
                  Fan Favorites
                </a>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-primary transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">
              Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-cream-400">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Clock className="w-4 h-4" />
                <span>Open 7 Days a Week</span>
              </div>
              <p>Mon – Thu: 11:00 AM – 10:30 PM</p>
              <p>Fri – Sat: 11:00 AM – Midnight</p>
              <p>Sunday: 11:00 AM – 10:00 PM</p>
              <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-accent-green/20 text-accent-green text-[11px] font-bold">
                ● Kitchen Open Now
              </span>
            </div>
          </div>

          {/* Newsletter / Promo box */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">
              Secret Perks
            </h4>
            <p className="text-xs text-cream-400">
              Get secret drops and exclusive discounts delivered to your inbox.
            </p>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-[11px] text-cream-300">
                Use code <span className="font-bold text-primary">SAVE10</span> for 10% off your entire order!
              </p>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-xl bg-charcoal border border-white/10 text-xs text-white placeholder:text-cream-400 focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p>© {new Date().getFullYear()} Savory Burgers & Shakes. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-primary text-primary" />
            <span>for genuine food lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
