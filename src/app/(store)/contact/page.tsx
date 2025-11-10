"use client";
import React from "react";

export default function ContactPage() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Top Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-4">
            Email, call, or complete the form to learn how we can help you with your energy solutions.
          </p>

          <div className="space-y-4 text-sm">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@surplusoilfield.com" className="text-blue-600 hover:underline">
                support@surplusoilfield.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+971506349984" className="text-blue-600 hover:underline">
                +971 50 634 9984
              </a>
            </p>
            <p>
              <strong>Customer Support:</strong> Available 24/7 for all inquiries.
            </p>
            <p>
              <strong>Media & Partnerships:</strong> Email{" "}
              <a href="mailto:media@surplusoilfield.com" className="text-blue-600 hover:underline">
                media@surplusoilfield.com
              </a>
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="How can we help you?"
              className="w-full rounded-md border border-gray-300 px-4 py-2 h-28 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By contacting us, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold text-gray-900">Our Location</h3>
          <h4 className="text-xl font-medium text-gray-800">Connecting Near and Far</h4>
          <p className="text-gray-600">
            <strong>Headquarters:</strong> <br />
            Surplus Oilfield Equipment FZCO <br />
            Dubai, United Arab Emirates <br />
            Near Jebel Ali Free Zone
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Open Google Maps →
          </a>
        </div>

        {/* Map Mock */}
        <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center text-gray-500 font-medium">
          [ Map Placeholder ]
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-200">
        <h3 className="text-3xl font-semibold text-gray-900 mb-10">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {[
            "How quickly can I get a response after submitting the form?",
            "Do you offer support for international logistics?",
            "Can I schedule a visit to your facility?",
            "What certifications do your products carry?",
          ].map((q, i) => (
            <details
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer shadow-sm"
            >
              <summary className="font-medium text-gray-800">{q}</summary>
              <p className="mt-3 text-gray-600 text-sm">
                We typically respond within 24 hours. For urgent matters, please contact us directly
                via phone or WhatsApp.
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
