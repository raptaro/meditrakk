import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const types = await prisma.medicineType.findMany({
    select: { id: true, name: true },
  });
  return NextResponse.json(types);
}
