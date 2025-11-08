"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
  ReactNode,
} from "react";
interface Product {
  id: string;
  name: string;
  slug?: string;
  summary?: string;
  description?: string;
  images: string[];
  active: boolean;
  price: number;
  currency: string;
  stock?: number;
  category?: string;
  brand?: string;
  tags?: string[];
  rating?: number;
  discountPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
}
// ---------------------------
// Types
// ---------------------------

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  openCart: () => void;
  isCartOpen: boolean;
  closeCart: () => void;
  optimisticAdd: (variantId: string, quantity: number) => Promise<void>;
}

// ---------------------------
// Context setup
// ---------------------------

const CartContext = createContext<CartContextType | undefined>(undefined);

// ---------------------------
// Provider
// ---------------------------

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        startTransition(() => {
          setCart(JSON.parse(stored) as CartItem[]);
        });
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cart]);

  // ---------------------------
  // Cart actions
  // ---------------------------

  const addToCart = (product: Product, quantity = 1) => {
    startTransition(() => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    });
  };

  const optimisticAdd = async (variantId: string, quantity: number) => {
    // Simulate adding a product based on an ID (you can replace this with real fetch)
    try {
      // Example: Fetch the product details (mock)
      const product: Product = {
        id: variantId,
        name: "Sample Product",
        images: [],
        price: 100,
        active: true,
        currency: "USD",
      };

      addToCart(product, quantity);
    } catch (err) {
      console.error("Failed to optimistically add product:", err);
      throw err;
    }
  };

  const removeFromCart = (id: string) => {
    startTransition(() => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    });
  };
  const closeCart = () => {
    startTransition(() => setIsCartOpen(false));
  };

  const clearCart = () => {
    startTransition(() => {
      setCart([]);
    });
  };

  const openCart = () => {
    startTransition(() => setIsCartOpen(true));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    openCart,
    isCartOpen,
    closeCart,
    optimisticAdd,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ---------------------------
// Hook
// ---------------------------

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
