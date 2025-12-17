"use client";
import { useEffect, useRef } from "react";
import { Star, BadgeCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
type Review = {
  name: string;
  date: string;
  title: string;
  text: string;
  productName: string;
  productImg: string;
};
type Reviews = Review[];
export default function ReviewsSection({ reviews }: { reviews: Reviews }) {
  const carouselApi = useRef<CarouselApi | null>(null);

  const nameBreaker = (name?: string) => {
    if (!name) return "";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) return parts[0];

    const second = parts[1] ?? ""; // safe fallback

    return `${parts[0]} ${second.charAt(0).toUpperCase()}.`;
  };

  useEffect(() => {
    if (!carouselApi.current) return;

    const interval = setInterval(() => {
      carouselApi.current?.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselApi.current]);

  return (
    <section className="py-16">
      <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-7">
        What Our Customers Say
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={(api) => (carouselApi.current = api)}
          className="w-full "
        >
          <CarouselContent className="pb-4">
            {reviews.map((r, i) => (
              <CarouselItem
                key={i}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="border border-gray-300/80 shadow-none rounded-xl h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Top */}
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-md flex items-center gap-2 ">
                        {nameBreaker(r.name)}
                        <span className=" flex items-center text-xs font-[500] text-slate-500 gap-1">
                          <BadgeCheck
                            size={22}
                            className="fill-green-500 !text-white"
                          />{" "}
                          Verified Buyer
                        </span>
                      </p>
                      <span className="text-xs text-gray-500">{r.date}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 text-yellow-500 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={22}
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2">{r.title}</h3>

                    {/* Text */}
                    <p className="text-sm text-gray-600 flex-grow">{r.text}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
      </div>
    </section>
  );
}
