"use client";
import { useState } from "react";
import ProductDetail from "@/app/(store)/product/[slug]/product-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";
import { useProductBuilder } from "../../context/ProductFormContext";
import { ConditionBadge } from "@/ui/condition-colors";
import RenderStockStatus from "@/ui/products/stock-utility";
import DiscountUtility from "@/ui/products/discount-utility";
import { Button } from "@/ui/shadcn/button";
export default function ProductView() {
  const { watchAll, images } = useProductBuilder();
  const product = watchAll;
  const [showFullProduct, setShowFullProduct] = useState(false);
  console.log(product);
  if (!product) return null;

  return (
    <div className={cn("relative cursor-pointer overflow-hidden")}>
      {/* Product Image */}
      <div className="relative flex justify-center items-center aspect-[4/5] bg-gray-300/30 border border-gray-300/8">
        <div className="absolute z-10 top-2 left-2">
          {product.condition && (
            <ConditionBadge condition={product.condition} />
          )}
        </div>
        {images.length > 0 ? (
          <Image
            fill
            unoptimized
            src={`${images?.[0] || ""}`}
            alt={product.name}
            className="object-cover object-center "
          />
        ) : (
          <h2>No Image Selected</h2>
        )}
      </div>

      {/* Product Info */}
      <div className="pb-2 pt-1">
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
      </div>
      <Button
        onClick={() => setShowFullProduct(true)}
        disabled
        className="mt-4 bg-black !h-11 w-full"
      >
        View Full Product
      </Button>

      <Dialog open={showFullProduct} onOpenChange={setShowFullProduct}>
        <DialogContent className="sm:max-w-[425px]">
          <ProductDetail product={product} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
