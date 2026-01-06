"use client";
import { z } from "zod";
import ProductView from "./ProductView";
import ImageDialog from "./Image-Dialog";
import { ProductBuilderProvider } from "../../context/ProductFormContext";
import ProductForm from "./Product-Form";
import { productSchema } from "./Product-Form";

export type ProductBuilderValues = z.infer<typeof productSchema>;

export default function ProductBuilder() {
  return (
    <ProductBuilderProvider>
      <div className="relative">
        <div className="grid  grid-cols-1 md:grid-cols-6 gap-10">
          {/* ---------------- FORM  ---------------- */}
          <div className="col-span-4">
            <ProductForm />
          </div>

          {/* ---------------- LIVE PREVIEW ---------------- */}
          <div className="sticky self-start top-10 w-full col-span-2  rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
            <div className="">
              <ProductView />
            </div>
          </div>
          <ImageDialog />
        </div>
      </div>
    </ProductBuilderProvider>
  );
}
