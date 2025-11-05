
import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";

import { ProductList } from "@/ui/products/product-list";

export const metadata: Metadata = {
  title: "Shop by Category",
  description: "Browse our latest product categories.",
  alternates: { canonical: `${publicUrl}/category` },
};

export default async function CategoryPage() {

  return (
    <main className="pb-8 space-y-4">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        Categories
      </h1>
      <div className="text-lg font-semibold text-muted-foreground">
        Explore our product collections
      </div>
      <ProductList />
    </main>
  );
}
