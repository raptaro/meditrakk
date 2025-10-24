"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

async function fetchWithAuth<T>(url: string, withAuth = true): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (withAuth) {
    const token = localStorage.getItem("access");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

export function useApiQuery<T>(
  key: string | any[],
  url: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
  withAuth = true
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => fetchWithAuth<T>(url, withAuth),
    ...options,
  });
}
