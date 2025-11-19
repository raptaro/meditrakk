"use server";
import { addEntity, editEntity } from "@/app/actions/crud";

export async function addService(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  await addEntity("service", { name, type }, "/service-management");
}

export async function editService(serviceId: string, data: { name: string; type: string }) {
  await editEntity("service", serviceId, data, "/service-management");
}
