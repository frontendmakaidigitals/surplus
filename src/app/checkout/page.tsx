"use client";
import { useState } from "react";
import { Shield } from "lucide-react";
import Logo from "@/ui/Logo";
// Header Component
interface ShippingFormData {
  country: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  confirmEmail: string;
  phone: string;
}

type ShippingFormErrors = Partial<Record<keyof ShippingFormData, string>>;

function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Logo />
          </div>
          <span className="text-xl font-semibold ml-2">Checkout</span>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Give us feedback
        </a>
      </div>
    </header>
  );
}

// Review Order Component
function ReviewOrder() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Review order</h2>

      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          <img
            src={"/products/cl2.webp"}
            alt="Product"
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">
            EMERSON DELTAV KJ3242X1-BK1 SERIAL INTERFACE MODULE KJ32X1K1BK1
          </h3>
          <div className="text-lg font-bold mb-2">US $549.00</div>

          <div className="mb-3">
            <label className="text-xs text-gray-600 block mb-1">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-gray-600 mb-2">Returns accepted</div>

          <div className="text-sm">
            <div className="font-semibold mb-1">Delivery</div>
            <div className="text-xs text-gray-600">
              Est. delivery: Jan 7 - Jan 22
            </div>
            <div className="text-xs text-gray-600">
              Expedited International Shipping
            </div>
            <div className="font-semibold mt-1">US $29.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shipping Form Component
function ShippingForm() {
  const [formData, setFormData] = useState<ShippingFormData>({
    country: "India",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "110020",
    email: "",
    confirmEmail: "",
    phone: "",
  });

  const [errors, setErrors] = useState<ShippingFormErrors>({});

  const handleChange = <K extends keyof ShippingFormData>(
    field: K,
    value: ShippingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: ShippingFormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "Enter a first name.";
    }

    if (!formData.email) {
      newErrors.email = "Enter an email address.";
    }

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match.";
    }

    setErrors(newErrors);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Ship to</h2>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Country or region
          </label>
          <select
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Last name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Street address
          </label>
          <input
            type="text"
            value={formData.address1}
            onChange={(e) => handleChange("address1", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Street address 2 (optional)
          </label>
          <input
            type="text"
            value={formData.address2}
            onChange={(e) => handleChange("address2", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-600 block mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              State/Province/Region
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">ZIP code</label>
            <input
              type="text"
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Confirm email
            </label>
            <input
              type="email"
              value={formData.confirmEmail}
              onChange={(e) => handleChange("confirmEmail", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Phone number (required)
          </label>
          <div className="flex gap-2">
            <select className="w-24 px-2 py-2 border border-gray-300 rounded">
              <option>🇮🇳 +91</option>
              <option>🇺🇸 +1</option>
            </select>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            We only use this number if there's a shipping issue.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-full hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummary() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Item (1)</span>
          <span className="font-semibold">US $549.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">US $29.00</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold mb-6">
        <span>Order total</span>
        <span>US $578.00</span>
      </div>

      <button className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-full mb-3 cursor-not-allowed">
        Confirm and pay
      </button>

      <button className="w-full text-blue-600 font-semibold py-2 text-sm hover:underline">
        Enter shipping address
      </button>

      <div className="mt-4 flex items-start gap-2 text-xs">
        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-gray-600">Purchase protected by </span>
          <a href="#" className="text-blue-600 hover:underline">
            Money Back Guarantee
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Checkout Page
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ReviewOrder />
            <ShippingForm />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-600">
          <p className="text-center">
            Copyright © 2025 Surplus Inc. All Rights Reserved.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Accessibility
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              User Agreement
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Payments Terms of Use
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Cookies
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
