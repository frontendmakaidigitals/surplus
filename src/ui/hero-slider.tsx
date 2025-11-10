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
  const slides = Array.from({ length: 4 });
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState<any>(null);
  const [width, setWidth] = React.useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  React.useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);
  const isMobile = width < 768;
  return (
    <Carousel setApi={setApi} className="w-full mb-10 mt-6 relative">
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden h-[230px] lg:h-[400px]">
              <Image
                alt="Error Loading Products"
                loading="eager"
                className="w-full h-full object-fit lg:object-contain object-center"
                height={450}
                width={900}
                src={
                  !isMobile
                    ? `/Banner-${index + 1}.jpg`
                    : `/Banner-${index + 1}-m.jpg`
                }
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:flex absolute bottom-5 right-0 justify-end items-center gap-2 px-4 pt-3">
        <CarouselPrevious className="static translate-y-0 bg-blue-500 hover:bg-blue-400 text-slate-50 disabled:bg-slate-400" />
        <CarouselNext className="static translate-y-0 bg-blue-500 hover:bg-blue-400 text-slate-50 disabled:bg-slate-400" />
      </div>
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === i
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-blue-400"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
