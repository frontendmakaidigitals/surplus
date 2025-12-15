import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { publicUrl } from "@/env.mjs";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Your Next Store",
  description: "Delightful commerce for everyone.",
  metadataBase: new URL(publicUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white">
        <div className="flex min-h-full flex-1 flex-col" vaul-drawer-wrapper="">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>

        <Toaster position="top-right" offset={10} />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
