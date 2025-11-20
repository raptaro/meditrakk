"use client";

import { FilterTable } from "@/components/ui/custom/filter-table";
import { ArchivedServiceColumns } from "../components/archived-service-columns";
import { Service } from "@/app/types";

interface Props {
  archivedServices: Service[];
  typeOptions: string[];
}

export default function ArchivedServiceTableClient({
  archivedServices,
  typeOptions,
}: Props) {
  return (
    <FilterTable
      title="Archived Services"
      columns={ArchivedServiceColumns}
      data={archivedServices}
      typeOptions={typeOptions}
    />
  );
}
