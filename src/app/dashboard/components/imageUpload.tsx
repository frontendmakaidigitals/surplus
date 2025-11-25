"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
type ImageUploadProps = {
  image?: string; // optional
  onChangeAction: (url: string) => void; // required callback (Server Action-style name)
};

export default function ImageUpload({
  image,
  onChangeAction,
}: ImageUploadProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    onChangeAction(preview);

    // small delay to ensure re-render catches the URL
    setTimeout(() => URL.revokeObjectURL(preview), 5000);
  };

  return (
    <div className="space-y-2">
      <Label>Category Image</Label>

      {!image ? (
        <label
          htmlFor="cat-image"
          className="border mt-1 border-dashed rounded-xl p-4 block text-center cursor-pointer hover:bg-slate-100"
        >
          <p className="text-sm text-muted-foreground">Upload Image</p>
        </label>
      ) : (
        <div className="relative mt-1 aspect-square h-40 rounded-xl overflow-hidden border bg-gray-100">
          {/* Use normal img for preview */}
          <img
            src={image}
            alt="Category"
            className="object-contain w-full h-full"
          />

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={() => onChangeAction("")}
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
