"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/app/types";

export const ServiceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];
