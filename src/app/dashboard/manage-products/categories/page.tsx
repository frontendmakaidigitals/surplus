"use client";
import { useState, useEffect } from "react";
import { CategoriesHeader } from "../../components/category/CategoriesHeader";
import { CategoriesBreadcrumb } from "../../components/category/CategoriesBreadCrumb";
import { CategoriesTable } from "../../components/category/CategoriesTable";
import { CategoriesDialog } from "../../components/category/CategoriesDialog";
import {
  getCategoriesAction,
  deleteCategoryAction,
} from "../../actions/useCategoryActions";
import { toast } from "sonner";
import { Category, subcategories } from "@/lib/types";
export default function CategoriesPage() {
  const [view, setView] = useState<"table" | "card">("table");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [manageSubsFor, setManageSubsFor] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const countCategories = (categories: any[]): number => {
    return categories.reduce((total, category) => {
      let count = 1;

      // If category has subcategories, recursively count them
      if (
        category.subcategories &&
        Array.isArray(category.subcategories) &&
        category.subcategories.length > 0
      ) {
        count += countCategories(category.subcategories);
      }

      return total + count;
    }, 0);
  };
  // Fetch categories on mount
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoriesAction();
      setCategories(data);
      setCategoryCount(countCategories(data));
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const findItemById = (
    categories: Category[],
    id: number
  ): Category | null => {
    for (const cat of categories) {
      if (cat.id === id) return cat;

      const searchInSubs = (subs: Category[]): Category | null => {
        for (const sub of subs) {
          if (sub.id === id) return sub;
          if (sub.subcategories?.length) {
            const found = searchInSubs(sub.subcategories);
            if (found) return found;
          }
        }
        return null;
      };

      if (cat.subcategories?.length) {
        const found = searchInSubs(cat.subcategories);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    if (manageSubsFor) {
      const updated = findItemById(categories, manageSubsFor.id);
      if (updated) {
        setManageSubsFor(updated);
      }
    }
  }, [categories, manageSubsFor]);
  const [editingSubcategory, setEditingSubcategory] =
    useState<subcategories | null>(null);
  useEffect(() => {
    if (selectedCategory) {
      const updated = findItemById(categories, selectedCategory.id);
      if (updated) {
        setSelectedCategory(updated);
      }
    }
  }, [categories, selectedCategory]);

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setManageSubsFor(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const result = await deleteCategoryAction(id);
      if (result.success) {
        toast.success("Category deleted successfully!");
        fetchCategories();
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-4xl mb-4">Categories</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl mb-4">Categories</h1>

      <CategoriesHeader
        view={view}
        setView={setView}
        count={categoryCount}
        onAdd={() => setOpen(true)}
      />

      <CategoriesBreadcrumb
        selected={selectedCategory}
        clear={() => setSelectedCategory(null)}
      />

      {view === "table" && (
        <CategoriesTable
          data={selectedCategory?.subcategories || categories}
          onSelect={setSelectedCategory}
          onEdit={(row: Category | subcategories) => {
            setEditing(row);

            if ("parent_id" in row && row.parent_id && row.parent_id > 0) {
              const parent =
                categories.find((cat) => cat.id === row.parent_id) ||
                selectedCategory;
              // Only set as subcategory if it actually is one (has a valid parent_id)
              setEditingSubcategory(row as subcategories);
              setManageSubsFor(parent);
            } else {
              setEditingSubcategory(null);
              setManageSubsFor(null);
            }

            setOpen(true);
          }}
          onAddSubs={(cat: Category) => {
            setManageSubsFor(cat);
            setEditing(null); // Clear editing when adding new
            setOpen(true);
          }}
          onDelete={handleDelete}
          animate={!!selectedCategory}
        />
      )}

      <CategoriesDialog
        open={open}
        setOpen={setOpen}
        editing={editing}
        editingSubcategory={editingSubcategory}
        manageSubsFor={manageSubsFor}
        setEditing={setEditing}
        setManageSubsFor={setManageSubsFor}
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
        handleClose={handleClose}
        onSuccess={fetchCategories}
        fetchCategories={fetchCategories}
      />
    </div>
  );
}
