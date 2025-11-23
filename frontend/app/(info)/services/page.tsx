import { prisma } from "@/lib/prisma";
import TitleCard from "@/components/molecules/title-card";
import ServiceTableClient from "./service-table-client";

export default async function ServiceList() {
  const services = await prisma.service.findMany();

  const types = await prisma.service
    .findMany({
      where: { isArchived: false },
      distinct: ["type"],
      select: { type: true },
    })
    .then((res) => res.map((t) => t.type));

  return (
    <div className="mt-6 xl:mx-48">
      <TitleCard title="Service List">
        <ServiceTableClient services={services} typeOptions={types} />
      </TitleCard>
    </div>
  );
}
