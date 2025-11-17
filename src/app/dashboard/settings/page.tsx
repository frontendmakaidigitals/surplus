"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserIcon } from "lucide-react";
export default function SettingsPage() {
  const [role, setRole] = useState<"admin" | "user">("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "user";
    setRole(storedRole as "admin" | "user");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings:", formData);
    // TODO: integrate Firestore or backend update here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg border border-border/40 rounded-xl shadow-sm bg-background p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <label
              htmlFor="image"
              className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-border/40 shadow-sm hover:border-primary/70 transition-all duration-200 cursor-pointer"
            >
              {formData.image ? (
                <>
                  <Image
                    src={formData.image}
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-medium">
                    Change
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  <UserIcon size={60} />
                </div>
              )}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Name Fields */}
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* User-only fields */}
          {role === "user" && (
            <>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <Button type="submit" className="w-full text-white sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
