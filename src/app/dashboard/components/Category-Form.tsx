"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
  const [status, setStatus] = useState<null | string>();
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form;

  // populate form on edit
  useEffect(() => {
    if (editing) reset(editing);
  }, [editing, reset]);

  const watchedImage = useWatch({ control, name: "image" });

  const submitHandler = async (data: CategoryFormData) => {
    try {
      await axios.post("/api/categories", data);

      toast.success(
        editing
          ? "Category updated successfully"
          : "Category added successfully",
        { id: "category" }
      );

      onSubmit(data);
      setStatus("success");
      toast.success("Request Submitted!", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      reset();
    } catch (err: any) {
      setStatus("error");
      toast.error("Something went wrong.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
    }
  };

  const showFormErrors = (errors: any) => {
    Object.values(errors).forEach((err: any, index) => {
      if (!err?.message) return;

      toast.error(err.message, {
        id: `form-error-${index}`, // prevents duplicates
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler, showFormErrors)}
      className="border p-4 rounded-xl space-y-4 bg-white"
    >
      {/* ===== NAME ===== */}
      <div className="space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="Electronics"
          {...register("name")}
          className={` border border-slate-400/30 ${
            errors.name
              ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
              : ""
          }`}
        />
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="space-y-1">
        <Label>Description</Label>
        <Input
          placeholder="Something about the category"
          className={` border border-slate-400/30 ${
            errors.description
              ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
              : ""
          }`}
          {...register("description")}
        />
      </div>

      {/* ===== IMAGE ===== */}
      <div className="space-y-1">
        <Label>Image</Label>

        <ImageUpload
          image={watchedImage}
          error={errors.image?.message}
          onChangeAction={(url) =>
            setValue("image", url, { shouldValidate: true })
          }
        />
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="flex gap-3 pt-2">
        <Button
          isLoading={isSubmitting}
          className={cn(
            "w-full h-11 text-white transition",

            !status
              ? "bg-secondary hover:bg-secondary/80"
              : status === "success"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-500 hover:bg-red-400"
          )}
          type="submit"
        >
          {editing ? "Update" : "Add"} Category
        </Button>

        {editing && (
          <Button
            className="h-11"
            type="button"
            variant="outline"
            onClick={cancelEdit}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
