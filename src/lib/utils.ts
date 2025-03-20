import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatRelativeDate(date: Date) {
  return formatDistanceToNowStrict(date, { addSuffix: true })
}

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}
