"use client";

import StatsCard from "@/components/organisms/patient-stats-cards";
import { PerformanceHeartRateChart } from "@/app/patient/components/performance-heart-rate-chart";
import { RestingHeartRateChart } from "@/app/patient/components/resting-heart-rate-chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prescriptions, appointments, documents } from "@/lib/placeholder-data";
import { DashboardTable } from "@/components/ui/dashboard-table";
import { columns } from "./(appointments)/columns";
import { columns as PrescriptionsColumn } from "./prescriptions/columns";
import { columns as DocumentsColumn } from "./documents/columns";
import { useName } from "@/hooks/use-name";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HealthTip {
  id: number;
  patient: string;
  diagnosis: number;
  diagnosis_description: string;
  doctor: number;
  doctor_name: string;
  tip_text: string;
  source: string;
  is_for_patient: boolean;
  is_auto_generated: boolean;
  created_at: string;
  updated_at: string;
}

const healthTipsColumns = [
  {
    accessorKey: "tip_text",
    header: "Health Tip",
    cell: ({ row }: any) => (
      <div className="max-w-md">
        <p className="font-medium text-sm">{row.getValue("tip_text")}</p>
      </div>
    ),
  },
  {
    accessorKey: "doctor_name",
    header: "Doctor",
    cell: ({ row }: any) => (
      <div className="max-w-xs">
        <p className="text-sm">{row.getValue("doctor_name")}</p>
      </div>
    ),
  },
  {
    accessorKey: "diagnosis_description",
    header: "Condition",
    cell: ({ row }: any) => (
      <div className="max-w-xs">
        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
          {row.getValue("diagnosis_description")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="text-xs text-muted-foreground">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </div>
      );
    },
  },
];

export default function Page() {
  const name = useName();
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllTips, setShowAllTips] = useState(false);

  const fetchHealthTips = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        console.error("No access token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patients/health-tips/patient/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include'
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHealthTips(data);
      }
    } catch (err) {
      console.error("Error fetching health tips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const displayedTips = showAllTips ? healthTips : healthTips.slice(0, 3);

  return (
    <div className="m-4 space-y-6 sm:m-6">
      {/* Welcome Section */}
      <section className="card p-4 sm:p-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
          {/* Image (hidden on small screens) */}
          <div className="hidden lg:block">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/Welcome.png"
                alt="Welcome"
                fill
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
          </div>

          {/* Text Section */}
          <div className="col-span-2 flex flex-col space-y-4 text-center lg:text-left">
            <span className="text-sm font-semibold sm:text-base">
              Welcome back
            </span>
            <span className="flex justify-center text-xl font-bold text-blue-500 sm:text-2xl lg:justify-start">
              {name ?? <Skeleton className="mb-1 h-8 w-[120px]" />}
            </span>
            <p className="text-sm text-muted-foreground sm:text-base">
              We would like to take this opportunity to welcome you to our
              practice and to thank you for choosing our physicians to
              participate in your healthcare. We look forward to providing you
              with personalized, comprehensive health care focusing on wellness
              and prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <StatsCard />

      {/* Charts and Prescriptions */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RestingHeartRateChart />
        <PerformanceHeartRateChart />
        <div className="card">
          <h1 className="mb-4 text-base font-bold sm:text-lg">Prescriptions</h1>
          <DashboardTable
            columns={PrescriptionsColumn}
            data={prescriptions ?? []}
          />
        </div>
      </section>

      {/* Appointments Section */}
      <div className="card col-span-2">
        <Tabs defaultValue="upcoming-appointment">
          <TabsList className="flex w-full flex-col sm:flex-row">
            <TabsTrigger className="w-full sm:w-1/2" value="todays-appointment">
              Today's Appointment
            </TabsTrigger>
            <TabsTrigger
              className="w-full sm:w-1/2"
              value="upcoming-appointment"
            >
              Upcoming Appointment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="todays-appointment">
            <DashboardTable columns={columns} data={appointments ?? []} />
          </TabsContent>
          <TabsContent value="upcoming-appointment">
            <DashboardTable columns={columns} data={appointments ?? []} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Documents Section */}
      <div className="card">
        <h1 className="mb-4 text-base font-bold sm:text-lg">Documents</h1>
        <DashboardTable columns={DocumentsColumn} data={documents ?? []} />
      </div>
<div className="card">
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-base font-bold sm:text-lg">Health Tips</h1>
    {healthTips.length > 3 && (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowAllTips(!showAllTips)}
      >
        {showAllTips ? 'Show Less' : 'View All'}
      </Button>
    )}
  </div>
  {loading ? (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-16 flex-1" />
          <Skeleton className="h-16 w-24" />
          <Skeleton className="h-16 w-24" />
          <Skeleton className="h-16 w-20" />
        </div>
      ))}
    </div>
  ) : healthTips.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-muted-foreground mb-2">No health tips available</p>
      <p className="text-sm text-muted-foreground">
        Your healthcare providers will add personalized health tips here.
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">Health Tip</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Doctor</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Condition</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
          </tr>
        </thead>
        <tbody>
          {displayedTips.map((tip) => (
            <tr key={tip.id} className="border-b last:border-0">
              <td className="py-3 px-4">
                <p className="font-medium text-sm">{tip.tip_text}</p>
              </td>
              <td className="py-3 px-4">
                <p className="text-sm">{tip.doctor_name || "System"}</p>
              </td>
              <td className="py-3 px-4">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {tip.diagnosis_description}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="text-xs text-muted-foreground">
                  {new Date(tip.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
}