import CategoryForm from "./Category-Form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Category, SubCategory } from "../../../../../data";

export function CategoriesDialog(props: any) {
  const {
    open,
    setOpen,
    manageSubsFor,
    editing,
    addCategory,
    addSubCategory,
    updateCategory,
    updateSubCategory,
    deleteSubCategory,
    setEditing,
    setManageSubsFor,
    activeCategory,
    setActiveCategory,
    handleClose,
  } = props;

  // Recursive component to render nested subcategories
  const SubCategoryItem = ({
    sub,
    level = 0,
  }: {
    sub: SubCategory;
    level?: number;
  }) => (
    <div className="space-y-2">
      <div
        className="border rounded-lg p-3 flex justify-between items-center"
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex items-center gap-3 flex-1">
          <img
            src={sub.img}
            alt={sub.title}
            className="w-12 h-12 rounded object-cover border"
          />
          <div className="flex-1">
            <span className="font-medium">{sub.title}</span>
            {sub.description && (
              <p className="text-xs text-slate-500 line-clamp-1">
                {sub.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {/* Button to add nested subcategory */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setActiveCategory(sub);
              setManageSubsFor(null); // Close manage subs view
            }}
          >
            Add Sub
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setEditing(sub);
              setManageSubsFor(null); // Close manage subs view
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteSubCategory(sub.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Render nested subcategories recursively */}
      {sub.subCategories && sub.subCategories.length > 0 && (
        <div className="space-y-2">
          {sub.subCategories.map((nestedSub) => (
            <SubCategoryItem
              key={nestedSub.id}
              sub={nestedSub}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        else setOpen(true);
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {manageSubsFor
              ? `Sub Categories – ${manageSubsFor.title}`
              : editing && "parentId" in editing
              ? "Edit Sub Category"
              : editing
              ? "Edit Category"
              : activeCategory
              ? `Add Sub Category to ${activeCategory.title}`
              : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        {manageSubsFor ? (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Add New Sub Category</h3>
              <CategoryForm
                parentId={manageSubsFor.id}
                action={(data) => {
                  addSubCategory({ ...data, parentId: manageSubsFor.id });
                  // Don't close, but we need to refresh manageSubsFor
                  // The parent component needs to handle this
                }}
                cancelEdit={() => {
                  setOpen(false);
                  setManageSubsFor(null);
                }}
              />
            </div>
          </div>
        ) : (
          <CategoryForm
            parentId={activeCategory?.id}
            editing={editing}
            action={(data) => {
              // Handle subcategory edit (works at any nesting level now)
              if (editing && "parentId" in editing && editing.parentId) {
                updateSubCategory(editing.id, data);
              }
              // Handle category edit
              else if (editing) {
                updateCategory((editing as Category).id, data);
              }
              // Handle adding subcategory (to category or subcategory)
              else if (activeCategory) {
                addSubCategory({ ...data, parentId: activeCategory.id });
              }
              // Handle adding new category
              else {
                addCategory(data);
              }
              setOpen(false);
              setEditing(null);
              setActiveCategory(null);
            }}
            cancelEdit={() => {
              setOpen(false);
              setEditing(null);
              setActiveCategory(null);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
