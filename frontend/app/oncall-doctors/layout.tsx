import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/oncall-doctors/oncall-doctors-sidebar";
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
