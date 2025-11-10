"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FormattedDate } from "@/utils/formattedDate";

export interface MedicineTypeWithComputed {
  id: string;
  name: string;
  form: string;
  strength: string;
  available_quantity: number;
  next_expiry: string;
  expiring_batch_number: string;
}

export const MedicineColumns: ColumnDef<MedicineTypeWithComputed>[] = [
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
  {
    accessorKey: "available_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        <span className="font-bold">Available Quantity</span>
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "next_expiry",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        <span className="font-bold">Next Expiry</span>
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <FormattedDate date={row.original.next_expiry} />, // use your component here
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue("next_expiry") || 0).getTime();
      const dateB = new Date(b.getValue("next_expiry") || 0).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "earliest_batch_number",
    header: "Expiring Batch #",
    cell: ({ row }) => row.original.expiring_batch_number,
  },
];
