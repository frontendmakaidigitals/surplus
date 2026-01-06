"use client";
import React from "react";
import { StatsGrid } from "../Info-Cards";
import Searchbar from "../searchbar";
import { useRouter } from "next/navigation";
import { useProductContext } from "../../context/ProductContext";
const ProductHeader = () => {
  const router = useRouter();
  const { productCount, categoryCount } = useProductContext();

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-[500]">Products</h1>
          <p className="mt-2 text-gray-600">
            Manage all your products in one place.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-end mb-4 mt-6">
        <StatsGrid
          categories={categoryCount}
          products={productCount}
          actionCard={{
            title: "Add Product",
            onClick: () =>
              router.push("/dashboard/manage-products/products/add"),
          }}
        />
      </div>
      <Searchbar />
    </>
  );
};

export default ProductHeader;
