"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductBuilderValues } from "../components/product/Product-Form";
import { productSchema } from "../components/product/Product-Form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { checkAuthStatus } from "@/lib/checkAuthStatus";

interface ProductBuilderContextType {
  form: ReturnType<typeof useForm<ProductBuilderValues>>;
  watchAll: any;
  images: (File | string)[];
  dialogOpen: boolean;
  currentIndex: number;
  openViewer: (index: number) => void;
  removeImage: (index: number) => void;
  handleImageChange: (fileList: FileList | null) => void;
  nextImage: () => void;
  prevImage: () => void;
  setDialogOpen: (v: boolean) => void;
  onSubmit: (data: ProductBuilderValues) => void;
  isSubmitting: boolean;
}

const ProductBuilderContext = createContext<ProductBuilderContextType | null>(
  null
);

export const useProductBuilder = () => {
  const ctx = useContext(ProductBuilderContext);
  if (!ctx) throw new Error("useProductBuilder must be inside Provider");
  return ctx;
};

export const ProductBuilderProvider = ({
  children,
  initialValues,
}: {
  children: React.ReactNode;
  initialValues?: ProductBuilderValues;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();
  const [images, setImages] = useState<(File | string)[]>([]);
  const [token, setToken] = useState("");
  const productId = searchParams.get("id");

  useEffect(() => {
    const getToken = async () => {
      const res = await checkAuthStatus();
      const { token } = res;
      if (token) {
        setToken(token);
      }
    };
    getToken();
  }, []);

  const router = useRouter();
  const form = useForm<ProductBuilderValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialValues || {
      name: "",
      price: 0,
      category: "",
      condition: "",
      stock_quantity: 0,
      description: "",
      images: [],
      free_shipping: false,
      is_featured: false,
      is_active: true,
      meta_title: "",
      meta_description: "",
      weight: "",
      dimension: "",
      SKU: "",
      mpn: "",
      slug: "",
      type: "",
      discountPercentage: 0,
    },
  });

  useEffect(() => {
    if (!productId || !token) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const product = res.data.data;

        // Set all form values
        form.setValue("name", product.name || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("price", product.price || 0, {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("category", product.category || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("condition", product.condition || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("stock_quantity", product.stock_quantity || 0, {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("description", product.description || "", {
          shouldValidate: true,
          shouldDirty: true,
        });

        // Optional fields
        if (product.model)
          form.setValue("model", product.model, { shouldValidate: true });
        if (product.brand)
          form.setValue("brand", product.brand, { shouldValidate: true });
        if (product.country_of_origin)
          form.setValue("country_of_origin", product.country_of_origin, {
            shouldValidate: true,
          });
        if (product.discountPercentage)
          form.setValue("discountPercentage", product.discountPercentage, {
            shouldValidate: true,
          });
        if (product.discountStartDate)
          form.setValue("discountStartDate", product.discountStartDate, {
            shouldValidate: true,
          });
        if (product.discountEndDate)
          form.setValue("discountEndDate", product.discountEndDate, {
            shouldValidate: true,
          });

        form.setValue("free_shipping", product.free_shipping || false, {
          shouldValidate: true,
        });
        form.setValue("meta_title", product.meta_title || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("meta_description", product.meta_description || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("weight", product.weight || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("dimension", product.dimension || "", {
          shouldValidate: true,
          shouldDirty: true,
        });

        if (product.SKU)
          form.setValue("SKU", product.SKU, { shouldValidate: true });

        form.setValue("is_featured", product.is_featured || false, {
          shouldValidate: true,
        });
        form.setValue("is_active", product.is_active ?? true, {
          shouldValidate: true,
        });
        form.setValue("type", product.type || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("mpn", product.mpn || "", {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("slug", product.slug || "", {
          shouldValidate: true,
          shouldDirty: true,
        });

        // Handle images - Store URLs as strings in images array
        if (product.images && Array.isArray(product.images)) {
          // Set images as URL strings - these will stay as strings unless removed
          setImages(product.images);
          form.setValue("images", product.images, { shouldValidate: true });
        }

        toast.success("Product loaded successfully");
        form.trigger();
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId, token]);

  const { isSubmitting } = form.formState;
  const watchAll = useWatch({ control: form.control });

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  const handleImageChange = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles = Array.from(fileList);
    const totalImages = images.length + newFiles.length;

    if (totalImages > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    // Add new File objects to existing images (which could be strings or Files)
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);

    setImages(updated);
    form.setValue("images", updated, { shouldValidate: true });

    // Handle dialog state
    if (updated.length === 0) {
      setDialogOpen(false);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => {
        if (prev === index) return Math.min(index, updated.length - 1);
        if (index < prev) return prev - 1;
        return prev;
      });
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const onSubmit = async (data: ProductBuilderValues) => {
    try {
      const formData = new FormData();

      // Add all non-image fields
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || key === "images") return;
        formData.append(key, String(value));
      });

      // Separate new files from existing URLs
      const newFiles: File[] = [];
      const existingUrls: string[] = [];

      images.forEach((img) => {
        if (img instanceof File) {
          // This is a newly uploaded file
          newFiles.push(img);
        } else if (typeof img === "string") {
          // This is an existing image URL that should be kept
          existingUrls.push(img);
        }
      });

      console.log("New files to upload:", newFiles.length);
      console.log("Existing images to keep:", existingUrls.length);

      // Add new files to FormData
      newFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Add existing image URLs (backend should preserve these)
      if (productId && existingUrls.length > 0) {
        // Only send existing_images when editing
        formData.append("existing_images", JSON.stringify(existingUrls));
      }

      const url = productId
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`;

      const method = productId ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const id = res.data.data.id;

      // Handle discount if applicable
      if (data.discountPercentage && data.discountPercentage > 0) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}/discount`,
          {
            discount_value: data.discountPercentage,
            start_date: data.discountStartDate,
            end_date: data.discountEndDate,
            product_ids: [id],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success(
        productId
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      router.push("/dashboard/manage-products/products");
    } catch (error) {
      console.error("Submit error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <ProductBuilderContext.Provider
      value={{
        form,
        watchAll,
        images,
        dialogOpen,
        currentIndex,
        openViewer,
        removeImage,
        handleImageChange,
        nextImage,
        prevImage,
        setDialogOpen,
        onSubmit,
        isSubmitting,
      }}
    >
      {children}
    </ProductBuilderContext.Provider>
  );
};
