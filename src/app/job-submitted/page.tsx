import H1 from "@/components/ui/h1"

export default function Page() {
  return (
    <main className="m-auto max-w-5xl my-10 space-y-5 px-3 text-center">
      <H1>Job Submitted</H1>
      <p className="text-lg">
        Your job has been submitted and is pending approval.
      </p>
    </main>
  )
}
