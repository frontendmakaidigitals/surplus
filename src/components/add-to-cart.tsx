"use client";

import { useCart } from "@/context/cart-context";
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
interface AddToCartProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCart({ product, className, children }: AddToCartProps) {
  const { addToCart, openCart } = useCart();

  const handleAdd = () => {
    if (!product || (product.stock ?? 0) <= 0) return;
    addToCart(product, 1);
    openCart(); // ✅ open sidebar after adding
  };

  return (
    <button
      onClick={handleAdd}
      className={`rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 ${className}`}
      disabled={(product?.stock ?? 0) <= 0}
    >
      {children}
    </button>
  );
}
