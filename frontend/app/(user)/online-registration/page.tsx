"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PublicRegistrationPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    gender: "Male",
    complaint: "General Illness",
    other_complaint: "",
    priority_level: "Regular",
    street_address: "",
    barangay: "",
    municipal_city: "",
    agree_terms: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueNumber, setQueueNumber] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: (event.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);
      
      // Fix: Get queue number from queue_entry object
      const queueNumberFromResponse = responseBody.queue_entry?.queue_number;
      
      // Set the queue number from the response
      setQueueNumber(queueNumberFromResponse ? `#${queueNumberFromResponse}` : "Unknown");

      // Reset form
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        date_of_birth: "",
        gender: "Male",
        complaint: "General Illness",
        other_complaint: "",
        priority_level: "Regular",
        street_address: "",
        barangay: "",
        municipal_city: "",
        agree_terms: false,
      });
      
      // Show success modal with queue number
      setShowModal(true);
    } else {
      const errorBody = await response.text();
      console.error("Registration failed:", errorBody);
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error registering patient:", error);
    alert("Network error. Please check your connection and try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const toggleTermsModal = () => setShowTermsModal(!showTermsModal);

  const handleCloseModal = () => {
    setShowModal(false);
    setQueueNumber("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black-800">Patient Registration for Malibiran Medical Clinic</h1>
        </div>
                {/* Important Notice - Better Placement */}
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Account Creation Notice
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                After your visit and upon approval by our medical staff, a patient account will be created for you. 
                You'll receive login credentials within the clinic to access your medical records and future appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card overflow-hidden shadow-lg bg-white">
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h2 className="text-lg font-medium text-blue-800">Patient Information</h2>
            <p className="mt-1 text-sm text-blue-600">
              Please fill in all required fields marked with *
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    className="w-full h-11"
                  />
                </div>

                {/* Middle Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="middle_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <Input
                    type="text"
                    id="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                    className="w-full h-11"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                    className="w-full h-11"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label
                    htmlFor="date_of_birth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    id="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                    className="w-full h-11"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="e.g., 09123456789"
                    required
                    className="w-full h-11"
                  />
                </div>

                {/* Email - Span 2 columns on desktop */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="w-full h-11"
                  />
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Address Information
              </h3>
              <div className="space-y-4">
                {/* Street Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="street_address"
                    value={formData.street_address}
                    onChange={handleChange}
                    placeholder="House/Building No., Street Name"
                    required
                    className="w-full h-11"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Barangay */}
                  <div className="space-y-2">
                    <label
                      htmlFor="barangay"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Barangay <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      id="barangay"
                      value={formData.barangay}
                      onChange={handleChange}
                      placeholder="Enter barangay"
                      required
                      className="w-full h-11"
                    />
                  </div>

                  {/* Municipal/City */}
                  <div className="space-y-2">
                    <label
                      htmlFor="municipal_city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Municipal/City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      id="municipal_city"
                      value={formData.municipal_city}
                      onChange={handleChange}
                      placeholder="Enter municipal/city"
                      required
                      className="w-full h-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Medical Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Complaint Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="complaint"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type of Complaint <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11"
                    required
                  >
                    <option value="General Illness">General Illness</option>
                    <option value="Injury">Injury</option>
                    <option value="Check-up">Check-up</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Other Complaint - Conditionally Rendered */}
                {formData.complaint === "Other" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="other_complaint"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Please specify <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      id="other_complaint"
                      value={formData.other_complaint}
                      onChange={handleChange}
                      placeholder="Enter your reason"
                      required
                      className="w-full h-11"
                    />
                  </div>
                )}

                {/* Priority Level */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="priority_level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Priority Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="priority_level"
                    value={formData.priority_level}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11"
                    required
                  >
                    <option value="Regular">Regular</option>
                    <option value="Priority">Priority Lane (PWD/Pregnant/Senior Citizen)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8 rounded-lg bg-blue-50 p-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center mt-1">
                  <Input
                    id="agree_terms"
                    type="checkbox"
                    checked={formData.agree_terms}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree_terms" className="font-medium text-gray-700">
                    <span
                      onClick={toggleTermsModal}
                      className="cursor-pointer hover:text-blue-700 hover:underline"
                    >
                      I agree to the terms and conditions
                    </span>{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-600">
                    By agreeing, you consent to the collection and processing of
                    your personal information for medical purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 h-12 min-h-12"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal with Queue Number */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card w-full max-w-md rounded-lg p-6 shadow-xl bg-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            
            <h2 className="mb-2 text-xl font-bold text-center text-gray-800">
              Registration Successful!
            </h2>

{/* Divider after header */}
<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

{/* Queue Number Display */}
<div className="mb-6 flex flex-col items-center justify-center mt-6">
  <p className="mb-2 text-sm text-gray-600">Your queue number is:</p>
  <div className="rounded-xl bg-blue-100 px-8 py-4 border-2 border-blue-300 shadow-sm">
    <span className="text-3xl font-bold text-blue-800">{queueNumber}</span>
  </div>
  <p className="mt-3 text-sm text-gray-500 text-center">
    Please wait for your number to be called in the waiting area.  
    Thank you for registering. Our medical staff will assist you shortly.
  </p>
</div>

<p className="mb-6 text-sm text-center text-gray-600">

  <span className="mt-3 block text-sm text-red-500 text-center">
    Screenshot this and show it to staff. Keep this number for reference.
  </span>
</p>

            
            
            <div className="flex justify-center">
              <Button
                onClick={handleCloseModal}
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 h-10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card w-full max-w-2xl rounded-lg p-6 shadow-xl bg-white">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Terms and Conditions</h2>
              <button
                onClick={toggleTermsModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="prose max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-semibold">Patient Agreement</h3>
              <p className="text-sm">
                By registering with our healthcare facility, you agree to the
                following terms:
              </p>

              <ol className="mt-4 list-decimal pl-6 text-sm">
                <li className="mb-3">
                  <strong>Accuracy of Information:</strong> You certify that all
                  provided personal and medical information is complete and
                  accurate to the best of your knowledge.
                </li>
                <li className="mb-3">
                  <strong>Privacy Consent:</strong> You consent to the
                  collection, use, and disclosure of your personal health
                  information for the purposes of treatment, payment, and
                  healthcare operations.
                </li>
                <li className="mb-3">
                  <strong>Financial Responsibility:</strong> You understand and
                  agree to be financially responsible for any services received.
                </li>
                <li className="mb-3">
                  <strong>Treatment Consent:</strong> You consent to medical
                  treatment deemed necessary by healthcare providers,
                  understanding that all procedures carry inherent risks.
                </li>
                <li className="mb-3">
                  <strong>Communication:</strong> You agree to receive
                  communications regarding your care via the contact information
                  provided.
                </li>
              </ol>

              <p className="mt-4 text-xs text-gray-600">
                This agreement is effective upon registration and remains valid
                throughout your care at this facility. You may request a full
                copy of our privacy policy at any time.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={toggleTermsModal} className="h-10">
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}