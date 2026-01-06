'use client'
import React, { useState } from "react";
import { Input } from "@/ui/shadcn/input";
import { Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/ui/shadcn/button";
import { ProductFilter, ProductFilters } from "./product/product-filter";
import { ExportDialog } from "./product/ExportDialog";
import { useProductContext } from "../context/ProductContext";
import ViewToggle from "./View-Toggle";

const Searchbar = () => {
  const [view, setView] = useState<"table" | "card">("table");
  const {
    searchQuery,
    setSearchQuery,
    selectedProducts,
    setActiveFilters,
    availableCategories,
    availableConditions,
    filteredProducts,
    selectedProductObjects,
    setShowDeleteDialog,
    setPage, // Add this to reset page on filter/search
  } = useProductContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleApplyFilters = (filters: ProductFilters) => {
    setActiveFilters(filters);
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products by name, SKU, brand, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ProductFilter
          onApplyFilters={handleApplyFilters}
          availableCategories={availableCategories}
          availableConditions={availableConditions}
        />
        <Button
          variant="outline"
          className="gap-2 hover:text-primary-foreground"
        >
          <Upload className="w-4 h-4" />
          Import
        </Button>
        <ExportDialog
          products={filteredProducts}
          selectedProducts={selectedProductObjects}
        />
        <Button
          variant="destructive"
          className="gap-2"
          disabled={selectedProducts.length < 2}
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4" />
          Bulk Delete{" "}
          {selectedProducts.length > 1 ? `(${selectedProducts.length})` : null}
        </Button>
      </div>

      <ViewToggle view={view} onChange={setView} />
    </div>
  );
};

export default Searchbar;
