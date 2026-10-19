import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, SizeOption, ExtraOption, Coupon, OrderType, OrderDetails } from '../types';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItemCount: number;
  subtotal: number;
  deliveryFee: number;
  standardDeliveryFee: number;
  discount: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (
    item: MenuItem,
    quantity?: number,
    selectedSize?: SizeOption,
    selectedExtras?: ExtraOption[],
    instructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
  isCartBumping: boolean;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STANDARD_DELIVERY_FEE = 3.99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart state from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('savory_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>(() => {
    try {
      const saved = localStorage.getItem('savory_order_type');
      return (saved as OrderType) || 'delivery';
    } catch {
      return 'delivery';
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('savory_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('savory_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('savory_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('savory_order_type', orderType);
    } catch (e) {
      console.error('Error saving order type to localStorage', e);
    }
  }, [orderType]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('savory_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('savory_coupon');
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem('savory_last_order', JSON.stringify(lastOrder));
      }
    } catch (e) {
      console.error('Error saving last order to localStorage', e);
    }
  }, [lastOrder]);

  const showToast = (title: string, description?: string, image?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, description, image }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCartBump = () => {
    setIsCartBumping(true);
    setTimeout(() => setIsCartBumping(false), 400);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedSize?: SizeOption,
    selectedExtras: ExtraOption[] = [],
    instructions?: string
  ) => {
    // Generate unique composite key for item + options combination
    const extrasKey = selectedExtras
      .map((e) => e.id)
      .sort()
      .join(',');
    const sizeKey = selectedSize ? selectedSize.id : 'standard';
    const notesKey = instructions ? instructions.trim().toLowerCase() : '';
    const cartItemId = `${item.id}-${sizeKey}-${extrasKey}-${notesKey}`;

    // Calculate unit price: base + size modifier + extras sum
    const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    const sizeDelta = selectedSize ? selectedSize.price : 0;
    const unitPrice = Math.max(0, item.price + sizeDelta + extrasTotal);

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const updatedQuantity = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updatedQuantity,
          totalPrice: unitPrice * updatedQuantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          quantity,
          selectedSize,
          selectedExtras,
          instructions,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    // Animate cart & display toast
    triggerCartBump();
    showToast(
      'Added to cart!',
      `${quantity}x ${item.name}${selectedSize ? ` (${selectedSize.name})` : ''}`,
      item.image
    );
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const applyCoupon = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    setCouponError(null);

    if (code === 'FREEDEL') {
      const coupon: Coupon = {
        code: 'FREEDEL',
        type: 'free_delivery',
        value: STANDARD_DELIVERY_FEE,
        description: 'Free Delivery Applied ($3.99 value)',
      };
      setAppliedCoupon(coupon);
      showToast('Coupon Applied! 🎉', 'Free delivery fee applied to your order.');
      return true;
    } else if (code === 'SAVE10') {
      const coupon: Coupon = {
        code: 'SAVE10',
        type: 'percent',
        value: 10,
        description: '10% Off Subtotal Applied',
      };
      setAppliedCoupon(coupon);
      showToast('Coupon Applied! 🎉', '10% discount applied to your order.');
      return true;
    } else {
      setCouponError("Invalid coupon code. Try 'FREEDEL' or 'SAVE10'");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Calculations
  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);

  // Delivery fee logic
  let deliveryFee = 0;
  if (items.length > 0 && orderType === 'delivery') {
    if (appliedCoupon?.type === 'free_delivery') {
      deliveryFee = 0;
    } else {
      deliveryFee = STANDARD_DELIVERY_FEE;
    }
  }

  // Discount calculation
  let discount = 0;
  if (appliedCoupon?.type === 'percent') {
    discount = (subtotal * appliedCoupon.value) / 100;
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        subtotal,
        deliveryFee,
        standardDeliveryFee: STANDARD_DELIVERY_FEE,
        discount,
        total,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        orderType,
        setOrderType,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastOrder,
        setLastOrder,
        isCartBumping,
        toasts,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
