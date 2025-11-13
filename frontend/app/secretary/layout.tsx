import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/secretary/secretary-sidebar";
import Header from "@/components/organisms/header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
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
