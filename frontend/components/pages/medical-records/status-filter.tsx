"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import { Patient } from "./patient-columns";

interface StatusFilterProps {
  column: Column<any, unknown>;
  data: Patient[];
}

export function StatusFilter({ column, data }: StatusFilterProps) {
  const uniqueStatuses = Array.from(
    new Set(data.map((p) => p.queue_data?.[0]?.status).filter(Boolean))
  ) as string[];

  return (
    <Select
      onValueChange={(value) =>
        column.setFilterValue(value === "all" ? undefined : value)
      }
      defaultValue="all"
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="All Statuses" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {uniqueStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
