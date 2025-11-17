"use client";
import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Types
export type Patient = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  doctor_profile: null | any;
};

// DataTable Component (simplified version)
interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchKey?: string;
  placeholder?: string;
}

function DataTable<TData>({ 
  data, 
  columns,
  searchKey,
  placeholder = "Search..."
}: DataTableProps<TData>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm || !searchKey) return data;
    
    return data.filter(item => {
      const value = (item as any)[searchKey];
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchKey]);

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id || (column as any).accessorKey}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header as React.ReactNode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const cell = (column as any).cell;
                  const accessorKey = (column as any).accessorKey;
                  const value = accessorKey ? (row as any)[accessorKey] : null;
                  
                  return (
                    <td key={column.id || accessorKey} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {cell ? cell({ row: { original: row } }) : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No patients found
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton Component
function SkeletonDataTable() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="rounded-md border">
        <div className="h-12 bg-gray-100 rounded-t-md"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 border-t border-gray-200 animate-pulse">
            <div className="h-full flex items-center space-x-4 px-4">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper Components
function ActionsCell({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  const basePath = pathname.includes("oncall-doctors")
    ? "/oncall-doctors"
    : pathname.includes("secretary")
    ? "/secretary"
    : "/doctor";

  return (
    <div className="flex flex-row space-x-1">
      <Link href={`${basePath}/patient-information/${patientId}`}>
        <Eye className="cursor-pointer text-green-500 hover:fill-current w-4 h-4" />
      </Link>
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  const statusColor = isActive 
    ? "border-green-500 bg-green-100 text-green-800"
    : "border-red-500 bg-red-100 text-red-800";

  return (
    <Badge variant="outline" className={`${statusColor} rounded-full font-medium`}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

// Columns Definition
const PatientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "Patient ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date_joined",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.original.date_joined);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge isActive={row.original.is_active} />;
    },
  },
  
];

// Main Component
export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/user/users/patients`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch patients: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Patients</h2>
        <SkeletonDataTable />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Patients</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <h3 className="font-semibold">Error loading patients</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <DataTable 
        data={patients} 
        columns={PatientColumns}
        searchKey="first_name"
        placeholder="Search patients by name..."
      />
    </div>
  );
}