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
      <Tabs defaultValue="service">
        <div className="m-6 flex items-center justify-between">
          <TabsList>
            <TabsTrigger
              value="service"
              className="transition-colors hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Services
            </TabsTrigger>

            <TabsTrigger
              value="archived"
              className="transition-colors hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Archived Services
            </TabsTrigger>
          </TabsList>

          <AddService />
        </div>

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
