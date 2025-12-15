"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SearchIcon, X } from "lucide-react";
import { products } from "../../../data";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../../data";
interface SearchNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SearchNav: React.FC<SearchNavProps> = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => {
        setSearchResults(filteredProducts);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search icon button */}
      <button
        onClick={() => setOpen(true)}
        className=" cursor-pointer items-center justify-center  rounded-full hover:bg-neutral-100 transition"
        aria-label="Open search"
      >
        <SearchIcon className="h-[22px] w-[22px] text-neutral-700" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed w-screen h-screen inset-0 z-[9999999] flex flex-col items-center justify-center p-6
							bg-white/40 backdrop-blur-2xl backdrop-saturate-100 backdrop-contrast-100"
            onClick={handleClose}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Close search"
            >
              <X className="h-6 w-6 text-red-500" />
            </button>

            <motion.div
              className={`w-full ${
                query.length > 0 ? "rounded-3xl" : "rounded-full"
              } shadow-sm border border-slate-600/10 bg-white overflow-hidden`}
              initial={{ opacity: 0, y: 150 }}
              animate={{
                opacity: 1,
                y: -150,
                maxWidth: "50vw",
                boxShadow:
                  query.length > 0
                    ? "0 15px 40px rgba(0,0,0,0.08)"
                    : "0 2px 10px rgba(0,0,0,0.04)",
              }}
              transition={{
                ease: [0.19, 1, 0.22, 1],
                duration: 0.7,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Container - Always rounded-3xl */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Input */}
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2">
                    <SearchIcon className="text-neutral-400 h-5 w-5" />
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-14 pr-5 py-5 text-base outline-none bg-transparent"
                    placeholder="Search for products..."
                    autoFocus
                  />
                </div>

                {/* Results */}
                <AnimatePresence>
                  {query.length > 0 && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="border-t border-slate-200 overflow-hidden"
                    >
                      <div className="px-6 py-4 max-h-[400px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm text-neutral-500 ">
                            {searchResults.length} results for "{query}"
                          </p>
                          {searchResults.length > 3 ? (
                            <Link
                              onClick={handleClose}
                              href={`/search?q=${query}`}
                              className="text-xs bg-secondary/90 px-3 py-[.3rem] rounded-full text-slate-50"
                            >
                              view all
                            </Link>
                          ) : null}
                        </div>
                        <ul className="space-y-1">
                          {searchResults.map((product, index) => (
                            <motion.li
                              key={product.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                ease: "easeOut",
                                duration: 0.4,
                              }}
                            >
                              <Link
                                onClick={handleClose}
                                href={`/product/${product.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="w-full flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50  text-left"
                              >
                                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={`/products/${product.images[0]}`}
                                    alt={product.name}
                                    width={24}
                                    height={24}
                                    unoptimized
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {product.category}
                                  </p>
                                </div>
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                        {searchResults.length === 0 && (
                          <p className="text-sm text-neutral-400 text-center py-8">
                            No products found
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
