"use client";
import { DoctorColumns } from "./doctor-columns";
import { PageTable } from "@/components/ui/page-table";
import { SkeletonDataTable } from "@/components/atoms/custom-skeleton";
import useDoctors from "@/hooks/use-doctors";

export default function DocList() {
  const doctors = useDoctors();

  if (doctors === undefined) {
    return <SkeletonDataTable />;
  }

  return (
    <div className="xl:mx-48">
      <PageTable title="Doctors" data={doctors} columns={DoctorColumns} />
    </div>
  );
}
