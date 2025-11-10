"use client";
import React from "react";
import Image from "next/image";
import type { Product } from "../../../../data";
import Link from "next/link";
interface CategoryCardsProps {
  data: Product[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4">
      {data.map((cat, id) => (
        <li
          className="w-full rounded-md border border-slate-300/30 ease-[cubic-bezier(0.55, 0.055, 0.675, 0.19)] hover:scale-[1.02] transition-all hover:shadow-md duration-500"
          key={id}
        >
          <Link
            href={"/product/" + cat.name.split(" ").join("-").toLowerCase()}
          >
            <div className="aspect-square overflow-hidden relative w-full">
              <Image
                src={cat.images[0] || ""}
                alt={cat.name}
                className="!object-contain scale-[.6] w-full h-full"
                width={400}
                height={300}
              />
            </div>
            <h2 className="w-full bg-neutral-100 border-t border-slate-400/30 py-2 text-center">
              {cat.name}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryCards;
