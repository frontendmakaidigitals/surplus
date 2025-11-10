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
import CategoryCards from "@/app/(store)/category/CategoryCards";
import { products } from "../../../../../data";
import ProductCount from "@/ui/product-count";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const categoryName = decodeURIComponent(params.slug);
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );
  console.log(categoryProducts, "categoryProducts");
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
              <BreadcrumbPage>Catalog</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{params.slug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </RootLayoutWrapper>
      <section className="bg-white shadow py-6 mt-4 mb-5">
        <RootLayoutWrapper>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-[700]">
              New, Surplus & Used {params.slug} For Sale
            </h1>
            <div className="flex items-center gap-3">
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
      <section className="container mb-10">
        <ProductCount dataArray={categoryProducts} />
      </section>
      <RootLayoutWrapper>
        <CategoryCards data={categoryProducts} />
        <section className="mt-14 ">
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
