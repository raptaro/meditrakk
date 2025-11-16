"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import DarkModeToggle from "@/components/molecules/header/dark-mode-toggle";

const HeroHeader = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/doctors-list", label: "Doctors" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="z-50 bg-card px-6 py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold">Malibiran Clinic</span>
          </Link>
        </div>
        <div className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "nav-link",
                pathname === link.href && "text-primary font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4">
          <DarkModeToggle />
          <Button className="rounded-xl transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HeroHeader;
