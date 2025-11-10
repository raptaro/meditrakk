import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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