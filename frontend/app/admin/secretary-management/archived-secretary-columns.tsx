"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Secretary } from "@/app/types";
import { EditSecretary } from "./components/edit-secretary";
import { RestoreSecretary } from "./components/restore-secretary";

export const ArchivedSecretaryColumns: ColumnDef<Secretary>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const secretary = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditSecretary secretary={secretary} />
          <RestoreSecretary id={secretary.id} name={secretary.name} />
        </div>
      );
    },
  },
];
