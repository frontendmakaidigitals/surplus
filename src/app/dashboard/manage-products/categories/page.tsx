"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  categories as initialCategories,
  Category,
  SubCategory,
} from "../../../../../data";
import { useCategoryActions } from "../../actions/useCategoryActiions";
import { CategoriesHeader } from "../../components/category/CategoriesHeader";
import { CategoriesBreadcrumb } from "../../components/category/CategoriesBreadCrumb";
import { CategoriesTable } from "../../components/category/CategoriesTable";
import { CategoriesDialog } from "../../components/category/CategoriesDialog";

export default function CategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    deleteSubCategory,
    updateSubCategory,
  } = useCategoryActions(initialCategories);

  const [view, setView] = useState<"table" | "card">("table");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | SubCategory | null
  >(null);
  const [editing, setEditing] = useState<any>(null);
  const [manageSubsFor, setManageSubsFor] = useState<
    Category | SubCategory | null
  >(null);
  const [open, setOpen] = useState(false);

  // Helper function to find a category/subcategory by ID
  const findItemById = (
    categories: Category[],
    id: string
  ): Category | SubCategory | null => {
    for (const cat of categories) {
      if (cat.id === id) return cat;

      const searchInSubs = (subs: SubCategory[]): SubCategory | null => {
        for (const sub of subs) {
          if (sub.id === id) return sub;
          if (sub.subCategories?.length) {
            const found = searchInSubs(sub.subCategories);
            if (found) return found;
          }
        }
        return null;
      };

      if (cat.subCategories?.length) {
        const found = searchInSubs(cat.subCategories);
        if (found) return found;
      }
    }
    return null;
  };

  // Sync state with URL on mount and when URL changes
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      const category = findItemById(categories, categoryId);
      if (category) {
        setSelectedCategory(category);
      } else {
        // Category not found, clear URL
        router.replace("/admin/categories");
      }
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, categories]);

  // Sync manageSubsFor with the latest category data whenever categories change
  useEffect(() => {
    if (manageSubsFor) {
      const updated = findItemById(categories, manageSubsFor.id);
      if (updated) {
        setManageSubsFor(updated);
      }
    }
  }, [categories]);

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setManageSubsFor(null);
  };

  // Update URL when selecting a category
  const handleSelectCategory = (category: Category | SubCategory) => {
    router.push(`/admin/categories?category=${category.id}`);
  };

  // Clear selection and URL
  const handleClearSelection = () => {
    router.push("/admin/categories");
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl mb-4">Categories</h1>

      <CategoriesHeader
        view={view}
        setView={setView}
        count={categories.length}
        onAdd={() => setOpen(true)}
      />

      <CategoriesBreadcrumb
        selected={selectedCategory}
        clear={handleClearSelection}
      />

      {view === "table" && (
        <CategoriesTable
          data={selectedCategory?.subCategories || categories}
          onSelect={handleSelectCategory}
          onEdit={(row: any) => {
            setEditing(row);
            setOpen(true);
          }}
          onAddSubs={(cat: Category | SubCategory) => {
            setManageSubsFor(cat);
            setOpen(true);
          }}
          onDelete={(id: string, parentId?: string) =>
            parentId ? deleteSubCategory(id) : deleteCategory(id)
          }
          animate={!!selectedCategory}
        />
      )}

      <CategoriesDialog
        open={open}
        setOpen={setOpen}
        editing={editing}
        manageSubsFor={manageSubsFor}
        addCategory={addCategory}
        addSubCategory={addSubCategory}
        updateCategory={updateCategory}
        updateSubCategory={updateSubCategory}
        deleteSubCategory={deleteSubCategory}
        setEditing={setEditing}
        setManageSubsFor={setManageSubsFor}
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
        handleClose={handleClose}
      />
    </div>
  );
}
