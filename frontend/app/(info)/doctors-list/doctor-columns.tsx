"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Doctor = {
  name: string;
  specialization: string | null;
  days_available: string | null;
  working_hours: string | null;
  status: string;
};

export const DoctorColumns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: "Doctor",
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
  },
  {
    accessorKey: "days_available",
    header: "Days Available",
  },
  {
    accessorKey: "working_hours",
    header: "Working Hours",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColor =
        status.toLowerCase() === "active"
          ? "bg-green-100 border-green-500"
          : status.toLowerCase() === "inactive"
          ? "bg-red-100 border-red-500"
          : status.toLowerCase() === "on leave"
          ? "bg-yellow-100 border-yellow-500"
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
