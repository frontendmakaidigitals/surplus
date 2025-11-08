"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import RootLayoutWrapper from "@/ui/rootlayout";
const sections = [
  {
    id: "overview",
    title: "Shipping Overview",
    content: [
      "At Surplus Oil Field, we prioritize efficiency and reliability in every shipment we send out. Our logistics system is optimized to manage both small parcels and large industrial consignments with equal professionalism. Each order is handled by an experienced shipping team that ensures proper labeling, protective packaging, and compliance with destination requirements.",
      "Our goal is to minimize downtime and ensure your equipment reaches you in perfect condition and on time. Orders are processed quickly, and we provide complete visibility throughout the shipping journey so you always know where your order stands.",
      "Key Shipping Highlights:",
      "• Most in-stock items are processed and dispatched within 24–48 hours of confirmation.",
      "• Shipments are handled through reliable global carriers and verified freight companies.",
      "• Tracking numbers are issued for all orders once they are shipped.",
      "• Shipping costs are determined based on product size, weight, and destination.",
      "• Estimated delivery times and charges are displayed clearly before order checkout.",
    ],
  },
  {
    id: "domestic",
    title: "Domestic Deliveries (UAE & GCC)",
    content: [
      "We take pride in offering fast, dependable delivery services across the UAE and GCC region. Whether you’re located in Abu Dhabi, Dubai, or elsewhere in the Gulf, we ensure your order reaches you quickly and safely. Our domestic shipping operations are tailored to meet the urgent needs of businesses that rely on timely delivery for critical oilfield and industrial projects.",
      "Every package is professionally handled and tracked from our facility to your designated site or warehouse. We also offer flexible delivery solutions for bulk or urgent orders, including same-day dispatch and express options for customers within the UAE.",
      "Domestic Delivery Features:",
      "• Free UAE shipping may apply to qualifying orders above a specified value.",
      "• 1–3 business days average delivery time across UAE cities.",
      "• 3–7 business days average for GCC countries, depending on customs clearance.",
      "• Priority or same-day dispatch available upon request for urgent projects.",
      "• Dedicated logistics support for large machinery and bulk shipments.",
    ],
  },
  {
    id: "international",
    title: "International Shipping",
    content: [
      "With a global customer base, Surplus Oil Field offers comprehensive international shipping solutions that cover all major markets worldwide. From the Middle East to North America, Asia, Europe, and Africa, our international logistics team ensures your products reach their destination smoothly. Depending on your order type, we arrange delivery by air freight, sea freight, or express courier, balancing speed and cost-efficiency.",
      "We take care of the full export documentation process, including customs paperwork, certificates, and packing lists, in compliance with international trade standards. Our goal is to make international sourcing as simple and reliable as local buying.",
      "International Shipping Details:",
      "• Shipping options include air freight, sea freight, and express courier (DHL, FedEx, etc.).",
      "• All exports are handled through trusted global carriers and freight forwarders.",
      "• Customs duties and import taxes (if applicable) are the buyer’s responsibility.",
      "• Delivery timeline: approximately 7–14 business days, depending on destination.",
      "• Full export documentation support, including invoices, packing lists, and certificates of origin.",
      "• Optional freight insurance is available upon request for high-value shipments.",
    ],
  },
  {
    id: "policies",
    title: "Shipping Policies & Terms",
    content: [
      "Our shipping policies are designed to provide transparency, accountability, and peace of mind for every customer. From order confirmation to delivery, Surplus Oil Field maintains strict compliance with carrier guidelines, trade laws, and safety protocols. We aim to eliminate delays and provide clear communication at every stage of your order.",
      "In rare cases of weather delays, customs hold-ups, or carrier-related issues, our logistics team will proactively keep you informed and work to resolve the matter as quickly as possible.",
      "Policy Highlights:",
      "• Orders are processed Monday to Saturday, excluding UAE public holidays.",
      "• Customers receive email confirmation with tracking information upon dispatch.",
      "• Surplus Oil Field is not liable for external delays caused by customs, weather, or third-party carriers.",
      "• All shipments are insured for full invoice value during transit unless otherwise noted.",
      "• Heavy or oversized items may be palletized or containerized for extra protection.",
      "• Customers are responsible for ensuring accurate delivery details at checkout to avoid delays.",
    ],
  },
  {
    id: "tracking",
    title: "Track Your Shipment",
    content: [
      "We make it simple to monitor the progress of your order from the moment it leaves our warehouse. Every shipment is assigned a unique tracking number, which allows you to follow your delivery in real-time through the carrier’s tracking portal.",
      "Customers with a registered Surplus Oil Field account can also log in to their dashboard to view order history, shipment status, and delivery updates. Our support team is always available to assist if you require further information or encounter any delivery-related issues.",
      "Tracking Assistance:",
      "• Email notification with tracking details sent once your order ships.",
      "• Online tracking is available through your Surplus Oil Field account or carrier website.",
      "• Guest customers can request tracking updates by contacting our support team.",
      "• Customer Service Hours: Monday–Friday, 8:00 AM–5:00 PM (UAE Time).",
      "• Phone: +971 50-6349984",
      "• Email: support@surplusoilfield.com",
    ],
  },
];

export default function GuaranteeRefunds() {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 140; // adjust depending on your sticky header height
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Manually update active section for instant feedback
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px", // makes detection more stable
        threshold: 0.2,
      }
    );

    sections.forEach((section) => {
      const target = document.getElementById(section.id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="relative h-64 flex items-center justify-start ">
        <div className="bg-black/30 absolute w-full h-full inset-0 z-10" />
        <Image
          className="w-full h-full object-cover"
          src={
            "https://images.pexels.com/photos/6170188/pexels-photo-6170188.jpeg"
          }
          alt={""}
          fill
        />
        <h1 className="relative container mx-auto z-10 text-white text-3xl font-[600] tracking-wide">
          Shipment Overview
        </h1>
      </div>

      {/* Main Section */}
      <RootLayoutWrapper>
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-28 shadow-sm rounded-xl border border-gray-300/40 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Topics
              </h3>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleScroll(section.id)}
                      className={`w-full cursor-pointer py-[.5rem] rounded-lg px-2 text-left text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-100 border-l-2 border-blue-500 text-blue-500 font-semibold"
                          : "text-gray-600 hover:text-blue-400 hover:bg-blue-100"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="px-6 border-l border-slate-600/20">
              <div className="space-y-16">
                {sections.map((section, i) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-[700] text-gray-800 mb-4">
                      {i + 1}. {section.title}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                      {section.content.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RootLayoutWrapper>
    </div>
  );
}
