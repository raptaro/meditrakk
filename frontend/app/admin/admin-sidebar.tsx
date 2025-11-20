import {
  LayoutDashboard,
  Stethoscope,
  NotepadText,
  Cog,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import SidebarHeaderProfile from "@/components/atoms/sidebar-header-profile";
import SidebarFooterProfile from "@/components/atoms/sidebar-footer-profile";
const menu_items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    url: "/admin/patient-list",
    icon: Users2,
  },
  {
    title: "Doctor Management",
    url: "/admin/doctor-management",
    icon: Stethoscope,
  },
  {
    title: "Secretary Management",
    url: "/admin/secretary-management",
    icon: NotepadText,
  },
  {
    title: "Services Management",
    url: "/admin/services-management",
    icon: Cog,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderProfile />
      </SidebarHeader>
      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarGroup>
                {menu_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterProfile />
    </Sidebar>
  );
}
