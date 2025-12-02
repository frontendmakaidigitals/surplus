"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/shadcn/card";
import { Label } from "@/ui/shadcn/label";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/ui/shadcn/input";
import z from "zod";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/shadcn/button";
import Link from "next/link";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/login-action";
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Minimum 3 characters required"),
});

type LoginFormType = z.infer<typeof loginSchema>;
const fieldOrder: (keyof LoginFormType)[] = ["password", "email"];
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  const [status, setStatus] = useState<string | null>(null);

  const [pending, startTransition] = useTransition();
  const onSubmit = async (data: LoginFormType) => {
    startTransition(async () => {
      const res = await loginAction(data);

      if (res.success) {
        toast.success("Successfully logged in!", {
          className:
            "!bg-green-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
        });
        router.push("/my-account");
        return;
      }
      setStatus("Username or password is incorrect");
      toast.error("Username or password is incorrect", {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-200",
      });
    });
  };
  const onError = async (errors: FieldErrors<LoginFormType>) => {
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
    <Card className="py-5 shadow-md border rounded-2xl">
      <CardHeader>
        <h2 className="text-3xl font-semibold text-center">
          Login to your account
        </h2>
      </CardHeader>
      <CardContent className="">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-2">
          {/* EMAIL */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter your email"
                className={`pl-10 h-11 transition-all ${
                  errors.email
                    ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                    : "border-gray-300"
                }`}
                {...register("email")}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5 mt-3">
            <Label className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter password"
                className={`pl-10 h-11 transition-all ${
                  errors.password
                    ? "border-red-500/20 bg-red-100 placeholder:text-red-400 "
                    : "border-gray-300"
                }`}
                {...register("password")}
              />
            </div>
          </div>

          {/* RESET PASSWORD */}
          <div className="text-sm mt-3">
            <span>Forgot your password? </span>
            <Link href="/reset-password" className="text-blue-700 font-medium">
              Reset It
            </Link>
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            isLoading={pending}
            className={cn(
              `w-full h-11 text-white  bg-secondary hover:bg-secondary/80`,
              status ? "bg-red-500 text-slate-50 hover:bg-red-400" : ""
            )}
          >
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter className="">
        <p className="text-xs text-center text-gray-500 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-blue-700">
            Terms Of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-700">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
