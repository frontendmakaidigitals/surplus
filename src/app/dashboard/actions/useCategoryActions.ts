"use server";
import { revalidatePath } from "next/cache";
const API_URL = "https://ecom-9npd.onrender.com";

/* ---------------- TYPES ---------------- */

export interface Category {
  name: string;
  slug: string;
  thumbnail_url?: string;
  id: number;
  product_count?: number;
  subcategories?: subcategories[];
}
export interface subcategories extends Category {
  parent_id: number;
}
export interface CategoryFormData {
  name: string;
  slug: string;
  parent_id?: number;
  thumbnail?: string;
  subcategories?: subcategories[];
}

/* ---------------- AUTH ---------------- */

function getAuthHeaders() {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

  if (!token) {
    throw new Error("Missing NEXT_PUBLIC_ADMIN_TOKEN");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

/* ---------------- ACTIONS ---------------- */

/** GET ALL CATEGORIES */
export async function getCategoriesAction(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const json = (await res.json()) as ApiResponse | Category[];
  return (Array.isArray(json) ? json : json.data ?? []) as Category[];
}

/** CREATE CATEGORY */
export async function createCategoryAction(formData: FormData) {
  try {
    const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (!token) {
      throw new Error("Missing NEXT_PUBLIC_ADMIN_TOKEN");
    }
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const json = (await res.json()) as ApiResponse;

    if (!res.ok) {
      throw new Error(json.message || "Failed to create category");
    }

    revalidatePath("/dashboard/manage-products/categories");
    return { success: true, data: json.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


export async function updateCategoryAction(categoryId: number, data: FormData) {
  try {
    console.log(data);
    const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: data,
    });

    const json = (await res.json()) as ApiResponse;

    if (!res.ok) {
      throw new Error(json.message || "Failed to update category");
    }

    revalidatePath("/admin/categories");
    return { success: true, data: json.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/** DELETE CATEGORY */
export async function deleteCategoryAction(categoryId: number) {
  try {
    const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const json = (await res.json()) as ApiResponse;
      throw new Error(json.message || "Failed to delete category");
    }

    revalidatePath("/dashboard/manage-products/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/** GET SINGLE CATEGORY */
export async function getCategoryAction(categoryId: number): Promise<Category> {
  const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const json = (await res.json()) as ApiResponse;
  return json.data ?? json;
}

// ✅ Add proper type for the API response
interface ApiResponse {
  status: string;
  endpoint: string;
  data: {
    id: number;
    name: string;
    slug: string;
    parent_id: number;
    thumbnail_url: string;
    product_count: number;
    subcategories?: subcategories[];
  };
  message?: string; // for error responses
}

export async function createSubCategoryAction(formData: FormData) {
  try {
    const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (!token) {
      throw new Error("Missing NEXT_PUBLIC_ADMIN_TOKEN");
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const json = (await res.json()) as ApiResponse;

    if (res.status === 200 || res.status === 201) {
      revalidatePath("/admin/categories");

      return {
        success: true,
        status: json.status,
        endpoint: json.endpoint,
      };
    }

    throw new Error(json.message || `API returned status ${res.status}`);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create subcategory",
    };
  }
}
