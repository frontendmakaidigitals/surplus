import RootLayoutWrapper from "@/ui/rootlayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import ProductCard from "@/ui/product-card";
import { slugify } from "../../product/[slug]/page";
import { products } from "../../../../../data";
import ProductCount from "@/ui/product-count";
import PageFilter from "./pageFilter";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const categoryName = decodeURIComponent(params.slug);
  const categoryProducts = products.filter(
    (p) => slugify(p.category).toLowerCase() === slugify(categoryName)
  );

  if (categoryProducts.length === 0) {
    return <h1>Category not found</h1>;
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
              <BreadcrumbPage>{params.slug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </RootLayoutWrapper>
      <section className="bg-white border border-slate-500/10 py-6 mt-4 mb-5">
        <RootLayoutWrapper>
          <div className=" lg:flex justify-between items-center">
            <h1 className="text-xl font-[700]">
              New, Surplus & Used {params.slug} For Sale
            </h1>
            <div className="mt-10 lg:mt-0 flex items-center gap-3">
              <label>Sort by:</label>
              <Select>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Most Recent</SelectItem>
                  <SelectItem value="banana">Highest Price</SelectItem>
                  <SelectItem value="pineapple">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </RootLayoutWrapper>
      </section>
      <section className="container mb-10 ">
        <ProductCount dataArray={categoryProducts} />
      </section>
      <RootLayoutWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-[.5fr_1.5fr] gap-5 ">
          <div className="hidden lg:block">
            <PageFilter products={categoryProducts} />
          </div>

          {categoryProducts.length > 0 && (
            <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
              {categoryProducts.slice(0, 5).map((product) => (
                <ProductCard
                  key={product.id}
                  resizeable
                  product={product}
                  layoutName="category"
                />
              ))}
            </div>
          )}
        </div>
        <section className="mt-14 mb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-disabled href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </RootLayoutWrapper>
    </>
  );
}
