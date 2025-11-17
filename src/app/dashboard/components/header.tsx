"use client";
import React from "react";
import { SidebarTrigger } from "@/ui/shadcn/sidebar";
import { User2Icon } from "lucide-react";
import RootLayoutWrapper from "@/ui/rootlayout";

const Header = () => {
  return (
    <RootLayoutWrapper>
      <div className="w-full py-2 flex justify-between items-center ">
        <SidebarTrigger />

        <div className=" gap-2 flex justify-center items-center">
          <div className=" border border-slate-600/50 size-8 flex justify-center items-center  rounded-full ">
            <User2Icon className="size-[18px]" />
          </div>
          <span className=" flex items-center gap-2">Sulphur </span>
        </div>
      </div>
    </RootLayoutWrapper>
  );
};

export default Header;
