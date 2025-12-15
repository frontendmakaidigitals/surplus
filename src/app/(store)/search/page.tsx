import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";
import ProductRender from "./productRender";
import { products } from "../../../../data";
import RootLayoutWrapper from "@/ui/rootlayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import Link from "next/link";
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
    q: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-[400]">No products found</h1>
        <Link
          href="/"
          className="px-4 py-[.5rem] bg-secondary/80 hover:bg-secondary/90 text-slate-50 rounded-lg text-sm"
        >
          Home page
        </Link>
      </div>
    );
  }

  return (
    <>
      <RootLayoutWrapper>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Category</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{query}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </RootLayoutWrapper>
      <ProductRender query={query} products={filteredProducts} />
    </>
  );
}
