"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageSelectorProps {
  images?: string[];
  server?: boolean;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  images = [],
  server = false,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center border text-neutral-500">
        No images available
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1 flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] bg-slate-200/40 rounded-lg overflow-hidden border">
        <Image
          src={
            server
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}${selectedImage}`
              : `/products/${selectedImage || ""}`
          }
          alt="Selected product image"
          fill
          unoptimized
          className="object-contain transition-transform duration-300"
        />
      </div>

      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(image)}
              className={`relative w-20 h-20 rounded-lg border overflow-hidden flex-shrink-0 transition-all ${
                selectedImage === image
                  ? " border-primary"
                  : "border-gray-200 hover:border-primary/80"
              }`}
            >
              <Image
                src={
                  server
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${image}`
                    : `/products/${image || ""}`
                }
                alt={`Thumbnail ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
