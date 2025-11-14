"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Treatment } from "@/app/types";
import { useRouter } from "next/navigation";
import { Eye, SquarePen } from "lucide-react";

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
      const t = row.original;
      const patient = t.patient;

      return (
        <div className="flex space-x-2">
          {/* View Button - Eye icon */}
          <button
            onClick={() =>
              router.push(`/doctor/treatment-details/${patient.patient_id}`)
            }
            className="rounded p-1" // optional hover background for feedback
          >
            <Eye className="h-5 w-5 text-green-500 hover:fill-green-500" />
          </button>

          {/* Update Button - SquarePen icon */}
          <button
            onClick={() =>
              router.push(
                `/doctor/treatment-form/${patient.patient_id}/${patient.queue_data?.queue_number}`
              )
            }
            className="rounded p-1"
          >
            <SquarePen className="h-5 w-5 text-blue-500 hover:fill-blue-500" />
          </button>
        </div>
      );
    },
  },
];
