"use client";
import React from "react";
import Image from "next/image";
import { ConditionBadge } from "@/ui/condition-colors";
import { formatMoney } from "@/lib/utils";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import RenderStockStatus from "@/ui/products/stock-utility";
import DiscountUtility from "@/ui/products/discount-utility";
interface CategoryCardsProps {
  data: {
    id: number;
    name: string;
    image: string;
    count?: number;
    condition: string;
    images: string[];
    stock: number;
    price: number;
    freeShipping: boolean;
    discountPercentage?: number;
    discountStartDate?: string;
    discountEndDate?: string;
  }[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
      {data.map((cat) => (
        <motion.div
          key={cat.id}
          layoutId={`new-card-${cat.id}`}
          className={cn("relative cursor-pointer overflow-hidden")}
        >
          {/* cat Image */}
          <motion.div
            layoutId={`new-image-${cat.id}`}
            className="relative aspect-[4/5]  rounded-lg overflow-hidden bg-gray-300/30 border border-gray-300/8"
          >
            <div className="absolute z-10 top-2 left-2">
              <ConditionBadge condition={cat.condition} />
            </div>
            <Image
              fill
              unoptimized
              src={`/products/${cat.images?.[0] || ""}`}
              alt={cat.name}
              className="object-cover object-center "
            />
          </motion.div>

          <motion.div layout className="pb-2 pt-1">
            <div className="flex mb-2 justify-between items-center">
              <span>{RenderStockStatus(Number(cat.stock))}</span>
              {cat.freeShipping && (
                <span className="text-xs">Free Shipping</span>
              )}
            </div>
            <h2 className="text font-medium text-gray-800 line-clamp-2">
              {cat.name}
            </h2>
            <div>
              {cat.discountPercentage ? (
                DiscountUtility(
                  cat.discountPercentage,
                  cat.discountStartDate,
                  cat.discountEndDate,
                  cat.price
                )
              ) : (
                <p className="mt-1 text-xl font-semibold">
                  {formatMoney({
                    amount: cat.price,
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </ul>
  );
};

export default CategoryCards;
