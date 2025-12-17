"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "../../../data";
import { slugify } from "@/app/(store)/product/[slug]/page";
export const NavMenu = ({
  links,
  loginStatus,
}: {
  links: { label: string; href: string }[];
  loginStatus: boolean;
}) => {
  const visibleCount = loginStatus ? 6 : 8;
  const visibleLinks = links.slice(0, visibleCount);
  const moreLinks = links.slice(visibleCount);

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="hidden sm:block">
      <ul className="flex items-center justify-center gap-x-1 relative">
        {visibleLinks.map((link) =>
          link.label === "Product Categories" ? (
            /* ---------- PRODUCT CATEGORIES (HOVER) ---------- */
            <li key={link.label} className="relative group">
              <p className="inline-flex h-9 items-center gap-1 rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100">
                {link.label}
                <ChevronDown size={14} />
              </p>

              {/* Dropdown */}
              <div className="absolute left-0 top-full z-50 hidden group-hover:block">
                <div className="mt-2 w-56 rounded-lg border bg-white shadow-xl">
                  <ul className="py-2">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/category/${slugify(cat.title)}`}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-neutral-100"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ) : (
            /* ---------- NORMAL LINKS ---------- */
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            </li>
          )
        )}

        {/* ---------- MORE DROPDOWN ---------- */}
        {moreLinks.length > 0 && (
          <li className="relative">
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              More
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMore && (
              <ul className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border bg-white shadow-xl py-2">
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
  );
};
