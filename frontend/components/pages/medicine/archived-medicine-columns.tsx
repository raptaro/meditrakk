"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ViewMedicine } from "./components/view-medicine";
import { EditMedicine } from "./components/edit-medicine";
import { RestoreMedicine } from "./components/restore-medicine";

export type Medicine = {
  id: string;
  name: string;
  description: string | null;
};

export const ArchivedMedicineColumns: ColumnDef<Medicine>[] = [
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
          <RestoreMedicine id={medicine.id} name={medicine.name} />
        </div>
      );
    },
  },
];
