"use client";

import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Circle } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format, parseISO, isValid } from "date-fns";

//////////////////////
// Types for data
//////////////////////

interface DoctorInfo {
  id: string;
  name: string;
  specialization: string;
}

interface Medication {
  id: number;
  name: string;
}

interface Record {
  id: string;
  type: "diagnosis" | "prescription";
  date: string;
  doctor: DoctorInfo;
  title: string;
  description: string;
  status: string;
  treatment_id: number;
  medication?: Medication;
  prescription_details?: {
    id: number;
    dosage: string;
    frequency: string;
    quantity: number;
    start_date: string;
    end_date: string | null;
  };
  diagnosis_details?: {
    id: number;
    diagnosis_code: string;
    diagnosis_description: string;
  };
  diagnosis_code?: string;
}

interface BackendResponse {
  records: Record[];
  total_count: number;
  patient_name: string;
}

//////////////////////
// Helper functions
//////////////////////

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'urgent': return 'text-red-500';
    case 'pending': return 'text-yellow-500';
    case 'completed': return 'text-green-600';
    default: return 'text-gray-500';
  }
};

const getRecordIcon = (type: string) => {
  switch (type) {
    case 'diagnosis': return '🩺';
    case 'prescription': return '💊';
    default: return '📋';
  }
};

// Function to handle null values and "null" strings
const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === "null" || value === " undefined") {
    return "N/A";
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === "" || trimmed === "null" ? "N/A" : trimmed;
  }
  return String(value);
};

// Function to remove duplicate records by actual ID
const removeDuplicateRecords = (records: Record[]): Record[] => {
  const seenDiagnosisIds = new Set<number>();
  const seenPrescriptionIds = new Set<number>();
  
  return records.filter(record => {
    if (record.type === 'diagnosis' && record.diagnosis_details) {
      const diagnosisId = record.diagnosis_details.id;
      if (seenDiagnosisIds.has(diagnosisId)) {
        return false; // Skip duplicate diagnosis
      }
      seenDiagnosisIds.add(diagnosisId);
      return true;
    } else if (record.type === 'prescription' && record.prescription_details) {
      const prescriptionId = record.prescription_details.id;
      if (seenPrescriptionIds.has(prescriptionId)) {
        return false; // Skip duplicate prescription
      }
      seenPrescriptionIds.add(prescriptionId);
      return true;
    }
    
    // If we can't determine the ID, keep the record
    return true;
  });
};

//////////////////////
// Records Page Component
//////////////////////

export default function RecordsPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useMemo to compute unique records only when records change
  const uniqueRecords = useMemo(() => {
    return removeDuplicateRecords(records);
  }, [records]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/";
        const apiUrl = `${baseUrl}/patient/records/`;
        
        console.log("Fetching records from:", apiUrl);

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
        console.log("Records response:", data);
        
        setRecords(data.records);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch records:", err);
        setError(err instanceof Error ? err.message : "Failed to load records");
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = parseISO(dateString);
    if (!isValid(date)) return { date: "Invalid Date", time: "" };
    
    return {
      date: format(date, "MM/dd/yyyy"),
      time: format(date, "h:mm a")
    };
  };

  if (loading) {
    return (
      <div className="m-6">
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Records</h1>
          </div>
          <div className="text-center py-8">
            <div className="text-gray-500">Loading records...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6">
        <div className="card space-y-6 p-6">
          <h1 className="font-bold text-2xl">Records</h1>
          <div className="text-red-600 font-medium">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6">
      <div className="card space-y-6">
        {/* Header with Legend */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Records</h1>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-muted-foreground">Completed</span>
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - positioned to align with circles */}
          <div className="absolute left-[calc(25%-12px)] top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {uniqueRecords.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg mb-2">No Records Found</div>
                <div className="text-gray-400 text-sm">
                  Your medical records will appear here after doctor visits.
                </div>
              </div>
            ) : (
              uniqueRecords.map((record) => {
                const { date: formattedDate, time: formattedTime } = formatDateTime(record.date);
                
                return (
                  <div key={record.id} className="grid grid-cols-4 gap-6 relative">
                    <div className="flex items-start justify-end gap-4 text-end pt-2">
                      <div className="flex flex-col text-sm">
                        <span className="font-bold">{formattedDate}</span>
                        <span className="text-muted-foreground">{formattedTime}</span>
                      </div>
                      <div className="relative z-10">
                        <Circle className={`fill-current ${getStatusColor(record.status)} bg-white border-2 border-white`} size={20} />
                      </div>
                    </div>

                    <div className="col-span-2 flex flex-col space-y-2 rounded-xl bg-muted p-4 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative before:content-[''] before:absolute before:left-[-8px] before:top-5 before:border-t-[8px] before:border-t-transparent before:border-b-[8px] before:border-b-transparent before:border-r-[8px] before:border-r-gray-200 after:content-[''] after:absolute after:left-[-7px] after:top-5 after:border-t-[8px] after:border-t-transparent after:border-b-[8px] after:border-b-transparent after:border-r-[8px] after:border-r-muted">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <span className="text-lg">{getRecordIcon(record.type)}</span>
                        {record.title}
                      </span>
                      
                      {/* Description for both types */}
                      {record.description && (
                        <p className="text-sm text-muted-foreground">
                          {formatValue(record.description)}
                        </p>
                      )}
                      
                      {/* Additional prescription details */}
                      {record.type === 'prescription' && record.prescription_details && (
                        <div className="text-xs text-muted-foreground mt-2 space-y-1">
                          <div>
                            <strong>Dosage:</strong> {formatValue(record.prescription_details.dosage)}
                          </div>
                          <div>
                            <strong>Frequency:</strong> {formatValue(record.prescription_details.frequency)}
                          </div>
                          <div>
                            <strong>Quantity:</strong> {formatValue(record.prescription_details.quantity)}
                          </div>
                          {record.prescription_details.start_date && (
                            <div><strong>Start:</strong> {format(parseISO(record.prescription_details.start_date), "MMM d, yyyy")}</div>
                          )}
                          {record.prescription_details.end_date && (
                            <div><strong>End:</strong> {format(parseISO(record.prescription_details.end_date), "MMM d, yyyy")}</div>
                          )}
                        </div>
                      )}
                      
                      {/* Doctor information */}
                      <div className="text-xs text-blue-600 mt-2">
                        <strong>By Dr. {record.doctor.name}</strong> • {record.doctor.specialization}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}