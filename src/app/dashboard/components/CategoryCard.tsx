"use client";
import { Button } from "@/components/ui/button";
export type Category = {
  id?: string;
  name?: string;
  title?: string;
  image?: string;
  img?: string;
  description?: string;
  count?: number;
};
type CategoryCardProps = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
};
export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="rounded-xl border border-slate-300/40 overflow-hidden bg-white ">
      <div className="relative h-44 w-full">
        <p className="absolute font-semibold top-2 rounded-lg left-2 bg-secondary/50 backdrop-blur-md text-xs text-slate-50 px-3 py-[.4rem] ">
          {category.count || 12} Products
        </p>
        <img
          src={category.image || category.img}
          className="w-full h-full object-contain rounded-md border"
          alt={category.name}
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="">
          <h3 className="font-semibold text-lg">
            {category.name || category.title}
          </h3>
          <p className="text-slate-500 line-clamp-2">{category.description}</p>
        </div>

        <div className="flex gap-3">
          <Button variant={"outline"} size="sm" onClick={onEdit}>
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
