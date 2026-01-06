"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useCart } from "@/context/cart-context";
import { Product } from "@/lib/types";

interface AddToCartProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCart({ product, className, children }: AddToCartProps) {
  const { cart, addToCart, openCart } = useCart();
  const [pending, startTransition] = useTransition();

  const isInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    if (pending) return;

    if (isInCart) {
      openCart();
      return;
    }

    if ((product.stock_quantity ?? 0) <= 0) return;

    startTransition(() => {
      addToCart(product.id, 1);
      toast.success("Added to cart");
      openCart();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`rounded-lg border px-6 py-3 disabled:opacity-50 ${className}`}
    >
      {pending
        ? "Adding..."
        : isInCart
        ? "View Cart"
        : children ?? "Add to Cart"}
    </button>
  );
}
