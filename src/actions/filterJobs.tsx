"use server"

import { redirect } from "next/navigation"

import { jobFilterSchema } from "@/lib/validations"

export async function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries())
  const { search, type, location, remote } = jobFilterSchema.parse(values)

  const searchParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  })

  redirect(`/?${searchParams.toString()}`)
}
