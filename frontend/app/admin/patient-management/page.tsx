"use client";
import { useFetch } from "@/hooks/use-fetch";
import { CrudTable } from "@/components/ui/crud-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { columns } from "./patient-management-columns";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "doctor" | "secretary";
  is_active: boolean;
};

export default function DemoPage() {
  const {
    data: users,
    isLoading,
    error,
  } = useFetch<User[]>(`${process.env.NEXT_PUBLIC_API_BASE}/auth/users/`);

  if (isLoading) return <SkeletonDataTable />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return <CrudTable title="Users" columns={columns} data={users ?? []} />;
}
