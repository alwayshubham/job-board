import { Prisma } from "@prisma/client"

import type { JobFilter } from "@/lib/validations"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import JobListItem from "./JobsListItem"

interface JobResultsProps {
  filterValues: JobFilter
}

export default async function JobResults({
  filterValues: { search, type, location, remote },
}: JobResultsProps) {
  const searchString = search
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ")

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { companyName: { contains: searchString } },
          { type: { contains: searchString } },
          { locationType: { contains: searchString } },
          { location: { contains: searchString } },
        ],
      }
    : {}

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>
          {jobs.length} Job{jobs.length !== 1 && "s"} Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
          {jobs.length === 0 && (
            <p className="text-center text-muted-foreground">
              No jobs found with the selected filters.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
