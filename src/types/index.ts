export type MenuCategory = 'burgers' | 'sides' | 'drinks' | 'desserts';

export interface SizeOption {
  id: string;
  name: string;
  price: number; // additional price delta or override
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  calories?: string;
  badge?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  sizes?: SizeOption[];
  extras?: ExtraOption[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: SizeOption;
  selectedExtras: ExtraOption[];
  instructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Coupon {
  code: string;
  type: 'free_delivery' | 'percent';
  value: number; // e.g. 10 for 10%
  description: string;
}

export type OrderType = 'delivery' | 'pickup';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  apartment?: string;
  deliveryNotes?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderDetails {
  id: string;
  orderNumber: string; // e.g. #SV-2847
  createdAt: string;
  orderType: OrderType;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  estimatedMinutes: number;
  paymentLast4: string;
}
