"use client";

import PatientChart from "@/components/organisms/charts/patient-chart";
import AdminStatCards from "./components/admin-stat-cards";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import HospitalSurveyChart from "@/components/organisms/charts/hospital-survey-chart";
import { TotalAppointments } from "./components/total-appointments";
import { RevenueChart } from "@/components/organisms/charts/revenue-chart";

import { DashboardTable } from "@/components/ui/dashboard-table";
import { AppointmentColumns } from "./components/appointment-columns";
import { DoctorColumns, Doctor } from "../(info)/doctors-list/doctor-columns";
import { appointments } from "@/lib/placeholder-data";

import { operations } from "@/lib/placeholder-data";
import { OperationColumns } from "./components/operation-columns";
import DailyAppointments from "./components/daily-appointments";

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch doctors data
  React.useEffect(() => {
    const fetchDoctors = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/user/users/doctors/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.status}`);
        }

        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="m-4 space-y-4">
      <AdminStatCards />
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <PatientChart />
        <DailyAppointments />

        <div className="card">
          <h1 className="font-bold">Calendar</h1>
          <div className="flex justify-center items-center pt-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <HospitalSurveyChart />
        <TotalAppointments />
        <RevenueChart />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="card col-span-2">
          <h1 className="font-bold mb-4">Appointments</h1>
          <DashboardTable
            columns={AppointmentColumns}
            data={appointments ?? []}
          />
        </div>
        <div className="card">
          <h1 className="font-bold mb-4">Doctor </h1>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-muted-foreground">Loading doctors...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-red-500">Error: {error}</div>
            </div>
          ) : (
            <DashboardTable columns={DoctorColumns} data={doctors} />
          )}
        </div>
      </div>
      <div className="card">
        <h1 className="font-bold mb-4">Operations</h1>
        <DashboardTable columns={OperationColumns} data={operations ?? []} />
      </div>
    </div>
  );
}