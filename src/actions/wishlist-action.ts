"use server";

import { cookies } from "next/headers";

type AddToWishlistPayload = {
  product_id: number;
};

type Response = {
  endpoint: string;
  message: string;
  status: string;
};

export async function addToWishlistAction(
  payload: AddToWishlistPayload
): Promise<Response> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Get auth token from cookies
  const authToken = cookieStore.get("token")?.value;
  try {
    if (!payload.product_id || payload.product_id <= 0) {
      throw new Error("Invalid product ID");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }), // Add this
        },
        credentials: "include",
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorData = data as Response;
      const errorMessage =
        errorData?.message ||
        errorData?.status ||
        `Failed to add to wishlist (${res.status})`;

      throw new Error(errorMessage);
    }

    // Validate response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid response from server");
    }

    return data as Response;
  } catch (error) {
    // Re-throw with meaningful message
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function removeFromWishlistAction(id: number): Promise<Response> {
  const cookieStore = await cookies();

  // Get auth token from cookies
  const authToken = cookieStore.get("token")?.value;
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/wishlist/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }), // Add this
        },
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorData = data as Response;
      const errorMessage =
        errorData?.message ||
        errorData?.status ||
        `Failed to remove from wishlist (${res.status})`;
      throw new Error(errorMessage);
    }

    return data as Response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getWishlistAction(): Promise<any> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Get auth token from cookies
  const authToken = cookieStore.get("token")?.value;
  if (authToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/wishlist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(cookieHeader && { Cookie: cookieHeader }),
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const errorData = data as Response;
        throw new Error(
          errorData?.message || `Failed to fetch wishlist (${res.status})`
        );
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
