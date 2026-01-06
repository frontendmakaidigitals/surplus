"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import type { ProductFilters } from "../components/product/product-filter";
import { getCategoriesAction } from "../actions/useCategoryActions";
import { Product } from "@/lib/types";

type PaginatedProductsResponse = {
  data: {
    content: Product[];
    page: number;
    size: number;
    number_of_elements: number;
    total_pages: number;
    first: boolean;
    last: boolean;
  };
};

const PAGE_SIZE = 20;

interface ProductContextType {
  products: Product[];

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  activeFilters: ProductFilters;
  setActiveFilters: (f: ProductFilters) => void;

  filteredProducts: Product[];
  availableCategories: string[];
  availableConditions: string[];

  selectedProducts: number[];
  setSelectedProducts: (ids: number[]) => void;

  isAllSelected: boolean;
  isSomeSelected: boolean;
  handleSelectProduct: (id: number, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;

  selectedProductObjects: Product[];

  showDeleteDialog: boolean;
  setShowDeleteDialog: (v: boolean) => void;

  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
  error: string | null;
  productCount: number;
  handleBulkDelete: () => void;

  categoryCount: number;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return ctx;
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<ProductFilters>({
    categories: [],
    conditions: [],
    priceRange: { min: 0, max: 10000 },
    stockStatus: [],
  });

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [productCount, setProductCount] = useState(0);

  const [categoryCount, setCategoryCount] = useState(0);
  // ------------------------------------------------
  // Fetch categories once
  // ------------------------------------------------

  const countCategories = (categories: any[]): number => {
    return categories.reduce((total, category) => {
      let count = 1;

      // If category has subcategories, recursively count them
      if (
        category.subcategories &&
        Array.isArray(category.subcategories) &&
        category.subcategories.length > 0
      ) {
        count += countCategories(category.subcategories);
      }

      return total + count;
    }, 0);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAction();
        const names = res.map((c: any) => c.name);
        setAvailableCategories(names);
        const total = countCategories(res);
        setCategoryCount(total);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  // ------------------------------------------------
  // Fetch products with search and filters
  // ------------------------------------------------
  const getProductById = (id: number): Product | undefined => {
    return products.find((p) => p.id === id);
  };
  const fetchProducts = useCallback(
    async (pageNumber: number, search: string, filters: ProductFilters) => {
      setLoading(true);
      setError(null);

      try {
        const params: any = {
          page: pageNumber,
          size: PAGE_SIZE,
          sort_by: "created_at",
          sort_dir: "desc",
        };

        if (search) {
          params.q = search;
        }

        // Add filters
        if (filters) {
          // Brand filter (categories mapped to brands)
          if (filters.categories.length > 0) {
            params.brand = filters.categories[0]; // API supports single brand
          }

          // Condition filter
          if (filters.conditions.length > 0) {
            params.condition = filters.conditions[0]; // API supports single condition
          }

          // Price range
          if (filters.priceRange && filters.priceRange.min > 0) {
            params.min_price = filters.priceRange.min;
          }
          if (filters.priceRange && filters.priceRange.max < 10000) {
            params.max_price = filters.priceRange.max;
          }

          // Stock status
          if (filters.stockStatus && filters.stockStatus.includes("In Stock")) {
            params.in_stock = true;
          }
        }

        const res = await axios.get<PaginatedProductsResponse>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/search`,
          {
            params,
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
            },
          }
        );
        setProducts(res.data.data.content ?? []);
        setTotalPages(res.data.data.total_pages ?? 1);
        setProductCount(res.data.data.number_of_elements ?? 0);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ------------------------------------------------
  // Fetch on mount and when dependencies change
  // ------------------------------------------------
  useEffect(() => {
    fetchProducts(page, searchQuery, activeFilters);
  }, [page, searchQuery, activeFilters, fetchProducts]);

  // ------------------------------------------------
  // Conditions derived from products
  // ------------------------------------------------
  const availableConditions = useMemo(() => ["New", "Used", "Refurbished"], []);

  const filteredProducts = products;

  const handleSelectProduct = useCallback((id: number, checked: boolean) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedProducts(filteredProducts.map((p) => p.id));
      } else {
        setSelectedProducts([]);
      }
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
  const handleBulkDelete = useCallback(async () => {
    if (!selectedProducts.length) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/bulk-delete`,
        { ids: selectedProducts },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          },
        }
      );

      // Refetch current page after deletion
      await fetchProducts(page, searchQuery, activeFilters);

      setSelectedProducts([]);
      setShowDeleteDialog(false);
    } catch (e) {
      console.error(e);
      setError("Failed to delete products. Please try again.");
    }
  }, [selectedProducts, page, searchQuery, activeFilters, fetchProducts]);

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
        page,
        setPage,
        totalPages,
        loading,
        error,
        handleBulkDelete,
        productCount,
        categoryCount,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
