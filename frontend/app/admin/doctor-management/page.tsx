"use client";
import { useFetch } from "@/hooks/use-fetch";
import { DataTable } from "@/components/ui/data-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./doctor-management-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type User = {
  id: string;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_joined: string;
};

export default function Page() {
  const {
    data: doctors,
    isLoading,
    error,
  } = useFetch<User[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users/?role=doctor&ordering=-date_joined`
  );

  const {
    data: archivedDoctors,
    isLoading: isArchivedLoading,
    error: archivedError,
  } = useFetch<User[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users/archived/?role=doctor&ordering=-date_joined`
  );

  if (isLoading || isArchivedLoading) return <SkeletonDataTable />;
  if (error || archivedError)
    return <div className="p-4 text-red-500">{error || archivedError}</div>;

  return (
    <Tabs defaultValue="doctors">
      <TabsList className="w-full rounded-none">
        <TabsTrigger className="w-1/2 rounded-none" value="doctors">
          Doctors
        </TabsTrigger>
        <TabsTrigger className="w-1/2 rounded-none" value="archived-doctors">
          Archived Doctors
        </TabsTrigger>
      </TabsList>

      <TabsContent value="doctors">
        <DataTable title="Doctors" columns={columns} data={doctors ?? []} />
      </TabsContent>

      <TabsContent value="archived-doctors">
        <DataTable
          title="Archived Doctors"
          columns={columns}
          data={archivedDoctors ?? []}
        />
      </TabsContent>
    </Tabs>
  );
}
