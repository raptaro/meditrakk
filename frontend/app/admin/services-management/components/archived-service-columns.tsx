"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/app/types";
import { EditService } from "../components/edit-service";
import { RestoreService } from "../components/restore-service";

export const ArchivedServiceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const service = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditService service={service} />
          <RestoreService id={service.id} name={service.name} />
        </div>
      );
    },
  },
];
