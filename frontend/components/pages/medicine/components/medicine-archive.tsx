import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { ArchivedMedicineColumns } from "../archived-medicine-columns";

export default async function MedicineList() {
  const medicines = await prisma.medicine.findMany({
    where: { archived: true },
  });

  return (
    <>
      <DataTable
        title="Archived Medicine List"
        columns={ArchivedMedicineColumns}
        data={medicines ?? []}
      />
    </>
  );
}
