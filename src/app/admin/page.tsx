import prisma from "@/lib/prisma";
import Link from "next/link";
import JobListing from "@/components/JobListing";
import Image from "next/image";
export default async function Page() {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  return (
    <section className="space-y-4 p-4">
      {unapprovedJobs.length ? (
        unapprovedJobs.map((job) => (
          <Link
            className="block"
            key={job.slug}
            href={`admin/job-approval/${job.slug}`}
          >
            <JobListing job={job} />
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image
            src={"/no-job.svg"}
            alt="No jobs"
            height={600}
            width={600}
            priority
          />
          <h1 className=" text-2xl md:text-5xl font-extrabold tracking-wide text-purple-900">
            No Job Posting available
          </h1>
        </div>
      )}
    </section>
  );
}
