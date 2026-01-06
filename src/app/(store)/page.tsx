import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";
import { HeroSlider } from "@/ui/hero-slider";
import RecentItems from "@/ui/recent-items";
import CategoryCard from "@/ui/CategoryCard";
import Image from "next/image";
import ReviewsSection from "@/ui/Testimonial";
import { products, categories as categoriesData } from "../../../data";
import axios from "axios";
import RootLayoutWrapper from "@/ui/rootlayout";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/ui/product-card";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Category } from "@/lib/types";
import { getWishlistAction } from "@/actions/wishlist-action";
import { WishlistProvider } from "@/context/wishlist-context";
export const metadata: Metadata = {
  alternates: { canonical: publicUrl },
};

const services = [
  {
    image: "/truck.png", // e.g. a truck image
    title: "Free Domestic Shipping",
    desc: "On orders over $50",
    bg: "bg-[#BBDCE5] hover:bg-blue-100",
    shadow: "hover:shadow-blue-200",
  },
  {
    image: "/easy-return.png", // e.g. a box return image
    title: "Free 30 Day Returns Policy",
    desc: "Easy & hassle-free",
    bg: "bg-[#A7E399] hover:bg-green-100",
    shadow: "hover:shadow-green-200",
  },
  {
    image: "/delivery-box.png", // e.g. a lightning or package handling image
    title: "Fast Same-Day Dispatch",
    desc: "Processed before 2PM",
    bg: "bg-[#F0E491] hover:bg-yellow-100",
    shadow: "hover:shadow-yellow-200",
  },
];
type Review = {
  name: string;
  date: string;
  title: string;
  text: string;
  productName: string;
  productImg: string;
};
type Reviews = Review[];

const reviews: Reviews = [
  {
    name: "Rohit Sharma",
    date: "12/01/25",
    title: "High-quality bearings, perfect fit",
    text: "Ordered SKF 6205 bearings and the quality is excellent. Packaging was secure and delivery was faster than expected.",
    productName: "SKF 6205 Deep Groove Ball Bearing",
    productImg: "/products/bearing-6205.png",
  },
  {
    name: "Ankit Verma",
    date: "11/28/25",
    title: "Sturdy and reliable",
    text: "These industrial couplings are well-built and fit our compressor perfectly. No vibration issues after installation.",
    productName: "Jaw-Type Flexible Coupling",
    productImg: "/products/coupling-jaw.png",
  },
  {
    name: "David Reed",
    date: "11/18/25",
    title: "Good pricing and fast service",
    text: "The solenoid valves arrived on time and work smoothly. Very competitive pricing compared to local suppliers.",
    productName: "2-Way Brass Solenoid Valve",
    productImg: "/products/solenoid-valve.png",
  },
  {
    name: "Pooja Iyer",
    date: "11/12/25",
    title: "Perfect replacement part",
    text: "We used this sensor as a replacement in our CNC machine and it performed better than the original.",
    productName: "Inductive Proximity Sensor M12",
    productImg: "/products/proximity-sensor.png",
  },
  {
    name: "Mark Wilson",
    date: "11/08/25",
    title: "Great build quality",
    text: "The pneumatic fittings are strong and leak-proof. Have been running on our assembly line for weeks with zero issues.",
    productName: "Pneumatic Push-Fit Elbow Connector",
    productImg: "/products/pneumatic-fitting.png",
  },
  {
    name: "Vikram Singh",
    date: "10/30/25",
    title: "Highly recommended",
    text: "Good quality V-belts with strong grip and no stretching. Our machine runs smoother now.",
    productName: "A-Section V-Belt A46",
    productImg: "/products/vbelt-a46.png",
  },
  {
    name: "Emily Carter",
    date: "10/22/25",
    title: "Accurate and durable",
    text: "This pressure gauge is very accurate. Installed it on our air compressor and readings are stable.",
    productName: "Stainless Steel Pressure Gauge 0–300 PSI",
    productImg: "/products/pressure-gauge.png",
  },
  {
    name: "Sanjay Patel",
    date: "10/15/25",
    title: "Good value for money",
    text: "The hydraulic hose is tough and flexible. Used it for a press machine repair—works perfectly.",
    productName: "Hydraulic Hose R2AT 1/2 Inch",
    productImg: "/products/hydraulic-hose.png",
  },
  {
    name: "Michael Green",
    date: "10/10/25",
    title: "Smooth performance",
    text: "The motor run capacitor fixed the humming issue on our blower motor. Excellent quality.",
    productName: "Motor Run Capacitor 50µF",
    productImg: "/products/run-capacitor.png",
  },
  {
    name: "Harish Kumar",
    date: "10/04/25",
    title: "Exactly what we needed",
    text: "We ordered limit switches for our conveyor line—they are rugged and work flawlessly.",
    productName: "Industrial Limit Switch",
    productImg: "/products/limit-switch.png",
  },
];

