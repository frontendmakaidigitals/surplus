"use client";
import React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SelectBox from "./Select";
import { useProductBuilder } from "../context/ProductFormContext";
import { ImageThumbnail } from "./Image-Thumbnail";
const productSchema = z.object({
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
const availableCategories = ["Electronics", "Clothing", "Furniture", "Other"];
const availableConditions = ["New", "Used", "Refurbished"];
const ProductForm = () => {
  const {
    form,
    images,
    files,
    openViewer,
    removeImage,
    handleImageChange,
    onSubmit,
  } = useProductBuilder();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input {...form.register("name")} placeholder="Enter product name" />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label>Price ($)</Label>
        <Input type="number" {...form.register("price")} placeholder="1000" />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>

        <SelectBox
          value={form.watch("category")}
          onChange={(v) => form.setValue("category", v)}
          categories={availableCategories}
        />
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label>Condition</Label>
        <SelectBox
          value={form.watch("condition")}
          onChange={(v) => form.setValue("condition", v)}
          categories={availableConditions}
        />
      </div>

      {/* Stock */}
      <div className="space-y-2">
        <Label>Stock</Label>
        <Input type="number" {...form.register("stock")} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          {...form.register("description")}
          placeholder="Short description..."
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2 w-full">
        <Label>Product Images</Label>
        <div
          className={`border border-dashed   p-6 mt-2 rounded-xl ${
            images.length === 6
              ? "bg-slate-200 cursor-not-allowed"
              : " bg-slate-100 cursor-pointer"
          }`}
        >
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="product-images"
            onChange={(e) => handleImageChange(e.target.files)}
          />

          <label
            htmlFor={images.length < 6 ? `product-images` : ""}
            className={` text-center ${
              images.length === 6 ? " cursor-not-allowed" : "  cursor-pointer"
            } `}
          >
            <p
              className={`text-sm  ${
                images.length === 6 ? "text-slate-500" : "  text-gray-600"
              }`}
            >
              Click to upload images
            </p>
            <p
              className={`text-xs  ${
                images.length === 6 ? "text-slate-400" : " text-gray-400"
              }`}
            >
              (You can upload multiple images ending with .jpg, .png, jpeg or
              .webp)
            </p>
          </label>
        </div>

        <ImageThumbnail
          removeImage={removeImage}
          images={images}
          files={files}
          openViewer={openViewer}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
