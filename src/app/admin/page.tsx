import prisma from "@/lib/prisma";
import Link from "next/link";
import JobListing from "@/components/JobListing";
export default async function Page() {
    const unapprovedJobs = await prisma.job.findMany({ where: { approved: false } });
  return (
    <section className="space-y-4 p-4">
      {unapprovedJobs.map((job) => (
        <Link
          className="block"
          key={job.slug}
          href={`admin/job-approval/${job.slug}`}
        >
          <JobListing job={job} />
        </Link>
      ))}
    </section>
  );
}
