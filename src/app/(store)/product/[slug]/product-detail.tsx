"use client";

import ImageSelector from "@/ui/images-selector";
import { formatMoney } from "@/lib/utils";
import { ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { AddToCart } from "@/components/add-to-cart";
import { Button } from "@/ui/shadcn/button";
import { Product } from "@/lib/types";

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <>
      {/* MAIN PRODUCT GRID */}
      <div className="mt-10 grid gap-9 grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT — IMAGES */}
        <div className=" lg:sticky top-24">
          <ImageSelector images={product.images} />
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div>
          {/* TITLE */}
          <h1 className="text-3xl mt-7 lg:mt-0 font-bold leading-tight text-foreground">
            {product.name}
          </h1>

          {/* PRICE */}
          <p className="mt-3 text-3xl tracking-tight font-bold text-secondary">
            {formatMoney({
              amount: Math.round(Number(product.price || 0)),
              currency: "USD",
              locale: "en-US",
            })}
          </p>

          {/* OFFER BANNER */}
          <div className="mt-4 w-fit rounded-md bg-primary px-5 py-2 text-xs font-medium text-blue-50">
            Save up to 15% instantly by registering or signing in
          </div>

          {/* TRUST BADGES */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Badge icon={<ShieldCheck />} text="1-Year Warranty" />
            <Badge icon={<Truck />} text="Same-Day Shipping" />
            <Badge icon={<RotateCcw />} text="Free Returns" />
          </div>

          {/* CONDITION */}
          <div className="mt-4 text-sm">
            <span className="font-medium text-gray-900">Condition:</span>{" "}
            {product.condition}
          </div>

          <div className="flex items-center gap-4">
            {product.brand && <DetailRow label="Brand" value={product.brand} />}
          </div>

          {/* ACTIONS */}
          <div className="mt-6 space-y-4">
            <Button className="w-full bg-secondary py-6 text-lg font-normal hover:bg-secondary/90">
              Buy Now
            </Button>

            <AddToCart
              product={product}
              className={`w-full ${
                product.stock_quantity <= 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {product.stock_quantity <= 0 ? "Out of Stock" : "Add to Cart"}
            </AddToCart>
          </div>

          {/* SHIPPING DETAILS */}
          <div className="mt-12">
            <section className="rounded-2xl border border-slate-500/20 p-6">
              <h2 className="mb-6 border-b-2 border-secondary pb-2 text-xl font-semibold">
                Shipping & Delivery
              </h2>

              <ul className="space-y-3 text-sm text-gray-700">
                <ShippingRow
                  label="Domestic Shipping"
                  value="$9.99 (2 Business Days)"
                />
                <ShippingRow
                  label="International Shipping"
                  value="Flat Rate (5–10 Business Days)"
                />
                <ShippingRow
                  label="Order Processing Time"
                  value="24–48 Hours"
                />
                <ShippingRow
                  label="Ships From"
                  value="Sajja Industrial Area, Sharjah, UAE"
                />
                <ShippingRow label="Ships To" value="Worldwide" />
                <ShippingRow
                  label="Tracking"
                  value="Available for all orders"
                />
                <ShippingRow
                  label="Customs & Duties"
                  value="May apply for international orders"
                />
                {product.weight && (
                  <ShippingRow label="Weight" value={product.weight} />
                )}
                {product.dimension && (
                  <ShippingRow label="Dimensions" value={product.dimension} />
                )}

                <li className="border-t pt-3 text-xs text-gray-500">
                  Delivery times may vary based on location and carrier delays.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* ABOUT THIS ITEM — FULL WIDTH */}
      <section className="mt-16 w-full rounded-2xl border border-slate-500/10 bg-white p-6 shadow-sm">
        <h2 className="mb-6 w-fit border-b-2 border-blue-500 pb-2 text-2xl font-semibold">
          About this item
        </h2>

        {/* ITEM SPECIFICS */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 text-sm text-gray-700 md:grid-cols-2">
          <DetailRow label="Condition" value={product.condition} />
          {product.brand && <DetailRow label="Brand" value={product.brand} />}
          {product.model && <DetailRow label="Model" value={product.model} />}
          {product.type && <DetailRow label="Type" value={product.type} />}
          {product.mpn && <DetailRow label="MPN" value={product.mpn} />}
          {product.SKU && <DetailRow label="SKU" value={product.SKU} />}
          {product.category && (
            <DetailRow label="Category" value={product.category} />
          )}
          {product.country_of_origin && (
            <DetailRow
              label="Country of Origin"
              value={product.country_of_origin}
            />
          )}
          {product.weight && (
            <DetailRow label="Item Weight" value={product.weight} />
          )}
          {product.dimension && (
            <DetailRow label="Dimensions" value={product.dimension} />
          )}
          <DetailRow
            label="Availability"
            value={product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
          />
        </div>

        {/* DESCRIPTION */}
        {product.description && (
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Item description</h3>
            <p className="leading-relaxed text-sm text-gray-700">
              {product.description}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetail;

/* ----------------- HELPERS ----------------- */

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
    <span className="text-secondary">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const ShippingRow = ({ label, value }: { label: string; value: string }) => (
  <li className="flex justify-between">
    <span className="font-medium">{label}</span>
    <span>{value}</span>
  </li>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <span className="font-medium text-gray-900">{label}:</span>
    <span>{value}</span>
  </div>
);
