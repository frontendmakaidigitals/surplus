import React from "react";
import { StoreProductView } from "./storeProductView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { YnsLink } from "@/ui/yns-link";
import Link from "next/link";
import RootLayoutWrapper from "@/ui/rootlayout";
import { products } from "../../../../../data";
import RecentItems from "@/ui/recent-items";
import SimilarItems from "@/ui/similar-items";
import ProductDetail from "./product-detail";
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const product = products.find(
    (p) => p.name.split(" ").join("-").toLowerCase() === params.slug
  );
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <RootLayoutWrapper>
      <article className="pb-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <YnsLink href="/products">All Products</YnsLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <StoreProductView productId={product.id} />
            {product.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/category/${slugify(product.category)}`}>
                      {product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductDetail product={product} />
      </article>

      <SimilarItems currentProductId={product.id} />
      <RecentItems />
    </RootLayoutWrapper>
  );
}
