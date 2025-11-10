"use client";
import { UserIcon } from "lucide-react";
import { CartIcon } from "@/components/cart-icon";
import { NavMenu } from "@/ui/nav/nav-menu";
import { SearchNav } from "@/ui/nav/search-nav";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { NavMobileMenu } from "@/ui/nav/nav-mobile-menu.client";
import Logo from "@/ui/Logo";
export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { isCartOpen } = useCart();
  const links = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Product Categories", href: "/categories" },
    { label: "Guarantee & Refunds", href: "/gurantees-and-refunds" },
    { label: "Shipping options", href: "/shipment-overview" },
    { label: "Resources", href: "/resources" },
    { label: "Sell your surplus", href: "/sell-your-surplus" },
    { label: "Contact Us", href: "/contact" },
  ];
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
            <NavMenu links={links} />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <SearchNav open={open} setOpen={setOpen} />
            <CartIcon />
            <Link href="/login" className="hidden lg:block">
              <UserIcon className="h-5 w-5 hover:text-neutral-500" />
            </Link>
            <div className="sm:hidden flex items-center gap-3">
              <NavMobileMenu>
                <ul className="flex pb-8 flex-col items-start justify-center gap-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group font-[400] inline-flex h-9 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavMobileMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
