import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Star,
  Sparkles,
  Flame,
  Coffee,
  IceCream,
  CircleDot,
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/menuItems';
import { ItemModal } from './ItemModal';

export const MenuGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', name: 'Full Menu', icon: UtensilsCrossed },
    { id: 'burgers', name: 'Smash Burgers', icon: Flame },
    { id: 'sides', name: 'Crispy Sides', icon: CircleDot },
    { id: 'drinks', name: 'Thick Shakes & Drinks', icon: Coffee },
    { id: 'desserts', name: 'Warm Desserts', icon: IceCream },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white hover:bg-cream-200 text-charcoal border border-orange-100/80 shadow-xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-primary rounded-2xl shadow-warm"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search burgers, sides, shakes..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-orange-100 text-xs sm:text-sm text-charcoal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal-light hover:text-charcoal"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-orange-100 p-8 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cream-200 text-primary flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-charcoal text-lg">No dishes found</h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm mx-auto">
            We couldn't find any items matching "{searchQuery}". Try searching for burgers, fries, or shakes!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 px-5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-xs font-bold text-charcoal transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(dish)}
                className="group cursor-pointer bg-white rounded-3xl p-4 border border-orange-100 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-cream-200 mb-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    {dish.badge && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-charcoal/80 backdrop-blur-md text-white text-[11px] font-bold">
                        {dish.isSpicy ? (
                          <Flame className="w-3 h-3 text-red-400" />
                        ) : (
                          <Sparkles className="w-3 h-3 text-amber-400" />
                        )}
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

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base text-charcoal group-hover:text-primary transition-colors leading-snug">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & Add to Cart */}
                <div className="pt-4 mt-4 border-t border-orange-50 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-charcoal-light block">
                      {dish.calories ? dish.calories : 'Made Fresh'}
                    </span>
                    <span className="text-lg font-black text-charcoal">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(dish);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs group-hover:scale-105"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
