"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  phone_number?: string;
  date_of_birth?: string;
  street_address?: string;
  barangay?: string;
  municipal_city?: string;
  age?: number;
}

export default function PatientRegistrationForm() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [complaint, setComplaint] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const router = useRouter();

  // Check for existing queue number on component mount
  useEffect(() => {
    const savedQueueNumber = localStorage.getItem("patientQueueNumber");
    if (savedQueueNumber) {
      setQueueNumber(parseInt(savedQueueNumber, 10));
    }
  }, []);

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setErrorMessage("Please log in to register for the clinic queue.");
          setIsLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/user/users/current-patient/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);

          if (userData.role !== "patient") {
            setErrorMessage("This registration is only available for patients.");
          }
        } else {
          setErrorMessage("Failed to load user information. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("An error occurred while loading your information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Check if user already has an active queue
  useEffect(() => {
    const checkExistingQueue = async () => {
      if (!currentUser) return;

      try {
        const token = localStorage.getItem("access");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/patient/active-queue/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const queueData = await res.json();
          if (queueData.queue_number) {
            setQueueNumber(queueData.queue_number);
            localStorage.setItem("patientQueueNumber", queueData.queue_number.toString());
            setSuccessMessage(
              `You are already in the queue! Your queue number is #${queueData.queue_number}. Please wait for your turn.`
            );
          }
        }
      } catch (error) {
        console.error("Error checking existing queue:", error);
      }
    };

    if (currentUser?.role === "patient") {
      checkExistingQueue();
    }
  }, [currentUser]);

  // Handle submission for clinic queue registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !complaint) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        patient_id: currentUser.id,
        complaint: complaint,
        registered_by: "patient",
      };

      const token = localStorage.getItem("access");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Extract queue number from response
        const assignedQueueNumber = data.queue_number || data.queue_entry?.queue_number;
        
        if (assignedQueueNumber) {
          setQueueNumber(assignedQueueNumber);
          // Save queue number to localStorage for persistence
          localStorage.setItem("patientQueueNumber", assignedQueueNumber.toString());
          setSuccessMessage(
            `Successfully registered to clinic queue! Your queue number is #${assignedQueueNumber}. Please wait for your turn.`
          );
        } else {
          setSuccessMessage(
            "Successfully registered to clinic queue! Your position will be assigned shortly."
          );
        }
        setComplaint("");
      } else {
        setErrorMessage(
          data.detail || data.message || data.error || "Failed to register to queue. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear queue number (for when the user is done)
  const clearQueueNumber = () => {
    setQueueNumber(null);
    localStorage.removeItem("patientQueueNumber");
    setSuccessMessage("");
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="overflow-hidden border border-gray-200 bg-white p-0 animate-pulse">
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Information Skeleton */}
            <div>
              <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Contact Information Skeleton */}
            <div>
              <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-5 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Address Information Skeleton */}
            <div>
              <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-5 w-64 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Complaint Section Skeleton */}
            <div>
              <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-48 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex justify-end space-x-4 pt-4">
              <div className="h-10 w-24 bg-gray-200 rounded"></div>
              <div className="h-10 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (errorMessage && !currentUser) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Unable to Load User Data</h3>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser?.role !== "patient") {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Access Restricted</h3>
            <p className="text-gray-600 mb-4">
              {currentUser
                ? `This feature is only available for patients. Your role is: ${currentUser.role}`
                : "Patient registration is only available for patients."}
            </p>
            <button
              onClick={() => router.push("/")}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold">Clinic Queue Registration</h1>
            <p className="text-gray-600 mt-2">
              Register yourself to the clinic queue for medical consultation
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/tv")}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
              title="View queue"
            >
              View Queue
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-800 border border-green-200">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
            {queueNumber && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    #{queueNumber}
                  </div>
                  <p className="text-sm text-gray-600">
                    This is your queue number. Please wait for your turn to be called.
                  </p>
                  <button
                    onClick={clearQueueNumber}
                    className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    I'm done with my consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-800 border border-red-200">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMessage}
            </div>
          </div>
        )}

        {currentUser && !queueNumber && (
          <div className="overflow-hidden border border-gray-200 bg-white p-0">
            <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
              <h2 className="text-lg font-medium text-blue-800">
                {currentUser.first_name} {currentUser.last_name}
              </h2>
              <p className="mt-1 text-sm text-blue-600">Patient ID: {currentUser.id}</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="mb-8">
                  <h3 className="mb-4 flex items-center text-base font-semibold">
                    <svg
                      className="mr-2 h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          <span className="text-sm text-gray-900">
                            {currentUser.date_of_birth
                              ? new Date(currentUser.date_of_birth).toLocaleDateString()
                              : "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age
                        </label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          <span className="text-sm text-gray-900">
                            {currentUser.age ? `${currentUser.age} years old` : "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="mb-8">
                  <h3 className="mb-4 flex items-center text-base font-semibold">
                    <svg
                      className="mr-2 h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          <span className="text-sm text-gray-900">{currentUser.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          <span className="text-sm text-gray-900">
                            {currentUser.phone_number || "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="mb-8">
                  <h3 className="mb-4 flex items-center text-base font-semibold">
                    <svg
                      className="mr-2 h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Address Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                      <span className="text-sm text-gray-900">
                        {currentUser.street_address
                          ? `${currentUser.street_address}, ${currentUser.barangay}, ${currentUser.municipal_city}`
                          : "Address not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Complaint Section */}
                <div className="mb-8">
                  <h3 className="mb-4 flex items-center text-base font-semibold">
                    <svg
                      className="mr-2 h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Complaint
                  </h3>
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <select
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      required
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">-- Select complaint --</option>
                      <option value="General Illness">General Illness</option>
                      <option value="Injury">Injury</option>
                      <option value="Check-up">Check-up</option>
                      <option value="Other">Other</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      Please select the primary reason for your visit today.
                    </p>
                  </div>
                </div>

                {/* Important Information */}
                <div className="mb-8 rounded-lg bg-amber-50 p-4 border border-amber-200">
                  <h4 className="mb-2 font-medium text-amber-800">Important Information</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Your position in the queue will be assigned automatically</li>
                    <li>• Please wait in the waiting area until your name is called</li>
                    <li>• Emergency cases will be prioritized</li>
                    <li>• Estimated waiting time may vary</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !complaint}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        Registering...
                      </div>
                    ) : (
                      "Register to Clinic Queue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Show only user info when queue number exists */}
        {currentUser && queueNumber && (
          <div className="overflow-hidden border border-gray-200 bg-white p-0">
            <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
              <h2 className="text-lg font-medium text-blue-800">
                {currentUser.first_name} {currentUser.last_name}
              </h2>
              <p className="mt-1 text-sm text-blue-600">Patient ID: {currentUser.id}</p>
            </div>
            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-green-600 mb-4">
                  #{queueNumber}
                </div>
                <p className="text-lg text-gray-700 mb-2">
                  You are currently in the queue
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Please wait for your turn to be called. You can check the queue status by clicking "View Queue".
                </p>
                <button
                  onClick={clearQueueNumber}
                  className="rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  I'm done with my consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}