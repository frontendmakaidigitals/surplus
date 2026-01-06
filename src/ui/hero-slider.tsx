"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState<any>(null);
  const [width, setWidth] = React.useState(0);
  const videos = [
    { src: "vid-1.mp4" },
    { src: "vid-2.mp4" },
    { src: "vid-3.mp4" },
  ];

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
  return (
    <Carousel setApi={setApi} className="h-[410px]   relative bg-primary ">
      <CarouselContent className="h-full">
        {videos.map((video, idx) => (
          <CarouselItem
            key={idx}
            className="relative  w-full h-[410px] basis-full"
          >
            <div className=" h-full w-full  overflow-hidden ">
              <video
                src={`/videos/${video.src}`}
                autoPlay
                loop
                preload="auto"
                muted
                className=" w-full h-full object-cover object-top"
              />
            </div>
            <div className="w-full h-full absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 top-[75%] max-w-2xl !pl-[2rem] z-20 ">
              <h1 className="text-slate-50 text-3xl font-[600]">
                Lorem Ipsum dolor sit amet
              </h1>
              <p className="text-slate-50 font-[500F]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:flex absolute bottom-5 right-0 justify-end items-center gap-2 px-4 pt-3">
        <CarouselPrevious className="static translate-y-0 bg-white hover:bg-white/90 hover:text-slate-800 text-slate-950 disabled:bg-slate-400" />
        <CarouselNext className="static translate-y-0 bg-white hover:bg-white/90 hover:text-slate-800 text-slate-950 disabled:bg-slate-400" />
      </div>
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === i
                ? "bg-secondary scale-125"
                : "bg-gray-300 hover:bg-blue-400"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
