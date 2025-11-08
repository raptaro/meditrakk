import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all users who are not yet doctors
    const users = await prisma.user.findMany({
      where: {
        doctor: null, // Only users without a linked doctor record
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
