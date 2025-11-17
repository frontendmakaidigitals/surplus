"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/ui/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const adminRoutes = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" className="pt-5">
      {/* Header */}
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center justify-start transition-all duration-300",
            state === "collapsed" ? "py-4" : "py-3 px-4"
          )}
        >
          {state === "collapsed" ? (
            <Image
              src="/Logo-crop.png"
              alt="Logo"
              width={28}
              height={28}
              className="object-contain transition-all ml-1 duration-300"
            />
          ) : (
            <div className="w-full px-6">
              <Logo className="w-full" />
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminRoutes.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      tooltip={name}
                      className={cn(
                        "!h-12 !px-4 font-medium",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "text-muted-foreground hover:bg-muted/30"
                      )}
                    >
                      <Link
                        href={href}
                        className="flex items-center gap-3 text-[.9rem]"
                      >
                        <Icon className="!h-5 !w-5 shrink-0" />
                        <span>{name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button
                onClick={() => {
                  localStorage.removeItem("userRole");
                  router.push("/login");
                }}
                className="flex justify-center items-center gap-3 w-full"
              >
                <LogOut className="h-10 w-10" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
