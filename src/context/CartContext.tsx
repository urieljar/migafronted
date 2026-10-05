import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { CartItem, CartContextType, DeliveryMethod } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'miga_cart_v1';
const LOCAL_STORAGE_COUPON = 'miga_coupon_v1';
const SHIPPING_FEE = 30; // $30 MXN para envío local

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialización segura desde localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_COUPON) || '';
    } catch {
      return '';
    }
  });

  // Guardar en localStorage ante cambios
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error guardando carrito:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COUPON, couponCode);
    } catch (e) {
      console.error('Error guardando cupón:', e);
    }
  }, [couponCode]);

  // Agregar al carrito (si ya existe el mismo id, incrementa cantidad)
  const addToCart = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((p) => p.id === item.id);
      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }
      return [...prevCart, { ...item, quantity: qty }];
    });
  };

  // Modificar cantidad (+1 o -1)
  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remover ítem
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Limpiar todo
  const clearCart = () => {
    setCart([]);
    setCouponCode('');
  };

  // Cálculos financieros
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const shippingCost = useMemo(
    () => (deliveryMethod === 'delivery' && cart.length > 0 ? SHIPPING_FEE : 0),
    [deliveryMethod, cart.length]
  );

  // Cupones válidos
  const discount = useMemo(() => {
    if (!couponCode) return 0;
    const code = couponCode.toUpperCase().trim();
    if (code === 'MIGA10') {
      return Math.round(subtotal * 0.1); // 10% de descuento
    }
    if (code === 'BIENVENIDO' && subtotal >= 200) {
      return 50; // $50 MXN de descuento
    }
    return 0;
  }, [couponCode, subtotal]);

  const totalAmount = useMemo(() => {
    const total = subtotal + shippingCost - discount;
    return total > 0 ? total : 0;
  }, [subtotal, shippingCost, discount]);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'MIGA10' || cleanCode === 'BIENVENIDO') {
      setCouponCode(cleanCode);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingCost,
        discount,
        totalAmount,
        deliveryMethod,
        setDeliveryMethod,
        couponCode,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};