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

import { Download, Eye, FileText } from "lucide-react";

//////////////////////
// Types for data
//////////////////////

interface LabResult {
  id: string;
  date: string;
  test_type: string;
  status: string;
  image_url: string | null;
  file_name: string | null;
  notes: string | null;
  request_date?: string | null;
  lab_request_id?: string | null;
}

interface BackendResponse {
  lab_results: LabResult[];
  total_count: number;
  patient_name?: string;
}

interface LabResultRow {
  id: string;
  testType: string;
  notes: string | null;
  date: string;
  status: string;
  fileName: string;
  imageUrl: string | null;
}

//////////////////////
// Helper functions
//////////////////////

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Completed
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          Pending
        </span>
      );
    case "urgent":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
          Urgent
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
          {status}
        </span>
      );
  }
};

const formatDateSafe = (dateString: string) => {
  try {
    const d = parseISO(dateString);
    return isValid(d) ? format(d, "MMM d, yyyy") : "Invalid Date";
  } catch {
    return "Invalid Date";
  }
};

//////////////////////
// PageTable component (reusable - matches design)
//////////////////////

interface PageTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
}

function PageTable<TData, TValue>({ columns, data, title }: PageTableProps<TData, TValue>) {
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
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Results Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}

//////////////////////
// Lab Results Page component (matches the prescriptions table design)
//////////////////////

export default function LabResultsTable() {
  const [labResults, setLabResults] = useState<LabResultRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columns = React.useMemo<ColumnDef<LabResultRow, any>[]>(() => [
    {
      accessorKey: "testType",
      header: "Test Type",
      cell: (info) => (
        <div>
          <div className="font-medium">{info.getValue()}</div>
          {/* notes are shown in a smaller subtitle when available */}
          {info.row.original.notes && (
            <div className="text-sm text-muted-foreground mt-1">{info.row.original.notes}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => getStatusBadge(info.getValue()),
    },
    {
      accessorKey: "fileName",
      header: "File Name",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
    },
    {
      accessorKey: "id", // actions don't need a real accessor but we keep id for uniqueness
      header: "Actions",
      cell: ({ row }) => {
        const r = row.original as LabResultRow;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (r.imageUrl) window.open(r.imageUrl, "_blank");
                else alert("No image available for this lab result.");
              }}
              title="View Result"
              className="inline-flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition-colors"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </button>
            <button
              onClick={() => {
                if (r.imageUrl) {
                  const link = document.createElement("a");
                  link.href = r.imageUrl!;
                  link.download = r.fileName || `lab_result_${r.id}.jpg`;
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  alert("No image available for download.");
                }
              }}
              title="Download Result"
              className="inline-flex items-center px-3 py-1 border border-green-600 text-green-600 rounded-md text-sm hover:bg-green-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
        );
      },
    },
  ], []);

  useEffect(() => {
    async function fetchLabResults() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/";
        const apiUrl = `${baseUrl}/patient/show/lab-results/`;

        console.log("Fetching lab results from:", apiUrl);

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
        console.log("Lab results response:", data);

        const mapped: LabResultRow[] = data.lab_results.map((r) => ({
          id: r.id,
          testType: r.test_type || "Unknown Test",
          notes: r.notes || null,
          date: r.date ? formatDateSafe(r.date) : "Unknown Date",
          status: r.status || "Unknown",
          fileName: r.file_name || `lab_result_${r.id}`,
          imageUrl: r.image_url || null,
        }));

        setLabResults(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch lab results:", err);
        setError(err instanceof Error ? err.message : "Failed to load lab results");
        setLabResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLabResults();
  }, []);

  if (loading) {
    return <SkeletonPageTable />;
  }

  if (error) {
    return (
      <div className="card m-6 p-6">
        <div className="text-red-600 font-medium">Error: {error}</div>
        <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <PageTable title="Lab Results" columns={columns} data={labResults} />
  );
}
