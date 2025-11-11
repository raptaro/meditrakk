"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Secretary } from "@/app/types";
import { EditSecretary } from "./components/edit-secretary";
import { ArchiveSecretary } from "./components/archive-secretary";

export const SecretaryColumns: ColumnDef<Secretary>[] = [
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
          <ArchiveSecretary id={secretary.id} name={secretary.name} />
        </div>
      );
    },
  },
];
