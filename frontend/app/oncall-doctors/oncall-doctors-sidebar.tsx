import { LayoutDashboard, Calendar, Users, Heart,  ChartArea, } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
    url: "/oncall-doctors",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/oncall-doctors/appointments",
    icon: Calendar,
  },
  {
    title: "Doctors",
    url: "/oncall-doctors/doctor-list",
    icon: Heart,
  },
  {
    title: "Medical Records",
    url: "/oncall-doctors/medical-records",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/oncall-doctors/reports",
    icon: ChartArea,
  },
];

export function OncallDoctorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
