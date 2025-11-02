'use client'
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, CheckCircle, Search, Filter, MoreVertical } from 'lucide-react';

interface Payment {
  id: number;
  status: 'Paid' | 'Pending' | 'Failed';
  amount: string;
  method: string;
}

interface AppointmentRequest {
  id: number;
  patient_name: string;
  doctor_name: string;
  reason: string;
  requested_datetime: string;
  status: string;
  created_at: string;
  payment: Payment | null;
}

export default function PaymentTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointmentRequests();
  }, []);

  const fetchAppointmentRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/appointment-requests/patient-request/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch appointment requests');
      }

      const data = await response.json();
      setAppointmentRequests(data);
    } catch (err) {
      setError('Failed to load payment records');
      console.error('Error fetching appointment requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'paid':
      case 'scheduled':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pending':
      case 'pending_payment':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Failed':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reserved':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDateTimeUTC = (datetime: string) => {
    try {
      const date = new Date(datetime);
      
      // Format for UTC timezone (exactly what backend provides)
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatDateTimeWithUTCInfo = (datetime: string) => {
    try {
      const date = new Date(datetime);
      
      // UTC time (exactly what backend provides)
      const utcTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);

      // Get the local time for reference
      const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);

      return {
        display: utcTime,
        tooltip: `UTC: ${utcTime} | Your Local: ${localTime}`
      };
    } catch (error) {
      console.error('Error formatting date:', error);
      return {
        display: 'Invalid Date',
        tooltip: 'Invalid Date'
      };
    }
  };

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending_payment': 'Pending Payment',
      'paid': 'Paid - Awaiting Confirmation',
      'reserved': 'Reserved',
      'scheduled': 'Scheduled',
      'cancelled': 'Cancelled',
      'Paid': 'Paid',
      'Pending': 'Pending',
      'Failed': 'Failed'
    };
    return statusMap[status] || status;
  };

  const handleEdit = (id: number) => {
    console.log('Edit payment:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete payment:', id);
  };

  const handleConfirm = async (id: number) => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/appointment-requests/${id}/confirm-to-appointment/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to confirm appointment');
      }

      const result = await response.json();
      alert('Appointment confirmed successfully!');
      fetchAppointmentRequests(); // Refresh the list
    } catch (err) {
      alert('Failed to confirm appointment');
      console.error('Error confirming appointment:', err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/appointment-requests/${id}/reject-request/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason: 'Slot unavailable' }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      const result = await response.json();
      alert('Appointment request rejected!');
      fetchAppointmentRequests(); // Refresh the list
    } catch (err) {
      alert('Failed to reject request');
      console.error('Error rejecting request:', err);
    }
  };

  // Filter and separate requests
  const filteredRequests = appointmentRequests.filter(request => {
    const matchesSearch = 
      request.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.payment?.method.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'All' || 
      request.status === statusFilter || 
      (request.payment?.status === statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  // Separate paid/confirmable requests from others
  const paidRequests = filteredRequests.filter(request => 
    request.status === 'paid' || request.status === 'reserved'
  );

  const otherRequests = filteredRequests.filter(request => 
    request.status !== 'paid' && request.status !== 'reserved'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading payment records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchAppointmentRequests}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderTable = (requests: AppointmentRequest[], title: string, description: string) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Table Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="text-xs text-slate-500 mt-1">All times are displayed in UTC (as provided by backend)</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Patient</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Doctor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date & Time</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Method</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => {
              const dateInfo = formatDateTimeWithUTCInfo(request.requested_datetime);
              return (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    #{request.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{request.patient_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{request.doctor_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className="text-sm text-slate-600 cursor-help"
                      title={dateInfo.tooltip}
                    >
                      {dateInfo.display}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      ₱{request.payment?.amount || '0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{request.payment?.method || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {formatStatus(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {(request.status === 'paid' || request.status === 'reserved') && (
                        <button
                          onClick={() => handleConfirm(request.id)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Confirm Appointment"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(request.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {requests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-2">No records found</div>
          <div className="text-sm text-slate-500">Try adjusting your search or filter</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Appointment Requests</h1>
          <p className="text-slate-600">Manage and track all appointment requests and payments</p>
          <p className="text-sm text-slate-500 mt-1">All times are displayed in UTC (as provided by backend)</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient, doctor, or payment method..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                <option>All</option>
                <option>pending_payment</option>
                <option>paid</option>
                <option>reserved</option>
                <option>scheduled</option>
                <option>cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Paid/Confirmable Requests Section */}
        {paidRequests.length > 0 && renderTable(
          paidRequests,
          "Pending Confirmation",
          "Paid appointment requests waiting for secretary confirmation"
        )}

        {/* Other Requests Section */}
        {otherRequests.length > 0 && renderTable(
          otherRequests,
          "Other Requests",
          "Appointment requests with other statuses"
        )}

        {/* Empty State for both sections */}
        {paidRequests.length === 0 && otherRequests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="text-slate-400 text-lg mb-2">No appointment requests found</div>
            <div className="text-slate-500">Try adjusting your search criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}