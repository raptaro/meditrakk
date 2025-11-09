"use client";

import React from "react";

interface FormattedDateProps {
  date?: string | Date | null;
}

export function FormattedDate({ date }: FormattedDateProps) {
  if (!date) return React.createElement("span", null, "—");

  const parsedDate = date instanceof Date ? date : new Date(date);
  if (isNaN(parsedDate.getTime())) return React.createElement("span", null, "Invalid Date");

  const formatted = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return React.createElement("span", null, formatted);
}
