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
import { toast } from "sonner";
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
      const res = await addToCartAction(product.id, quantity);
      if (!res.success) {
        toast.error(res.message, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        return;
      }
      toast.success("Item added to cart", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-green-200",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
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
      const res = await removeCartItemAction(productId);
      if (!res.success) {
        toast.error(res.message, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        return;
      }
      toast.success("Item removed from cart", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-green-200",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
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
      const res = await updateCartItemAction(cartItemId, newQuantity);
      if (!res.success) {
        toast.error(res.message, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        return;
      }
      toast.success("Item updated in cart", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-green-200",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      startTransition(() => setCart(previousCart));
    }
  };

  const clearCart = async () => {
    const previousCart = [...cart];
    startTransition(() => setCart([]));

    try {
      const res = await clearCartAction();
      if (!res.success) {
        toast.error(res.message, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        return;
      }
      toast.success("Cart cleared successfully", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-green-200",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
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
