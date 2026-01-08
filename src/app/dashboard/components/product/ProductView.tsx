"use client";
import { useState } from "react";

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
  const { form, images } = useProductBuilder();
  const [showFullProduct, setShowFullProduct] = useState(false);

  // Get all form values using getValues() or watch()
  const product = form.watch(); // This watches all fields and re-renders on change

  // Alternative: const product = form.getValues(); // This gets current values without watching

  console.log("Product data:", product); // Debug log
  console.log("Images:", images); // Debug log

  // Helper function to get image URL
  const getImageUrl = (img: File | string | undefined): string => {
    if (!img) return "";

    if (typeof img === "string") {
      // It's a URL string
      if (img.startsWith("blob:") || img.startsWith("http")) {
        return img;
      }
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${img}`;
    } else if (img instanceof File) {
      // It's a File object
      return URL.createObjectURL(img);
    }

    return "";
  };

  const firstImageUrl = images.length > 0 ? getImageUrl(images[0]) : "";

  return (
    <div className={cn("relative cursor-pointer overflow-hidden")}>
      {/* Product Image */}
      <div className="relative flex justify-center items-center aspect-[4/5] bg-gray-300/30 border border-gray-300/8">
        <div className="absolute z-10 top-2 left-2">
          {product.condition && (
            <ConditionBadge condition={product.condition} />
          )}
        </div>
        {firstImageUrl ? (
          <Image
            fill
            unoptimized
            src={firstImageUrl}
            alt={product.name || "Product image"}
            className="object-cover object-center"
          />
        ) : (
          <h2 className="text-gray-500">No Image Selected</h2>
        )}
      </div>

      {/* Product Info */}
      <div className="pb-2 pt-1">
        <div className="flex mb-2 justify-between items-center">
          <span>{RenderStockStatus(Number(product.stock_quantity || 0))}</span>
          {product.free_shipping && (
            <span className="text-xs text-green-600 font-medium">
              Free Shipping
            </span>
          )}
        </div>
        <h2 className="text font-medium text-gray-800 line-clamp-2">
          {product.name || "Untitled Product"}
        </h2>
        <div>
          {product.discountPercentage && product.discountPercentage > 0 ? (
            DiscountUtility(
              product.discountPercentage,
              product.discountStartDate,
              product.discountEndDate,
              product.price || 0
            )
          ) : (
            <p className="mt-1 text-xl font-semibold">
              {formatMoney({
                amount: product.price || 0,
                currency: "USD",
                locale: "en-US",
              })}
            </p>
          )}
        </div>
      </div>
      <Button
        disabled
        onClick={() => setShowFullProduct(true)}
        className="mt-4 bg-black !h-11 w-full hover:bg-gray-800"
      >
        View Full Product
      </Button>

      <Dialog open={showFullProduct} onOpenChange={setShowFullProduct}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto"></DialogContent>
      </Dialog>
    </div>
  );
}