export default async function Home() {
  const productList = products;
  const categoriesList = categoriesData;
  const getNewProducts = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/new`);
  };
  const getHotProducts = () => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/featured`
    );
  };
  const getCategories = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
  };
  const getWishList = async () => {
    const res = await getWishlistAction();
    return res;
  };
  const { data: categories } = await getCategories();
  const { data: newProducts } = await getNewProducts();
  const { data: hotProducts } = await getHotProducts();
  const { data: wishlist = [] } = (await getWishList()) ?? {};

  return (
    <>
      <div className="lg:container grid grid-cols-1 lg:grid-cols-[1.5fr_.5fr] gap-5">
        <HeroSlider />
        <section className="rounded ">
          <section className="hidden lg:block relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]"></div>

            <div className="grid grid-cols-1 gap-6">
              {services.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-center gap-4 border border-slate-600/10 px-4 py-3 rounded-2xl shadow-sm cursor-pointer transition-all duration-300 relative overflow-visible`}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-visible">
                    <div className="absolute inset-0 scale-[1.2] ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1200}
                        height={800}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-[700] text-secondary tracking-wide leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
      <WishlistProvider initialWishlist={wishlist}>
        <RootLayoutWrapper>
          <section className="mt-20">
            <h2 className="relative mb-6 text-3xl font-semibold tracking-tight text-gray-900">
              Hot Buy Products
              <span className="absolute left-0 -bottom-1 h-[3px] w-24 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></span>
            </h2>

            <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4">
              {hotProducts.data !== null && hotProducts.data.length !== 0
                ? hotProducts.data.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      resizeable
                      server={true}
                      product={product}
                      layoutName="hot"
                    />
                  ))
                : productList
                    .slice(0, 5)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        resizeable
                        product={product}
                        layoutName="hot"
                      />
                    ))}
            </div>
          </section>
          <section className="mt-14">
            <h2 className="relative mb-6 text-3xl font-semibold tracking-tight text-gray-900">
              New Products
              <span className="absolute left-0 -bottom-1 h-[3px] w-24 bg-gradient-to-r from-green-500 to-lime-400 rounded-full"></span>
            </h2>
            <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4">
              {newProducts.data !== null && newProducts.data.length !== 0
                ? newProducts.data.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      server={true}
                      resizeable
                      product={product}
                      layoutName="new"
                    />
                  ))
                : productList
                    .slice(0, 5)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        resizeable
                        product={product}
                        layoutName="new"
                      />
                    ))}
            </div>
          </section>

          {/* Banner Image */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                img: "/img1.jpg",
                title: "Schinder Surplus",
                desc: "Wide Range of Industrial Products",
              },
              {
                img: "/img2.jpg",
                title: "Bosch Surplus",
                desc: "Surplus Heavy and Light Industrial Products",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative group mt-14 h-[200px] lg:min-h-[420px] w-full overflow-hidden rounded-xl"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity duration-500 " />

                <div className="absolute bottom-0 w-full px-10 py-10 text-white">
                  <div className="  transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 space-y-3">
                    <div className="">
                      <h2 className="text-5xl font-[400] leading-tight !text-[#b5e3e4]">
                        {item.title}
                      </h2>
                      <p className=" mt-1 text-white/80">{item.desc}</p>
                    </div>

                    <button className="mt-2 inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-semibold text-black rounded-md transition-all duration-300 hover:bg-black hover:text-white">
                      Shop now
                      <span>
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900 underline underline-offset-8 decoration-secondary">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {categories.data !== null && categories.data.length !== 0
                ? categories.data.map((cat: Category) => (
                    <CategoryCard key={cat.id} category={cat} server={true} />
                  ))
                : categoriesList.map((cat: Category) => (
                    <CategoryCard key={cat.id} category={cat} />
                  ))}
            </div>
          </section>
          <ReviewsSection reviews={reviews} />
          <RecentItems />
          <CTASection />
        </RootLayoutWrapper>
      </WishlistProvider>
    </>
  );
}

function CTASection() {
  return (
    <section className="pt-2 pb-20 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* CTA 1 – Buy Products */}
          <div className="bg-orange-500/5 flex flex-col justify-between">
            <div className="bg-slate-200 relative h-[200px] lg:h-[320px] flex justify-center items-center w-full">
              <Image
                src={
                  "https://images.unsplash.com/photo-1632496497047-706290273235?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={""}
                fill
                className="object-cover"
              />
            </div>
            <div className="px-5 py-8">
              <div>
                <h3 className="text-3xl text-center font-[500] mb-3">
                  Get Quality Industrial Parts
                </h3>
                <p className="text-neutral-600 text-center mb-6">
                  Browse thousands of new & refurbished components trusted by
                  industries worldwide. Fast delivery, verified quality, and
                  competitive pricing.
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="mt-auto inline-block text-center px-6 py-3 bg-primary text-white  font-medium hover:bg-primary/90 transition"
                >
                  Shop Industrial Parts
                </Link>
              </div>
            </div>
          </div>

          {/* CTA 2 – Sell Surplus */}
          <div className="bg-neutral-900 text-white  flex flex-col justify-between">
            <div className="bg-slate-200 relative h-[200px] lg:h-[320px] flex justify-center items-center w-full">
              <Image
                src={
                  "https://images.unsplash.com/photo-1595246007497-15e0ed4b8d96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={""}
                fill
                className="object-cover"
              />
            </div>
            <div className="px-5 py-8">
              <div>
                <h3 className="text-3xl text-center font-[600] mb-3">
                  Sell Your Surplus Inventory
                </h3>
                <p className="text-neutral-300 text-center mb-6">
                  Turn unused machinery components, spares, and MRO inventory
                  into cash. We buy in bulk or help you liquidate fast.
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/sell-your-surplus"
                  className="mt-auto inline-block text-center px-6 py-3 bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition"
                >
                  Sell Your Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
