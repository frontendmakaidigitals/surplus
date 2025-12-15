"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import type { Product } from "../../data";
import { ConditionBadge } from "@/ui/condition-colors";
import ImageSelector from "@/ui/images-selector";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import DiscountUtility from "./products/discount-utility";
import RenderStockStatus from "./products/stock-utility";
export const NewProduct = ({ productData }: { productData: Product[] }) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const handleSelect = (product: Product) => setSelected(product);
  const handleClose = () => setSelected(null);
  return (
    <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4">
      {productData.slice(5, 10).map((product) => (
        <Link
          key={product.id}
          href={"/product/" + product.name.split(" ").join("-").toLowerCase()}
          className="block"
        >
          <motion.div
            layoutId={`new-card-${product.id}`}
            className={cn(
              "relative cursor-pointer overflow-hidden",
              selected?.id === product.id && "z-50"
            )}
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
                className="object-cover object-center "
              />

              {/* ✅ Preview button — stops navigation, opens modal */}
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
        </Link>
      ))}

      {/* Overlay */}
      <AnimatePresence>
        {selected && (
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
              layoutId={`new-card-${selected.id}`}
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
                  layoutId={`new-image-${selected.id}`}
                  className="relative bg-white p-5 border-b"
                >
                  <div className="absolute left-8 top-8 z-20">
                    <ConditionBadge condition={selected.condition} />
                  </div>
                  <ImageSelector images={selected.images} />
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
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-start text-gray-700 gap-2">
    <dt className="font-medium text-gray-900 ">{label}:</dt>
    <dd>{value}</dd>
  </div>
);
