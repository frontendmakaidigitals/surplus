"use client";

import {
  getCartAction,
  addToCartAction,
  removeCartItemAction,
  clearCartAction,
} from "@/actions/cart-actions";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
  ReactNode,
} from "react";
import { addtocart } from "@/lib/types";

export interface CartItem extends addtocart {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ---------------------------
     Load cart on mount
  ---------------------------- */
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCartAction();
        setCart(res.data.items ?? []);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };
    loadCart();
  }, []);

  /* ---------------------------
     Cart actions
  ---------------------------- */

  const addToCart = async (productId: number, quantity = 1) => {
    // Optimistic update
    startTransition(() => {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === productId);
        if (existing) {
          return prev.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + quantity } : p
          );
        }
        return [...prev, { id: productId, quantity } as CartItem];
      });
    });

    try {
      await addToCartAction(productId, quantity);
    } catch (err) {
      console.error("Add to cart failed", err);
      // Rollback
      startTransition(() => {
        setCart((prev) =>
          prev
            .map((p) =>
              p.id === productId
                ? { ...p, quantity: Math.max(p.quantity - quantity, 0) }
                : p
            )
            .filter((p) => p.quantity > 0)
        );
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    const previousCart = [...cart];
    startTransition(() =>
      setCart((prev) => prev.filter((p) => p.id !== productId))
    );

    try {
      await removeCartItemAction(productId);
    } catch (err) {
      console.error("Remove from cart failed", err);
      startTransition(() => setCart(previousCart));
    }
  };

  const clearCart = async () => {
    const previousCart = [...cart];
    startTransition(() => setCart([]));

    try {
      await clearCartAction();
    } catch (err) {
      console.error("Clear cart failed", err);
      startTransition(() => setCart(previousCart));
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * (item.price ?? 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        openCart,
        closeCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
