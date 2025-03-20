import prisma from "@/lib/prisma"
import { type JobFilter } from "@/lib/validations"
import { filterJobs } from "@/actions/filterJobs"
import { JOBS_TYPES as jobTypes } from "@/constants/jobs.types"
import FormSubmitButton from "./FormSubmitButton"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"

interface JobFilterSidebarProps {
  defaultValues: JobFilter
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <Card className="sticky top-4 h-fit w-full md:w-[300px]">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={filterJobs}
          key={JSON.stringify(defaultValues)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              name="search"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.search}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              name="remote"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs only</Label>
          </div>
          <FormSubmitButton className="w-full">Apply filters</FormSubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
