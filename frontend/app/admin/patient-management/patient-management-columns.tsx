"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
