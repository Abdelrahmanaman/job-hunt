import JobFilter from "@/components/JobFilterBar";
import JobResult from "@/components/JobResult";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?:string;
  };
}
//* A function to dynamically show the search output
function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `Search result for "${q}"`
    : type
      ? `Search result for ${type} developer jobs`
      : remote
        ? "Search result for remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? ` in  ${location}` : "";
  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps) {
  //* Generate meta tags with page specific information
  return {
    title: `${getTitle({ q, type, location, remote: remote === "true" })} | Job hunt`,
    description: "Find your dream job on this platform.",
  };
}
export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <section className="m-auto my-10  max-w-5xl space-y-10 px-3">
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold ">{getTitle(filterValues)}</h1>
        <span className="text-base text-muted-foreground">
          Finding your dream job starts here!
        </span>
      </div>
      <div className="flex flex-wrap gap-4 sm:flex-wrap md:flex-nowrap">
        <div className="w-full sm:w-full md:w-fit">
          <JobFilter filterValues={filterValues} />
        </div>
        <JobResult filterValues={filterValues} page={page? parseInt(page) : undefined}  />
      </div>
    </section>
  );
}
