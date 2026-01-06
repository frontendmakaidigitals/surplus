"use server";

import { cookies } from "next/headers";

const API_URL = "https://ecom-9npd.onrender.com";

/* ---------------- TYPES ---------------- */

export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  image_url: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  total_items: number;
  item_count: number;
  created_at: string;
  updated_at: string;
}

/* ---------------- HELPERS ---------------- */

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let sessionId = cookieStore.get("cart_session")?.value;

  if (!token && !sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set("cart_session", sessionId, {
      httpOnly: true,
      path: "/",
      secure: false,
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    headers["X-Session-ID"] = sessionId!;
  }

  return headers;
}

/* ---------------- ACTIONS ---------------- */
/** GET CART */
export async function getCartAction(): Promise<Cart> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/api/cart`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  const text = await res.text();
  return JSON.parse(text) as Cart;
}

/** ADD ITEM */
export async function addToCartAction(
  productId: number,
  quantity: number
): Promise<Cart> {
  // Ensure they're numbers (Next.js might serialize them)
  const cleanProductId = Number(productId);
  const cleanQuantity = Number(quantity);

  const headers = await getAuthHeaders();

  const payload = {
    product_id: cleanProductId,
    quantity: cleanQuantity,
  };

  console.log("Sending to API:", payload);

  const res = await fetch(`${API_URL}/api/cart/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();
  console.log("API Response:", text);

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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
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
