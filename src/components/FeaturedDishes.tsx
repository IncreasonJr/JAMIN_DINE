import React, { useState } from 'react';
import { Star, Plus, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import { ItemModal } from './ItemModal';

export const FeaturedDishes: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Take the 4 primary fan favorites
  const featuredDishes = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    // If item has sizes or extras, open modal for options. Otherwise add directly.
    if ((item.sizes && item.sizes.length > 1) || (item.extras && item.extras.length > 0)) {
      setSelectedItem(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <section id="fan-favorites" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Customer Top Picks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              Fan Favorites
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-xl">
              The dishes our regulars can't stop ordering. Hand-smashed, loaded, and spun fresh every day.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedItem(dish)}
              className="group cursor-pointer bg-white rounded-3xl p-4 border border-orange-100 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-cream-200 mb-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-charcoal/80 backdrop-blur-md text-white text-[11px] font-bold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {dish.badge}
                    </span>
                  )}
                  {dish.rating && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-bold text-charcoal shadow-xs">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      <span>{dish.rating}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-bold text-base text-charcoal group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-orange-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-charcoal-light block">Price</span>
                  <span className="text-lg font-extrabold text-charcoal">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, dish)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cream-200 group-hover:bg-primary text-charcoal group-hover:text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
