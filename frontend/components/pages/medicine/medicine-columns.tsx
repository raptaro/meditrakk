"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ViewMedicine } from "./components/view-medicine";
import { EditMedicine } from "./components/edit-medicine";
import { ArchiveMedicine } from "./components/archive-medicine";

export type Medicine = {
  id: string;
  name: string;
  description: string | null;
};

export const MedicineColumns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const medicine = row.original;

      return (
        <div className="flex items-center gap-2">
          <ViewMedicine medicine={medicine} />
          <EditMedicine medicine={medicine} />
          <ArchiveMedicine id={medicine.id} name={medicine.name} />
        </div>
      );
    },
  },
];
