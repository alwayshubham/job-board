import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Jobs",
    template: "%s | Jobs",
  },
  description: "Find your dream job",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`min-w-[350px] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
