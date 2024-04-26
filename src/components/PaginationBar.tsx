import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { JobFilterValues } from "@/lib/validation";
import React from "react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}
export default function PaginationBar({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationBarProps) {
  const generateDynamicParam = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${searchParams.toString()}`;
  };
  const pagesPerPage = 3; //* Number of jobs per page.
  const skip = (currentPage - 1) * pagesPerPage;
  const pageControllers = totalPages - skip - pagesPerPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={generateDynamicParam(currentPage - 1)}
            className={`${currentPage === 1 ? "pointer-events-none bg-gray-100 text-gray-300" : ""} `}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="rounded-lg bg-gray-200/75"
            href={generateDynamicParam(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={generateDynamicParam(currentPage + 1)}
            className={`${pageControllers > 1 ? "" : "pointer-events-none bg-gray-100 text-gray-300"} `}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={`${pageControllers > 1 ? "" : "pointer-events-none bg-gray-100 text-gray-300"} `}
            href={generateDynamicParam(currentPage + 2)}
          >
            {currentPage + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${pageControllers > 1 ? "" : "pointer-events-none bg-gray-100 text-gray-300"} `}
            href={generateDynamicParam(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
