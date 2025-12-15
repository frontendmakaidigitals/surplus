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
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-7 lg:gap-3">
        {categories.slice(0, 8).map((cat, i) => (
          <motion.div
            key={i}
            className="group transition-all 
             pt-1 px-1 grid bg-slate-100 border border-slate-300/20 hover:shadow grid-cols-2 gap-4"
          >
            {/* Image */}
            <div className="relative transition-transform duration-500 group-hover:scale-105 rounded-xl bg-gray-300/30 border border-gray-300/8 w-full aspect-square">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover object-center "
              />
              <p className="text-slate-50 rounded-lg bg-secondary/80 px-3 py-[.3rem]  absolute top-2 left-2 text-xs">
                {cat.count}+ products
              </p>
            </div>

            {/* Content */}
            <div className=" flex flex-col h-full">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800  group-hover:text-sky-800">
                  {cat.title}
                </h3>

                <ul className="text-slate-700 text-sm mt-2 space-y-1">
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>

              {/* Link - pushes to bottom */}
              <div className="w-full mb-2 lg:w-fit mt-auto">
                <Link
                  href={
                    `/category/` + cat.title.split(" ").join("-").toLowerCase()
                  }
                  className="text-[.9rem] text-secondary underline 
                   hover:text-primray/90"
                >
                  View all
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 mt-8 lg:grid-cols-3 xl:grid-cols-3 gap-7 lg:gap-3">
        {categories.slice(0, 8).map((cat, i) => (
          <motion.div
            key={i}
            className="group transition-all 
             pt-1 px-1 grid bg-slate-100 border border-slate-300/20 hover:shadow grid-cols-2 gap-4"
          >
            {/* Image */}
            <div className="relative transition-transform duration-500 group-hover:scale-105 rounded-xl bg-gray-300/30 border border-gray-300/8 w-full aspect-square">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover object-center "
              />
              <p className="text-slate-50 rounded-lg bg-secondary/80 px-3 py-[.3rem]  absolute top-2 left-2 text-xs">
                {cat.count}+ products
              </p>
            </div>

            {/* Content */}
            <div className=" flex flex-col h-full">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800  group-hover:text-sky-800">
                  {cat.title}
                </h3>

                <ul className="text-slate-700 text-sm mt-2 space-y-1">
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>

              {/* Link - pushes to bottom */}
              <div className="w-full mb-2 lg:w-fit mt-auto">
                <Link
                  href={
                    `/category/` + cat.title.split(" ").join("-").toLowerCase()
                  }
                  className="text-[.9rem] text-secondary underline 
                   hover:text-primray/90"
                >
                  View all
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
