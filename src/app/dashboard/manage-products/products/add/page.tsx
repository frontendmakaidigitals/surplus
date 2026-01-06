"use client";
import React from "react";
import RootLayoutWrapper from "@/ui/rootlayout";
import ProductBuilder from "@/app/dashboard/components/product/ProductBuilder";
const Page = () => {
  return (
    <RootLayoutWrapper>
      <div className="mt-4 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-[500]">Products</h1>
            <p className="mt-2 text-gray-600">
              Manage all your products in one place.
            </p>
          </div>
        </div>

        <ProductBuilder />
      </div>
    </RootLayoutWrapper>
  );
};

export default Page;
