"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export interface ImageThumbnailProps {
  images: string[];
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

  return (
    <div className="flex gap-3 mt-2">
      {images.map((img, i) => {
        const isBlob = img.startsWith("blob:");
        const label = isBlob ? "New image" : "Existing image";

        return (
          <motion.div
            key={img}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, type: "spring" }}
            onClick={() => openViewer(i)}
            className={`relative w-32 aspect-square rounded-md border bg-white group cursor-pointer
              ${currentIndex === i ? "border-primary border-2" : ""}
            `}
          >
            <img
              src={`${
                isBlob ? img : `${process.env.NEXT_PUBLIC_SERVER_URL}${img}`
              }`}
              className="w-full h-full object-contain"
              alt={`Image ${i + 1}`}
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

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(i);
              }}
              className="absolute -top-1 -right-1 bg-red-600 rounded-full text-white text-xs px-1.5 py-0.5"
            >
              ✕
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
