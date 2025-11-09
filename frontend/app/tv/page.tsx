"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import userInfo from "@/hooks/userRole";


export interface PatientQueueItem {
  id: number;
  patient_id: string | null;
  first_name: string;
  last_name: string;
  age: number | null;
  phone_number: string | null;
  date_of_birth: string | null;
  complaint: string;
  queue_number: number;
  status: string;
  priority_level: string;
  created_at: string;
  is_new_patient: boolean;
}

export default function RegistrationQueue() {
  const [priorityQueue, setPriorityQueue] = useState<PatientQueueItem[]>([]);
  const [regularQueue, setRegularQueue] = useState<PatientQueueItem[]>([]);
  const router = useRouter();

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

        console.log("Queue data received:", data);

        // Use the new queue arrays if available, otherwise fallback to individual items
        if (data.priority_queue && data.regular_queue) {
          // New format with arrays
          setPriorityQueue(data.priority_queue);
          setRegularQueue(data.regular_queue);
        } else {
          // Old format - combine individual items into arrays
          const priorityItems = [
            data.priority_current,
            data.priority_next1, 
            data.priority_next2
          ].filter(Boolean).map(item => ({
            ...item,
            first_name: item.first_name || "Unknown",
            last_name: item.last_name || "Patient",
            phone_number: item.phone_number || null,
            age: item.age || null,
            is_new_patient: item.is_new_patient ?? true
          }));

          const regularItems = [
            data.regular_current,
            data.regular_next1,
            data.regular_next2
          ].filter(Boolean).map(item => ({
            ...item,
            first_name: item.first_name || "Unknown",
            last_name: item.last_name || "Patient",
            phone_number: item.phone_number || null,
            age: item.age || null,
            is_new_patient: item.is_new_patient ?? true
          }));

          setPriorityQueue(priorityItems);
          setRegularQueue(regularItems);
        }

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
        console.log("WebSocket message received:", msg);

        // Use the new queue arrays if available, otherwise fallback to individual items
        if (msg.priority_queue && msg.regular_queue) {
          // New format with arrays
          setPriorityQueue(msg.priority_queue);
          setRegularQueue(msg.regular_queue);
        } else {
          // Old format - combine individual items into arrays
          const priorityItems = [
            msg.priority_current,
            msg.priority_next1,
            msg.priority_next2
          ].filter(Boolean).map(item => ({
            ...item,
            first_name: item.first_name || "Unknown",
            last_name: item.last_name || "Patient",
            phone_number: item.phone_number || null,
            age: item.age || null,
            is_new_patient: item.is_new_patient ?? true
          }));

          const regularItems = [
            msg.regular_current,
            msg.regular_next1,
            msg.regular_next2
          ].filter(Boolean).map(item => ({
            ...item,
            first_name: item.first_name || "Unknown",
            last_name: item.last_name || "Patient",
            phone_number: item.phone_number || null,
            age: item.age || null,
            is_new_patient: item.is_new_patient ?? true
          }));

          setPriorityQueue(priorityItems);
          setRegularQueue(regularItems);
        }

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

  const QueueCard = ({ queueItem }: { queueItem: PatientQueueItem }) => {
    const isCurrent = queueItem.status === "In Progress" || queueItem.status === "Current";

    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border
          ${
            isCurrent
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : "border-gray-300 bg-white hover:shadow-md transition-shadow duration-300"
          }
          w-full h-72 p-6 cursor-default select-none`}
      >
        <p
          className={`text-7xl font-extrabold mb-4 ${
            isCurrent ? "text-blue-600" : "text-gray-400"
          }`}
        >
          #{queueItem.queue_number}
        </p>
        <span className="text-lg font-semibold text-gray-800">
          {queueItem.priority_level === "Priority" ? "Priority" : "Regular"}
        </span>
        <span
          className={`text-sm mt-1 ${
            isCurrent ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {isCurrent ? "Current Patient" : "Waiting"}
        </span>
        {queueItem && (
          <div className="mt-2 text-xs text-gray-600 text-center">
            <p className={`text-xs ${
              queueItem.is_new_patient ? "text-yellow-600" : "text-green-600"
            }`}>
              {queueItem.is_new_patient ? "New Patient" : "Existing Patient"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const user = userInfo();
  const userRole = user?.role;

  if (!userRole) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col gap-12 bg-gray-50 px-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">
          Patient Registration Queue
        </h1>

      </div>

      {/* Priority Queue Section */}
      {priorityQueue.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-blue-700">
            Priority Queue ({priorityQueue.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {priorityQueue.map((item) => (
              <QueueCard key={item.id} queueItem={item} />
            ))}
          </div>
        </section>
      )}

      {/* Regular Queue Section */}
      {regularQueue.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">
            Regular Queue ({regularQueue.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {regularQueue.map((item) => (
              <QueueCard key={item.id} queueItem={item} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {priorityQueue.length === 0 && regularQueue.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients in queue</h3>
            <p className="text-gray-500">Patients will appear here once they register for the clinic queue.</p>
          </div>
        </div>
      )}
    </main>
  );
}