"use client";
import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Archive, Plus, RotateCcw, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types (reusing from your design)
export type Doctor = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  doctor_profile: null | any;
};

// DataTable Component (same as your design)
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
            No archived users found
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton Component (same as your design)
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

// Helper Components (same as your design)
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

function RoleBadge({ role }: { role: string }) {
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'doctor':
        return "border-blue-500 bg-blue-100 text-blue-800";
      case 'on-call-doctor':
        return "border-orange-500 bg-orange-100 text-orange-800";
      default:
        return "border-gray-500 bg-gray-100 text-gray-800";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'doctor':
        return 'Doctor';
      case 'on-call-doctor':
        return 'On-Call Doctor';
      default:
        return role;
    }
  };

  return (
    <Badge variant="outline" className={`${getRoleStyles(role)} rounded-full font-medium`}>
      {getRoleDisplayName(role)}
    </Badge>
  );
}

// Restore Action Cell (similar to your ActionsCell but simplified)
function RestoreActionCell({ 
  doctorId, 
  onRestore,
  loading
}: { 
  doctorId: string;
  onRestore: (id: string) => void;
  loading: boolean;
}) {
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const handleRestore = () => {
    onRestore(doctorId);
    setRestoreDialogOpen(false);
  };

  return (
    <div className="flex flex-row space-x-2">
      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-500 hover:text-green-700 hover:bg-green-50"
            disabled={loading}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Restore</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore this doctor? The doctor will become active again.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setRestoreDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={handleRestore}>
              Confirm Restore
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


const getArchivedDoctorColumns = (
  onRestore: (id: string) => void,
  restoreLoading: Record<string, boolean>
): ColumnDef<Doctor>[] => [
  {
    accessorKey: "id",
    header: "User ID",
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <RoleBadge role={row.original.role} />;
    },
  },
  {
    accessorKey: "doctor_profile.specialization",
    header: "Specialization",
    cell: ({ row }) => {
      const specialization = row.original.doctor_profile?.specialization;
      return specialization || "Not specified";
    },
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <RestoreActionCell
        doctorId={row.original.id}
        onRestore={onRestore}
        loading={restoreLoading[row.original.id] || false}
      />
    ),
  },
];

// Main Component
export default function ArchivedDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [restoreLoading, setRestoreLoading] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const fetchArchivedDoctors = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/archived`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Failed to fetch archived users: ${response.status}`
        );
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching archived users:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedDoctors();
  }, []);

  const handleRestore = async (doctorId: string) => {
    setRestoreLoading(prev => ({ ...prev, [doctorId]: true }));
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${doctorId}/restore/`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Failed to restore doctor: ${response.status}`
        );
      }

      setSuccessMessage("Doctor restored successfully!");
      
      // Refresh the list
      await fetchArchivedDoctors();
    } catch (err) {
      console.error("Error restoring doctor:", err);
      setError(err instanceof Error ? err.message : "Failed to restore doctor");
    } finally {
      setRestoreLoading(prev => ({ ...prev, [doctorId]: false }));
    }
  };

  const columns = getArchivedDoctorColumns(handleRestore, restoreLoading);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Archived Users</h2>
        <SkeletonDataTable />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Archived Users</h2>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setSuccessMessage(null)}
                className="inline-flex text-green-500 hover:text-green-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Error</h3>
              <p>{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <DataTable 
        data={doctors} 
        columns={columns}
        searchKey="first_name"
        placeholder="Search archived users by name..."
      />
    </div>
  );
}