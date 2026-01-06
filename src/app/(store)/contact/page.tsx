"use client";
import { useState } from "react";
import RootLayoutWrapper from "@/ui/rootlayout";
import { useForm, FieldErrors, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/ui/shadcn/button";
import { cn } from "@/lib/utils";
import SubmitSuccess from "@/ui/Submit-sucess";
const contactSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone_number: z.string().min(8, "Enter a valid phone number"),
  message: z.string().min(10, "Message is too short").max(300),
});

type ContactFormValues = z.infer<typeof contactSchema>;
const fieldOrder: (keyof ContactFormValues)[] = [
  "message",
  "phone_number",
  "email",
  "last_name",
  "first_name",
];

export default function Page() {
  const limit = 300;
  const [status, setStatus] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });
  const message = useWatch({
    control: form.control,
    name: "message",
  });

  const error = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries`,
        data
      );
      if (res.data.status === "success") {
        toast.success("Request Submitted!", {
          className:
            "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
      } else {
        toast.error("Something went wrong.", {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
      }
      setStatus(res.data.status);
      setSuccessOpen(true);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong.", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      console.error(error);
    }
  };

  const onError = async (errors: FieldErrors<ContactFormValues>) => {
    for (const field of fieldOrder) {
      const err = errors[field];
      if (err?.message) {
        toast.error(err.message, {
          className:
            "!bg-red-600/40 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
        });
      }
    }
  };

  return (
    <>
      <SubmitSuccess
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <section className="relative bg-[#E8F0FF] py-20 ">
        <RootLayoutWrapper className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-600 mb-4 max-w-md">
              Email, call, or complete the form to connect with us.
            </p>

            <div className="space-y-4 text-sm">
              <p>
                <a
                  href="mailto:support@surplusoilfield.com"
                  className="hover:underline"
                >
                  support@surplusoilfield.com
                </a>
              </p>
              <p>
                <a href="tel:+971506349984" className="hover:underline">
                  +971 50 634 9984
                </a>
              </p>
              <p>
                <a
                  href="mailto:media@surplusoilfield.com"
                  className="hover:underline"
                >
                  media@surplusoilfield.com
                </a>
              </p>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="bg-white order-1 lg:order-2 shadow-xl rounded-3xl border border-gray-200 p-6">
            <div className="mb-7 space-y-2">
              <h2 className="text-3xl font-semibold text-gray-900">
                Get in Touch
              </h2>
              <p>Connect with us anytime</p>
            </div>

            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit, onError)}
              noValidate
            >
              {/* FIRST + LAST NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`px-4 py-[.7rem] rounded-full border border-slate-400/30 ${
                      error.first_name
                        ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                        : ""
                    }`}
                    {...form.register("first_name")}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`px-4 py-[.7rem] rounded-full border border-slate-400/30 ${
                      error.last_name
                        ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                        : ""
                    }`}
                    {...form.register("last_name")}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-4 py-[.7rem] rounded-full border border-slate-400/30 ${
                    error.email
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  {...form.register("email")}
                />
              </div>

              {/* PHONE */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full px-4 py-[.7rem] rounded-full border border-slate-400/30 ${
                    error.phone_number
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  {...form.register("phone_number")}
                />
              </div>

              {/* MESSAGE */}
              <div className="relative w-full">
                <textarea
                  placeholder="How can we help you?"
                  className={`w-full px-4 py-[.7rem] h-28 resize-none  rounded-2xl border border-slate-400/30 ${
                    error.message
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  maxLength={limit}
                  {...form.register("message")}
                />
                <div
                  className={`absolute bottom-3 right-3 text-xs ${
                    message?.length >= limit ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {message?.length || 0}/{limit}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                isLoading={isSubmitting}
                disabled={status === "success" || isSubmitting}
                className={cn(
                  "w-full h-11 rounded-full text-white transition bg-secondary hover:bg-secondary/90"
                )}
                type="submit"
              >
                Submit Form
              </Button>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              By contacting us, you agree to our{" "}
              <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong>.
            </p>
          </div>
        </RootLayoutWrapper>
      </section>

      <RootLayoutWrapper>
        {" "}
        <section className=" py-20 border-t border-gray-200 grid md:grid-cols-2 gap-12 items-center">
          {" "}
          <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-square flex items-center justify-center text-gray-500 font-medium">
            {" "}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55377.34560692343!2d55.05972022075563!3d24.960309760807636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1762772204009!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>{" "}
          </div>{" "}
          <div className="">
            {" "}
            <h3 className="text-xl mb-3 font-medium text-gray-900">
              {" "}
              Our Location{" "}
            </h3>{" "}
            <h4 className="text-4xl font-semibold text-gray-800">
              {" "}
              Connecting Near and Far{" "}
            </h4>{" "}
            <p className="text-gray-800 mt-8">
              {" "}
              <strong>Headquarters:</strong> <br /> Surplus Oilfield Equipment
              FZCO <br /> Dubai, United Arab Emirates <br /> Near Jebel Ali Free
              Zone{" "}
            </p>{" "}
            <a
              href="https://maps.google.com"
              target="_blank"
              className="inline-block px-5 py-[.4rem] bg-blue-500 mt-6 rounded-xl text-blue-50 hover:underline"
            >
              {" "}
              Open Google Maps →{" "}
            </a>{" "}
          </div>{" "}
          {/* Map Mock */}{" "}
        </section>{" "}
      </RootLayoutWrapper>
    </>
  );
}
