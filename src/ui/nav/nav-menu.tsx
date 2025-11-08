"use client";
import Link from "next/link";
import { useState } from "react";
import { NavMobileMenu } from "@/ui/nav/nav-mobile-menu.client";
import { ChevronDown } from "lucide-react";
const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Product Categories", href: "/categories" },
  { label: "Guarantee & Refunds", href: "/gurantees-and-refunds" },
  { label: "Shipping options", href: "/shipment-overview" },
  { label: "Resources", href: "/resources" },
  { label: "Sell your surplus", href: "/sell" },
  { label: "Contact Us", href: "/contact" },
];

export const NavMenu = () => {
  const visibleCount = 8;
  const visibleLinks = links.slice(0, visibleCount);
  const moreLinks = links.slice(visibleCount);
  console.log(moreLinks);
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="sm:block hidden">
        <ul className="flex flex-row items-center justify-center gap-x-1 relative">
          {visibleLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* “More” dropdown */}
          {moreLinks.length > 0 && (
            <li className="relative ">
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="group inline-flex h-9 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                More
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMore && (
                <ul className="absolute top-full left-0 w-48 rounded-lg border border-slate-200 bg-white shadow-xl py-2 z-50">
                  {moreLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm hover:bg-neutral-100"
                        onClick={() => setShowMore(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
      <div className="sm:hidden flex items-center">
        <NavMobileMenu>
          <ul className="flex pb-8 flex-col items-stretch justify-center gap-x-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex h-9 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </NavMobileMenu>
      </div>
    </>
  );
};
