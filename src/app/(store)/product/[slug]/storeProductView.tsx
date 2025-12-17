"use client";

import { useEffect } from "react";

export function StoreProductView({ productId }: { productId: string }) {
  useEffect(() => {
    const key = "recently_viewed_products";

    try {
      const raw = localStorage.getItem(key);

      const existing: string[] = Array.isArray(raw ? JSON.parse(raw) : [])
        ? (JSON.parse(raw ?? "[]") as string[])
        : [];

      const updated = [
        productId,
        ...existing.filter((id) => id !== productId),
      ].slice(0, 10);

      localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      localStorage.setItem(key, JSON.stringify([productId]));
    }
  }, [productId]);

  return null;
}
