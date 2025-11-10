"use client";
import RootLayoutWrapper from "@/ui/rootlayout";
import React, { useState } from "react";

export default function Page() {
  const supportInfo = [
    {
      title: "Customer Support",
      description:
        "Our support team is available around the clock to address any concerns or queries you may have.",
    },
    {
      title: "Feedback and Suggestions",
      description:
        "We value your feedback and are continuously working to improve Snappy. Your input is crucial in shaping the future of Snappy.",
    },
    {
      title: "Media Inquiries",
      description:
        "For media-related questions or press inquiries, please contact us at media@snappyapp.com.",
    },
  ];
  const [message, setMessage] = useState("");
  const limit = 300;

  return (
    <>
      {/* Top Section */}
      <section className="relative bg-[#E8F0FF] py-20 ">
        <RootLayoutWrapper className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-600 mb-4 max-w-md">
              Email, call, or complete the form to learn how we can help you
              with your energy solutions.
            </p>

            <div className="space-y-4 text-sm">
              <p>
                <a
                  href="mailto:support@surplusoilfield.com"
                  className=" hover:underline"
                >
                  support@surplusoilfield.com
                </a>
              </p>
              <p>
                <a href="tel:+971506349984" className=" hover:underline">
                  +971 50 634 9984
                </a>
              </p>

              <p>
                <a
                  href="mailto:media@surplusoilfield.com"
                  className=" hover:underline"
                >
                  media@surplusoilfield.com
                </a>
              </p>
            </div>
            <div className="grid mt-16 grid-cols-1 lg:grid-cols-3 gap-x-5">
              {supportInfo.map((info, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white order-1 lg:order-2 shadow-xl rounded-3xl border border-gray-200 p-6">
            <div className="mb-7 space-y-2">
              <h2 className="text-3xl font-semibold text-gray-900">
                Get in Touch
              </h2>
              <p>Connect with us anytime</p>
            </div>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-full border border-gray-200/80 px-4 placeholder:text-slate-400 py-[.7rem] focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-full border border-gray-200/80 px-4 placeholder:text-slate-400 py-[.7rem] focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-full border border-gray-200/80 px-4 placeholder:text-slate-400 py-[.7rem] focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-full border border-gray-200/80 px-4 placeholder:text-slate-400 py-[.7rem] focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="relative w-full">
                <textarea
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= limit)
                      setMessage(e.target.value);
                  }}
                  placeholder="How can we help you?"
                  className="w-full rounded-2xl border border-gray-200/80 px-4 placeholder:text-slate-400 py-[.7rem] h-28 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />

                <div
                  className={`absolute bottom-3 right-3 text-xs ${
                    message.length >= limit ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {message.length}/{limit}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
            <p className="text-xs text-center text-gray-500 mt-4">
              By contacting us, you agree to our{" "}
              <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong>.
            </p>
          </div>
        </RootLayoutWrapper>
      </section>

      {/* Location Section */}
      <RootLayoutWrapper>
        <section className=" py-20 border-t border-gray-200 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-square flex items-center justify-center text-gray-500 font-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55377.34560692343!2d55.05972022075563!3d24.960309760807636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1762772204009!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="">
            <h3 className="text-xl mb-3 font-medium text-gray-900">
              Our Location
            </h3>
            <h4 className="text-4xl font-semibold text-gray-800">
              Connecting Near and Far
            </h4>
            <p className="text-gray-800 mt-8">
              <strong>Headquarters:</strong> <br />
              Surplus Oilfield Equipment FZCO <br />
              Dubai, United Arab Emirates <br />
              Near Jebel Ali Free Zone
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              className="inline-block px-5  py-[.4rem] bg-blue-500 mt-6 rounded-xl text-blue-50 hover:underline"
            >
              Open Google Maps →
            </a>
          </div>

          {/* Map Mock */}
        </section>
      </RootLayoutWrapper>

      {/* FAQ Section */}
    </>
  );
}
