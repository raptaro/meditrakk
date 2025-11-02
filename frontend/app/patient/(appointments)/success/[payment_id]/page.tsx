// app/patient/(appointments)/success/[payment_id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Calendar, 
  User, 
  CreditCard,
  ArrowLeft,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PaymentStatus {
  status: 'success' | 'pending' | 'already_processed' | 'error';
  message: string;
  payment_id: number;
  appointment_request_id?: number;
  current_status?: string;
}

interface PaymentDetails {
  payment_id: number;
  payment_status: string;
  payment_method: string;
  amount: string;
  paymaya_reference_id?: string;
  appointment_request_id?: number;
  appointment_request_status?: string;
  doctor_name?: string;
  appointment_date?: string;
  updated_at?: string;
}

export default function PaymentSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const paymentId = params.payment_id as string;
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);

  // Check initial payment status
  useEffect(() => {
    if (!paymentId) {
      setError('Payment ID is missing');
      setLoading(false);
      return;
    }

    checkPaymentStatus();
  }, [paymentId]);

  // Poll for payment status updates
  useEffect(() => {
    if (!paymentId || paymentStatus?.status === 'success' || paymentStatus?.status === 'already_processed') {
      return;
    }

    const interval = setInterval(() => {
      if (pollingCount < 30) { // Poll for up to 3 minutes (30 * 6 seconds)
        checkPaymentStatus();
        setPollingCount(prev => prev + 1);
      } else {
        clearInterval(interval);
        setError('Payment status check timeout. Please check your appointments page.');
      }
    }, 6000); // Check every 6 seconds

    return () => clearInterval(interval);
  }, [paymentId, paymentStatus, pollingCount]);

// In your checkPaymentStatus function
const checkPaymentStatus = async () => {
  try {
    const token = localStorage.getItem("access");
    if (!token) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    // Ensure paymentId is clean (remove any prefixes)
    let cleanPaymentId = paymentId;
    if (paymentId.includes('payment_id=')) {
      cleanPaymentId = paymentId.replace('payment_id=', '');
    }
    
    // Also remove any URL encoding
    cleanPaymentId = decodeURIComponent(cleanPaymentId);

    console.log('🔍 Cleaned payment ID:', cleanPaymentId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/payments/success/${cleanPaymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data: PaymentStatus = await response.json();
      setPaymentStatus(data);
      
      // If payment is successful, get detailed payment info
      if (data.status === 'success' || data.status === 'already_processed') {
        await fetchPaymentDetails();
      }
      
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to check payment status');
    }
  } catch (err) {
    setError('Network error occurred while checking payment status');
    console.error('Payment status check error:', err);
  } finally {
    setLoading(false);
  }
};
  const fetchPaymentDetails = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/payments/status/${paymentId}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: PaymentDetails = await response.json();
        setPaymentDetails(data);
      }
    } catch (err) {
      console.error('Error fetching payment details:', err);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Paid': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Processing' },
      'Failed': { color: 'bg-red-100 text-red-800', label: 'Failed' },
      'paid': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      'pending_payment': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending Payment' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || 
                   { color: 'bg-gray-100 text-gray-800', label: status };

    return (
      <Badge className={`${config.color} font-semibold`}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Your Payment</h2>
          <p className="text-slate-600 mb-4">
            Please wait while we confirm your payment with our system...
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/patient/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
          <div className="text-center space-y-4">
            <Button 
              onClick={() => router.push('/patient/dashboard')}
              className="w-full"
            >
              <User className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/book-appointment')}
              className="w-full"
            >
              Book New Appointment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/patient/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {paymentStatus?.status === 'success' || paymentStatus?.status === 'already_processed' ? (
            <>
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-green-800 mb-2">
                Payment Confirmed!
              </h1>
              <p className="text-green-600 text-lg">
                Your appointment has been successfully booked.
              </p>
            </>
          ) : (
            <>
              <div className="relative">
                <Loader2 className="h-20 w-20 text-blue-500 animate-spin mx-auto mb-4" />
                <Clock className="h-8 w-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h1 className="text-4xl font-bold text-blue-800 mb-2">
                Processing Payment
              </h1>
              <p className="text-blue-600 text-lg">
                We're confirming your payment. This may take a moment...
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Current status: {paymentStatus?.current_status || 'Pending'}
                {pollingCount > 0 && ` • Checking... (${pollingCount}/30)`}
              </p>
            </>
          )}
        </div>

        {/* Payment Details Card */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Payment ID:</span>
                <span className="font-mono font-medium text-slate-800">
                  #{paymentId}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Amount Paid:</span>
                <span className="font-bold text-green-600 text-lg">
                  ₱{paymentDetails?.amount || '500.00'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Payment Method:</span>
                <span className="font-medium text-slate-800">
                  {paymentDetails?.payment_method || 'PayMaya'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Payment Status:</span>
                {paymentDetails ? (
                  getStatusBadge(paymentDetails.payment_status)
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Processing
                  </Badge>
                )}
              </div>

              {paymentDetails?.paymaya_reference_id && (
                <div className="flex justify-between items-center py-2 border-t border-slate-100">
                  <span className="text-slate-600">Reference ID:</span>
                  <span className="font-mono text-sm text-slate-500">
                    {paymentDetails.paymaya_reference_id}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details Card */}
        {paymentDetails?.appointment_request_id && (
          <Card className="mb-6 border-blue-100 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <Calendar className="h-5 w-5" />
                Appointment Details
              </h2>
              <div className="space-y-4">
                {paymentDetails.doctor_name && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Doctor:</span>
                    <span className="font-medium text-slate-800 text-right">
                      {paymentDetails.doctor_name}
                    </span>
                  </div>
                )}
                
                {paymentDetails.appointment_date && (
                  <div className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-slate-600">Appointment Time:</span>
                    <span className="font-medium text-slate-800 text-right max-w-[60%]">
                      {formatDate(paymentDetails.appointment_date)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Appointment Status:</span>
                  {paymentDetails.appointment_request_status ? (
                    getStatusBadge(paymentDetails.appointment_request_status)
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Processing
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => router.push('/patient/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 h-12"
              size="lg"
            >
              <User className="mr-2 h-4 w-4" />
              View Dashboard
            </Button>
            
            <Button 
              onClick={() => router.push('/book-appointment')}
              variant="outline"
              className="h-12 border-slate-300 hover:bg-slate-50"
              size="lg"
            >
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
          
          {(paymentStatus?.status === 'pending') && (
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">
                Still waiting for confirmation? 
              </div>
              <Button 
                variant="ghost" 
                onClick={checkPaymentStatus}
                className="text-blue-600 hover:text-blue-700"
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Check Status Again
              </Button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center text-sm text-slate-500 space-y-1">
          <p>If you encounter any issues with your appointment, please contact our support team.</p>
          <p className="font-mono">Payment ID: {paymentId}</p>
          {paymentDetails?.updated_at && (
            <p>Last updated: {formatDate(paymentDetails.updated_at)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Add the missing RefreshCw icon component
function RefreshCw({ className, ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}