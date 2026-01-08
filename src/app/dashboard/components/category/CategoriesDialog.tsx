"use client";
import CategoryForm from "./Category-Form";
import SubCategoryForm from "./Subcategory";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, subcategories } from "../../actions/useCategoryActions";

interface CategoriesDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  manageSubsFor: Category | null;
  editing: Category | null;
  editingSubcategory?: subcategories | null;
  activeCategory: Category | null;
  setEditing: (category: Category | null) => void;
  setManageSubsFor: (category: Category | null) => void;
  setActiveCategory: (category: Category | null) => void;
  handleClose: () => void;
  onSuccess: () => void;
  fetchCategories: () => void;
}

export function CategoriesDialog({
  open,
  setOpen,
  manageSubsFor,
  editing,
  editingSubcategory,
  activeCategory,
  handleClose,
  fetchCategories,
}: CategoriesDialogProps) {
  const getDialogTitle = () => {
    if (editingSubcategory) {
      return "Edit Subcategory";
    }
    if (manageSubsFor && !editing && !editingSubcategory) {
      return `Add Sub Category to ${manageSubsFor.name}`;
    }
    if (manageSubsFor) {
      return `Sub Categories – ${manageSubsFor.name}`;
    }
    if (editing) {
      return "Edit Category";
    }
    if (activeCategory) {
      return `Add Sub Category to ${activeCategory.name}`;
    }
    return "Add Category";
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (!isOpen ? handleClose() : setOpen(true))}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        {/* Show SubCategoryForm if: manageSubsFor is set OR editingSubcategory */}
        {manageSubsFor || editingSubcategory ? (
          <SubCategoryForm
            parentId={manageSubsFor?.id ?? editingSubcategory?.parent_id ?? 0}
            editing={editingSubcategory ?? null}
            handleClose={handleClose}
            fetchCategories={fetchCategories}
          />
        ) : (
          <CategoryForm
            fetchCategories={fetchCategories}
            handleClose={handleClose}
            editing={editing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
