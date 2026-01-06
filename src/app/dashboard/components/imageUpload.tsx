"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ImageUploadProps = {
  image?: string; // preview only
  onChangeAction: (file: File | null) => void;
  error?: boolean;
};

export default function ImageUpload({
  image,
  onChangeAction,
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(image);

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    onChangeAction(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChangeAction(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {!preview ? (
        <label
          htmlFor="cat-image"
          className={`border mt-1 border-dashed rounded-xl p-4 block text-center cursor-pointer ${
            error ? "border-red-500 bg-red-100" : "hover:bg-slate-100"
          }`}
        >
          <p
            className={`text-sm ${
              error ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            Upload Image
          </p>
        </label>
      ) : (
        <div className="relative mt-1 aspect-square h-40 rounded-xl overflow-hidden border bg-gray-100">
          <img
            src={preview}
            alt="Category"
            className="object-contain w-full h-full"
          />

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute !bg-red-500/70 hover:!bg-red-500/90 bottom-2 right-2"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      )}

      <input
        type="file"
        id="cat-image"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
