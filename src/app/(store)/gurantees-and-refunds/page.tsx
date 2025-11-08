"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const sections = [
  {
    id: "quality",
    title: "Quality Assurance Policy",
    content: [
      "At Surplus Oil Field, we are deeply committed to maintaining the highest standards of product quality and customer satisfaction. Every item in our inventory, whether new, used, or surplus, undergoes a meticulous inspection and verification process to ensure it meets both industry standards and the expectations of our clients.",
      "Our team of quality control specialists checks each product for accuracy, functionality, and authenticity before it is listed for sale or dispatched.",
      "We partner with trusted global suppliers and utilize strict evaluation criteria to ensure that only reliable, tested, and performance-verified equipment reaches our customers.",
      "If any product fails to meet these standards, you are entitled to a replacement, credit, or refund as outlined below.",
    ],
  },
  {
    id: "returns",
    title: "Return & Refund Policy",
    content: [
      "We understand that purchasing industrial and oilfield equipment can involve complex decisions, and we want you to feel completely confident when you buy from us.",
      "Surplus Oil Field offers a 30-day return policy from the date of shipment (extended to 45 days for registered customers).",
      "Free returns apply when the product received is not as described, arrives damaged, is non-functional, or when a back-ordered item exceeds the quoted lead time.",
      "Return shipping costs are the buyer’s responsibility in cases of incorrect ordering, application mismatch, or buyer’s remorse.",
      "Refunds are issued promptly once the returned items have been received and verified by our inspection team.",
    ],
  },
  {
    id: "exchange",
    title: "Exchange / Replacement Policy",
    content: [
      "If you receive an item that is defective, damaged, or not as described, you may request a replacement instead of a refund.",
      "Once the returned product has been received and inspected, we will arrange for a replacement to be shipped immediately at no additional cost.",
      "If an identical item is not available, we will offer an equivalent product or issue a store credit that can be applied to your next purchase.",
      "All shipping costs for returns or replacements of damaged, incorrect, or defective products are fully covered by Surplus Oil Field.",
    ],
  },
  {
    id: "warranty",
    title: "Warranty Disclaimer",
    content: [
      "Unless specifically stated otherwise, Surplus Oil Field does not provide a manufacturer warranty on surplus, used, or reconditioned products.",
      "Items labeled as “New” or “OEM-Certified” may include the manufacturer’s warranty if indicated on the product page.",
      "We ensure all products are tested for operational reliability before sale and guarantee the authenticity and functional quality of every product we sell.",
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
        <Image
          className="w-full h-full object-cover"
          src={
            "https://images.unsplash.com/photo-1626726183219-e230165db244?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
          }
          alt={""}
          fill
        />
        <h1 className="relative container mx-auto z-10 text-white text-3xl font-[600] tracking-wide">
          Guarantee & Refunds
        </h1>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-28 shadow-sm rounded-xl border border-gray-300/40 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Topics</h3>
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
    </div>
  );
}
