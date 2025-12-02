"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

import {
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  User2Icon,
  Edit,
  Plus,
} from "lucide-react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  role: "user" | "admin" | string; // adjust if more roles exist
  status: string;
  created_at: string; // ISO date string
  avatar?: string;
  city?: string;
  street?: string;
  building?: string;
  country?: string;
  phone?: string;
  password?: string;
};
interface Order {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Cancelled";
}
interface UserDashboardProps {
  userData: User;
}
export default function UserDashboard({ userData }: UserDashboardProps) {
  const [user, setUser] = useState<User>(userData);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<User>(userData);

  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const router = useRouter();

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    toast.success("Profile updated successfully!");
    setEditOpen(false);
  };
  useEffect(() => {
    if (action === "edit-profile") {
      setEditOpen(true);
    }
  }, [action]);

  if (!user) return null;

  const totalOrders = orders.length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const processing = orders.filter((o) => o.status === "Processing").length;
  const cancelled = orders.filter((o) => o.status === "Cancelled").length;

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full flex justify-center items-center overflow-hidden ring-4 ring-primary/20">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.first_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User2Icon className="size-[28px]" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Welcome back,{" "}
                <span className="capitalize">{user.first_name}</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                {user.email.charAt(0).toUpperCase() + user.email.slice(1)}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 hover:text-white">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex flex-col gap-2">
                  <div className="relative w-40 h-40 border border-slate-800/20 rounded-full mx-auto flex justify-center items-center">
                    {form.avatar ? (
                      <img
                        src={form.avatar || "/placeholder-avatar.png"}
                        className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                        alt="avatar"
                      />
                    ) : (
                      <User2Icon className="size-[66px]" />
                    )}

                    <button
                      type="button"
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center text-white"
                      onClick={() =>
                        document.getElementById("avatarInput")?.focus()
                      }
                    >
                      <Plus />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {" "}
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      value={form.first_name}
                      onChange={(e) =>
                        setForm({ ...form, first_name: e.target.value })
                      }
                      placeholder="John"
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="you@example.com"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      value={form?.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      placeholder="Dubai"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Street</label>
                    <Input
                      value={form.street}
                      onChange={(e) =>
                        setForm({ ...form, street: e.target.value })
                      }
                      placeholder="Main Street"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Building / Apt
                    </label>
                    <Input
                      value={form.building}
                      onChange={(e) =>
                        setForm({ ...form, building: e.target.value })
                      }
                      placeholder="Building 12A"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                      placeholder="UAE"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Leave blank if you do not want to change your password.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    router.replace("/my-account", { scroll: false });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <ShoppingCart className="w-5 h-5 text-primary" /> Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {totalOrders}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600" /> Fullfilled
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-green-600">
              {delivered}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Clock className="w-5 h-5 text-yellow-600" /> Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-yellow-600">
              {processing}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <XCircle className="w-5 h-5 text-red-600" /> Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-red-600">
              {cancelled}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className=" border shadow-xs border-slate-400/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition"
                      >
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">₹{order.total}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-20 pb-16 text-center text-gray-500 text-sm font-medium"
                      >
                        You have no orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
