"use client";
import { DoctorColumns } from "./doctor-columns";
import { DataTable } from "@/components/ui/data-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import { doctors } from "@/lib/placeholder-data";

export default function DocList() {
  if (doctors === undefined) {
    return <SkeletonDataTable />;
  }

  return (
    <div className="xl:mx-48">
      <DataTable title="Doctors" data={doctors} columns={DoctorColumns} />
    </div>
  );
}
