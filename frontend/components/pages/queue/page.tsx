import QueueTableToggle from "./queue-table-toggle";
import QueueCard from "./queue-card";
import PatientInfoCard from "./patient-info-card";

export default function Queue({ title }: { title: string }) {
  return (
    <>
      <div className="card m-6">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-2xl font-bold">{title}</h1>
          <QueueTableToggle />
        </div>

        <h2 className="text-2xl font-semibold">Priority Queue</h2>
        <div className="flex flex-row justify-center gap-6">
          <QueueCard priority={true} active={true} />
          <QueueCard priority={true} />
          <QueueCard priority={true} />
          <PatientInfoCard />
        </div>

        <h2 className="text-2xl font-semibold">Regular Queue</h2>
        <div className="flex flex-row justify-center gap-6">
          <QueueCard active={true} />
          <QueueCard />
          <QueueCard />
          <PatientInfoCard />
        </div>
      </div>
    </>
  );
}
