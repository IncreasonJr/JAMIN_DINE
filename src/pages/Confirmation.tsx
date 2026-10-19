import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Check,
  Clock,
  Bike,
  Store,
  ArrowRight,
  ChefHat,
  Receipt,
  Sparkles,
  Phone,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Confirmation: React.FC = () => {
  const { lastOrder } = useCart();

  // Fire celebratory confetti on mount
  useEffect(() => {
    // Confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FF6B35', '#2ECC71', '#F1C40F', '#E67E22', '#FFF8F0'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  // Default fallback order if page is accessed directly without checkout
  const order = lastOrder || {
    id: 'ord_demo',
    orderNumber: '#SV-2847',
    createdAt: new Date().toISOString(),
    orderType: 'delivery',
    customer: {
      fullName: 'Alex Morgan',
      phone: '(555) 349-8291',
      address: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
    },
    items: [],
    subtotal: 24.50,
    deliveryFee: 3.99,
    discount: 0,
    total: 28.49,
    estimatedMinutes: 35,
    paymentLast4: '4242',
  };

  const isDelivery = order.orderType === 'delivery';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-12 lg:py-16 bg-cream"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card with Animated Checkmark */}
        <div className="bg-white rounded-4xl p-8 sm:p-12 border border-orange-100 shadow-warm text-center relative overflow-hidden">
          {/* Subtle decorative background blur */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-accent-green/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          {/* Animated Green Checkmark Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 18,
              delay: 0.1,
            }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent-green-light border-4 border-accent-green text-accent-green flex items-center justify-center mx-auto shadow-warm mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
            >
              <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3]" />
            </motion.div>
          </motion.div>

          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest uppercase text-accent-green bg-accent-green-light px-3 py-1 rounded-full">
              Order Placed Successfully
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
              We've Got Your Order!
            </h1>
            <p className="text-sm sm:text-base text-charcoal-muted max-w-md mx-auto">
              Our grill masters have fired up the flat-top. Your fresh meal is being prepared right now.
            </p>
          </div>

          {/* Order Details Highlight Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-cream-100 border border-orange-100 text-left">
            <div>
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">
                Order Number
              </span>
              <span className="text-base sm:text-lg font-black text-primary">
                {order.orderNumber}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">
                Estimated Time
              </span>
              <span className="text-base sm:text-lg font-black text-charcoal flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {isDelivery ? '35 mins' : '15 mins'}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">
                Fulfillment
              </span>
              <span className="text-sm sm:text-base font-extrabold text-charcoal flex items-center gap-1.5">
                {isDelivery ? (
                  <>
                    <Bike className="w-4 h-4 text-primary" />
                    Delivery
                  </>
                ) : (
                  <>
                    <Store className="w-4 h-4 text-primary" />
                    Store Pickup
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Live Progress Tracker */}
          <div className="mt-8 pt-8 border-t border-orange-100">
            <h3 className="text-xs font-bold tracking-wider uppercase text-charcoal-light mb-6 text-left sm:text-center">
              Order Status Tracker
            </h3>
            <div className="relative flex items-center justify-between">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-cream-300 -z-0">
                <div className="h-full bg-accent-green w-1/3 rounded-full" />
              </div>

              {/* Step 1: Placed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[11px] font-bold text-charcoal mt-2">Placed</span>
              </div>

              {/* Step 2: Preparing */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold animate-pulse shadow-warm">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-primary mt-2">Sizzling</span>
              </div>

              {/* Step 3: On The Way */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-cream-200 border-2 border-cream-300 text-charcoal-light flex items-center justify-center text-xs font-bold">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-charcoal-light mt-2">
                  {isDelivery ? 'On the Way' : 'Ready'}
                </span>
              </div>

              {/* Step 4: Delivered */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-cream-200 border-2 border-cream-300 text-charcoal-light flex items-center justify-center text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-charcoal-light mt-2">Enjoy!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Recap Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-orange-100">
            <h3 className="font-extrabold text-charcoal text-base flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Order Summary Recap
            </h3>
            <span className="text-xs text-charcoal-muted font-medium">
              Payment via Card (•••• {order.paymentLast4})
            </span>
          </div>

          {/* Delivery / Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-charcoal-light uppercase tracking-wider block">
                {isDelivery ? 'Delivery To' : 'Pickup Customer'}
              </span>
              <p className="font-extrabold text-charcoal">{order.customer.fullName}</p>
              {isDelivery ? (
                <p className="text-charcoal-muted">
                  {order.customer.address}
                  {order.customer.apartment ? `, ${order.customer.apartment}` : ''}
                </p>
              ) : (
                <p className="text-charcoal-muted">
                  Savory Downtown Grill • 452 Gourmet Way (Counter Pickup)
                </p>
              )}
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="font-bold text-charcoal-light uppercase tracking-wider block">
                Contact Phone
              </span>
              <p className="font-semibold text-charcoal flex items-center sm:justify-end gap-1">
                <Phone className="w-3.5 h-3.5 text-primary" />
                {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Items Recap (if items exist) */}
          {order.items && order.items.length > 0 && (
            <div className="pt-4 border-t border-orange-100 space-y-3">
              <span className="text-xs font-bold text-charcoal-light uppercase tracking-wider block">
                Items Ordered
              </span>
              <div className="space-y-2">
                {order.items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{cartItem.quantity}x</span>
                      <span className="font-semibold text-charcoal">
                        {cartItem.item.name}
                      </span>
                      {cartItem.selectedSize && (
                        <span className="text-charcoal-light">
                          ({cartItem.selectedSize.name})
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-charcoal">
                      ${cartItem.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="pt-4 border-t border-orange-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-charcoal-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal">
                ${order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-charcoal-muted">
              <span>{isDelivery ? 'Delivery Fee' : 'Pickup Fee'}</span>
              <span className="font-semibold text-charcoal">
                {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-accent-green font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm sm:text-base font-extrabold text-charcoal pt-2 border-t border-orange-50">
              <span>Total Paid</span>
              <span className="text-primary font-black">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Back to Menu CTA */}
        <div className="text-center pt-2">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-warm hover:shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span>Back to Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
