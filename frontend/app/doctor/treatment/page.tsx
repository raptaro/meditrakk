"use client";
import useTreatments from "@/hooks/use-treatments";
import { DataTable } from "@/components/ui/data-table";
import { TreatmentColumns } from "./treatment-columns";

export default function MedicalRecords() {
  const treatments = useTreatments();

  return (
    <DataTable
      title="Treatments"
      columns={TreatmentColumns}
      data={treatments}
    />
  );
}
