"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";

import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
interface Product {
  id: string;
  name: string;
  slug?: string;
  summary?: string;
  description?: string;
  images?: string[];
  active: boolean;
  price: number;
  currency: string;
  stock?: number;
  category?: string;
  brand?: string;
  tags?: string[];
  rating?: number;
  discountPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  image: string; 
}

const products = [
  {
    id: "1",
    name: "Industrial Bearing Set",
    slug: "industrial-bearing-set",
    summary: "High-performance bearings for industrial machinery.",
    description:
      "This precision-engineered bearing set is designed for heavy-duty industrial applications. Built from heat-treated steel and sealed for long-lasting durability, it reduces friction and ensures smooth rotational motion under high load conditions. Ideal for CNC machinery, pumps, and automotive systems.",
    image: "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
    active: true,
    price: 2999,
    currency: "USD",
    stock: 20,
    category: "Mechanical Components",
    brand: "BasicWear",
    tags: ["bearing", "industrial", "mechanical"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "CNC Tool Holder",
    slug: "cnc-tool-holder",
    summary: "Precision tool holder for CNC machining systems.",
    description:
      "Crafted with high-tensile steel and balanced for optimal spindle performance, this CNC tool holder offers exceptional accuracy and rigidity. Compatible with standard ER collets, it minimizes vibration and enhances tool life, making it a must-have for precision milling and turning applications.",
    image: "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
    active: true,
    price: 5999,
    currency: "USD",
    stock: 10,
    category: "CNC Accessories",
    brand: "UrbanEdge",
    tags: ["cnc", "tool-holder", "machining"],
    rating: 4.8,
    discountPercentage: 10,
  },
  {
    id: "3",
    name: "Linear Actuator Drive",
    slug: "linear-actuator-drive",
    summary: "Compact actuator drive for precise motion control.",
    description:
      "Engineered for high-precision motion systems, this linear actuator drive provides smooth and accurate movement with minimal noise. It’s ideal for automation, robotics, and manufacturing systems, with adjustable stroke lengths and an efficient motor assembly for consistent performance.",
    image: "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
    active: true,
    price: 8999,
    currency: "USD",
    stock: 15,
    category: "Automation Components",
    brand: "StepPro",
    tags: ["linear", "actuator", "automation"],
    rating: 4.6,
    featured: true,
  },
  {
    id: "4",
    name: "Hydraulic Pump Module",
    slug: "hydraulic-pump-module",
    summary: "Efficient hydraulic pump for industrial systems.",
    description:
      "This high-efficiency hydraulic pump module delivers consistent pressure and flow rates for demanding hydraulic systems. Built with corrosion-resistant housing and precision valves, it ensures reliable operation in construction, automotive, and heavy machinery applications.",
    image: "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
    active: true,
    price: 10999,
    currency: "USD",
    stock: 12,
    category: "Hydraulics",
    brand: "StepPro",
    tags: ["hydraulic", "pump", "module"],
    rating: 4.7,
    featured: true,
  },
  {
    id: "5",
    name: "Servo Motor Assembly",
    slug: "servo-motor-assembly",
    summary: "High-torque servo motor for automation systems.",
    description:
      "The Servo Motor Assembly provides precise control and responsive motion ideal for robotics and CNC equipment. It combines a brushless motor with integrated driver electronics, delivering high torque and low heat generation under continuous duty cycles.",
    image: "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
    active: true,
    price: 12999,
    currency: "USD",
    stock: 8,
    category: "Motors & Drives",
    brand: "StepPro",
    tags: ["servo", "motor", "automation"],
    rating: 4.9,
    featured: true,
  },
];
export const NewProduct = () => {
  const [selected, setSelected] = useState<Product | null>(null);

  const handleSelect = (product: Product) => setSelected(product);
  const handleClose = () => setSelected(null);

  

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          layoutId={`new-card-${product.id}`}
          onClick={() => handleSelect(product)}
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow",
            selected?.id === product.id && "z-50"
          )}
        >
          <motion.div
            layoutId={`new-image-${product.id}`}
            className="relative bg-gray-100 h-[210px]"
          >
            <Image
              src={
                "https://png.pngtree.com/png-vector/20241120/ourmid/pngtree-standard-prototyping-breadboard-with-colorful-power-rails-and-grid-layout-on-png-image_14499515.png"
              }
              alt={product.name}
              fill
              className="object-contain w-full h-full object-top rounded-t-xl"
            />
            <motion.button
              onClick={() => handleSelect(product)}
              className="absolute top-2 right-2 z-20 rounded-full bg-black/20 cursor-pointer p-2 text-white hover:bg-black/90 "
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div layout className="p-2">
            <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
              {product.name}
            </h2>
            {product.price && (
              <p className="mt-1 text-sky-600 font-semibold">
                {formatMoney({
                  amount: product.price,
                  currency: product.currency,
                  locale: "en-US",
                })}
              </p>
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Dark backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
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
              className="fixed inset-0 z-50 m-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl h-[80vh] max-h-[650px]"
            >
              {/* Product Image */}
              <motion.div
                layoutId={`new-image-${selected.id}`}
                className="relative w-full bg-slate-100 h-[250px] flex-shrink-0"
              >
                <Image
                  src={
                    "https://png.pngtree.com/png-vector/20241120/ourmid/pngtree-standard-prototyping-breadboard-with-colorful-power-rails-and-grid-layout-on-png-image_14499515.png"
                  }
                  alt={selected.name}
                  fill
                  className="object-contain  w-full h-full rounded-t-2xl"
                />
              </motion.div>

              {/* Product Details */}
              <motion.div
                layout
                className="relative flex-1 p-6 flex flex-col justify-between overflow-y-auto"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selected.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {selected.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <p className="text-sky-600 font-semibold text-lg">
                    {formatMoney({
                      amount: selected.price,
                      currency: selected.currency,
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
