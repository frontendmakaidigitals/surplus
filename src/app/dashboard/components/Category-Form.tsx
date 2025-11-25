"use client";

import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageUpload from "./imageUpload";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  onSubmit: (data: CategoryFormData) => void;
  editing?: CategoryFormData | null;
  cancelEdit?: () => void;
};

export default function CategoryForm({
  onSubmit,
  editing,
  cancelEdit,
}: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: editing || { name: "", image: "" },
  });
  const watchedImage = useWatch({ control: form.control, name: "image" });
  const submitHandler = (data: CategoryFormData) => onSubmit(data);

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler)}
      className="border p-4 rounded-xl space-y-4 bg-white"
    >
      <h2 className="text-lg font-semibold">
        {editing ? "Edit Category" : "Add Category"}
      </h2>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          className="mt-1"
          placeholder="Electronics"
          {...form.register("name")}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          className="mt-1"
          placeholder="Something about the product"
          {...form.register("description")}
        />
      </div>

      <ImageUpload
        image={watchedImage}
        onChangeAction={(url) => form.setValue("image", url)}
      />

      <div className="flex gap-3">
        <Button type="submit">{editing ? "Update" : "Add"} Category</Button>
        {editing && (
          <Button type="button" variant="outline" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
