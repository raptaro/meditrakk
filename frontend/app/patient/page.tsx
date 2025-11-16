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

export default function Page() {
  const name = useName();

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
    </div>
  );
}
