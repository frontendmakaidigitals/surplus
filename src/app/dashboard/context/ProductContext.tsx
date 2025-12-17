"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

import type { ProductFilters } from "../components/product/product-filter";
import type { Product } from "../../../../data";

interface ProductContextType {
  products: Product[];

  // Search + filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  activeFilters: ProductFilters;
  setActiveFilters: (f: ProductFilters) => void;

  filteredProducts: Product[];
  availableCategories: string[];
  availableConditions: string[];

  // Selection logic
  selectedProducts: string[];
  setSelectedProducts: (ids: string[]) => void;

  isAllSelected: boolean;
  isSomeSelected: boolean;
  handleSelectProduct: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;

  selectedProductObjects: Product[];

  // Delete dialog
  showDeleteDialog: boolean;
  setShowDeleteDialog: (v: boolean) => void;

  // Bulk delete
  handleBulkDelete: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProductContext must be used inside ProductProvider");
  return ctx;
};

export const ProductProvider = ({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filters WITHOUT price or stock
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({
    categories: [],
    conditions: [],
    priceRange: undefined as any,
    stockStatus: undefined as any,
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // ------------------------------------------------
  // Available Categories & Conditions
  // ------------------------------------------------
  const availableCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const availableConditions = useMemo(
    () => Array.from(new Set(products.map((p) => p.condition))),
    [products]
  );

  // ------------------------------------------------
  // Filtering Logic (minimal)
  // ------------------------------------------------
  const filteredProducts = useMemo(() => {
    let result = [...products];

    const q = searchQuery.trim().toLowerCase();

    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeFilters.categories.length) {
      result = result.filter((p) =>
        activeFilters.categories.includes(p.category)
      );
    }

    if (activeFilters.conditions.length) {
      result = result.filter((p) =>
        activeFilters.conditions.includes(p.condition)
      );
    }

    return result;
  }, [products, searchQuery, activeFilters]);

  // ------------------------------------------------
  // Selection Logic
  // ------------------------------------------------
  const handleSelectProduct = useCallback((id: string, checked: boolean) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) setSelectedProducts(filteredProducts.map((p) => p.id));
      else setSelectedProducts([]);
    },
    [filteredProducts]
  );

  const isAllSelected =
    filteredProducts.length > 0 &&
    selectedProducts.length === filteredProducts.length;

  const isSomeSelected =
    selectedProducts.length > 0 &&
    selectedProducts.length < filteredProducts.length;

  const selectedProductObjects = useMemo(
    () => products.filter((p) => selectedProducts.includes(p.id)),
    [products, selectedProducts]
  );

  // ------------------------------------------------
  // Bulk Delete
  // ------------------------------------------------
  const handleBulkDelete = useCallback(() => {
    console.log("Deleting:", selectedProducts);

    // TODO: API request
    setSelectedProducts([]);
    setShowDeleteDialog(false);
  }, [selectedProducts]);

  // ------------------------------------------------
  return (
    <ProductContext.Provider
      value={{
        products,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        filteredProducts,
        availableCategories,
        availableConditions,
        selectedProducts,
        setSelectedProducts,
        isAllSelected,
        isSomeSelected,
        handleSelectProduct,
        handleSelectAll,
        selectedProductObjects,
        showDeleteDialog,
        setShowDeleteDialog,
        handleBulkDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
