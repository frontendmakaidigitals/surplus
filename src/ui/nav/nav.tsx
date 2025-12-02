"use client";
import {
  UserIcon,
  ChevronDown,
  ShoppingBag,
  Edit,
  Phone,
  LogOut,
} from "lucide-react";
import { CartIcon } from "@/components/cart-icon";
import { NavMenu } from "@/ui/nav/nav-menu";
import { SearchNav } from "@/ui/nav/search-nav";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { NavMobileMenu } from "@/ui/nav/nav-mobile-menu.client";
import Image from "next/image";
import Logo from "@/ui/Logo";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // User authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

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

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [pathname]);

  const logout = async () => {
    try {
      await axios.post("/api/logout");
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
            <NavMenu loginStatus={isLoggedIn} links={links} />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <SearchNav open={open} setOpen={setOpen} />
            <CartIcon />

            {/* Loading state */}
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                {/* Avatar */}
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  // fallback without flicker
                  <div className="border rounded-full p-1">
                    <UserIcon className="h-5 w-5 hover:text-neutral-500" />
                  </div>
                )}

                {/* Dropdown */}
                <DropdownMenu
                  open={userMenuOpen}
                  onOpenChange={setUserMenuOpen}
                >
                  <DropdownMenuTrigger className="flex rounded-lg px-3 py-[.4rem] text-sm font-medium hover:bg-neutral-100 items-center gap-2">
                    <p>{user.first_name || "User"}</p>
                    <ChevronDown size={16} />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-44">
                    <DropdownMenuItem className="py-[.6rem]">
                      <Link
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2"
                        href={{
                          pathname: "/my-account",
                          query: "edit-profile",
                        }}
                      >
                        <ShoppingBag className="!size-[20px] mr-2 text-secondary" />
                        Orders
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="py-[.6rem]">
                      <Link
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2"
                        href={{
                          pathname: "/my-account",
                          query: "action=edit-profile",
                        }}
                      >
                        <Edit className="!size-[20px] mr-2 text-secondary" />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="py-[.6rem]">
                      <Phone className="!size-[20px] mr-2 text-secondary" />
                      Contact Us
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onSelect={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="py-[.6rem] hover:!bg-red-500 group hover:!text-white"
                    >
                      <LogOut className="!size-[20px] mr-2 text-secondary group-hover:!text-white" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <UserIcon className="h-5 w-5 hover:text-neutral-500" />
              </Link>
            )}

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
