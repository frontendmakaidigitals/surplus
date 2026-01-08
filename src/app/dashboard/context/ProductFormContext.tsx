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
import imageCompression from "browser-image-compression";
import { checkAuthStatus } from "@/lib/checkAuthStatus";
interface ProductBuilderContextType {
  form: ReturnType<typeof useForm<ProductBuilderValues>>;
  watchAll: any;
  images: string[];
  files: File[];
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const searchParams = useSearchParams();
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>(initialValues?.images || []);
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
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
            },
          }
        );

        const product = res.data.data;

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
        form.setValue("stock_quantity", product.stock || 0, {
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

        if (product.images && Array.isArray(product.images)) {
          setImages(product.images);
          form.setValue("images", product.images, { shouldValidate: true });

          try {
            const imageFiles = await Promise.all(
              product.images.map(async (imageUrl: string, index: number) => {
                try {
                  const response = await fetch(imageUrl);
                  const blob = await response.blob();
                  const fileName = `product-image-${index + 1}.${
                    blob.type.split("/")[1]
                  }`;
                  return new File([blob], fileName, { type: blob.type });
                } catch (error) {
                  console.error(`Failed to fetch image: ${imageUrl}`, error);
                  return null;
                }
              })
            );

            const validFiles = imageFiles.filter(
              (file): file is File => file !== null
            );
            setFiles(validFiles);
          } catch (error) {
            console.error("Error processing images:", error);
          }
        }

        toast.success("Product loaded successfully");

        form.trigger();
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
      } finally {
      }
    };

    fetchProduct();
  }, [productId]);
  const { isSubmitting } = form.formState;
  const watchAll = useWatch({ control: form.control });

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  const handleImageChange = async (fileList: FileList | null) => {
    if (!fileList) return;

    if (files.length + fileList.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    const toastId = toast.loading("Compressing images...");

    try {
      const newFiles = Array.from(fileList);

      const compressedFiles = await Promise.all(
        newFiles.map(async (file) => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
            initialQuality: 0.7,
          };

          return await imageCompression(file, options);
        })
      );

      const newPreviews = compressedFiles.map((f) => URL.createObjectURL(f));

      const updatedFiles = [...files, ...compressedFiles];
      const updatedImages = [...images, ...newPreviews];

      setFiles(updatedFiles);
      setImages(updatedImages);
      form.setValue("images", updatedFiles, { shouldValidate: true });

      toast.success("Images compressed successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to compress images", {
        id: toastId,
      });

      console.error("Image compression failed:", error);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImgs) => {
      const updated = prevImgs.filter((_, i) => i !== index);

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

      return updated;
    });

    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      form.setValue("images", updatedFiles, { shouldValidate: true });
      return updatedFiles;
    });
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

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || key === "images") return;

        formData.append(key, String(value));
      });

      if (data.images?.length) {
        data.images.forEach((file) => {
          if (file instanceof File || file instanceof Blob) {
            formData.append("images", file);
          }
        });
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

      if (data.discountPercentage) {
        if (data.discountPercentage > 0) {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/discount`,
            {
              discount_value: data.discountPercentage,
              start_date: data.discountStartDate,
              end_date: data.discountEndDate,
              product_ids: [id],
            }
          );
        }
      }

      toast.success(
        productId
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      router.push("/dashboard/manage-products/products");
    } catch (error) {
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
        files,
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
