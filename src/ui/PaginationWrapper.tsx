"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import clsx from "clsx";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function PaginationWrapper({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationWrapperProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <section className="mt-5">
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (isFirstPage) {
                  e.preventDefault();
                  return;
                }
                onPageChange?.(currentPage - 1);
              }}
              className={clsx(
                "transition",
                isFirstPage &&
                  "pointer-events-none opacity-50 cursor-not-allowed"
              )}
            />
          </PaginationItem>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  onClick={(e) => {
                    if (isActive) {
                      e.preventDefault();
                      return;
                    }
                    onPageChange?.(page);
                  }}
                  className={clsx(
                    isActive && "pointer-events-none cursor-default"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 5 && <PaginationEllipsis />}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (isLastPage) {
                  e.preventDefault();
                  return;
                }
                onPageChange?.(currentPage + 1);
              }}
              className={clsx(
                "transition",
                isLastPage &&
                  "pointer-events-none opacity-50 cursor-not-allowed"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
