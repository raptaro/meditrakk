import { prisma } from "@/lib/prisma";
import { ServiceColumns } from "./service-columns";
import TitleCard from "@/components/molecules/title-card";
import { DataTable } from "@/components/ui/data-table";

export default async function ServiceList() {
  const services = await prisma.service.findMany();

  return (
    <div className="mt-6 xl:mx-48">
      <TitleCard title="Service List">
        <DataTable columns={ServiceColumns} data={services ?? []} />
      </TitleCard>
    </div>
  );
}
