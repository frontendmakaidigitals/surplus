"use server";

import { revalidatePath } from "next/cache";

type TogglePayload = {
  productId: number;
  value: boolean;
};
const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
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

export async function toggleActiveAction({ productId, value }: TogglePayload) {
  const formData = new FormData();
  formData.append("active", value.toString()); // convert boolean to string if needed

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // don't set Content-Type, browser handles it
      },
      body: formData,
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  revalidatePath("/dashboard/products");
}

export async function toggleFeaturedAction({
  productId,
  value,
}: TogglePayload) {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}/featured`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_featured: value }),
      credentials: "include",
    }
  );

  revalidatePath("/dashboard/products");
}

export async function deleteProductAction(productId: number) {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/dashboard/products");
}
