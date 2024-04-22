import { Job } from "@prisma/client";
import Image from "next/image";
import { BriefcaseBusiness } from 'lucide-react';
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
    <article className=" flex cursor-pointer rounded-lg border-2 p-5 hover:bg-muted/60">
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
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4 shrink-0" />
            {type}
            
          </p>
        </div>
      </div>
    </article>
  );
};

export default JobListing;
