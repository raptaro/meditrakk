"use server";
import { addEntity, editEntity, toggleArchive } from "@/app/actions/crud";

export async function addDoctor(formData: FormData) {
  const name = formData.get("name") as string;
  const field = formData.get("field") as string;

  await addEntity("doctor", { name, field }, "/doctor-management");
}

export async function editDoctor(doctorId: string, data: { name: string; field: string }) {
  await editEntity("doctor", doctorId, data, "/doctor-management");
}

export async function archiveDoctor(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("doctor", id, true, "/doctor-management");
}

export async function restoreDoctor(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("doctor", id, false, "/doctor-management");
}
