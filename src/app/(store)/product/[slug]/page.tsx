import React from "react";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AddToCart } from "@/components/add-to-cart";
import { YnsLink } from "@/ui/yns-link";
import { deslugify, formatMoney } from "@/lib/utils";
import RootLayoutWrapper from "@/ui/rootlayout";
import ImageSelector from "@/ui/images-selector";
import { products } from "../../../../../data";

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
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <YnsLink href="/products">All Products</YnsLink>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {product.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <YnsLink href={`/category/${product.category}`}>
                      {deslugify(product.category)}
                    </YnsLink>
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

        {/* Main Section */}
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {/* LEFT — IMAGES */}
          <div>
            <div className="sticky top-24">
              <ImageSelector images={product.images} />
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {formatMoney({
                amount: Math.round(Number(product.price || 0)),
                currency: "USD",
              })}
            </p>

            {/* Offer */}
            <div className="mt-4 bg-blue-600 text-blue-50 text-sm px-5 py-2 rounded-md w-fit font-medium">
              Save up to 15% instantly by registering or signing in!
            </div>

            {/* Highlights */}
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">1-Year Warranty</span>
              </div>

              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Same-Day Shipping</span>
              </div>

              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Free Returns</span>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <div className="mt-6">
              <AddToCart
                product={product}
                className={`w-full ${
                  product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </AddToCart>
            </div>

            {/* DETAILS GRID */}
            <div className="mt-12 grid md:grid-cols-2 gap-10">
              {/* PRODUCT DETAILS */}
              <section>
                <h2 className="text-xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">
                  Product Details
                </h2>

                <dl className="space-y-3 text-sm text-gray-700">
                  <DetailRow label="Product ID" value="V-1771960" />
                  <DetailRow label="Brand" value="STEARNS" />
                  <DetailRow label="Model" value="5-66-6409-33" />
                  <DetailRow label="Condition" value={product.condition} />
                  <DetailRow label="Description" value="STEARNS 5-66-6409-33" />
                </dl>
              </section>

              {/* SHIPPING DETAILS */}
              <section>
                <h2 className="text-xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">
                  Shipping Details
                </h2>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>$9.99</strong> 2-Day Domestic Shipping
                  </li>
                  <li className="font-medium">
                    Flat Rate International Shipping
                  </li>
                  <li>
                    <strong>Ships From:</strong> 6401 Rogers Road, Delta, Ohio
                  </li>
                  <li>
                    <strong>Ships To:</strong> Worldwide
                  </li>
                  <li>
                    <strong>Weight:</strong> 0.4 lbs
                  </li>
                  <li>
                    <strong>Dimensions:</strong> 5.5 in × 4.5 in × 1.75 in
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>
    </RootLayoutWrapper>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-start text-gray-700 gap-2">
    <dt className="font-medium text-gray-900 ">{label}:</dt>
    <dd>{value}</dd>
  </div>
);
