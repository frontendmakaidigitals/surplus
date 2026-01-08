"use server";

import { cookies } from "next/headers";
import { CartResponse, Cart } from "@/lib/types";

const API_URL = "https://ecom-9npd.onrender.com";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const sessionId = cookieStore.get("cart_session")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (sessionId) {
    headers["X-Session-ID"] = sessionId;
  }

  return { headers, hasAuth: !!(token || sessionId) };
}

// Helper to ensure session exists - only for mutation actions
async function ensureSession() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set("cart_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return sessionId;
}

// Create empty cart helper - matches your Cart interface
function createEmptyCart(): Cart {
  return {
    id: 0,
    items: [],
    subtotal: 0,
    total_items: 0,
    item_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/* ---------------- ACTIONS ---------------- */

/** GET CART - Safe to call from layouts/pages */
export async function getCartAction(): Promise<CartResponse> {
  const { headers, hasAuth } = await getAuthHeaders();

  if (!hasAuth) {
    return {
      data: createEmptyCart(),
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/cart`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        data: createEmptyCart(),
      };
    }

    const text = await res.text();
    return JSON.parse(text) as CartResponse;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      data: createEmptyCart(),
    };
  }
}

/** ADD ITEM */
export async function addToCartAction(
  productId: number,
  quantity: number
): Promise<Cart> {
  // Ensure session exists before adding
  await ensureSession();

  const { headers } = await getAuthHeaders();

  const payload = {
    product_id: Number(productId),
    quantity: Number(quantity),
  };

  const res = await fetch(`${API_URL}/api/cart/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Add cart error:", text);
    throw new Error(`Failed to add item to cart: ${text}`);
  }

  return JSON.parse(text) as Cart;
}

/** UPDATE QUANTITY */
export async function updateCartItemAction(
  cartItemId: number,
  quantity: number
): Promise<Cart> {
  await ensureSession();

  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart/items/${cartItemId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ quantity: Number(quantity) }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update cart item: ${text}`);
  }

  const text = await res.text();
  return JSON.parse(text) as Cart;
}

/** REMOVE ITEM */
export async function removeCartItemAction(cartItemId: number): Promise<Cart> {
  await ensureSession();

  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart/items/${Number(cartItemId)}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to remove cart item: ${text}`);
  }

  const text = await res.text();
  return JSON.parse(text) as Cart;
}

/** CLEAR CART */
export async function clearCartAction(): Promise<void> {
  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to clear cart: ${text}`);
  }
}
