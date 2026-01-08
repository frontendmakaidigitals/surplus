"use client";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/ui/shadcn/button";
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cart,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 h-screen w-screen backdrop-blur-sm bg-black/30"
          />

          {/* Sidebar */}
          <motion.div
            key="sidepanel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="fixed right-0 top-0 z-50 h-screen w-96 max-w-full bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Cart ({totalItems})</h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    disabled={totalItems === 0}
                    onClick={clearCart}
                    className=" text-xs h-8 px-3 hover:bg-red-400 bg-transparent rounded-full"
                  >
                    Clear Cart
                  </Button>

                  <Button
                    onClick={onClose}
                    variant={"ghost"}
                    className="rounded-full h-8 px-3 hover:bg-gray-100"
                    aria-label="Close cart"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {!cart.length ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Your cart is empty
                      </h3>
                      <p className="text-sm text-gray-500">
                        Start shopping to add items to your cart
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 border-b pb-4"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          {item.image_url ? (
                            <Image
                              src={`/products/${item.image_url}`}
                              alt={item.product_name || "Product"}
                              width={64}
                              height={64}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-6 w-6 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 truncate">
                            {item.product_name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatMoney({
                              amount: item.unit_price,
                              currency: "USD",
                              locale: "en-US",
                            })}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700 p-1"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                            <button
                              className="rounded-full p-1 hover:bg-gray-200"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              className="rounded-full p-1 hover:bg-gray-200"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>
                      {formatMoney({
                        amount: totalPrice,
                        currency: "USD",
                        locale: "en-US",
                      })}
                    </span>
                  </div>
                  <Button className="w-full h-11 ">Checkout</Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
