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
    files,
    currentIndex,
    setDialogOpen,
  } = useProductBuilder();
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-4xl ">
        <DialogTitle className="text-lg font-semibold">
          Image Preview
        </DialogTitle>
        <DialogDescription></DialogDescription>

        <div className="relative flex flex-col items-center">
          <img
            src={images[currentIndex]}
            alt=""
            className="w-full h-[400px] max-h-[400px] object-contain rounded-md"
          />
          <p className="mt-4">
            <span className=" bg-black/70  line-clamp-1 text-wrap text-white text-xs px-1.5 py-0.5 text-left rounded ">
              {files && files[currentIndex] ? files[currentIndex].name : "img"}
            </span>
          </p>
          {/* LEFT BUTTON */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ◀
          </button>
          {/* RIGHT BUTTON */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ▶
          </button>
        </div>

        <ImageThumbnail
          removeImage={removeImage}
          images={images}
          openViewer={openViewer}
          currentIndex={currentIndex}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
