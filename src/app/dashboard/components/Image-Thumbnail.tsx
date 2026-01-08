"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export interface ImageThumbnailProps {
  images: (File | string)[];
  openViewer: (index: number) => void;
  removeImage: (index: number) => void;
  currentIndex?: number;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  images,
  openViewer,
  removeImage,
  currentIndex,
}) => {
  if (!images?.length) return null;

  // Helper function to get the correct image URL
  const getImageUrl = (img: File | string): string => {
    if (typeof img === "string") {
      // It's already a URL string
      // Check if it's a blob URL or a server path
      if (img.startsWith("blob:") || img.startsWith("http")) {
        return img;
      }
      // It's a server path, prepend the server URL
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${img}`;
    } else {
      // It's a File object, create a blob URL
      return URL.createObjectURL(img);
    }
  };

  // Helper function to determine if image is new or existing
  const isNewImage = (img: File | string): boolean => {
    return img instanceof File;
  };

  return (
    <div className="flex gap-3 mt-2 flex-wrap">
      {images.map((img, i) => {
        const imageUrl = getImageUrl(img);
        const label = isNewImage(img) ? "New image" : "Existing image";

        return (
          <motion.div
            key={i} // Use index as key since we don't have a stable ID
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, type: "spring" }}
            onClick={() => openViewer(i)}
            className={`relative w-32 aspect-square rounded-md border bg-white group cursor-pointer
              ${
                currentIndex === i
                  ? "border-primary border-2"
                  : "border-gray-200"
              }
            `}
          >
            <img
              src={imageUrl}
              className="w-full h-full object-contain rounded-md"
              alt={`Product image ${i + 1}`}
              onError={(e) => {
                // Fallback for broken images
                e.currentTarget.src = "/placeholder-image.png";
              }}
            />

            {/* Label */}
            <div className="absolute bottom-1 left-0 w-full px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-md block truncate">
                    {label}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(i);
              }}
              className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 transition-colors rounded-full text-white text-xs px-1.5 py-0.5 shadow-md"
            >
              ✕
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
