"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";
import { useProductBuilder } from "../context/ProductFormContext";
import { ConditionBadge } from "@/ui/condition-colors";
import RenderStockStatus from "@/ui/products/stock-utility";
import DiscountUtility from "@/ui/products/discount-utility";
export default function ProductView() {
  const { watchAll } = useProductBuilder();
  const product = watchAll;
  if (!product) return null;

  return (
    <motion.div
      layoutId={`new-card-${product.id}`}
      className={cn("relative cursor-pointer overflow-hidden")}
    >
      {/* Product Image */}
      <motion.div
        layoutId={`new-image-${product.id}`}
        className="relative aspect-[4/5] bg-gray-300/30 border border-gray-300/8"
      >
        <div className="absolute z-10 top-2 left-2">
          <ConditionBadge condition={product.condition} />
        </div>
        <Image
          fill
          unoptimized
          src={`/products/${product.images?.[0] || ""}`}
          alt={product.name}
          className="object-contain object-center "
        />
      </motion.div>

      {/* Product Info */}
      <motion.div layout className="pb-2 pt-1">
        <div className="flex mb-2 justify-between items-center">
          <span>{RenderStockStatus(Number(product.stock))}</span>
          {product.freeShipping && (
            <span className="text-xs">Free Shipping</span>
          )}
        </div>
        <h2 className="text font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h2>
        <div>
          {product.discountPercentage ? (
            DiscountUtility(
              product.discountPercentage,
              product.discountStartDate,
              product.discountEndDate,
              product.price
            )
          ) : (
            <p className="mt-1 text-xl font-semibold">
              {formatMoney({
                amount: product.price,
                currency: "USD",
                locale: "en-US",
              })}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
