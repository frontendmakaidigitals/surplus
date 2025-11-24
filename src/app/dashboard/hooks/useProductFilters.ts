"use client";
import { useState, useMemo, useCallback } from "react";
import type { Product } from "../../../../data";

interface PriceRange {
  min: number;
  max: number;
}

interface StockThresholds {
  LOW_STOCK: number;
  OUT_OF_STOCK: number;
}

interface ActiveFilters {
  categories: string[];
  conditions: string[];
  priceRange: PriceRange;
  stockStatus: string[];
}

export function useProductFilters(
  products: Product[],
  defaultPriceRange: PriceRange,
  STOCK_THRESHOLDS: StockThresholds
) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    conditions: [],
    priceRange: defaultPriceRange,
    stockStatus: [],
  });

  // Memoized dropdown options
  const availableCategories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const availableConditions = useMemo(
    () => [...new Set(products.map((p) => p.condition))],
    [products]
  );

  // Filtering
  const filteredProducts = useMemo(() => {
    let list = products;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeFilters.categories.length)
      list = list.filter((p) => activeFilters.categories.includes(p.category));

    if (activeFilters.conditions.length)
      list = list.filter((p) => activeFilters.conditions.includes(p.condition));

    const { min, max } = activeFilters.priceRange;
    if (min !== defaultPriceRange.min || max !== defaultPriceRange.max)
      list = list.filter((p) => p.price >= min && p.price <= max);

    if (activeFilters.stockStatus.length)
      list = list.filter((p) => {
        const s = activeFilters.stockStatus;
        const stock = p.stock;

        return (
          (s.includes("In Stock") && stock > STOCK_THRESHOLDS.LOW_STOCK) ||
          (s.includes("Low Stock") &&
            stock > STOCK_THRESHOLDS.OUT_OF_STOCK &&
            stock <= STOCK_THRESHOLDS.LOW_STOCK) ||
          (s.includes("Out of Stock") &&
            stock === STOCK_THRESHOLDS.OUT_OF_STOCK)
        );
      });

    return list;
  }, [products, searchQuery, activeFilters]);

  // Selection
  const handleSelectAll = useCallback(
    (checked: boolean) =>
      setSelectedProducts(checked ? filteredProducts.map((p) => p.id) : []),
    [filteredProducts]
  );

  const handleSelectProduct = useCallback((id: string, checked: boolean) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  }, []);

  const selectedProductObjects = useMemo(
    () => products.filter((p) => selectedProducts.includes(p.id)),
    [products, selectedProducts]
  );

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    selectedProducts,
    setSelectedProducts,
    showDeleteDialog,
    setShowDeleteDialog,

    filteredProducts,
    availableCategories,
    availableConditions,
    selectedProductObjects,

    handleSelectAll,
    handleSelectProduct,
  };
}
