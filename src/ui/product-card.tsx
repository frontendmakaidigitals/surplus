"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ConditionBadge } from "./condition-colors";
import Image from "next/image";
import RenderStockStatus from "./products/stock-utility";
import { Maximize2 } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import DiscountUtility from "./products/discount-utility";
import ImageSelector from "./images-selector";
import { Button } from "./shadcn/button";
import { Heart, ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { useWishlist } from "@/context/wishlist-context";
import { useRouter } from "next/navigation";
import { Skeleton } from "./shadcn/skeleton";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  resizeable?: boolean;
  layoutName?: string;
  server?: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  resizeable = false,
  layoutName,
  server = false,
}) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const handleSelect = (product: Product) => setSelected(product);
  const handleClose = () => setSelected(null);
  const { cart, addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wish = isInWishlist(product.id);
  const router = useRouter();
  const handleAddtoCart = async () => {
    if (cart.some((item) => item.product_id === product.id)) {
      openCart();
      return;
    }
    try {
      await addToCart(product, 1);
      toast.success("Added to cart");
      openCart();
    } catch {
      toast.error("Failed to add item");
    }
  };

  return (
    <>
      <motion.div
        layoutId={`${layoutName}-card-${product.id}`}
        className={cn(
          "relative cursor-pointer overflow-hidden",
          selected?.id === product.id && "z-50"
        )}
      >
        <Link href={"/product/" + product.slug} className="block">
          <motion.div
            layoutId={`${layoutName}-image-${product.id}`}
            className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-300/30 border border-gray-300/8"
          >
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <div className="absolute text-sm z-10 top-0 px-3 left-0 bg-orange-500/90 text-slate-50">
                <p>{product.discountPercentage}% Off</p>
              </div>
            ) : null}
            <Image
              fill
              unoptimized
              src={
                server
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}${product.images?.[0]}`
                  : `/products/${product.images?.[0]}`
              }
              alt={product.name}
              className="object-cover object-center"
            />

            {resizeable ? (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(product);
                }}
                className="absolute top-2 right-2 z-20 rounded-full bg-black/20 cursor-pointer p-2 text-white hover:bg-black/90"
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>
            ) : null}
          </motion.div>
        </Link>
        {/* Product Info */}
        <motion.div layout className="pb-2 pt-1">
          <div className="flex mb-2 justify-between items-center">
            <span>{RenderStockStatus(Number(product.stock_quantity))}</span>
            {product.free_shipping && (
              <span className="text-xs">Free Shipping</span>
            )}
          </div>
          <h2 className="text font-medium text-gray-800 line-clamp-1">
            {product.name}
          </h2>
          <div className="mt-1">
            {product.discountPercentage ? (
              DiscountUtility(
                product.discountPercentage,
                product.discountStartDate,
                product.discountEndDate,
                product.price
              )
            ) : (
              <p className=" text-2xl font-[600] text-gray-900">
                {formatMoney({
                  amount: product.price,
                  currency: "USD",
                  locale: "en-US",
                })}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-3 mt-4">
            <Button
              onClick={() => handleAddtoCart()}
              className="flex-1 cursor-pointer flex items-center gap-2"
            >
              <span>
                <ShoppingCartIcon />
              </span>
              {cart.some((item) => item.product_id === product.id)
                ? "View Cart"
                : "Add to Cart"}
            </Button>
            <Button
              onClick={async () => {
                try {
                  const action = await toggleWishlist(product.id);

                  toast.success(
                    action === "removed"
                      ? "Removed from wishlist"
                      : "Added to wishlist"
                  );
                } catch {
                  toast.error("Please login to manage wishlist");
                  router.push("/login");
                }
              }}
              className={`!p-3 group ${
                wish
                  ? "bg-red-100 border-red-200 hover:bg-red-200"
                  : "hover:bg-red-100 hover:border-red-200"
              }`}
              variant="outline"
            >
              <Heart
                className={`stroke-red-500 transition-transform duration-300 ${
                  wish ? "fill-red-500 scale-110" : "group-hover:scale-110"
                }`}
              />
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {resizeable && selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              layoutId={`${layoutName}-card-${selected.id}`}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed inset-0 z-50 m-auto flex max-w-2xl flex-col 
                   bg-white rounded-2xl shadow-xl overflow-hidden 
                   max-h-[88dvh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b bg-white">
                <h1 className="text-[1.35rem] font-semibold text-gray-900 leading-snug">
                  {selected.name}
                </h1>
              </div>

              {/* Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto bg-gray-50/40">
                {/* Image Section */}
                <motion.div
                  layoutId={`${layoutName}-image-${selected.id}`}
                  className="relative bg-white p-5 border-b"
                >
                  <div className="absolute left-8 top-8 z-20">
                    <ConditionBadge condition={selected.condition} />
                  </div>
                  <ImageSelector server={server} images={selected.images} />
                </motion.div>

                {/* Product Info */}
                <div className="px-6 py-5 bg-white">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Product Details
                  </h2>

                  <dl className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-[0.9rem]">
                    <DetailRow label="MPN" value="V-1771960" />
                    <DetailRow label="Type" value="V-1771960" />
                    <DetailRow label="Brand" value="STEARNS" />
                    <DetailRow label="Model" value="5-66-6409-33" />
                  </dl>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">
                  {formatMoney({
                    amount: selected.price,
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={""}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm 
                       font-medium text-white hover:bg-primary/80 transition"
                  >
                    More detail
                  </Link>
                  <button
                    onClick={handleClose}
                    className="rounded-full bg-gray-900 px-5 py-2.5 text-sm 
                       font-medium text-white hover:bg-gray-800 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-start text-gray-700 gap-2">
    <dt className="font-medium text-gray-900 ">{label}:</dt>
    <dd>{value}</dd>
  </div>
);

export const ProductCardSkeleton = () => {
  return (
    <div className={cn("relative cursor-pointer overflow-hidden")}>
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-300/30 border border-gray-300/8">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="pb-2 pt-1">
        <div className="flex mb-2 justify-between items-center">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-14 h-5" />
        </div>
        <Skeleton className="w-[85%] h-8" />
        <div className="mt-1">
          <Skeleton className="w-1/3 h-8" />
        </div>
        <div className="flex justify-between gap-3 mt-4">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-12 h-10" />
        </div>
      </div>
    </div>
  );
};
