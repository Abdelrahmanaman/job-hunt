import prisma from "@/lib/prisma";
import JobListing from "@/components/JobListing";
import Link from "next/link";

export default async function JobResult() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="w-full flex flex-col gap-4">
      {jobs.map((job) => (
        <Link key={job.id} href={"/"} className="">
          <JobListing job={job} />
        </Link>
      ))}
    </div>
  );
}
