"use client";

import React, {
  createContext,
  useContext,
  useState,
  startTransition,
} from "react";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist-action";

export type WishlistItem = {
  product_id: number;
};
type WishlistAction = "added" | "removed";

interface WishlistContextType {
  wishlist: WishlistItem[];
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  toggleWishlist: (productId: number) => Promise<WishlistAction>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

/* ---------------------------------- */
/* Provider                            */
/* ---------------------------------- */

export const WishlistProvider = ({
  children,
  initialWishlist = [],
}: {
  children: React.ReactNode;
  initialWishlist?: WishlistItem[];
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  /* ---------------------------
     Load wishlist on mount
  ---------------------------- */

  /* ---------------------------
     Helpers
  ---------------------------- */
  const isInWishlist = (productId: number) =>
    wishlist.some((item) => item.product_id === productId);

  /* ---------------------------
     Actions (Optimistic)
  ---------------------------- */

  const addToWishlist = async (productId: number) => {
    // Optimistic update
    startTransition(() => {
      setWishlist((prev) => [...prev, { product_id: productId }]);
    });

    try {
      await addToWishlistAction({ product_id: productId });
    } catch (err) {
      // Rollback
      startTransition(() => {
        setWishlist((prev) => prev.filter((p) => p.product_id !== productId));
      });
      throw err;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    const prev = wishlist;

    // Optimistic update
    startTransition(() => {
      setWishlist((prev) => prev.filter((p) => p.product_id !== productId));
    });

    try {
      await removeFromWishlistAction(productId);
    } catch (err) {
      // Rollback
      startTransition(() => setWishlist(prev));
      throw err;
    }
  };

  const toggleWishlist = async (
    productId: number
  ): Promise<"added" | "removed"> => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
      return "removed";
    } else {
      await addToWishlist(productId);
      return "added";
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/* ---------------------------------- */
/* Hook                               */
/* ---------------------------------- */

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
};
