import JobFilter from "@/components/JobFilterBar";
import JobResult from "@/components/JobResult";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string,
    type?: string,
    location?: string,
    remote?: string
  }
}
export default async function Home({searchParams : {
  q,
  type,
  location,
  remote
}}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true"
  }
  
  return (
    <section className="m-auto my-10  max-w-5xl space-y-10 px-3">
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold ">Job hunt</h1>
        <span className="text-base text-muted-foreground">
          Finding your dream job starts here!
        </span>
      </div>
      <div className="flex flex-wrap gap-4 sm:flex-wrap md:flex-nowrap">
        <div className="w-full sm:w-full md:w-fit">
          <JobFilter filterValues={filterValues} />
        </div>
        <JobResult filterValues={filterValues} />
      </div>
    </section>
  );
}
