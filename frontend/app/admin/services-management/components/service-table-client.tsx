"use client";

import { FilterTable } from "@/components/ui/custom/filter-table";
import { ServiceColumns } from "../service-columns";
import { Service } from "@/app/types";

interface Props {
  services: Service[];
  typeOptions: string[];
}

export default function ServiceTableClient({ services, typeOptions }: Props) {
  return (
    <FilterTable
      title="Service List"
      columns={ServiceColumns}
      data={services}
      typeOptions={typeOptions}
    />
  );
}
