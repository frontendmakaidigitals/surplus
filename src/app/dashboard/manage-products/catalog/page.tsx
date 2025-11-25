"use client";

import { useState, JSX } from "react";
import { Table } from "../../components/Table";
import { catalogs as initialCatalogs } from "../../../../../data";
import { StatsGrid } from "../../components/Info-Cards";
import ViewToggle from "../../components/View-Toggle";
import { Button } from "@/components/ui/button";
import CategoryCard from "../../components/CategoryCard";
type Catalog = {
  id: string;
  title: string; // e.g. "Pepperl Fuchs Proximity Sensors"
  img: string;
  link?: string; // optional
};

type Column<T> = {
  label: string;
  accessor?: keyof T;
  className?: string;
  render?: (row: T) => JSX.Element;
};
export default function CatalogPage() {
  const [catalogs, setCategories] = useState<Catalog[]>(initialCatalogs);
  const [view, setView] = useState<"table" | "card">("table");
  const [editing, setEditing] = useState<Catalog | null>(null);
  const [open, setOpen] = useState(false);
  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  console.log(editing, open);

  const openEditDialog = (category: Catalog) => {
    setEditing(category);
    setOpen(true);
  };
  const columns: Column<Catalog>[] = [
    {
      label: "Image",
      className: "max-w-20 min-w-28",
      render: (cat: { img: string; title: string }) => (
        <img
          src={cat.img}
          className="aspect-square w-28 object-cover rounded-md border"
          alt={cat.title}
        />
      ),
    },
    {
      label: "Catalog Name",
      accessor: "title",
      className: "max-w-[380px] font-semibold",
    },
    {
      label: "Actions",
      className: "w-[150px] text-right",
      render: ({ id, title, img }) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditDialog({ title, img, id })}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteCategory(id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-[500]">Catalogs</h1>
      </div>
      {/* Stats + Toggle */}
      <div className="flex justify-between items-end mb-4 mt-6">
        <StatsGrid
          products={32}
          categories={6}
          catalogs={catalogs.length}
          actionCard={{
            title: "Add Catalog",
            onClick: () => window.alert("Add Catalog Clicked"),
          }}
        />
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <Table columns={columns} data={catalogs} />
        </div>
      )}

      {/* CARD VIEW */}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogs.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={() => openEditDialog(cat)}
              onDelete={() => deleteCategory(cat.id)}
            />
          ))}

          {catalogs.length === 0 && (
            <p className="text-center text-slate-500 py-6 w-full">
              No catalogs found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
