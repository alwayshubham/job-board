import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        createdAt: true,
        job: {
          select: {
            title: true, // 👈 include job title
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
