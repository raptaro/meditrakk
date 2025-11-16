import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SecretarySidebar } from "@/app/secretary/secretary-sidebar";
import Header from "@/components/organisms/header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <SecretarySidebar />
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
