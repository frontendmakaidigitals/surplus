"use server";

import { getCartId, setCartId, clearCartId } from "@/lib/cart-cookies";

export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

/**
 * Get the cart from cookies (simple in-memory or cookie-based storage)
 */
export async function getCartAction(): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;

  // Example: Fetch cart from server-side database if needed
  // For demo, we use a placeholder
  const storedCart = await fetchCartFromStorage(cartId);
  return storedCart;
}

/**
 * Add an item to the cart
 */
export async function addToCartAction(
  variantId: string,
  quantity = 1
): Promise<Cart> {
  let cartId = await getCartId();
  let cart: Cart | null = null;

  if (cartId) {
    cart = await fetchCartFromStorage(cartId);
  }

  if (!cart) {
    cartId = crypto.randomUUID(); // create a new cart ID
    cart = { id: cartId, items: [] };
    await setCartId(cartId);
  }

  const existingItem = cart.items.find((item) => item.variantId === variantId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ variantId, quantity });
  }

  await saveCartToStorage(cart);
  return cart;
}

/**
 * Update quantity of an item in the cart
 */
export async function updateCartItemAction(
  variantId: string,
  quantity: number
): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;

  const cart = await fetchCartFromStorage(cartId);
  if (!cart) return null;

  const item = cart.items.find((i) => i.variantId === variantId);
  if (item) item.quantity = quantity;

  await saveCartToStorage(cart);
  return cart;
}

/**
 * Remove an item from the cart
 */
export async function removeFromCartAction(
  variantId: string
): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;

  const cart = await fetchCartFromStorage(cartId);
  if (!cart) return null;

  cart.items = cart.items.filter((i) => i.variantId !== variantId);

  await saveCartToStorage(cart);
  return cart;
}

/**
 * Clear the cart completely
 */
export async function clearCartAction(): Promise<void> {
  const cartId = await getCartId();
  if (!cartId) return;

  await removeCartFromStorage(cartId);
  await clearCartId();
}

/**
 * Get total item count
 */
export async function getCartItemCount(): Promise<number> {
  const cart = await getCartAction();
  return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
}

/* ----------------------
   Mock storage functions
-------------------------*/

// These can be replaced with your database or in-memory store
const cartStorage: Record<string, Cart> = {};

async function fetchCartFromStorage(cartId: string): Promise<Cart | null> {
  return cartStorage[cartId] || null;
}

async function saveCartToStorage(cart: Cart) {
  cartStorage[cart.id] = cart;
}

async function removeCartFromStorage(cartId: string) {
  delete cartStorage[cartId];
}
