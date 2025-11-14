"use client";

import { DataTable } from "@/components/ui/data-table";
import { TreatmentColumns } from "./treatment-columns";
import useTreatments from "@/hooks/use-treatments";

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
