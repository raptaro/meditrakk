import { prisma } from "@/lib/prisma";

export async function getMedicineList() {
  const medicineTypes = await prisma.medicineType.findMany({
    include: {
      medicineBatch: {
        select: {
          quantity: true,
          expiryDate: true,
          batchNumber: true,
        },
      },
    },
  });

  const medicineData = medicineTypes.map((type) => {
    const validBatches = type.medicineBatch.filter(
      (batch) => new Date(batch.expiryDate) > new Date()
    );

    const availableQuantity = validBatches.reduce(
      (sum, batch) => sum + (batch.quantity ?? 0),
      0
    );

    const nextBatch =
      validBatches.length > 0
        ? validBatches.reduce((soonest, batch) =>
            new Date(batch.expiryDate) < new Date(soonest.expiryDate)
              ? batch
              : soonest
          )
        : null;

    return {
      id: type.id,
      name: type.name,
      form: type.form,
      strength: type.strength,
      available_quantity: availableQuantity,
      next_expiry: nextBatch
        ? new Date(nextBatch.expiryDate).toLocaleDateString()
        : "—",
      expiring_batch_number: nextBatch?.batchNumber ?? "—",
    };
  });

  return medicineData;
}

export async function getMedicineBatches() {
  const medicineBatch = await prisma.medicineBatch.findMany({
    select: {
      id: true,
      batchNumber: true,
      quantity: true,
      expiryDate: true,
      medicine: { select: { name: true } },
    },
  });

  const now = new Date();

  const allBatches = medicineBatch.map((batch) => ({
    id: batch.id,
    batchNumber: batch.batchNumber,
    quantity: batch.quantity,
    expiryDate: batch.expiryDate,
    name: batch.medicine.name,
  }));

  const unexpiredBatches = allBatches
    .filter((b) => new Date(b.expiryDate) > now)
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

  const expiredBatches = allBatches
    .filter((b) => new Date(b.expiryDate) <= now)
    .sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());

  return { unexpiredBatches, expiredBatches };
}
