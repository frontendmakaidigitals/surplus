"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      conditions: selectedConditions,
      priceRange: { min: minPrice, max: maxPrice },
      stockStatus: selectedStockStatus,
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSelectedStockStatus([]);
    setMinPrice(0);
    setMaxPrice(10000);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Filter Products
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Refine your search results
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="">
        {/* Categories */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Categories
          </h3>
          <div className="space-y-3">
            {availableCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleSelection(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                  className="w-4 h-4 rounded border-slate-300 text-secondary  cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Condition
          </h3>
          <div className="space-y-3">
            {availableConditions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition)}
                  onChange={() =>
                    toggleSelection(
                      condition,
                      selectedConditions,
                      setSelectedConditions
                    )
                  }
                  className="w-4 h-4 rounded border-slate-300 text-secondary cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {condition}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Price Range
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e: any) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg  "
                />
              </div>
            </div>
            <div className="text-slate-400 mt-6">—</div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e:any) => setMaxPrice(e.target.value)}
                  placeholder="1000"
                  className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Stock Status
          </h3>
          <div className="space-y-3">
            {["In Stock", "Low Stock", "Out of Stock"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedStockStatus.includes(status)}
                  onChange={() =>
                    toggleSelection(
                      status,
                      selectedStockStatus,
                      setSelectedStockStatus
                    )
                  }
                  className="w-4 h-4 rounded border-slate-300 text-secondary  not-visited:ring cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
