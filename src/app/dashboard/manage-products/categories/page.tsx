"use client";

import { useState, JSX } from "react";
import CategoryForm from "../../components/Category-Form";
import CategoryCard from "../../components/CategoryCard";
import { initialCategories } from "../../components/data";
import ViewToggle from "../../components/View-Toggle";
import { StatsGrid } from "../../components/Info-Cards";
import { Table } from "../../components/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Category = {
  id: string;
  name: string;
  description?: string;
  image: string;
  count?: number;
};

type Column<T> = {
  label: string;
  accessor?: keyof T;
  className?: string;
  render?: (row: T) => JSX.Element;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"table" | "card">("table");

  const addCategory = (data: Omit<Category, "id">) => {
    const newCategory = {
      id: Date.now().toString(),
      ...data,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updated } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const openEditDialog = (category: Category) => {
    setEditing(category);
    setOpen(true);
  };

  const columns: Column<Category>[] = [
    {
      label: "Image",
      className: "max-w-20 min-w-28",
      render: (cat: Category) => (
        <img
          src={cat.image}
          className="aspect-square w-28 object-cover rounded-md border"
          alt={cat.name}
        />
      ),
    },
    {
      label: "Product Name",
      accessor: "name",
      className: "max-w-[180px] font-semibold",
    },
    {
      label: "Description",
      className: "min-w-[350px] max-w-[350px] text-sm text-slate-500",
      accessor: "description",
    },
    {
      label: "No. of Products",
      accessor: "count",
      className: "text-sm text-slate-500",
    },
    {
      label: "Actions",
      className: "w-[150px] text-right",
      render: (cat: Category) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditDialog(cat)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteCategory(cat.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 ">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-[500]">Categories</h1>
      </div>
      {/* ===== Dialog (Add / Edit) ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>

          <CategoryForm
            editing={editing}
            onSubmit={(data) => {
              editing ? updateCategory(editing.id, data) : addCategory(data);
              setOpen(false);
            }}
            cancelEdit={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-end mb-4 mt-6">
        <StatsGrid
          products={32}
          categories={6}
          catalogs={3}
          actionCard={{
            title: "Add Category",
            onClick: () => window.alert("Propmpt triggered"),
          }}
        />
        <ViewToggle view={view} onChange={setView} />
      </div>
      {view === "table" && (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <Table columns={columns} data={categories} />
        </div>
      )}
      {/* ===== CARD VIEW ===== */}
      {view === "card" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={() => openEditDialog(cat)}
              onDelete={() => deleteCategory(cat.id)}
            />
          ))}

          {categories.length === 0 && (
            <p className="text-center text-slate-500 py-6">
              No categories found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
