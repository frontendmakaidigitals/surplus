"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "./imageUpload";
import { useEffect } from "react";
import { z } from "zod";

export const catalogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  image: z.string().optional(),
  isActive: z.boolean(),
});

export type CatalogFormData = z.infer<typeof catalogSchema>;

const sampleCategories = [
  { id: "cat1", name: "Shoes" },
  { id: "cat2", name: "Electronics" },
];

const sampleProducts = [
  { id: "p1", name: "Nike Air Max" },
  { id: "p2", name: "iPhone 15" },
];

export default function CatalogForm() {
  const form = useForm<CatalogFormData>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      categories: [],
      products: [],
      image: "",
      isActive: true,
    },
  });

  const { register, watch, setValue, handleSubmit } = form;

  // Auto-generate slug
  const nameValue = watch("name");
  useEffect(() => {
    const slug = nameValue
      ?.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]/g, "");
    setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, setValue]);

  const onSubmit = (data: CatalogFormData) => {
    console.log("Catalog Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Catalog Name */}
      <div>
        <Label>Catalog Name</Label>
        <Input placeholder="Summer Sale" {...register("name")} />
      </div>

      {/* Slug */}
      <div>
        <Label>Slug</Label>
        <Input placeholder="summer-sale" {...register("slug")} />
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          placeholder="Write something about the catalog..."
          {...register("description")}
        />
      </div>

      <div>
        <Label>Catalog Image</Label>
        <ImageUpload
          image={watch("image")}
          onChangeAction={(url: string) => setValue("image", url)}
        />
      </div>

      {/* Categories Multi-select */}
      <div>
        <Label>Select Categories</Label>
        <select
          multiple
          className="border rounded p-2 w-full"
          {...register("categories")}
        >
          {sampleCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Multi-select */}
      <div>
        <Label>Select Products</Label>
        <select
          multiple
          className="border rounded p-2 w-full"
          {...register("products")}
        >
          {sampleProducts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <Switch {...register("isActive")} />
        <Label>Active</Label>
      </div>

      <Button type="submit">Create Catalog</Button>
    </form>
  );
}
