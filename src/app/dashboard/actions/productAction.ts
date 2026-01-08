"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
type TogglePayload = {
  productId: number;
  value: boolean;
};
export async function toggleDiscountAction({
  productId,
  value,
}: TogglePayload) {
  await fetch(`${process.env.API_URL}/products/${productId}/discount`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ discounted: value }),
    credentials: "include",
  });

  revalidatePath("/dashboard/products");
}
type ActionResult = {
  success: boolean;
  message: string;
};

export async function toggleActiveAction({
  productId,
  value,
}: TogglePayload): Promise<ActionResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const formData = new FormData();
  formData.append("active", String(value));

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
        credentials: "include",
        cache: "no-store",
      }
    );

    const raw = await res.text();
    let message = "Failed to Activate product";

    if (!res.ok && raw) {
      try {
        const parsed = JSON.parse(raw) as { message?: string };
        message = parsed.message ?? message;
      } catch {
        message = raw;
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message,
      };
    }

    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: "Product activated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating the product",
    };
  }
}

export async function toggleFeaturedAction({
  productId,
  value,
}: TogglePayload) {
  const cookie = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}/featured`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("admin_token")}`,
        },
        body: JSON.stringify({ is_featured: value }),
        credentials: "include",
      }
    );
    const raw = await res.text();
    let message = "Failed to update product status";

    if (!res.ok && raw) {
      try {
        const parsed = JSON.parse(raw) as { message?: string };
        message = parsed.message ?? message;
      } catch {
        message = raw;
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message,
      };
    }

    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: "Product added to featured successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating the product",
    };
  }
}

export async function deleteProductAction(
  productId: number
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        cache: "no-store",
      }
    );
    const raw = await res.text();

    // Extract message safely
    let message = "Failed to delete product";
    try {
      const parsed = JSON.parse(raw) as { message?: string };
      message = parsed.message ?? message;
    } catch {
      if (raw) message = raw;
    }

    if (!res.ok) {
      return {
        success: false,
        message,
      };
    }
    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: message || "Product deleted successfully",
    };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the product",
    };
  }
}
