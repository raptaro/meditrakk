import { prisma } from "@/lib/prisma";
import { DoctorColumns } from "./doctor-columns";
import { DataTable } from "@/components/ui/data-table";
import { AddDoctor } from "./components/add-doctor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchivedDoctorColumns } from "./archived-doctor-columns";

export default async function DoctorList() {
  const doctors = await prisma.doctor.findMany({
    where: { archived: false },
    select: {
      id: true,
      field: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedDoctors = doctors.map((doctor) => ({
    id: doctor.id,
    field: doctor.field,
    name: doctor.user.name,
  }));

  const archivedDoctors = await prisma.doctor.findMany({
    where: { archived: true },
    select: {
      id: true,
      field: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedArchivedDoctors = archivedDoctors.map((doctor) => ({
    id: doctor.id,
    field: doctor.field,
    name: doctor.user.name,
  }));

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
            data={formattedDoctors ?? []}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            title="Doctor Archive"
            columns={ArchivedDoctorColumns}
            data={formattedArchivedDoctors ?? []}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
