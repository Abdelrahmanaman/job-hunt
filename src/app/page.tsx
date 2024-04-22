import JobListing from "@/components/JobListing";
import prisma from "@/lib/prisma";
export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
    </>
  );
}
