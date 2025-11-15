"use client";
import { ColumnDef } from "@tanstack/react-table";

interface Schedule {
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface DoctorProfile {
  specialization: string;
  schedules: Schedule[];
}

interface Doctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  doctor_profile?: DoctorProfile; // make optional in case it's missing
}

export const DoctorColumns: ColumnDef<Doctor>[] = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Specialization",
    accessorFn: (row) =>
      row.doctor_profile?.specialization ?? "No specialization",
    cell: ({ getValue }) => getValue(),
  },
  {
    header: "Schedules",
    accessorFn: (row) => row.doctor_profile?.schedules ?? [],
    cell: ({ getValue }) => {
      const schedules = getValue() as Schedule[];
      if (!schedules.length) return "No schedule";
      return (
        <ul className="list-disc pl-5">
          {schedules.map((s, i) => (
            <li key={i}>
              {s.day_of_week}: {s.start_time.substring(0, 5)} -{" "}
              {s.end_time.substring(0, 5)}
            </li>
          ))}
        </ul>
      );
    },
  },
];
