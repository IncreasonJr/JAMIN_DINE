import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, Star, Flame, Sparkles } from 'lucide-react';
import { MenuItem, SizeOption, ExtraOption } from '../types';
import { useCart } from '../context/CartContext';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(undefined);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults whenever modal opens or item changes
  useEffect(() => {
    if (item) {
      // Default size is the one with price 0 (original) or the first size
      const defaultSize = item.sizes?.find((s) => s.price === 0) || item.sizes?.[0];
      setSelectedSize(defaultSize);
      setSelectedExtras([]);
      setInstructions('');
      setQuantity(1);
    }
  }, [item, isOpen]);

  if (!item) return null;

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Calculate live unit price
  const sizeDelta = selectedSize ? selectedSize.price : 0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = Math.max(0, item.price + sizeDelta + extrasTotal);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedSize, selectedExtras, instructions);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-float overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-64 w-full bg-cream-200 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/30" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/70 hover:bg-charcoal text-white flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  {item.badge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider mb-1.5 shadow-sm">
                      {item.isSpicy ? <Flame className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                      {item.badge}
                    </span>
                  )}
                  <h3 className="text-2xl font-extrabold text-white leading-tight">
                    {item.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-400">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Meta details & description */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs font-semibold text-charcoal-muted">
                  {item.rating && (
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-charcoal-light">({item.reviewCount || 100}+)</span>
                    </div>
                  )}
                  {item.calories && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-charcoal-border" />
                      <span>{item.calories}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Sizes / Portion Customization */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-orange-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-charcoal">Choose Size / Style</h4>
                    <span className="text-[11px] font-semibold text-primary bg-orange-50 px-2 py-0.5 rounded-md">
                      Required
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.sizes.map((size) => {
                      const isSelected = selectedSize?.id === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`flex items-center justify-between p-3 rounded-2xl border text-sm font-semibold transition-all text-left ${
                            isSelected
                              ? 'border-primary bg-orange-50/70 text-charcoal ring-2 ring-primary/20'
                              : 'border-orange-100/80 bg-white hover:bg-cream-100 text-charcoal'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-primary bg-primary' : 'border-charcoal-border'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span>{size.name}</span>
                          </div>
                          <span className="text-xs font-bold text-charcoal-muted">
                            {size.price > 0
                              ? `+$${size.price.toFixed(2)}`
                              : size.price < 0
                              ? `-$${Math.abs(size.price).toFixed(2)}`
                              : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extras & Add-ons */}
              {item.extras && item.extras.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-orange-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-charcoal">Delicious Extras</h4>
                    <span className="text-[11px] text-charcoal-muted">Optional</span>
                  </div>
                  <div className="space-y-2">
                    {item.extras.map((extra) => {
                      const isChecked = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl border text-sm font-semibold transition-all ${
                            isChecked
                              ? 'border-primary bg-orange-50/60 text-charcoal'
                              : 'border-orange-100/80 bg-white hover:bg-cream-100 text-charcoal'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-charcoal-border bg-white text-transparent'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <span>{extra.name}</span>
                          </div>
                          <span className="text-xs font-bold text-primary">
                            +${extra.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="space-y-2 pt-4 border-t border-orange-100">
                <label
                  htmlFor="special-instructions"
                  className="block text-sm font-bold text-charcoal"
                >
                  Special Instructions
                </label>
                <textarea
                  id="special-instructions"
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Extra sauce on side, no pickles, allergy notes..."
                  className="w-full rounded-2xl border border-orange-100 bg-cream-50 p-3 text-xs sm:text-sm text-charcoal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                />
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-orange-100 flex items-center gap-4 shrink-0 shadow-soft">
              {/* Quantity Selector */}
              <div className="flex items-center bg-cream-200 rounded-2xl p-1 border border-orange-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-cream-100 text-charcoal disabled:opacity-40 flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <span className="w-9 text-center font-bold text-sm text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-cream-100 text-charcoal flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Add to Cart</span>
                <span>${totalPrice.toFixed(2)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
