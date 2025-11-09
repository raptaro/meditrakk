import { prisma } from "@/lib/prisma";
import { MedicineColumns } from "./medicine-type-columns";
import MedicineSummaryCards from "./components/medicine-summary-cards";
import { AddMedicineBatch } from "./components/add-medicine-batch";
import { DataTable } from "@/components/ui/data-table";
import { MedicineBatchColumns } from "./medicine-batch-columns";

export default async function MedicineList() {
  const medicineTypes = await prisma.medicineType.findMany();
  const medicineBatch = await prisma.medicineBatch.findMany({
    select: {
      id: true,
      batchNumber: true,
      quantity: true,
      expiryDate: true,
      medicine: {
        select: {
          name: true,
        },
      },
    },
  });

  const batches = medicineBatch.map((batch) => ({
    id: batch.id,
    batchNumber: batch.batchNumber,
    quantity: batch.quantity,
    expiryDate: batch.expiryDate,
    name: batch.medicine.name,
  }));

  return (
    <>
      <MedicineSummaryCards />
      <AddMedicineBatch />

      <DataTable
        title="Medicine List"
        columns={MedicineColumns}
        data={medicineTypes ?? []}
      />

      <DataTable
        title="Medicine Batch"
        columns={MedicineBatchColumns}
        data={batches ?? []}
      />
    </>
  );
}
