"use client";
import { useFetch } from "@/hooks/use-fetch";
import { DataTable } from "@/components/ui/data-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./doctor-management-columns";

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

  if (isLoading) return <SkeletonDataTable />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return <DataTable title="Doctors" columns={columns} data={doctors ?? []} />;
}
