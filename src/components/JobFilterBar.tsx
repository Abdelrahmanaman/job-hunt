import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/jobTypes";
import { Button } from "./ui/button";
import { jobFilterScheme } from "@/lib/validation";
import { redirect } from "next/navigation";
async function filterJobs(formData: FormData) {
  "use server";
//   const values = Object.fromEntries(formData.entries());
//   const { q, type, location, remote } = jobFilterScheme.parse(values);
//   const searchParams = new URLSearchParams({
//     ...(q && { q: q.trim() }),
//     ...(type && { type }),
//     ...(location && { location }),
//     ...(remote && { remote: "true" })
//   });
//   redirect(`/?${searchParams.toString()}`)
  throw new Error("Error")
}
export default async function JobFilter() {
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
    <aside className="sticky top-4 rounded-lg border bg-background">
      <form action={filterJobs} className="p-4">
        <h2 className="sr-only">Filter search</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, Company, Salary, etc.."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type"> Type</Label>
            <Select name="type" id="type" className="text-black" defaultValue={""}>
              <option value="">
                All types
              </option>
              {jobTypes.map((type) => (
                <option  key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select name="location" id="location" className="text-black" defaultValue={""}>
              <option value="">
                All Locations
              </option>
              {availableLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
