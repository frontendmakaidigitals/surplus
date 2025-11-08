"use client";
import { cn } from "@/lib/utils";

export default function RootLayoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}
