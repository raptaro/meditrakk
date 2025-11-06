import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { MedicineColumns } from "./medicine-columns";
import { AddMedicine } from "./components/add-medicine";
import MedicineArchive from "./components/medicine-archive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function MedicineList() {
  const medicines = await prisma.medicine.findMany({
    where: { archived: false },
  });

  return (
    <>
      <AddMedicine />
      <Tabs defaultValue="medicine">
        <TabsList>
          <TabsTrigger value="medicine">Medicines</TabsTrigger>
          <TabsTrigger value="archived">Archived Medicines</TabsTrigger>
        </TabsList>
        <TabsContent value="medicine">
          <DataTable
            title="Medicine List"
            columns={MedicineColumns}
            data={medicines ?? []}
          />
        </TabsContent>
        <TabsContent value="archived">
          <MedicineArchive />
        </TabsContent>
      </Tabs>
    </>
  );
}
