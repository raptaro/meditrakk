import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/admin-sidebar";
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
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
