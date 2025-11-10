import { prisma } from "@/lib/prisma";
import { DoctorColumns } from "./doctor-columns";
import { DataTable } from "@/components/ui/data-table";
import { AddDoctor } from "./components/add-doctor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchivedDoctorColumns } from "./archived-doctor-columns";

export default async function DoctorManagement() {
  const doctors = await prisma.doctor.findMany({
    where: { archived: false },
  });

  const archivedDoctors = await prisma.doctor.findMany({
    where: { archived: true },
  });

  return (
    <>
      <AddDoctor />
      <Tabs defaultValue="doctor">
        <TabsList>
          <TabsTrigger value="doctor">Doctors</TabsTrigger>
          <TabsTrigger value="archived">Archived Doctors</TabsTrigger>
        </TabsList>
        <TabsContent value="doctor">
          <DataTable
            title="Doctor List"
            columns={DoctorColumns}
            data={doctors ?? []}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            title="Doctor Archive"
            columns={ArchivedDoctorColumns}
            data={archivedDoctors ?? []}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
