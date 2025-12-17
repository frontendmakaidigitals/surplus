"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "../../../data";
import { slugify } from "../slugify";

export function MobileProductCategories() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium"
      >
        Product Categories
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion */}
      {open && (
        <ul className="pb-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${slugify(cat.title)}`}
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-neutral-100"
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
