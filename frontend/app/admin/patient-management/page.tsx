"use client";
import { useFetch } from "@/hooks/use-fetch";
import { PageTable } from "@/components/ui/page-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./patient-management-columns";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export default function DemoPage() {
  const {
    data: patients,
    isLoading,
    error,
  } = useFetch<User[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users/?role=patient`
  );

  if (isLoading) return <SkeletonDataTable />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return <PageTable title="Patients" columns={columns} data={patients ?? []} />;
}
