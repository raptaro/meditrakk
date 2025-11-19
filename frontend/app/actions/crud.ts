"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type PrismaModel = keyof typeof prisma;

// create
export async function addEntity<T extends PrismaModel>(
  model: T,
  data: Record<string, any>,
  path: string
) {
  await (prisma[model] as any).create({ data });
  revalidatePath(path);
}

// update
export async function editEntity<T extends PrismaModel>(
  model: T,
  id: string,
  data: Record<string, any>,
  path: string
) {
  await (prisma[model] as any).update({
    where: { id },
    data,
  });
  revalidatePath(path);
}

// delete
export async function toggleArchive<T extends PrismaModel>(
  model: T,
  id: string,
  isArchived: boolean,
  path: string
) {
  await (prisma[model] as any).update({
    where: { id },
    data: { isArchived },
  });
  revalidatePath(path);
}
