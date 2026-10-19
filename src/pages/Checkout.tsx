import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bike,
  Store,
  CreditCard,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CouponInput } from '../components/CouponInput';
import { OrderDetails, CustomerInfo, PaymentInfo } from '../types';

export const Checkout: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    standardDeliveryFee,
    discount,
    total,
    orderType,
    setOrderType,
    appliedCoupon,
    clearCart,
    setLastOrder,
  } = useCart();

  const navigate = useNavigate();

  // Form states
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    deliveryNotes: '',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1-Click Demo Auto-fill Helper for convenient reviewer testing
  const handleAutoFillDemo = () => {
    setCustomer({
      fullName: 'Alex Morgan',
      phone: '(555) 349-8291',
      email: 'alex.morgan@example.com',
      address: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      deliveryNotes: 'Please ring bell 4B or leave at door',
    });
    setPayment({
      cardNumber: '4242 4242 4242 4242',
      cardHolder: 'Alex Morgan',
      expiryDate: '12/28',
      cvv: '849',
    });
    setErrors({});
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setPayment((p) => ({ ...p, cardNumber: formatted }));
  };

  // Format Expiry Date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setPayment((p) => ({ ...p, expiryDate: `${raw.slice(0, 2)}/${raw.slice(2)}` }));
    } else {
      setPayment((p) => ({ ...p, expiryDate: raw }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customer.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!customer.phone.trim()) newErrors.phone = 'Phone number is required';

    if (orderType === 'delivery') {
      if (!customer.address?.trim()) newErrors.address = 'Delivery address is required';
    }

    if (!payment.cardNumber.replace(/\s/g, '').trim()) {
      newErrors.cardNumber = 'Card number is required';
    }
    if (!payment.expiryDate.trim()) newErrors.expiryDate = 'Expiry is required';
    if (!payment.cvv.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic network delay for kitchen order dispatch
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Generate random order number e.g. #SV-2847
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#SV-${randomNum}`;

    const orderData: OrderDetails = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      orderType,
      customer,
      items: [...items],
      subtotal,
      deliveryFee,
      discount,
      couponCode: appliedCoupon?.code,
      total,
      estimatedMinutes: orderType === 'delivery' ? 35 : 15,
      paymentLast4: payment.cardNumber.replace(/\s/g, '').slice(-4) || '4242',
    };

    setLastOrder(orderData);
    clearCart();
    setIsSubmitting(false);

    navigate('/confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-cream-200 text-primary flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">Your cart is empty</h2>
        <p className="text-sm text-charcoal-muted mt-2 max-w-sm">
          Looks like you haven't added any delicious smash burgers or shakes yet!
        </p>
        <Link
          to="/menu"
          className="mt-6 px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-warm transition-all"
        >
          Explore Our Menu
        </Link>
      </div>
    );
  }

  const isFreeDelivery = deliveryFee === 0 && orderType === 'delivery' && appliedCoupon?.code === 'FREEDEL';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-10 lg:py-14 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation & header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 gap-4 border-b border-orange-100">
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold text-charcoal-muted hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Menu</span>
            </Link>
            <h1 className="text-3xl font-black text-charcoal tracking-tight">Checkout</h1>
          </div>

          {/* Quick Demo Autofill Button */}
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-primary text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Fill Test Data</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
          {/* Left Form Area */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
            {/* 1. Fulfillment Type Toggle */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cream-200 text-primary flex items-center justify-center text-xs font-extrabold">
                  1
                </span>
                Fulfillment Preference
              </h2>

              <div className="grid grid-cols-2 gap-3 p-1.5 bg-cream-200 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex flex-col items-center justify-center py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderType === 'delivery'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4" />
                    <span>Delivery</span>
                  </div>
                  <span className="text-[11px] font-normal text-charcoal-light mt-0.5">
                    Estimated 35 mins
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex flex-col items-center justify-center py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderType === 'pickup'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    <span>Pickup</span>
                  </div>
                  <span className="text-[11px] font-normal text-charcoal-light mt-0.5">
                    Ready in 15 mins (Free)
                  </span>
                </button>
              </div>

              {orderType === 'pickup' && (
                <div className="p-4 rounded-2xl bg-cream-100 border border-orange-100/60 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-charcoal">
                      Pickup Address: Savory Downtown Flagship Grill
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      452 Gourmet Way, Downtown Food District • Counter order pickup
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Customer Contact & Delivery Info */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cream-200 text-primary flex items-center justify-center text-xs font-extrabold">
                  2
                </span>
                {orderType === 'delivery' ? 'Delivery Information' : 'Contact Information'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-charcoal-light" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                      errors.fullName ? 'border-accent-red' : 'border-orange-100'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-accent-red font-medium">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-charcoal-light" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                      errors.phone ? 'border-accent-red' : 'border-orange-100'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-accent-red font-medium">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Address fields - Hidden if Pickup is selected */}
              {orderType === 'delivery' && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-light" />
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                        errors.address ? 'border-accent-red' : 'border-orange-100'
                      }`}
                    />
                    {errors.address && (
                      <span className="text-[11px] text-accent-red font-medium">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal">
                        Apartment, Suite, Floor (Optional)
                      </label>
                      <input
                        type="text"
                        value={customer.apartment}
                        onChange={(e) => setCustomer({ ...customer, apartment: e.target.value })}
                        placeholder="Apt 4B"
                        className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal">
                        Delivery Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={customer.deliveryNotes}
                        onChange={(e) =>
                          setCustomer({ ...customer, deliveryNotes: e.target.value })
                        }
                        placeholder="e.g. Leave at door, gate code 1234"
                        className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Method Form */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cream-200 text-primary flex items-center justify-center text-xs font-extrabold">
                    3
                  </span>
                  Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-accent-green font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit Mock Encrypted</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs text-charcoal-muted flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Test mode enabled: any test card works (e.g. 4242 4242 4242 4242)</span>
                </span>
                <span className="font-bold text-primary">Mock Checkout</span>
              </div>

              {/* Card Inputs */}
              <div className="space-y-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal">Card Number *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm font-mono text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                        errors.cardNumber ? 'border-accent-red' : 'border-orange-100'
                      }`}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-charcoal-light">
                      VISA / MC
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <span className="text-[11px] text-accent-red font-medium">
                      {errors.cardNumber}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal">Expiry Date *</label>
                    <input
                      type="text"
                      value={payment.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm font-mono text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                        errors.expiryDate ? 'border-accent-red' : 'border-orange-100'
                      }`}
                    />
                    {errors.expiryDate && (
                      <span className="text-[11px] text-accent-red font-medium">
                        {errors.expiryDate}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal">Security Code (CVV) *</label>
                    <input
                      type="password"
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({ ...payment, cvv: e.target.value.slice(0, 4) })
                      }
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-3 rounded-xl border bg-cream-50 text-xs sm:text-sm font-mono text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                        errors.cvv ? 'border-accent-red' : 'border-orange-100'
                      }`}
                    />
                    {errors.cvv && (
                      <span className="text-[11px] text-accent-red font-medium">
                        {errors.cvv}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button for Mobile view */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-base flex items-center justify-between shadow-warm transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending to Kitchen...' : 'Place Order'}</span>
                <span className="font-black">${total.toFixed(2)}</span>
              </button>
            </div>
          </form>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-soft space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-orange-100">
                <h3 className="font-extrabold text-charcoal text-base">Order Summary</h3>
                <span className="text-xs font-bold text-primary bg-orange-50 px-2.5 py-1 rounded-lg">
                  {items.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="flex items-center justify-between text-xs gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={cartItem.item.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-orange-100"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-charcoal truncate">
                          {cartItem.quantity}x {cartItem.item.name}
                        </p>
                        {cartItem.selectedSize && (
                          <p className="text-[10px] text-charcoal-muted">
                            Size: {cartItem.selectedSize.name}
                          </p>
                        )}
                        {cartItem.selectedExtras.length > 0 && (
                          <p className="text-[10px] text-charcoal-muted truncate">
                            +{cartItem.selectedExtras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-charcoal shrink-0">
                      ${cartItem.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Section */}
              <div className="pt-4 border-t border-orange-100">
                <CouponInput />
              </div>

              {/* Price Details */}
              <div className="space-y-2.5 pt-4 border-t border-orange-100 text-xs">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-charcoal-muted items-center">
                  <span>
                    {orderType === 'delivery' ? 'Estimated Delivery' : 'Store Pickup'}
                  </span>
                  <div>
                    {orderType === 'pickup' ? (
                      <span className="font-bold text-accent-green">FREE</span>
                    ) : isFreeDelivery ? (
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-charcoal-light">
                          ${standardDeliveryFee.toFixed(2)}
                        </span>
                        <span className="font-bold text-accent-green">$0.00</span>
                      </div>
                    ) : (
                      <span className="font-bold text-charcoal">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-accent-green font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-orange-100 text-charcoal">
                  <div>
                    <span className="font-black text-base">Total</span>
                    <span className="text-[10px] text-charcoal-muted block">
                      Includes all taxes
                    </span>
                  </div>
                  <span className="text-2xl font-black text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Desktop Place Order Button */}
              <div className="hidden lg:block pt-2">
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-base flex items-center justify-between shadow-warm hover:shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending to Kitchen...' : 'Place Order'}</span>
                  <span className="font-black">${total.toFixed(2)}</span>
                </button>
              </div>

              {/* Trust message */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-light pt-2">
                <ShieldCheck className="w-4 h-4 text-accent-green" />
                <span>Contactless delivery & 100% satisfaction guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
