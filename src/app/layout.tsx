import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { publicUrl } from "@/env.mjs";
import Loading from "./loading";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-provider";
import { checkAuthStatus } from "@/lib/checkAuthStatus";
import { getCartAction } from "@/actions/cart-actions";
export const metadata: Metadata = {
  title: "Your Next Store",
  description: "Delightful commerce for everyone.",
  metadataBase: new URL(publicUrl),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await checkAuthStatus();

  const cartResponse = await getCartAction();
  const cartItems = cartResponse.data.items || [];

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white">
        <AuthProvider initialAuth={auth}>
          <CartProvider initialCart={cartItems}>
            <div
              className="flex min-h-full flex-1 flex-col"
              vaul-drawer-wrapper=""
            >
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>

            <Toaster position="top-right" offset={10} />

            <SpeedInsights />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
