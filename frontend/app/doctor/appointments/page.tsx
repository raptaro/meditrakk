'use client'
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, ArrowRight, Search, Eye, EyeOff, Calendar, User, Stethoscope, X, Clock, MapPin, FileText, Save, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: number;
  patient: string;
  patient_name: string;
  doctor: number;
  doctor_name: string;
  appointment_date: string;
  status: 'PendingPayment' | 'Scheduled' | 'Waiting' | 'Completed' | 'Cancelled' | 'Pending' | 'Canceled' | string;
  appointment_type: string;
  notes: string | null;
  referral_info?: {
    referral_id: number;
    referring_doctor: string;
    referral_status: string;
    reason: string;
  };
  is_my_appointment?: boolean;
  scheduled_by?: string;
  scheduled_by_name?: string;
}

interface AppointmentResponse {
  my_direct_appointments?: {
    scheduled: Appointment[];
    completed: Appointment[];
    waiting: Appointment[];
    pending_payment: Appointment[];
  };
  other_doctors_appointments?: {
    scheduled: Appointment[];
    completed: Appointment[];
    waiting: Appointment[];
    pending_payment: Appointment[];
  };
  referrals_i_made?: any[];
  my_appointments?: {
    scheduled: Appointment[];
    completed: Appointment[];
    waiting: Appointment[];
    pending_payment: Appointment[];
  };
  referrals_assigned_to_me?: {
    pending: any[];
    scheduled: any[];
    completed: any[];
    canceled: any[];
  };
  scheduled?: Appointment[];
  completed?: Appointment[];
  waiting?: Appointment[];
  pending_payment?: Appointment[];
}

interface UserData {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface EditableAppointment {
  id: number;
  patient: string;
  patient_name: string;
  doctor: number;
  doctor_name: string;
  appointment_date: string;
  status: string;
  appointment_type: string;
  notes: string;
  referral_info?: {
    referral_id: number;
    referring_doctor: string;
    referral_status: string;
    reason: string;
  };
}

export default function AppointmentView() {
  const [appointmentData, setAppointmentData] = useState<AppointmentResponse>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [showOtherAppointments, setShowOtherAppointments] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'referrals'>('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableAppointment, setEditableAppointment] = useState<EditableAppointment | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/my_appointments/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data: AppointmentResponse = await res.json();
        setAppointmentData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/user/users/whoami/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) return;
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Check if user can edit an appointment - UPDATED FOR BETTER DOCTOR ACCESS
  const canUserEditAppointment = (appointment: Appointment) => {
    if (!currentUser) return false;
    
    // On-call doctors can edit all appointments
    if (currentUser.role === 'on-call-doctor') {
      return true;
    }
    
    // Doctors can edit appointments where they are the assigned doctor
    // OR appointments marked as their own
    if (currentUser.role === 'doctor') {
      // If the backend explicitly marks it as the doctor's appointment
      if (appointment.is_my_appointment === true) {
        return true;
      }
      
      // If the doctor's name matches the assigned doctor name
      const currentUserName = `${currentUser.first_name} ${currentUser.last_name}`;
      if (appointment.doctor_name && appointment.doctor_name.includes(currentUserName)) {
        return true;
      }
      
      // Additional check: if the doctor ID matches (if we have current user ID as number)
      // This would require converting currentUser.id to number if needed
      try {
        const currentUserIdNum = parseInt(currentUser.id);
        if (!isNaN(currentUserIdNum) && appointment.doctor === currentUserIdNum) {
          return true;
        }
      } catch (e) {
        console.log('Could not parse user ID for comparison');
      }
      
      return true; // TEMPORARY: Allow all doctors to edit for testing
    }
    
    return false;
  };

  // Initialize editable appointment when modal opens
  const handleOpenSummary = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditableAppointment({
      id: appointment.id,
      patient: appointment.patient,
      patient_name: appointment.patient_name,
      doctor: appointment.doctor,
      doctor_name: appointment.doctor_name,
      appointment_date: appointment.appointment_date,
      status: appointment.status,
      appointment_type: appointment.appointment_type,
      notes: appointment.notes || '',
      referral_info: appointment.referral_info
    });
    setIsSummaryModalOpen(true);
    setIsEditMode(false);
  };

