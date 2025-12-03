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

  // Form submission
  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const payload = new FormData();
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);

      if (formData.phone) payload.append("phone", formData.phone);
      if (formData.city) payload.append("city", formData.city);
      if (formData.street) payload.append("street", formData.street);
      if (formData.building) payload.append("building", formData.building);
      if (formData.country) payload.append("country", formData.country);

      // Only include password if it's not empty
      if (formData.password && formData.password.length > 0) {
        payload.append("password", formData.password);
      }

      // Append avatar file if selected
      if (formData.avatar instanceof File) {
        payload.append("avatar", formData.avatar);
      }

      startTransition(async () => {
        const result = await updateProfileAction(payload);

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
    } finally {
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
          <DialogTitle>Edit Profile</DialogTitle>
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
              Click the + icon to upload a new avatar (Max 2MB)
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

          {/* Address Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">City</label>
              <Input {...register("city")} placeholder="Dubai" />
            </div>

            <div>
              <label className="text-sm font-medium">Street</label>
              <Input {...register("street")} placeholder="Main Street" />
            </div>

            <div>
              <label className="text-sm font-medium">Building / Apt</label>
              <Input {...register("building")} placeholder="Building 12A" />
            </div>

            <div>
              <label className="text-sm font-medium">Country</label>
              <Input {...register("country")} placeholder="UAE" />
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
            <Button type="submit" isLoading={pending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
