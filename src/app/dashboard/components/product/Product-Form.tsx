"use client";
import React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SelectBox from "../Select";
import { useProductBuilder } from "../../context/ProductFormContext";
import { ImageThumbnail } from "../Image-Thumbnail";

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
  model: z.string().optional(),
  brand: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  discountStartDate: z.string().optional(),
  discountEndDate: z.string().optional(),
  freeShipping: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  weight: z.string().optional(),
  dimension: z.string().optional(),
  SKU: z.string().optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  type: z.string().optional(),
  mpn: z.string().optional(),
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
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Basic Information
        </h3>

        <div className="space-y-2">
          <Label>Product Name *</Label>
          <Input {...form.register("name")} placeholder="Enter product name" />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price ($) *</Label>
            <Input
              type="number"
              {...form.register("price", { valueAsNumber: true })}
              placeholder="1000"
            />
            {form.formState.errors.price && (
              <p className="text-sm text-red-500">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Stock *</Label>
            <Input
              type="number"
              {...form.register("stock", { valueAsNumber: true })}
              placeholder="0"
            />
            {form.formState.errors.stock && (
              <p className="text-sm text-red-500">
                {form.formState.errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category *</Label>
            <SelectBox
              value={form.watch("category")}
              onChange={(v) => form.setValue("category", v)}
              categories={availableCategories}
            />
            {form.formState.errors.category && (
              <p className="text-sm text-red-500">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Condition *</Label>
            <SelectBox
              value={form.watch("condition")}
              onChange={(v) => form.setValue("condition", v)}
              categories={availableConditions}
            />
            {form.formState.errors.condition && (
              <p className="text-sm text-red-500">
                {form.formState.errors.condition.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            {...form.register("description")}
            placeholder="Short description..."
            rows={4}
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Product Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Brand</Label>
            <Input {...form.register("brand")} placeholder="product brand" />
          </div>

          <div className="space-y-2">
            <Label>Model</Label>
            <Input {...form.register("model")} placeholder="Model if any" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Input {...form.register("type")} placeholder="product type" />
          </div>

          <div className="space-y-2">
            <Label>Country of Origin</Label>
            <Input
              {...form.register("countryOfOrigin")}
              placeholder="e.g., USA, China"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input {...form.register("SKU")} placeholder="Stock Keeping Unit" />
          </div>

          <div className="space-y-2">
            <Label>MPN</Label>
            <Input
              {...form.register("mpn")}
              placeholder="Manufacturer Part Number"
            />
          </div>
        </div>
      </div>

      {/* Shipping & Dimensions Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Shipping & Dimensions
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Weight</Label>
            <Input {...form.register("weight")} placeholder="e.g., 1.5 kg" />
          </div>

          <div className="space-y-2">
            <Label>Dimensions</Label>
            <Input
              {...form.register("dimension")}
              placeholder="e.g., 10x5x2 cm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="freeShipping"
            checked={form.watch("freeShipping")}
            onCheckedChange={(checked) =>
              form.setValue("freeShipping", checked as boolean)
            }
          />
          <Label htmlFor="freeShipping" className="cursor-pointer">
            Free Shipping
          </Label>
        </div>
      </div>

      {/* Discount Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Discount Settings
        </h3>

        <div className="space-y-2">
          <Label>Discount Percentage (%)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            max="100"
            {...form.register("discountPercentage", { valueAsNumber: true })}
            placeholder="e.g., 15"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Discount Start Date</Label>
            <Input type="date" {...form.register("discountStartDate")} />
          </div>

          <div className="space-y-2">
            <Label>Discount End Date</Label>
            <Input type="date" {...form.register("discountEndDate")} />
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">SEO Settings</h3>

        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input
            {...form.register("metaTitle")}
            placeholder="SEO-friendly title"
            maxLength={60}
          />
          <p className="text-xs text-gray-500">
            Recommended length: 50-60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea
            {...form.register("metaDescription")}
            placeholder="SEO-friendly description"
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-gray-500">
            Recommended length: 150-160 characters
          </p>
        </div>
      </div>

      {/* Product Status Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Product Status</h3>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={form.watch("featured")}
              onCheckedChange={(checked) =>
                form.setValue("featured", checked as boolean)
              }
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured Product
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={form.watch("active")}
              onCheckedChange={(checked) =>
                form.setValue("active", checked as boolean)
              }
            />
            <Label htmlFor="active" className="cursor-pointer">
              Active (Visible to customers)
            </Label>
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Product Images *
        </h3>

        <div
          className={`border border-dashed p-6 rounded-xl ${
            images.length === 6
              ? "bg-slate-200 cursor-not-allowed"
              : "bg-slate-100 cursor-pointer"
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
            htmlFor={images.length < 6 ? "product-images" : ""}
            className={`text-center ${
              images.length === 6 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <p
              className={`text-sm ${
                images.length === 6 ? "text-slate-500" : "text-gray-600"
              }`}
            >
              Click to upload images ({images.length}/6)
            </p>
            <p
              className={`text-xs ${
                images.length === 6 ? "text-slate-400" : "text-gray-400"
              }`}
            >
              You can upload multiple images (.jpg, .png, .jpeg, .webp)
            </p>
          </label>
        </div>

        {form.formState.errors.images && (
          <p className="text-sm text-red-500">
            {form.formState.errors.images.message}
          </p>
        )}

        <ImageThumbnail
          removeImage={removeImage}
          images={images}
          files={files}
          openViewer={openViewer}
        />
      </div>

      <Button type="submit" className="w-full mb-5" size="lg">
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
