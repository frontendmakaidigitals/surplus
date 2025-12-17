import { createContext, useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductBuilderValues } from "../components/product/Product-Form";
import { productSchema } from "../components/product/ProductBuilder";
interface ProductBuilderContextType {
  form: any;
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
}: {
  children: React.ReactNode;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const form = useForm<ProductBuilderValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      condition: "",
      stock: 0,
      description: "",
    },
  });

  const watchAll = useWatch({ control: form.control });

  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  const handleImageChange = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);

    if (files.length + newFiles.length > 6) {
      alert("Maximum 6 images allowed");
      return;
    }

    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));

    setFiles((prev) => [...prev, ...newFiles]);
    setImages((prev) => [...prev, ...newPreviews]);
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

    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const onSubmit = (data: ProductBuilderValues) => {
    console.log("submitted ---->", data);
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
      }}
    >
      {children}
    </ProductBuilderContext.Provider>
  );
};
