"use client";

import { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

interface UserMenuProps {
  isLoggedIn: boolean;
  user: any;
  logout: () => void;
}

export default function UserMenu({ isLoggedIn, user, logout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <Link href="/login" className="">
        <UserIcon className="h-[22px] w-[22px] hover:text-neutral-500" />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="border rounded-full p-1">
          <UserIcon className="h-5 w-5 hover:text-neutral-500" />
        </div>
      )}

      {/* Dropdown */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="flex rounded-lg px-3 py-[.4rem] text-sm font-medium hover:bg-neutral-100 items-center gap-2">
          <p>{user.first_name || "User"}</p>
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
    </div>
  );
}
