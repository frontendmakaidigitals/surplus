import type { YnsProduct } from "commerce-kit";

import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Suspense } from "react";

import { AddToCart } from "@/components/add-to-cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { publicUrl } from "@/env.mjs";
import { commerce } from "@/lib/commerce";
import { deslugify, formatMoney } from "@/lib/utils";
import { Markdown } from "@/ui/markdown";
import { YnsLink } from "@/ui/yns-link";


export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const product = await commerce.product.get({ slug: params.slug });

  if (!product) {
    return notFound();
  }

  const canonical = new URL(`${publicUrl}/product/${params.slug}`);

  return {
    title: `${product.name} – Product Details`,
    description: product.summary || "View product details, pricing, and more.",
    alternates: { canonical },
  };
};

export default async function SingleProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const product = await commerce.product.get({ slug: params.slug });

  if (!product) {
    return notFound();
  }

  const ynsProduct = product as YnsProduct;
  const category = ynsProduct.category?.slug;


  return (
    <article className="pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <YnsLink href="/products">All Products</YnsLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <YnsLink href={`/category/${category}`}>{deslugify(category)}</YnsLink>
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

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        {/* Product Info */}
        <div className="lg:col-span-5 lg:col-start-8">
          <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70">
            {formatMoney({
              amount: product.price,
              currency: product.currency,
            })}
          </p>
          <div className="mt-2">
            {(product.stock || 0) <= 0 && (
              <div className="text-red-600 font-semibold">Out of stock</div>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
          <div className="grid gap-4 lg:grid-cols-3 [&>*:first-child]:col-span-3">
            
          </div>
        </div>

        {/* Description + Add to Cart */}
        <div className="grid gap-8 lg:col-span-5">
          <section>
            <h2 className="text-lg font-semibold mb-2">Product Description</h2>
            <div className="prose text-secondary-foreground">
              <Markdown source={product.summary || ""} />
            </div>
          </section>

          <AddToCart
            variantId={ynsProduct.variants[0]?.id || product.id}
            className={(product.stock || 0) <= 0 ? "opacity-50 cursor-not-allowed" : ""}
          >
            {(product.stock || 0) <= 0 ? "Out of Stock" : "Add to Cart"}
          </AddToCart>
        </div>
      </div>

      <Suspense>
        <SimilarProducts id={product.id} />
      </Suspense>



    </article>
  );
}

async function SimilarProducts({ id }: { id: string }) {
  // Placeholder for related items
  return null;
}
