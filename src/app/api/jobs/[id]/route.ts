// app/api/jobs/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = Number(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("GET /api/jobs/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
