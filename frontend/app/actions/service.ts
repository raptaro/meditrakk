"use server";
import { addEntity, editEntity, toggleArchive } from "@/app/actions/crud";
import { prisma } from "@/lib/prisma";

export async function addService(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  await addEntity("service", { name, type }, "/service-management");
}

export async function editService(serviceId: string, data: { name: string; type: string }) {
  await editEntity("service", serviceId, data, "/service-management");
}

export async function archiveService(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("service", id, true, "/service-management");
}

export async function restoreService(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("service", id, false, "/service-management");
}

export async function getServiceTypes() {
  const types = await prisma.service.findMany({
    where: { isArchived: false },
    distinct: ["type"],
    select: { type: true },
  });

  return types.map((t) => t.type);
}