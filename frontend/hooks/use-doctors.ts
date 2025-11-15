// hooks/useDoctors.ts
"use client";

import { useEffect, useState } from "react";
import { getDoctors } from "@/lib/api/doctors";
import { Doctor } from "@/app/(info)/doctors-list/doctor-columns";

export default function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadDoctors();
  }, []);

  return doctors;
}
