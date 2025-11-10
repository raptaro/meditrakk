"use server";;
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editSecretary(secretaryId: string, data: { name: string }) {
  await prisma.secretary.update({
    where: { id: secretaryId },
    data,
  });

  revalidatePath("/secretary-management");
}

export async function addSecretary(formData: FormData) {
  const name = formData.get("name") as string;

  await prisma.secretary.create({
    data: {
      name,
    },
  });
  revalidatePath("/secretary-management");
}

export async function archiveSecretary(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.secretary.update({
    where: { id },
    data: { archived: true },
  });
  revalidatePath("/secretary-management");
}

export async function restoreSecretary(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.secretary.update({
    where: { id },
    data: { archived: false },
  });
  revalidatePath("/secretary-management");
}