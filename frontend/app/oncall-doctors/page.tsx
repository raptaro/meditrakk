"use client";

import OncallDoctorsRecentAppointment from "@/components/organisms/tables/oncall-doctor/recent-appointment";
import PatientGroup from "@/components/organisms/tables/oncall-doctor/patient-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import TodoList from "@/components/organisms/tables/oncall-doctor/todo-list";
import { useName } from "@/hooks/use-name";
import { Skeleton } from "@/components/ui/skeleton";

const cards = [
  {
    id: 1,
    label: "Appointments",
    count: 12,
    bgColor: "bg-indigo-200",
    textColor: "text-indigo-600",
  },
  {
    id: 2,
    label: "Surgeries",
    count: 12,
    bgColor: "bg-red-200",
    textColor: "text-red-600",
  },
  {
    id: 3,
    label: "Room Visit",
    count: 12,
    bgColor: "bg-green-200",
    textColor: "text-green-600",
  },
];

export default function Page() {
  const name = useName();

  return (
    <div className="m-6 space-y-6">
      <section className="card">
        <div className="grid grid-cols-3">
          <div className="col-span-3 content-center xl:col-span-2">
            <div className="mb-4 flex flex-col space-y-4 text-sm font-semibold text-muted-foreground">
              <span>Welcome back</span>
              <span className="text-xl font-bold text-blue-500">
                {name ?? <Skeleton className="mb-1 h-8 w-[120px]" />}
              </span>
              <span>Gynecologist, MBBS,MD</span>
            </div>
            <div className="grid grid-cols-1 gap-4 text-slate-800 lg:grid-cols-3">
              {cards.map((item, index) => (
                <div
                  key={index}
                  className={`flex w-full flex-col rounded-xl ${item.bgColor} p-2`}
                >
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className={`text-lg ${item.textColor}`}>
                    {item.count}+
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-96 place-content-center place-self-center xl:block">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/doctor.png"
                alt="Doctor"
                fill
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-y-6 xl:grid-cols-3 xl:gap-x-6">
        <span className="col-span-2">
          <OncallDoctorsRecentAppointment />
        </span>

        <PatientGroup />
      </div>

      <TodoList />
    </div>
  );
}
