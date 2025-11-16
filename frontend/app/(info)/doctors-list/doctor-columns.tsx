"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Doctor = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  doctor_profile: {
    specialization: string;
    schedules: Array<{
      day_of_week: string;
      start_time: string;
      end_time: string;
    }>;
  };
};

// Helper function to format time (remove seconds if :00)
const formatTime = (timeString: string): string => {
  if (!timeString) return "";
  if (timeString.endsWith(":00")) {
    return timeString.slice(0, -3);
  }
  return timeString;
};

export const DoctorColumns: ColumnDef<Doctor>[] = [
  {
    id: "name", // explicit id so any lookup for "name" succeeds
    header: "Doctor",
    accessorFn: (row) => `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim(),
    cell: ({ getValue }) => {
      const name = getValue() as string;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    cell: ({ getValue }) => <div className="text-sm">{getValue() as string}</div>,
  },
  {
    id: "specialization",
    header: "Specialization",
    // use accessorFn to safely reach nested data
    accessorFn: (row) => row.doctor_profile?.specialization ?? null,
    cell: ({ getValue }) => {
      const specialization = getValue() as string | null;
      return <div className="capitalize">{specialization || "Not specified"}</div>;
    },
  },
  {
    id: "days_available",
    header: "Days Available",
    accessorFn: (row) => row.doctor_profile?.schedules ?? [],
    cell: ({ getValue }) => {
      const schedules = getValue() as Doctor["doctor_profile"]["schedules"];
      const days = (schedules || []).map((s) => s.day_of_week);
      if (days.length === 0) {
        return <span className="text-muted-foreground">Not available</span>;
      }
      return <div>{days.join(", ")}</div>;
    },
  },
  {
    id: "working_hours",
    header: "Working Hours",
    accessorFn: (row) => row.doctor_profile?.schedules ?? [],
    cell: ({ getValue }) => {
      const schedules = getValue() as Doctor["doctor_profile"]["schedules"];
      if (!schedules || schedules.length === 0) {
        return <span className="text-muted-foreground">Not available</span>;
      }

      const uniqueHours = new Set(
        schedules.map((s) => `${s.start_time}-${s.end_time}`)
      );

      if (uniqueHours.size === 1) {
        const first = schedules[0];
        return (
          <div>
            {formatTime(first.start_time)} - {formatTime(first.end_time)}
          </div>
        );
      }

      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Varies by day
        </Badge>
      );
    },
  },
];
