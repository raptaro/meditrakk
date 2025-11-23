"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addService(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  await prisma.service.create({
    data: { name, type },
  });

  revalidatePath("/admin/service-management");
}

export async function editService(
  serviceId: string,
  data: { name: string; type: string }
) {
  await prisma.service.update({
    where: { id: serviceId },
    data,
  });

  revalidatePath("/admin/service-management");
}

export async function archiveService(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.service.update({
    where: { id },
    data: { isArchived: true },
  });

  revalidatePath("/admin/service-management");
}

export async function restoreService(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.service.update({
    where: { id },
    data: { isArchived: false },
  });

  revalidatePath("/admin/service-management");
}

export async function getServiceTypes() {
  const types = await prisma.service.findMany({
    where: { isArchived: false },
    distinct: ["type"],
    select: { type: true },
  });

  return types.map((t) => t.type);
}
