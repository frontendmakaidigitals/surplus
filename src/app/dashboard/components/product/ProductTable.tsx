import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ConditionBadge } from "@/ui/condition-colors";
import ProductAction from "./Product-action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductContext } from "../../context/ProductContext";

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
        {filteredProducts.length > 0 &&
          `Showing ${filteredProducts.length} of ${filteredProducts.length} products`}
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
                  <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <img
                      src={
                        product.images?.length
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${product.images[0]}`
                          : "/placeholder.png"
                      }
                      className="w-full h-full object-contain"
                      alt={product.name}
                    />
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
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell>
                <ConditionBadge condition={product.condition} />
              </TableCell>
              <TableCell className="text-right">
                <ProductAction
                  id={product.id}
                  active={product.is_active}
                  featured={product.is_featured}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
