"use client";

import React from "react";
import { Button } from "@/ui/shadcn/button";
import { Edit, MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/ui/shadcn/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  toggleActiveAction,
  toggleFeaturedAction,
  deleteProductAction,
} from "../../actions/productAction";

const ProductAction = ({
  id,
  active,
  featured,
}: {
  id: number;
  active: boolean;
  featured: boolean;
}) => {
  const [isActive, setIsActive] = React.useState(active);
  const [isFeatured, setIsFeatured] = React.useState(featured);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const router = useRouter();
  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/dashboard/manage-products/products/edit?id=${id}`}>
        <Edit className="w-4 h-4" />
      </Link>

      {/* Dropdown */}
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          {/* Active */}
          <DropdownMenuItem
            className="flex justify-between"
            onSelect={(e) => e.preventDefault()}
          >
            <Label>Active</Label>
            <Switch
              checked={isActive}
              onCheckedChange={async (value) => {
                setIsActive(value);
                await toggleActiveAction({
                  productId: id,
                  value,
                });
              }}
            />
          </DropdownMenuItem>

          {/* Featured */}
          <DropdownMenuItem
            className="flex justify-between"
            onSelect={(e) => e.preventDefault()}
          >
            <Label>Featured</Label>
            <Switch
              checked={isFeatured}
              onCheckedChange={async (value) => {
                setIsFeatured(value);
                await toggleFeaturedAction({
                  productId: id,
                  value,
                });
              }}
            />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => {
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alert Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await deleteProductAction(id);
                setConfirmOpen(false);
                router.refresh();
              }}
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductAction;
