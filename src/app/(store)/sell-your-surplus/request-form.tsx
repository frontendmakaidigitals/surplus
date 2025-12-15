"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useWatch, FieldErrors } from "react-hook-form";
import SelectBox from "@/app/dashboard/components/Select";
import { ImageThumbnail } from "@/app/dashboard/components/Image-Thumbnail";
import ImageDialog from "@/app/dashboard/components/Image-Dialog";
import { toast } from "sonner";
import { useProductBuilder } from "@/app/dashboard/context/ProductFormContext";
import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import SubmitSucess from "@/ui/Submit-sucess";
interface SurplusRequestFormValues {
  name: string;
  phone: string;
  email: string;
  business: string;
  description: string;
  category: string;
  quantity: string;
  quantityType: string;
  condition: string;
  location: string;
  images: FileList | File[] | string[];
}

const fieldOrder: (keyof SurplusRequestFormValues)[] = [
  "images",
  "location",
  "condition",
  "quantityType",
  "quantity",
  "category",
  "description",
  "business",
  "email",
  "email",
  "phone",
  "name",
];

export default function SurplusRequestForm() {
  const { images, files, openViewer, removeImage, handleImageChange } =
    useProductBuilder();
  const [successOpen, setSuccessOpen] = useState(false);
  const form = useForm<SurplusRequestFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      business: "",
      description: "",
      category: "",
      quantity: "",
      quantityType: "Pcs",
      condition: "",
      location: "",
    },
  });
  const [status, setStatus] = useState<null | string>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const quantityType = useWatch({
    control: form.control,
    name: "quantityType",
  });
  const condition = useWatch({
    control: form.control,
    name: "condition",
  });

  const onError = async (errors: FieldErrors<SurplusRequestFormValues>) => {
    for (const field of fieldOrder) {
      const err = errors[field];
      if (err?.message) {
        toast.error(err.message, {
          className:
            "!bg-red-600/40 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
        });
      }
    }
  };

  const onSubmit = async (data: SurplusRequestFormValues) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value as string);
        }
      });

      files.forEach((img: File, index: number) => {
        formData.append("images", img, img.name || `image-${index}.jpg`);
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/surplus-requests`,
        {
          body: formData,
        }
      );

      if (res.data.status === "success") {
        toast.success("Request Submitted!", {
          className:
            "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        setSuccessOpen(true);
      } else {
        toast.error("Something went wrong.", {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
      }
      setStatus(res.data.status);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid grid-cols-2 bg-white border border-neutral-300/30 rounded-lg p-5 gap-6 mt-4"
    >
      <SubmitSucess successOpen={successOpen} setSuccessOpen={setSuccessOpen} />
      <ImageDialog />
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
        <Input placeholder="Your Company" {...register("business")} />
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
            value={quantityType}
            onChange={(v) => form.setValue("quantityType", v)}
            categories={["Pcs", "Kg", "Lbs"]}
          />
        </div>
      </div>

      {/* CONDITION */}
      <Field important label="Condition">
        <SelectBox
          value={condition}
          onChange={(v) => form.setValue("condition", v)}
          categories={["New", "Used", "Open box"]}
          placeholder="Select Condition"
        />
      </Field>

      {/* LOCATION */}
      <Field important label="Location">
        <Input placeholder="Complete Address" {...register("location")} />
      </Field>

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

          <div className="mt-4">
            <ImageThumbnail
              removeImage={removeImage}
              images={images}
              files={files}
              openViewer={openViewer}
            />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="col-span-2 flex justify-end">
        <Button
          isLoading={isSubmitting}
          className={cn(
            "w-fit h-11 text-white transition",

            !status
              ? "bg-secondary hover:bg-secondary/80"
              : status === "success"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-500 hover:bg-red-400"
          )}
          type="submit"
        >
          Submit Request
        </Button>
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
