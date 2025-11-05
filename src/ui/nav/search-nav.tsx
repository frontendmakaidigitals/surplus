"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchNav: React.FC<SearchNavProps> = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup when unmounted or when closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <>
      {/* Search icon button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition"
        aria-label="Open search"
      >
        <SearchIcon className="h-5 w-5 text-neutral-700" />
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
							bg-white/40 backdrop-blur backdrop-saturate-100 backdrop-contrast-100"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100"
              aria-label="Close search"
            >
              <XIcon className="h-6 w-6 text-neutral-700" />
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
            >
              {/* Input */}
              <div className="w-full relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <SearchIcon className="text-neutral-500" />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-[.9rem] text-base rounded-full outline-none"
                  placeholder="Search for products..."
                  autoFocus
                />
              </div>

              {/* ✅ AnimatePresence controls the results area */}
              <AnimatePresence mode="sync">
                {query.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "fit-content",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="px-5 rounded-b-3xl text-sm text-neutral-600 border-t border-slate-100 bg-white overflow-y-auto"
                  >
                    <div className="space-y-2 px-5 py-3">
                      <p>Showing results for “{query}”</p>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <p key={i}>Product {i + 1}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
