"use client";

import { useState } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  UserIcon,
  ShoppingBag,
  Edit,
  Phone,
  LogOut,
  ChevronDown,
  List,
} from "lucide-react";

interface UserMenuProps {
  isLoggedIn: boolean;
  user: any;
  logout: () => void;
}

// Define deterministic colors for letters A-Z
const letterColors: Record<string, string> = {
  A: "bg-red-500",
  B: "bg-orange-500",
  C: "bg-yellow-500",
  D: "bg-green-500",
  E: "bg-teal-500",
  F: "bg-blue-500",
  G: "bg-indigo-500",
  H: "bg-purple-500",
  I: "bg-pink-500",
  J: "bg-red-600",
  K: "bg-orange-600",
  L: "bg-yellow-600",
  M: "bg-green-600",
  N: "bg-teal-600",
  O: "bg-blue-600",
  P: "bg-indigo-600",
  Q: "bg-purple-600",
  R: "bg-pink-600",
  S: "bg-red-700",
  T: "bg-orange-700",
  U: "bg-yellow-700",
  V: "bg-green-700",
  W: "bg-teal-700",
  X: "bg-blue-700",
  Y: "bg-indigo-700",
  Z: "bg-purple-700",
};

export default function UserMenu({ isLoggedIn, user, logout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <Link href="/login">
        <UserIcon className="h-[22px] w-[22px] hover:text-neutral-500" />
      </Link>
    );
  }

  // Get first letter and color
  const firstLetter = (user.first_name || "U")[0].toUpperCase();
  const bgColor = letterColors[firstLetter] || "bg-gray-400";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex border rounded-lg px-1.5 py-1 border-slate-500/30 text-sm font-medium hover:bg-slate-100 data-[state=open]:bg-slate-100 items-center gap-2">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold ${bgColor}`}
        >
          {firstLetter}
        </div>
        <p className="capitalize">{user.first_name || "User"}</p>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44">
        <DropdownMenuItem className="py-[.6rem]">
          <Link
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            href={{
              pathname: "/my-account",
              query: "edit-profile",
            }}
          >
            <List className="!size-[20px] mr-2 text-secondary" />
            Wishlist
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="py-[.6rem]">
          <Link
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            href={{
              pathname: "/my-account",
              query: "edit-profile",
            }}
          >
            <ShoppingBag className="!size-[20px] mr-2 text-secondary" />
            Orders
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="py-[.6rem]">
          <Link
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            href={{
              pathname: "/my-account",
              query: "action=edit-profile",
            }}
          >
            <Edit className="!size-[20px] mr-2 text-secondary" />
            Edit Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="py-[.6rem]">
          <Phone className="!size-[20px] mr-2 text-secondary" />
          Contact Us
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            setOpen(false);
            logout();
          }}
          className="py-[.6rem] hover:!bg-red-500 group hover:!text-white"
        >
          <LogOut className="!size-[20px] mr-2 text-secondary group-hover:!text-white" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
