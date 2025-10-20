interface QueueCardProps {
  active?: boolean;
  priority?: boolean;
}

export default function QueueCard({ active, priority }: QueueCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg w-64 h-64 border-2 hover:scale-105 transition-transform cursor-pointer hover:shadow-lg 
      ${active ? "bg-primary/10 border-primary shadow-primary/20" : ""}`}
    >
      <span
        className={` text-7xl font-extrabold mb-4
        ${active ? "text-primary" : "text-muted-foreground"}`}
      >
        #3
      </span>

      <span className="text-lg font-semibold">
        {`${priority ? "Priority" : "Regular"}`}
      </span>

      <span className={`text-sm ${active ? "text-primary" : ""}`}>
        {`${active ? "Current Patient" : "Next in Queue"}`}
      </span>
    </div>
  );
}
