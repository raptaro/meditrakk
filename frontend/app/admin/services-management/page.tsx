import { prisma } from "@/lib/prisma";
import AddService from "./components/add-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArchivedServiceTableClient from "./components/archived-service-table-client";
import ServiceTableClient from "./components/service-table-client";

export default async function ServiceManagement() {
  const services = await prisma.service.findMany({
    where: { isArchived: false },
  });
  const archivedServices = await prisma.service.findMany({
    where: { isArchived: true },
  });

  // Distinct types for the select dropdown
  const types = await prisma.service
    .findMany({
      where: { isArchived: false },
      distinct: ["type"],
      select: { type: true },
    })
    .then((res) => res.map((t) => t.type));

  return (
    <>
      <AddService />
      <Tabs defaultValue="service">
        <TabsList>
          <TabsTrigger value="service">Services</TabsTrigger>
          <TabsTrigger value="archived">Archived Services</TabsTrigger>
        </TabsList>

        <TabsContent value="service">
          <ServiceTableClient services={services} typeOptions={types} />
        </TabsContent>

        <TabsContent value="archived">
          <ArchivedServiceTableClient
            archivedServices={archivedServices}
            typeOptions={types}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
