import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";

import { ProductList } from "@/ui/products/product-list";

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: "All Products",
		alternates: { canonical: `${publicUrl}/products` },
	};
};

export default async function AllProductsPage() {



	return (
		<main className="pb-8">
			<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
				All Products
			</h1>
			<ProductList  />
		</main>
	);
}
