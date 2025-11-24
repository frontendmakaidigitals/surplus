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
import { ChevronDown } from "lucide-react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  FolderTree,
  BookOpen,
  Boxes,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
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
    {
      name: "Products",
      icon: Package,
      children: [
        {
          name: "Categories",
          href: "/dashboard/products/categories",
          icon: FolderTree,
        },
        {
          name: "Catalog",
          href: "/dashboard/products/catalog",
          icon: BookOpen,
        },
        {
          name: "Product",
          href: "/dashboard/manage-products/products",
          icon: Boxes,
        },
      ],
    },
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
              {adminRoutes.map(({ name, href, icon: Icon, children }) => {
                const isActive = pathname === href;

                // ⭐ If the route has children → render collapsible
                if (children) {
                  return (
                    <Collapsible
                      key={name}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={name}
                            className={cn(
                              "!h-12 !px-4 font-medium flex justify-between",
                              pathname.startsWith("/dashboard/products")
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-muted-foreground hover:bg-slate-400/10"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="!h-5 !w-5 shrink-0" />
                              <span>Manage {name}</span>
                            </div>

                            <ChevronDown className="h-4 w-4 transition-all group-data-[state=open]/collapsible:-rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="ml-10 flex flex-col gap-1">
                            {children.map(({ name, href, icon: ChildIcon }) => (
                              <Link
                                key={name}
                                href={href}
                                className={cn(
                                  "flex items-center gap-2 text-sm py-2 px-2 rounded",
                                  pathname === href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-slate-400/10"
                                )}
                              >
                                <ChildIcon className="h-4 w-4" />
                                {name}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // ⭐ Else render normal item
                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      tooltip={name}
                      className={cn(
                        "!h-12 !px-4 font-medium",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "text-muted-foreground hover:bg-slate-400/10"
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
