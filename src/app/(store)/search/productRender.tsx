"use client";
import React, { useEffect, useState } from "react";
import RootLayoutWrapper from "@/ui/rootlayout";
import { ProductFilter } from "@/ui/filterComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import ProductCount from "@/ui/product-count";
import { Product } from "@/lib/types";
import ProductCard from "@/ui/product-card";
const ProductRender = ({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    setCategories(uniqueCategories);
  }, [products]);

  return (
    <>
      <section className="bg-white border border-slate-500/10 py-6 mt-4 mb-5">
        <RootLayoutWrapper>
          <div className=" lg:flex justify-between items-center">
            <h1 className="text-xl font-[700]">
              New, Surplus & Used {query} For Sale
            </h1>
            <div className="mt-10 lg:mt-0 flex items-center gap-3">
              <label>Sort by:</label>
              <Select>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Most Recent</SelectItem>
                  <SelectItem value="banana">Highest Price</SelectItem>
                  <SelectItem value="pineapple">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </RootLayoutWrapper>
      </section>
      <section className="container mb-10 ">
        <ProductCount dataArray={products} />
      </section>
      <RootLayoutWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-[.5fr_1.5fr] gap-5 ">
          <div className="hidden lg:block">
            <ProductFilter
              onApplyFilters={(filters) => {
                console.log("Applied filters:", filters);
              }}
              availableCategories={categories}
              availableConditions={["New", "Used", "Surplus"]}
            />
          </div>
          <div className="">
            {products.length > 0 && (
              <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                {products.slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.id}
                    resizeable
                    product={product}
                    layoutName="search"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <section className="mt-14 mb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-disabled href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </RootLayoutWrapper>
    </>
  );
};

export default ProductRender;
