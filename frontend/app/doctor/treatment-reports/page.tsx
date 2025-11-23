"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Search,
  Eye,
  FileText,
  Download,
  ChevronRight,
  Filter,
} from "lucide-react";

// TypeScript interfaces based on your backend response
interface Diagnosis {
  diagnosis_code: string;
  diagnosis_description: string;
  diagnosis_date: string;
}

interface PatientInfo {
  patient_id: string;
  full_name: string;
  age: number;
  gender: string;
  contact_number: string;
  email: string;
}

interface LatestQueue {
  id: number;
  priority_level: "Regular" | "Priority";
  status: string;
  created_at: string;
  complaint: string;
  queue_number: number;
  queue_date: string;
}

interface BackendTreatment {
  id?: number;
  patient_info: PatientInfo;
  diagnoses: Diagnosis[];
  treatment_notes: string;
  latest_queue: LatestQueue;
  doctor: string; // Added doctor field
}

interface ApiResponse {
  "My Treatments": BackendTreatment[];
}

interface PatientTreatment {
  id: string;
  report_id: string;
  patient_id: string;
  patient_name: string;
  age: number;
  gender: string;
  visit_date: string;
  visit_time: string;
  diagnosis: string;
  treatment_summary: string;
  doctor_id: string; // Added doctor_id field
  raw_data: BackendTreatment;
}

