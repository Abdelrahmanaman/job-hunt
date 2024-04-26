import prisma from "@/lib/prisma";
import JobListing from "@/components/JobListing";
import Link from "next/link";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface JobResultProps {
  filterValues: JobFilterValues;
}
export default async function JobResult({
  filterValues: { q, location, type, remote },
}: JobResultProps) {
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
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
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
    </div>
  );
}
