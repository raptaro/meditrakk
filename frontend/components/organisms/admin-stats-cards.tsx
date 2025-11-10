"use client";

import {
  User,
  Clock,
  GitPullRequest,
  Clock2,
  ChevronDown,
  LucideIcon,
  PinIcon,
} from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  footer: {
    text: string;
    highlight?: string;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  };
}

const statsData = [
  {
    icon: User,
    title: "Monthly Visit",
    value: 84,
    footer: {
      text: "Since last month",
      trend: {
        value: "-17.65%",
        isPositive: false,
      },
    },
  },
  {
    icon: Clock,
    title: "Todays Appointment",
    value: 84,
    footer: {
      text: "Next Appointment",
      highlight: "10:00 AM",
    },
  },
  {
    icon: GitPullRequest,
    title: "Patient Request",
    value: 10,
    footer: {
      text: "Appointment Request",
      highlight: "+2",
    },
  },
  {
    icon: Clock2,
    title: "Inventory Updates",
    value: 84,
    footer: {
      text: "Low stock items",
      trend: {
        value: "",
        isPositive: false,
      },
    },
  },
];

function StatsCard({ icon: Icon, title, value, footer }: StatsCardProps) {
  return (
    <div className="card block w-full max-w-sm space-y-2 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="me-2 h-5 w-5 text-primary" />
          <p className="tracking-tight">{title}</p>
        </div>
        <PinIcon className="me-2 h-5 w-5 text-red-400 opacity-90" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="flex items-center justify-center text-sm md:justify-normal">
        {footer.trend ? (
          <>
            <span
              className={
                footer.trend.isPositive ? "text-green-500" : "text-red-500"
              }
            >
              <ChevronDown
                className={
                  footer.trend.isPositive ? "h-5 w-5 rotate-180" : "h-5 w-5"
                }
              />
            </span>
            <span
              className={`me-1 ${
                footer.trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {footer.trend.value}
            </span>
          </>
        ) : null}
        {footer.highlight && (
          <span className="pe-2 text-blue-500"> {footer.highlight}</span>
        )}
        {footer.text}
      </p>
    </div>
  );
}

export default function AdminStatsCards() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 text-center text-card-foreground md:grid-cols-2 md:text-left xl:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
