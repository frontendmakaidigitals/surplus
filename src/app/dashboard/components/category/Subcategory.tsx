"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm, useWatch, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../imageUpload";
import { toast } from "sonner";
import {
  createSubCategoryAction,
  updateCategoryAction,
} from "../../actions/useCategoryActions";
import { subcategories } from "../../actions/useCategoryActions";
import { CategoryFormValues } from "./Category-Form";
const subCategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  thumbnail: z.instanceof(File).optional(),
});

export type SubCategoryFormValues = z.infer<typeof subCategorySchema>;
const fieldOrder: (keyof SubCategoryFormValues)[] = [
  "thumbnail",
  "slug",
  "name",
];

interface Props {
  parentId: number;
  editing?: subcategories | null;
  handleClose?: () => void;
  fetchCategories: () => void;
}

function SubCategoryFormInner({
  parentId,
  editing,
  handleClose,
  fetchCategories,
}: Props) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    editing?.thumbnail_url
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}${editing.thumbnail_url}`
      : undefined
  );
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: editing?.name ?? "",
      slug: editing?.slug ?? "",
      thumbnail: undefined,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const name = useWatch({ control: form.control, name: "name" });

  // ---------------- AUTO SLUG ----------------
  useEffect(() => {
    if (name && !isSlugManuallyEdited) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", slug, { shouldValidate: false, shouldDirty: true });
    }
  }, [name, isSlugManuallyEdited, setValue]);

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("parent_id", String(parentId));

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    let result;

    if (editing?.id) {
      result = await updateCategoryAction(editing.id, formData);
    } else {
      result = await createSubCategoryAction(formData);
    }

    if (!result.success) {
      toast.error(
        editing ? "Failed to update Category" : "Failed to create Category",
        {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
        }
      );
      return;
    }

    toast.success(
      editing
        ? "Category updated successfully!"
        : "Category created successfully!",
      {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-50 border !border-green-400/60",
      }
    );

    fetchCategories();
    reset();
    handleClose?.();
  };

  const onError = (errors: FieldErrors<SubCategoryFormValues>) => {
    for (const field of fieldOrder) {
      const err = errors[field];
      if (err?.message) {
        toast.error(err.message, {
          className:
            "!bg-red-600/40 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <Input
        placeholder="Subcategory name"
        className={`px-4 py-[.7rem] border border-slate-400/30 ${
          errors.name
            ? "border-red-500/20 bg-red-100 placeholder:text-red-400"
            : ""
        }`}
        {...register("name")}
      />
      <Input
        placeholder="slug-name"
        className={`px-4 py-[.7rem] border border-slate-400/30 ${
          errors.slug
            ? "border-red-500/20 bg-red-100 placeholder:text-red-400"
            : ""
        }`}
        {...register("slug", {
          onChange: () => setIsSlugManuallyEdited(true),
        })}
      />

      <ImageUpload
        image={thumbnailPreview}
        onChangeAction={(file) => {
          setValue("thumbnail", file ?? undefined);
          setThumbnailPreview(file ? URL.createObjectURL(file) : undefined);
        }}
      />

      <div className="flex gap-2">
        <Button isLoading={isSubmitting} type="submit">
          {editing ? "Update Subcategory" : "Create Subcategory"}
        </Button>
        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function SubCategoryForm(props: Props) {
  const formKey = props.editing?.id ?? `create-${props.parentId}`;
  return <SubCategoryFormInner key={formKey} {...props} />;
}
