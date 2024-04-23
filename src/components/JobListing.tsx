import { Job } from "@prisma/client";
import Image from "next/image";
import {
  Banknote,
  BriefcaseBusiness,
  Clock,
  Globe,
  MapPin,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
interface JobListingProps {
  job: Job;
}
const JobListing = ({
  job: {
    title,
    description,
    salary,
    type,
    companyLogoUrl,
    companyName,
    location,
    locationType,
    createdAt,
  },
}: JobListingProps) => {
  return (
    <article className="relative flex cursor-pointer flex-wrap items-center gap-4 rounded-lg border-2 p-5 hover:bg-muted/60">
      <Image
      priority
        src={companyLogoUrl || "/company-logo.svg"}
        alt={`${companyName} Logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-4 text-muted-foreground">
        <div>
          <h2 className="text-xl font-medium text-black">{title}</h2>
          <p>{companyName}</p>
        </div>
        <div className="">
          <p className="flex items-center gap-2 sm:hidden">
            <BriefcaseBusiness className="size-4 shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-2">
            <Globe className="size-4 shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-2">
            <Banknote className="size-4 shrink-0" />
            {formatCurrency(salary)}
          </p>
        </div>
      </div>
      <span className="absolute right-8 top-6 hidden rounded bg-muted p-2 text-sm font-medium text-muted-foreground md:flex">
        {type}
      </span>
      <span className="absolute bottom-2 right-4 flex items-center  gap-1.5 rounded-lg text-xs font-medium text-muted-foreground/75 sm:right-4 md:right-8 md:text-sm">
        <Clock className="size-4" />
        {formatDate(createdAt)}
      </span>
    </article>
  );
};

export default JobListing;
