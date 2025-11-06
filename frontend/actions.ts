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

export async function addMedicine(formData: FormData) {
  await prisma.medicine.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/posts");
}

export async function editMedicine(id: string, data: { name: string; description: string }) {
  await prisma.medicine.update({
    where: { id },
    data,
  });

  revalidatePath("/medicines");
}

export async function archiveMedicine(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.medicine.update({
    where: { id },
    data: { archived: true },
  });
  revalidatePath("/medicines");
}

export async function restoreMedicine(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.medicine.update({
    where: { id },
    data: { archived: false },
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