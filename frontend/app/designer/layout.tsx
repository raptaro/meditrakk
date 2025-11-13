import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DesignerSidebar from "@/app/designer/designer-sidebar";
import Header from "@/components/organisms/header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <DesignerSidebar />
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
