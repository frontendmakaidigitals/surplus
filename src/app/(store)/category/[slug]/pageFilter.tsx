"use client";
import { availableConditions } from "@/app/dashboard/components/product/Product-Form";
import React from "react";
import { ProductFilter } from "@/ui/filterComponent";

const PageFilter = ({ products }: { products: any }) => {
  return (
    <ProductFilter
      onApplyFilters={(filters) => {
        console.log("Applied filters:", filters);
      }}
      availableCategories={Array.from(
        new Set(products.map((p: { category: string }) => p.category))
      )}
      availableConditions={availableConditions}
    />
  );
};

export default PageFilter;
