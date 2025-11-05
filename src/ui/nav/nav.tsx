"use client";
import { UserIcon } from "lucide-react";
import { CartIcon } from "@/components/cart-icon";
import { NavMenu } from "@/ui/nav/nav-menu";
import { SearchNav } from "@/ui/nav/search-nav";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import Logo from "@/ui/Logo";
export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { isCartOpen } = useCart();

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        open || isCartOpen ? "bg-white" : "backdrop-blur-lg bg-white/60"
      }`}
    >
      {/* Top bar */}
      <div className="bg-blue-500 text-white text-sm py-2">
        <article className="container text-center">
          Create Your Free Account for Preferred Pricing, Extended Warranties, &
          Much More!{" "}
          <Link href="/" className="underline font-medium">
            Learn more
          </Link>
        </article>
      </div>

      {/* Sticky nav bar */}
      <div>
        <div className="container flex items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold whitespace-nowrap">
            <Logo size={120} />
          </Link>

          {/* Menu */}
          <div className="hidden sm:flex flex-1 justify-center">
            <NavMenu />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <SearchNav open={open} setOpen={setOpen} />
            <CartIcon isCartOpen={isCartOpen} />
            <Link href="/login">
              <UserIcon className="h-5 w-5 hover:text-neutral-500" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
