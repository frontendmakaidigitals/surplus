"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

// --- Reusable Stat Card -----------------------------------------
export const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  if (value === undefined || value === null) return null; // ⬅ show only if exists

  return (
    <Card className="shadow-none border ">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

// --- Reusable Action Card (Add Button) ----------------------------
export const ActionCard = ({
  title,
  onClick,
  icon: Icon = Plus,
}: {
  title: string;
  onClick?: () => void;
  icon?: React.ElementType;
}) => {
  return (
    <Card
      onClick={onClick}
      className="shadow-none border border-slate-400/20 bg-primary/10 text-slate-800
      hover:bg-primary/90 group cursor-pointer transition hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="flex flex-col items-center justify-center gap-1 py-6">
        <div className="bg-white/70 border border-slate-800/20 rounded-full p-1">
          <Icon />
        </div>
        <CardTitle className="text-sm font-[600] group-hover:text-slate-100">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

// --- Wrapper Grid Component (Auto Detect Props) -------------------
export const StatsGrid = ({
  products,
  categories,
  catalogs,

  extraStats = [], // custom stats
  actionCard, // optional button card
}: {
  products?: number;
  categories?: number;
  catalogs?: number;

  extraStats?: { title: string; value: number }[];

  actionCard?: {
    title: string;
    onClick?: () => void;
    icon?: React.ElementType;
  };
}) => {
  const items = [
    { title: "Total Products", value: products },
    { title: "Total Categories", value: categories },
    { title: "Total Catalogs", value: catalogs },
    ...extraStats,
  ];

  return (
    <div className="flex items-center w-full justify-between gap-2">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {items.map(
          (item, i) =>
            item.value !== undefined &&
            item.value !== null && (
              <StatCard key={i} title={item.title} value={item.value} />
            )
        )}

        {actionCard && (
          <ActionCard
            title={actionCard.title}
            onClick={actionCard.onClick}
            icon={actionCard.icon}
          />
        )}
      </div>
    </div>
  );
};
