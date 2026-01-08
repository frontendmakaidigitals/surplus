"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImageThumbnail } from "../Image-Thumbnail";
import { useProductBuilder } from "../../context/ProductFormContext";

const ImageDialog = () => {
  const {
    images,
    openViewer,
    removeImage,
    nextImage,
    prevImage,
    dialogOpen,
    currentIndex,
    setDialogOpen,
  } = useProductBuilder();

  // Helper function to get image URL for display
  const getImageUrl = (img: File | string): string => {
    if (typeof img === "string") {
      // It's already a URL string
      if (img.startsWith("blob:") || img.startsWith("http")) {
        return img;
      }
      // It's a server path, prepend the server URL
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${img}`;
    } else if (img instanceof File) {
      // It's a File object, create a blob URL
      return URL.createObjectURL(img);
    }
    return "";
  };

  // Helper function to get image name for display
  const getImageName = (img: File | string, index: number): string => {
    if (img instanceof File) {
      return img.name;
    } else if (typeof img === "string") {
      // Extract filename from URL
      const parts = img.split("/");
      return parts[parts.length - 1] || `image-${index + 1}`;
    }
    return `image-${index + 1}`;
  };

  // Don't render if no images
  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const currentImageUrl = currentImage ? getImageUrl(currentImage) : "";
  const currentImageName = currentImage
    ? getImageName(currentImage, currentIndex)
    : "";

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="text-lg font-semibold">
          Image Preview ({currentIndex + 1} of {images.length})
        </DialogTitle>
        <DialogDescription className="sr-only">
          Preview and navigate through product images
        </DialogDescription>

        <div className="relative flex flex-col items-center">
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt={`Product image ${currentIndex + 1}`}
              className="w-full h-[400px] max-h-[400px] object-contain rounded-md bg-gray-100"
              onError={(e) => {
                console.error("Failed to load image:", currentImageUrl);
                e.currentTarget.src = "/placeholder-image.png";
              }}
            />
          ) : (
            <div className="w-full h-[400px] max-h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Image not available</p>
            </div>
          )}

          <p className="mt-4">
            <span className="bg-black/70 line-clamp-1 text-wrap text-white text-xs px-2 py-1 text-left rounded">
              {currentImageName}
            </span>
          </p>

          {/* Navigation buttons - only show if more than 1 image */}
          {images.length > 1 && (
            <>
              {/* LEFT BUTTON */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors text-white p-3 rounded-full"
                aria-label="Previous image"
              >
                ◀
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors text-white p-3 rounded-full"
                aria-label="Next image"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="mt-4">
          <ImageThumbnail
            removeImage={removeImage}
            images={images}
            openViewer={openViewer}
            currentIndex={currentIndex}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
