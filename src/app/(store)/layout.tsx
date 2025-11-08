import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/cart-context";
import Footer from "@/ui/footer/footer";
import { Nav } from "@/ui/nav/nav";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <CartProvider>
      <Nav />
      <TooltipProvider>
        <main className="pt-2">{children}</main>
        <Footer />
      </TooltipProvider>
    </CartProvider>
  );
}
