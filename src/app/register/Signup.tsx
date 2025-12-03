"use client";
import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { Card, CardContent } from "@/ui/shadcn/card";
import { Button } from "@/ui/shadcn/button";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { User, Mail, Lock, Calendar } from "lucide-react";
import { Checkbox } from "@/ui/shadcn/checkbox";
import { toast } from "sonner";
import axios from "axios";
import { Calendar as DatePick } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/shadcn/popover";
import { cn } from "@/lib/utils";
import Captcha from "@/ui/Captcha";
import { useRouter } from "next/navigation";
const signupSchema = z
  .object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters required"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    agree: z.boolean().refine((val) => val === true, "You must accept terms"),
    date_of_birth: z.string().min(10, "Date of birth is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormType = z.infer<typeof signupSchema>;
const fieldOrder: (keyof SignupFormType)[] = [
  "agree",
  "confirmPassword",
  "password",
  "date_of_birth",
  "email",
  "last_name",
  "first_name",
];

const Signup = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const redirectTimer = useRef<NodeJS.Timeout | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormType) => {
    const { agree, confirmPassword, ...submitData } = data;
    const payload = { ...submitData };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        payload
      );
      toast.success("Account created successfully!", {
        className:
          "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
      router.push("/login");
      setStatus("success");
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message || "Registration failed";

        if (errorMessage.toLowerCase().includes("already")) {
          toast.custom((t) => (
            <div className="bg-red-600/80 backdrop-blur-xl border-red-900 text-white rounded-lg px-4 py-3 shadow-lg flex flex-col gap-3 border ">
              <p className="text-sm">
                {errorMessage}. <br />
                Redirecting you to login in <b>5 seconds...</b>
              </p>

              <button
                className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition text-sm"
                onClick={() => {
                  if (redirectTimer.current)
                    clearTimeout(redirectTimer.current);
                  toast.dismiss(t);
                }}
              >
                Cancel Redirect
              </button>
            </div>
          ));

          // auto redirect to login in 5 sec
          redirectTimer.current = setTimeout(() => {
            toast.dismiss();
            router.push("/login");
          }, 5000);

          return; // stop execution
        }
        setStatus(errorMessage);
        toast.error(errorMessage, {
          className:
            "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.", {
          className:
            "!bg-red-600/70 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
      }
    }
  };

  const onError = async (errors: FieldErrors<SignupFormType>) => {
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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setValue("date_of_birth", selectedDate.toLocaleDateString(), {
        shouldValidate: true,
      });
      setIsPopoverOpen(false);
    } else {
      setValue("date_of_birth", "", { shouldValidate: true });
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="py-8 lg:p-8 ">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* First Name */}
            <div className="space-y-2">
              <Label>First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  className={`pl-10 h-11 border-slate-400 ${
                    errors.first_name
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  placeholder="Enter first name"
                  {...register("first_name")}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label>Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  className={`pl-10 h-11 border-slate-400 ${
                    errors.last_name
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  placeholder="Enter last name"
                  {...register("last_name")}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="block">Date of Birth</Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full ${
                      errors.date_of_birth
                        ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                        : "bg-transparent hover:bg-transparent border-slate-400"
                    } !px-3   h-11 justify-start`}
                  >
                    <span>
                      <Calendar className="h-5 w-5 text-gray-500 " />
                    </span>
                    {date ? (
                      <span className="ml-1 text-gray-800 text-sm font-[400]">
                        {date.toLocaleDateString()}
                      </span>
                    ) : (
                      <span
                        className={`ml-1 ${
                          errors.date_of_birth ? " text-red-400 " : ""
                        } text-gray-500 text-sm font-[400]`}
                      >
                        Select Date
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePick
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    captionLayout="dropdown"
                    className="rounded-lg border shadow-sm"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  className={`pl-10 h-11 border-slate-400 ${
                    errors.email
                      ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                      : ""
                  }`}
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="password"
                className={`pl-10 h-11 border-slate-400 ${
                  errors.password
                    ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                    : ""
                }`}
                placeholder="Enter password"
                {...register("password")}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="password"
                className={`pl-10 h-11 border-slate-400 ${
                  errors.confirmPassword
                    ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                    : ""
                }`}
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-3">
            <Checkbox onCheckedChange={(v) => setValue("agree", v === true)} />
            <label
              className={`text-sm text-gray-700 ${
                errors.agree ? "text-red-500" : ""
              }`}
            >
              I agree to the Terms and Conditions
            </label>
          </div>
          <Captcha
            onVerify={(valid) => {
              setCaptcha(valid);
              toast.success("Captcha verified!", {
                className:
                  "!bg-green-600/40 backdrop-blur-xl !text-slate-100 border !border-green-400/60",
              });
            }}
          />
          <Button
            isLoading={isSubmitting}
            disabled={!captcha || isSubmitting}
            className={cn(
              "w-full h-11 text-white transition",

              !status
                ? "bg-secondary hover:bg-secondary/80"
                : status === "success"
                ? "bg-green-600 hover:bg-green-500"
                : "bg-red-500 hover:bg-red-400"
            )}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
