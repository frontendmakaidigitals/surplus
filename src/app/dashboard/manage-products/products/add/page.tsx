import React from "react";
import RootLayoutWrapper from "@/ui/rootlayout";
import { ProductProvider } from "@/app/dashboard/context/ProductContext";
import { products } from "../../../../../../data";
import ProductBuilder from "@/app/dashboard/components/product/ProductBuilder";

const Page = () => {
  return (
    <RootLayoutWrapper>
      <ProductProvider products={products}>
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
      </ProductProvider>
    </RootLayoutWrapper>
  );
};

export default Page;
