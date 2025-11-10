import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";

import { ProductList } from "@/ui/products/product-list";
import { ProductNotFound } from "@/ui/products/product-not-found";
import { products } from "../../../../data";
export const generateMetadata = async (props: {
  searchParams: Promise<{
    q?: string;
  }>;
}): Promise<Metadata> => {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";
  return {
    title: `Search results for "${query}"`,
    alternates: { canonical: `${publicUrl}/search` },
  };
};

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;

  if (!query) {
    return redirect("/", RedirectType.replace);
  }

  return (
    <main>
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        Search results for “{query}”
      </h1>
      {products?.length ? (
        <ProductList productData={products} />
      ) : (
        <ProductNotFound query={query} />
      )}
    </main>
  );
}
