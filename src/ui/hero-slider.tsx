"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSlider() {
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden h-[400px]">
              <Image
                alt="Error Loading Products"
                loading="eager"
                className="w-full h-full object-fit object-top"
                height={450}
                width={450}
                src="/cover.png"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex absolute bottom-5 right-0 justify-end items-center gap-2 px-4 pt-3">
        <CarouselPrevious className="static translate-y-0 bg-blue-500 hover:bg-blue-400 text-slate-50 disabled:bg-slate-400" />
        <CarouselNext className="static translate-y-0 bg-blue-500 hover:bg-blue-400 text-slate-50 disabled:bg-slate-400" />
      </div>
    </Carousel>
  );
}
