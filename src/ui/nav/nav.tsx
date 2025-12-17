"use client";

import { CartIcon } from "@/components/cart-icon";
import { NavMenu } from "@/ui/nav/nav-menu";
import { SearchNav } from "./search-nav";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { NavMobileMenu } from "@/ui/nav/nav-mobile-menu.client";
import Logo from "@/ui/Logo";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";
import UserMenu from "./user-menu";
import { toast } from "sonner";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}
export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isCartOpen } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();

  const links = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Product Categories", href: "/categories" },
    { label: "Guarantee & Refunds", href: "/gurantees-and-refunds" },
    { label: "Shipping options", href: "/shipment-overview" },
    { label: "Sell your surplus", href: "/sell-your-surplus" },
    { label: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/profile");
        if (response.data && response.data.data) {
          const userData = response.data.data;
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error: any) {
        // Silently handle auth errors - 401 just means not logged in
        if (error.response?.status === 401) {
          setIsLoggedIn(false);
        } else {
          console.error("Unexpected error checking auth status:", error);
          setIsLoggedIn(false);
        }
      } finally {
      }
    };

    checkAuthStatus();
  }, [pathname]);

  const logout = async () => {
    try {
      await axios.post("/api/logout");
      toast.success("Logged out successfully!", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        open || isCartOpen ? "bg-white" : "backdrop-blur-lg bg-white/60"
      }`}
    >
      <div className="bg-primary text-white text-sm py-2">
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
          {/* ---------- LEFT (Desktop Logo) ---------- */}
          <Link
            href="/"
            className="text-xl hidden lg:block font-bold whitespace-nowrap"
          >
            <Logo size={120} />
          </Link>

          {/* ---------- CENTER (Desktop Menu) ---------- */}
          <div className="hidden sm:flex flex-1 justify-center">
            <NavMenu loginStatus={isLoggedIn} links={links} />
          </div>

          {/* ---------- RIGHT (Desktop Right Section) ---------- */}
          <div className="hidden sm:flex items-center gap-3">
            <SearchNav open={open} setOpen={setOpen} />
            <CartIcon />
            <UserMenu logout={logout} isLoggedIn={isLoggedIn} user={user} />
          </div>

          <div className="flex sm:hidden items-center justify-between w-full">
            {/* ---- LEFT: Menu + Search ---- */}
            <div className="flex items-center gap-3">
              <NavMobileMenu>
                <ul className="flex pb-8 flex-col items-start justify-center gap-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group font-[400] inline-flex h-9 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavMobileMenu>

              <SearchNav open={open} setOpen={setOpen} />
            </div>

            {/* ---- CENTER: Logo ---- */}
            <Link
              href="/"
              className="text-xl font-bold whitespace-nowrap mx-auto"
            >
              <Logo size={120} />
            </Link>

            {/* ---- RIGHT: Cart + User ---- */}
            <div className="flex items-center gap-3">
              <CartIcon />
              <UserMenu logout={logout} isLoggedIn={isLoggedIn} user={user} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
