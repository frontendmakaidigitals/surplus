"use client";
import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/ui/footer/footer";
import { Nav } from "@/ui/nav/nav";
import { WishlistProvider } from "@/context/wishlist-context";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <TooltipProvider>
        <WishlistProvider>
          <main className="pt-2">{children}</main>{" "}
        </WishlistProvider>
        <Footer />
      </TooltipProvider>
    </>
  );
}
