import React from "react";
import { Input } from "@/ui/shadcn/input";
import { Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/ui/shadcn/button";
import { ProductFilter } from "./product-filter";
import { ExportDialog } from "./ExportDialog";
import { useProductContext } from "../context/ProductContext";

const Searchbar = () => {
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
  } = useProductContext();
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products by name, SKU, or category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ProductFilter
          onApplyFilters={setActiveFilters}
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
      </div>
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
  );
};

export default Searchbar;
