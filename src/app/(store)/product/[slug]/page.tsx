import React from "react";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AddToCart } from "@/components/add-to-cart";
import { YnsLink } from "@/ui/yns-link";
import { deslugify, formatMoney } from "@/lib/utils";

import ImageSelector from "@/ui/images-selector";

const products = [
  {
    id: "1",
    name: "Industrial Bearing Set",
    slug: "industrial-bearing-set",
    summary: "High-performance bearings for industrial machinery.",
    description:
      "This precision-engineered bearing set is designed for heavy-duty industrial applications. Built from heat-treated steel and sealed for long-lasting durability, it reduces friction and ensures smooth rotational motion under high load conditions. Ideal for CNC machinery, pumps, and automotive systems.",
    images: [
      "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-2.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-3.jpg?v=1756777086",
    ],
    active: true,
    price: 2999,
    currency: "USD",
    stock: 20,
    category: "Mechanical Components",
    brand: "BasicWear",
    tags: ["bearing", "industrial", "mechanical"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "CNC Tool Holder",
    slug: "cnc-tool-holder",
    summary: "Precision tool holder for CNC machining systems.",
    description:
      "Crafted with high-tensile steel and balanced for optimal spindle performance, this CNC tool holder offers exceptional accuracy and rigidity. Compatible with standard ER collets, it minimizes vibration and enhances tool life, making it a must-have for precision milling and turning applications.",
    images: [
      "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-2.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-3.jpg?v=1756777086",
    ],
    active: true,
    price: 5999,
    currency: "USD",
    stock: 10,
    category: "CNC Accessories",
    brand: "UrbanEdge",
    tags: ["cnc", "tool-holder", "machining"],
    rating: 4.8,
    discountPercentage: 10,
  },
  {
    id: "3",
    name: "Linear Actuator Drive",
    slug: "linear-actuator-drive",
    summary: "Compact actuator drive for precise motion control.",
    description:
      "Engineered for high-precision motion systems, this linear actuator drive provides smooth and accurate movement with minimal noise. It’s ideal for automation, robotics, and manufacturing systems, with adjustable stroke lengths and an efficient motor assembly for consistent performance.",
    images: [
      "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-2.jpg?v=1756777086",
    ],
    active: true,
    price: 8999,
    currency: "USD",
    stock: 15,
    category: "Automation Components",
    brand: "StepPro",
    tags: ["linear", "actuator", "automation"],
    rating: 4.6,
    featured: true,
  },
  {
    id: "4",
    name: "Hydraulic Pump Module",
    slug: "hydraulic-pump-module",
    summary: "Efficient hydraulic pump for industrial systems.",
    description:
      "This high-efficiency hydraulic pump module delivers consistent pressure and flow rates for demanding hydraulic systems. Built with corrosion-resistant housing and precision valves, it ensures reliable operation in construction, automotive, and heavy machinery applications.",
    images: [
      "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-2.jpg?v=1756777086",
    ],
    active: true,
    price: 10999,
    currency: "USD",
    stock: 12,
    category: "Hydraulics",
    brand: "StepPro",
    tags: ["hydraulic", "pump", "module"],
    rating: 4.7,
    featured: true,
  },
  {
    id: "5",
    name: "Servo Motor Assembly",
    slug: "servo-motor-assembly",
    summary: "High-torque servo motor for automation systems.",
    description:
      "The Servo Motor Assembly provides precise control and responsive motion ideal for robotics and CNC equipment. It combines a brushless motor with integrated driver electronics, delivering high torque and low heat generation under continuous duty cycles.",
    images: [
      "https://7-10.in/cdn/shop/files/710.301.MB-1.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-2.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-3.jpg?v=1756777086",
      "https://7-10.in/cdn/shop/files/710.301.MB-4.jpg?v=1756777086",
    ],
    active: true,
    price: 12999,
    currency: "USD",
    stock: 8,
    category: "Motors & Drives",
    brand: "StepPro",
    tags: ["servo", "motor", "automation"],
    rating: 4.9,
    featured: true,
  },
];
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return <h1>Product not found</h1>;
  }

  const category = "lorem";

  return (
    <article className="pb-12">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <YnsLink href="/products">All Products</YnsLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <YnsLink href={`/category/${category}`}>
                    {deslugify(category)}
                  </YnsLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Layout */}
      <div className="mt-8 grid relative gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="">
          <div className="sticky top-28">
            {" "}
            {/* ✅ Sticks image below navbar area */}
            <ImageSelector images={product?.images} />
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl font-bold text-foreground leading-snug">
            {product?.name}
          </h1>

          {/* Brand + ID Info */}
          <div className="mt-4 text-sm w-fit text-gray-700 space-y-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 w-28">Brand:</span>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                {product?.brand || "Unknown"}
              </a>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-900 w-28">Model:</span>
              <span className="text-gray-600">{"N/A"}</span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-900 w-28">
                Product ID:
              </span>
              <span className="text-gray-600">121981u034</span>
            </div>
          </div>

          {/* Price */}
          <p className="mt-4 text-3xl font-bold text-blue-600">
            {formatMoney({
              amount: Math.round(Number(product?.price || 0)), // ✅ ensures integer
              currency: product?.currency || "AED", // ✅ fallback currency
            })}
          </p>

          {/* Offers + Highlights */}
          <div className="mt-4 bg-blue-500 w-fit text-blue-50 text-sm px-5 py-2 rounded-md font-medium">
            Save up to 15% instantly by registering or signing in!
          </div>

          {/* Icons Row */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">1-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Same-Day Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Free Returns</span>
            </div>
          </div>

          {/* Stock + Condition */}
          <div className="flex items-center mt-4 gap-3">
            <div className="">
              {(product?.stock || 0) > 0 ? (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-semibold">
                  Out of Stock
                </span>
              )}
            </div>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-semibold">
              In Fair Condition
            </span>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <AddToCart
              product={product}
              className={`w-full ${
                (product?.stock || 0) <= 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {(product?.stock || 0) <= 0 ? "Out of Stock" : "Add to Cart"}
            </AddToCart>
          </div>
          {/* Product Details Section */}
          <div className="lg:col-span-12 mt-12 grid md:grid-cols-2 gap-10">
            {/* Left: Product Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-2">
                Product Details
              </h2>

              <ul className="text-sm text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold text-gray-900">
                    Product ID:
                  </span>{" "}
                  V-1771960
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Brand:</span>{" "}
                  STEARNS
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Model:</span>{" "}
                  5-66-6409-33
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Condition:
                  </span>{" "}
                  <span className="">Fair</span>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Custom Description:
                  </span>{" "}
                  STEARNS 5-66-6409-33
                </li>
              </ul>
            </div>

            {/* Right: Shipping Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-2">
                Shipping Details
              </h2>

              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">$9.99</span> 2-Day Domestic
                  Shipping
                </li>
                <li className="font-medium">
                  Flat Rate International Shipping
                </li>
                <li>
                  <span className="font-semibold">Ships From:</span> 6401 Rogers
                  Road, Delta, Ohio
                </li>
                <li>
                  <span className="font-semibold">Ships To:</span> Worldwide
                </li>
                <li>
                  <span className="font-semibold">Weight:</span> 0.4 lbs
                </li>
                <li>
                  <span className="font-semibold">Dimensions:</span> 5.5 in ×
                  4.5 in × 1.75 in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
