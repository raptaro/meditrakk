"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { SkeletonPageTable } from "@/components/atoms/custom-skeleton";
import { format, parseISO, isValid } from "date-fns";

//////////////////////
// Types for data - UPDATED (removed description)
//////////////////////

interface Medication {
  id: number;
  name: string;
  // description removed since column doesn't exist
}

interface DoctorInfo {
  id: string;
  name: string;
  specialization: string;
}

interface Prescription {
  id: number;
  medication: Medication;
  dosage: string;
  frequency: string;
  quantity: number;
  start_date: string;
  end_date: string | null;
  doctor_info: DoctorInfo;
  treatment_date: string;
  treatment_id: number;
}

interface BackendResponse {
  prescriptions: Prescription[];
  total_count: number;
  patient_name: string;
}

interface PrescriptionRow {
  id: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  quantity: number;
  startDate: string;
  endDate: string;
  doctorName: string;
  treatmentDate: string;
}

//////////////////////
// PageTable component (same as before)
//////////////////////

interface PageTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
}

function PageTable<TData, TValue>({
  columns,
  data,
  title,
}: PageTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="card m-6 space-y-6">
      {title && <h1 className="mr-4 font-bold">{title}</h1>}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Prescriptions Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

//////////////////////
// Prescriptions Page Component
//////////////////////

export default function PrescriptionsPage() {
  const [prescriptionsData, setPrescriptionsData] = useState<PrescriptionRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columns = React.useMemo<ColumnDef<PrescriptionRow, any>[]>(() => [
    {
      accessorKey: "medicationName",
      header: "Medication",
      cell: (info) => (
        <div className="font-medium">{info.getValue()}</div>
      ),
    },
    {
      accessorKey: "dosage",
      header: "Dosage",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "frequency",
      header: "Frequency",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: (info) => info.getValue() || "Ongoing",
    },
    {
      accessorKey: "doctorName",
      header: "Prescribed By",
      cell: (info) => info.getValue(),
    },
  ], []);

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/";
        const apiUrl = `${baseUrl}/patient/prescriptions/`;
        
        console.log("Fetching prescriptions from:", apiUrl);

        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data: BackendResponse = await res.json();
        console.log("Prescriptions response:", data);
        
        // Map the backend data to table rows
        const mapped: PrescriptionRow[] = data.prescriptions.map((prescription) => {
          const startDate = parseISO(prescription.start_date);
          const formattedStartDate = isValid(startDate) 
            ? format(startDate, "MMM d, yyyy")
            : "Invalid Date";

          let formattedEndDate = "Ongoing";
          if (prescription.end_date) {
            const endDate = parseISO(prescription.end_date);
            formattedEndDate = isValid(endDate) 
              ? format(endDate, "MMM d, yyyy")
              : "Invalid Date";
          }

          return {
            id: prescription.id,
            medicationName: prescription.medication?.name || "Unknown Medication",
            dosage: prescription.dosage,
            frequency: prescription.frequency,
            quantity: prescription.quantity,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            doctorName: prescription.doctor_info?.name || "Unknown Doctor",
            treatmentDate: prescription.treatment_date,
          };
        });
        
        setPrescriptionsData(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch prescriptions:", err);
        setError(err instanceof Error ? err.message : "Failed to load prescriptions");
        setPrescriptionsData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPrescriptions();
  }, []);

  if (loading) {
    return <SkeletonPageTable />;
  }

  if (error) {
    return (
      <div className="card m-6 p-6">
        <div className="text-red-600 font-medium">Error: {error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <PageTable
      title="My Prescriptions"
      columns={columns}
      data={prescriptionsData}
    />
  );
}