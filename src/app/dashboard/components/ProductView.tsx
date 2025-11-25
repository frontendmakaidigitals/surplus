"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";
import { useProductBuilder } from "../context/ProductFormContext";

export default function ProductView() {
  const { watchAll } = useProductBuilder();
  const product = watchAll;
  if (!product) return null;

  return (
    <motion.div
      layoutId={`card-${product.id}`}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm "
      )}
    >
      {/* Product Image */}
      <motion.div
        layoutId={`image-${product.id}`}
        className="relative aspect-square"
      >
        {product.images?.[0] ? (
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-contain object-center scale-[.8] rounded-t-xl"
          />
        ) : (
          <div className="w-full relative h-full bg-gray-300">
            <p className="text-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-slate-700">
              Image not found
            </p>
          </div>
        )}
      </motion.div>

      {/* Product Info */}
      <motion.div layout className="p-2 ">
        <h2 className="text-lg font-[600] text-gray-800 line-clamp-2">
          {product.name || "Product Name"}
        </h2>

        {product.price ? (
          <p className="mt-1 text-sky-600 font-semibold">
            {formatMoney({
              amount: product.price * 100,
              currency: "USD",
              locale: "en-US",
            })}
          </p>
        ) : (
          "$00.00"
        )}
      </motion.div>
    </motion.div>
  );
}
