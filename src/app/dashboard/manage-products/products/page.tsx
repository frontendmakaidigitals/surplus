"use client";
import React from "react";
import { products } from "../../../../../data";
import { ProductProvider } from "../../context/ProductContext";
import Link from "next/link";
import { Button } from "@/ui/shadcn/button";
import ProductTable from "../../components/ProductTable";
import { Plus } from "lucide-react";
import RootLayoutWrapper from "@/ui/rootlayout";
import Searchbar from "../../components/searchbar";
import { PaginationWrapper } from "@/ui/PaginationWrapper";
import { DeleteConfirmDialog } from "@/ui/DeleteDialogWrapper";

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
            <Link href={"/dashboard/manage-products/products/add"}>
              <Button>
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </div>

          <Searchbar />
          <div className="border rounded-lg mb-4 py-3">
            <ProductTable />
            <section className="mt-5">
              <PaginationWrapper
                currentPage={2}
                totalPages={5}
                onPageChange={(page) => console.log("Go to page:", page)}
              />
            </section>
          </div>

          <DeleteConfirmDialog />
        </div>
      </ProductProvider>
    </RootLayoutWrapper>
  );
};

export default Page;
