"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
const categories = [
  {
    title: "Electrical",
    image: "/images/electrical.png",
    items: [
      "Circuit Breakers",
      "Electric Motors",
      "Relays, Timers & Counters",
      "Electrical Components",
    ],
  },
  {
    title: "Hydraulic",
    image: "/images/hydraulic.png",
    items: [
      "Hydraulic Pumps",
      "Hydraulic Valves",
      "Hydraulic Filtration",
      "Hydraulic Cylinders",
    ],
  },
  {
    title: "Automation & Controls",
    image: "/images/automation.png",
    items: [
      "Motor Drives",
      "PCB Boards",
      "HMIs & Displays",
      "PLC and DCS Modules",
    ],
  },
  {
    title: "Pneumatics",
    image: "/images/pneumatics.png",
    items: ["Cylinders & Actuators", "Air Treatment", "Valves", "Relays"],
  },
  {
    title: "Pumps",
    image: "/images/pumps.png",
    items: [
      "Centrifugal Pumps",
      "Metering Pumps",
      "Submersible Parts",
      "Diaphragm Parts",
    ],
  },
  {
    title: "Valves & Plumbing",
    image: "/images/valves.png",
    items: ["Actuators", "Plumbing", "Positioners", "Valves"],
  },
  {
    title: "Power Transmission",
    image: "/images/power-transmission.png",
    items: ["Bushings", "Bearings", "Belts", "Brakes & Clutches"],
  },
  {
    title: "Tools",
    image: "/images/tools.png",
    items: [
      "Hand Tools",
      "Hydraulic Tools",
      "Measurement Tools",
      "Metalworking Tools",
    ],
  },
];

export default function ShopByCategory() {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="group bg-white rounded-xl border border-gray-300/40  transition-all pt-1 px-1 flex flex-col items-start"
          >
            {/* Image */}
            <div className="relative rounded-lg bg-gray-100 w-full h-[170px] mb-4">
              <Image
                src={
                  "https://png.pngtree.com/png-clipart/20250122/original/pngtree-small-electric-motor-mechatronic-hardware-isolated-on-transparent-background-png-image_20099282.png"
                }
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
                href="#"
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
