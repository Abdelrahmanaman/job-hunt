import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Banknote, BriefcaseBusiness, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { Job } from "@prisma/client";
import Markdown from "./Markdown";
interface JobPostProps {
  post: Job;
}
export default function JobPost({
  post: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
  },
}: JobPostProps) {
  return (
    <section className="m-auto my-10  max-w-5xl space-y-10 px-3 text-purple-900">
      <h1 className="text-4xl font-bold ">{title}</h1>
      {applicationUrl ? (
        <Link
          href={applicationUrl}
          className=" text-xl font-medium text-muted-foreground hover:text-purple-700 hover:underline"
        >
          {companyName}
        </Link>
      ) : (
        <span className=" text-xl font-medium text-muted-foreground ">
          {companyName}
        </span>
      )}
      <div className="flex flex-col gap-2 md:flex-row">
        <Image
          src={companyLogoUrl || "/company-logo.svg"}
          width={200}
          height={200}
          alt={`${companyName} logo`}
          className="block rounded-lg object-cover"
        />
        <div>
          <div className="space-y-4 text-muted-foreground md:w-96">
            <div className="flex flex-wrap gap-2">
              <p className="flex items-center gap-2 rounded-lg border border-purple-200 bg-muted/60 p-2 ">
                <BriefcaseBusiness className="size-4 shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-2 rounded-lg border border-purple-200 bg-muted/60 p-2 ">
                <MapPin className="size-4 shrink-0" />
                {locationType}
              </p>
              <p className="flex items-center gap-2 rounded-lg border border-purple-200 bg-muted/60 p-2 ">
                <Globe className="size-4 shrink-0" />
                {location || "Worldwide"}
              </p>
              <p className="flex items-center gap-2 rounded-lg border border-purple-200 bg-muted/60 p-2 ">
                <Banknote className="size-4 shrink-0" />
                {formatCurrency(salary)}
              </p>
            </div>
          </div>
          <span className="absolute right-8 top-6 hidden rounded bg-muted p-2 text-sm font-medium text-muted-foreground md:flex">
            {type}
          </span>
        </div>
      </div>
      {description && (
        <div>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </section>
  );
}
