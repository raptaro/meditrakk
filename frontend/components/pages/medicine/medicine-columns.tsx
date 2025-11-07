"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MedicineType } from "@/app/types";

export const MedicineColumns: ColumnDef<MedicineType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "form",
    header: "Form",
  },
  {
    accessorKey: "strength",
    header: "Strength",
  },
];
