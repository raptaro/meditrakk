"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id?: number;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorFn: (row) =>
      `${row.first_name} ${row.middle_name ? row.middle_name + " " : ""}${
        row.last_name
      }`,
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return (
        <span>
          {first_name} {middle_name ? `${middle_name} ` : ""}
          {last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
