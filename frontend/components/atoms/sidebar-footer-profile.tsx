"use client";
import { NavUser } from "../nav-user";
import { SidebarFooter } from "../ui/sidebar";
import { useName } from "@/hooks/use-name";
import { useEmail } from "@/hooks/use-email";

export default function SidebarFooterProfile() {
  const name = useName() ?? "";
  const email = useEmail() ?? "";

  return (
    <SidebarFooter>
      <NavUser user={{ name, email }} />
    </SidebarFooter>
  );
}
