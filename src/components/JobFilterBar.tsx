import { Input } from "./ui/input";
import { Label } from "./ui/label";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/jobTypes";
import { JobFilterValues, jobFilterScheme } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormStatusButton from "./FormStatusButton";
import SelectNoJs from "./ui/select-no-js";
async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { q, type, location, remote } = jobFilterScheme.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterProps {
  filterValues: JobFilterValues;
}
export default async function JobFilter({ filterValues }: JobFilterProps) {
  const availableLocation = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  return (
    <aside className="sticky top-20 rounded-lg border bg-background">
      <form
        action={filterJobs}
        key={JSON.stringify(filterValues)}
        className="p-4"
      >
        <h2 className="sr-only">Filter search</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, Company, Salary, etc.."
              defaultValue={filterValues.q || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type"> Type</Label>
            <SelectNoJs
              name="type"
              id="type"
              className="text-black"
              defaultValue={filterValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectNoJs>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <SelectNoJs
              name="location"
              id="location"
              className="text-black"
              defaultValue={filterValues.location || ""}
            >
              <option value="">All Locations</option>
              {availableLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </SelectNoJs>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={filterValues.remote || false}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormStatusButton type="submit" className="w-full">
            Filter Jobs
          </FormStatusButton>
        </div>
      </form>
    </aside>
  );
}
