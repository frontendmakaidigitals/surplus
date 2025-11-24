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
  return (
    <section className="mt-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                onPageChange?.(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
