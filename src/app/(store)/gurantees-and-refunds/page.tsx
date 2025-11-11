"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const sections = [
  {
    id: "quality",
    title: "1. Quality Assurance Policy",
    paragraphs: [
      <>
        At <strong>Surplus Oil Field</strong>, we are deeply committed to
        maintaining the highest standards of product quality and customer
        satisfaction. Every item in our inventory, whether new, used, or
        surplus, undergoes a meticulous inspection and verification process to
        ensure it meets both industry standards and the expectations of our
        clients. Our team of quality control specialists checks each product for
        accuracy, functionality, and authenticity before it is listed for sale
        or dispatched.
      </>,
      <>
        We partner with trusted global suppliers and utilize strict evaluation
        criteria to ensure that only reliable, tested, and performance-verified
        equipment reaches our customers. All items are securely packaged to
        minimize the risk of damage during transit. Whether you’re purchasing a
        single component or a bulk consignment, we guarantee that every product
        you receive from <strong>Surplus Oil Field</strong> will be exactly as
        described, fully functional, safely delivered, and ready for use.
      </>,
      <>
        We take pride in ensuring that all equipment and components are
        thoroughly inspected and tested before shipment.
      </>,
    ],
    list: [
      "Every product undergoes a multi-point inspection to verify performance and authenticity.",
      "Items are carefully packed to prevent transit damage.",
      "Used and surplus items are graded and clearly described so you know exactly what to expect.",
      "We guarantee that the items you receive will match their listed specifications, condition, and description.",
    ],
    closing:
      "If any product fails to meet these standards, you are entitled to a replacement, credit, or refund as outlined below.",
  },
  {
    id: "returns",
    title: "2. Return & Refund Policy",
    paragraphs: [
      <>
        We understand that purchasing industrial and oilfield equipment can
        involve complex decisions, and we want you to feel completely confident
        when you buy from us. That’s why <strong>Surplus Oil Field</strong>{" "}
        offers a 30-day return policy from the date of shipment. If you’re not
        entirely satisfied with your purchase, you may return it for a full
        refund or exchange, provided that the item is undamaged, unused, and
        returned in its original condition. Customers with a registered{" "}
        <strong>Surplus Oil Field</strong> account benefit from an extended
        return window of up to 45 days.
      </>,
      <>
        Free returns apply when the product received is not as described,
        arrives damaged, is non-functional, or when a back-ordered item exceeds
        the quoted lead time. However, return shipping costs are the buyer’s
        responsibility in cases of incorrect ordering, application mismatch, or
        buyer’s remorse.
      </>,
      <>
        All “New” condition products must be returned in their original
        manufacturer packaging with seals intact; removing or tampering with
        packaging may void refund eligibility. Refunds are issued promptly once
        the returned items have been received and verified by our inspection
        team.
      </>,
    ],
    sublists: [
      {
        title: "Free Returns Apply When:",
        items: [
          "The item received is not as described or represented.",
          "The item is non-functional upon receipt.",
          "The product is damaged during shipping.",
          "A back-ordered item exceeds the quoted lead time.",
        ],
      },
      {
        title: "Return Shipping Costs Apply When:",
        items: [
          "The return is due to buyer’s remorse.",
          "The product does not fit your intended application.",
        ],
      },
      {
        title: "Additional Conditions:",
        items: [
          "Products listed as “New” must be returned in original manufacturer packaging with all seals intact.",
          "Tampering with factory packaging or removing security seals will void refund eligibility.",
          "Refunds are processed once items are received and verified at our warehouse.",
        ],
      },
    ],
  },
  {
    id: "exchange",
    title: "3. Exchange / Replacement Policy",
    paragraphs: [
      <>
        At <strong>Surplus Oil Field</strong>, we strive to resolve every issue
        with efficiency and fairness. If you receive an item that is defective,
        damaged, or not as described, you may request a replacement instead of a
        refund. Once the returned product has been received and inspected, we
        will arrange for a replacement to be shipped immediately, at no
        additional cost to you.
      </>,
      <>
        If an identical item is not available, we will offer an equivalent
        product or issue a store credit that can be applied to your next
        purchase. Our replacement process is designed to minimize downtime for
        your operations. All shipping costs associated with returns or
        replacements of damaged, incorrect, or defective products are fully
        covered by <strong>Surplus Oil Field</strong>.
      </>,
      <>
        We value our customers’ time and trust, and our goal is always to ensure
        you receive a product that meets your operational needs without
        unnecessary delay or inconvenience.
      </>,
    ],
    list: [
      "If you prefer a replacement instead of a refund, we’ll gladly arrange it, subject to stock availability.",
      "Replacements are shipped immediately after inspection of the returned item.",
      "If an identical replacement isn’t available, you may choose an alternate item or receive a store credit toward your next purchase.",
      "In the case of damaged or incorrect items, return shipping is fully covered by Surplus Oil Field.",
    ],
  },
  {
    id: "warranty",
    title: "4. Warranty Disclaimer",
    paragraphs: [
      <>
        Unless specifically stated otherwise, <strong>Surplus Oil Field</strong>{" "}
        does not provide a manufacturer warranty on surplus, used, or
        reconditioned products. These items are sourced from verified suppliers
        and undergo functional testing to ensure quality and reliability prior
        to sale, but they may not carry the original factory warranty.
      </>,
      <>
        That said, we take every reasonable measure to ensure that each product
        performs as intended and is accurately represented in its listing. Items
        labeled as “New” or “OEM-Certified” may include the manufacturer’s
        warranty if indicated on the product page. Customers are encouraged to
        review product details carefully to understand the warranty coverage
        applicable to each item.
      </>,
      <>
        Our promise is straightforward: we guarantee the authenticity,
        integrity, and working condition of every product we sell, providing our
        customers with the peace of mind they deserve when sourcing industrial
        or oilfield equipment.
      </>,
    ],
    list: [
      "We ensure all products are tested for operational reliability before sale.",
      "Warranty coverage may apply to new and OEM-certified items as indicated on product listings.",
      "Our commitment is to functional quality and honest representation, not factory warranty duration.",
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
        <aside className="hidden md:block md:col-span-1">
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
          <div className="px-6 py-6 lg:py-0 border-t lg:border-t-0 lg:border-l border-slate-600/20">
            <div className="space-y-16">
              {sections.map((section) => (
                <article key={section.id} id={section.id} className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    {section.title}
                  </h2>

                  <div className="space-y-5 text-[15px] text-muted-foreground">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {section.list && (
                    <ul className="list-disc pl-6 mt-6 space-y-3 text-[15px] text-muted-foreground">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.sublists &&
                    section.sublists.map((sub, i) => (
                      <div key={i} className="mt-6">
                        <h4 className="font-semibold mb-3">{sub.title}</h4>
                        <ul className="list-disc pl-6 space-y-2 text-[15px] text-muted-foreground">
                          {sub.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
