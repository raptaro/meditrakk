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

import { parseISO, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

//////////////////////
// Types for data
//////////////////////

interface AppointmentFromAPI {
  id: number;
  patient: string;
  patient_name: string;
  doctor: number;
  doctor_name: string;
  appointment_date: string;
  status: string;
  appointment_type: string;
  notes: string | null;
  scheduled_by: string;
  scheduled_by_name: string;
  created_at: string;
  updated_at: string;
  referral_info?: {
    referral_id: number;
    referring_doctor: string;
    referral_status: string;
    reason: string;
  };
  is_my_appointment: boolean;
}

interface BackendResponseUpcoming {
  upcoming: AppointmentFromAPI[];
  total_count?: number;
  patient_name?: string;
}

interface AppointmentRow {
  id: number;
  doctorName: string;
  date: string;
  startTime: string;
  reason: string;
  status: string;
  appointmentType: string;
  referralDoctor: string;
}

//////////////////////
// PageTable component (same as above)
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
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Upcoming Appointments Found
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
// Page Component
//////////////////////

export default function UpcomingAppointmentsPage() {
  const [appointmentsData, setAppointmentsData] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columns = React.useMemo<ColumnDef<AppointmentRow, any>[]>(() => [
    {
      accessorKey: "doctorName",
      header: "Doctor",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "startTime",
      header: "Time",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "appointmentType",
      header: "Type",
      cell: info => <span className="capitalize">{info.getValue()}</span>,
    },
    {
      accessorKey: "reason",
      header: "Reason/Notes",
      cell: info => info.getValue() || "No notes",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: info => {
        const status = info.getValue() as string;
        const getStatusColor = (s: string) => {
          switch (s) {
            case "Scheduled": return "bg-blue-100 text-blue-800";
            case "Waiting":   return "bg-yellow-100 text-yellow-800";
            default:         return "bg-gray-100 text-gray-800";
          }
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      },
    },
  ], []);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/upcoming/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: BackendResponseUpcoming = await res.json();
        console.log("Backend data (upcoming):", data);

        const allUpcoming = Array.isArray(data.upcoming) ? data.upcoming : [];

        const mapped: AppointmentRow[] = allUpcoming.map(appointment => {
          const raw = appointment.appointment_date;
          let formattedDate = raw;
          let formattedTime = "";
          if (isValid(parseISO(raw))) {
            formattedDate  = formatInTimeZone(parseISO(raw), "UTC", "MMMM d, yyyy");
            formattedTime  = formatInTimeZone(parseISO(raw), "UTC", "h:mm a");
          } else {
            formattedDate = raw.split("T")[0];
            formattedTime = raw.split("T")[1]?.replace("Z","") || "";
          }

          const reason = appointment.referral_info?.reason 
                         || appointment.notes 
                         || "No reason provided";

          const doctorName = appointment.doctor_name 
                             ? `Dr. ${appointment.doctor_name}` 
                             : "Unknown Doctor";

          const referralDoctor = appointment.referral_info?.referring_doctor || "N/A";

          return {
            id: appointment.id,
            doctorName,
            date: formattedDate,
            startTime: formattedTime,
            reason,
            status: appointment.status,
            appointmentType: appointment.appointment_type,
            referralDoctor,
          };
        });

        setAppointmentsData(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch upcoming appointments:", err);
        setError(err instanceof Error ? err.message : "Failed to load appointments");
        setAppointmentsData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
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
    <PageTable
      title="Upcoming Appointments"
      columns={columns}
      data={appointmentsData}
    />
  );
}
