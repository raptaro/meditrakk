"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useFetch<T>(url: string, withAuth = true) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (withAuth) {
          const accessToken = localStorage.getItem("access");
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, withAuth]);

  return { data, isLoading, error, refetch: () => window.location.reload() };
}
