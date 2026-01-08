import RootLayoutWrapper from "@/ui/rootlayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import ShowProduct from "./showProduct";
import axios from "axios";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { slug } = await props.params;
  const { q } = await props.searchParams;
  const categorySlug = decodeURIComponent(slug);

  let category: any;
  let completeCategory: any;
  let products: any;

  try {
    const categoryRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories-by-slug/${categorySlug}`
    );

    category = categoryRes.data.data;

    const completeRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${category.id}`
    );

    const productRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories-by-slug/${category.slug}/products`
    );

    completeCategory = completeRes.data.data;

    products = productRes.data.data;
  } catch {
    return <h1>Category not found</h1>;
  }

  const subcategories = completeCategory.subcategories ?? [];
  const availableCategories = subcategories.map((sub: any) => sub.name);

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
              <BreadcrumbPage>{categorySlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </RootLayoutWrapper>

      <section className="bg-white border border-slate-500/10 py-6 mt-4 mb-5">
        <RootLayoutWrapper>
          <h1 className="text-xl font-[700]">
            {subcategories.length > 0
              ? `Subcategories of ${categorySlug}`
              : `Products in ${categorySlug}`}
          </h1>
        </RootLayoutWrapper>
      </section>
      <RootLayoutWrapper>
        <div>
          <ShowProduct
            availableCategories={availableCategories}
            products={products}
            q={q}
          />
        </div>
      </RootLayoutWrapper>
    </>
  );
}
