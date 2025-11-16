import {
  Pill,
  FileClock,
  FileText,
  LayoutDashboard,
  ChevronUp,
  Hospital,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SidebarHeaderProfile from "@/components/atoms/sidebar-header-profile";
import { NavUser } from "@/components/nav-user";

const menu_items = [
  {
    title: "Prescriptions",
    url: "/patient/prescriptions",
    icon: Pill,
  },
  {
    title: "Medical Record",
    url: "/patient/medical-record",
    icon: FileClock,
  },
  {
    title: "Documents",
    url: "/patient/documents",
    icon: FileText,
  },
];

const appointment_items = [
  {
    title: "Book Appointment",
    url: "/patient/book-appointment",
  },
  {
    title: "Upcoming Appointment",
    url: "/patient/upcoming-appointment",
  },
  {
    title: "Past Appointments",
    url: "/patient/past-appointment",
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
};

export function PatientSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard Item (Manually Rendered) */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/patient">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/patient/patient-register">
                    <Hospital />
                    <span>Register</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Appointments Collapsible */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Appointments</span>
                      </div>
                      <ChevronUp className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {appointment_items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Remaining Menu Items */}
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
