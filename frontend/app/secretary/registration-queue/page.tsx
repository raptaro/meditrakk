"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import userInfo from "@/hooks/userRole";
import QueueTableToggle from "./queue-table-toggle";
import { DashboardTable } from "@/components/ui/dashboard-table";
import { columns } from "./columns";
import { registrations } from "@/lib/placeholder-data";
import PatientRoutingModal from "@/components/pages/PatientRoutingModal";

export interface PatientQueueItem {
  id: number;
  patient_id: string | null;
  first_name: string;
  last_name: string;
  age: number | null;
  phone_number?: string;
  date_of_birth?: string;
  complaint: string;
  queue_number: number;
  status?: string;
  priority_level?: string;
  created_at?: string;
  is_new_patient?: boolean;
}

interface Patient {
  id: number;
  patient_id: string | null;
  patient_name: string;
  queue_number: number;
  priority_level: string;
  complaint: string;
  status: string;
  created_at: string;
  queue_date: string;
}

export default function RegistrationQueue() {
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

  const [selectedPatient, setSelectedPatient] =
    useState<PatientQueueItem | null>(null);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const router = useRouter();

  const convertToPatient = (
    queueItem: PatientQueueItem | null
  ): Patient | null => {
    if (!queueItem) return null;
    return {
      id: queueItem.id,
      patient_id: queueItem.patient_id,
      patient_name: `${queueItem.first_name} ${queueItem.last_name}`,
      queue_number: queueItem.queue_number,
      priority_level: queueItem.priority_level || "Regular",
      complaint: queueItem.complaint,
      status: queueItem.status || "Waiting",
      created_at: queueItem.created_at || new Date().toISOString(),
      queue_date: queueItem.created_at || new Date().toISOString(),
    };
  };

  const displayAge = (age: number | null | undefined): string => {
    if (age === null || age === undefined) return "N/A";
    return `${age}`;
  };

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const token = localStorage.getItem("access");
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/queueing/registration_queueing/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        const data = await resp.json();

        const pr = [
          data.priority_current,
          data.priority_next1,
          data.priority_next2,
        ].filter(Boolean);
        const rg = [
          data.regular_current,
          data.regular_next1,
          data.regular_next2,
        ].filter(Boolean);

        setPriorityQueue({
          current: pr[0] ?? null,
          next1: pr[1] ?? null,
          next2: pr[2] ?? null,
        });
        setRegularQueue({
          current: rg[0] ?? null,
          next1: rg[1] ?? null,
          next2: rg[2] ?? null,
        });
      } catch (err) {
        console.error("Error fetching queue:", err);
      }
    };

    fetchQueueData();

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const backendHost =
      process.env.NODE_ENV === "production"
        ? "thesis-backend.up.railway.app"
        : "localhost:8000";

    const socket = new WebSocket(
      `${protocol}://${backendHost}/ws/queue/registration/`
    );

    socket.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        const pr = [
          msg.priority_current,
          msg.priority_next1,
          msg.priority_next2,
        ].filter(Boolean);
        const rg = [
          msg.regular_current,
          msg.regular_next1,
          msg.regular_next2,
        ].filter(Boolean);

        setPriorityQueue({
          current: pr[0] ?? null,
          next1: pr[1] ?? null,
          next2: pr[2] ?? null,
        });
        setRegularQueue({
          current: rg[0] ?? null,
          next1: rg[1] ?? null,
          next2: rg[2] ?? null,
        });
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };

    const intervalId = setInterval(fetchQueueData, 30000);
    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, []);

  const handleAccept = (queueItem: PatientQueueItem) => {
    setSelectedPatient(queueItem);
    setIsRoutingModalOpen(true);
  };

  const handleRoutePatient = async (
    queueItem: PatientQueueItem | null,
    action: string
  ) => {
    if (!queueItem) return;
    try {
      const token = localStorage.getItem("access");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/patient/update-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            queue_entry_id: queueItem.id,
            action,
          }),
        }
      );
      setIsRoutingModalOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error updating queue:", error);
    }
  };

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
            {displayAge(queueItem.age)}
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
            onClick={() => handleAccept(queueItem)}
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

  const user = userInfo();
  const userRole = user?.role;

  if (userRole && !["secretary"].includes(userRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-gray-600">
        Not Authorized
      </div>
    );
  }

  if (!userRole) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col gap-12 bg-gray-50 px-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">
          Patient Registration Queue
        </h1>
        <QueueTableToggle />
      </div>

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

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          All Registrations
        </h2>
        <DashboardTable columns={columns} data={registrations ?? []} />
      </section>

      <PatientRoutingModal
        isOpen={isRoutingModalOpen}
        onClose={() => {
          setIsRoutingModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={convertToPatient(selectedPatient)}
        onRoutePatient={(patient, action) => {
          handleRoutePatient(selectedPatient, action);
        }}
      />
    </main>
  );
}
