import { prisma } from "@/lib/prisma";
import { SecretaryColumns } from "./secretary-columns";
import { DataTable } from "@/components/ui/data-table";
import { AddSecretary } from "./components/add-secretary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchivedSecretaryColumns } from "./archived-secretary-columns";

export default async function SecretaryManagement() {
  const secretaries = await prisma.secretary.findMany({
    where: { archived: false },
  });

  const archivedSecretaries = await prisma.secretary.findMany({
    where: { archived: true },
  });

  return (
    <>
      <AddSecretary />
      <Tabs defaultValue="secretary">
        <TabsList>
          <TabsTrigger value="secretary">Secretaries</TabsTrigger>
          <TabsTrigger value="archived">Archived Secretaries</TabsTrigger>
        </TabsList>
        <TabsContent value="secretary">
          <DataTable
            title="Secretary List"
            columns={SecretaryColumns}
            data={secretaries ?? []}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            title="Secretary Archive"
            columns={ArchivedSecretaryColumns}
            data={archivedSecretaries ?? []}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
