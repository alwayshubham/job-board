import type { Metadata } from "next"

import type { JobFilter } from "@/lib/validations"
import JobsFilterSidebar from "@/components/JobsFilterSidebar"
import JobResults from "@/components/JobResults"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PageProps {
  searchParams: {
    search?: string
    type?: string
    location?: string
    remote?: string
  }
}

function getTitle({ search, type, location, remote }: JobFilter) {
  const titlePrefix = search
    ? `${search} jobs`
    : type
    ? `${type} jobs`
    : remote
    ? "Remote jobs"
    : "All jobs"

  const titleSuffix = location ? ` in ${location}` : ""

  return `${titlePrefix}${titleSuffix}`
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { search, type, location, remote } = await searchParams

  return {
    title: `${getTitle({
      search,
      type,
      location,
      remote: remote === "true",
    })} | Jobs`,
  }
}

export default async function Home(props: PageProps) {
  const { searchParams } = props
  const { search, type, location, remote } = await searchParams

  const filterValues: JobFilter = {
    search,
    type,
    location,
    remote: remote === "true",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            {getTitle(filterValues)}
          </CardTitle>
          <CardDescription className="text-xl mt-2">
            Browse through thousands of full-time or part-time jobs near you or
            worldwide.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col md:flex-row gap-8">
        <JobsFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </div>
    </main>
  )
}
