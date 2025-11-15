import { Doctor } from "@/app/(info)/doctors-list/doctor-columns";

export async function getDoctors(): Promise<Doctor[]> {
  const accessToken = localStorage.getItem("access");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users/?role=doctor`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  const data = await response.json();

  // Some APIs wrap data in { results: [...] }
  const doctors: Doctor[] = Array.isArray(data) ? data : data.results ?? [];

  return doctors; // <-- REQUIRED
}

