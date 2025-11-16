"use client";

import { DataTable } from "@/components/ui/data-table";
import { 
  PatientColumns, 
  PatientTabs, 
  PatientFlowButton, 
  usePatientTab,
  PatientFlowTable 
} from "./patient-columns";
import usePatients from "@/hooks/use-patients";
import { StatusFilter } from "./status-filter";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Patient } from "./patient-columns";
import { useState, useEffect, useMemo } from "react";

// Custom hook for patient flow data
function usePatientFlow() {
  const [patientFlow, setPatientFlow] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPatientFlow = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-flow/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPatientFlow(data);
        }
      } catch (error) {
        console.error("Failed to fetch patient flow:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientFlow();
  }, []);
  
  return patientFlow;
}

export default function MedicalRecords() {
  const patients = usePatients();
  const patientFlow = usePatientFlow();
  const activeTab = usePatientTab();

  // Handle tab change
  const handleTabChange = (tab: 'patients' | 'flow') => {
    const params = new URLSearchParams(window.location.search);
    if (tab === 'flow') {
      params.set('tab', 'flow');
    } else {
      params.delete('tab');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // Apply status filter to regular patient columns
  const columnsWithFilter: ColumnDef<Patient>[] = PatientColumns.map((col) => {
    if (col.id === "status") {
      return {
        ...col,
        header: ({ column }: { column: Column<Patient, unknown> }) => (
          <StatusFilter column={column} data={patients} />
        ),
        id: col.id,
      };
    }
    return col;
  });

  return (
    <div className="space-y-6">
      {/* Header with title and button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
        </h1>
      </div>

      {/* Tab Navigation */}
      <PatientTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Data Table */}
      {activeTab === 'patients' ? (
        <DataTable 
          title="Patients" 
          columns={columnsWithFilter} 
          data={patients} 
        />
      ) : (
        <PatientFlowTable data={patientFlow} />
      )}
    </div>
  );
}