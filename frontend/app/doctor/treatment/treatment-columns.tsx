"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Treatment } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const TreatmentColumns: ColumnDef<Treatment>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const p = row.original.patient;
      return `${p.first_name} ${p.middle_name ?? ""} ${p.last_name}`;
    },
  },

  {
    accessorKey: "complaint",
    header: "Complaint",
    cell: ({ row }) => row.original.patient.queue_data?.complaint ?? "N/A",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.patient.queue_data?.status ?? "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const t = row.original; // treatment object
      const patient = t.patient;

      return (
        <div className="flex space-x-2">
          {/* UPDATE */}
          <Button
            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
            onClick={() =>
              router.push(
                `/doctor/treatment-form/${patient.patient_id}/${patient.queue_data?.queue_number}`
              )
            }
          >
            Update
          </Button>

          {/* VIEW DETAILS */}
          <Button
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            onClick={() =>
              router.push(`/doctor/treatment-details/${patient.patient_id}`)
            }
          >
            View
          </Button>
        </div>
      );
    },
  },
];
