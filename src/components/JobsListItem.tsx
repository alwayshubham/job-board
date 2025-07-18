import Image from "next/image"
import Link from "next/link"
import type { Job } from "@prisma/client"
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  MapPin,
  ArrowRight,
} from "lucide-react"

import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png"
import { formatCurrency, formatRelativeDate } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"

export default function JobListItem({
  job: {
    id,
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: {
  job: Job
}) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={companyLogoUrl || companyLogoPlaceholder}
              alt={`${companyName} logo`}
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-muted-foreground mb-4">{companyName}</p>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{locationType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe2 className="h-4 w-4" />
                <span>{location || "Worldwide"}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Banknote className="h-4 w-4" />
                <span>{formatCurrency(salary, "INR")}/month</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{type}</Badge>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatRelativeDate(createdAt)}
          </span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/jobs/${id}`} target="_blank" rel="noopener noreferrer">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
