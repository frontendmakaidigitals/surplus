"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import UpdateForm from "./update-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  User2Icon,
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

interface UserDashboardProps {
  userData: User;
}
export default function UserDashboard({ userData }: UserDashboardProps) {
  const user = userData;
  const orders = [{}];
  const [editOpen, setEditOpen] = useState(false);

  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  useEffect(() => {
    if (action === "edit-profile") {
      setEditOpen(true);
    }
  }, [action]);

  if (!user) return null;

  const totalOrders = 0;
  const delivered = 0;
  const processing = 0;
  const cancelled = 0;

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
          <UpdateForm
            data={user}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
          />
        </div>

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
                    orders.map((order, id) => (
                      <tr
                        key={id}
                        className="border-b last:border-0 hover:bg-muted/30 transition"
                      >
                        <td className="py-3 px-4 font-medium">0</td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4">$</td>
                        <td className="py-3 px-4"></td>
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
