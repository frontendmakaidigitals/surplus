"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorResponse() {
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [name, value] = current.split("=");
      if (name) {
        acc[name] = decodeURIComponent(value ?? "");
      }
      return acc;
    }, {} as Record<string, string>);

    if (cookies.toast_message) {
      toast.error(cookies.toast_message, {
        className:
          "!bg-red-600/80 backdrop-blur-xl !text-slate-100 border !border-red-400/60",
      });
      document.cookie = "toast_message=; path=/; max-age=0";
    }
  }, []);

  return null;
}
