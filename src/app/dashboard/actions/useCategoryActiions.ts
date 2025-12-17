import { useState } from "react";
import type { Category, SubCategory } from "../../../../data";

export function useCategoryActions(initial: Category[]) {
  const [categories, setCategories] = useState<Category[]>(initial);

  const addCategory = (data: Omit<Category, "id" | "subCategories">) => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now().toString(), ...data, subCategories: [] },
    ]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addSubCategory = (data: Omit<SubCategory, "id">) => {
    if (!data.parentId) return;
    const sub: SubCategory = {
      id: Date.now().toString(),
      ...data,
      subCategories: [],
    };

    // recursive function to find parent and add sub
    const addToParent = (
      items: (Category | SubCategory)[]
    ): (Category | SubCategory)[] => {
      return items.map((item) => {
        if (item.id === data.parentId) {
          return {
            ...item,
            subCategories: [...(item.subCategories || []), sub],
          };
        } else if (item.subCategories?.length) {
          return { ...item, subCategories: addToParent(item.subCategories) };
        }
        return item;
      });
    };

    setCategories((prev) => addToParent(prev) as Category[]);
  };

  const deleteSubCategory = (id: string) => {
    // recursive function to find and delete subcategory at any level
    const deleteFromTree = (
      items: (Category | SubCategory)[]
    ): (Category | SubCategory)[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.subCategories?.length) {
            return {
              ...item,
              subCategories: deleteFromTree(item.subCategories),
            };
          }
          return item;
        });
    };

    setCategories((prev) => deleteFromTree(prev) as Category[]);
  };

  const updateSubCategory = (id: string, updated: Partial<SubCategory>) => {
    // recursive function to find and update subcategory at any level
    const updateInTree = (
      items: (Category | SubCategory)[]
    ): (Category | SubCategory)[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, ...updated };
        } else if (item.subCategories?.length) {
          return {
            ...item,
            subCategories: updateInTree(item.subCategories),
          };
        }
        return item;
      });
    };

    setCategories((prev) => updateInTree(prev) as Category[]);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    deleteSubCategory,
    updateSubCategory,
    setCategories,
  };
}