  // Handle field changes in edit mode
  const handleFieldChange = (field: keyof EditableAppointment, value: string) => {
    if (!editableAppointment) return;
    
    setEditableAppointment(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  // Save appointment changes
  const handleSaveAppointment = async () => {
    if (!editableAppointment || !selectedAppointment) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("access");
      const updates = {
        notes: editableAppointment.notes,
        appointment_date: editableAppointment.appointment_date,
        status: editableAppointment.status,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/${editableAppointment.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!res.ok) throw new Error("Update failed");
      
      const updatedAppointment = await res.json();
      
      // Refresh appointments after update
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/my_appointments/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (refreshRes.ok) {
        const newData = await refreshRes.json();
        setAppointmentData(newData);
      }

      // Update local state
      setSelectedAppointment(updatedAppointment);
      setIsEditMode(false);
      setError(null);
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update appointment");
    } finally {
      setSaving(false);
    }
  };

  // Reset edits
  const handleResetEdits = () => {
    if (selectedAppointment) {
      setEditableAppointment({
        id: selectedAppointment.id,
        patient: selectedAppointment.patient,
        patient_name: selectedAppointment.patient_name,
        doctor: selectedAppointment.doctor,
        doctor_name: selectedAppointment.doctor_name,
        appointment_date: selectedAppointment.appointment_date,
        status: selectedAppointment.status,
        appointment_type: selectedAppointment.appointment_type,
        notes: selectedAppointment.notes || '',
        referral_info: selectedAppointment.referral_info
      });
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsSummaryModalOpen(false);
    setIsEditMode(false);
    setSelectedAppointment(null);
    setEditableAppointment(null);
    setError(null);
  };

  // Flatten appointments based on user role
  const getFlattenedAppointments = () => {
    let scheduled: Appointment[] = [];
    let other: Appointment[] = [];

    if (currentUser?.role === 'doctor') {
      if (appointmentData.my_direct_appointments) {
        scheduled = [
          ...(appointmentData.my_direct_appointments.scheduled || []),
          ...(appointmentData.other_doctors_appointments?.scheduled || [])
        ];
        other = [
          ...(appointmentData.my_direct_appointments.completed || []),
          ...(appointmentData.my_direct_appointments.waiting || []),
          ...(appointmentData.my_direct_appointments.pending_payment || []),
          ...(appointmentData.other_doctors_appointments?.completed || []),
          ...(appointmentData.other_doctors_appointments?.waiting || []),
          ...(appointmentData.other_doctors_appointments?.pending_payment || [])
        ];
      } else {
        scheduled = appointmentData.scheduled || [];
        other = [
          ...(appointmentData.completed || []),
          ...(appointmentData.waiting || []),
          ...(appointmentData.pending_payment || [])
        ];
      }
    } else if (currentUser?.role === 'on-call-doctor') {
      if (appointmentData.my_appointments) {
        scheduled = appointmentData.my_appointments.scheduled || [];
        other = [
          ...(appointmentData.my_appointments.completed || []),
          ...(appointmentData.my_appointments.waiting || []),
          ...(appointmentData.my_appointments.pending_payment || [])
        ];
      } else {
        scheduled = appointmentData.scheduled || [];
        other = [
          ...(appointmentData.completed || []),
          ...(appointmentData.waiting || []),
          ...(appointmentData.pending_payment || [])
        ];
      }
    } else {
      scheduled = appointmentData.scheduled || [];
      other = [
        ...(appointmentData.completed || []),
        ...(appointmentData.waiting || []),
        ...(appointmentData.pending_payment || [])
      ];
    }

    return { scheduled, other };
  };

  const { scheduled, other } = getFlattenedAppointments();

  const getStatusColor = (status: string | undefined) => {
    const normalized = (status || '').trim().toLowerCase();

    switch (normalized) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'waiting':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled':
      case 'canceled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pendingpayment':
      case 'pending_payment':
      case 'pending':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDateTime = (datetime: string | undefined) => {
    if (!datetime) {
      return { date: '-', time: '-' };
    }

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
  };

  const formatDateTimeForInput = (datetime: string) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    return date.toISOString().slice(0, 16);
  };

  const formatStatusLabel = (status: string | undefined) => {
    if (!status) return '-';
    const normalized = status.trim();
    switch (normalized) {
      case 'PendingPayment':
      case 'pending_payment':
        return 'Pending Payment';
      case 'Canceled':
        return 'Cancelled';
      default:
        return normalized;
    }
  };

  const formatAppointmentType = (type: string | undefined) => {
    if (!type) return '-';
    switch (type) {
      case 'clinic_scheduled':
        return 'Clinic Scheduled';
      case 'patient_request':
        return 'Patient Request';
      case 'referral':
        return 'Referral';
      default:
        return type.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const token = localStorage.getItem("access");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/${id}/cancel/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Cancel failed");
      
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/my_appointments/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (refreshRes.ok) {
        const newData = await refreshRes.json();
        setAppointmentData(newData);
        handleCloseModal();
      }
    } catch (error) {
      console.error("Cancel error:", error);
      setError("Failed to cancel appointment");
    }
  };

  const handleComplete = async (id: number) => {
    if (!confirm("Mark this appointment as completed?")) return;

    try {
      const token = localStorage.getItem("access");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/${id}/complete_treatment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Completion failed");
      
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/my_appointments/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (refreshRes.ok) {
        const newData = await refreshRes.json();
        setAppointmentData(newData);
        handleCloseModal();
      }
    } catch (error) {
      console.error("Completion error:", error);
      setError("Failed to complete appointment");
    }
  };

  const handleProceed = (patientId: string, appointmentId?: number) => {
    if (appointmentId) {
      router.push(`/oncall-doctors/treatment-details/${patientId}/?appointment=${appointmentId}`);
    } else {
      router.push(`/oncall-doctors/treatment-details/${patientId}/`);
    }
  };

  const toggleNotes = (id: number) => {
    setExpandedNotes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filterAppointments = (apps: Appointment[]) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return apps;
    return apps.filter(apt =>
      (apt.patient_name || '').toLowerCase().includes(term) ||
      (apt.doctor_name || '').toLowerCase().includes(term) ||
      (apt.patient || '').toLowerCase().includes(term) ||
      (apt.scheduled_by_name || '').toLowerCase().includes(term)
    );
  };

  const AppointmentTable = ({ appointments, title, showDoctorType = false }: { 
    appointments: Appointment[], 
    title: string,
    showDoctorType?: boolean 
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">
          {title} ({appointments.length})
        </h2>
        {title === "Other Appointments" && (
          <button
            onClick={() => setShowOtherAppointments(!showOtherAppointments)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {showOtherAppointments ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showOtherAppointments ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {(title !== "Other Appointments" || showOtherAppointments) && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Doctor</th>
                {showDoctorType && (
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Type</th>
                )}
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Date & Time</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Appointment Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Notes</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={showDoctorType ? 9 : 8} className="px-6 py-12 text-center text-slate-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => {
                  const { date, time } = formatDateTime(appointment.appointment_date);
                  const isExpanded = expandedNotes.includes(appointment.id);
                  const notes = appointment.notes || 'No notes';
                  const shortNotes = notes.length > 40
                    ? notes.substring(0, 40) + '...'
                    : notes;
                  
                  const canPerformActions = canUserEditAppointment(appointment);

                  return (
                    <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono font-medium text-slate-900">#{appointment.id}</div>
                        {appointment.referral_info && (
                          <div className="text-xs text-purple-600 mt-1">Referral</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{appointment.patient_name}</div>
                          <div className="text-xs text-slate-500">ID: {appointment.patient}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">{appointment.doctor_name}</div>
                        {appointment.referral_info && (
                          <div className="text-xs text-slate-500">
                            Referred by: {appointment.referral_info.referring_doctor}
                          </div>
                        )}
                        {appointment.scheduled_by_name && (
                          <div className="text-xs text-slate-500">
                            Scheduled by: {appointment.scheduled_by_name}
                          </div>
                        )}
                      </td>
                      {showDoctorType && (
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            canPerformActions 
                              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                              : 'bg-green-100 text-green-700 border border-green-200'
                          }`}>
                            {canPerformActions ? 'My Patient' : 'Other Doctor'}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{date}</div>
                          <div className="text-xs text-slate-500">{time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {formatStatusLabel(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          {formatAppointmentType(appointment.appointment_type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-slate-600">
                          {isExpanded ? notes : shortNotes}
                          {notes.length > 40 && (
                            <button
                              onClick={() => toggleNotes(appointment.id)}
                              className="ml-2 text-blue-600 hover:text-blue-700 font-medium text-xs"
                            >
                              {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenSummary(appointment)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                            title="View Appointment Summary"
                          >
                            <Eye className="w-3 h-3" />
                            View Appt
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Editable Appointment Summary Modal Component
  const AppointmentSummaryModal = () => {
    if (!selectedAppointment || !editableAppointment) return null;

    const canEdit = canUserEditAppointment(selectedAppointment);
    const { date, time } = formatDateTime(selectedAppointment.appointment_date);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {isEditMode ? 'Edit Appointment' : 'Appointment Summary'}
              </h2>
              <p className="text-blue-100 text-sm">Appointment ID: #{selectedAppointment.id}</p>
            </div>
            <div className="flex items-center gap-2">
              {canEdit && !isEditMode && (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-white text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-200 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-6 mt-4">
              {error}
            </div>
          )}

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Patient Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Patient Name</label>
                      <p className="text-slate-900 font-medium">{selectedAppointment.patient_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Patient ID</label>
                      <p className="text-slate-700">{selectedAppointment.patient}</p>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Appointment Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Date & Time</label>
                      {isEditMode ? (
                        <input
                          type="datetime-local"
                          value={formatDateTimeForInput(editableAppointment.appointment_date)}
                          onChange={(e) => handleFieldChange('appointment_date', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <p className="text-slate-900">{date} at {time}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Status</label>
                      {isEditMode ? (
                        <select
                          value={editableAppointment.status}
                          onChange={(e) => handleFieldChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Waiting">Waiting</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="PendingPayment">Pending Payment</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAppointment.status)}`}>
                          {formatStatusLabel(selectedAppointment.status)}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Type</label>
                      <p className="text-slate-700">{formatAppointmentType(selectedAppointment.appointment_type)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Doctor Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Doctor Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">Assigned Doctor</label>
                      <p className="text-slate-900 font-medium">{selectedAppointment.doctor_name}</p>
                    </div>
                    {selectedAppointment.scheduled_by_name && (
                      <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Scheduled By</label>
                        <p className="text-slate-700">{selectedAppointment.scheduled_by_name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Referral Information */}
                {selectedAppointment.referral_info && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Referral Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Referring Doctor</label>
                        <p className="text-slate-700">{selectedAppointment.referral_info.referring_doctor}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Referral Status</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAppointment.referral_info.referral_status)}`}>
                          {formatStatusLabel(selectedAppointment.referral_info.referral_status)}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Reason for Referral</label>
                        <p className="text-slate-700 text-sm">{selectedAppointment.referral_info.reason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Appointment Notes
              </h3>
              {isEditMode ? (
                <textarea
                  value={editableAppointment.notes}
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter appointment notes..."
                />
              ) : (
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">
                    {selectedAppointment.notes || 'No notes provided for this appointment.'}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <div className="flex gap-3">
                {canEdit && selectedAppointment.status === 'Scheduled' && (
                  <button
                    onClick={() => handleProceed(selectedAppointment.patient, selectedAppointment.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Proceed to Treatment
                  </button>
                )}
                
                {canEdit && selectedAppointment.status === 'Scheduled' && (
                  <button
                    onClick={() => handleComplete(selectedAppointment.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                    Mark Complete
                  </button>
                )}
                
                {canEdit && selectedAppointment.status !== 'Completed' && selectedAppointment.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleDelete(selectedAppointment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel Appointment
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {isEditMode && (
                  <>
                    <button
                      onClick={handleResetEdits}
                      disabled={saving}
                      className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                    <button
                      onClick={handleSaveAppointment}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                )}
                {!isEditMode && (
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium rounded-lg transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReferralsSection = () => {
    if (!appointmentData.referrals_i_made && !appointmentData.referrals_assigned_to_me) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="text-slate-400 mb-4">
            <Stethoscope className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">No referrals found</h3>
          <p className="text-slate-500">You don't have any referrals at the moment.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {appointmentData.referrals_i_made && appointmentData.referrals_i_made.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Referrals I Made ({appointmentData.referrals_i_made.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Receiving Doctor</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Reason</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointmentData.referrals_i_made.map((referral: any) => (
                    <tr key={referral.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{referral.patient_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">
                          {referral.receiving_doctor_name || 'Not assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral.status)}`}>
                          {formatStatusLabel(referral.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-xs truncate">
                          {referral.reason}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-500">
                          {referral.created_at ? new Date(referral.created_at).toLocaleDateString() : '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {appointmentData?.referrals_assigned_to_me && 
          Object.values(appointmentData.referrals_assigned_to_me).some(arr => arr?.length > 0) && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Referrals Assigned To Me</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Referring Doctor</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Reason</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(appointmentData.referrals_assigned_to_me).flatMap(([status, referrals]) => 
                    (referrals || []).map((referral: any) => (
                      <tr key={referral.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">{referral.patient_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700">{referral.referring_doctor_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral.status)}`}>
                            {formatStatusLabel(referral.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 max-w-xs truncate">
                            {referral.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {referral.status === 'pending' && (
                            <button
                              onClick={() => handleProceed(referral.patient)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Schedule
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {currentUser?.role === 'doctor' ? 'All Appointments & Referrals' : 
                 currentUser?.role === 'on-call-doctor' ? 'My Assigned Appointments' : 
                 'My Appointments'}
              </h1>
              <p className="text-slate-600">
                {currentUser?.role === 'doctor' ? 'Monitor all appointments and track progress of referrals you made' :
                 currentUser?.role === 'on-call-doctor' ? 'View and manage appointments assigned to you' :
                 'Track and manage your appointments'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'referrals'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Referrals
          </button>
        </div>

        {activeTab === 'appointments' ? (
          <>
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by patient name, patient ID, doctor name, or scheduled by..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Scheduled Appointments */}
            <AppointmentTable
              appointments={filterAppointments(scheduled)}
              title="Scheduled Appointments"
              showDoctorType={currentUser?.role === 'doctor'}
            />

            {/* Other Appointments */}
            {other.length > 0 && (
              <AppointmentTable
                appointments={filterAppointments(other)}
                title="Other Appointments"
                showDoctorType={currentUser?.role === 'doctor'}
              />
            )}

            {/* Show message if no appointments at all */}
            {scheduled.length === 0 && other.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Calendar className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">No appointments found</h3>
                <p className="text-slate-500">You don't have any appointments scheduled at the moment.</p>
              </div>
            )}
          </>
        ) : (
          <ReferralsSection />
        )}

        {/* Appointment Summary Modal */}
        {isSummaryModalOpen && <AppointmentSummaryModal />}
      </div>
    </div>
  );
}