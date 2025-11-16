"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import userInfo from "@/hooks/userRole";
import QueueTableToggle from "./queue-table-toggle";
import { DashboardTable } from "@/components/ui/dashboard-table";
import { columns } from "./columns";
import { registrations } from "@/lib/placeholder-data";
import PatientRoutingModal from "@/components/pages/PatientRoutingModal";

export interface PatientQueueItem {
  id: number;
  patient_id: string | null;
  first_name: string;
  last_name: string;
  age: number | null;
  phone_number: string | null;
  date_of_birth: string | null;
  complaint: string;
  queue_number: number;
  status: string;
  priority_level: string;
  created_at: string;
  is_new_patient: boolean;
  position?: number;
}

interface Patient {
  id: number;
  patient_id: string | null;
  patient_name: string;
  queue_number: number;
  priority_level: string;
  complaint: string;
  status: string;
  created_at: string;
  queue_date: string;
  is_new_patient?: boolean;
}

// Edit Modal Component
interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientQueueItem | null;
  onSave: (patient: PatientQueueItem) => void;
}

function EditPatientModal({ isOpen, onClose, patient, onSave }: EditPatientModalProps) {
  const [formData, setFormData] = useState({
    temp_first_name: "",
    temp_last_name: "",
    temp_phone_number: "",
    temp_date_of_birth: "",
    complaint: "",
    priority_level: "Regular",
  });

  const complaintOptions = [
    { value: "General Illness", label: "General Illness" },
    { value: "Injury", label: "Injury" },
    { value: "Check-up", label: "Check-up" },
    { value: "Other", label: "Other" },
  ];

  const priorityOptions = [
    { value: "Regular", label: "Regular" },
    { value: "Priority", label: "Priority" },
  ];

  useEffect(() => {
    if (patient) {
      // Map the current patient data to the serializer fields
      setFormData({
        temp_first_name: patient.first_name || "",
        temp_last_name: patient.last_name || "",
        temp_phone_number: patient.phone_number || "",
        temp_date_of_birth: patient.date_of_birth || "",
        complaint: patient.complaint || "",
        priority_level: patient.priority_level || "Regular",
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      // Map back to the original fields for saving
      const updatedPatient = {
        ...patient,
        first_name: formData.temp_first_name,
        last_name: formData.temp_last_name,
        phone_number: formData.temp_phone_number,
        date_of_birth: formData.temp_date_of_birth,
        complaint: formData.complaint,
        priority_level: formData.priority_level,
      };
      onSave(updatedPatient);
    }
  };

  const calculateAge = (dateString: string): number | null => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Patient Information</h2>
            <p className="text-sm text-gray-600 mt-1">
              Queue Number: <span className="font-semibold">#{patient.queue_number}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.temp_first_name}
                onChange={(e) => setFormData({ ...formData, temp_first_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Enter first name"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.temp_last_name}
                onChange={(e) => setFormData({ ...formData, temp_last_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.temp_phone_number}
                onChange={(e) => setFormData({ ...formData, temp_phone_number: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.temp_date_of_birth}
                onChange={(e) => setFormData({ ...formData, temp_date_of_birth: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              {formData.temp_date_of_birth && (
                <p className="text-sm text-gray-500 mt-1">
                  Age: {calculateAge(formData.temp_date_of_birth) ?? "N/A"}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Priority Level *
              </label>
              <select
                required
                value={formData.priority_level}
                onChange={(e) => setFormData({ ...formData, priority_level: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Complaint *
              </label>
              <select
                required
                value={formData.complaint}
                onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                <option value="">Select a complaint</option>
                {complaintOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className={buttonVariants({ variant: "outline" }) + " min-w-[100px]"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={buttonVariants({ variant: "default" }) + " min-w-[100px]"}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegistrationQueue() {
  const [priorityQueue, setPriorityQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  const [regularQueue, setRegularQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  const [selectedPatient, setSelectedPatient] = useState<PatientQueueItem | null>(null);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<PatientQueueItem | null>(null);

  const router = useRouter();

  const convertToPatient = (
    queueItem: PatientQueueItem | null
  ): Patient | null => {
    if (!queueItem) return null;
    return {
      id: queueItem.id,
      patient_id: queueItem.patient_id,
      patient_name: `${queueItem.first_name} ${queueItem.last_name}`,
      queue_number: queueItem.queue_number,
      priority_level: queueItem.priority_level || "Regular",
      complaint: queueItem.complaint,
      status: queueItem.status || "Waiting",
      created_at: queueItem.created_at || new Date().toISOString(),
      queue_date: queueItem.created_at || new Date().toISOString(),
      is_new_patient: queueItem.is_new_patient || false,
    };
  };

  const displayAge = (age: number | null | undefined): string => {
    if (age === null || age === undefined) return "N/A";
    return `${age}`;
  };

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const token = localStorage.getItem("access");
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/queueing/registration_queueing/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        const data = await resp.json();


        const pr = [
          data.priority_current,
          data.priority_next1,
          data.priority_next2,
        ].map(item => item ? {
          ...item,
          first_name: item.first_name || "Unknown",
          last_name: item.last_name || "Patient",
          phone_number: item.phone_number || null,
          date_of_birth: item.date_of_birth || null,
          age: item.age || null,
          is_new_patient: item.is_new_patient ?? true
        } : null);

        const rg = [
          data.regular_current,
          data.regular_next1,
          data.regular_next2,
        ].map(item => item ? {
          ...item,
          first_name: item.first_name || "Unknown",
          last_name: item.last_name || "Patient",
          phone_number: item.phone_number || null,
          date_of_birth: item.date_of_birth || null,
          age: item.age || null,
          is_new_patient: item.is_new_patient ?? true
        } : null);

        setPriorityQueue({
          current: pr[0] ?? null,
          next1: pr[1] ?? null,
          next2: pr[2] ?? null,
        });
        setRegularQueue({
          current: rg[0] ?? null,
          next1: rg[1] ?? null,
          next2: rg[2] ?? null,
        });

      } catch (err) {
        console.error("Error fetching queue:", err);
      }
    };

    fetchQueueData();

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const backendHost =
      process.env.NODE_ENV === "production"
        ? "thesis-backend.up.railway.app"
        : "localhost:8000";

    const socket = new WebSocket(
      `${protocol}://${backendHost}/ws/queue/registration/`
    );

    socket.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        console.log("WebSocket message received:", msg);

        // KEEPING ORIGINAL FIELD NAMES
        const pr = [
          msg.priority_current,
          msg.priority_next1,
          msg.priority_next2,
        ].map(item => item ? {
          ...item,
          first_name: item.first_name || "Unknown",
          last_name: item.last_name || "Patient",
          phone_number: item.phone_number || null,
          date_of_birth: item.date_of_birth || null,
          age: item.age || null,
          is_new_patient: item.is_new_patient ?? true
        } : null);

        const rg = [
          msg.regular_current,
          msg.regular_next1,
          msg.regular_next2,
        ].map(item => item ? {
          ...item,
          first_name: item.first_name || "Unknown",
          last_name: item.last_name || "Patient",
          phone_number: item.phone_number || null,
          date_of_birth: item.date_of_birth || null,
          age: item.age || null,
          is_new_patient: item.is_new_patient ?? true
        } : null);

        setPriorityQueue({
          current: pr[0] ?? null,
          next1: pr[1] ?? null,
          next2: pr[2] ?? null,
        });
        setRegularQueue({
          current: rg[0] ?? null,
          next1: rg[1] ?? null,
          next2: rg[2] ?? null,
        });

      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };

    const intervalId = setInterval(fetchQueueData, 30000);
    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, []);

  const handleAccept = (queueItem: PatientQueueItem) => {
    setSelectedPatient(queueItem);
    setIsRoutingModalOpen(true);
  };

  const handleEdit = (queueItem: PatientQueueItem) => {
    setPatientToEdit(queueItem);
    setIsEditModalOpen(true);
  };

const handleSaveEdit = async (updatedPatient: PatientQueueItem) => {
  try {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("No access token found. User may need to sign in.");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE}/registration-viewset/${updatedPatient.id}/patient-edit/`;

    // Prepare payload using serializer field names expected by Django
    const payload = {
      temp_first_name: updatedPatient.first_name,
      temp_last_name: updatedPatient.last_name,
      temp_phone_number: updatedPatient.phone_number,
      temp_date_of_birth: updatedPatient.date_of_birth, // ensure ISO format if required
      complaint: updatedPatient.complaint,
      priority_level: updatedPatient.priority_level,
    };

    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle common HTTP errors
    if (resp.status === 401 || resp.status === 403) {
      throw new Error(`Authorization error (status ${resp.status}).`);
    }
    if (!resp.ok) {
      // try to include server error details if available
      let text = await resp.text();
      try {
        const json = JSON.parse(text);
        throw new Error(`HTTP ${resp.status}: ${JSON.stringify(json)}`);
      } catch {
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }
    }

    // If the server returns JSON with the updated instance, use it.
    // Some APIs return 204 No Content for PATCH — guard for that.
    let serverData: any = null;
    const contentType = resp.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      serverData = await resp.json();
    }

    // Update local queues with the server-canonical representation if available,
    // otherwise fall back to the optimistic `updatedPatient`.
    const newItem = serverData ?? updatedPatient;

    const updateQueue = (queue: typeof priorityQueue) => {
      // If your queues are objects keyed by something other than index,
      // adapt the logic below. This assumes queue is a plain object mapping keys -> item,
      // which matches your original code.
      const updated = { ...queue };
      Object.keys(updated).forEach((key) => {
        const queueItem = updated[key as keyof typeof queue] as any;
        if (queueItem && queueItem.id === updatedPatient.id) {
          // Map server fields into the shape your UI expects if needed:
          // e.g. if server returns temp_first_name, map to first_name
          updated[key as keyof typeof queue] = {
            ...queueItem,
            // use server values when present, otherwise keep existing UI fields
            id: newItem.id ?? queueItem.id,
            first_name: newItem.temp_first_name ?? newItem.first_name ?? queueItem.first_name,
            last_name: newItem.temp_last_name ?? newItem.last_name ?? queueItem.last_name,
            phone_number: newItem.temp_phone_number ?? queueItem.phone_number,
            date_of_birth: newItem.temp_date_of_birth ?? queueItem.date_of_birth,
            complaint: newItem.complaint ?? queueItem.complaint,
            priority_level: newItem.priority_level ?? queueItem.priority_level,
            // include any other UI fields you rely on
          };
        }
      });
      return updated;
    };

    setPriorityQueue((prev) => updateQueue(prev));
    setRegularQueue((prev) => updateQueue(prev));

    setIsEditModalOpen(false);
    setPatientToEdit(null);
  } catch (error) {
    console.error("Error updating patient:", error);
    // optionally show user-facing notification here
  }
};


  const handleRoutePatient = async (
    queueItem: PatientQueueItem | null,
    action: string
  ) => {
    if (!queueItem) return;
    try {
      const token = localStorage.getItem("access");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patient/update-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            queue_entry_id: queueItem.id,
            action,
          }),
        }
      );
      setIsRoutingModalOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error updating queue:", error);
    }
  };

const handleCancelPatient = async (queueItem: PatientQueueItem) => {
  try {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("No access token found; user likely needs to sign in.");
      // optionally show user-facing error here
      return;
    }

    // Optional: ask for confirmation before cancelling
    const confirmed = window.confirm(`Cancel patient ${queueItem.first_name} ${queueItem.last_name}?`);
    if (!confirmed) return;

    // Disable UI / mark item as processing if you have that state
    // setIsProcessingId(queueItem.id);

    const url = `${process.env.NEXT_PUBLIC_API_BASE}/registration-viewset/${queueItem.id}/cancel-patient/`;
    const resp = await fetch(url, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Handle common HTTP statuses
    if (resp.status === 401 || resp.status === 403) {
      throw new Error(`Authorization error (status ${resp.status}).`);
    }

    // 204 No Content is expected; treat 200/204 as success. 404 => already deleted.
    if (resp.status === 404) {
      console.warn("Item not found on server (already cancelled). Will remove locally.");
    } else if (!resp.ok) {
      // try to extract server error info
      let body = await resp.text();
      try {
        const json = JSON.parse(body);
        throw new Error(`HTTP ${resp.status}: ${JSON.stringify(json)}`);
      } catch {
        throw new Error(`HTTP ${resp.status}: ${body}`);
      }
    }

    // Success — remove the item from local queues
    const removeFromQueues = (queueObj: typeof priorityQueue) => {
      const updated = { ...queueObj };
      Object.keys(updated).forEach((key) => {
        const item = updated[key as keyof typeof updated] as any;
        if (item && item.id === queueItem.id) {
          delete updated[key as keyof typeof updated]; // or set to null depending on your structure
        }
      });
      return updated;
    };

    setPriorityQueue(prev => removeFromQueues(prev));
    setRegularQueue(prev => removeFromQueues(prev));

    // Optional: user feedback
    // showToast("Patient cancelled successfully.");
  } catch (error) {
    console.error("Error canceling patient:", error);
    // Optionally show user-facing error (toast/snackbar)
  } finally {
    // clear processing state if set: setIsProcessingId(null)
  }
};


  const renderPatientInfo = (queueItem: PatientQueueItem | null) => {
    if (!queueItem) {
      return (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 border-b border-blue-100 pb-2 text-xl font-semibold text-blue-700">
            Patient Information
          </h3>
          <p className="text-gray-600">No current patient in the queue.</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 border-b border-blue-100 pb-2 text-xl font-semibold text-blue-700">
          Patient Information
          {queueItem.is_new_patient && (
            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              New Patient
            </span>
          )}
          {!queueItem.is_new_patient && queueItem.patient_id && (
            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Existing Patient
            </span>
          )}
        </h3>

        <div className="mb-3 space-y-1">
          <p>
            <span className="font-semibold text-gray-700">Name: </span>
            {queueItem.first_name} {queueItem.last_name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Age: </span>
            {displayAge(queueItem.age)}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Priority: </span>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              queueItem.priority_level === 'Priority' 
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {queueItem.priority_level}
            </span>
          </p>
        </div>

        <div className="mb-4 border-t border-gray-200 pt-3">
          <p>
            <span className="font-semibold text-gray-700">Phone Number: </span>
            {queueItem.phone_number || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Complaint: </span>
            {queueItem.complaint || "N/A"}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            onClick={() => handleAccept(queueItem)}
            className={buttonVariants({ variant: "default" })}
          >
            Accept
          </button>
          <button
            onClick={() => handleEdit(queueItem)}
            className={buttonVariants({ variant: "outline" })}
          >
            Edit
          </button>
          <button
            onClick={() => handleCancelPatient(queueItem)}
            className={buttonVariants({ variant: "destructive" })}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const QueueCard = ({
    queueItem,
    label,
    status,
  }: {
    queueItem: PatientQueueItem | null;
    label: string;
    status: "current" | "next";
  }) => (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border
        ${
          status === "current"
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-300 bg-white hover:shadow-md transition-shadow duration-300"
        }
        w-64 h-72 p-6 cursor-default select-none`}
      title={
        queueItem
          ? `${queueItem.first_name} ${queueItem.last_name} - ${queueItem.complaint}${queueItem.is_new_patient ? " (New)" : ""}`
          : undefined
      }
    >
      <p
        className={`text-7xl font-extrabold mb-4 ${
          status === "current" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {queueItem ? `#${queueItem.queue_number}` : "N/A"}
      </p>
      <span className="text-lg font-semibold text-gray-800">{label}</span>
      <span
        className={`text-sm mt-1 ${
          status === "current" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {status === "current" ? "Current Patient" : "Next in Queue"}
      </span>
      {queueItem && (
        <div className="mt-2 text-xs text-gray-600 text-center">
          <p className={`text-xs ${
            queueItem.is_new_patient ? "text-yellow-600" : "text-green-600"
          }`}>
            {queueItem.is_new_patient ? "New Patient" : "Existing Patient"}
          </p>
        </div>
      )}
    </div>
  );

  const user = userInfo();
  const userRole = user?.role;

  if (userRole && !["secretary"].includes(userRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-gray-600">
        Not Authorized
      </div>
    );
  }

  if (!userRole) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col gap-12 bg-gray-50 px-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">
          Patient Registration Queue
        </h1>
        <QueueTableToggle />
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-blue-700">
          Priority Queue
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <QueueCard
            queueItem={priorityQueue.current}
            label="Priority"
            status="current"
          />
          <QueueCard
            queueItem={priorityQueue.next1}
            label="Priority"
            status="next"
          />
          <QueueCard
            queueItem={priorityQueue.next2}
            label="Priority"
            status="next"
          />
          {renderPatientInfo(priorityQueue.current)}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          Regular Queue
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <QueueCard
            queueItem={regularQueue.current}
            label="Regular"
            status="current"
          />
          <QueueCard
            queueItem={regularQueue.next1}
            label="Regular"
            status="next"
          />
          <QueueCard
            queueItem={regularQueue.next2}
            label="Regular"
            status="next"
          />
          {renderPatientInfo(regularQueue.current)}
        </div>
      </section>

      <PatientRoutingModal
        isOpen={isRoutingModalOpen}
        onClose={() => {
          setIsRoutingModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={convertToPatient(selectedPatient)}
        onRoutePatient={(patient, action) => {
          handleRoutePatient(selectedPatient, action);
        }}
      />

      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPatientToEdit(null);
        }}
        patient={patientToEdit}
        onSave={handleSaveEdit}
      />
    </main>
  );
}