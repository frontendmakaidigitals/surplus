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
export const NewProduct = ({ productData }: { productData: Product[] }) => {
  const [selected, setSelected] = useState<Product | null>(null);

  const handleSelect = (product: Product) => setSelected(product);
  const handleClose = () => setSelected(null);

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {productData.slice(5, 10).map((product) => (
        <Link
          key={product.id}
          href={"/product/" + product.name.split(" ").join("-").toLowerCase()}
          className="block"
        >
          <motion.div
            layoutId={`new-card-${product.id}`}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow",
              selected?.id === product.id && "z-50"
            )}
          >
            {/* Product Image */}
            <motion.div
              layoutId={`image-${product.id}`}
              className="relative h-[210px]"
            >
              <Image
                src={product.images[0] || ""}
                alt={product.name}
                fill
                className="object-contain object-center scale-[.8] rounded-t-xl"
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
            <motion.div layout className="p-2">
              <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
                {product.name}
              </h2>
              {product.price && (
                <p className="mt-1 text-sky-600 font-semibold">
                  {formatMoney({
                    amount: product.price,
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>
              )}
            </motion.div>
          </motion.div>
        </Link>
      ))}

      {/* Overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Dark backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.2,
              }}
              onClick={handleClose}
            />

            {/* Expanded Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layoutId={`new-card-${selected.id}`}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.4,
              }}
              className="fixed px-5 py-3 inset-0 z-50 m-auto flex max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[85dvh]"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {selected.name}
              </h2>
              {/* Product Image */}
              <motion.div
                layoutId={`new-image-${selected.id}`}
                className="relative w-full h-auto  flex-shrink-0"
              >
                <div className="absolute right-5 top-4 z-20">
                  <ConditionBadge condition={selected.condition} />
                </div>
                <ImageSelector images={selected.images} />
              </motion.div>

              {/* Product Details */}
              <motion.div
                layout
                className="relative flex-1 pt-4 flex flex-col justify-between"
              >
                <div className="pb-3">
                  <h2 className="text-lg font-semibold mb-3 border-b-2 border-blue-500 w-fit">
                    Product Details
                  </h2>

                  <ul className="text-sm text-gray-700 space-y-3">
                    <li>
                      <span className="font-semibold text-gray-900">
                        Product ID:
                      </span>{" "}
                      V-1771960
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">
                        Brand:
                      </span>{" "}
                      STEARNS
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">
                        Model:
                      </span>{" "}
                      5-66-6409-33
                    </li>

                    <li>
                      <span className="font-semibold text-gray-900">
                        Custom Description:
                      </span>{" "}
                      STEARNS 5-66-6409-33
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <p className="text-sky-600 font-semibold text-lg">
                    {formatMoney({
                      amount: selected.price,
                      currency: "USD",
                      locale: "en-US",
                    })}
                  </p>
                  <button
                    onClick={handleClose}
                    className="rounded-full bg-black px-5 py-2 text-sm text-white"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
