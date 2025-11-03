'use client'
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, ArrowRight, Search, Eye, EyeOff } from 'lucide-react';
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
}

export default function AppointmentView() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
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
          `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/sep_appointment_all/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data: Appointment[] = await res.json();
        setAppointments(data);
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
        setCurrentUserId(String(data.id));
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchCurrentUser();
  }, []);

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


  /**
   * Format backend ISO datetime without converting to client local timezone.
   * Use UTC timezone explicitly so the hour/minute shown exactly matches
   * the backend-provided timestamp (for example: "2025-10-22T22:00:00Z" -> 22:00).
   */
  const formatDateTime = (datetime: string | undefined) => {
    if (!datetime) {
      return { date: '-', time: '-' };
    }

    // Attempt to parse; if invalid, show the raw string
    const parsed = new Date(datetime);
    if (Number.isNaN(parsed.getTime())) {
      return { date: datetime, time: '' };
    }

    // Force UTC formatting so the displayed date/time equals the backend value.
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
      const updatedAppointment = await res.json();
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === updatedAppointment.id ? updatedAppointment : apt
        )
      );
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
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/referrals/${id}/decline/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Cancel failed");
      const updatedAppointment = await res.json();
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
      );
    } catch (error) {
      console.error("Cancel error:", error);
      setError("Failed to cancel appointment");
    }
  };

  const handleProceed = (patientId: string) => {
    router.push(`/oncall-doctors/treatment-details/${patientId}/`);
  };

  const toggleNotes = (id: number) => {
    setExpandedNotes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const scheduledAppointments = appointments.filter(apt =>
    (apt.status || '').toString().toLowerCase() === 'scheduled'
  );

  const otherAppointments = appointments.filter(apt =>
    (apt.status || '').toString().toLowerCase() !== 'scheduled'
  );

  const filterAppointments = (apps: Appointment[]) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return apps;
    return apps.filter(apt =>
      (apt.patient_name || '').toLowerCase().includes(term) ||
      (apt.doctor_name || '').toLowerCase().includes(term) ||
      (apt.patient || '').toLowerCase().includes(term)
    );
  };

  const AppointmentTable = ({ appointments, title }: { appointments: Appointment[], title: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
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
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Date & Time</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Notes</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
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

                  return (
                    <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono font-medium text-slate-900">#{appointment.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{appointment.patient_name}</div>
                          <div className="text-xs text-slate-500">{appointment.patient}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">{appointment.doctor_name}</div>
                      </td>
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
                              {isExpanded ? 'Less' : 'More'}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
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
                            onClick={() => handleProceed(appointment.patient)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors group relative"
                            title="Proceed to Treatment"
                          >
                            <ArrowRight className="w-4 h-4" />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Proceed
                            </span>
                          </button>
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
          <p>Error: {error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Appointment Management</h1>
          <p className="text-slate-600">Track and manage all patient appointments</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name, patient ID, or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Scheduled Appointments */}
        <AppointmentTable
          appointments={filterAppointments(scheduledAppointments)}
          title="Scheduled Appointments"
        />

        {/* Other Appointments */}
        {otherAppointments.length > 0 && (
          <AppointmentTable
            appointments={filterAppointments(otherAppointments)}
            title="Other Appointments"
          />
        )}
      </div>
    </div>
  );
}
