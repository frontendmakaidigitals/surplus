import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";
import CategoryCards from "@/app/(store)/category/CategoryCards";
import RootLayoutWrapper from "@/ui/rootlayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import SelectBox from "@/app/(store)/category/select-box";
export const metadata: Metadata = {
  title: "Shop by Category",
  description: "Browse our latest product categories.",
  alternates: { canonical: `${publicUrl}/category` },
};

export default async function CategoryPage() {
  return (
    <section className="pb-8 space-y-4 !w-full ">
      <section className="bg-slate-100 mb-10 py-5 border-b border-slate-600/4">
        <RootLayoutWrapper className="space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Catalog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
            Categories
          </h1>
          <div className="text-lg font-semibold text-muted-foreground">
            Explore our product collections
          </div>
          <SelectBox />
        </RootLayoutWrapper>
      </section>
      <RootLayoutWrapper>
        <CategoryCards />
      </RootLayoutWrapper>
    </section>
  );
}
