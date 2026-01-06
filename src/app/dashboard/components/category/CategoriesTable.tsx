import { motion, AnimatePresence } from "framer-motion";
import { Table } from "../Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Category, subcategories } from "@/lib/types";

interface Props {
  data: (Category | subcategories)[];
  onSelect: (row: Category | subcategories) => void;
  onEdit: (row: Category | subcategories) => void;
  onDelete: (id: number, parentId?: number) => void;
  onAddSubs: (row: Category | subcategories) => void;
  animate?: boolean;
}

export function CategoriesTable({
  data,
  onSelect,
  onEdit,
  onDelete,
  onAddSubs,
  animate = false,
}: Props) {
  function hasSubCategories(row: Category | subcategories): boolean {
    return row.subcategories ? row.subcategories.length > 0 : false;
  }
  const columns = [
    {
      label: "Image",
      render: (row: Category | subcategories) => (
        <div className="w-20 aspect-square rounded border overflow-hidden">
          <img
            src={`${
              process.env.NEXT_PUBLIC_SERVER_URL + "/" + row.thumbnail_url
            }`}
            className="w-full h-full"
            alt={row.name}
          />
        </div>
      ),
    },
    {
      label: "Name",
      render: (row: Category | subcategories) => (
        <div className="flex items-center gap-2">
          <span className="text-black">{row.name}</span>
        </div>
      ),
    },
    {
      label: "Subcategory",
      render: (row: Category | subcategories) => (
        <div>{row.subcategories?.length || 0}</div>
      ),
    },
    {
      label: "Products",
      render: (row: Category | subcategories) => <div>{row.product_count}</div>,
    },
    {
      label: "Actions",
      render: (row: Category | subcategories) => {
        const isSub = "parent_id" in row;
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddSubs(row);
                  }}
                >
                  Add Sub-Category
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 hover:!bg-red-500 hover:text-red-50"
                  onClick={() =>
                    isSub ? onDelete(row.id, row.parent_id!) : onDelete(row.id)
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
