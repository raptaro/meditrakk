'use client'
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, ArrowRight, Search, Eye, EyeOff, Calendar, User } from 'lucide-react';
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

export default function AppointmentView() {
  const [appointmentData, setAppointmentData] = useState<AppointmentResponse>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [showOtherAppointments, setShowOtherAppointments] = useState(false);
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

  // SIMPLIFIED PERMISSION CHECK - Always show actions for on-call doctors
  const canUserEditAppointment = (appointment: Appointment) => {
    if (!currentUser) return false;
    
    // For on-call doctors, show actions for ALL appointments in their view
    if (currentUser.role === 'on-call-doctor') {
      return true;
    }
    
    // For regular doctors, only show actions for their own appointments
    if (currentUser.role === 'doctor') {
      return appointment.is_my_appointment === true;
    }
    
    return false;
  };

  // Flatten appointments based on user role
  const getFlattenedAppointments = () => {
    let scheduled: Appointment[] = [];
    let other: Appointment[] = [];

    if (currentUser?.role === 'doctor') {
      // Regular doctor - show ALL appointments (their direct + other doctors)
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
        // Fallback to old structure
        scheduled = appointmentData.scheduled || [];
        other = [
          ...(appointmentData.completed || []),
          ...(appointmentData.waiting || []),
          ...(appointmentData.pending_payment || [])
        ];
      }
    } else if (currentUser?.role === 'on-call-doctor') {
      // On-call doctor - show only assigned appointments
      if (appointmentData.my_appointments) {
        scheduled = appointmentData.my_appointments.scheduled || [];
        other = [
          ...(appointmentData.my_appointments.completed || []),
          ...(appointmentData.my_appointments.waiting || []),
          ...(appointmentData.my_appointments.pending_payment || [])
        ];
      } else {
        // Fallback for on-call doctors
        scheduled = appointmentData.scheduled || [];
        other = [
          ...(appointmentData.completed || []),
          ...(appointmentData.waiting || []),
          ...(appointmentData.pending_payment || [])
        ];
      }
    } else {
      // Patient or other roles
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

  const handleEdit = async (appointment: Appointment) => {
    try {
      const token = localStorage.getItem("access");
      const updates = {
        notes: appointment.notes,
        appointment_date: appointment.appointment_date,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/${appointment.id}/`,
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
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update appointment");
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
      
      // Refresh appointments after cancellation
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
      
      // Refresh appointments after completion
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
                  
                  const canPerformActions = currentUser?.role === 'on-call-doctor' || 
                    (currentUser?.role === 'doctor' && appointment.is_my_appointment === true);

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
                          {canPerformActions ? (
                            <>
                              {appointment.status === 'Scheduled' && (
                                <>
                                  <button
                                    onClick={() => handleEdit(appointment)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleProceed(appointment.patient, appointment.id)}
                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors group relative"
                                    title="Proceed to Treatment"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      Proceed
                                    </span>
                                  </button>
                                </>
                              )}
                              {appointment.status === 'Scheduled' && (
                                <button
                                  onClick={() => handleComplete(appointment.id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group relative"
                                  title="Mark Complete"
                                >
                                  <div className="w-4 h-4 border-2 border-green-600 rounded-sm"></div>
                                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Complete
                                  </span>
                                </button>
                              )}
                              {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                                <button
                                  onClick={() => handleDelete(appointment.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
                                  title="Cancel"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Cancel
                                  </span>
                                </button>
                              )}
                            </>
                          ) : (
                            // For appointments user cannot edit, show view-only
                            <span className="text-xs text-slate-400 px-2 py-1 bg-slate-100 rounded">
                              View Only
                            </span>
                          )}
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
      </div>
    </div>
  );
}