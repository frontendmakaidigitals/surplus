"use client";
import { z } from "zod";
import ProductView from "./ProductView";
import ImageDialog from "./Image-Dialog";
import { ProductBuilderProvider } from "../context/ProductFormContext";
import ProductForm from "./Product-Form";
// --------------------------------
// ZOD SCHEMA
// --------------------------------
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  category: z.string().min(1, "Select a category"),
  condition: z.string().min(1, "Select a condition"),
  stock: z.coerce.number().min(0),
  description: z.string().optional(),
  images: z
    .array(z.any())
    .min(2, "Minimum 2 images required")
    .max(6, "Maximum 6 images allowed"),
});

export type ProductBuilderValues = z.infer<typeof productSchema>;

export default function ProductBuilder() {
  return (
    <ProductBuilderProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ---------------- FORM  ---------------- */}
        <ProductForm />

        {/* ---------------- LIVE PREVIEW ---------------- */}
        <div className="sticky top-10 w-full bg-slate-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
          <div className="">
            <ProductView />
          </div>
        </div>

        {/* Image Dialog Start */}
        <ImageDialog />
      </div>
    </ProductBuilderProvider>
  );
}
