"use client";

import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-provider";

export function ClientProviders({
  children,
  initialAuth,
  initialCart,
}: {
  children: React.ReactNode;
  initialAuth: any;
  initialCart: any[];
}) {
  return (
    <AuthProvider initialAuth={initialAuth}>
      <CartProvider initialCart={initialCart}>{children}</CartProvider>
    </AuthProvider>
  );
}
