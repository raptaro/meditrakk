"use client";

import { CrudTable } from "@/components/ui/crud-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./doctor-management-columns";
import { useApiQuery } from "@/hooks/use-api-query";

type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "doctor" | "secretary";
  is_active?: boolean;
};

export default function DemoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  const {
    data: doctors,
    isLoading,
    error,
  } = useApiQuery<User[]>(["doctors"], `${baseUrl}/user/users/?role=doctor`, {
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <SkeletonDataTable />;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  return <CrudTable title="Doctors" columns={columns} data={doctors ?? []} />;
}
