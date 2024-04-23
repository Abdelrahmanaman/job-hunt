import JobFilter from "@/components/JobFilterBar";
import JobListing from "@/components/JobListing";
import JobResult from "@/components/JobResult";
import prisma from "@/lib/prisma";
import Link from "next/link";
export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className="m-auto my-10  max-w-5xl space-y-10 px-3">
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold ">Job hunt</h1>
        <span className="text-base text-muted-foreground">
          Finding your dream job starts here!
        </span>
      </div>
      <div className="flex gap-4 sm:flex-wrap flex-wrap md:flex-nowrap">
        <div className="w-full sm:w-full md:w-fit">
          <JobFilter />
        </div>
        <JobResult/>
      </div>
    </section>
  );
}
