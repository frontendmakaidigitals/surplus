"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SurplusRequestForm from "./request-form";
import { ProductBuilderProvider } from "@/app/dashboard/context/ProductFormContext";
import {
  BadgeCheck,
  Airplay,
  Users,
  Timer,
  Globe2,
  Headphones,
} from "lucide-react";
const SurplusPage = () => {
  const items = [
    {
      title: "We have the expertise",
      desc: "With years of experience in oilfield asset recovery...",
      icon: BadgeCheck,
    },
    {
      title: "We have the exposure",
      desc: "We actively list and promote your equipment...",
      icon: Airplay,
    },
    {
      title: "We have the buyers",
      desc: "Our buyer network includes industrial contractors...",
      icon: Users,
    },
    {
      title: "We have the fastest recovery rate",
      desc: "Most clients see results within one to two weeks...",
      icon: Timer,
    },
    {
      title: "We are global",
      desc: "With distribution centers in UAE, USA, Canada...",
      icon: Globe2,
    },
    {
      title: "We are ready to respond",
      desc: "We provide free desktop valuations within 2–3 business days...",
      icon: Headphones,
    },
  ];
  return (
    <div className=" text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-24 px-6 text-center">
        <div className="absolute inset-0 w-full h-full bg-black/40 z-10" />
        <Image
          src="https://images.pexels.com/photos/9654059/pexels-photo-9654059.jpeg"
          alt="Oilfield background"
          fill
          priority
          className="object-cover object-center "
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Turn Your Surplus into Working Capital.
          </motion.h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl mb-8">
            Partner with{" "}
            <span className="font-semibold">Surplus Oil Field</span>, a trusted
            name in industrial resale and asset recovery. Get fast valuations,
            transparent reporting, and access to thousands of global buyers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition">
              Free Valuation
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-900 transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-full bg-blue-100 text-secondary">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-800 transition">
            Request a Free Valuation
          </button>
        </div>
      </section>

      {/* Parts for Planet Initiative */}
      <section className="relative bg-green-50 py-20 px-6 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg"
          alt="Green earth"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
            Parts for Planet Initiative
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-10 text-lg">
            At Surplus Oilfield, we believe asset recovery can fuel more than
            profit; it can fuel positive change. Through our{" "}
            <strong>“Parts for Planet Initiative”</strong>, we turn surplus
            industrial equipment into an opportunity to give back to the Earth.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: "Step 1",
                desc: "Partner with us for your surplus asset recovery or resale program.",
                img: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg",
              },
              {
                step: "Step 2",
                desc: "For every part sold, a tree is planted, symbolizing renewal and sustainability.",
                img: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
              },
              {
                step: "Step 3",
                desc: "Join Surplus Oilfield’s commitment to a greener planet — together, we make every recovery count.",
                img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition"
              >
                <div className="w-full h-40 mb-4 relative rounded-xl overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.step}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  {item.step}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mt-14 mx-auto px-4">
        <div className="mb-7">
          <h1 className="text-4xl font-[600] text-center">
            List Your Inventory
          </h1>
          <p className="text-center">
            List your inventory and get a free valuation report.
          </p>
        </div>
        <ProductBuilderProvider>
          <SurplusRequestForm />
        </ProductBuilderProvider>
      </section>

      <section className="relative max-w-sm mb-10 lg:max-w-6xl mx-auto mt-16 py-12 px-6 text-center text-white overflow-hidden rounded-3xl shadow-xl">
        {/* Background Image */}
        <Image
          src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg"
          alt="Industrial partnership"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Optional decorative graphic overlay (pattern or vector) */}
        <div className="absolute inset-0 bg-[url('/pattern-light.svg')] opacity-10 bg-center bg-cover" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
            Partner with Us as Your <br className="hidden md:block" />
            <span className="text-primary">Asset Recovery Expert</span>
          </h2>

          <p className="max-w-3xl mx-auto  mb-10 text-gray-100">
            Turn your surplus industrial equipment into immediate value with
            <span className="font-semibold"> Surplus Oilfield’s </span>
            trusted asset recovery programs. Our specialists ensure a seamless
            process from evaluation to sale — maximizing your return while
            minimizing downtime.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-primary text-sm px-6 py-2 rounded-full hover:bg-gray-100 transition font-semibold shadow-md">
              Request a Free Desktop Valuation
            </button>
            <button className="border border-white text-white text-sm px-6 py-2 rounded-full hover:bg-white hover:text-primary transition font-semibold shadow-md">
              Get Valuation Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurplusPage;
