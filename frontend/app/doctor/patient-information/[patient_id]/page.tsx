'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaPenToSquare,
  FaFile,
  FaUser,
  FaNotesMedical,
  FaPrescription,
  FaRegCalendarCheck,
  FaLightbulb,

} from "react-icons/fa6";
import { FaSave, FaTimes } from 'react-icons/fa';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PatientInfo {
  patient_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  street_address: string;
  barangay: string;
  municipal_city: string;
  gender: string;
  age?: number;
  queue_data: QueueData;
}

interface QueueData {
  id: number;
  priority_level: string;
  created_at: string;
  queue_number: number;
  complaint: string;
  status: string;
}

interface PreliminaryAssessment {
  blood_pressure: string;
  temperature: string;
  heart_rate: string;
  respiratory_rate: string;
  pulse_rate: string;
  allergies: string;
  medical_history: string;
  symptoms: string;
  current_medications: string;
  pain_scale: string;
  pain_location: string;
  smoking_status: string;
  alcohol_use: string;
  assessment: string;
}

interface Diagnosis {
  id: number;
  patient_id: string;
  diagnosis_code: string;
  diagnosis_date: string;
  diagnosis_description: string;
}

interface Prescription {
  id: number;
  dosage: string;
  frequency: string;
  quantity: number;
  start_date: string;
  end_date: string;
  patient_id: string;
  medication_id: number;
  medicine_medicine: {
    id: number;
    name: string;
  };
}

interface TreatmentRecord {
  id: number;
  treatment_notes: string;
  created_at: string;
  updated_at: string;
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
}

interface Appointment {
  appointment_date: string;
  status: string;
  doctor_id: number;
  doctor_name: string;
  reason: string;
}

interface Laboratory {
  id: string;
  lab_request: string;
  image: string;
  image_url: string;
  uploaded_at: string;
  submitted_by: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

interface PatientData {
  patient: PatientInfo;
  preliminary_assessment: PreliminaryAssessment;
  latest_treatment: TreatmentRecord;
  latest_treatment_id: number;
  appointments: Appointment[];
  laboratories: Laboratory | null;
}

// Health Tips Interfaces
interface GeneratedTip {
  diagnosis_id: number;
  diagnosis_code: string;
  diagnosis_description: string;
  tip_text: string;
  source: string;
}

interface HealthTip {
  id: number;
  patient: string;
  diagnosis: number;
  doctor: number;
  tip_text: string;
  source: string;
  is_for_patient: boolean;
  status: string;
  is_auto_generated: boolean;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

// Date formatting utility
const formatDateTime = (datetime: string | undefined) => {
  if (!datetime) {
    return { date: '-', time: '-' };
  }

  try {
    const parsed = new Date(datetime);
    if (Number.isNaN(parsed.getTime())) {
      return { date: datetime, time: '' };
    }

    const date = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(parsed);

    const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).format(parsed);

    return { date, time };
  } catch (error) {
    console.error('Error formatting date:', error);
    return { date: datetime, time: '' };
  }
};

const formatDateOnly = (dateString: string | undefined) => {
  if (!dateString) return '-';
  
  try {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) {
      return dateString;
    }
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(parsed);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString || '-';
  }
};

// Skeleton Loading Components
const SkeletonLoader = () => (
  <main className="min-h-screen p-8">
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b pb-8">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Personal Info Skeleton */}
          <div className="rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Tips Skeleton */}
          <div className="rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Health Overview Skeleton */}
          <div className="rounded-xl border p-6 shadow-sm">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// Edit Profile Modal Component
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientInfo | null;
  onSave: (patientData: any) => void;
}

