"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  PackageCheck,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { products } from "../../../data";
export default function AdminDashboard() {
  // Placeholder analytics data
  const stats = {
    todaySales: 12450,
    monthlySales: 345000,
    totalSales: 1850000,
    totalOrders: 8900,
    pendingOrders: 142,
    deliveredOrders: 8200,
    cancelledOrders: 112, // ⭐ NEW
  };

  const topProducts = [
    { id: "p1", sold: 320 },
    { id: "p2", sold: 278 },
    { id: "p3", sold: 240 },
    { id: "p4", sold: 225 },
    { id: "p5", sold: 215 },
    { id: "p6", sold: 190 },
    { id: "p7", sold: 178 },
    { id: "p8", sold: 166 },
    { id: "p9", sold: 150 },
    { id: "p10", sold: 142 },
  ];
  const graphData = {
    todaySales: [
      { value: 20 },
      { value: 35 },
      { value: 22 },
      { value: 40 },
      { value: 60 },
    ],
    monthlySales: [
      { value: 300 },
      { value: 350 },
      { value: 380 },
      { value: 420 },
      { value: 500 },
    ],
    totalSales: [
      { value: 1200 },
      { value: 1400 },
      { value: 1600 },
      { value: 1800 },
      { value: 2000 },
    ],
    totalOrders: [
      { value: 6000 },
      { value: 6500 },
      { value: 7000 },
      { value: 8000 },
      { value: 8900 },
    ],
    pendingOrders: [
      { value: 150 },
      { value: 148 },
      { value: 160 },
      { value: 155 },
      { value: 142 },
    ],
    deliveredOrders: [
      { value: 7000 },
      { value: 7200 },
      { value: 7500 },
      { value: 8000 },
      { value: 8200 },
    ],
    cancelledOrders: [
      { value: 80 },
      { value: 95 },
      { value: 100 },
      { value: 108 },
      { value: 112 },
    ],
  };
  const merged = topProducts
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        ...item,
        ...product,
        image: product.images[0],
      };
    })
    .filter(Boolean);
  const formatCurrency = (num: number) =>
    num.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* ===== ROW 1 (4 cards) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Today's Sales"
            icon={<DollarSign className="h-6 w-6" />}
            value={formatCurrency(stats.todaySales)}
            trendData={graphData.todaySales}
            trendDirection="up"
          />

          <DashboardCard
            title="Monthly Sales"
            icon={<TrendingUp className="h-6 w-6" />}
            value={formatCurrency(stats.monthlySales)}
            trendData={graphData.monthlySales}
            trendDirection="up"
          />

          <DashboardCard
            title="Total Sales"
            icon={<BarChart3 className="h-6 w-6" />}
            value={formatCurrency(stats.totalSales)}
            trendData={graphData.totalSales}
            trendDirection="down"
          />

          <DashboardCard
            title="Total Orders"
            icon={<ShoppingCart className="h-6 w-6" />}
            value={stats.totalOrders}
            trendData={graphData.totalOrders}
            trendDirection="up"
          />
        </div>

        {/* ===== ROW 2 (4 cards) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Pending Orders"
            icon={<Clock className="h-6 w-6" />}
            value={stats.pendingOrders}
            trendData={graphData.pendingOrders}
            trendDirection="down" // pending going down = good
            reverseColors={true}
          />

          <DashboardCard
            title="Delivered Orders"
            icon={<CheckCircle className="h-6 w-6" />}
            value={stats.deliveredOrders}
            trendData={graphData.deliveredOrders}
            trendDirection="up"
          />

          {/* ⭐ NEW: CANCELLED ORDERS */}
          <DashboardCard
            title="Cancelled Orders"
            icon={<PackageCheck className="h-6 w-6 rotate-45 text-red-600" />}
            value={stats.cancelledOrders}
            trendData={graphData.cancelledOrders}
            trendDirection="up" // increase in cancelled = BAD
            reverseColors={true} // reverse (up = red)
          />

          {/* ⭐ EXTRA CARD (or remove) */}
          <DashboardCard
            title="Return Rate"
            icon={<Clock className="h-6 w-6" />}
            value="2.5%"
            trendData={graphData.todaySales}
            trendDirection="down"
          />
        </div>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <PackageCheck className="h-5 w-5 text-primary" />
            Your Best-Selling Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Product Id</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Sold (in week)</th>
                </tr>
              </thead>
              <tbody>
                {merged.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{p.id}</td>
                    <td className="py-3 px-4 ">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10  relative rounded border overflow-hidden">
                          <Image
                            src={p.image || ""}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{p.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardCard({
  title,
  value,
  icon,
  trendData = [],
  trendDirection = "up",
  reverseColors = false, // ⭐ new
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trendData?: any[];
  trendDirection?: "up" | "down";
  reverseColors?: boolean;
}) {
  // ⭐ Apply color reversal logic
  const isUp = trendDirection === "up";
  const isPositive = reverseColors ? !isUp : isUp;

  const color = isPositive ? "text-green-600" : "text-red-600";
  const stroke = isPositive ? "#16a34a" : "#dc2626";

  return (
    <Card className="p-5 flex items-center justify-between shadow-md hover:shadow-lg transition rounded-xl">
      {/* LEFT */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-3">{value}</h2>

        <div
          className={`flex mt-2 items-center gap-1 text-sm font-medium ${color}`}
        >
          {isPositive ? (
            <ArrowUpRight size={18} />
          ) : (
            <ArrowDownRight size={18} />
          )}
          {isPositive ? "Increasing" : "Decreasing"}
        </div>
      </div>

      {/* RIGHT CHART */}
      <div className="w-24 h-14 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
