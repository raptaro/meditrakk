"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import userRole from "@/hooks/userRole";

export interface PatientQueueItem {
  patient_id: string;
  first_name: string;
  last_name: string;
  age: number;
  complaint: string;
  phone_number?: string;
  queue_number: number;
}

export default function Page() {
  const [priorityQueue, setPriorityQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  const [regularQueue, setRegularQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  const router = useRouter();
  const role = userRole();

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE
          }/queueing/preliminary_assessment_queueing/?t=${Date.now()}`,
          {
            cache: "no-cache",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();

        const priorityPatients = [
          data.priority_current,
          data.priority_next1,
          data.priority_next2,
        ].filter(Boolean);

        const regularPatients = [
          data.regular_current,
          data.regular_next1,
          data.regular_next2,
        ].filter(Boolean);

        setPriorityQueue({
          current: priorityPatients[0] ?? null,
          next1: priorityPatients[1] ?? null,
          next2: priorityPatients[2] ?? null,
        });

        setRegularQueue({
          current: regularPatients[0] ?? null,
          next1: regularPatients[1] ?? null,
          next2: regularPatients[2] ?? null,
        });
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    fetchQueue();
  }, []);

  const QueueCard = ({
    queueItem,
    label,
    status,
  }: {
    queueItem: PatientQueueItem | null;
    label: string;
    status: "current" | "next";
  }) => (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border
        ${
          status === "current"
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-300 bg-white hover:shadow-md transition-shadow duration-300"
        }
        w-64 h-72 p-6 cursor-default select-none`}
      title={
        queueItem
          ? `${queueItem.first_name} ${queueItem.last_name} - ${queueItem.complaint}`
          : undefined
      }
    >
      <p
        className={`text-7xl font-extrabold mb-4 ${
          status === "current" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {queueItem ? `#${queueItem.queue_number}` : "N/A"}
      </p>
      <span className="text-lg font-semibold text-gray-800">{label}</span>
      <span
        className={`text-sm mt-1 ${
          status === "current" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {status === "current" ? "Current Patient" : "Next in Queue"}
      </span>
    </div>
  );

  const renderPatientInfo = (queueItem: PatientQueueItem | null) => {
    if (!queueItem) {
      return (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 border-b border-blue-100 pb-2 text-xl font-semibold text-blue-700">
            Patient Information
          </h3>
          <p className="text-gray-600">No current patient in the queue.</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 border-b border-blue-100 pb-2 text-xl font-semibold text-blue-700">
          Patient Information
        </h3>

        <div className="mb-3 space-y-1">
          <p>
            <span className="font-semibold text-gray-700">Name: </span>
            {queueItem.first_name} {queueItem.last_name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Age: </span>
            {queueItem.age ?? "N/A"}
          </p>
        </div>

        <div className="mb-4 border-t border-gray-200 pt-3">
          <p>
            <span className="font-semibold text-gray-700">Phone Number: </span>
            {queueItem.phone_number || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Reason: </span>
            {queueItem.complaint || "N/A"}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            onClick={() =>
              router.push(
                `/secretary/preliminary-assessment/${queueItem.patient_id}/${queueItem.queue_number}/`
              )
            }
            className={buttonVariants({ variant: "default" })}
          >
            Accept
          </button>
          <button
            onClick={() => router.push("/payments")}
            className={buttonVariants({ variant: "outline" })}
          >
            Edit
          </button>
          <button
            onClick={() => router.push("/payments")}
            className={buttonVariants({ variant: "destructive" })}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  if (!role || role.role !== "secretary") {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-gray-600">
        Not Authorized
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col gap-12 bg-gray-50 px-10 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-blue-800">
        Patient Assessment Queue
      </h1>

      {/* Priority Queue */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-blue-700">
          Priority Queue
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <QueueCard
            queueItem={priorityQueue.current}
            label="Priority"
            status="current"
          />
          <QueueCard
            queueItem={priorityQueue.next1}
            label="Priority"
            status="next"
          />
          <QueueCard
            queueItem={priorityQueue.next2}
            label="Priority"
            status="next"
          />
          {renderPatientInfo(priorityQueue.current)}
        </div>
      </section>

      {/* Regular Queue */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          Regular Queue
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <QueueCard
            queueItem={regularQueue.current}
            label="Regular"
            status="current"
          />
          <QueueCard
            queueItem={regularQueue.next1}
            label="Regular"
            status="next"
          />
          <QueueCard
            queueItem={regularQueue.next2}
            label="Regular"
            status="next"
          />
          {renderPatientInfo(regularQueue.current)}
        </div>
      </section>
    </main>
  );
}
