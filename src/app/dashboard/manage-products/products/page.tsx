"use client";
import { ProductProvider } from "../../context/ProductContext";
import ProductTable from "../../components/product/ProductTable";
import RootLayoutWrapper from "@/ui/rootlayout";
import { PaginationWrapper } from "@/ui/PaginationWrapper";
import { DeleteConfirmDialog } from "@/ui/DeleteDialogWrapper";
import ProductHeader from "../../components/product/product-header";
const Page = () => {
  return (
    <RootLayoutWrapper>
      <ProductProvider>
        <div className="mt-4 space-y-6">
          <ProductHeader />

          <div className="border rounded-lg mb-4 py-3">
            <ProductTable />

            <section className="mt-5">
              <PaginationWrapper currentPage={1} totalPages={1} />
            </section>
          </div>

          <DeleteConfirmDialog />
        </div>
      </ProductProvider>
    </RootLayoutWrapper>
  );
};

export default Page;
