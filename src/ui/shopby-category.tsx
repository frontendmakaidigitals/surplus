"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Category } from "../../data";

export default function ShopByCategory({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.slice(0, 8).map((cat, i) => (
          <motion.div
            key={i}
            className="group bg-white rounded-xl border border-gray-300/40  transition-all pt-1 px-1 flex flex-col items-start"
          >
            {/* Image */}
            <div className="relative rounded-lg w-full h-[170px] mb-4">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <div className="px-5 pb-6">
              <h3 className="text-lg font-semibold text-sky-700 mb-2 group-hover:text-sky-800">
                {cat.title}
              </h3>

              {/* Items */}
              <ul className="text-gray-600 text-sm mb-3 space-y-1">
                {cat.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href={
                  `/category/` + cat.title.split(" ").join("-").toLowerCase()
                }
                className="bg-sky-400 text-sky-100 px-4 rounded-full py-[.4rem] text-sm font-medium hover:underline hover:text-sky-800 mt-auto"
              >
                VIEW ALL
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
