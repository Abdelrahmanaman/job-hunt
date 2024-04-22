import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, BriefcaseBusiness, Clock, Globe, MapPin } from 'lucide-react';
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
    <article className="relative flex gap-4 items-center cursor-pointer rounded-lg border-2 p-5 hover:bg-muted/60">
      <Image
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
      <span className="absolute hidden md:flex top-6 font-medium right-8 rounded bg-muted text-sm p-2 text-muted-foreground">
        {type}
      </span>
      <span className="absolute gap-1.5 bottom-2 sm:right-4 right-4  md:right-8 rounded-lg text-muted-foreground/75 flex items-center md:text-sm text-xs font-medium">
        <Clock className="size-4" />
        {formatDate(createdAt)}
      </span>
    </article>
  );
};

export default JobListing;
