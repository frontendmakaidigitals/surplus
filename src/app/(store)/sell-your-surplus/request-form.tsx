"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import SelectBox from "@/app/dashboard/components/Select";
import { ImageThumbnail } from "@/app/dashboard/components/Image-Thumbnail";
import ImageDialog from "@/app/dashboard/components/Image-Dialog";

import { useProductBuilder } from "@/app/dashboard/context/ProductFormContext";
interface SurplusRequestFormValues {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  description: string;
  category: string;
  quantity: string;
  quantityType: string;
  condition: string;
  location: string;
  createdAt: string;
  images: FileList | File[] | string[];
}

export default function SurplusRequestForm() {
  const { images, files, openViewer, removeImage, handleImageChange } =
    useProductBuilder();
  const form = useForm<SurplusRequestFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessName: "",
      description: "",
      category: "",
      quantity: "",
      quantityType: "Pcs",
      condition: "",
      location: "",
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = (data: SurplusRequestFormValues) => {
    console.log("FORM DATA:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 bg-white border border-neutral-300/30 rounded-lg p-5 gap-6 mt-4"
    >
      <ImageDialog />
      {/* NAME */}
      <Field important label="Name">
        <Input placeholder="Full name" {...register("name")} />
      </Field>

      {/* PHONE */}
      <Field important label="Phone">
        <Input placeholder="Phone" {...register("phone")} />
      </Field>

      {/* EMAIL */}
      <Field important label="Email">
        <Input placeholder="Email" {...register("email")} />
      </Field>

      {/* BUSINESS */}
      <Field important label="Business">
        <Input placeholder="Your Company" {...register("businessName")} />
      </Field>

      {/* CATEGORY */}
      <Field important label="Category">
        <Input placeholder="Product Category" {...register("category")} />
      </Field>

      {/* QUANTITY + TYPE */}
      <div className="flex flex-col gap-1">
        <Label>
          Quantity <span className="text-red-500">*</span>
        </Label>

        <div className="grid grid-cols-4 gap-2">
          <Input
            placeholder="Quantity"
            {...register("quantity")}
            className="w-full col-span-3"
          />

          <SelectBox
            value={form.watch("quantityType")}
            onChange={(v) => form.setValue("quantityType", v)}
            categories={["Pcs", "Kg", "Lbs"]}
          />
        </div>
      </div>

      {/* CONDITION */}
      <Field important label="Condition">
        <Input placeholder="Product Condition" {...register("condition")} />
      </Field>

      {/* LOCATION */}
      <Field important label="Location">
        <Input placeholder="Complete Address" {...register("location")} />
      </Field>

      {/* SUBMITTED ON */}
      <div className="col-span-2">
        <Field important label="Submitted On">
          <Input {...register("createdAt")} />
        </Field>
      </div>

      {/* DESCRIPTION */}
      <div className="col-span-2">
        <Field important label="Description / Message">
          <Textarea
            placeholder="Product Description or Message"
            {...register("description")}
            className="min-h-24 resize-none"
          />
        </Field>
      </div>

      {/* IMAGES UPLOAD */}
      <div className="col-span-2">
        <div className="space-y-2 w-full">
          <Label>Product Images</Label>
          <div
            className={`border border-dashed   p-6 mt-2 rounded-xl ${
              images.length === 6
                ? "bg-slate-200 cursor-not-allowed"
                : " bg-slate-100 cursor-pointer"
            }`}
          >
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="product-images"
              onChange={(e) => handleImageChange(e.target.files)}
            />

            <label
              htmlFor={images.length < 6 ? `product-images` : ""}
              className={` text-center ${
                images.length === 6 ? " cursor-not-allowed" : "  cursor-pointer"
              } `}
            >
              <p
                className={`text-sm  ${
                  images.length === 6 ? "text-slate-500" : "  text-gray-600"
                }`}
              >
                Click to upload images
              </p>
              <p
                className={`text-xs  ${
                  images.length === 6 ? "text-slate-400" : " text-gray-400"
                }`}
              >
                (You can upload multiple images ending with .jpg, .png, jpeg or
                .webp)
              </p>
            </label>
          </div>

          <ImageThumbnail
            removeImage={removeImage}
            images={images}
            files={files}
            openViewer={openViewer}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="col-span-2 flex justify-end">
        <Button type="submit">Submit Request</Button>
      </div>
    </form>
  );
}

function Field({
  label,
  important,
  children,
}: {
  label: string;
  important?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label>
        {label} {important && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}
