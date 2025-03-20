import { z } from "zod"
import {
  JOBS_TYPES as jobTypes,
  LOCATIONS_TYPES as locations_types,
} from "@/constants/jobs.types"

const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`)

const numberRequiredString = requiredString("Number").regex(
  /^\d+$/,
  "Must be a number"
)

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2
  }, "File size must be less than 2MB")

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

const locationSchema = z
  .object({
    locationType: requiredString("Location Type").refine(
      (locationType) => locations_types.includes(locationType),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required",
      path: ["location"],
    }
  )

const applicationSchema = z
  .object({
    applicationEmail: z
      .string()
      .email()
      .max(100)
      .email()
      .optional()
      .or(z.literal("")),
    applicationUrl: z.string().url().max(100).optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required",
    path: ["applicationEmail"],
  })

export const createJobSchema = z
  .object({
    title: requiredString("Title").max(100),
    type: requiredString("Type").refine(
      (type) => jobTypes.includes(type),
      "Invalid job type"
    ),
    companyName: requiredString("Company Name").max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numberRequiredString.max(9, "Salary is too long"),
  })
  .and(applicationSchema)
  .and(locationSchema)

export type JobFilter = z.infer<typeof jobFilterSchema>
export type CreateJob = z.infer<typeof createJobSchema>
