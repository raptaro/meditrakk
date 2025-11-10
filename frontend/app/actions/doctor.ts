"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editDoctor(doctorId: string, data: { name: string, field: string }) {
  await prisma.doctor.update({
    where: { id: doctorId },
    data,
  });

  revalidatePath("/doctor-management");
}

export async function addDoctor(formData: FormData) {
  const name = formData.get("name") as string;
  const field = formData.get("field") as string;

  await prisma.doctor.create({
    data: {
      name,
      field,
    },
  });
  revalidatePath("/doctor-management");
}

export async function archiveDoctor(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.doctor.update({
    where: { id },
    data: { archived: true },
  });
  revalidatePath("/doctor-management");
}

export async function restoreDoctor(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.doctor.update({
    where: { id },
    data: { archived: false },
  });
  revalidatePath("/doctor-management");
}