"use client";

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
} from "lucide-react";

import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Cancelled";
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<User>({ name: "", email: "", avatar: "" });
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
    } else {
      const defaultUser = {
        name: "Faheem Khan",
        email: "faheem@example.com",
        avatar: "",
      };
      setUser(defaultUser);
      setForm(defaultUser);
    }

    setOrders([
      { id: "ORD-1010", date: "2025-11-08", total: 2499, status: "Delivered" },
      { id: "ORD-1011", date: "2025-11-09", total: 799, status: "Processing" },
      { id: "ORD-1012", date: "2025-11-10", total: 1499, status: "Cancelled" },
    ]);
  }, []);

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
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User2Icon className="size-[28px]" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 hover:text-white">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Avatar URL</label>
                  <Input
                    value={form.avatar}
                    onChange={(e) =>
                      setForm({ ...form, avatar: e.target.value })
                    }
                    placeholder="https://example.com/avatar.jpg"
                  />
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
        <Card className="shadow-lg border border-border/40">
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
                  {orders.map((order) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
