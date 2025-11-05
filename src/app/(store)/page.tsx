import type { Metadata } from "next/types";
import { publicUrl } from "@/env.mjs";
import { ProductList } from "@/ui/products/product-list";
import { HeroSlider } from "@/ui/hero-slider";
import { NewProduct } from "@/ui/new-product";
import ShopByCategory from "@/ui/shopby-category";
import FeaturedCatalogs from "@/ui/featured-catalog";
import Image from "next/image";
import Link from "next/link";
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
export default async function Home() {
  return (
    <>
      <section className="rounded ">
        <HeroSlider />

        <section className="relative mt-3 ">
          {/* subtle background pattern / blur glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-[700] text-cyan-700 tracking-wide leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="mt-14">
        <h2 className="relative mb-6 text-3xl font-semibold tracking-tight text-gray-900">
          Hot Buy Products
          <span className="absolute left-0 -bottom-1 h-[3px] w-24 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></span>
        </h2>

        <ProductList />
      </section>
      <section className="mt-14">
        <h2 className="relative mb-6 text-3xl font-semibold tracking-tight text-gray-900">
          New Products
          <span className="absolute left-0 -bottom-1 h-[3px] w-24 bg-gradient-to-r from-green-500 to-lime-400 rounded-full"></span>
        </h2>
        <NewProduct />
      </section>
      <section className="mt-14">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900 underline underline-offset-8 decoration-sky-400">
          Shop by Category
        </h2>
        <ShopByCategory />
      </section>
      <section className="mt-14">
        <div className="flex justify-between items-center ">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900 underline underline-offset-8 decoration-sky-400">
            Our Featured Catalogs
          </h2>
          <Link
            href={"/"}
            className="bg-gray-900 hover:scale-[1.07] transition-all duration-200 mb-3 text-slate-100 rounded-full px-4 py-[.4rem]"
          >
            Browse all catalogs
          </Link>
        </div>
        <FeaturedCatalogs />
      </section>
    </>
  );
}
