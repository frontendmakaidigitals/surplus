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

interface SimilarItemsProps {
  currentProductId: string;
}

export default function SimilarItems({ currentProductId }: SimilarItemsProps) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const carouselApi = useRef<CarouselApi | null>(null);

  useEffect(() => {
    const currentProduct = allProducts.find((p) => p.id === currentProductId);
    if (!currentProduct) return;

    // Filter similar products by category OR brand, excluding the current product
    const filtered = allProducts.filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.brand === currentProduct.brand)
    );

    setSimilarProducts(filtered);
  }, [currentProductId]);

  if (similarProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-2">
            You might also like
          </h2>
          <p className="text-center text-gray-600">
            Similar products based on category or brand
          </p>
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
            {similarProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => carouselApi.current?.scrollPrev()}
          className="p-2 bg-black rounded-md text-slate-100"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => carouselApi.current?.scrollNext()}
          className="p-2 bg-black rounded-md text-slate-100"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
