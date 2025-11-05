"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const featuredCatalogs = [
  {
    title: "Cutler Hammer Circuit Breakers",
    image: "/images/cutler-hammer.png",
  },
  {
    title: "Allen Bradley AC Contactors",
    image: "/images/allen-bradley-contactor.png",
  },
  {
    title: "General Electric GE Molded Case Circuit Breakers",
    image: "/images/ge-circuit-breaker.png",
  },
  {
    title: "Velan Gate Valves",
    image: "/images/velan-valve.png",
  },
  {
    title: "Allen Bradley Motor Starters",
    image: "/images/allen-bradley-starter.png",
  },
  {
    title: "Bently Nevada Proximity Sensors",
    image: "/images/bently-sensor.png",
  },
  {
    title: "Allen Bradley AC VFD Drives",
    image: "/images/allen-bradley-vfd.png",
  },
  {
    title: "General Electric GE AC Electric Motors",
    image: "/images/ge-motor.png",
  },
];

export default function FeaturedCatalogs() {
  return (
    <div className="">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredCatalogs.map((cat, index) => (
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            key={index}
            className="group cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm pt-1 px-1 text-center hover:border-sky-400"
          >
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-100 rounded-lg  mb-4">
              <Image
                src={
                  "https://png.pngtree.com/png-vector/20250218/ourmid/pngtree-infrared-sensor-png-image_15512221.png"
                }
                alt={cat.title}
                width={220}
                height={220}
                className="object-contain max-h-44 mx-auto transition-transform duration-500 group-hover:scale-105"
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
