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
import RecentItems from "@/ui/recent-items";
import SimilarItems from "@/ui/similar-items";
import ProductDetail from "./product-detail";
import { slugify } from "@/ui/slugify";
import axios from "axios";
const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;

  const getProductData = async () => {
    try {
      const productRes = await axios.get(
        `${ServerUrl}/api/products-by-slug/${params.slug}`
      );

      const product = productRes.data?.data;

      if (!product) {
        throw new Error("Product not found");
      }

      let category = null;

      try {
        const categoryRes = await axios.get(
          `${ServerUrl}/api/categories-by-slug/${product.category}`
        );
        category = categoryRes.data?.data ?? null;
      } catch (err) {
        // ✅ suppress category error (404, etc.)
        console.warn("Category fetch failed, continuing without it");
      }

      return {
        product,
        category,
      };
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      return {
        product: null,
        category: null,
      };
    }
  };

  const { product } = await getProductData();
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
                <YnsLink href="/">Home</YnsLink>
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
              <BreadcrumbPage>{product.slug}</BreadcrumbPage>
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
