"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";

type CategoryCardProps = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  onManageSub: () => void;
};

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  onManageSub,
}: CategoryCardProps) {
  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <div className="relative h-44">
        <span className="absolute top-2 left-2 text-xs bg-secondary text-white px-2 py-1 rounded">
          {category.product_count || 0} Products
        </span>

        {category.subcategories && category.subcategories.length > 0 && (
          <span className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
            {category.subcategories.length} Sub Categories
          </span>
        )}

        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${category.thumbnail_url}`}
          alt={category.name}
          className="w-full h-full object-contain border-b"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{category.name}</h3>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={onManageSub}>
            Manage Sub Categories
          </Button>
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
