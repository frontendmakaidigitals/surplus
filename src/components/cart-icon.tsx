"use client";

import { ShoppingBag } from "lucide-react";
import { CartSidebar } from "@/components/cart-sidebar";
import { useCart } from "@/context/cart-context";

export function CartIcon({}) {
  const { openCart, closeCart, totalItems, isCartOpen } = useCart();

  return (
    <>
      <button
        onClick={openCart}
        className="relative cursor-pointer hover:text-slate-600 flex  items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        aria-label={`Open cart (${totalItems} items)`}
      >
        <ShoppingBag className="h-[22px] w-[22px]" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
