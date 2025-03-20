import type { Metadata } from "next"

import NewJobForm from "./NewJobForm"

export const metadata: Metadata = {
  title: "New Job",
  description: "Create a new job",
}

export default function Page() {
  return <NewJobForm />
}
