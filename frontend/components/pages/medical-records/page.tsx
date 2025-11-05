"use client";

import { DataTable } from "@/components/ui/data-table";
import { PatientColumns } from "./patient-columns";
import usePatients from "@/hooks/use-patients";
import { StatusFilter } from "./status-filter";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Patient } from "./patient-columns";

export default function MedicalRecords() {
  const patients = usePatients();
  console.log(patients);

  // Explicitly type the mapped columns
  const columnsWithFilter: ColumnDef<Patient>[] = PatientColumns.map((col) => {
    if (col.id === "status") {
      return {
        ...col,
        header: ({ column }: { column: Column<Patient, unknown> }) => (
          <StatusFilter column={column} data={patients} />
        ),
        id: col.id,
      };
    }
    return col;
  });

  return (
    <DataTable title="Patients" columns={columnsWithFilter} data={patients} />
  );
}
