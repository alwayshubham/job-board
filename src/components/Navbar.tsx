import Link from "next/link"
import Image from "next/image"

import logo from "@/assets/logos.jpg"
import { Button } from "./ui/button"

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={50} height={50} />
          <span className="text-xl font-bold tracking-tight">Jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a Job</Link>
        </Button>
      </nav>
    </header>
  )
}
