"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PropertiesPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(
  currentPage: number,
  totalPages: number
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export default function PropertiesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PropertiesPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-11 justify-start px-0 text-sm text-black/55 hover:bg-transparent hover:text-black disabled:opacity-40"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm text-black/35"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm transition-colors",
                currentPage === page
                  ? "bg-black/5 font-medium text-black"
                  : "text-black/50 hover:bg-black/[0.03] hover:text-black"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-11 justify-end px-0 text-sm text-black/55 hover:bg-transparent hover:text-black disabled:opacity-40"
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </nav>
  );
}
