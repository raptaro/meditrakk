"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPatient(formData: FormData) {
  const dobString = formData.get("dateOfBirth") as string;

  await prisma.patient.create({
    data: {
      name: formData.get("name") as string,
      gender : formData.get("gender") as string,
      dateOfBirth: dobString ? new Date(dobString) : null,
    },
  });
}

export async function addMedicineBatch(formData: FormData) {
  const medicineTypeId = formData.get("medicineTypeId") as string;
  const batchNumber = formData.get("batchNumber") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const quantity = Number(formData.get("quantity"));

  if (!medicineTypeId || !batchNumber || !expiryDate || !quantity) {
    throw new Error("All fields are required");
  }

  await prisma.medicineBatch.create({
    data: {
      medicine: { connect: { id: medicineTypeId } },
      batchNumber,
      expiryDate: new Date(expiryDate),
      quantity,
    },
  });

  revalidatePath("/medicines");
}

export async function editMedicineBatch(
  id: string,
  data: { batchNumber: string; quantity: number; expiryDate: Date }
) {
  await prisma.medicineBatch.update({
    where: { id },
    data,
  });

  revalidatePath("/medicines");
}

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
}

export async function editPost(formData: FormData) {
  const id = formData.get("id") as string;
  
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  
  await prisma.post.delete({ 
    where: { id } 
  });
  
  revalidatePath("/posts");
  redirect("/posts");
}