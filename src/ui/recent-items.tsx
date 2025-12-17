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
import { products as allProducts, type Product } from "../../data";
function getRecentlyViewedIds(): string[] {
  try {
    const raw = localStorage.getItem("recently_viewed_products");
    const parsed = raw ? JSON.parse(raw) : [];

    if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

export default function RecentItems() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const carouselApi = useRef<CarouselApi | null>(null);
  useEffect(() => {
    const ids = getRecentlyViewedIds();

    if (ids.length === 0) return;
    const mapped = ids
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p) => p !== undefined);

    setRecentProducts(mapped);
  }, []);

  if (recentProducts.length === 0) return null;
  console.log(recentProducts);
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
                <ProductCard layoutName={'recent'} product={product}  />
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
