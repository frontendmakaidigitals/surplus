"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm, FieldErrors, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../imageUpload";
import { toast } from "sonner";
import {
  createCategoryAction,
  updateCategoryAction,
  type Category,
} from "../../actions/useCategoryActions";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  thumbnail: z.union([z.instanceof(File), z.string()]).optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
const fieldOrder: (keyof CategoryFormValues)[] = ["thumbnail", "slug", "name"];

interface Props {
  editing?: Category | null;
  handleClose?: () => void;
  fetchCategories: () => void;
}

function CategoryFormInner({ editing, handleClose, fetchCategories }: Props) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    editing?.thumbnail_url
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}${editing.thumbnail_url}`
      : undefined
  );
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
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
    formState: { isSubmitting },
  } = form;

  const watchName = useWatch({ control: form.control, name: "name" });
  const error = form.formState.errors;

  useEffect(() => {
    if (watchName && !isSlugManuallyEdited) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setValue("slug", slug, { shouldValidate: false, shouldDirty: true });
    }
  }, [watchName, isSlugManuallyEdited, setValue]);

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("parent_id", "0");

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    let result;

    if (editing?.id) {
      result = await updateCategoryAction(editing.id, formData);
    } else {
      result = await createCategoryAction(formData);
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

  const onError = async (errors: FieldErrors<CategoryFormValues>) => {
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
        key={`name-${editing?.id ?? "create"}`}
        className={`px-4 py-[.7rem] border border-slate-400/30 ${
          error.name
            ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
            : ""
        }`}
        placeholder="Category name"
        {...register("name")}
      />
      <Input
        key={`slug-${editing?.id ?? "create"}`}
        className={`px-4 py-[.7rem] border border-slate-400/30 ${
          error.slug
            ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
            : ""
        }`}
        placeholder="slug-name"
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
          {editing ? "Update Category" : "Create Category"}
        </Button>

        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// Outer component that remounts inner component when editing changes
export default function CategoryForm(props: Props) {
  // Use a key that changes when switching between create/edit or when editing different items
  const formKey = props.editing?.id ?? "create";

  return <CategoryFormInner key={formKey} {...props} />;
}
