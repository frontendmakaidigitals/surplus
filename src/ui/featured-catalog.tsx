"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Catalog } from "../../data";

export default function FeaturedCatalogs({ catalog }: { catalog: Catalog[] }) {
  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xl:grid-cols-4 lg:gap-4">
        {catalog.map((cat, index) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
            key={index}
            className="group pb-1 cursor-pointer bg-white border border-gray-200 
             rounded-xl shadow-sm pt-1 px-1 text-center hover:border-secondary
             flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden w-full aspect-square rounded-lg mb-4">
              <Image
                src={cat.img}
                alt={cat.title}
                width={220}
                height={220}
                className="object-contain object-center mx-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <h3
              className="px-4 rounded-lg py-3 bg-primary/10 text-black text-sm font-medium 
                 transition-colors mt-auto"
            >
              {cat.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
