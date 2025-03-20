import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const jobId = params.id; // Keep it as a string

  const job = await prisma.job.findUnique({
    where: { id: jobId }, // id stays a string
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

