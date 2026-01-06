"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/lib/types";
import { buildCategoryChain } from "@/lib/buildcategorychain";

export default function CategoryCard({
  category,
  server = false,
}: {
  category: Category;
  server?: boolean;
}) {
  const chain = buildCategoryChain(category);

  return (
    <div className="group transition-all p-1 grid bg-slate-100 rounded-lg border border-slate-300/20 hover:shadow grid-cols-2 gap-4">
      <div className="relative overflow-hidden rounded-lg bg-gray-300/30 border border-gray-300/8 w-full aspect-square">
        <Image
          src={
            server
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}${
                  category.thumbnail_url || ""
                }`
              : `/products/${category.thumbnail_url || ""}`
          }
          alt={category.name}
          fill
          unoptimized
          className="object-cover object-center "
        />
        <p className="text-slate-50 rounded-lg bg-secondary/80 px-3 py-[.3rem]  absolute top-2 left-2 text-xs">
          {category.product_count}+ products
        </p>
      </div>

      {/* Content */}
      <div className=" flex flex-col h-full">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-800  group-hover:text-sky-800">
            {category.name}
          </h3>

          <ul className="text-slate-700 text-sm mt-2 space-y-1">
            {chain.map((cat, i) => (
              <li key={i}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-[.9rem] text-secondary underline hover:text-primray/90"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Link - pushes to bottom */}
        <div className="w-full mb-2 lg:w-fit mt-auto">
          <Link
            href={`/category/` + category.slug}
            className="text-[.9rem] text-secondary underline hover:text-primray/90"
          >
            View all
          </Link>
        </div>
      </div>
    </div>
  );
}

export const CategoryCardSkeleton = () => {
  return (
    <div className="group transition-all  pt-1 px-1 pb-1 grid bg-slate-100 rounded-lg  border border-slate-300/20 hover:shadow grid-cols-2 gap-4">
      <Skeleton className="w-full h-full aspect-square" />

      {/* Content */}
      <div className=" flex flex-col h-full">
        <div className="mb-3">
          <Skeleton className="h-8 w-2/3" />

          <ul className="text-slate-700 text-sm mt-2 space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </ul>
        </div>

        {/* Link - pushes to bottom */}
        <div className="mt-auto">
          <Skeleton className="h-7 w-1/3" />
        </div>
      </div>
    </div>
  );
};
