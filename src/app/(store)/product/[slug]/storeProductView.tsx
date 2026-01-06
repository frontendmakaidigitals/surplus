"use client";

import { useEffect } from "react";

export function StoreProductView({ productId }: { productId: number }) {
  useEffect(() => {
    const key = "recently_viewed_products";

    try {
      const raw = localStorage.getItem(key);

      const existing: number[] = Array.isArray(raw ? JSON.parse(raw) : [])
        ? (JSON.parse(raw ?? "[]") as number[])
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
