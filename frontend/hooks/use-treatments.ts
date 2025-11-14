// hooks/useTreatments.ts
"use client";

import { useEffect, useState } from "react";
import { getTreatments } from "@/lib/api/treatments";
import { Treatment } from "@/app/types";

export default function useTreatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const data = await getTreatments();
        setTreatments(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTreatments();
  }, []);

  return treatments;
}
