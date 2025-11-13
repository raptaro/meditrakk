import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PatientSidebar } from "@/app/patient/patient-sidebar";
import Header from "@/components/organisms/header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <PatientSidebar />
        <SidebarInset className="flex-1">
          <main className="flex-1">
            <Header />
            <SidebarTrigger className="fixed top-0 md:hidden" />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
