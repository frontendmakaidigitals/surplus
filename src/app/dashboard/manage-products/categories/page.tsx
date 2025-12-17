"use client";
import { useState, useEffect } from "react";
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
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    deleteSubCategory,
    updateSubCategory, // Make sure to destructure this too!
  } = useCategoryActions(initialCategories);

  const [view, setView] = useState<"table" | "card">("table");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editing, setEditing] = useState<any>(null);
  const [manageSubsFor, setManageSubsFor] = useState<Category | null>(null);
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

  // Sync manageSubsFor with the latest category data whenever categories change
  useEffect(() => {
    if (manageSubsFor) {
      const updated = findItemById(categories, manageSubsFor.id);
      if (updated) {
        setManageSubsFor(updated);
      }
    }
  }, [categories]);

  // Sync selectedCategory with the latest category data
  useEffect(() => {
    if (selectedCategory) {
      const updated = findItemById(categories, selectedCategory.id);
      if (updated) {
        setSelectedCategory(updated as Category);
      }
    }
  }, [categories]);

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setManageSubsFor(null);
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
        clear={() => setSelectedCategory(null)}
      />

      {view === "table" && (
        <CategoriesTable
          data={selectedCategory?.subCategories || categories}
          onSelect={setSelectedCategory}
          onEdit={(row: any) => {
            setEditing(row);
            setOpen(true);
          }}
          onAddSubs={(cat: Category) => {
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
        updateSubCategory={updateSubCategory} // Pass this prop!
        deleteSubCategory={deleteSubCategory}
        setEditing={setEditing}
        setManageSubsFor={setManageSubsFor}
        activeCategory={selectedCategory} // Pass selectedCategory as activeCategory
        setActiveCategory={setSelectedCategory}
        handleClose={handleClose}
      />
    </div>
  );
}