function EditProfileModal({ isOpen, onClose, patient, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    street_address: "",
    barangay: "",
    municipal_city: "",
    gender: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        first_name: patient.first_name || "",
        middle_name: patient.middle_name || "",
        last_name: patient.last_name || "",
        email: patient.email || "",
        phone_number: patient.phone_number || "",
        date_of_birth: patient.date_of_birth || "",
        street_address: patient.street_address || "",
        barangay: patient.barangay || "",
        municipal_city: patient.municipal_city || "",
        gender: patient.gender || "",
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Patient Profile</h2>
            <p className="text-sm text-gray-600 mt-1">
              Patient ID: <span className="font-semibold">{patient.patient_id}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                value={formData.middle_name}
                onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email *
              </label>
<input
  type="email"
  value={formData.email}
  readOnly
  tabIndex={-1}
  onFocus={(e) => e.target.blur()}
  className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white text-gray-700 cursor-default focus:outline-none transition-colors"
/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              value={formData.street_address}
              onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Barangay
              </label>
              <input
                type="text"
                value={formData.barangay}
                onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Municipal/City
              </label>
              <input
                type="text"
                value={formData.municipal_city}
                onChange={(e) => setFormData({ ...formData, municipal_city: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// View All Modals
interface ViewAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function ViewAllModal({ isOpen, onClose, title, children }: ViewAllModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Health Tips Component
// Health Tips Component
// Health Tips Component - Simplified version
interface HealthTipsProps {
  patientData: PatientData | null;
  patientId: string;
}

function HealthTips({ patientData, patientId }: HealthTipsProps) {
  const [generatedTips, setGeneratedTips] = useState<GeneratedTip[]>([]);
  const [savedTips, setSavedTips] = useState<HealthTip[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [combinedTipsText, setCombinedTipsText] = useState("");

  // Fetch existing health tips
  const fetchHealthTips = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patients/${patientId}/health-tips/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSavedTips(data.tips || []);
        }
      }
    } catch (error) {
      console.error("Error fetching health tips:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchHealthTips();
    }
  }, [patientId]);

  const handleGenerateTips = async () => {
    if (!patientData) return;

    setIsGenerating(true);
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/health-tips/generate-preview/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            patient_id: patientId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        setGeneratedTips(data.generated_tips || []);
        
        // Combine all tips into a single text with bullet points
        const allTips = data.generated_tips.map((tip: GeneratedTip) => 
          `• ${tip.tip_text}`
        ).join('\n');
        
        setCombinedTipsText(allTips);
        setIsEditing(true);
      } else {
        console.error("Failed to generate tips:", data.error);
        alert(`Failed to generate health tips: ${data.error}`);
      }
    } catch (error: any) {
      console.error("Error generating health tips:", error);
      alert(`Error generating health tips: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTips = async () => {
    if (!patientData) return;

    setIsSaving(true);
    try {
      const accessToken = localStorage.getItem("access");
      
      // Split the combined text back into individual tips
      const tipLines = combinedTipsText.split('\n')
        .filter(line => line.trim().startsWith('•') || line.trim().length > 0)
        .map(line => line.replace(/^•\s*/, '').trim())
        .filter(line => line.length > 0);

      // Prepare tips data for saving
      const tipsToSave = tipLines.map((tipText, index) => {
        const originalTip = generatedTips[index] || generatedTips[0];
        return {
          diagnosis_id: originalTip?.diagnosis_id || patientData.latest_treatment.diagnoses[0]?.id,
          tip_text: tipText,
          source: 'auto_generated'
        };
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/health-tips/save-generated/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            patient_id: patientId,
            tips: tipsToSave,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(`Successfully saved ${data.saved_count} health tips!`);
        setIsEditing(false);
        setGeneratedTips([]);
        setCombinedTipsText("");
        // Refresh the saved tips list
        fetchHealthTips();
      } else {
        console.error("Failed to save tips:", data.error);
        alert("Failed to save health tips. Please try again.");
      }
    } catch (error) {
      console.error("Error saving health tips:", error);
      alert("Error saving health tips. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setGeneratedTips([]);
    setCombinedTipsText("");
  };

  return (
    <div className="card rounded-xl border p-6 shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <FaLightbulb className="h-6 w-6 text-yellow-600" />
          Health Tips
        </h2>
        <div className="flex gap-2">
          {!isEditing && (
            <Button
              onClick={handleGenerateTips}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <FaLightbulb className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Health Tips"}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6">
        {isEditing ? (
          <div className="space-y-6">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Review and Edit Health Tips</h3>
              <p className="text-blue-700 text-sm">
                The system has generated health tips based on the patient's diagnoses. 
                You can review and edit all tips in the text area below.
              </p>
            </div>

            {/* Single textarea for all tips */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Health Tips (one per line)
              </label>
              <textarea
                value={combinedTipsText}
                onChange={(e) => setCombinedTipsText(e.target.value)}
                rows={12}
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors text-sm resize-vertical"
                placeholder="• Drink plenty of fluids to stay hydrated.
• Rest in a cool, comfortable environment.
• Monitor your symptoms regularly..."
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{combinedTipsText.split('\n').filter(line => line.trim().length > 0).length} tips</span>
                <span>Tips will be saved immediately and shown to the patient</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <FaTimes className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveTips}
                disabled={isSaving || !combinedTipsText.trim()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaSave className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Health Tips"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px]">
            {savedTips.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Health Tips</h3>
                  <span className="text-sm text-gray-500">
                    {savedTips.length} tip{savedTips.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedTips.map((tip) => (
                    <div key={tip.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500">
                          {formatDateTime(tip.created_at).date}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{tip.tip_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-lg">
                <div>
                  <FaLightbulb className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-lg font-medium text-gray-600">
                    No health tips yet
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Click the button to generate personalized health tips
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );


}

export default function Page() {
  const [data, setData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewAllModal, setViewAllModal] = useState({
    isOpen: false,
    type: '',
    title: ''
  });

  const { patient_id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          console.error("No access token found");
          setLoading(false);
          return;
        }
        if (!patient_id) {
          console.error("No patient ID found");
          setLoading(false);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-info/${patient_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include'
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Patient data:", json);
        setData(json);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patient_id]);

  const handleSaveProfile = async (patientData: any) => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patient/update-patient/${patient_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(patientData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPatient = await response.json();
      setData(prev => prev ? { ...prev, patient: { ...prev.patient, ...updatedPatient } } : null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const openViewAllModal = (type: string, title: string) => {
    setViewAllModal({ isOpen: true, type, title });
  };

  const closeViewAllModal = () => {
    setViewAllModal({ isOpen: false, type: '', title: '' });
  };

  // Filter scheduled appointments for the main page
  const scheduledAppointments = data?.appointments?.filter(appt => appt.status === 'Scheduled') || [];
  
  // All appointments for the modal (including completed)
  const allAppointments = data?.appointments || [];

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!data) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-red-600">Failed to load patient data.</p>
          </div>
        </div>
      </main>
    );
  }

  const { patient, preliminary_assessment, latest_treatment, laboratories } = data;

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b pb-8">
          {/* Left: Title */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Patient Profile
            </h1>
            <p className="mt-2 text-lg font-medium">
              Medical records and health information
            </p>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-4">
            <Link href={`/doctor/patient-report/${patient_id}`} passHref>
              <Button
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <FaFile className="h-4 w-4" />
                Reports
              </Button>
            </Link>

            {/* Edit Profile Button */}
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FaPenToSquare className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Personal Information Card */}
            <div className="card rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-100">
                  <FaUser className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-normal">
                    {`${patient.first_name} ${patient.middle_name} ${patient.last_name}`}
                  </h2>
                  <p className="font-medium">
                    {patient.gender} • {patient.age} years •{" "}
                    {formatDateOnly(patient.date_of_birth)}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-4 border-r pr-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    CONTACT
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-base font-medium">
                      <span>📞</span>
                      {patient.phone_number}
                    </p>
                    <p className="flex items-center gap-2 text-base font-medium">
                      <span>✉️</span>
                      {patient.email}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                      ADDRESS
                    </h3>
                    <p className="mt-2 text-base">
                      {patient.street_address}, {patient.barangay}, {patient.municipal_city}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    MEDICAL DETAILS
                  </h3>
                  <div className="space-y-2">
                    <p className="text-base">
                      <span className="font-semibold">Last Visit:</span>{" "}
                      {(() => {
                        const { date, time } = formatDateTime(patient.queue_data.created_at);
                        return `${date} at ${time}`;
                      })()}
                    </p>
                    <p className="text-base">
                      <span className="font-semibold">Complaint:</span>{" "}
                      {patient.queue_data.complaint}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Tips Card - MOVED TO TOP OF LEFT COLUMN */}


            {/* Appointments Card - Only Scheduled */}
            <div className="card rounded-xl border p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <FaRegCalendarCheck className="h-6 w-6 text-green-600" />
                  Scheduled Appointments
                </h2>
                <button
                  onClick={() => openViewAllModal('appointments', 'All Appointments')}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600"
                >
                  View All
                  <FaPenToSquare className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {scheduledAppointments.slice(0, 3).map((appt, idx) => {
                  const { date, time } = formatDateTime(appt.appointment_date);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border-2 p-4 transition-colors"
                    >
                      <div>
                        <h3 className="text-base font-semibold">
                          {appt.reason}
                        </h3>
                        <p className="text-sm font-medium">
                          Dr. {appt.doctor_name}
                        </p>
                        <p className="text-xs text-blue-600 uppercase">
                          Status: {appt.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold">
                          {date}
                        </p>
                        <p className="text-sm font-medium">
                          {time}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {scheduledAppointments.length === 0 && (
                  <p className="text-center text-gray-500">
                    No scheduled appointments found.
                  </p>
                )}
              </div>
            </div>

            {/* Prescriptions Card */}
            <div className="card rounded-xl border p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <FaPrescription className="h-6 w-6 text-purple-600" />
                  Prescriptions
                </h2>
                <button
                  onClick={() => openViewAllModal('prescriptions', 'All Prescriptions')}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600"
                >
                  View All
                  <FaPenToSquare className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm font-semibold tracking-wide">
                      <th className="pb-3">Medication</th>
                      <th className="pb-3">Dosage</th>
                      <th className="pb-3">Frequency</th>
                      <th className="pb-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {latest_treatment.prescriptions.slice(0, 3).map((pres, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 text-base font-medium">
                          {pres.medicine_medicine.name}
                        </td>
                        <td className="py-3 text-base">{pres.dosage}</td>
                        <td className="py-3 text-base">{pres.frequency}</td>
                        <td className="py-3 text-base">
                          {formatDateOnly(pres.start_date)} –{' '}
                          {formatDateOnly(pres.end_date)}
                        </td>
                      </tr>
                    ))}
                    {latest_treatment.prescriptions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-3 text-center text-gray-500">
                          No prescriptions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <HealthTips patientData={data} patientId={patient_id as string} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Health Overview Card */}
            <div className="card rounded-xl border border-l-4 border-orange-500 p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
                <FaNotesMedical className="h-6 w-6 text-orange-600" />
                Health Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    VITAL SIGNS
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <p><span className="font-semibold">BP:</span> {preliminary_assessment.blood_pressure}</p>
                    <p><span className="font-semibold">Temp:</span> {preliminary_assessment.temperature}°C</p>
                    <p><span className="font-semibold">Heart Rate:</span> {preliminary_assessment.heart_rate}</p>
                    <p><span className="font-semibold">Resp Rate:</span> {preliminary_assessment.respiratory_rate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    MEDICAL HISTORY
                  </h3>
                  <p className="mt-2 text-base leading-relaxed">
                    {preliminary_assessment.medical_history || "No medical history recorded"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    ALLERGIES
                  </h3>
                  <p className="mt-2 text-base leading-relaxed">
                    {preliminary_assessment.allergies || "No known allergies"}
                  </p>
                </div>
              </div>
            </div>

            {/* Lab Results Card */}
            <div className="card rounded-xl border p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <FaFile className="h-6 w-6 text-red-600" />
                  Lab Results
                </h2>
                <button
                  onClick={() => openViewAllModal('labs', 'Laboratory Results')}
                  className="border-b border-transparent text-sm font-medium text-blue-600"
                >
                  View All
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {laboratories ? (
                  <div className="flex items-center justify-between rounded-lg border-2 p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <FaFile className="h-5 w-5" />
                      <div>
                        <span className="text-base font-medium">
                          Lab Result {laboratories.id ?? ''}
                        </span>
                        <p className="text-sm text-gray-500">
                          Uploaded: {formatDateOnly(laboratories.uploaded_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={laboratories.image_url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={laboratories.image_url} download>
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border-2 p-4 text-center text-gray-600">
                    No laboratory results available.
                  </div>
                )}
              </div>
            </div>

            {/* Clinical Notes Card */}
            <div className="card rounded-xl border p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold tracking-tight">
                Clinical Notes
              </h2>
              <div className="space-y-3">
                <p className="text-base font-medium">
                  Assessment: {preliminary_assessment.assessment}
                </p>
                <p className="text-base leading-relaxed">
                  {latest_treatment.treatment_notes || "No treatment notes available."}
                </p>
                {latest_treatment.diagnoses.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mt-4">
                      DIAGNOSES
                    </h3>
                    <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed mt-2">
                      {latest_treatment.diagnoses.map((diagnosis, idx) => (
                        <li key={idx}>
                          {diagnosis.diagnosis_description} ({diagnosis.diagnosis_code})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={patient}
        onSave={handleSaveProfile}
      />

      {/* View All Modals */}
      <ViewAllModal
        isOpen={viewAllModal.isOpen}
        onClose={closeViewAllModal}
        title={viewAllModal.title}
      >
        {viewAllModal.type === 'appointments' && (
          <div className="space-y-4">
            {allAppointments.map((appt, idx) => {
              const { date, time } = formatDateTime(appt.appointment_date);
              return (
                <div key={idx} className="flex items-center justify-between rounded-lg border-2 p-4">
                  <div>
                    <h3 className="text-lg font-semibold">{appt.reason}</h3>
                    <p className="text-base">Dr. {appt.doctor_name}</p>
                    <p className={`text-sm ${
                      appt.status === 'Scheduled' ? 'text-blue-600' :
                      appt.status === 'Completed' ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      Status: {appt.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {date}
                    </p>
                    <p className="text-base">
                      {time}
                    </p>
                  </div>
                </div>
              );
            })}
            {allAppointments.length === 0 && (
              <p className="text-center text-gray-500">No appointments found.</p>
            )}
          </div>
        )}

        {viewAllModal.type === 'prescriptions' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-sm font-semibold tracking-wide">
                  <th className="pb-3">Medication</th>
                  <th className="pb-3">Dosage</th>
                  <th className="pb-3">Frequency</th>
                  <th className="pb-3">Quantity</th>
                  <th className="pb-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {latest_treatment.prescriptions.map((pres, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 text-base font-medium">
                      {pres.medicine_medicine.name}
                    </td>
                    <td className="py-3 text-base">{pres.dosage}</td>
                    <td className="py-3 text-base">{pres.frequency}</td>
                    <td className="py-3 text-base">{pres.quantity}</td>
                    <td className="py-3 text-base">
                      {formatDateOnly(pres.start_date)} –{' '}
                      {formatDateOnly(pres.end_date)}
                    </td>
                  </tr>
                ))}
                {latest_treatment.prescriptions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-500">
                      No prescriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {viewAllModal.type === 'labs' && (
          <div className="space-y-4">
            {laboratories ? (
              <div className="rounded-lg border-2 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Lab Result {laboratories.id}</h3>
                    <p className="text-sm text-gray-500">
                      Request: {laboratories.lab_request}
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded: {(() => {
                        const { date, time } = formatDateTime(laboratories.uploaded_at);
                        return `${date} at ${time}`;
                      })()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Submitted by: {laboratories.submitted_by?.first_name ?? ''} {laboratories.submitted_by?.last_name ?? ''} ({laboratories.submitted_by?.role ?? ''})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={laboratories.image_url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={laboratories.image_url} download>
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <img 
                    src={laboratories.image_url} 
                    alt="Lab result" 
                    className="max-w-full h-auto rounded-lg border"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 p-6 text-center text-gray-600">
                No laboratory results available.
              </div>
            )}
          </div>
        )}
      </ViewAllModal>
    </main>
  );
}