import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DoctorSidebar } from "@/app/doctor/doctor-sidebar";
import Header from "@/components/organisms/header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <DoctorSidebar />
        <SidebarInset className="min-w-0 flex-1">
          <main className="min-w-0 flex-1">
            <Header />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
