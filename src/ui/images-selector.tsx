"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageSelectorProps {
  images?: string[];
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images = [] }) => {
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
          src={`/products/${selectedImage}`}
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
                src={`/products/${image}`}
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
