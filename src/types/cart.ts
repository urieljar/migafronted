export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  details?: string[];
  customNotes?: string;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export interface CustomerCheckoutData {
  name: string;
  phone: string;
  deliveryDate: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  notes?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}