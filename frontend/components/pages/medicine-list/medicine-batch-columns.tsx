"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MedicineBatch } from "@/app/types";
import { EditMedicineBatch } from "./components/edit-medicine-batch";
import { FormattedDate } from "@/utils/formattedDate";

export const MedicineBatchColumns: ColumnDef<MedicineBatch>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <FormattedDate date={row.original.expiryDate} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const medicineBatch = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditMedicineBatch batch={medicineBatch} />
        </div>
      );
    },
  },
];
