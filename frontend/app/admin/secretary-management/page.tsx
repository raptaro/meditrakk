"use client";
import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Archive, Plus, RotateCcw, Edit } from "lucide-react";
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

// Types
export type Secretary = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
};

// Add/Edit Secretary Form Types
type SecretaryForm = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  role: string;
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
            No secretaries found
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

// Secretary Modal Component (for both Add and Edit)
function SecretaryModal({ 
  isOpen, 
  onClose, 
  onSave,
  secretary,
  mode
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSave: (secretaryData: SecretaryForm) => Promise<void>;
  secretary?: Secretary | null;
  mode: 'add' | 'edit';
}) {
  const [formData, setFormData] = useState<SecretaryForm>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    role: "secretary",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form when secretary data is provided (edit mode)
  useEffect(() => {
    if (mode === 'edit' && secretary) {
      setFormData({
        email: secretary.email,
        first_name: secretary.first_name,
        last_name: secretary.last_name,
        password: "",
        confirm_password: "",
        role: secretary.role,
      });
    } else {
      // Reset form for add mode
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "secretary",
      });
    }
  }, [secretary, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation for add mode
    if (mode === 'add') {
      if (formData.password !== formData.confirm_password) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
    }

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "secretary",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} secretary`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Secretary' : 'Edit Secretary'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a new secretary account.'
              : 'Update the secretary information.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={mode === 'edit'} // Email shouldn't be editable in edit mode
            />
          </div>

          {mode === 'add' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  value={formData.confirm_password}
                  onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

<div role="group" aria-labelledby="role-secretary-label" className="space-y-1">
  <div className="flex items-baseline justify-between">
    <h3 id="role-secretary-label" className="text-sm font-medium text-gray-700">
      Role     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-gray-200 bg-gray-50 text-gray-800">
      Secretary
    </span>
    </h3>

    {/* Visible role pill — replace with your Badge component if available */}

  </div>

  <p id="role-secretary-desc" className="text-xs text-gray-500">
    Responsible for scheduling appointments, coordinating administrative tasks,
    and assisting medical staff with patient flow.
  </p>

  {/* Keep a hidden input if this is part of a form so the role is submitted */}
  <input type="hidden" name="role" value="secretary" aria-hidden="true" />
</div>


          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading 
                ? `${mode === 'add' ? 'Adding' : 'Updating'}...` 
                : `${mode === 'add' ? 'Add' : 'Update'} Secretary`
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ActionsCell({ 
  secretaryId, 
  isActive, 
  onArchive,
  onRestore,
  onEdit
}: { 
  secretaryId: string;
  isActive: boolean;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const handleArchive = () => {
    onArchive(secretaryId);
    setArchiveDialogOpen(false);
  };

  const handleRestore = () => {
    onRestore(secretaryId);
    setRestoreDialogOpen(false);
  };

  return (
    <div className="flex flex-row space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => onEdit(secretaryId)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      
      {isActive ? (
        <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Archive className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Archive</DialogTitle>
              <DialogDescription>
                Are you sure you want to archive this secretary? Archived secretaries will be moved to the archive section.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setArchiveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleArchive}>
                Confirm Archive
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-500 hover:text-green-700 hover:bg-green-50"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Restore</DialogTitle>
              <DialogDescription>
                Are you sure you want to restore this secretary? The secretary will become active again.
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
      )}
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

function RoleBadge({ role }: { role: string }) {
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'secretary':
        return "border-purple-500 bg-purple-100 text-purple-800";
      default:
        return "border-gray-500 bg-gray-100 text-gray-800";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'secretary':
        return 'Secretary';
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

// Columns Definition
const getSecretaryColumns = (
  onArchive: (id: string) => void,
  onRestore: (id: string) => void,
  onEdit: (id: string) => void
): ColumnDef<Secretary>[] => [
  {
    accessorKey: "id",
    header: "Secretary ID",
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
      <ActionsCell
        secretaryId={row.original.id}
        isActive={row.original.is_active}
        onArchive={onArchive}
        onRestore={onRestore}
        onEdit={onEdit}
      />
    ),
  },
];

// Main Component
export default function SecretaryList() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSecretary, setEditingSecretary] = useState<Secretary | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const router = useRouter();
  
  const displayTitle = 'Secretaries';

  const fetchSecretaries = async (showArchived: boolean = false) => {
    try {
      const token = localStorage.getItem("access");
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/user/users/secretary`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch secretaries: ${response.status}`);
      }

      const data = await response.json();
      
      // Filter secretaries based on archived status
      const filteredSecretaries = data.filter((secretary: Secretary) => 
        showArchived ? !secretary.is_active : secretary.is_active
      );
      
      setSecretaries(filteredSecretaries);
    } catch (err) {
      console.error("Error fetching secretaries:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecretaries(showArchived);
  }, [showArchived]);

  const handleArchive = async (secretaryId: string) => {
    setActionLoading(secretaryId);
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${secretaryId}/`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to archive secretary: ${response.status}`);
      }

      // Refresh the list
      await fetchSecretaries(showArchived);
    } catch (err) {
      console.error("Error archiving secretary:", err);
      setError(err instanceof Error ? err.message : "Failed to archive secretary");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestore = async (secretaryId: string) => {
    setActionLoading(secretaryId);
    try {
      const token = localStorage.getItem("access");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${secretaryId}/restore/`,
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
        throw new Error(`Failed to restore secretary: ${response.status}`);
      }

      // Refresh the list
      await fetchSecretaries(showArchived);
    } catch (err) {
      console.error("Error restoring secretary:", err);
      setError(err instanceof Error ? err.message : "Failed to restore secretary");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddSecretary = async (secretaryData: SecretaryForm) => {
    const token = localStorage.getItem("access");
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/user/users/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          email: secretaryData.email,
          first_name: secretaryData.first_name,
          last_name: secretaryData.last_name,
          password: secretaryData.password,
          re_password: secretaryData.confirm_password,
          role: "secretary",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `Failed to add secretary: ${response.status}`
      );
    }

    // Refresh the list
    await fetchSecretaries(showArchived);
  };

  const handleEditSecretary = async (secretaryData: SecretaryForm) => {
    if (!editingSecretary) return;

    const token = localStorage.getItem("access");
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${editingSecretary.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          first_name: secretaryData.first_name,
          last_name: secretaryData.last_name,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `Failed to update secretary: ${response.status}`
      );
    }

    // Refresh the list
    await fetchSecretaries(showArchived);
  };

  const handleEditClick = (secretaryId: string) => {
    const secretary = secretaries.find(s => s.id === secretaryId);
    if (secretary) {
      setEditingSecretary(secretary);
      setShowEditModal(true);
    }
  };

  const handleArchivesClick = () => {
    router.push("/admin/user-archives");
  };

  const columns = getSecretaryColumns(handleArchive, handleRestore, handleEditClick);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{displayTitle}</h2>
        <SkeletonDataTable />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {showArchived ? `Archived ${displayTitle}` : `Active ${displayTitle}`}
        </h2>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleArchivesClick}>
            <Archive className="w-4 h-4 mr-2" />
            View Archives
          </Button>
          
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Secretary
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-4">
          <h3 className="font-semibold">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      <DataTable 
        data={secretaries} 
        columns={columns}
        searchKey="first_name"
        placeholder={`Search secretaries by name...`}
      />

      {/* Add Secretary Modal */}
      <SecretaryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddSecretary}
        mode="add"
      />

      {/* Edit Secretary Modal */}
      <SecretaryModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingSecretary(null);
        }}
        onSave={handleEditSecretary}
        secretary={editingSecretary}
        mode="edit"
      />
    </div>
  );
}