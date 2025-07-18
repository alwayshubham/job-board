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
  const resolvedParams = await searchParams; // <- ✅ Await here
  const { search, type, location, remote } = resolvedParams || {};

  return {
    title: `${getTitle({
      search,
      type,
      location,
      remote: remote === "true",
    })} | Jobs`,
  };
}


export default async function Home(props: PageProps) {
  const { searchParams } = props
  const resolvedProps = await searchParams; 
  const { search, type, location, remote } = resolvedProps 

  const filterValues: JobFilter = {
    search,
    type,
    location,
    remote: remote === "true",
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
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