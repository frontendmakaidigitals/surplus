"use client";
import React from "react";
import ProductCard from "@/ui/product-card";
import { Product } from "@/lib/types";
import { ProductFilter } from "@/ui/filterComponent";
import { availableConditions } from "@/app/dashboard/components/product/Product-Form";

const ShowProduct = ({
  products,
  availableCategories,
  q,
}: {
  products: Product[];
  availableCategories: string[];
  q?: string;
}) => {
  console.log(q, 'q')
  return (
    <div className="grid grid-cols-2 lg:grid-cols-[.5fr_1.5fr] gap-5">
      <ProductFilter
        availableCategories={availableCategories}
        availableConditions={availableConditions}
        onApplyFilters={(filters) => {
          console.log("Apply filters", filters);
        }}
        categoryParam={q}
      />
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {products.length > 0 ? (
          products.map((product: Product, idx: number) => (
            <ProductCard
              product={product}
              key={idx}
              server
              layoutName="category-product"
            />
          ))
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
