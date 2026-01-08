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

  // No auth → empty cart
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

    const raw = await res.text();

    // Backend error → empty cart
    if (!res.ok) {
      console.error("Get cart failed:", raw);
      return {
        data: createEmptyCart(),
      };
    }

    // Safe JSON parse
    try {
      return JSON.parse(raw) as CartResponse;
    } catch (parseError) {
      console.error("Cart JSON parse error:", parseError, raw);
      return {
        data: createEmptyCart(),
      };
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      data: createEmptyCart(),
    };
  }
}

/** ADD ITEM */
export type ActionResult<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};
export async function addToCartAction(
  productId: number,
  quantity: number
): Promise<ActionResult<Cart>> {
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

  const raw = await res.text();
  let message = "Failed to add cart item";

  try {
    const parsed = JSON.parse(raw) as { message: string };
    message = parsed.message || message;
  } catch {
    if (raw) message = raw;
  }

  if (!res.ok) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    message: "Item removed from cart",
    data: raw ? (JSON.parse(raw) as Cart) : undefined,
  };
}

export async function updateCartItemAction(
  cartItemId: number,
  quantity: number
): Promise<ActionResult<Cart>> {
  await ensureSession();

  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart/items/${cartItemId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ quantity: Number(quantity) }),
    cache: "no-store",
  });
  const raw = await res.text();
  let message = "Failed to update cart item";
  try {
    const parsed = JSON.parse(raw) as { message: string };
    message = parsed.message || message;
  } catch {
    if (raw) message = raw;
  }

  if (!res.ok) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    message: "Item removed from cart",
    data: raw ? (JSON.parse(raw) as Cart) : undefined,
  };
}

export async function removeCartItemAction(
  cartItemId: number
): Promise<ActionResult<Cart>> {
  await ensureSession();

  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart/items/${Number(cartItemId)}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });

  const raw = await res.text();
  let message = "Failed to remove cart item";
  try {
    const parsed = JSON.parse(raw) as { message: string };
    message = parsed.message || message;
  } catch {
    if (raw) message = raw;
  }

  if (!res.ok) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    message: "Item removed from cart",
    data: raw ? (JSON.parse(raw) as Cart) : undefined,
  };
}

/** CLEAR CART */
type ClearCartResult = {
  success: boolean;
  message: string;
};
export async function clearCartAction(): Promise<ClearCartResult> {
  const { headers } = await getAuthHeaders();
  const res = await fetch(`${API_URL}/api/cart`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });

  const raw = await res.text();
  let message = "Failed to remove cart item";
  try {
    const parsed = JSON.parse(raw) as { message: string };
    message = parsed.message || message;
  } catch {
    if (raw) message = raw;
  }

  if (!res.ok) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    message: "Cart cleared successfully",
  };
}
