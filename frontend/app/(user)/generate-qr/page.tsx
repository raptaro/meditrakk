// app/secretary/generate-qr/page.tsx
"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

export default function GenerateQRPage() {
  const [registrationUrl, setRegistrationUrl] = useState("");

  // Set the registration URL when component mounts
  useState(() => {
    // Use your actual registration page URL
    const url = `meditrakk.up.railway.app/online-registration`;
    setRegistrationUrl(url);
  });

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Online Patient Registration</h1>
          <p className="mt-2 text-gray-600">
            Please scan this QR Code to register to <span className="font-bold text-blue-900">Malibiran Medical Clinic</span>
          </p>
        </div>

        <div className="card p-6">
          {registrationUrl && (
            <div className="flex flex-col items-center">
              {/* QR Code */}
              <div className="mb-6 border-4 border-white bg-white p-4 shadow-lg">
                <QRCode 
                  value={registrationUrl}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox="0 0 256 256"
                />
              </div>

              {/* URL Display */}
              <div className="mb-6 w-full max-w-md">
                <p className="mb-2 text-sm font-medium">Registration URL:</p>
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                  <p className="break-all text-sm text-gray-700">
                    {registrationUrl}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="w-full max-w-md rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-800">
                  Instructions for Use:
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-blue-700">
                  <li>Patients scan the QR code with their phone camera</li>
                  <li>They will be redirected to the registration form</li>
                  <li>Patients can fill out the form directly on their phone</li>
                </ul>
              </div>

              {/* Print Button */}
              <button
                onClick={() => window.print()}
                className="mt-6 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                Print QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}