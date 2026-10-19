import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Bike,
  Store,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CouponInput } from './CouponInput';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    standardDeliveryFee,
    discount,
    total,
    orderType,
    setOrderType,
    appliedCoupon,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const isFreeDelivery = deliveryFee === 0 && orderType === 'delivery' && appliedCoupon?.code === 'FREEDEL';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-orange-100 flex items-center justify-between bg-cream-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-charcoal text-base">Your Cart</h3>
                    <p className="text-xs text-charcoal-muted">
                      {items.length === 0
                        ? 'Empty cart'
                        : `${items.reduce((s, i) => s + i.quantity, 0)} items added`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full bg-cream-200 hover:bg-cream-300 text-charcoal flex items-center justify-center transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Delivery / Pickup switcher in drawer */}
              <div className="px-5 pt-4 pb-2 bg-cream-50 border-b border-orange-100">
                <div className="grid grid-cols-2 gap-1.5 bg-cream-200 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-white text-primary shadow-xs'
                        : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    Delivery (~30m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-white text-primary shadow-xs'
                        : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    Pickup (~15m)
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-primary/70">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-lg">Your cart is hungry!</h4>
                      <p className="text-xs text-charcoal-muted mt-1 max-w-xs">
                        Browse our hot smash burgers, crispy sides and creamy thick shakes.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeCart();
                        navigate('/menu');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-warm transition-all"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((cartItem) => (
                    <motion.div
                      key={cartItem.cartItemId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-3.5 rounded-2xl bg-cream-50 border border-orange-100/70 shadow-xs flex gap-3.5 items-start"
                    >
                      {/* Thumbnail */}
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-orange-100"
                      />

                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-sm text-charcoal leading-snug">
                            {cartItem.item.name}
                          </h4>
                          <span className="font-extrabold text-sm text-charcoal shrink-0">
                            ${cartItem.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        {/* Selected options recap */}
                        <div className="mt-1 space-y-0.5 text-[11px] text-charcoal-muted">
                          {cartItem.selectedSize && (
                            <p className="font-medium text-primary">
                              Size: {cartItem.selectedSize.name}
                            </p>
                          )}
                          {cartItem.selectedExtras.length > 0 && (
                            <p className="truncate">
                              + {cartItem.selectedExtras.map((e) => e.name).join(', ')}
                            </p>
                          )}
                          {cartItem.instructions && (
                            <p className="italic text-charcoal-light truncate">
                              "{cartItem.instructions}"
                            </p>
                          )}
                        </div>

                        {/* Quantity and Remove Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-white rounded-xl p-0.5 border border-orange-100">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                              }
                              className="w-6 h-6 rounded-lg hover:bg-cream-200 text-charcoal flex items-center justify-center transition-colors"
                              aria-label="Decrease quantity"
                            >
                              {cartItem.quantity === 1 ? (
                                <Trash2 className="w-3 h-3 text-accent-red" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-charcoal">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                              }
                              className="w-6 h-6 rounded-lg hover:bg-cream-200 text-charcoal flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(cartItem.cartItemId)}
                            className="text-[11px] font-medium text-charcoal-light hover:text-accent-red transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer (Coupons, Totals & Checkout Button) */}
              {items.length > 0 && (
                <div className="p-5 border-t border-orange-100 bg-white space-y-4 shrink-0 shadow-soft">
                  {/* Coupon section */}
                  <CouponInput />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-orange-50 text-xs">
                    <div className="flex justify-between text-charcoal-muted">
                      <span>Subtotal</span>
                      <span className="font-semibold text-charcoal">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-charcoal-muted items-center">
                      <span className="flex items-center gap-1.5">
                        {orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}
                        {isFreeDelivery && (
                          <span className="text-[10px] font-bold text-accent-green bg-accent-green-light px-1.5 py-0.2 rounded">
                            FREE
                          </span>
                        )}
                      </span>
                      <div>
                        {orderType === 'pickup' ? (
                          <span className="font-semibold text-accent-green">FREE</span>
                        ) : isFreeDelivery ? (
                          <div className="flex items-center gap-1.5">
                            <span className="line-through text-charcoal-light">
                              ${standardDeliveryFee.toFixed(2)}
                            </span>
                            <span className="font-bold text-accent-green">$0.00</span>
                          </div>
                        ) : (
                          <span className="font-semibold text-charcoal">
                            ${deliveryFee.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-accent-green font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Discount ({appliedCoupon?.code})
                        </span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline pt-2 border-t border-orange-100 text-charcoal">
                      <div>
                        <span className="font-extrabold text-sm sm:text-base">Total</span>
                        <span className="text-[10px] text-charcoal-muted block">
                          Taxes included
                        </span>
                      </div>
                      <span className="text-xl font-black text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA Button */}
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
                  >
                    <span>Proceed to Checkout</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black">${total.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
