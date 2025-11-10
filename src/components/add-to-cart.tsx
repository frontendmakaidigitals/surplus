"use client";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "../../data";
interface AddToCartProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCart({ product, className, children }: AddToCartProps) {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleAdd = () => {
    if (!product || (product.stock ?? 0) <= 0) return;
    addToCart(product, 1);
    toast.success("Product Added to cart", {
      className: "!bg-emerald-600 cursor-grab text-white",
    });
  };

  const cartItem = cart.find((item) => item.id === product.id);

  const handleIncrease = () => {
    addToCart(product, 1);
    toast.message("Product Quantity increased", {
      className: "!bg-sky-500 cursor-grab text-white",
    });
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      addToCart(product, -1);
      toast.message("product Quantity decreased", {
        className: "!bg-amber-500 cursor-grab text-white",
      });
    } else {
      removeFromCart(product.id);
      toast.message("Item Removed from cart", {
        className: "!bg-rose-600 cursor-grab text-white",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {cartItem ? (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex items-center origin-left gap-3"
        >
          <span className="text-2xl font-semibold">Quantity: </span>
          <div className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-slate-300/10 backdrop-blur-md border border-gray-300/30 p-1">
            <button
              onClick={handleDecrease}
              className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3 transition"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[2rem] text-center font-semibold">
              {cartItem.quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full p-3 transition"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => {
              removeFromCart(product.id);
              toast.message("Item Removed from cart", {
                className: "!bg-rose-600 cursor-pointer text-white",
              });
            }}
            className={` origin-left bg-red-400 cursor-pointer rounded-full px-6 py-3 text-white hover:bg-red-500 `}
          >
            Clear
          </button>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          onClick={handleAdd}
          className={`rounded-lg origin-left cursor-pointer bg-black px-6 py-3 text-white hover:bg-gray-800 ${className}`}
          disabled={(product?.stock ?? 0) <= 0}
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
