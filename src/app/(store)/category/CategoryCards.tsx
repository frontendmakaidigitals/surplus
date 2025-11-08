"use client";
import React from "react";
import Image from "next/image";
interface Product {
  title: string;
  stock: string;
  image: string;
}

interface CategoryCardsProps {
  data?: Product[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ data }) => {
  const catalogItems = [
    {
      id: "1",
      name: "Allen Bradley AC Contactors",
      image: "/images/catalog/allen-bradley-contactors.jpg",
    },
    {
      id: "2",
      name: "Allen Bradley VFD Drives",
      image: "/images/catalog/allen-bradley-vfd.jpg",
    },
    {
      id: "3",
      name: "Allen Bradley Controller Modules",
      image: "/images/catalog/allen-bradley-controller.jpg",
    },
    {
      id: "4",
      name: "ASCO Solenoid Valves",
      image: "/images/catalog/asco-valves.jpg",
    },
    {
      id: "5",
      name: "Atlas Copco Nutrunners",
      image: "/images/catalog/atlas-copco-nutrunners.jpg",
    },
    {
      id: "6",
      name: "Bently Nevada Proximity Sensors",
      image: "/images/catalog/bently-nevada-sensors.jpg",
    },
    {
      id: "7",
      name: "Boston Gear Right Angle Gear Reducers",
      image: "/images/catalog/boston-gear-reducers.jpg",
    },
    {
      id: "8",
      name: "Cutler Hammer AC Contactors",
      image: "/images/catalog/cutler-hammer-contactors.jpg",
    },
    {
      id: "9",
      name: "Cutler Hammer Circuit Breakers",
      image: "/images/catalog/cutler-hammer-breakers.jpg",
    },
    {
      id: "10",
      name: "Edward Valve Globe Valves",
      image: "/images/catalog/edward-valves.jpg",
    },
    {
      id: "11",
      name: "Falk Couplings",
      image: "/images/catalog/falk-couplings.jpg",
    },
    {
      id: "12",
      name: "Fisher Control Valves",
      image: "/images/catalog/fisher-control-valves.jpg",
    },
    {
      id: "13",
      name: "Foxboro Differential Pressure Transmitters",
      image: "/images/catalog/foxboro-transmitters.jpg",
    },
    {
      id: "14",
      name: "General Electric Circuit Breakers",
      image: "/images/catalog/ge-circuit-breakers.jpg",
    },
    {
      id: "15",
      name: "General Electric Electric Motors",
      image: "/images/catalog/ge-electric-motors.jpg",
    },
    {
      id: "16",
      name: "Jamesbury Ball Valves",
      image: "/images/catalog/jamesbury-valves.jpg",
    },
    {
      id: "17",
      name: "Limbroque AC Motors",
      image: "/images/catalog/limbroque-motors.jpg",
    },
    {
      id: "18",
      name: "Milton Roy Metering Pumps",
      image: "/images/catalog/milton-roy-pumps.jpg",
    },
    {
      id: "19",
      name: "Parker Fittings",
      image: "/images/catalog/parker-fittings.jpg",
    },
    {
      id: "20",
      name: "Pepperl Fuchs Proximity Sensors",
      image: "/images/catalog/pepperl-fuchs-sensors.jpg",
    },
    {
      id: "21",
      name: "Rosemount Pressure Transmitters",
      image: "/images/catalog/rosemount-transmitters.jpg",
    },
    {
      id: "22",
      name: "SICK Laser Sensors",
      image: "/images/catalog/sick-laser-sensors.jpg",
    },
    {
      id: "23",
      name: "Square D Circuit Breakers",
      image: "/images/catalog/square-d-breakers.jpg",
    },
    {
      id: "24",
      name: "Swagelok Fittings",
      image: "/images/catalog/swagelok-fittings.jpg",
    },
    {
      id: "25",
      name: "Velan Gate Valves",
      image: "/images/catalog/velan-valves.jpg",
    },
    {
      id: "26",
      name: "Westinghouse Molded Case Circuit Breakers",
      image: "/images/catalog/westinghouse-breakers.jpg",
    },
    {
      id: "27",
      name: "Yaskawa Servo Motors",
      image: "/images/catalog/yaskawa-servo-motors.jpg",
    },
    {
      id: "28",
      name: "Yaskawa Servo Drives",
      image: "/images/catalog/yaskawa-servo-drives.jpg",
    },
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4">
      {data
        ? data.map((cat, id) => (
            <li
              className="w-full rounded-md border border-slate-300/30 ease-[cubic-bezier(0.55, 0.055, 0.675, 0.19)] hover:scale-[1.02] transition-all hover:shadow-md duration-500"
              key={id}
            >
              <div className="aspect-square overflow-hidden relative w-full">
                <Image
                  src={
                    "https://5.imimg.com/data5/SELLER/Default/2024/1/381559287/RH/KZ/EQ/78265995/ac-contactor-500x500.jpg"
                  }
                  alt={""}
                  className="!object-contain scale-[.6] w-full h-full"
                  width={400}
                  height={300}
                />
              </div>
              <h2 className="w-full border-t border-slate-400/30 py-2 text-center">
                {cat.title}
              </h2>
            </li>
          ))
        : catalogItems.map((cat, id) => (
            <li
              className="w-full rounded-md border border-slate-300/30 ease-[cubic-bezier(0.55, 0.055, 0.675, 0.19)] hover:scale-[1.02] transition-all hover:shadow-md duration-500"
              key={id}
            >
              <div className="aspect-square overflow-hidden relative w-full">
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tjjEGsXWI7qPWxuCkv_pFZZws8PiejYBaQ&s"
                  }
                  alt={""}
                  className=""
                  fill
                />
              </div>
              <h2 className="w-full border-t border-slate-400/30 py-2 text-center">
                {cat.name}
              </h2>
            </li>
          ))}
    </ul>
  );
};

export default CategoryCards;
