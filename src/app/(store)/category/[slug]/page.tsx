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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import CategoryCards from "@/app/(store)/category/CategoryCards";
import ProductCount from "@/ui/product-count";
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const paramsPromise = props.params;
  const { slug } = await paramsPromise;
  const products = [
    {
      title: "ALLEN BRADLEY 100-C12EJ10 AC CONTACTOR 24V-DC 25A AMP 7-1/2HP",
      stock: "Only 3 Left",
      image: "/images/allen-bradley-100-C12EJ10.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C23EJ10 AC CONTACTOR 24V-DC 30A AMP 15HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C23EJ10.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C97D10 120V-AC 120A AMP 75HP AC CONTACTOR",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C97D10.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C09*10 AC CONTACTOR 120V-AC 25A AMP 7-1/2HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C09-10.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-DP30NJ2 AC CONTACTOR 24V-AC 300A AMP",
      stock: "In Stock",
      image: "/images/allen-bradley-100-DP30NJ2.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C85DJ00 AC CONTACTOR 24V-DC 60A AMP 60HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C85DJ00.jpg",
    },
    {
      title: "ALLEN BRADLEY 700-CF310E AC CONTACTOR 24V-DC 25A AMP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-700-CF310E.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-D140D11 AC CONTACTOR 120V-AC 220A AMP 100HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-D140D11.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C300D00 AC CONTACTOR 120V-AC 65A AMP 20HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C300D00.jpg",
    },
    {
      title: "ALLEN BRADLEY 100-C72DJ00 24V-DC 90A AMP 50HP AC CONTACTOR",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-100-C72DJ00.jpg",
    },
    {
      title: "ALLEN BRADLEY 509-FO* SIZE 5 AC CONTACTOR 270A AMP 200HP",
      stock: "Only 1 Left",
      image: "/images/allen-bradley-509-FO.jpg",
    },
    {
      title:
        "ALLEN BRADLEY 509-BOO-XXX SIZE 1 AC CONTACTOR 115-120V-AC 27A AMP",
      stock: "Only 3 Left",
      image: "/images/allen-bradley-509-BOO-XXX.jpg",
    },
  ];

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
              <BreadcrumbPage>{slug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </RootLayoutWrapper>
      <section className="bg-white shadow py-6 mt-4 mb-5">
        <RootLayoutWrapper>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-[700]">
              New, Surplus & Used {slug} For Sale
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
        <ProductCount dataArray={products} />
      </section>
      <RootLayoutWrapper>
        <CategoryCards data={products} />
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
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
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