// Skeleton Loading Components
const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {[...Array(5)].map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to generate unique IDs
const generateUniqueId = (treatment: BackendTreatment, index: number): string => {
  const baseId = treatment.id || treatment.latest_queue.id;
  const diagnosesHash = treatment.diagnoses
    .map(d => d.diagnosis_code)
    .join('-')
    .slice(0, 20);
  
  return `${baseId}-${diagnosesHash}-${index}`;
};

export default function DoctorPatientTreatmentList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<PatientTreatment | null>(null);
  const [patientTreatments, setPatientTreatments] = useState<PatientTreatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Fetch real data from backend
  useEffect(() => {
    const fetchPatientTreatments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const accessToken = localStorage.getItem("access");
        
        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/patient/my_treatments/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch treatments: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (!data["My Treatments"] || !Array.isArray(data["My Treatments"])) {
          console.warn('No treatments found or invalid data structure:', data);
          setPatientTreatments([]);
          return;
        }

        // Transform backend data to match frontend interface
        const transformedData: PatientTreatment[] = data["My Treatments"].map((treatment: BackendTreatment, index: number) => {
          const uniqueId = generateUniqueId(treatment, index);
          
          const diagnosisText = treatment.diagnoses
            .map(d => d.diagnosis_description)
            .join(', ');

          const treatmentSummary = treatment.treatment_notes || 
            treatment.diagnoses.map(d => `Treatment for ${d.diagnosis_description}`).join('; ');

          const visitDate = new Date(treatment.latest_queue.queue_date).toISOString().split('T')[0];
          const visitTime = new Date(treatment.latest_queue.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          return {
            id: uniqueId,
            report_id: `TR${treatment.latest_queue.id.toString().padStart(3, '0')}-${index}`,
            patient_id: treatment.patient_info.patient_id,
            patient_name: treatment.patient_info.full_name,
            age: treatment.patient_info.age,
            gender: treatment.patient_info.gender,
            visit_date: visitDate,
            visit_time: visitTime,
            diagnosis: diagnosisText,
            treatment_summary: treatmentSummary,
            doctor_id: treatment.doctor, // Add doctor_id
            raw_data: treatment
          };
        });

        setPatientTreatments(transformedData);
      } catch (err) {
        console.error('Error fetching patient treatments:', err);
        setError(err instanceof Error ? err.message : 'Failed to load patient treatments');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientTreatments();
  }, []);

  // Get unique doctors for filter
  const uniqueDoctors = Array.from(new Set(patientTreatments.map(treatment => treatment.doctor_id)))
    .filter(doctor => doctor) // Remove empty/null values
    .sort();

  // Filter patients
  const filteredPatients = patientTreatments.filter(patient => {
    const matchesSearch = 
      patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDoctor = selectedDoctor === "all" || patient.doctor_id === selectedDoctor;
    
    return matchesSearch && matchesDoctor;
  });

  // Statistics
  const stats = {
    total: patientTreatments.length,
    today: patientTreatments.filter(p => p.visit_date === new Date().toISOString().split('T')[0]).length,
    filtered: filteredPatients.length,
  };

  // Export table data to PDF with direct download
const exportToPDF = async () => {
  if (filteredPatients.length === 0) return;

  setExporting(true);
  
  try {
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // Create a container for paginated content
    const contentContainer = document.createElement('div');
    contentContainer.style.position = 'absolute';
    contentContainer.style.left = '-9999px';
    contentContainer.style.top = '0';
    contentContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
    contentContainer.style.backgroundColor = 'white';
    contentContainer.style.fontFamily = 'Arial, sans-serif';

    const currentDate = new Date().toLocaleDateString();
    const selectedDoctorLabel = selectedDoctor === "all" 
      ? "All Doctors" 
      : `Dr. ${selectedDoctor}`;

    // Header content (appears on every page)
    const headerHTML = `
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 15px;">
        <h1 style="color: #1f2937; margin: 0; font-size: 24px;">Patient Treatments Report</h1>
        <div style="color: #6b7280; margin-top: 5px;">Generated on ${currentDate}</div>
        <div style="color: #6b7280; margin-top: 5px; font-weight: 500;">Filter: ${selectedDoctorLabel}</div>
      </div>
      
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
        <p style="margin: 4px 0; font-weight: 500;"><strong>Total Patients:</strong> ${stats.total}</p>
        <p style="margin: 4px 0; font-weight: 500;"><strong>Treated Today:</strong> ${stats.today}</p>
        <p style="margin: 4px 0; font-weight: 500;"><strong>Filtered Results:</strong> ${filteredPatients.length} patients</p>
      </div>
    `;

    // Calculate how many rows per page (adjust based on your content height)
    const rowsPerPage = 20;
    const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      const startIndex = page * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, filteredPatients.length);
      const pagePatients = filteredPatients.slice(startIndex, endIndex);

      const tableHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
          <thead>
            <tr>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Treatment ID</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Patient Name</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Patient ID</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Age</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Gender</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Visit Date</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Doctor</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Diagnosis</th>
              <th style="background-color: #3b82f6; color: white; padding: 6px; text-align: left; border: 1px solid #2563eb;">Treatment Summary</th>
            </tr>
          </thead>
          <tbody>
            ${pagePatients.map((patient, index) => `
              <tr style="${index % 2 === 0 ? 'background-color: #f9fafb;' : ''}">
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.report_id}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.patient_name}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.patient_id}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.age}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.gender}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.visit_date}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb;">${patient.doctor_id}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb; max-width: 80px; word-wrap: break-word;">${patient.diagnosis}</td>
                <td style="padding: 4px 5px; border: 1px solid #e5e7eb; max-width: 100px; word-wrap: break-word;">${patient.treatment_summary}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 8px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
          <p>Report generated from Medical System - ${currentDate} - Page ${page + 1} of ${totalPages}</p>
        </div>
      `;

      contentContainer.innerHTML = headerHTML + tableHTML;
      document.body.appendChild(contentContainer);

      const canvas = await html2canvas(contentContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(contentContainer);

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    }

    const fileName = selectedDoctor === "all" 
      ? `patient-treatments-${currentDate.replace(/\//g, '-')}.pdf`
      : `patient-treatments-${selectedDoctor}-${currentDate.replace(/\//g, '-')}.pdf`;
    
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    setExporting(false);
  }
};

  const handleViewFullReport = (patientId: string) => {
    router.push(`/doctor/patient-report/${patientId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 text-red-500 mx-auto mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Patient Treatments</h1>
          <p className="text-gray-600">Overview of all patients you've treated</p>
        </div>

        {/* Statistics Cards with Skeleton */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Total Patients</div>
                </div>
                <User className="w-10 h-10 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.today}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Treated Today</div>
                </div>
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.filtered}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Filtered Results</div>
                </div>
                <Filter className="w-10 h-10 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search - FIXED ALIGNMENT */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            {/* Search - Takes full width on mobile, flexible on desktop */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by patient name, ID, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Doctor Filter - Fixed width */}
            <div className="w-full md:w-64">
              <label htmlFor="doctor-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Doctor
              </label>
              <select
                id="doctor-filter"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All Doctors</option>
                {uniqueDoctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    Dr. {doctor}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button - Auto width */}
            <div className="w-full md:w-auto">
              <button 
                onClick={exportToPDF}
                disabled={filteredPatients.length === 0 || exporting}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {exporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Patient List with Skeleton Loading */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Treatment ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Visit Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.report_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{patient.patient_name}</div>
                            <div className="text-xs text-gray-500">{patient.patient_id} • {patient.age}y, {patient.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(patient.visit_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{patient.visit_time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          Dr. {patient.doctor_id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium max-w-xs truncate">
                          {patient.diagnosis}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          {patient.treatment_summary}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Selected Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50" onClick={() => setSelectedPatient(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Treatment Details</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Treatment ID</div>
                    <div className="font-semibold">{selectedPatient.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Patient Name</div>
                    <div className="font-semibold">{selectedPatient.patient_name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Patient ID</div>
                    <div className="font-semibold">{selectedPatient.patient_id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Age / Gender</div>
                    <div className="font-semibold">{selectedPatient.age} years / {selectedPatient.gender}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Visit Date</div>
                    <div className="font-semibold">{new Date(selectedPatient.visit_date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Doctor</div>
                    <div className="font-semibold">Dr. {selectedPatient.doctor_id}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Diagnosis</div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 font-medium">
                    {selectedPatient.diagnosis}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Treatment Summary</div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    {selectedPatient.treatment_summary}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleViewFullReport(selectedPatient.patient_id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}