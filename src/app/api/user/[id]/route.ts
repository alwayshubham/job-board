import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
