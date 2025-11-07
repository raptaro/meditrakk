import { prisma } from "@/lib/prisma";
import { MedicineBatchColumns } from "../medicine-batch-columns";
import { AddMedicineBatch } from "./add-medicine-batch";
import { DataTable } from "@/components/ui/data-table";

export default async function MedicineList() {
  const medicineBatches = await prisma.medicineBatch.findMany();

  return (
    <>
      <AddMedicineBatch />

      <DataTable
        title="Medicine Batch List"
        columns={MedicineBatchColumns}
        data={medicineBatches ?? []}
      />
    </>
  );
}
