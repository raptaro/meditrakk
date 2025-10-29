"use client";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./patient-management-columns";
import { useApiQuery } from "@/hooks/use-api-query";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export default function DemoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  const {
    data: patients,
    isLoading,
    error,
  } = useApiQuery<User[]>(["patients"], `${baseUrl}/user/users/?role=patient`, {
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <SkeletonDataTable />;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  return <DataTable title="Patients" columns={columns} data={patients ?? []} />;
}
