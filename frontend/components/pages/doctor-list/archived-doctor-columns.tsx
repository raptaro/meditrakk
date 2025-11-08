"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Doctor } from "@/app/types";
import { EditDoctor } from "./components/edit-doctor";
import { RestoreDoctor } from "./components/restore-doctor";

export const ArchivedDoctorColumns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "field",
    header: "Field",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditDoctor doctor={doctor} />
          <RestoreDoctor id={doctor.id} name={doctor.name} />
        </div>
      );
    },
  },
];
