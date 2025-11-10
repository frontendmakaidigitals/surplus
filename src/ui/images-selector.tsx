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
      <div className="w-full aspect-video bg-white rounded-xl flex items-center justify-center border text-neutral-500">
        No images available
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1 flex flex-col gap-4">
      {/* Main large image */}
      <div className="relative w-full aspect-video bg-white rounded-xl overflow-hidden border">
        <Image
          src={selectedImage || 'https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-shopping-bag-icon-design-vector-templates-white-on-background-png-image_4900872.png'}
          alt="Selected product image"
          fill
          className="object-contain transition-transform duration-300 hover:scale-105"
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
                  ? "ring-2 ring-blue-500 border-blue-500"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                fill
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
