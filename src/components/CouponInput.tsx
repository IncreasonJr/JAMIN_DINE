import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CouponInput: React.FC = () => {
  const { appliedCoupon, couponError, applyCoupon, removeCoupon } = useCart();
  const [inputCode, setInputCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) return;

    setIsSubmitting(true);
    const success = applyCoupon(inputCode);
    setIsSubmitting(false);
    if (success) {
      setInputCode('');
    }
  };

  const handleQuickApply = (code: string) => {
    setInputCode(code);
    applyCoupon(code);
  };

  return (
    <div className="space-y-2.5">
      {/* If coupon is already applied */}
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-accent-green-light border border-accent-green/30 text-charcoal">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent-green text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs tracking-wider uppercase text-emerald-800">
                  {appliedCoupon.code}
                </span>
                <span className="text-[10px] font-bold bg-white text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">
                  Applied
                </span>
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                {appliedCoupon.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 transition-colors"
            title="Remove coupon"
            aria-label="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Coupon Input Form */
        <form onSubmit={handleApply} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon (e.g. FREEDEL)"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-orange-100 bg-white text-xs sm:text-sm font-semibold tracking-wider uppercase text-charcoal placeholder:normal-case placeholder:font-normal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !inputCode.trim()}
              className="px-4 py-2.5 rounded-xl bg-charcoal hover:bg-primary text-white text-xs font-bold transition-all disabled:opacity-40 disabled:hover:bg-charcoal shadow-xs"
            >
              Apply
            </button>
          </div>

          {/* Quick Demo Code Pill Hints */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-charcoal-muted">
            <span className="font-medium">Try:</span>
            <button
              type="button"
              onClick={() => handleQuickApply('FREEDEL')}
              className="px-2 py-0.5 rounded-md bg-cream-200 hover:bg-orange-100 text-primary font-bold transition-colors border border-orange-100"
            >
              FREEDEL
            </button>
            <span>or</span>
            <button
              type="button"
              onClick={() => handleQuickApply('SAVE10')}
              className="px-2 py-0.5 rounded-md bg-cream-200 hover:bg-orange-100 text-primary font-bold transition-colors border border-orange-100"
            >
              SAVE10
            </button>
          </div>
        </form>
      )}

      {/* Error state */}
      {couponError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-accent-red-light border border-accent-red/20 text-accent-red text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{couponError}</span>
        </div>
      )}
    </div>
  );
};
