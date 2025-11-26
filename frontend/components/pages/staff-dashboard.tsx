"use client";
import { useName } from "@/hooks/use-name";
import { Skeleton } from "../ui/skeleton";

import { VisitorsChart } from "@/components/organisms/charts/visitors-chart";
import { CommonDiseasesChart } from "@/components/organisms/charts/common-diseases-chart";
import { CommonMedicinesChart } from "@/components/organisms/charts/common-medicine-chart";
import { PatientColumns } from "./medical-records/patient-columns";
import { DashboardTable } from "../ui/dashboard-table";
import TitleCard from "../molecules/title-card";
import usePatients from "@/hooks/use-patients";
import { JSX } from "react";
import { Clock, Cylinder, GitPullRequest, User } from "lucide-react";
import SummaryCard from "../summary-cards";

type ColorKey = "blue" | "green" | "yellow" | "red";

export default function StaffDashboard() {
  const name = useName();
  const patients = usePatients();

  const data: {
    id: number;
    title: string;
    value: number;
    description: string;
    icon: JSX.Element;
    color: ColorKey;
  }[] = [
    {
      id: 1,
      title: "Monthly Patients",
      description: "as of this month",
      value: 120,
      icon: <User />,
      color: "blue",
    },
    {
      id: 2,
      title: "Todays Appointment",
      description: "as of today",
      value: 8,
      icon: <Clock />,
      color: "green",
    },
    {
      id: 3,
      title: "Patient Request",
      description: "as of today",
      value: 3,
      icon: <GitPullRequest />,
      color: "yellow",
    },
    {
      id: 4,
      title: "Inventory Updates",
      description: "as of today",
      value: 5,
      icon: <Cylinder />,
      color: "red",
    },
  ];

  return (
    <div className="m-6 space-y-4">
      <div className="mx-2 py-4 text-left">
        <div className="flex flex-row space-x-1 text-2xl font-bold">
          <span>Good Day,</span>
          <span className="text-blue-500">
            {name ?? <Skeleton className="mb-1 h-8 w-[120px]" />}
          </span>
        </div>

        <p className="text-sm">
          Check out the latest updates from the past 7 days!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Visitors chart spans 2 columns */}
        <div className="lg:col-span-2">
          <VisitorsChart />
        </div>

        {/* Sidebar spaced out to align bottom */}
        <div className="flex flex-col justify-between space-y-4">
          <CommonDiseasesChart />
          <CommonMedicinesChart />
        </div>
      </div>
      <TitleCard title="Patients">
        <DashboardTable columns={PatientColumns} data={patients ?? []} />
      </TitleCard>
    </div>
  );
}
