import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto bg-white border border-orange-100 rounded-2xl p-4 shadow-warm-lg flex items-center gap-3.5"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt=""
                className="w-12 h-12 rounded-xl object-cover border border-orange-50 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-accent-green-light text-accent-green flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-accent-green" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-charcoal-muted truncate mt-0.5">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-light hover:text-charcoal p-1 rounded-lg hover:bg-cream-200 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
