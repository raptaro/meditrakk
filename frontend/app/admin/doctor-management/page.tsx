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

// Add/Edit Doctor Form Types
type DoctorForm = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  role: string;
  specialization: string;
  schedules: Array<{
    day_of_week: string;
    start_time: string;
    end_time: string;
  }>;
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
            No doctors found
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

// Doctor Modal Component (for both Add and Edit)
function DoctorModal({ 
  isOpen, 
  onClose, 
  onSave,
  defaultRole,
  doctor,
  mode
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSave: (doctorData: DoctorForm) => Promise<void>;
  defaultRole: string;
  doctor?: Doctor | null;
  mode: 'add' | 'edit';
}) {
  const [formData, setFormData] = useState<DoctorForm>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    role: defaultRole,
    specialization: "",
    schedules: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form when doctor data is provided (edit mode)
  useEffect(() => {
    if (mode === 'edit' && doctor) {
      setFormData({
        email: doctor.email,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        password: "",
        confirm_password: "",
        role: doctor.role,
        specialization: doctor.doctor_profile?.specialization || "",
        schedules: doctor.doctor_profile?.schedules || [],
      });
    } else {
      // Reset form for add mode
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: defaultRole,
        specialization: "",
        schedules: [],
      });
    }
  }, [doctor, mode, defaultRole]);

  const handleScheduleChange = (
    index: number,
    field: keyof DoctorForm['schedules'][0],
    value: string
  ) => {
    setFormData(prev => {
      const schedules = [...prev.schedules];
      schedules[index] = { ...schedules[index], [field]: value };
      return { ...prev, schedules };
    });
  };

  const addNewSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        { day_of_week: "Monday", start_time: "09:00", end_time: "17:00" },
      ],
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

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

    if (!formData.specialization.trim()) {
      setError("Specialization is required");
      return;
    }

    if (!formData.role) {
      setError("Please select a role");
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
        role: defaultRole,
        specialization: "",
        schedules: [],
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} doctor`);
    } finally {
      setLoading(false);
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

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Medical Professional' : 'Edit Medical Professional'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a new medical professional account with their role, specialization and schedule.'
              : 'Update the medical professional information.'
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full rounded border p-2 text-sm"
              required
            >
              <option value="doctor">Doctor</option>
              <option value="on-call-doctor">On-Call Doctor</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {formData.role === 'doctor' 
                ? 'Regular doctor with fixed schedule' 
                : 'On-call doctor for emergency and after-hours coverage'
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization *
            </label>
            <Input
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Cardiologist, Pediatrics, etc."
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Schedules
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNewSchedule}
              >
                Add Schedule
              </Button>
            </div>
            
            {formData.schedules.map((schedule, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border rounded-lg">
                <div className="col-span-4">
                  <select
                    value={schedule.day_of_week}
                    onChange={(e) => handleScheduleChange(index, "day_of_week", e.target.value)}
                    className="w-full rounded border p-2 text-sm"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="time"
                    value={schedule.start_time}
                    onChange={(e) => handleScheduleChange(index, "start_time", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="time"
                    value={schedule.end_time}
                    onChange={(e) => handleScheduleChange(index, "end_time", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSchedule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {formData.schedules.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No schedules added. {getRoleDisplayName(formData.role)} will have no available hours.
              </p>
            )}
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
                : `${mode === 'add' ? 'Add' : 'Update'} ${getRoleDisplayName(formData.role)}`
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ActionsCell({ 
  doctorId, 
  isActive, 
  onArchive,
  onRestore,
  onEdit
}: { 
  doctorId: string;
  isActive: boolean;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const handleArchive = () => {
    onArchive(doctorId);
    setArchiveDialogOpen(false);
  };

  const handleRestore = () => {
    onRestore(doctorId);
    setRestoreDialogOpen(false);
  };

  return (
    <div className="flex flex-row space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => onEdit(doctorId)}
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
                Are you sure you want to archive this doctor? Archived doctors will be moved to the archive section.
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

// Columns Definition
const getDoctorColumns = (
  onArchive: (id: string) => void,
  onRestore: (id: string) => void,
  onEdit: (id: string) => void
): ColumnDef<Doctor>[] => [
  {
    accessorKey: "id",
    header: "Doctor ID",
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
      <ActionsCell
        doctorId={row.original.id}
        isActive={row.original.is_active}
        onArchive={onArchive}
        onRestore={onRestore}
        onEdit={onEdit}
      />
    ),
  },
];

// Main Component
export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Get the current path to determine default role
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine default role based on current path
  const getDefaultRole = () => {
    if (pathname.includes("oncall-doctors")) {
      return "on-call-doctor";
    }
    return "doctor"; // default role
  };

  const defaultRole = getDefaultRole();
  const displayTitle = defaultRole === 'on-call-doctor' ? 'On-Call Doctors' : 'Doctors';

  const fetchDoctors = async (showArchived: boolean = false) => {
    try {
      const token = localStorage.getItem("access");
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/user/users/doctors`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
      }

      const data = await response.json();
      
      // Filter doctors based on archived status
      const filteredDoctors = data.filter((doctor: Doctor) => 
        showArchived ? !doctor.is_active : doctor.is_active
      );
      
      setDoctors(filteredDoctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(showArchived);
  }, [showArchived]);

  const handleArchive = async (doctorId: string) => {
    setActionLoading(doctorId);
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${doctorId}/`,
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
        throw new Error(`Failed to archive doctor: ${response.status}`);
      }

      // Refresh the list
      await fetchDoctors(showArchived);
    } catch (err) {
      console.error("Error archiving doctor:", err);
      setError(err instanceof Error ? err.message : "Failed to archive doctor");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestore = async (doctorId: string) => {
    setActionLoading(doctorId);
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
        throw new Error(`Failed to restore doctor: ${response.status}`);
      }

      // Refresh the list
      await fetchDoctors(showArchived);
    } catch (err) {
      console.error("Error restoring doctor:", err);
      setError(err instanceof Error ? err.message : "Failed to restore doctor");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddDoctor = async (doctorData: DoctorForm) => {
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
          email: doctorData.email,
          first_name: doctorData.first_name,
          last_name: doctorData.last_name,
          password: doctorData.password,
          re_password: doctorData.confirm_password,
          role: doctorData.role,
          doctor_profile: {
            specialization: doctorData.specialization,
            schedules: doctorData.schedules,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `Failed to add doctor: ${response.status}`
      );
    }

    // Refresh the list
    await fetchDoctors(showArchived);
  };

  const handleEditDoctor = async (doctorData: DoctorForm) => {
    if (!editingDoctor) return;

    const token = localStorage.getItem("access");
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${editingDoctor.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          first_name: doctorData.first_name,
          last_name: doctorData.last_name,
          role: doctorData.role,
          doctor_profile: {
            specialization: doctorData.specialization,
            schedules: doctorData.schedules,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `Failed to update doctor: ${response.status}`
      );
    }

    // Refresh the list
    await fetchDoctors(showArchived);
  };

  const handleEditClick = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setEditingDoctor(doctor);
      setShowEditModal(true);
    }
  };

  const handleArchivesClick = () => {
    router.push("/admin/user-archives");
  };

  const columns = getDoctorColumns(handleArchive, handleRestore, handleEditClick);

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
            Add Medical Professional
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
        data={doctors} 
        columns={columns}
        searchKey="first_name"
        placeholder={`Search ${displayTitle.toLowerCase()} by name...`}
      />

      {/* Add Doctor Modal */}
      <DoctorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddDoctor}
        defaultRole={defaultRole}
        mode="add"
      />

      {/* Edit Doctor Modal */}
      <DoctorModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingDoctor(null);
        }}
        onSave={handleEditDoctor}
        defaultRole={defaultRole}
        doctor={editingDoctor}
        mode="edit"
      />
    </div>
  );
}