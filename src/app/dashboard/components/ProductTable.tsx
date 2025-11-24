import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ConditionBadge } from "@/ui/condition-colors";
import { Button } from "@/ui/shadcn/button";
import { Eye, Edit, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductContext } from "../context/ProductContext";

const ProductTable = () => {
  const {
    isAllSelected,
    selectedProducts,
    handleSelectAll,
    filteredProducts,
    isSomeSelected,
    handleSelectProduct,
  } = useProductContext();
  return (
    <Table>
      <TableCaption>
        {filteredProducts.length === 0
          ? "No products found"
          : `Showing ${filteredProducts.length} of ${filteredProducts.length} products`}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              aria-label="Select all"
              className={
                isSomeSelected ? "data-[state=checked]:bg-gray-400" : ""
              }
            />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
              No products found matching your search
            </TableCell>
          </TableRow>
        ) : (
          filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(product.id, checked as boolean)
                  }
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>
                  <div className="max-w-xs">
                    <div className="font-medium truncate">{product.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{"--"}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="font-medium">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <ConditionBadge condition={product.condition} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
