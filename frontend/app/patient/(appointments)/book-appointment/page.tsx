"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Check, 
  ChevronsUpDown, 
  Clock, 
  CalendarDays, 
  User, 
  Mail, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  CreditCard,
  Loader2,
  Upload,
  X
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format, addMonths, isBefore } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types for API responses
interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  specialty?: string;
  phone_number?: string;
}

interface ScheduleSlot {
  start: string;
  end: string;
  is_available: boolean;
}

interface ScheduleResponse {
  doctor_id: string;
  doctor_name: string;
  timezone: string;
  specialization: string;
  availability: ScheduleSlot[];
}

interface DoctorWithSchedule extends Doctor {
  schedule?: {
    availableDates: Date[];
    timeSlots: { [date: string]: ScheduleSlot[] };
  };
  fee: number;
}

// Updated schema - removed patient fields since backend uses authenticated user
const formSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor"),
  appointment_date: z.date({ required_error: "Please select a date" }),
  appointment_time: z.string().min(1, "Please select a time"),
  injury: z.string().optional(),
  note: z.string().optional(),
});

interface PatientProfile {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export default function PatientBookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success" | "error">("form");
  const [paymentMethod, setPaymentMethod] = useState<"PayMaya" | "Gcash">("PayMaya");
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [gcashProof, setGcashProof] = useState<File | null>(null);
  
