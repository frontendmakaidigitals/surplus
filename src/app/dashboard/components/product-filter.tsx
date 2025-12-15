"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/ui/shadcn/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

export interface ProductFilters {
  categories: string[];
  conditions: string[];
  priceRange: { min: number; max: number };
  stockStatus: string[];
}

interface ProductFilterProps {
  onApplyFilters: (filters: ProductFilters) => void;
  availableCategories: string[];
  availableConditions: string[];
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  onApplyFilters,
  availableCategories,
  availableConditions,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleStockStatusToggle = (status: string) => {
    setSelectedStockStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      conditions: selectedConditions,
      priceRange: { min: minPrice, max: maxPrice },
      stockStatus: selectedStockStatus,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSelectedStockStatus([]);
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedConditions.length +
    selectedStockStatus.length +
    (minPrice > 0 || maxPrice < 10000 ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 hover:text-primary-foreground relative"
        >
          <Filter className="w-4 h-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Apply filters to narrow down your product list
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Categories Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Categories</Label>
            <div className="space-y-2 mt-1">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Condition</Label>
            <div className="space-y-2 mt-1">
              {availableConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition}`}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => handleConditionToggle(condition)}
                  />
                  <label
                    htmlFor={`condition-${condition}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Price Range</Label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-xs text-gray-600">
                  Min
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <span className="text-gray-500 mt-6">—</span>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-xs text-gray-600">
                  Max
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Stock Status Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Stock Status</Label>
            <div className="space-y-2 mt-1">
              {["In Stock", "Low Stock", "Out of Stock"].map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`stock-${status}`}
                    checked={selectedStockStatus.includes(status)}
                    onCheckedChange={() => handleStockStatusToggle(status)}
                  />
                  <label
                    htmlFor={`stock-${status}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 hover:text-primary-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
