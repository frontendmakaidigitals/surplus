import { motion, AnimatePresence } from "framer-motion";
import { Table } from "../Table";
import type { Category, SubCategory } from "../../../../../data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type Props = {
  data: (Category | SubCategory)[];
  onSelect: (row: Category | SubCategory) => void; // Changed to accept SubCategory too
  onEdit: (row: Category | SubCategory) => void;
  onDelete: (id: string, parentId?: string) => void;
  onAddSubs: (cat: Category | SubCategory) => void; // Changed to accept SubCategory too
  animate?: boolean;
};

export function CategoriesTable({
  data,
  onSelect,
  onEdit,
  onDelete,
  onAddSubs,
  animate = false,
}: Props) {
  function hasSubCategories(row: Category | SubCategory): boolean {
    return row.subCategories ? row.subCategories.length > 0 : false;
  }

  const columns = [
    {
      label: "Image",
      render: (row: Category | SubCategory) => (
        <div className="w-20 aspect-square rounded border overflow-hidden">
          <img src={row.img} className="w-full h-full" alt={row.title} />
        </div>
      ),
    },
    {
      label: "Name",
      render: (row: Category | SubCategory) => (
        <div className="flex items-center gap-2">
          <span className="text-black">{row.title}</span>
          {hasSubCategories(row) && (
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {row.subCategories!.length} sub
              {row.subCategories!.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      ),
    },
    {
      label: "Actions",
      render: (row: Category | SubCategory) => {
        const isSub = "parentId" in row;
        return (
          <div className="flex justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Ellipsis />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem
                  className="py-2"
                  onClick={() => onAddSubs(row)}
                >
                  Add Sub-Category
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2" onClick={() => onEdit(row)}>
                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 hover:!bg-red-500 hover:text-red-50"
                  onClick={() =>
                    isSub ? onDelete(row.id, row.parentId!) : onDelete(row.id)
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (!animate) {
    return (
      <Table
        columns={columns}
        data={data}
        onRowClick={(row) => {
          if (!hasSubCategories(row)) return;
          onSelect(row);
        }}
        getRowClassName={(row) => {
          return hasSubCategories(row)
            ? "cursor-pointer hover:bg-slate-50"
            : "cursor-default";
        }}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="subcategories"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -80, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Table
          columns={columns}
          data={data}
          onRowClick={(row) => {
            if (!hasSubCategories(row)) return;
            onSelect(row);
          }}
          getRowClassName={(row) => {
            return hasSubCategories(row)
              ? "cursor-pointer hover:bg-slate-50"
              : "cursor-default";
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
