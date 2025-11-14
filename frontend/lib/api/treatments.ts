import { Treatment } from "@/app/types";

export async function getTreatments(): Promise<Treatment[]> {
  if (typeof window === "undefined") return [];

  const accessToken = localStorage.getItem("access");

  if (!accessToken) return [];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-treatment`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch treatments");
  }

  const data = await response.json();

  const treatments: Treatment[] = Array.isArray(data)
    ? data
    : data.results ?? [];

  return [...treatments].sort((a, b) => {
    const aDate = new Date(a.created_at).getTime();
    const bDate = new Date(b.created_at).getTime();
    return bDate - aDate;
  });
}
