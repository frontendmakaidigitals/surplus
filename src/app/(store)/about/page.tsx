"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RootLayoutWrapper from "@/ui/rootlayout";

export default function AboutUsSection() {
  const sections = [
    { id: "company-story", title: "Our Company Story" },
    { id: "mission-values", title: "Our Mission & Values" },
    { id: "strength", title: "Our Strength in Numbers" },
    { id: "facilities", title: "Our Facilities & Locations" },
    { id: "sustainability", title: "Sustainability & Environment" },
    { id: "why-choose", title: "Why Choose Us" },
  ];

  const [activeId, setActiveId] = useState<string>("");

  // Scroll handler to detect which section is visible
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });

      const visible = offsets.find(
        (o) => o.top > 0 && o.top < window.innerHeight / 2
      );
      if (visible) setActiveId(visible.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Banner */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3321797/pexels-photo-3321797.jpeg"
          alt="Our Company Story Banner"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white">
          About Us
        </h1>
      </div>

      {/* Main content + Sidebar */}
      <RootLayoutWrapper>
        <div className=" py-16 grid md:grid-cols-[250px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block sticky top-24 h-fit self-start bg-white shadow-md rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Topics</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeId === section.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-600 hover:text-blue-700"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="space-y-24">
            {/* Company Story */}
            <div
              id="company-story"
              className="grid md:grid-cols-2 gap-10 items-center scroll-mt-28"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Company Story
                </h2>
                <p className="leading-relaxed text-gray-700">
                  We started here in the UAE, a major hub for the world's energy
                  business. Our goal was simple: to make it easy and fast to
                  find good, reliable oil field equipment. We help companies
                  save money and keep their projects running without long
                  delays. We are now a trusted online market, built on honesty,
                  good service, and smart solutions for the energy industry here
                  and everywhere else.
                </p>
              </div>
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184315/pexels-photo-3184315.jpeg"
                  alt="Company Story Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mission & Values */}
            <div
              id="mission-values"
              className="grid md:grid-cols-2 gap-10 items-center scroll-mt-28"
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.pexels.com/photos/3228688/pexels-photo-3228688.jpeg"
                  alt="Mission & Values Image"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Mission & Values
                </h2>
                <p className="leading-relaxed text-gray-700 mb-4">
                  Our mission is to promote the growth of a sustainable and
                  highly efficient global energy supply chain.
                </p>
                <p className="leading-relaxed text-gray-700">
                  As a leading global platform and distributor of certified oil
                  field equipment, we help contractors, operators, and suppliers
                  mitigate unforeseen project delays and extended lead times
                  caused by critical equipment shortages.
                </p>
              </div>
            </div>

            {/* Strength in Numbers */}
            <div id="strength" className="text-center  scroll-mt-28">
              <h2 className="text-3xl font-bold text-gray-800">
                Our Strength in Numbers
              </h2>
              <p className="text-center max-w-4xl mx-auto mt-3">
                Our operational scale and commitment to service speak for
                themselves. These numbers reflect the trust the global energy
                sector places in us:
              </p>
              <div className="grid grid-cols-2  md:grid-cols-4 gap-6 mt-10">
                {[
                  { num: "1000+", label: "Available Equipment Listings" },
                  { num: "100,000+", label: "Positive Customer Feedback" },
                  { num: "9000+", label: "Items Processed Each Year" },
                  { num: "9+", label: "Countries Served" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-blue-50 rounded-2xl border border-blue-100"
                  >
                    <h3 className="text-4xl font-extrabold text-gray-700">
                      {item.num}
                    </h3>
                    <p className="mt-2 text-gray-600 font-medium">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div
              id="facilities"
              className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Facilities & Locations
                </h2>
                <p className="leading-relaxed text-gray-700 mb-4">
                  We are strategically based in the UAE — a global hub for trade
                  and energy shipping routes. Our central location gives us
                  unmatched access to key international markets, helping us
                  deliver faster and smarter.
                </p>
                <p className="leading-relaxed text-gray-700 mb-4">
                  To support major energy projects worldwide, we operate an
                  advanced network of large logistics hubs and specialized
                  inspection centers. Each facility is equipped to handle
                  heavy-duty machinery, precision components, and high-value
                  inventory with care.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Check, handle, and store equipment professionally.</li>
                  <li>
                    Ship items out faster — reducing lead times and costs.
                  </li>
                  <li>
                    Securely manage your high-value gear, from intake to
                    delivery, anywhere in the world.
                  </li>
                </ul>
              </div>
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/7236028/pexels-photo-7236028.jpeg"
                  alt="Logistics Facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sustainability */}
            <div
              id="sustainability"
              className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24"
            >
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                  alt="Sustainability Commitment"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Sustainability & Environmental Commitment
                </h2>
                <p className="leading-relaxed text-gray-700 mb-4">
                  We believe that efficiency and environmental responsibility go
                  hand in hand. Our business model is built around
                  sustainability, promoting the circular economy in the energy
                  sector.
                </p>
                <p className="leading-relaxed text-gray-700 mb-4">
                  By giving high-quality, pre-owned equipment a second life, we
                  actively help clients lower their environmental footprint
                  while maintaining performance and reliability.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Reduce Waste:</strong> Less valuable machinery ends
                    up in landfills.
                  </li>
                  <li>
                    <strong>Save Energy:</strong> Reduced need for new
                    manufacturing conserves energy and resources.
                  </li>
                  <li>
                    <strong>Lower Footprint:</strong> Minimized overall
                    environmental impact of industrial projects.
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  We take pride in helping build a more sustainable and
                  responsible future for the global oil field industry.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div
              id="why-us"
              className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Why Choose Us
                </h2>
                <p className="leading-relaxed text-gray-700 mb-6">
                  We are the trusted partner for managing your critical
                  equipment needs — combining speed, reliability, and
                  sustainability.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Global Reach, UAE Base:</strong> Tap into a
                    worldwide inventory network, managed efficiently from our
                    UAE hub.
                  </li>
                  <li>
                    <strong>Quality First:</strong> All equipment is verified,
                    inspected, and certified for dependable performance.
                  </li>
                  <li>
                    <strong>Save Money:</strong> Competitive pricing ensures you
                    get the best value when buying — and top returns when
                    selling.
                  </li>
                  <li>
                    <strong>Always Available:</strong> Our logistics and support
                    teams operate 24/7 to eliminate downtime.
                  </li>
                </ul>
              </div>
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/8867439/pexels-photo-8867439.jpeg"
                  alt="Why Choose Us"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </RootLayoutWrapper>
    </section>
  );
}
