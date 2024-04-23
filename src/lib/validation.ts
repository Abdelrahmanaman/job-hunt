import { z } from "zod";
import { jobTypes, locationTypes } from "./jobTypes";

const requireString = z.string().min(1, "Required");
const companyLogoScheme = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "File must be an image",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 3;
  }, "File must be less than 3MB");
const numericRequire = requireString.regex(/^\d+/, "Must be a number");
const applicationScheme = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or  URL is required",
    path: ["applicationEmail"],
  });
const locationScheme = z
  .object({
    locationType: requireString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );
export const createJobScheme = z
  .object({
    title: requireString.max(100),
    type: requireString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requireString.max(100),
    description: z.string().max(6000).optional(),
    companyLogo: companyLogoScheme,
    salary: numericRequire.max(9, "Number can't exceed 9 digits"),
  })
  .and(applicationScheme)
  .and(locationScheme);

export type CreateJobValues = z.infer<typeof createJobScheme>;
export const jobFilterScheme = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterScheme>;
