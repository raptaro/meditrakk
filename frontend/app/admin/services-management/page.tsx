import { prisma } from "@/lib/prisma";
import { ServiceColumns } from "./service-columns";
import { DataTable } from "@/components/ui/data-table";
import { AddService } from "@/app/(info)/services/add-service";

export default async function ServiceList() {
  const services = await prisma.service.findMany();

  return (
    <div className="m-6">
      <AddService />

      <DataTable
        title="Service List"
        columns={ServiceColumns}
        data={services ?? []}
      />
    </div>
  );
}
