"use client";
import { Button } from "@/components/ui/button";
type ImageUploadProps = {
  image?: string; // optional
  onChangeAction: (url: string) => void; // required callback (Server Action-style name)
  error?: string;
};

export default function ImageUpload({
  image,
  onChangeAction,
  error,
}: ImageUploadProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    onChangeAction(preview);

    setTimeout(() => URL.revokeObjectURL(preview), 5000);
  };

  return (
    <div className="space-y-2">
      {!image ? (
        <label
          htmlFor="cat-image"
          className={`border mt-1 border-dashed rounded-xl p-4 block text-center cursor-pointer  ${
            error ? "border-red-500 bg-red-100" : "hover:bg-slate-100"
          }`}
        >
          <p
            className={`text-sm  ${
              error ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            Upload Image
          </p>
        </label>
      ) : (
        <div className="relative mt-1 aspect-square h-40 rounded-xl overflow-hidden border bg-gray-100">
          <img
            src={image}
            alt="Category"
            className="object-contain w-full h-full"
          />

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute !bg-red-500/70 hover:!bg-red-500/90 bottom-2 right-2"
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
