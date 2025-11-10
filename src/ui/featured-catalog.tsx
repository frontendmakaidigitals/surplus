"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Catalog } from "../../data";

export default function FeaturedCatalogs({ catalog }: { catalog: Catalog[] }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {catalog.map((cat, index) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
            key={index}
            className="group cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm pt-1 px-1 text-center hover:border-sky-400"
          >
            {/* Image */}
            <div className="relative overflow-hidden w-full h-48  rounded-lg  mb-4">
              <Image
                src={
                  cat.img
                }
                alt={cat.title}
                width={220}
                height={220}
                className="object-contain object-center mx-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <h3 className="text-sky-700 px-4 pb-3  text-sm font-medium group-hover:text-sky-800 transition-colors">
              {cat.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
