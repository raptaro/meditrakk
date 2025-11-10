import { getMedicineList, getMedicineBatches } from "@/services/medicine";
import { MedicineColumns } from "./medicine-type-columns";
import { MedicineBatchColumns } from "./medicine-batch-columns";
import MedicineSummaryCards from "./components/medicine-summary-cards";
import { AddMedicineBatch } from "./components/add-medicine-batch";
import { DataTable } from "@/components/ui/data-table";

export default async function MedicineListPage() {
  const medicineData = await getMedicineList();
  const { unexpiredBatches, expiredBatches } = await getMedicineBatches();

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
