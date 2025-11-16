"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
  patient_name: string;
  doctor_name: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  status: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "doctor_name",
    header: "Doctor",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      // Map status to color
      const statusColor =
        status === "Scheduled" || status === "Completed"
          ? "bg-green-100 border-green-500"
          : status === "Pending"
          ? "bg-yellow-100 border-yellow-500"
          : status === "Cancelled"
          ? "bg-red-100 border-red-500"
          : "bg-gray-100 border-gray-500";

      return (
        <Badge
          variant="outline"
          className={`${statusColor} rounded-full dark:text-muted`}
        >
          {status}
        </Badge>
      );
    },
  },
];
