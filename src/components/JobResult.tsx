import prisma from "@/lib/prisma";
import JobListing from "@/components/JobListing";
import Link from "next/link";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import PaginationBar from "./PaginationBar";

interface JobResultProps {
  filterValues: JobFilterValues;
  page?: number;
}
export default async function JobResult({
  filterValues,
  page = 1,
}: JobResultProps) {
  const { q, location, type, remote } = filterValues;
  const pagesPerPage = 4; //* Number of jobs per page.
  const skip = (page - 1) * pagesPerPage;
  const searchTerm = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  //* Creating a custom searchFilter where it takes the property of primsa type Where Input

  const searchFilter: Prisma.JobWhereInput = searchTerm
    ? {
        OR: [
          { title: { search: searchTerm } },
          { companyName: { search: searchTerm } },
          { type: { search: searchTerm } },
          { location: { search: searchTerm } },
          { locationType: { search: searchTerm } },
        ],
      }
    : {};
  //* This where is to check if the values of the AND Operator is combined with the Search filter
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: pagesPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where }); //* This return the count of the queries left, in order to built the pagination numbers logic

  const [jobs, totalCount] = await Promise.all([jobsPromise, countPromise])
  return (
    <div className="flex w-full flex-col gap-4">
      {jobs.length ? (
        jobs.map((job) => (
          <Link key={job.id} href={`jobs/${job.slug}`} className="block">
            <JobListing job={job} />
          </Link>
        ))
      ) : (
        <div className=" flex flex-col items-center">
          <Image
            src={"/search-result.svg"}
            alt="Error no search found"
            height={300}
            width={300}
            className="block size-96  object-cover"
          />
          <p className="text-3xl font-semibold text-muted-foreground">
            Oops, no result found!
          </p>
        </div>
      )}
      <PaginationBar filterValues={filterValues} totalPages={totalCount} currentPage={page} />
    </div>
  );
}
