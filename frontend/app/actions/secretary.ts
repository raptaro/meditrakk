"use server";
import { addEntity, editEntity, toggleArchive } from "@/app/actions/crud";

export async function addSecretary(formData: FormData) {
  const name = formData.get("name") as string;

  await addEntity("secretary", { name }, "/secretary-management");
}

export async function editSecretary(secretaryId: string, data: { name: string }) {
  await editEntity("secretary", secretaryId, data, "/secretary-management");
}

export async function archiveSecretary(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("secretary", id, true, "/secretary-management");
}

export async function restoreSecretary(formData: FormData) {
  const id = formData.get("id") as string;
  await toggleArchive("secretary", id, false, "/secretary-management");
}
