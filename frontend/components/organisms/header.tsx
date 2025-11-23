import DarkModeToggle from "@/components/molecules/header/dark-mode-toggle";
import ProfileDropdown from "@/components/molecules/header/profile-dropdown";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card p-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left section (menu + title) */}
        <div className="ms-2 flex items-center gap-3">
          <span className="md:hidden">
            <SidebarTrigger>
              <Menu />
            </SidebarTrigger>
          </span>

          <h1 className="whitespace-nowrap text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Malibiran Medical Clinic
          </h1>
        </div>

        {/* Right section (icons) */}
        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          <DarkModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