  // State for API data
  const [doctors, setDoctors] = useState<DoctorWithSchedule[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      appointment_time: "",
      injury: "",
      note: "",
    },
  });

  const selectedDoctor = form.watch("doctor");
  const doctorData = doctors.find((d) => d.id === selectedDoctor);

  // Fetch patient profile and doctors on component mount
  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
  }, []);

  // Fetch schedule when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      fetchDoctorSchedule(selectedDoctor);
      setSelectedDate(undefined);
      setSelectedTime("");
      form.setValue("appointment_date", undefined as any);
      form.setValue("appointment_time", "");
    }
  }, [selectedDoctor]);

  // Fetch patient profile
  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.log('No access token found');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/users/current-profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.patient_profile) {
          setPatientProfile(userData.patient_profile);
        }
      } else {
        console.error('Failed to fetch patient profile:', response.status);
      }
    } catch (error) {
      console.error('Error loading patient data:', error);
    }
  };

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError(null);
      const token = localStorage.getItem("access");
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/?role=doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
      }
      
      const data: Doctor[] = await response.json();
      
      const doctorsWithSchedule: DoctorWithSchedule[] = data.map(doctor => ({
        ...doctor,
        schedule: undefined,
        fee: 500
      }));
      
      setDoctors(doctorsWithSchedule);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load doctors. Please try again.';
      setError(errorMessage);
      console.error('Error fetching doctors:', err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Fetch doctor schedule from API
  const fetchDoctorSchedule = async (doctorId: string) => {
    try {
      setLoadingSchedule(true);
      setError(null);
      const token = localStorage.getItem("access");
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointment/doctor-schedule/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctor schedule: ${response.status}`);
      }
      
      const data: ScheduleResponse = await response.json();
      
      if (!data.availability || !Array.isArray(data.availability)) {
        throw new Error('Invalid schedule data received');
      }
      
      const scheduleData = data.availability;
      const slotsByDate: { [date: string]: ScheduleSlot[] } = {};
      const availableDates: Date[] = [];
      
      scheduleData.forEach(slot => {
        try {
          const startDate = new Date(slot.start);
          const endDate = new Date(slot.end);
          const dateKey = format(startDate, "yyyy-MM-dd");
          
          if (!slotsByDate[dateKey]) {
            slotsByDate[dateKey] = [];
            if (startDate >= new Date() && slot.is_available) {
              availableDates.push(startDate);
            }
          }
          
          slotsByDate[dateKey].push({
            start: slot.start,
            end: slot.end,
            is_available: slot.is_available
          });
        } catch (dateError) {
          console.error('Error processing date:', dateError);
        }
      });
      
      availableDates.sort((a, b) => a.getTime() - b.getTime());
      
      Object.keys(slotsByDate).forEach(date => {
        slotsByDate[date].sort((a, b) => 
          new Date(a.start).getTime() - new Date(b.start).getTime()
        );
      });
      
      setDoctors(prev => prev.map(doctor => 
        doctor.id === doctorId 
          ? { 
              ...doctor, 
              schedule: { 
                availableDates, 
                timeSlots: slotsByDate 
              } 
            }
          : doctor
      ));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load doctor schedule. Please try again.';
      setError(errorMessage);
      console.error('Error fetching schedule:', err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  // Check if day should be disabled
  const isDayDisabled = (date: Date) => {
    if (!doctorData?.schedule?.timeSlots) return true;
    
    const dateKey = format(date, "yyyy-MM-dd");
    const slotsForDate = doctorData.schedule.timeSlots[dateKey] || [];
    const now = new Date();
    
    return !slotsForDate.some(slot => 
      slot.is_available && new Date(slot.end) > now
    );
  };

  // Format time in UTC
  const formatTimeUTC = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  // Check if slot is in the past
  const isSlotPast = (endTime: string) => {
    const now = new Date();
    const slotEnd = new Date(endTime);
    return slotEnd < now;
  };

  // Format date and time for backend
  const formatDateTime = (date: Date, timeSlot: ScheduleSlot) => {
    return timeSlot.start;
  };

  // Book appointment API call
  const bookAppointment = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (!selectedDate || !doctorData?.schedule?.timeSlots) {
        throw new Error('Invalid appointment data');
      }

      const dateKey = format(selectedDate, "yyyy-MM-dd");
      const slotsForDate = doctorData.schedule.timeSlots[dateKey] || [];
      const selectedSlot = slotsForDate.find(slot => 
        `${formatTimeUTC(slot.start)} - ${formatTimeUTC(slot.end)}` === values.appointment_time
      );

      if (!selectedSlot) {
        throw new Error('Selected time slot not found');
      }

      const appointmentDateTime = formatDateTime(selectedDate, selectedSlot);
      
      const requestData = {
        doctor_id: values.doctor,
        appointment_date: appointmentDateTime,
        notes: values.note || values.injury || "",
        payment_method: paymentMethod,
      };

      console.log('Booking appointment with data:', requestData);

      const token = localStorage.getItem("access");
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/appointments/book/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Booking API error:', errorText);
        throw new Error(`Failed to book appointment: ${response.status}`);
      }

      const data = await response.json();
      console.log('Appointment booked successfully:', data);

      setAppointmentData(data);
      
      if (paymentMethod === 'PayMaya' && data.checkout_url) {
        setPaymentStep("success");
        // Redirect to PayMaya after a brief delay to show success message
        setTimeout(() => {
          window.location.href = data.checkout_url;
        }, 2000);
      } else if (paymentMethod === 'Gcash') {
        setPaymentStep("success");
        setShowSuccess(true);
      }

      return data;

    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to book appointment. Please try again.';
      setError(errorMessage);
      setPaymentStep("error");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload GCash proof
  const uploadGcashProof = async () => {
    if (!gcashProof || !appointmentData) {
      setError('No GCash proof or appointment data found');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();
      formData.append('gcash_proof', gcashProof);

      const token = localStorage.getItem("access");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/appointments/${appointmentData.appointment_id}/upload-gcash/`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to upload GCash proof: ${response.status}`);
      }

      const result = await response.json();
      console.log('GCash proof uploaded successfully:', result);

      setShowSuccess(true);
      setShowPaymentModal(false);
      setPaymentStep("form");
      
    } catch (error) {
      console.error('GCash upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload GCash proof. Please try again.';
      setError(errorMessage);
      setPaymentStep("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file selection for GCash
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }
      setGcashProof(file);
      setError(null);
    }
  };

  const processPayment = async () => {
    try {
      setPaymentStep("processing");
      setError(null);
      
      const values = form.getValues();
      console.log('Processing payment with values:', values);
      
      await bookAppointment(values);
      
    } catch (error) {
      console.error("Payment processing error", error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      setPaymentStep("error");
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
    setShowPaymentModal(true);
    setPaymentStep("form");
    setError(null);
  };

  const handleDialogClose = () => {
    setShowPaymentModal(false);
    if (paymentStep === "success" || paymentStep === "error") {
      setPaymentStep("form");
    }
  };

  // Reset form after successful booking
  const resetForm = () => {
    form.reset();
    setSelectedDate(undefined);
    setSelectedTime("");
    setPaymentMethod("PayMaya");
    setGcashProof(null);
    setShowSuccess(false);
  };

  // Get available days for display
  const getAvailableDays = () => {
    if (!doctorData?.schedule?.availableDates) return [];
    return Array.from(new Set(
      doctorData.schedule.availableDates.map(date => 
        date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })
      )
    )).sort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {paymentMethod === 'PayMaya' 
                ? 'Payment completed! Your appointment has been confirmed.' 
                : 'GCash proof uploaded successfully! Waiting for verification.'}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-4">
                Book Your Appointment
              </h1>
              <p className="text-blue-100 text-lg">
                Schedule your consultation with our expert medical professionals. 
                Secure your slot with easy online payment.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
              {/* Patient Information Display */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Patient Information
                    </h2>
                    <p className="text-sm text-slate-600">
                      Using your registered patient profile
                    </p>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Your appointment will be booked using your registered patient profile. 
                    To update your information, please visit your account settings.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <div className="p-3 border border-slate-300 rounded-md bg-slate-50 text-slate-600">
                      {patientProfile?.first_name || 'Loading...'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <div className="p-3 border border-slate-300 rounded-md bg-slate-50 text-slate-600">
                      {patientProfile?.last_name || 'Loading...'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <div className="p-3 border border-slate-300 rounded-md bg-slate-50 text-slate-600">
                      {patientProfile?.phone_number || 'Loading...'}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="p-3 border border-slate-300 rounded-md bg-slate-50 text-slate-600">
                      {patientProfile?.email || 'Loading...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Appointment Details
                    </h2>
                    <p className="text-sm text-slate-600">
                      Choose your preferred date and time
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-700 font-medium mb-3">
                        Select Doctor *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between border-slate-300 hover:border-blue-400 h-12",
                                !field.value && "text-slate-500"
                              )}
                              disabled={loadingDoctors}
                            >
                              {loadingDoctors ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Loading doctors...
                                </div>
                              ) : field.value ? (
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">
                                    {doctors.find((doctor) => doctor.id === field.value)?.first_name} {doctors.find((doctor) => doctor.id === field.value)?.last_name}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {doctors.find((doctor) => doctor.id === field.value)?.specialty || "General Practice"}
                                  </span>
                                </div>
                              ) : (
                                "Choose your preferred doctor"
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandList>
                              <CommandEmpty>
                                {loadingDoctors ? "Loading doctors..." : "No doctor found."}
                              </CommandEmpty>
                              <CommandGroup>
                                {doctors.map((doctor) => (
                                  <CommandItem
                                    value={`${doctor.first_name} ${doctor.last_name}`}
                                    key={doctor.id}
                                    onSelect={() => {
                                      form.setValue("doctor", doctor.id);
                                    }}
                                    className="py-3 cursor-pointer hover:bg-slate-50"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-3 h-4 w-4",
                                        doctor.id === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium text-slate-800">
                                        Dr. {doctor.first_name} {doctor.last_name}
                                      </div>
                                      <div className="text-sm text-slate-600">
                                        {doctor.specialty || "General Practice"}
                                      </div>
                                      <div className="flex justify-between items-center mt-1">
                                        <div className="text-xs text-slate-500">
                                          {doctor.schedule ? "Schedule loaded" : "Loading schedule..."}
                                        </div>
                                        <div className="text-sm font-semibold text-blue-600">
                                          ₱500
                                        </div>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedDoctor && doctorData && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      {loadingSchedule ? (
                        "Loading schedule..."
                      ) : doctorData.schedule ? (
                        <>
                          Dr. {doctorData.first_name} {doctorData.last_name} is available on{' '}
                          <strong>{getAvailableDays().join(', ')}</strong>. Consultation fee: <strong>₱500</strong>
                        </>
                      ) : (
                        "Schedule not available"
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {selectedDoctor && doctorData?.schedule && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="appointment_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-slate-700 font-medium mb-3">
                            Select Date *
                          </FormLabel>
                          <div className="border border-slate-300 rounded-xl p-6 bg-white shadow-sm">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                field.onChange(date);
                                setSelectedTime("");
                                form.setValue("appointment_time", "");
                              }}
                              disabled={isDayDisabled}
                              fromDate={new Date()}
                              toDate={addMonths(new Date(), 2)}
                              className="rounded-md"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedDate && doctorData?.schedule?.timeSlots && (
                      <FormField
                        control={form.control}
                        name="appointment_time"
                        render={({ field }) => {
                          const dateKey = format(selectedDate, "yyyy-MM-dd");
                          const slotsForDate = doctorData.schedule?.timeSlots[dateKey] || [];
                          
                          return (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-slate-700 font-medium flex items-center gap-2 mb-3">
                                <Clock className="w-4 h-4" />
                                Available Time Slots *
                                <span className="text-xs font-normal text-slate-500 ml-auto">
                                  UTC Time
                                </span>
                              </FormLabel>
                              <div className="text-sm text-slate-600 mb-4 p-3 bg-slate-50 rounded-lg">
                                {format(selectedDate, "EEEE, MMMM d, yyyy")} • {slotsForDate.filter(s => s.is_available && !isSlotPast(s.end)).length} slots available
                              </div>
                              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                                {slotsForDate.map((slot) => {
                                  const timeString = `${formatTimeUTC(slot.start)} - ${formatTimeUTC(slot.end)}`;
                                  const isSelected = selectedTime === timeString;
                                  const isPast = isSlotPast(slot.end);
                                  const isTaken = !slot.is_available;
                                  const isDisabled = isPast || isTaken;

                                  return (
                                    <Button
                                      key={slot.start}
                                      type="button"
                                      variant={isSelected ? "default" : "outline"}
                                      onClick={() => {
                                        if (!isDisabled) {
                                          setSelectedTime(timeString);
                                          field.onChange(timeString);
                                        }
                                      }}
                                      disabled={isDisabled}
                                      className={cn(
                                        "w-full h-14 text-sm font-medium transition-all duration-200 relative",
                                        isSelected &&
                                          "bg-blue-600 text-white hover:bg-blue-700 shadow-lg transform scale-105",
                                        !isSelected && !isDisabled &&
                                          "hover:border-blue-400 hover:bg-blue-50 border-slate-300 hover:shadow-md",
                                        isDisabled &&
                                          "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300"
                                      )}
                                    >
                                      <div className="flex items-center justify-center gap-3">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-base">{timeString}</span>
                                      </div>
                                      
                                      {isTaken && (
                                        <div className="absolute top-1 right-1">
                                          <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            Taken
                                          </div>
                                        </div>
                                      )}
                                      {isPast && !isTaken && (
                                        <div className="absolute top-1 right-1">
                                          <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Passed
                                          </div>
                                        </div>
                                      )}
                                    </Button>
                                  );
                                })}
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="injury"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Reason for Visit
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your symptoms, condition, or reason for consultation"
                          className="resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-slate-500">
                        Optional: Help us understand how we can best assist you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Additional Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any allergies, medications, or other relevant information you'd like to share"
                          className="resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Payment Method
                    </h2>
                    <p className="text-sm text-slate-600">
                      Choose how you want to pay
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={paymentMethod === "PayMaya" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("PayMaya")}
                    className="h-16 flex flex-col items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>PayMaya</span>
                    <span className="text-xs text-muted-foreground">Pay with card</span>
                  </Button>

                  <Button
                    type="button"
                    variant={paymentMethod === "Gcash" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("Gcash")}
                    className="h-16 flex flex-col items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>GCash</span>
                    <span className="text-xs text-muted-foreground">Upload proof</span>
                  </Button>
                </div>
              </div>

              {/* Summary & Action */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">Appointment Summary</h3>
                    <div className="text-slate-600 mt-2 space-y-1">
                      {selectedDoctor && doctorData && (
                        <p className="text-sm">
                          <strong>Doctor:</strong> Dr. {doctorData.first_name} {doctorData.last_name}
                        </p>
                      )}
                      {selectedDate && selectedTime && (
                        <p className="text-sm">
                          <strong>Time:</strong> {format(selectedDate, "MMM d, yyyy")} at {selectedTime} UTC
                        </p>
                      )}
                      {doctorData && (
                        <p className="text-lg font-bold text-blue-600 mt-2">
                          Consultation Fee: ₱500
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="px-6 h-12 border-slate-300 hover:bg-slate-100 w-full sm:w-auto"
                    >
                      Clear Form
                    </Button>
                    
                    <Dialog open={showPaymentModal} onOpenChange={handleDialogClose}>
                      <DialogTrigger asChild>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !selectedDoctor || !selectedDate || !selectedTime || loadingSchedule}
                          className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          {isSubmitting ? "Processing..." : "Book Appointment"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Complete Payment
                          </DialogTitle>
                          <DialogDescription>
                            {paymentMethod === 'PayMaya' 
                              ? 'Secure payment via PayMaya' 
                              : 'Upload GCash payment proof'}
                          </DialogDescription>
                        </DialogHeader>

                        {paymentStep === "form" && paymentMethod === "PayMaya" && (
                          <div className="space-y-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-yellow-800">
                                  <strong>Test Mode:</strong> Use test card: 4123450131001381 (Visa)
                                </div>
                              </div>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Consultation Fee:</span>
                                  <span className="font-semibold">₱500</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                  <span className="font-semibold">Total:</span>
                                  <span className="font-bold text-lg text-blue-600">₱500</span>
                                </div>
                              </div>
                            </div>

                            <Button
                              onClick={processPayment}
                              disabled={isSubmitting}
                              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                "Pay ₱500"
                              )}
                            </Button>
                          </div>
                        )}

                        {paymentStep === "form" && paymentMethod === "Gcash" && (
                          <div className="space-y-6">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Consultation Fee:</span>
                                  <span className="font-semibold">₱500</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                  <span className="font-semibold">Total:</span>
                                  <span className="font-bold text-lg text-blue-600">₱500</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                  Upload GCash Payment Proof
                                </label>
                                <Input 
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={handleFileSelect}
                                  className="h-11"
                                />
                                <FormDescription className="text-sm text-slate-500 mt-1">
                                  Upload screenshot or PDF of your GCash payment (max 5MB)
                                </FormDescription>
                              </div>
                            </div>

                            <Button
                              onClick={processPayment}
                              disabled={isSubmitting || !gcashProof}
                              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                "Submit Proof"
                              )}
                            </Button>
                          </div>
                        )}

                        {paymentStep === "processing" && (
                          <div className="text-center py-8 space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
                            <div>
                              <h3 className="font-semibold text-slate-800">Processing Payment</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                Please wait while we process your {paymentMethod.toLowerCase()} payment...
                              </p>
                            </div>
                          </div>
                        )}

                        {paymentStep === "success" && paymentMethod === "PayMaya" && (
                          <div className="text-center py-8 space-y-4">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                            <div>
                              <h3 className="font-semibold text-slate-800">Appointment Booked Successfully!</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                You are being redirected to PayMaya to complete your payment...
                              </p>
                            </div>
                            <div className="space-y-3">
                              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                              <p className="text-xs text-slate-500">Redirecting to secure payment page</p>
                            </div>
                          </div>
                        )}

                        {paymentStep === "success" && paymentMethod === "Gcash" && (
                          <div className="text-center py-8 space-y-4">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                            <div>
                              <h3 className="font-semibold text-slate-800">Appointment Booked Successfully!</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                Your appointment has been created. GCash proof uploaded successfully!
                              </p>
                            </div>
                            <Button
                              onClick={() => {
                                setShowPaymentModal(false);
                                resetForm();
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              Close
                            </Button>
                          </div>
                        )}

                        {paymentStep === "error" && (
                          <div className="text-center py-8 space-y-4">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <div>
                              <h3 className="font-semibold text-slate-800">Payment Failed</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                {error || 'Please try again or use a different payment method.'}
                              </p>
                            </div>
                            <Button
                              onClick={() => setPaymentStep("form")}
                              variant="outline"
                              className="w-full"
                            >
                              Try Again
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}