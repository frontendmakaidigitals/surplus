"use client";
import { CartContextType, CartItem, Product } from "@/lib/types";
import {
  addToCartAction,
  removeCartItemAction,
  clearCartAction,
  updateCartItemAction,
  getCartAction,
} from "@/actions/cart-actions";
import React, {
  createContext,
  useContext,
  useState,
  startTransition,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./auth-provider";
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: CartItem[];
}) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const { isLoggedIn } = useAuth(); // ← important

  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    let active = true;

    const loadCart = async () => {
      try {
        const res = await getCartAction();
        if (active) setCart(res.data.items ?? []);
      } catch {
        if (active) setCart([]);
      } finally {
      }
    };

    loadCart();

    return () => {
      active = false;
    };
  }, [isLoggedIn]);
  /* ---------------------------
     Cart actions
  ---------------------------- */

  const addToCart = async (product: Product, quantity = 1) => {
    startTransition(() => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product_id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product_id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  line_total: (item.quantity + quantity) * item.unit_price,
                }
              : item
          );
        }

        const optimisticItem: CartItem = {
          id: Date.now(),
          product_id: product.id,
          product_name: product.name,
          product_slug: product.slug,
          image_url: product.images?.[0] ?? "",
          quantity,
          unit_price: product.price,
          line_total: product.price * quantity,
        };

        return [...prev, optimisticItem];
      });
    });

    try {
      await addToCartAction(product.id, quantity);
    } catch (err) {
      console.error("Add to cart failed", err);
      startTransition(() => {
        setCart((prev) =>
          prev
            .map((p) =>
              p.id === product.id
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

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const previousCart = [...cart];

    // optimistic update
    startTransition(() => {
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    });

    try {
      await updateCartItemAction(cartItemId, newQuantity);
    } catch (err) {
      console.error("Update quantity failed", err);
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
    (sum, item) => sum + item.quantity * (item.unit_price ?? 0),
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
        updateQuantity,
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
