import { prisma } from "@/lib/prisma";
import { MedicineColumns } from "./medicine-type-columns";
import MedicineSummaryCards from "./components/medicine-summary-cards";
import { AddMedicineBatch } from "./components/add-medicine-batch";
import { DataTable } from "@/components/ui/data-table";
import { MedicineBatchColumns } from "./medicine-batch-columns";

export default async function MedicineList() {
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
    const batches = type.medicineBatch;

    const validBatches = batches.filter(
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

  const medicineBatch = await prisma.medicineBatch.findMany({
    select: {
      id: true,
      batchNumber: true,
      quantity: true,
      expiryDate: true,
      medicine: {
        select: { name: true },
      },
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
    .sort(
      (a, b) =>
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    );

  const expiredBatches = allBatches
    .filter((b) => new Date(b.expiryDate) <= now)
    .sort(
      (a, b) =>
        new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
    );

  return (
    <>
      <MedicineSummaryCards />
      <AddMedicineBatch />

      <DataTable
        title="Medicine List"
        columns={MedicineColumns}
        data={medicineData}
        initialState={{
          sorting: [{ id: "available_quantity", desc: false }],
        }}
      />

      <DataTable
        title="Medicine Batch (Active)"
        columns={MedicineBatchColumns}
        data={unexpiredBatches}
      />

      <DataTable
        title="Medicine Batch (Expired)"
        columns={MedicineBatchColumns}
        data={expiredBatches}
      />
    </>
  );
}
