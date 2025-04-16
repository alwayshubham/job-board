// app/api/apply/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

// Enable FormData parsing
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;
    const jobId = formData.get("jobId") as string; // ✅ ADD THIS LINE
    const file = formData.get("resume") as File;
    
    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid resume file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}.pdf`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filePath, buffer);
    const resumeUrl = `/uploads/${filename}`;

    // Save to DB
    await prisma.profile.create({
      data: {
        name,
        email,
        contact,
        address,
        resumeUrl,
        jobId: jobId ? parseInt(jobId.toString()) : null,
      },
    });

    return NextResponse.json({ message: "Application submitted" }, { status: 200 });
  } catch (err) {
    console.error("❌ Error saving form:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
