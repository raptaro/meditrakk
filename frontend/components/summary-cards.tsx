import { JSX } from "react";

type ColorKey = "blue" | "green" | "yellow" | "red";

const colors: Record<ColorKey, { border: string; bg: string; text: string }> = {
  blue: {
    border: "border-b-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
  },
  green: {
    border: "border-b-green-500",
    bg: "bg-green-500/10",
    text: "text-green-600",
  },
  yellow: {
    border: "border-b-yellow-500",
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
  },
  red: {
    border: "border-b-red-500",
    bg: "bg-red-500/10",
    text: "text-red-600",
  },
};

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: JSX.Element;
  color: ColorKey;
};

export default function SummaryCard({
  title,
  value,
  description,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <div
      className={`flex justify-between items-center border-b-[2px]  text-card-foreground p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-none ${colors[color].border} group`}
    >
      <div className="flex flex-col">
        <span className="text-sm">{title}</span>
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm">{description}</span>
      </div>

      <div className={`rounded-full ${colors[color].bg} p-3`}>
        <span
          className={`${colors[color].text} group-hover:animate-[pulse_3s_infinite]`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}
