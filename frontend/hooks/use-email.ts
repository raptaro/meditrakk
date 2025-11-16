"use client";
import { useEffect, useState } from "react";
import { getEmail } from "@/utils/auth";

export function useEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setEmail(await getEmail());
    })();
  }, []);

  return email;
}
