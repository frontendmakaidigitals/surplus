"use client";
import { toast } from "sonner";
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
  const handleDeleteProduct = async (id: number) => {
    const result = await deleteProductAction(id);
    if (!result.success) {
      toast.error(result.message, {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
      });
      return;
    }

    toast.success(result.message, {
      className:
        "!bg-green-600/80 backdrop-blur-xl !text-slate-50 border !border-green-400/60",
    });
    setConfirmOpen(false);
    router.refresh();
  };

  const toggleActive = async (value: boolean, id: number) => {
    setIsActive(value);
    const result = await toggleActiveAction({
      productId: id,
      value,
    });
    if (!result.success) {
      toast.error(result.message, {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
      });
      return;
    }

    toast.success(result.message, {
      className:
        "!bg-green-600/80 backdrop-blur-xl !text-slate-50 border !border-green-400/60",
    });
    router.refresh();
  };

  const toggleFeature = async (value: boolean, id: number) => {
    setIsFeatured(value);
    const result = await toggleFeaturedAction({
      productId: id,
      value,
    });
    if (!result.success) {
      toast.error(result.message, {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
      });
      return;
    }

    toast.success(result.message, {
      className:
        "!bg-green-600/80 backdrop-blur-xl !text-slate-50 border !border-green-400/60",
    });
    router.refresh();
  };

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
          <DropdownMenuItem
            className="flex justify-between"
            onSelect={(e) => e.preventDefault()}
          >
            <Label>Active</Label>
            <Switch
              checked={isActive}
              onCheckedChange={(value) => toggleActive(value, id)}
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
              onCheckedChange={(value) => toggleFeature(value, id)}
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
              onClick={() => {
                handleDeleteProduct(id);
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
