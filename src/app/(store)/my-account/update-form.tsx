"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Plus, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/update-user-profile";

// Zod validation schema
const profileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  building: z.string().optional(),
  country: z.string().optional(),
  password: z.string().optional().or(z.literal("")),
  avatar: z.any().optional(),
  // Address fields
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  company: z.string().optional(),
  postal_code: z.string().optional(),
  state: z.string().optional(),
  label: z.string().optional(),
  type: z.string().optional(),
  is_default: z.boolean().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  role: "user" | "admin" | string;
  status: string;
  created_at: string;
  avatar?: string;
  city?: string;
  street?: string;
  building?: string;
  country?: string;
  phone?: string;
};

const UpdateForm = ({
  editOpen,
  setEditOpen,
  data,
}: {
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: User;
}) => {
  const router = useRouter();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    data.avatar || null
  );
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || "",
      city: data.city || "",
      street: data.street || "",
      building: data.building || "",
      country: data.country || "",
      password: "",
      address_line_1: "",
      address_line_2: "",
      company: "",
      postal_code: "",
      state: "",
      label: "Home",
      type: "shipping",
      is_default: false,
    },
  });

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Set file in form
      setValue("avatar", file);
    }
  };

  const createAddress = async (formData: ProfileFormData) => {
    const addressData = {
      address_line_1: formData.street || formData.address_line_1,
      address_line_2: formData.building || formData.address_line_2,
      city: formData.city,
      company: formData.company,
      country: formData.country,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      postal_code: formData.postal_code,
      state: formData.state,
      label: formData.label || "Home",
      type: formData.type || "shipping",
      is_default: formData.is_default || false,
    };

    const response = await fetch("/api/account/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error((error as any).message || "Failed to create address");
    }

    return await response.json();
  };

  // Form submission
  const onSubmit = async (formData: ProfileFormData) => {
    try {
      startTransition(async () => {
        // Step 1: Create/Update Address
        try {
          await createAddress(formData);
          toast.success("Address saved successfully!");
        } catch (addressError: any) {
          console.error("Address creation error:", addressError);
          toast.error(addressError.message || "Failed to save address");
          // Continue with profile update even if address fails
        }

        // Step 2: Update Profile
        const profilePayload = new FormData();
        profilePayload.append("first_name", formData.first_name);
        profilePayload.append("last_name", formData.last_name);
        profilePayload.append("email", formData.email);

        if (formData.phone) profilePayload.append("phone", formData.phone);
        if (formData.city) profilePayload.append("city", formData.city);
        if (formData.street) profilePayload.append("street", formData.street);
        if (formData.building)
          profilePayload.append("building", formData.building);
        if (formData.country)
          profilePayload.append("country", formData.country);

        if (formData.password && formData.password.length > 0) {
          profilePayload.append("password", formData.password);
        }

        // Append avatar file if selected
        if (formData.avatar instanceof File) {
          profilePayload.append("avatar", formData.avatar);
        }

        const result = await updateProfileAction(profilePayload);
        if (result.success) {
          toast.success("Profile updated successfully!");
          setEditOpen(false);
          router.refresh();
        } else {
          toast.error(result.message || "Failed to update profile");
        }
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 hover:text-white">
          <Edit className="w-4 h-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile & Address</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col gap-2">
            <div className="relative w-40 h-40 border border-slate-800/20 rounded-full mx-auto flex justify-center items-center ">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                  alt="avatar"
                />
              ) : (
                <User2Icon className="size-[66px] text-gray-400" />
              )}

              <label
                htmlFor="avatarInput"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <Plus />
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <p className="text-xs text-center text-gray-500">
              Click the + icon to upload a new avatar (Max 5MB)
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input
                {...register("first_name")}
                placeholder="John"
                className={errors.first_name ? "border-red-500" : ""}
              />
              {errors.first_name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                {...register("last_name")}
                placeholder="Doe"
                className={errors.last_name ? "border-red-500" : ""}
              />
              {errors.last_name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                {...register("phone")}
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-3">Address Information</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Address Line 1</label>
                  <Input
                    {...register("address_line_1")}
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Address Line 2 / Apt
                  </label>
                  <Input {...register("address_line_2")} placeholder="Apt 4B" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input {...register("city")} placeholder="New York" />
                </div>

                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input {...register("state")} placeholder="NY" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Postal Code</label>
                  <Input {...register("postal_code")} placeholder="10001" />
                </div>

                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input {...register("country")} placeholder="USA" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">
                    Company (Optional)
                  </label>
                  <Input {...register("company")} placeholder="Acme Inc" />
                </div>

                <div>
                  <label className="text-sm font-medium">Label</label>
                  <Input {...register("label")} placeholder="Home" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  {...register("is_default")}
                  className="w-4 h-4"
                />
                <label htmlFor="is_default" className="text-sm">
                  Set as default address
                </label>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="••••••••"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Leave blank if you do not want to change your password.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditOpen(false);
                router.replace("/my-account", { scroll: false });
              }}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save All Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
