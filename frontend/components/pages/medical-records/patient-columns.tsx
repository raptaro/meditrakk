"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Edit, EllipsisVertical, Eye, Users } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export type Patient = {
  patient_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  name?: string;
  queue_data: {
    created_at: string;
    status: string;
    complaint: string;
  }[];
};

// Helper function to get full name
const getFullName = (patient: Omit<Patient, 'name'>): string => {
  return `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
};

// Helper function to group patients by day
export const groupPatientsByDay = (patients: Patient[]) => {
  const grouped: { [key: string]: Patient[] } = {};
  
  patients.forEach(patient => {
    const latestQueue = patient.queue_data?.[0];
    if (latestQueue?.created_at) {
      const date = new Date(latestQueue.created_at);
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(patient);
    }
  });
  
  // Sort days in descending order (newest first)
  // Sort patients within each day by latest queue (newest first)
  const sortedGrouped: { [key: string]: Patient[] } = {};
  Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach(day => {
      sortedGrouped[day] = grouped[day].sort((a, b) => {
        const dateA = new Date(a.queue_data[0]?.created_at || 0);
        const dateB = new Date(b.queue_data[0]?.created_at || 0);
        return dateB.getTime() - dateA.getTime();
      });
    });
  
  return sortedGrouped;
};

// Format date for display
export const formatDayHeader = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
};

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
        <Eye className="cursor-pointer text-green-500 hover:fill-current" />
      </Link>
      <Edit className="cursor-pointer text-blue-500 hover:fill-current" />
      <EllipsisVertical className="cursor-pointer" />
    </div>
  );
}

export const PatientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient_id",
    header: "Patient ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return (
        <span>
          {first_name} {middle_name ? `${middle_name} ` : ""}
          {last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    id: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const latestQueue = row.original.queue_data?.[0];
      if (!latestQueue?.created_at) return "-";
      const date = new Date(latestQueue.created_at);
      return date.toISOString().split("T")[0];
    },
  },
  {
    id: "complaint",
    header: "Complaint",
    cell: ({ row }) => {
      const latestQueue = row.original.queue_data?.[0];
      return latestQueue ? latestQueue.complaint : "-";
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const latestQueue = row.original.queue_data?.[0];
      const status = latestQueue?.status ?? "-";

      const statusColor =
        status.toLowerCase() === "completed"
          ? "border-green-500 bg-green-100 dark:text-muted"
          : status.toLowerCase() === "queued for treatment"
          ? "border-amber-500 bg-amber-100 dark:text-muted"
          : status.toLowerCase() === "queued for assessment"
          ? "border-blue-400 bg-blue-100 dark:text-muted"
          : status.toLowerCase() === "waiting"
          ? "border-yellow-500 bg-yellow-100 dark:text-muted"
          : "border-gray-500 bg-gray-100 dark:text-muted";

      return (
        <Badge variant="outline" className={`${statusColor} rounded-full`}>
          {status}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const status = row.original.queue_data?.[0]?.status;
      return filterValue === undefined || status === filterValue;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell patientId={row.original.patient_id} />,
  },
];

// Patient Flow Columns - simplified without actions
export const PatientFlowColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient_id",
    header: "Patient ID",
    cell: ({ row }) => (
      <div className="text-center">{row.original.patient_id}</div>
    ),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="text-center">{row.original.first_name}</div>
    ),
  },
  {
    accessorKey: "last_name", 
    header: "Last Name",
    cell: ({ row }) => (
      <div className="text-center">{row.original.last_name}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div className="text-center">{row.original.age}</div>
    ),
  },
  {
    id: "time",
    header: "Time",
    accessorFn: (row) => {
      const latestQueue = row.queue_data?.[0];
      if (!latestQueue?.created_at) return "-";
      const date = new Date(latestQueue.created_at);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    },
    cell: ({ getValue }) => (
      <div className="text-center">{getValue() as string}</div>
    ),
  },
  {
    id: "complaint",
    header: "Complaint",
    accessorFn: (row) => row.queue_data?.[0]?.complaint || "-",
    cell: ({ getValue }) => (
      <div className="text-center max-w-[200px] truncate">{getValue() as string}</div>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => row.queue_data?.[0]?.status || "Not Registered",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      
      const statusColor =
        status.toLowerCase() === "completed"
          ? "border-green-500 bg-green-100 text-green-800"
          : status.toLowerCase() === "queued for treatment"
          ? "border-amber-500 bg-amber-100 text-amber-800"
          : status.toLowerCase() === "queued for assessment"
          ? "border-blue-400 bg-blue-100 text-blue-800"
          : status.toLowerCase() === "waiting"
          ? "border-yellow-500 bg-yellow-100 text-yellow-800"
          : status.toLowerCase() === "not registered"
          ? "border-gray-500 bg-gray-100 text-gray-800"
          : "border-purple-500 bg-purple-100 text-purple-800";

      return (
        <div className="text-center">
          <Badge variant="outline" className={`${statusColor} rounded-full font-medium`}>
            {status}
          </Badge>
        </div>
      );
    },
  },
];

// Tab Navigation Component
export function PatientTabs({ activeTab, onTabChange }: { 
  activeTab: 'patients' | 'flow';
  onTabChange: (tab: 'patients' | 'flow') => void;
}) {
  return (
    <div className="flex space-x-4 mb-6 border-b border-gray-200 pl-6">
      <button
        onClick={() => onTabChange('patients')}
        className={`pb-2 px-1 font-medium text-sm ${
          activeTab === 'patients'
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Patient List
      </button>
      <button
        onClick={() => onTabChange('flow')}
        className={`pb-2 px-1 font-medium text-sm ${
          activeTab === 'flow'
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Patient Flow
      </button>
    </div>
  );
}

// Patient Flow Button Component
export function PatientFlowButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'flow');
    router.push(`${pathname}?${params.toString()}`);
  };


}

// Hook to manage active tab state - FIXED: Added missing = sign
export function usePatientTab() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'patients' | 'flow'>('patients'); // Fixed: Added = sign

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'flow') {
      setActiveTab('flow');
    } else {
      setActiveTab('patients');
    }
  }, [searchParams]);

  return activeTab;
}

// Simple table row component for patient flow (without actions)
function PatientFlowRow({ patient }: { patient: Patient }) {
  const latestQueue = patient.queue_data?.[0];
  
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        {patient.patient_id}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        {patient.first_name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        {patient.last_name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        {patient.age}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        {latestQueue?.created_at 
          ? new Date(latestQueue.created_at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          : "-"
        }
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center max-w-[200px] truncate">
        {latestQueue?.complaint || "-"}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
        <StatusBadge status={latestQueue?.status} />
      </td>
    </tr>
  );
}

// Status badge component
function StatusBadge({ status }: { status?: string }) {
  const displayStatus = status || "Not Registered";
  
  const statusColor =
    displayStatus.toLowerCase() === "completed"
      ? "border-green-500 bg-green-100 text-green-800"
      : displayStatus.toLowerCase() === "queued for treatment"
      ? "border-amber-500 bg-amber-100 text-amber-800"
      : displayStatus.toLowerCase() === "queued for assessment"
      ? "border-blue-400 bg-blue-100 text-blue-800"
      : displayStatus.toLowerCase() === "waiting"
      ? "border-yellow-500 bg-yellow-100 text-yellow-800"
      : displayStatus.toLowerCase() === "not registered"
      ? "border-gray-500 bg-gray-100 text-gray-800"
      : "border-purple-500 bg-purple-100 text-purple-800";

  return (
    <Badge variant="outline" className={`${statusColor} rounded-full font-medium`}>
      {displayStatus}
    </Badge>
  );
}

// Patient Flow Table Component (without pagination and actions)
export function PatientFlowTable({ data }: { data: Patient[] }) {
  const groupedPatients = groupPatientsByDay(data);

  if (Object.keys(groupedPatients).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No patient flow data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedPatients).map(([day, patients]) => (
        <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Day Header */}
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-blue-800">
              {formatDayHeader(day)}
            </h3>
            <p className="text-sm text-blue-600 mt-1">
              {patients.length} patient{patients.length !== 1 ? 's' : ''} registered
            </p>
          </div>
          
          {/* Patients Table for this Day */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient, index) => (
                  <PatientFlowRow 
                    key={`${patient.patient_id}-${day}-${index}`} 
                    patient={patient} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}