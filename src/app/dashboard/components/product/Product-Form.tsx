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
import { getCategoriesAction } from "../../actions/useCategoryActions";
import { useEffect, useState } from "react";
import type { Category } from "../../actions/useCategoryActions";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export type ProductBuilderValues = z.infer<typeof productSchema>;

export const availableConditions = [
  { key: "New", value: "New" },
  { key: "New Open-box", value: "New open-box" },
  { key: "Used", value: "Used" },
  { key: "Refusrbished", value: "Refusrbished" },
];
const fieldOrder: (keyof ProductBuilderValues)[] = [
  "name",
  "price",
  "category",
  "condition",
  "stock_quantity",
  "description",
  "images",
  "free_shipping",
  "is_featured",
  "is_active",
  "meta_title",
  "meta_description",
  "weight",
  "dimension",
  "SKU",
  "mpn",
  "slug",
  "type",
  "discountPercentage",
];
const ProductForm = () => {
  const {
    form,
    images,
    watchAll,
    openViewer,
    removeImage,
    handleImageChange,
    onSubmit,
    isSubmitting,
  } = useProductBuilder();
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    getCategoriesAction().then(setAvailableCategories).catch(console.error);
  }, []);

  interface SelectOption {
    key: string;
    value: string;
    subCategories?: SelectOption[];
  }

  const mapToSelectOptions = (categories: Category[]): SelectOption[] => {
    return categories.map((cat) => ({
      key: String(cat.slug),
      value: cat.name,
      subCategories: cat.subcategories
        ? mapToSelectOptions(cat.subcategories)
        : undefined,
    }));
  };
  const categoryOptions = mapToSelectOptions(availableCategories);
  const onError = async (errors: FieldErrors<ProductBuilderValues>) => {
    for (const field of fieldOrder) {
      const err = errors[field];
      if (err?.message) {
        toast.error(err.message, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
        });
      }
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Basic Information
        </h3>

        <div className="space-y-2">
          <Label>
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            {...form.register("name")}
            placeholder="Enter product name"
            className={`${
              form.formState.errors.name
                ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                : ""
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Price ($) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              {...form.register("price", { valueAsNumber: true })}
              placeholder="1000"
              className={`${
                form.formState.errors.price
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
            />
          </div>

          <div className="space-y-2">
            <Label>Stock</Label>
            <Input
              type="number"
              className={`${
                form.formState.errors.stock_quantity
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
              {...form.register("stock_quantity", { valueAsNumber: true })}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Category <span className="text-red-500">*</span>
            </Label>
            <SelectBox
              value={watchAll.category}
              onChange={(key) => form.setValue("category", key)}
              options={categoryOptions}
              error={form.formState.errors.category ? true : false}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Condition <span className="text-red-500">*</span>
            </Label>
            <SelectBox
              value={watchAll.condition}
              onChange={(v) => form.setValue("condition", v)}
              options={availableConditions}
              error={form.formState.errors.condition ? true : false}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            {...form.register("description")}
            placeholder="Short description..."
            rows={4}
            className={`${
              form.formState.errors.description
                ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                : ""
            }`}
          />
        </div>
        <div className="space-y-2">
          <Label>
            Slug <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`${
              form.formState.errors.slug
                ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                : ""
            }`}
            {...form.register("slug")}
            placeholder="Product Slug"
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
            <Label>
              Type <span className="text-red-500">*</span>
            </Label>
            <Input
              className={`${
                form.formState.errors.type
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
              {...form.register("type")}
              placeholder="product type"
            />
          </div>

          <div className="space-y-2">
            <Label>Country of Origin</Label>
            <Input
              {...form.register("country_of_origin")}
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
            <Label>
              MPN <span className="text-red-500">*</span>
            </Label>
            <Input
              className={`${
                form.formState.errors.mpn
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
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
            <Label>
              Weight <span className="text-red-500">*</span>
            </Label>
            <Input
              className={`${
                form.formState.errors.weight
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
              {...form.register("weight")}
              placeholder="e.g., 1.5 kg"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Dimensions <span className="text-red-500">*</span>
            </Label>
            <Input
              className={`${
                form.formState.errors.dimension
                  ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                  : ""
              }`}
              {...form.register("dimension")}
              placeholder="e.g., 10x5x2 cm"
            />
          </div>
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
          <Label>
            Meta Title <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`${
              form.formState.errors.meta_title
                ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                : ""
            }`}
            {...form.register("meta_title")}
            placeholder="SEO-friendly title"
            maxLength={60}
          />
          <p className="text-xs text-gray-500">
            Recommended length: 50-60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label>
            Meta Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            className={`${
              form.formState.errors.meta_description
                ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                : ""
            }`}
            {...form.register("meta_description")}
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
              checked={watchAll.is_featured}
              onCheckedChange={(checked) =>
                form.setValue("is_featured", checked as boolean)
              }
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured Product
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={watchAll.is_active}
              onCheckedChange={(checked) =>
                form.setValue("is_active", checked as boolean)
              }
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Active (Visible to customers)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="freeShipping"
              checked={watchAll.free_shipping}
              onCheckedChange={(checked) =>
                form.setValue("free_shipping", checked as boolean)
              }
            />
            <Label htmlFor="freeShipping" className="cursor-pointer">
              Free Shipping
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
          } ${
            form.formState.errors.images ? "border-red-500/20 !bg-red-200" : ""
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
            } `}
          >
            <p
              className={`text-sm ${
                images.length === 6 ? "text-slate-500" : "text-gray-600"
              } ${form.formState.errors.images ? "!text-red-500" : ""}`}
            >
              Click to upload images ({images.length}/6)
            </p>
            <p
              className={`text-xs ${
                images.length === 6 ? "text-slate-400" : "text-gray-400"
              } ${form.formState.errors.images ? "!text-red-400" : ""}`}
            >
              You can upload multiple images (.jpg, .png, .jpeg, .webp)
            </p>
          </label>
        </div>

        <ImageThumbnail
          removeImage={removeImage}
          images={images}
          openViewer={openViewer}
        />
      </div>

      <Button
        isLoading={isSubmitting}
        type="submit"
        className="w-full cursor-pointer mb-5"
        size="lg"
      >
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)),
    z.number().min(1, "Price must be at least 1")
  ),

  category: z.string().min(1, "Select a category"),
  condition: z.string().min(1, "Select a condition"),
  stock_quantity: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)),
    z.number().min(0)
  ),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Add a more detailed description"),
  images: z
    .array(z.any())
    .min(2, "Minimum 2 images required")
    .max(6, "Maximum 6 images allowed")
    .default([]),
  model: z.string().optional(),
  brand: z.string().optional(),
  country_of_origin: z.string().optional(),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  discountStartDate: z.string().optional(),
  discountEndDate: z.string().optional(),
  free_shipping: z.boolean().default(false),
  meta_title: z.string().min(10, "Meta title is Required"),
  meta_description: z.string().min(10, "Meta Description is Required"),
  weight: z.string().min(3, "Weight is required"),
  dimension: z.string().min(3, "Dimensions are required"),
  SKU: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  type: z.string().min(3, "Type is required"),
  mpn: z.string().min(3, "MPN is required"),
  slug: z.string().min(2, "Slug is required"),
});
