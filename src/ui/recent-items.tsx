"use client";
import ProductCard from "./product-card";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Product } from "@/lib/types";
function getRecentlyViewedIds(): number[] {
  console.log("running");
  try {
    const raw = localStorage.getItem("recently_viewed_products");
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === "number")) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/recent-items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    },
  );

  if (!res.ok) {
    return [];
  }

  const data = (await res.json()) as Array<{ product: Product }>;

  // Adjust this line if API response shape is different
  return data.map((item: any) => item.product);
}

export default function RecentItems() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const carouselApi = useRef<CarouselApi | null>(null);

  useEffect(() => {
    const ids = getRecentlyViewedIds();
    if (ids.length === 0) return;

    (async () => {
      try {
        const products = await fetchProductsByIds(ids);
        setRecentProducts(products);
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    })();
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-2">
            Are you still interseted?
          </h2>
        </div>

        <Carousel
          setApi={(api) => (carouselApi.current = api)}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {recentProducts.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/5">
                <ProductCard layoutName={"recent"} product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => carouselApi.current?.scrollPrev()}
          className="p-2 bg-black rounded-md text-slate-100 "
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => carouselApi.current?.scrollNext()}
          className="p-2 bg-black rounded-md text-slate-100 "
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
