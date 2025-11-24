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
  files: File[];
  openViewer: (index: number) => void;
  removeImage: (index: number) => void;
  currentIndex?: number;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  images,
  files,
  openViewer,
  removeImage,
  currentIndex,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex gap-3 mt-2">
      {images.map((img, i) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, type: "spring" }}
          key={i}
          onClick={() => openViewer(i)}
          className={`relative w-32 aspect-square rounded-md border bg-white group cursor-pointer ${
            i == 0 ? "shadow-[0_0_7px_2px_rgba(245,101,101,.4)]" : ""
          } ${currentIndex === i ? "border-primary border-2" : ""}`}
        >
          <img
            src={img}
            className="w-full h-full object-contain"
            alt={`Image ${i + 1}`}
          />

          <div className="absolute bottom-0">
            <Tooltip>
              <TooltipTrigger className="px-1">
                <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded line-clamp-1">
                  {files?.[i]?.name ?? "image"}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{files?.[i]?.name ?? "image"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevents opening viewer
              removeImage(i);
            }}
            className="absolute -top-1 -right-1 bg-red-600 rounded-full text-white text-xs px-1.5 py-0.5"
          >
            ✕
          </button>
        </motion.div>
      ))}
    </div>
  );
};
