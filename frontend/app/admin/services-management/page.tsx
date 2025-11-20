import { prisma } from "@/lib/prisma";
import { ServiceColumns } from "./service-columns";
import { DataTable } from "@/components/ui/data-table";
import AddService from "./components/add-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchivedServiceColumns } from "./components/archived-service-columns";

export default async function ServiceManagement() {
  const services = await prisma.service.findMany({
    where: { isArchived: false },
  });

  const archivedServices = await prisma.service.findMany({
    where: { isArchived: true },
  });

  return (
    <>
      <AddService />
      <Tabs defaultValue="service">
        <TabsList>
          <TabsTrigger value="service">Services</TabsTrigger>
          <TabsTrigger value="archived">Archived Services</TabsTrigger>
        </TabsList>
        <TabsContent value="service">
          <DataTable
            title="Service List"
            columns={ServiceColumns}
            data={services ?? []}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            title="Service Archive"
            columns={ArchivedServiceColumns}
            data={archivedServices ?? []}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
