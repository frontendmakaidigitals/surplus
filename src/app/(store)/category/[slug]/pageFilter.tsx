"use client";

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
      availableConditions={["New", "Used", "Surplus"]}
    />
  );
};

export default PageFilter;
